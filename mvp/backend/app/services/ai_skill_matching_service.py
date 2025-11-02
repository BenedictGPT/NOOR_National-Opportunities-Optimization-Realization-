"""
NOOR Platform - AI-Powered Skill Matching Service
Uses Claude AI for intelligent skill matching and job recommendations
"""

from typing import List, Dict, Any, Optional
import logging
import json
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.ai_client import get_ai_client
from app.db.models import Skill, UserSkill, User
from app.models.skills import ProficiencyLevel

logger = logging.getLogger(__name__)


class AISkillMatchingService:
    """
    AI-powered skill matching service using Claude
    """
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self.ai_client = get_ai_client()
    
    async def match_user_to_job(
        self,
        user_id: str,
        job_requirements: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Match user skills to job requirements using AI
        
        Args:
            user_id: User ID
            job_requirements: Job requirements with skills, experience, etc.
            
        Returns:
            Match analysis with score and recommendations
        """
        # Fetch user skills
        user_skills = await self._get_user_skills(user_id)
        
        if not user_skills:
            return {
                "match_score": 0.0,
                "matched_skills": 0,
                "total_required_skills": len(job_requirements.get("required_skills", [])),
                "recommendation": "No skills found for user",
                "details": []
            }
        
        # Use AI for intelligent matching
        if self.ai_client.is_available():
            return await self._ai_powered_matching(user_skills, job_requirements)
        else:
            return await self._rule_based_matching(user_skills, job_requirements)
    
    async def _get_user_skills(self, user_id: str) -> List[Dict[str, Any]]:
        """Fetch user skills from database"""
        result = await self.db.execute(
            select(UserSkill)
            .where(UserSkill.user_id == user_id)
            .join(Skill)
        )
        
        user_skills_list = result.scalars().all()
        
        return [
            {
                "skill_name": us.skill.name,
                "skill_category": us.skill.category,
                "proficiency_level": us.proficiency_level,
                "years_of_experience": float(us.years_of_experience or 0),
                "is_verified": us.is_verified
            }
            for us in user_skills_list
        ]
    
    async def _ai_powered_matching(
        self,
        user_skills: List[Dict[str, Any]],
        job_requirements: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Use Claude AI for intelligent skill matching
        """
        system_prompt = """You are an expert career advisor and skill matching specialist for the NOOR Platform.

Your task is to analyze a candidate's skills against job requirements and provide:
1. Overall match score (0-1)
2. Detailed skill-by-skill analysis
3. Strengths and gaps
4. Hiring recommendation
5. Development suggestions

Consider:
- Proficiency levels (beginner, intermediate, advanced, expert)
- Years of experience
- Skill verification status
- Transferable skills
- Learning potential"""
        
        prompt = f"""Analyze this skill match:

**User Skills:**
{json.dumps(user_skills, indent=2)}

**Job Requirements:**
{json.dumps(job_requirements, indent=2)}

Provide a comprehensive matching analysis."""
        
        output_schema = {
            "match_score": "float (0-1)",
            "matched_skills": "integer",
            "total_required_skills": "integer",
            "recommendation": "string (hire/interview/consider/reject)",
            "strengths": ["list of strengths"],
            "gaps": ["list of skill gaps"],
            "development_suggestions": ["list of suggestions"],
            "skill_details": [
                {
                    "skill_name": "string",
                    "required": "boolean",
                    "user_has": "boolean",
                    "user_proficiency": "string or null",
                    "required_proficiency": "string or null",
                    "match_quality": "string (excellent/good/fair/poor/missing)"
                }
            ]
        }
        
        try:
            analysis = await self.ai_client.generate_structured_output_async(
                prompt=prompt,
                system_prompt=system_prompt,
                output_schema=output_schema
            )
            
            logger.info(f"AI matching completed: {analysis['match_score']:.2f} match score")
            
            return analysis
            
        except Exception as e:
            logger.error(f"AI matching failed: {e}")
            return await self._rule_based_matching(user_skills, job_requirements)
    
    async def _rule_based_matching(
        self,
        user_skills: List[Dict[str, Any]],
        job_requirements: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Fallback rule-based matching
        """
        required_skills = job_requirements.get("required_skills", [])
        optional_skills = job_requirements.get("optional_skills", [])
        
        user_skill_names = {skill["skill_name"].lower() for skill in user_skills}
        
        # Count matches
        required_matches = sum(
            1 for req in required_skills
            if req.lower() in user_skill_names
        )
        
        optional_matches = sum(
            1 for opt in optional_skills
            if opt.lower() in user_skill_names
        )
        
        # Calculate score
        if required_skills:
            required_score = required_matches / len(required_skills)
        else:
            required_score = 1.0
        
        if optional_skills:
            optional_score = optional_matches / len(optional_skills)
        else:
            optional_score = 0.0
        
        # Weighted average (70% required, 30% optional)
        match_score = (required_score * 0.7) + (optional_score * 0.3)
        
        # Recommendation
        if match_score >= 0.8:
            recommendation = "hire"
        elif match_score >= 0.6:
            recommendation = "interview"
        elif match_score >= 0.4:
            recommendation = "consider"
        else:
            recommendation = "reject"
        
        return {
            "match_score": round(match_score, 2),
            "matched_skills": required_matches + optional_matches,
            "total_required_skills": len(required_skills),
            "recommendation": recommendation,
            "strengths": [skill["skill_name"] for skill in user_skills[:5]],
            "gaps": [req for req in required_skills if req.lower() not in user_skill_names],
            "development_suggestions": ["Develop missing required skills"],
            "skill_details": []
        }
    
    async def recommend_jobs_for_user(
        self,
        user_id: str,
        available_jobs: List[Dict[str, Any]],
        top_n: int = 10
    ) -> List[Dict[str, Any]]:
        """
        Recommend best matching jobs for a user
        
        Args:
            user_id: User ID
            available_jobs: List of available jobs with requirements
            top_n: Number of top recommendations to return
            
        Returns:
            List of job recommendations with match scores
        """
        recommendations = []
        
        for job in available_jobs:
            match_result = await self.match_user_to_job(
                user_id=user_id,
                job_requirements=job.get("requirements", {})
            )
            
            recommendations.append({
                "job_id": job.get("job_id"),
                "job_title": job.get("title"),
                "company": job.get("company"),
                "match_score": match_result["match_score"],
                "recommendation": match_result["recommendation"],
                "matched_skills": match_result["matched_skills"],
                "total_required_skills": match_result["total_required_skills"]
            })
        
        # Sort by match score
        recommendations.sort(key=lambda x: x["match_score"], reverse=True)
        
        return recommendations[:top_n]
    
    async def suggest_skill_improvements(
        self,
        user_id: str,
        target_job_title: str
    ) -> Dict[str, Any]:
        """
        Suggest skills to improve for a target job
        
        Args:
            user_id: User ID
            target_job_title: Target job title
            
        Returns:
            Skill improvement suggestions
        """
        user_skills = await self._get_user_skills(user_id)
        
        if not self.ai_client.is_available():
            return {
                "target_job": target_job_title,
                "suggestions": ["AI service not available for personalized suggestions"]
            }
        
        system_prompt = """You are a career development advisor for the NOOR Platform.

Analyze the user's current skills and suggest specific improvements to help them qualify for their target job.

Provide:
1. Skills to acquire
2. Skills to improve (with current and target proficiency)
3. Recommended learning resources
4. Estimated time to achieve target
5. Priority ranking"""
        
        prompt = f"""User wants to become: {target_job_title}

Current skills:
{json.dumps(user_skills, indent=2)}

Provide detailed skill improvement plan."""
        
        try:
            suggestions_text = await self.ai_client.generate_completion_async(
                prompt=prompt,
                system_prompt=system_prompt,
                temperature=0.7
            )
            
            return {
                "target_job": target_job_title,
                "current_skills_count": len(user_skills),
                "suggestions": suggestions_text,
                "generated_by": "ai"
            }
            
        except Exception as e:
            logger.error(f"Skill suggestion generation failed: {e}")
            return {
                "target_job": target_job_title,
                "suggestions": "Unable to generate personalized suggestions at this time"
            }
    
    async def analyze_skill_gaps(
        self,
        user_id: str,
        industry: str
    ) -> Dict[str, Any]:
        """
        Analyze skill gaps for a specific industry
        
        Args:
            user_id: User ID
            industry: Target industry
            
        Returns:
            Skill gap analysis
        """
        user_skills = await self._get_user_skills(user_id)
        
        if not self.ai_client.is_available():
            return {
                "industry": industry,
                "analysis": "AI service not available for gap analysis"
            }
        
        system_prompt = f"""You are analyzing skill gaps for the {industry} industry in the UAE.

Provide:
1. In-demand skills for this industry
2. User's current alignment
3. Critical gaps to address
4. Nice-to-have skills
5. Industry trends"""
        
        prompt = f"""Analyze skill gaps for {industry} industry:

User's current skills:
{json.dumps(user_skills, indent=2)}

Provide comprehensive gap analysis."""
        
        try:
            analysis_text = await self.ai_client.generate_completion_async(
                prompt=prompt,
                system_prompt=system_prompt,
                temperature=0.6
            )
            
            return {
                "industry": industry,
                "user_skills_count": len(user_skills),
                "analysis": analysis_text,
                "generated_by": "ai"
            }
            
        except Exception as e:
            logger.error(f"Gap analysis failed: {e}")
            return {
                "industry": industry,
                "analysis": "Unable to generate gap analysis at this time"
            }

