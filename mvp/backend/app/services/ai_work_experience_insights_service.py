"""
NOOR Platform - AI Work Experience Insights Service
Uses Claude AI to generate insights from work experience data
"""

from typing import List, Dict, Any, Optional
import logging
import json
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.ai_client import get_ai_client
from app.db.models import WorkExperience
from datetime import datetime

logger = logging.getLogger(__name__)


class AIWorkExperienceInsightsService:
    """
    AI-powered work experience insights using Claude
    """
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self.ai_client = get_ai_client()
    
    async def generate_experience_summary(
        self,
        user_id: str
    ) -> Dict[str, Any]:
        """
        Generate AI-powered summary of work experience
        
        Args:
            user_id: User ID
            
        Returns:
            Experience summary with insights
        """
        work_history = await self._get_work_history(user_id)
        
        if not work_history:
            return {
                "summary": "No work experience found",
                "insights": []
            }
        
        if not self.ai_client.is_available():
            return self._fallback_summary(work_history)
        
        return await self._ai_powered_summary(work_history)
    
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
                "responsibilities": exp.responsibilities or [],
                "achievements": exp.achievements or [],
                "location": exp.location
            }
            for exp in experiences
        ]
    
    async def _ai_powered_summary(
        self,
        work_history: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Generate AI-powered experience summary
        """
        system_prompt = """You are a professional resume writer and career analyst for the NOOR Platform.

Analyze the work experience and provide:
1. Professional summary (2-3 sentences)
2. Key strengths and expertise areas
3. Career progression insights
4. Industry experience breakdown
5. Notable achievements
6. Areas of specialization
7. Professional development trajectory

Write in a professional, compelling style suitable for executive summaries."""
        
        prompt = f"""Analyze this work experience:

{json.dumps(work_history, indent=2)}

Generate a comprehensive professional summary."""
        
        output_schema = {
            "professional_summary": "string (2-3 sentences)",
            "total_years_experience": "float",
            "key_strengths": ["list of 5-7 strengths"],
            "expertise_areas": ["list of expertise areas"],
            "career_progression": "string (analysis of progression)",
            "industry_experience": [
                {
                    "industry": "string",
                    "years": "float",
                    "roles": ["list of roles"]
                }
            ],
            "notable_achievements": ["list of top achievements"],
            "specializations": ["list of specializations"],
            "career_highlights": ["list of highlights"],
            "professional_development": "string (trajectory analysis)"
        }
        
        try:
            summary = await self.ai_client.generate_structured_output_async(
                prompt=prompt,
                system_prompt=system_prompt,
                output_schema=output_schema
            )
            
            logger.info("AI experience summary generated successfully")
            
            return {
                "success": True,
                "summary": summary,
                "generated_at": datetime.now().isoformat(),
                "generated_by": "ai"
            }
            
        except Exception as e:
            logger.error(f"AI summary generation failed: {e}")
            return self._fallback_summary(work_history)
    
    def _fallback_summary(self, work_history: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Fallback summary without AI"""
        total_months = sum(exp.get("duration_months", 0) for exp in work_history)
        total_years = round(total_months / 12, 1)
        
        industries = list(set(exp.get("industry", "Unknown") for exp in work_history))
        companies = [exp.get("company") for exp in work_history]
        
        return {
            "success": True,
            "summary": {
                "professional_summary": f"Professional with {total_years} years of experience across {len(companies)} organizations.",
                "total_years_experience": total_years,
                "key_strengths": ["Experience", "Adaptability", "Professional growth"],
                "expertise_areas": industries,
                "career_progression": "Steady professional development",
                "industry_experience": [
                    {"industry": ind, "years": 0.0, "roles": []}
                    for ind in industries
                ],
                "notable_achievements": ["Multiple roles across organizations"],
                "specializations": industries,
                "career_highlights": [f"Worked at {len(companies)} companies"],
                "professional_development": "Continuous career growth"
            },
            "generated_at": datetime.now().isoformat(),
            "generated_by": "fallback"
        }
    
    async def generate_achievement_highlights(
        self,
        user_id: str,
        max_highlights: int = 5
    ) -> Dict[str, Any]:
        """
        Extract and highlight top achievements using AI
        
        Args:
            user_id: User ID
            max_highlights: Maximum number of highlights
            
        Returns:
            Top achievement highlights
        """
        work_history = await self._get_work_history(user_id)
        
        if not self.ai_client.is_available():
            return {
                "highlights": ["AI service not available"]
            }
        
        system_prompt = f"""You are analyzing professional achievements for the NOOR Platform.

Extract and rank the top {max_highlights} most impressive achievements from the work experience.

For each achievement:
1. Rewrite in compelling, quantifiable language
2. Highlight impact and results
3. Use action verbs
4. Include metrics where available

Format for resume/LinkedIn."""
        
        prompt = f"""Extract top {max_highlights} achievements:

{json.dumps(work_history, indent=2)}

Return the most impressive, quantifiable achievements."""
        
        try:
            highlights_text = await self.ai_client.generate_completion_async(
                prompt=prompt,
                system_prompt=system_prompt,
                temperature=0.6
            )
            
            return {
                "highlights": highlights_text,
                "count": max_highlights,
                "generated_at": datetime.now().isoformat(),
                "generated_by": "ai"
            }
            
        except Exception as e:
            logger.error(f"Achievement highlights generation failed: {e}")
            return {
                "highlights": "Unable to generate highlights at this time"
            }
    
    async def suggest_experience_improvements(
        self,
        user_id: str
    ) -> Dict[str, Any]:
        """
        Suggest improvements to work experience descriptions
        
        Args:
            user_id: User ID
            
        Returns:
            Improvement suggestions
        """
        work_history = await self._get_work_history(user_id)
        
        if not self.ai_client.is_available():
            return {
                "suggestions": "AI service not available"
            }
        
        system_prompt = """You are a professional resume consultant for the NOOR Platform.

Review the work experience entries and suggest improvements:
1. Better action verbs
2. Quantifiable metrics to add
3. Missing information
4. Clarity improvements
5. Impact statements
6. Keywords for ATS optimization

Be specific and actionable."""
        
        prompt = f"""Review and suggest improvements:

{json.dumps(work_history, indent=2)}

Provide detailed, actionable suggestions."""
        
        try:
            suggestions = await self.ai_client.generate_completion_async(
                prompt=prompt,
                system_prompt=system_prompt,
                temperature=0.7
            )
            
            return {
                "suggestions": suggestions,
                "entries_reviewed": len(work_history),
                "generated_at": datetime.now().isoformat(),
                "generated_by": "ai"
            }
            
        except Exception as e:
            logger.error(f"Improvement suggestions failed: {e}")
            return {
                "suggestions": "Unable to generate suggestions at this time"
            }
    
    async def generate_linkedin_summary(
        self,
        user_id: str
    ) -> Dict[str, Any]:
        """
        Generate LinkedIn-optimized professional summary
        
        Args:
            user_id: User ID
            
        Returns:
            LinkedIn summary
        """
        work_history = await self._get_work_history(user_id)
        
        if not self.ai_client.is_available():
            return {
                "summary": "AI service not available"
            }
        
        system_prompt = """You are a LinkedIn profile optimization expert for the NOOR Platform.

Create a compelling LinkedIn "About" section (2-3 paragraphs) that:
1. Starts with a strong hook
2. Highlights key expertise and achievements
3. Shows personality and passion
4. Includes relevant keywords
5. Ends with a call-to-action
6. Optimized for searchability
7. Professional yet personable tone

Write in first person."""
        
        prompt = f"""Create LinkedIn summary from:

{json.dumps(work_history, indent=2)}

Generate engaging, keyword-rich summary."""
        
        try:
            linkedin_summary = await self.ai_client.generate_completion_async(
                prompt=prompt,
                system_prompt=system_prompt,
                temperature=0.8
            )
            
            return {
                "summary": linkedin_summary,
                "character_count": len(linkedin_summary),
                "generated_at": datetime.now().isoformat(),
                "generated_by": "ai"
            }
            
        except Exception as e:
            logger.error(f"LinkedIn summary generation failed: {e}")
            return {
                "summary": "Unable to generate LinkedIn summary at this time"
            }
    
    async def analyze_career_gaps(
        self,
        user_id: str
    ) -> Dict[str, Any]:
        """
        Analyze employment gaps and provide guidance
        
        Args:
            user_id: User ID
            
        Returns:
            Gap analysis and recommendations
        """
        work_history = await self._get_work_history(user_id)
        
        if not self.ai_client.is_available():
            return {
                "analysis": "AI service not available"
            }
        
        system_prompt = """You are analyzing employment gaps for the NOOR Platform.

Identify any gaps in employment and provide:
1. Gap identification (dates and duration)
2. Potential concerns for employers
3. Strategies to address gaps
4. Positive framing suggestions
5. Questions to prepare for

Be supportive and constructive."""
        
        prompt = f"""Analyze employment gaps:

{json.dumps(work_history, indent=2)}

Provide gap analysis and guidance."""
        
        try:
            gap_analysis = await self.ai_client.generate_completion_async(
                prompt=prompt,
                system_prompt=system_prompt,
                temperature=0.6
            )
            
            return {
                "analysis": gap_analysis,
                "entries_analyzed": len(work_history),
                "generated_at": datetime.now().isoformat(),
                "generated_by": "ai"
            }
            
        except Exception as e:
            logger.error(f"Gap analysis failed: {e}")
            return {
                "analysis": "Unable to generate gap analysis at this time"
            }

