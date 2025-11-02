"""
NOOR Platform - AI-Powered Career Recommendations Service
Uses Claude AI for personalized career guidance and recommendations
"""

from typing import List, Dict, Any, Optional
import logging
import json
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.ai_client import get_ai_client
from app.db.models import WorkExperience, UserSkill, User, Skill
from datetime import datetime

logger = logging.getLogger(__name__)


class AICareerRecommendationsService:
    """
    AI-powered career recommendations using Claude
    """
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self.ai_client = get_ai_client()
    
    async def generate_career_recommendations(
        self,
        user_id: str
    ) -> Dict[str, Any]:
        """
        Generate personalized career recommendations
        
        Args:
            user_id: User ID
            
        Returns:
            Career recommendations with next steps
        """
        # Gather user data
        user_profile = await self._get_user_profile(user_id)
        work_history = await self._get_work_history(user_id)
        skills = await self._get_user_skills(user_id)
        
        if not self.ai_client.is_available():
            return self._fallback_recommendations(user_profile, work_history, skills)
        
        # Generate AI-powered recommendations
        return await self._ai_powered_recommendations(user_profile, work_history, skills)
    
    async def _get_user_profile(self, user_id: str) -> Dict[str, Any]:
        """Fetch user profile"""
        result = await self.db.execute(
            select(User).where(User.id == user_id)
        )
        user = result.scalar_one_or_none()
        
        if not user:
            return {}
        
        return {
            "user_id": str(user.id),
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone_number,
            "nationality": user.nationality,
            "date_of_birth": user.date_of_birth.isoformat() if user.date_of_birth else None
        }
    
    async def _get_work_history(self, user_id: str) -> List[Dict[str, Any]]:
        """Fetch work history"""
        result = await self.db.execute(
            select(WorkExperience)
            .where(WorkExperience.user_id == user_id)
            .order_by(WorkExperience.start_date.desc())
        )
        experiences = result.scalars().all()
        
        return [
            {
                "company": exp.company_name,
                "title": exp.job_title,
                "employment_type": exp.employment_type,
                "industry": exp.industry,
                "start_date": exp.start_date.isoformat(),
                "end_date": exp.end_date.isoformat() if exp.end_date else "Present",
                "duration_months": exp.duration_months,
                "is_current": exp.is_current,
                "achievements": exp.achievements or []
            }
            for exp in experiences
        ]
    
    async def _get_user_skills(self, user_id: str) -> List[Dict[str, Any]]:
        """Fetch user skills"""
        result = await self.db.execute(
            select(UserSkill)
            .where(UserSkill.user_id == user_id)
            .join(Skill)
        )
        user_skills = result.scalars().all()
        
        return [
            {
                "skill_name": us.skill.name,
                "category": us.skill.category,
                "proficiency": us.proficiency_level,
                "years_experience": float(us.years_of_experience or 0),
                "verified": us.is_verified
            }
            for us in user_skills
        ]
    
    async def _ai_powered_recommendations(
        self,
        user_profile: Dict[str, Any],
        work_history: List[Dict[str, Any]],
        skills: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Generate AI-powered career recommendations
        """
        system_prompt = """You are an expert career advisor for the NOOR Platform in the UAE.

Analyze the user's profile, work history, and skills to provide:
1. Career progression assessment (score 0-10)
2. Recommended next career moves
3. Skills to develop
4. Industries to explore
5. Salary expectations
6. Timeline for next move
7. Specific action steps

Consider:
- UAE job market trends
- Industry growth sectors
- Skill demand
- Career trajectory
- Work-life balance
- Professional development opportunities"""
        
        prompt = f"""Provide comprehensive career recommendations:

**User Profile:**
{json.dumps(user_profile, indent=2)}

**Work History:**
{json.dumps(work_history, indent=2)}

**Skills:**
{json.dumps(skills, indent=2)}

Generate detailed, actionable career recommendations."""
        
        output_schema = {
            "career_progression_score": "float (0-10)",
            "current_career_stage": "string (entry/mid/senior/executive)",
            "recommended_roles": [
                {
                    "title": "string",
                    "industry": "string",
                    "rationale": "string",
                    "readiness_score": "float (0-1)",
                    "timeline": "string"
                }
            ],
            "skills_to_develop": [
                {
                    "skill": "string",
                    "priority": "string (high/medium/low)",
                    "reason": "string",
                    "learning_path": "string"
                }
            ],
            "industries_to_explore": ["list of industries"],
            "salary_expectations": {
                "current_range": "string",
                "potential_range": "string",
                "growth_potential": "string"
            },
            "action_steps": [
                {
                    "step": "string",
                    "priority": "integer (1-5)",
                    "timeline": "string",
                    "resources": ["list of resources"]
                }
            ],
            "insights": ["list of key insights"],
            "warnings": ["list of potential challenges"]
        }
        
        try:
            recommendations = await self.ai_client.generate_structured_output_async(
                prompt=prompt,
                system_prompt=system_prompt,
                output_schema=output_schema
            )
            
            logger.info(f"Career recommendations generated for user {user_profile.get('user_id')}")
            
            return {
                "success": True,
                "generated_at": datetime.now().isoformat(),
                "recommendations": recommendations,
                "generated_by": "ai"
            }
            
        except Exception as e:
            logger.error(f"AI recommendations failed: {e}")
            return self._fallback_recommendations(user_profile, work_history, skills)
    
    def _fallback_recommendations(
        self,
        user_profile: Dict[str, Any],
        work_history: List[Dict[str, Any]],
        skills: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Fallback recommendations without AI
        """
        total_months = sum(exp.get("duration_months", 0) for exp in work_history)
        total_years = round(total_months / 12, 1)
        
        # Determine career stage
        if total_years < 3:
            career_stage = "entry"
            progression_score = 5.0
        elif total_years < 7:
            career_stage = "mid"
            progression_score = 6.5
        elif total_years < 15:
            career_stage = "senior"
            progression_score = 7.5
        else:
            career_stage = "executive"
            progression_score = 8.0
        
        return {
            "success": True,
            "generated_at": datetime.now().isoformat(),
            "recommendations": {
                "career_progression_score": progression_score,
                "current_career_stage": career_stage,
                "recommended_roles": [
                    {
                        "title": "Next level position",
                        "industry": "Current industry",
                        "rationale": "Natural progression based on experience",
                        "readiness_score": 0.7,
                        "timeline": "6-12 months"
                    }
                ],
                "skills_to_develop": [
                    {
                        "skill": "Leadership",
                        "priority": "high",
                        "reason": "Essential for career advancement",
                        "learning_path": "Management courses and mentorship"
                    }
                ],
                "industries_to_explore": ["Technology", "Finance", "Healthcare"],
                "salary_expectations": {
                    "current_range": "Competitive",
                    "potential_range": "Higher with advancement",
                    "growth_potential": "Good"
                },
                "action_steps": [
                    {
                        "step": "Update skills profile",
                        "priority": 1,
                        "timeline": "This week",
                        "resources": ["NOOR Platform skills section"]
                    },
                    {
                        "step": "Network with industry professionals",
                        "priority": 2,
                        "timeline": "This month",
                        "resources": ["LinkedIn", "Professional associations"]
                    }
                ],
                "insights": [
                    f"You have {total_years} years of experience",
                    f"You have {len(skills)} skills in your profile"
                ],
                "warnings": ["AI service unavailable - recommendations are generic"]
            },
            "generated_by": "fallback"
        }
    
    async def generate_learning_path(
        self,
        user_id: str,
        target_role: str
    ) -> Dict[str, Any]:
        """
        Generate personalized learning path for target role
        
        Args:
            user_id: User ID
            target_role: Target job role
            
        Returns:
            Learning path with courses and timeline
        """
        skills = await self._get_user_skills(user_id)
        
        if not self.ai_client.is_available():
            return {
                "target_role": target_role,
                "learning_path": "AI service not available"
            }
        
        system_prompt = """You are a learning and development advisor for the NOOR Platform.

Create a detailed learning path to help the user transition to their target role.

Include:
1. Current skill assessment
2. Required skills for target role
3. Learning modules (ordered by priority)
4. Estimated time per module
5. Recommended resources (courses, certifications, books)
6. Milestones and checkpoints
7. Total timeline"""
        
        prompt = f"""Create learning path for: {target_role}

Current skills:
{json.dumps(skills, indent=2)}

Provide structured learning plan."""
        
        try:
            learning_path = await self.ai_client.generate_completion_async(
                prompt=prompt,
                system_prompt=system_prompt,
                temperature=0.6
            )
            
            return {
                "target_role": target_role,
                "current_skills_count": len(skills),
                "learning_path": learning_path,
                "generated_at": datetime.now().isoformat(),
                "generated_by": "ai"
            }
            
        except Exception as e:
            logger.error(f"Learning path generation failed: {e}")
            return {
                "target_role": target_role,
                "learning_path": "Unable to generate learning path at this time"
            }
    
    async def analyze_career_trajectory(
        self,
        user_id: str
    ) -> Dict[str, Any]:
        """
        Analyze career trajectory and predict future path
        
        Args:
            user_id: User ID
            
        Returns:
            Career trajectory analysis
        """
        work_history = await self._get_work_history(user_id)
        skills = await self._get_user_skills(user_id)
        
        if not self.ai_client.is_available():
            return {
                "analysis": "AI service not available"
            }
        
        system_prompt = """You are analyzing career trajectories for the NOOR Platform.

Analyze the user's career path and provide:
1. Career velocity (pace of progression)
2. Trajectory direction (upward/lateral/downward)
3. Industry consistency
4. Skill development pattern
5. Predicted next roles (3-5 years)
6. Potential career pivots
7. Risk factors"""
        
        prompt = f"""Analyze career trajectory:

Work History:
{json.dumps(work_history, indent=2)}

Skills:
{json.dumps(skills, indent=2)}

Provide comprehensive trajectory analysis."""
        
        try:
            analysis = await self.ai_client.generate_completion_async(
                prompt=prompt,
                system_prompt=system_prompt,
                temperature=0.5
            )
            
            return {
                "work_history_count": len(work_history),
                "skills_count": len(skills),
                "analysis": analysis,
                "generated_at": datetime.now().isoformat(),
                "generated_by": "ai"
            }
            
        except Exception as e:
            logger.error(f"Trajectory analysis failed: {e}")
            return {
                "analysis": "Unable to generate trajectory analysis at this time"
            }

