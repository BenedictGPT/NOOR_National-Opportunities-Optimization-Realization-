"""
NOOR Platform - Skills Service Layer
Business logic for skills management
"""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, or_
from sqlalchemy.orm import selectinload
from typing import List, Optional, Dict, Any
from datetime import datetime, date
import logging

from app.db.models import Skill, UserSkill, SkillVerificationRequest, User
from app.models.skills import (
    SkillCreate,
    SkillUpdate,
    UserSkillCreate,
    UserSkillUpdate,
    SkillsFilterParams,
    UserSkillsFilterParams,
    ProficiencyLevel,
    SkillCategory
)

logger = logging.getLogger(__name__)


class SkillsService:
    """Service for skills management"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    # ========================================================================
    # SKILLS CATALOG METHODS
    # ========================================================================
    
    async def list_skills(
        self,
        category: Optional[SkillCategory] = None,
        search: Optional[str] = None,
        skip: int = 0,
        limit: int = 50
    ) -> tuple[List[Skill], int]:
        """
        List all skills with filters
        
        Returns:
            Tuple of (skills list, total count)
        """
        query = select(Skill)
        
        # Apply filters
        if category:
            query = query.where(Skill.category == category.value)
        
        if search:
            query = query.where(Skill.name.ilike(f"%{search}%"))
        
        # Get total count
        count_query = select(func.count()).select_from(query.subquery())
        total = await self.db.scalar(count_query)
        
        # Apply pagination
        query = query.offset(skip).limit(limit).order_by(Skill.name)
        
        result = await self.db.execute(query)
        skills = result.scalars().all()
        
        logger.info(f"Listed {len(skills)} skills (total: {total})")
        return skills, total
    
    async def get_skill_by_id(self, skill_id: str) -> Optional[Skill]:
        """Get skill by ID"""
        result = await self.db.execute(
            select(Skill).where(Skill.id == skill_id)
        )
        return result.scalar_one_or_none()
    
    async def create_skill(self, skill_data: SkillCreate) -> Skill:
        """Create new skill (admin only)"""
        # Check if skill already exists
        existing = await self.db.execute(
            select(Skill).where(
                func.lower(Skill.name) == skill_data.name.lower()
            )
        )
        if existing.scalar_one_or_none():
            raise ValueError(f"Skill '{skill_data.name}' already exists")
        
        skill = Skill(
            name=skill_data.name,
            category=skill_data.category.value,
            description=skill_data.description
        )
        
        self.db.add(skill)
        await self.db.commit()
        await self.db.refresh(skill)
        
        logger.info(f"Created skill: {skill.name} (ID: {skill.id})")
        return skill
    
    async def update_skill(self, skill_id: str, skill_data: SkillUpdate) -> Skill:
        """Update existing skill (admin only)"""
        skill = await self.get_skill_by_id(skill_id)
        if not skill:
            raise ValueError(f"Skill not found: {skill_id}")
        
        # Update fields
        if skill_data.name is not None:
            skill.name = skill_data.name
        if skill_data.category is not None:
            skill.category = skill_data.category.value
        if skill_data.description is not None:
            skill.description = skill_data.description
        
        await self.db.commit()
        await self.db.refresh(skill)
        
        logger.info(f"Updated skill: {skill.name} (ID: {skill.id})")
        return skill
    
    async def get_skill_statistics(self, skill_id: str) -> Dict[str, Any]:
        """Get statistics for a skill"""
        skill = await self.get_skill_by_id(skill_id)
        if not skill:
            raise ValueError(f"Skill not found: {skill_id}")
        
        # Count total users with this skill
        total_users = await self.db.scalar(
            select(func.count(UserSkill.id)).where(UserSkill.skill_id == skill_id)
        )
        
        # Calculate average proficiency (beginner=1, intermediate=2, advanced=3, expert=4)
        proficiency_map = {
            'beginner': 1,
            'intermediate': 2,
            'advanced': 3,
            'expert': 4
        }
        
        user_skills = await self.db.execute(
            select(UserSkill).where(UserSkill.skill_id == skill_id)
        )
        user_skills_list = user_skills.scalars().all()
        
        if user_skills_list:
            avg_proficiency = sum(
                proficiency_map.get(us.proficiency_level, 0) for us in user_skills_list
            ) / len(user_skills_list)
            
            avg_experience = sum(
                float(us.years_of_experience or 0) for us in user_skills_list
            ) / len(user_skills_list)
            
            verified_count = sum(1 for us in user_skills_list if us.is_verified)
        else:
            avg_proficiency = 0
            avg_experience = 0
            verified_count = 0
        
        return {
            "skill_id": str(skill.id),
            "skill_name": skill.name,
            "total_users": total_users,
            "average_proficiency": round(avg_proficiency, 2),
            "average_experience": round(avg_experience, 2),
            "verified_count": verified_count
        }
    
    # ========================================================================
    # USER SKILLS METHODS
    # ========================================================================
    
    async def get_user_skills(
        self,
        user_id: str,
        proficiency_level: Optional[ProficiencyLevel] = None,
        category: Optional[SkillCategory] = None,
        verified_only: bool = False
    ) -> List[UserSkill]:
        """Get user's skills with filters"""
        query = select(UserSkill).where(UserSkill.user_id == user_id)
        query = query.options(selectinload(UserSkill.skill))
        
        # Apply filters
        if proficiency_level:
            query = query.where(UserSkill.proficiency_level == proficiency_level.value)
        
        if verified_only:
            query = query.where(UserSkill.is_verified == True)
        
        if category:
            query = query.join(Skill).where(Skill.category == category.value)
        
        query = query.order_by(UserSkill.created_at.desc())
        
        result = await self.db.execute(query)
        user_skills = result.scalars().all()
        
        logger.info(f"Retrieved {len(user_skills)} skills for user {user_id}")
        return user_skills
    
    async def add_user_skill(
        self,
        user_id: str,
        skill_data: UserSkillCreate
    ) -> UserSkill:
        """Add skill to user's profile"""
        # Verify skill exists
        skill = await self.get_skill_by_id(skill_data.skill_id)
        if not skill:
            raise ValueError(f"Skill not found: {skill_data.skill_id}")
        
        # Check if user already has this skill
        existing = await self.db.execute(
            select(UserSkill).where(
                and_(
                    UserSkill.user_id == user_id,
                    UserSkill.skill_id == skill_data.skill_id
                )
            )
        )
        if existing.scalar_one_or_none():
            raise ValueError(f"User already has this skill")
        
        user_skill = UserSkill(
            user_id=user_id,
            skill_id=skill_data.skill_id,
            proficiency_level=skill_data.proficiency_level.value,
            years_of_experience=skill_data.years_of_experience,
            last_used_date=skill_data.last_used_date
        )
        
        self.db.add(user_skill)
        await self.db.commit()
        await self.db.refresh(user_skill)
        
        # Load skill relationship
        await self.db.refresh(user_skill, ['skill'])
        
        logger.info(f"Added skill {skill.name} to user {user_id}")
        return user_skill
    
    async def update_user_skill(
        self,
        user_id: str,
        skill_id: str,
        skill_data: UserSkillUpdate
    ) -> UserSkill:
        """Update user's skill"""
        result = await self.db.execute(
            select(UserSkill).where(
                and_(
                    UserSkill.user_id == user_id,
                    UserSkill.skill_id == skill_id
                )
            ).options(selectinload(UserSkill.skill))
        )
        user_skill = result.scalar_one_or_none()
        
        if not user_skill:
            raise ValueError(f"User skill not found")
        
        # Update fields
        if skill_data.proficiency_level is not None:
            user_skill.proficiency_level = skill_data.proficiency_level.value
        if skill_data.years_of_experience is not None:
            user_skill.years_of_experience = skill_data.years_of_experience
        if skill_data.last_used_date is not None:
            user_skill.last_used_date = skill_data.last_used_date
        
        await self.db.commit()
        await self.db.refresh(user_skill)
        
        logger.info(f"Updated skill {skill_id} for user {user_id}")
        return user_skill
    
    async def remove_user_skill(self, user_id: str, skill_id: str) -> bool:
        """Remove skill from user's profile"""
        result = await self.db.execute(
            select(UserSkill).where(
                and_(
                    UserSkill.user_id == user_id,
                    UserSkill.skill_id == skill_id
                )
            )
        )
        user_skill = result.scalar_one_or_none()
        
        if not user_skill:
            raise ValueError(f"User skill not found")
        
        await self.db.delete(user_skill)
        await self.db.commit()
        
        logger.info(f"Removed skill {skill_id} from user {user_id}")
        return True
    
    # ========================================================================
    # SKILL VERIFICATION METHODS
    # ========================================================================
    
    async def request_skill_verification(
        self,
        user_id: str,
        user_skill_id: str,
        evidence: Optional[str] = None
    ) -> SkillVerificationRequest:
        """Request skill verification"""
        # Verify user skill exists and belongs to user
        result = await self.db.execute(
            select(UserSkill).where(
                and_(
                    UserSkill.id == user_skill_id,
                    UserSkill.user_id == user_id
                )
            )
        )
        user_skill = result.scalar_one_or_none()
        
        if not user_skill:
            raise ValueError(f"User skill not found")
        
        # Check if verification already requested
        existing = await self.db.execute(
            select(SkillVerificationRequest).where(
                and_(
                    SkillVerificationRequest.user_skill_id == user_skill_id,
                    SkillVerificationRequest.status == 'pending'
                )
            )
        )
        if existing.scalar_one_or_none():
            raise ValueError(f"Verification already pending for this skill")
        
        verification_request = SkillVerificationRequest(
            user_skill_id=user_skill_id,
            requested_by=user_id,
            verification_evidence=evidence,
            status='pending'
        )
        
        self.db.add(verification_request)
        await self.db.commit()
        await self.db.refresh(verification_request)
        
        logger.info(f"Skill verification requested: {user_skill_id}")
        return verification_request
    
    async def approve_skill_verification(
        self,
        verification_id: str,
        reviewer_id: str,
        notes: Optional[str] = None
    ) -> UserSkill:
        """Approve skill verification (admin only)"""
        # Get verification request
        result = await self.db.execute(
            select(SkillVerificationRequest)
            .where(SkillVerificationRequest.id == verification_id)
            .options(selectinload(SkillVerificationRequest.user_skill))
        )
        verification = result.scalar_one_or_none()
        
        if not verification:
            raise ValueError(f"Verification request not found")
        
        # Update verification request
        verification.status = 'approved'
        verification.reviewed_by = reviewer_id
        verification.reviewed_at = datetime.utcnow()
        verification.review_notes = notes
        
        # Update user skill
        user_skill = verification.user_skill
        user_skill.is_verified = True
        user_skill.verified_by = reviewer_id
        user_skill.verified_at = datetime.utcnow()
        
        await self.db.commit()
        await self.db.refresh(user_skill)
        
        logger.info(f"Skill verification approved: {verification_id}")
        return user_skill
    
    # ========================================================================
    # BULK OPERATIONS
    # ========================================================================
    
    async def add_multiple_skills(
        self,
        user_id: str,
        skills_data: List[UserSkillCreate]
    ) -> List[UserSkill]:
        """Add multiple skills at once"""
        user_skills = []
        
        for skill_data in skills_data:
            try:
                user_skill = await self.add_user_skill(user_id, skill_data)
                user_skills.append(user_skill)
            except ValueError as e:
                logger.warning(f"Skipping skill {skill_data.skill_id}: {str(e)}")
                continue
        
        logger.info(f"Added {len(user_skills)} skills to user {user_id}")
        return user_skills
    
    async def remove_multiple_skills(
        self,
        user_id: str,
        skill_ids: List[str]
    ) -> int:
        """Remove multiple skills at once"""
        count = 0
        
        for skill_id in skill_ids:
            try:
                await self.remove_user_skill(user_id, skill_id)
                count += 1
            except ValueError as e:
                logger.warning(f"Skipping skill {skill_id}: {str(e)}")
                continue
        
        logger.info(f"Removed {count} skills from user {user_id}")
        return count

