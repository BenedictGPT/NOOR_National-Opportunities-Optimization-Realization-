"""
NOOR Platform - Work Experience Service Layer
Business logic for work experience management
"""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, or_, desc
from sqlalchemy.orm import selectinload
from typing import List, Optional, Dict, Any
from datetime import datetime, date, timedelta
from collections import Counter
import logging

from app.db.models import WorkExperience, WorkExperienceVerification, CareerAnalytics, User, Skill
from app.models.work_experience import (
    WorkExperienceCreate,
    WorkExperienceUpdate,
    WorkExperienceVerificationRequest,
    EmploymentType,
    IndustryType
)

logger = logging.getLogger(__name__)


class WorkExperienceService:
    """Service for work experience management"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    # ========================================================================
    # WORK EXPERIENCE CRUD METHODS
    # ========================================================================
    
    async def get_user_experiences(
        self,
        user_id: str,
        employment_type: Optional[EmploymentType] = None,
        industry: Optional[IndustryType] = None,
        current_only: bool = False
    ) -> List[WorkExperience]:
        """Get user's work experiences with filters"""
        query = select(WorkExperience).where(WorkExperience.user_id == user_id)
        query = query.options(selectinload(WorkExperience.skills))
        
        # Apply filters
        if employment_type:
            query = query.where(WorkExperience.employment_type == employment_type.value)
        
        if industry:
            query = query.where(WorkExperience.industry == industry.value)
        
        if current_only:
            query = query.where(WorkExperience.is_current == True)
        
        # Order by start date descending (most recent first)
        query = query.order_by(desc(WorkExperience.start_date))
        
        result = await self.db.execute(query)
        experiences = result.scalars().all()
        
        logger.info(f"Retrieved {len(experiences)} work experiences for user {user_id}")
        return experiences
    
    async def get_experience_by_id(
        self,
        user_id: str,
        experience_id: str
    ) -> Optional[WorkExperience]:
        """Get work experience by ID"""
        result = await self.db.execute(
            select(WorkExperience)
            .where(
                and_(
                    WorkExperience.id == experience_id,
                    WorkExperience.user_id == user_id
                )
            )
            .options(
                selectinload(WorkExperience.skills),
                selectinload(WorkExperience.verification_requests)
            )
        )
        return result.scalar_one_or_none()
    
    async def create_experience(
        self,
        user_id: str,
        experience_data: WorkExperienceCreate
    ) -> WorkExperience:
        """Create new work experience"""
        # Check for overlapping date ranges
        if not experience_data.is_current:
            overlapping = await self._check_overlapping_dates(
                user_id,
                experience_data.start_date,
                experience_data.end_date
            )
            if overlapping:
                logger.warning(f"Overlapping work experience dates for user {user_id}")
        
        # Create work experience
        experience = WorkExperience(
            user_id=user_id,
            company_name=experience_data.company_name,
            job_title=experience_data.job_title,
            employment_type=experience_data.employment_type.value,
            industry=experience_data.industry.value if experience_data.industry else None,
            location=experience_data.location,
            start_date=experience_data.start_date,
            end_date=experience_data.end_date,
            is_current=experience_data.is_current,
            description=experience_data.description,
            achievements=experience_data.achievements
        )
        
        # Add skills if provided
        if experience_data.skills_used:
            skills = await self._get_skills_by_ids(experience_data.skills_used)
            experience.skills.extend(skills)
        
        self.db.add(experience)
        await self.db.commit()
        await self.db.refresh(experience)
        
        # Invalidate career analytics cache
        await self._invalidate_career_analytics(user_id)
        
        logger.info(f"Created work experience for user {user_id}: {experience.job_title} at {experience.company_name}")
        return experience
    
    async def update_experience(
        self,
        user_id: str,
        experience_id: str,
        experience_data: WorkExperienceUpdate
    ) -> WorkExperience:
        """Update existing work experience"""
        experience = await self.get_experience_by_id(user_id, experience_id)
        if not experience:
            raise ValueError(f"Work experience not found")
        
        # Update fields
        if experience_data.company_name is not None:
            experience.company_name = experience_data.company_name
        if experience_data.job_title is not None:
            experience.job_title = experience_data.job_title
        if experience_data.employment_type is not None:
            experience.employment_type = experience_data.employment_type.value
        if experience_data.industry is not None:
            experience.industry = experience_data.industry.value
        if experience_data.location is not None:
            experience.location = experience_data.location
        if experience_data.start_date is not None:
            experience.start_date = experience_data.start_date
        if experience_data.end_date is not None:
            experience.end_date = experience_data.end_date
        if experience_data.is_current is not None:
            experience.is_current = experience_data.is_current
        if experience_data.description is not None:
            experience.description = experience_data.description
        if experience_data.achievements is not None:
            experience.achievements = experience_data.achievements
        
        # Update skills if provided
        if experience_data.skills_used is not None:
            experience.skills.clear()
            skills = await self._get_skills_by_ids(experience_data.skills_used)
            experience.skills.extend(skills)
        
        await self.db.commit()
        await self.db.refresh(experience)
        
        # Invalidate career analytics cache
        await self._invalidate_career_analytics(user_id)
        
        logger.info(f"Updated work experience {experience_id} for user {user_id}")
        return experience
    
    async def delete_experience(self, user_id: str, experience_id: str) -> bool:
        """Delete work experience"""
        experience = await self.get_experience_by_id(user_id, experience_id)
        if not experience:
            raise ValueError(f"Work experience not found")
        
        await self.db.delete(experience)
        await self.db.commit()
        
        # Invalidate career analytics cache
        await self._invalidate_career_analytics(user_id)
        
        logger.info(f"Deleted work experience {experience_id} for user {user_id}")
        return True
    
    # ========================================================================
    # SUMMARY AND ANALYTICS METHODS
    # ========================================================================
    
    async def get_experience_summary(self, user_id: str) -> Dict[str, Any]:
        """Get summary of user's work experience"""
        experiences = await self.get_user_experiences(user_id)
        
        if not experiences:
            return {
                "total_experiences": 0,
                "total_years": 0,
                "total_months": 0,
                "current_positions": 0,
                "companies_worked": 0,
                "industries": [],
                "employment_types": {},
                "top_skills": []
            }
        
        # Calculate totals
        total_months = sum(exp.duration_months for exp in experiences)
        total_years = round(total_months / 12, 1)
        current_positions = sum(1 for exp in experiences if exp.is_current)
        companies = set(exp.company_name for exp in experiences)
        industries = list(set(exp.industry for exp in experiences if exp.industry))
        
        # Count employment types
        employment_types = Counter(exp.employment_type for exp in experiences)
        
        # Get top skills
        all_skills = []
        for exp in experiences:
            all_skills.extend([skill.name for skill in exp.skills])
        
        skill_counts = Counter(all_skills)
        top_skills = [
            {"skill": skill, "count": count}
            for skill, count in skill_counts.most_common(10)
        ]
        
        return {
            "total_experiences": len(experiences),
            "total_years": total_years,
            "total_months": total_months,
            "current_positions": current_positions,
            "companies_worked": len(companies),
            "industries": industries,
            "employment_types": dict(employment_types),
            "top_skills": top_skills
        }
    
    async def get_career_progression(self, user_id: str) -> Dict[str, Any]:
        """Get career progression analysis"""
        # Check if cached analytics exist and are fresh
        analytics = await self._get_career_analytics(user_id)
        if analytics and not analytics.needs_refresh:
            return self._format_career_analytics(analytics)
        
        # Calculate fresh analytics
        experiences = await self.get_user_experiences(user_id)
        
        if not experiences:
            return self._empty_career_progression(user_id)
        
        # Build timeline
        timeline = [
            {
                "period": f"{exp.start_date.year}-{exp.end_date.year if exp.end_date else 'Present'}",
                "title": exp.job_title,
                "company": exp.company_name,
                "duration_months": exp.duration_months
            }
            for exp in sorted(experiences, key=lambda x: x.start_date)
        ]
        
        # Calculate metrics
        total_months = sum(exp.duration_months for exp in experiences)
        average_tenure = total_months / len(experiences) if experiences else 0
        job_changes = len(experiences) - 1
        
        industries = [exp.industry for exp in experiences if exp.industry]
        industry_changes = len(set(industries)) - 1 if industries else 0
        
        # Calculate progression score (0-10)
        progression_score = self._calculate_progression_score(experiences)
        
        # Generate AI insights and recommendations
        insights = self._generate_insights(experiences, progression_score)
        recommendations = self._generate_recommendations(experiences)
        
        # Cache analytics
        await self._cache_career_analytics(
            user_id,
            len(experiences),
            total_months,
            average_tenure,
            job_changes,
            industry_changes,
            progression_score,
            insights,
            recommendations
        )
        
        return {
            "success": True,
            "user_id": user_id,
            "timeline": timeline,
            "progression_score": progression_score,
            "average_tenure": round(average_tenure, 1),
            "job_changes": job_changes,
            "industry_changes": industry_changes,
            "salary_growth": None,  # TODO: Calculate if salary data available
            "insights": insights,
            "recommendations": recommendations
        }
    
    # ========================================================================
    # VERIFICATION METHODS
    # ========================================================================
    
    async def request_verification(
        self,
        user_id: str,
        verification_data: WorkExperienceVerificationRequest
    ) -> WorkExperienceVerification:
        """Request work experience verification"""
        # Verify experience exists and belongs to user
        experience = await self.get_experience_by_id(
            user_id,
            verification_data.experience_id
        )
        if not experience:
            raise ValueError(f"Work experience not found")
        
        # Check if verification already pending
        existing = await self.db.execute(
            select(WorkExperienceVerification).where(
                and_(
                    WorkExperienceVerification.work_experience_id == verification_data.experience_id,
                    WorkExperienceVerification.status.in_(['pending', 'in_progress'])
                )
            )
        )
        if existing.scalar_one_or_none():
            raise ValueError(f"Verification already in progress for this experience")
        
        # Create verification request
        verification = WorkExperienceVerification(
            work_experience_id=verification_data.experience_id,
            requested_by=user_id,
            verification_document_url=verification_data.verification_document,
            contact_person=verification_data.contact_person,
            contact_email=verification_data.contact_email,
            notes=verification_data.notes,
            status='pending',
            estimated_completion=datetime.utcnow() + timedelta(days=5)
        )
        
        self.db.add(verification)
        await self.db.commit()
        await self.db.refresh(verification)
        
        logger.info(f"Verification requested for experience {verification_data.experience_id}")
        return verification
    
    # ========================================================================
    # HELPER METHODS
    # ========================================================================
    
    async def _check_overlapping_dates(
        self,
        user_id: str,
        start_date: date,
        end_date: Optional[date]
    ) -> bool:
        """Check if dates overlap with existing experiences"""
        query = select(WorkExperience).where(WorkExperience.user_id == user_id)
        
        if end_date:
            query = query.where(
                or_(
                    and_(
                        WorkExperience.start_date <= start_date,
                        WorkExperience.end_date >= start_date
                    ),
                    and_(
                        WorkExperience.start_date <= end_date,
                        WorkExperience.end_date >= end_date
                    )
                )
            )
        
        result = await self.db.execute(query)
        return result.scalar_one_or_none() is not None
    
    async def _get_skills_by_ids(self, skill_ids: List[str]) -> List[Skill]:
        """Get skills by IDs"""
        result = await self.db.execute(
            select(Skill).where(Skill.id.in_(skill_ids))
        )
        return result.scalars().all()
    
    async def _get_career_analytics(self, user_id: str) -> Optional[CareerAnalytics]:
        """Get cached career analytics"""
        result = await self.db.execute(
            select(CareerAnalytics).where(CareerAnalytics.user_id == user_id)
        )
        return result.scalar_one_or_none()
    
    async def _cache_career_analytics(
        self,
        user_id: str,
        total_experiences: int,
        total_months: int,
        average_tenure: float,
        job_changes: int,
        industry_changes: int,
        progression_score: float,
        insights: List[str],
        recommendations: List[str]
    ):
        """Cache career analytics"""
        analytics = await self._get_career_analytics(user_id)
        
        if analytics:
            # Update existing
            analytics.total_experiences = total_experiences
            analytics.total_months = total_months
            analytics.total_years = round(total_months / 12, 1)
            analytics.average_tenure_months = round(average_tenure)
            analytics.job_changes = job_changes
            analytics.industry_changes = industry_changes
            analytics.progression_score = round(progression_score)
            analytics.insights = insights
            analytics.recommendations = recommendations
            analytics.last_calculated = datetime.utcnow()
        else:
            # Create new
            analytics = CareerAnalytics(
                user_id=user_id,
                total_experiences=total_experiences,
                total_months=total_months,
                total_years=round(total_months / 12, 1),
                average_tenure_months=round(average_tenure),
                job_changes=job_changes,
                industry_changes=industry_changes,
                progression_score=round(progression_score),
                insights=insights,
                recommendations=recommendations
            )
            self.db.add(analytics)
        
        await self.db.commit()
    
    async def _invalidate_career_analytics(self, user_id: str):
        """Invalidate career analytics cache"""
        analytics = await self._get_career_analytics(user_id)
        if analytics:
            analytics.last_calculated = datetime.utcnow() - timedelta(days=2)
            await self.db.commit()
    
    def _calculate_progression_score(self, experiences: List[WorkExperience]) -> float:
        """Calculate career progression score (0-10)"""
        if not experiences:
            return 0.0
        
        score = 5.0  # Base score
        
        # Positive factors
        if len(experiences) >= 3:
            score += 1.0  # Multiple positions
        
        avg_tenure = sum(exp.duration_months for exp in experiences) / len(experiences)
        if avg_tenure >= 24:
            score += 1.0  # Good tenure
        
        if any(exp.is_current for exp in experiences):
            score += 0.5  # Currently employed
        
        # Check for progression in titles (simplified)
        titles = [exp.job_title.lower() for exp in sorted(experiences, key=lambda x: x.start_date)]
        if any('senior' in title or 'lead' in title for title in titles[-2:]):
            score += 1.5  # Senior roles
        
        return min(score, 10.0)
    
    def _generate_insights(self, experiences: List[WorkExperience], score: float) -> List[str]:
        """Generate career insights"""
        insights = []
        
        if score >= 7:
            insights.append("Strong career progression with consistent growth")
        elif score >= 5:
            insights.append("Steady career development")
        else:
            insights.append("Early career stage with room for growth")
        
        industries = set(exp.industry for exp in experiences if exp.industry)
        if len(industries) == 1:
            insights.append(f"Specialized expertise in {list(industries)[0]} sector")
        elif len(industries) > 2:
            insights.append("Diverse cross-industry experience")
        
        return insights
    
    def _generate_recommendations(self, experiences: List[WorkExperience]) -> List[str]:
        """Generate career recommendations"""
        recommendations = []
        
        latest = experiences[0] if experiences else None
        if latest:
            if 'junior' in latest.job_title.lower():
                recommendations.append("Consider pursuing mid-level positions")
            elif 'senior' in latest.job_title.lower():
                recommendations.append("Explore leadership and management roles")
        
        recommendations.append("Continue building technical skills")
        recommendations.append("Seek mentorship opportunities")
        
        return recommendations
    
    def _format_career_analytics(self, analytics: CareerAnalytics) -> Dict[str, Any]:
        """Format cached analytics for response"""
        return {
            "success": True,
            "user_id": str(analytics.user_id),
            "timeline": [],  # TODO: Store timeline in cache
            "progression_score": analytics.progression_score,
            "average_tenure": analytics.average_tenure_months,
            "job_changes": analytics.job_changes,
            "industry_changes": analytics.industry_changes,
            "salary_growth": None,
            "insights": analytics.insights or [],
            "recommendations": analytics.recommendations or []
        }
    
    def _empty_career_progression(self, user_id: str) -> Dict[str, Any]:
        """Return empty career progression"""
        return {
            "success": True,
            "user_id": user_id,
            "timeline": [],
            "progression_score": 0.0,
            "average_tenure": 0.0,
            "job_changes": 0,
            "industry_changes": 0,
            "salary_growth": None,
            "insights": ["No work experience recorded yet"],
            "recommendations": ["Add your first work experience to get started"]
        }

