"""
AI Analysis Agent for NOOR Platform

This agent performs AI-powered analysis and recommendations:
- Skill matching and scoring
- Career path recommendations
- Learning path generation
- Resume analysis and optimization
- Job description analysis
"""

import logging
from typing import Dict, List, Any, Optional
from datetime import datetime

from app.agents.base_agent import BaseAgent, AgentCapability, AgentStatus
from app.core.ai_client import get_ai_client
from app.agents.data_retrieval_agent import get_data_retrieval_agent

logger = logging.getLogger(__name__)


class AIAnalysisAgent(BaseAgent):
    """Agent for AI-powered analysis and recommendations"""
    
    def __init__(self):
        super().__init__(
            agent_id="ai-analysis-001",
            name="AI Analysis Agent",
            description="Performs AI-powered analysis, matching, and recommendations",
            capabilities=[
                AgentCapability.AI_ANALYSIS,
                AgentCapability.SKILL_MATCHING,
                AgentCapability.RECOMMENDATIONS
            ]
        )
        self.ai_client = get_ai_client()
        self.data_agent = get_data_retrieval_agent()
        
    async def execute(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute AI analysis task
        
        Args:
            task: Task dictionary with action and parameters
            
        Returns:
            Result dictionary with analysis results
        """
        try:
            self.status = AgentStatus.BUSY
            action = task.get("action")
            parameters = task.get("parameters", {})
            
            logger.info(f"AI Analysis Agent executing: {action}")
            
            # Route to appropriate method
            if action == "analyze_skill_match":
                result = await self.analyze_skill_match(
                    parameters.get("user_skills"),
                    parameters.get("job_requirements")
                )
            elif action == "generate_career_recommendations":
                result = await self.generate_career_recommendations(
                    parameters.get("user_profile")
                )
            elif action == "create_learning_path":
                result = await self.create_learning_path(
                    parameters.get("current_skills"),
                    parameters.get("target_role")
                )
            elif action == "analyze_resume":
                result = await self.analyze_resume(
                    parameters.get("resume_text")
                )
            elif action == "optimize_job_description":
                result = await self.optimize_job_description(
                    parameters.get("job_data")
                )
            elif action == "predict_salary_range":
                result = await self.predict_salary_range(
                    parameters.get("role"),
                    parameters.get("experience"),
                    parameters.get("location")
                )
            elif action == "analyze_career_progression":
                result = await self.analyze_career_progression(
                    parameters.get("work_history")
                )
            else:
                raise ValueError(f"Unknown action: {action}")
            
            self.status = AgentStatus.IDLE
            return {
                "success": True,
                "action": action,
                "analysis": result,
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            self.status = AgentStatus.ERROR
            logger.error(f"AI Analysis Agent error: {e}")
            return {
                "success": False,
                "error": str(e),
                "action": task.get("action"),
                "timestamp": datetime.utcnow().isoformat()
            }
    
    async def analyze_skill_match(
        self,
        user_skills: List[Dict[str, Any]],
        job_requirements: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Analyze how well user skills match job requirements"""
        try:
            prompt = f"""Analyze the skill match between a candidate and a job posting.

Candidate Skills:
{self._format_skills(user_skills)}

Job Requirements:
Required Skills: {job_requirements.get('required_skills', [])}
Preferred Skills: {job_requirements.get('preferred_skills', [])}
Job Title: {job_requirements.get('title', 'N/A')}
Industry: {job_requirements.get('industry', 'N/A')}

Provide a detailed analysis including:
1. Overall match score (0-100)
2. Matched skills (both required and preferred)
3. Missing required skills
4. Missing preferred skills
5. Transferable skills
6. Recommendation (Strong Match / Good Match / Weak Match / Not Recommended)
7. Specific suggestions for improvement

Format as JSON."""

            analysis = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "match_score": "number (0-100)",
                    "matched_required_skills": "array of strings",
                    "matched_preferred_skills": "array of strings",
                    "missing_required_skills": "array of strings",
                    "missing_preferred_skills": "array of strings",
                    "transferable_skills": "array of strings",
                    "recommendation": "string",
                    "improvement_suggestions": "array of strings"
                }
            )
            
            logger.info(f"Skill match analysis completed: {analysis.get('match_score')}% match")
            return analysis
            
        except Exception as e:
            logger.error(f"Error analyzing skill match: {e}")
            # Fallback to rule-based matching
            return self._fallback_skill_match(user_skills, job_requirements)
    
    async def generate_career_recommendations(
        self,
        user_profile: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Generate personalized career recommendations"""
        try:
            # Fetch user skills and experience
            user_skills = await self.data_agent.fetch_user_skills(user_profile["id"])
            work_experience = await self.data_agent.fetch_work_experience(user_profile["id"])
            
            prompt = f"""Generate personalized career recommendations for this professional.

Profile:
Name: {user_profile.get('first_name', '')} {user_profile.get('last_name', '')}
Current Skills: {self._format_skills(user_skills)}
Work Experience: {self._format_experience(work_experience)}

Provide comprehensive career recommendations including:
1. Career progression score (0-10)
2. Recommended next career moves (3-5 options)
3. Skills to develop for each recommendation
4. Estimated timeline for each transition
5. Salary expectations for each role
6. Industry trends relevant to their profile
7. Actionable steps to take (prioritized)

Format as JSON."""

            recommendations = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "progression_score": "number (0-10)",
                    "recommended_roles": "array of objects with: title, description, required_skills, timeline, salary_range",
                    "skills_to_develop": "array of strings",
                    "industry_trends": "array of strings",
                    "action_steps": "array of objects with: step, priority, estimated_time"
                }
            )
            
            logger.info(f"Career recommendations generated for user: {user_profile['id']}")
            return recommendations
            
        except Exception as e:
            logger.error(f"Error generating career recommendations: {e}")
            return {"error": str(e)}
    
    async def create_learning_path(
        self,
        current_skills: List[str],
        target_role: str
    ) -> Dict[str, Any]:
        """Create a personalized learning path"""
        try:
            prompt = f"""Create a personalized learning path to transition from current skills to target role.

Current Skills: {', '.join(current_skills)}
Target Role: {target_role}

Provide a structured learning path including:
1. Skill gaps to fill
2. Learning modules (ordered by priority)
3. Estimated time for each module
4. Recommended resources (courses, books, projects)
5. Milestones and checkpoints
6. Total estimated time to proficiency

Format as JSON."""

            learning_path = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "skill_gaps": "array of strings",
                    "learning_modules": "array of objects with: name, description, skills_covered, duration, priority",
                    "resources": "array of objects with: title, type, url, cost",
                    "milestones": "array of objects with: milestone, timeframe, success_criteria",
                    "total_duration": "string"
                }
            )
            
            logger.info(f"Learning path created for target role: {target_role}")
            return learning_path
            
        except Exception as e:
            logger.error(f"Error creating learning path: {e}")
            return {"error": str(e)}
    
    async def analyze_resume(self, resume_text: str) -> Dict[str, Any]:
        """Analyze resume and provide optimization suggestions"""
        try:
            prompt = f"""Analyze this resume and provide detailed feedback.

Resume:
{resume_text}

Provide comprehensive analysis including:
1. Overall quality score (0-100)
2. Strengths (3-5 points)
3. Weaknesses (3-5 points)
4. Extracted skills
5. Extracted experience summary
6. ATS compatibility score
7. Specific improvement suggestions
8. Recommended additions
9. Content to remove or rephrase

Format as JSON."""

            analysis = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "quality_score": "number (0-100)",
                    "strengths": "array of strings",
                    "weaknesses": "array of strings",
                    "extracted_skills": "array of strings",
                    "experience_summary": "string",
                    "ats_score": "number (0-100)",
                    "improvements": "array of strings",
                    "recommended_additions": "array of strings",
                    "content_to_remove": "array of strings"
                }
            )
            
            logger.info(f"Resume analysis completed: {analysis.get('quality_score')}% quality")
            return analysis
            
        except Exception as e:
            logger.error(f"Error analyzing resume: {e}")
            return {"error": str(e)}
    
    async def optimize_job_description(self, job_data: Dict[str, Any]) -> Dict[str, Any]:
        """Optimize job description for better candidate attraction"""
        try:
            prompt = f"""Optimize this job description to attract better candidates.

Current Job Description:
Title: {job_data.get('title')}
Description: {job_data.get('description')}
Requirements: {job_data.get('requirements')}
Benefits: {job_data.get('benefits', 'Not specified')}

Provide optimization suggestions including:
1. Improved title (more attractive and SEO-friendly)
2. Enhanced description (clear, compelling, inclusive)
3. Better structured requirements (must-have vs nice-to-have)
4. Highlighted benefits and perks
5. Inclusive language improvements
6. Keywords to add for better visibility
7. Overall attractiveness score (0-100)

Format as JSON."""

            optimization = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "improved_title": "string",
                    "enhanced_description": "string",
                    "must_have_requirements": "array of strings",
                    "nice_to_have_requirements": "array of strings",
                    "highlighted_benefits": "array of strings",
                    "inclusive_language_suggestions": "array of strings",
                    "seo_keywords": "array of strings",
                    "attractiveness_score": "number (0-100)"
                }
            )
            
            logger.info(f"Job description optimized: {job_data.get('title')}")
            return optimization
            
        except Exception as e:
            logger.error(f"Error optimizing job description: {e}")
            return {"error": str(e)}
    
    async def predict_salary_range(
        self,
        role: str,
        experience: int,
        location: str
    ) -> Dict[str, Any]:
        """Predict salary range for a role"""
        try:
            prompt = f"""Predict the salary range for this role in UAE.

Role: {role}
Years of Experience: {experience}
Location: {location}

Provide salary prediction including:
1. Minimum salary (AED per month)
2. Maximum salary (AED per month)
3. Average salary (AED per month)
4. Factors affecting salary
5. Comparison with regional average
6. Growth potential

Format as JSON."""

            prediction = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "min_salary": "number",
                    "max_salary": "number",
                    "average_salary": "number",
                    "currency": "string",
                    "factors": "array of strings",
                    "regional_comparison": "string",
                    "growth_potential": "string"
                }
            )
            
            logger.info(f"Salary prediction completed for role: {role}")
            return prediction
            
        except Exception as e:
            logger.error(f"Error predicting salary: {e}")
            return {"error": str(e)}
    
    async def analyze_career_progression(
        self,
        work_history: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Analyze career progression and provide insights"""
        try:
            prompt = f"""Analyze this career progression and provide insights.

Work History:
{self._format_experience(work_history)}

Provide comprehensive analysis including:
1. Career trajectory score (0-10)
2. Progression pattern (Upward / Lateral / Mixed / Declining)
3. Key achievements and milestones
4. Skills evolution over time
5. Industry transitions (if any)
6. Gaps and concerns
7. Strengths in career path
8. Recommendations for next steps

Format as JSON."""

            analysis = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "trajectory_score": "number (0-10)",
                    "progression_pattern": "string",
                    "key_achievements": "array of strings",
                    "skills_evolution": "array of strings",
                    "industry_transitions": "array of strings",
                    "gaps_and_concerns": "array of strings",
                    "strengths": "array of strings",
                    "recommendations": "array of strings"
                }
            )
            
            logger.info(f"Career progression analysis completed")
            return analysis
            
        except Exception as e:
            logger.error(f"Error analyzing career progression: {e}")
            return {"error": str(e)}
    
    # Helper methods
    
    def _format_skills(self, skills: List[Dict[str, Any]]) -> str:
        """Format skills list for AI prompt"""
        if not skills:
            return "No skills listed"
        
        formatted = []
        for skill in skills:
            formatted.append(
                f"- {skill.get('skill_name', skill.get('name', 'Unknown'))} "
                f"({skill.get('proficiency_level', 'N/A')}, "
                f"{skill.get('years_of_experience', 0)} years)"
            )
        return "\n".join(formatted)
    
    def _format_experience(self, experiences: List[Dict[str, Any]]) -> str:
        """Format work experience for AI prompt"""
        if not experiences:
            return "No work experience listed"
        
        formatted = []
        for exp in experiences:
            duration = f"{exp.get('start_date', 'N/A')} - "
            duration += "Present" if exp.get('is_current') else exp.get('end_date', 'N/A')
            
            formatted.append(
                f"- {exp.get('job_title', 'N/A')} at {exp.get('company_name', 'N/A')}\n"
                f"  Duration: {duration}\n"
                f"  Industry: {exp.get('industry', 'N/A')}\n"
                f"  Description: {exp.get('description', 'N/A')}"
            )
        return "\n\n".join(formatted)
    
    def _fallback_skill_match(
        self,
        user_skills: List[Dict[str, Any]],
        job_requirements: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Fallback rule-based skill matching"""
        user_skill_names = {
            skill.get('skill_name', skill.get('name', '')).lower()
            for skill in user_skills
        }
        
        required = set(s.lower() for s in job_requirements.get('required_skills', []))
        preferred = set(s.lower() for s in job_requirements.get('preferred_skills', []))
        
        matched_required = user_skill_names & required
        matched_preferred = user_skill_names & preferred
        missing_required = required - user_skill_names
        missing_preferred = preferred - user_skill_names
        
        # Calculate match score
        required_match = len(matched_required) / len(required) if required else 1.0
        preferred_match = len(matched_preferred) / len(preferred) if preferred else 0.5
        match_score = int((required_match * 0.7 + preferred_match * 0.3) * 100)
        
        # Determine recommendation
        if match_score >= 80:
            recommendation = "Strong Match"
        elif match_score >= 60:
            recommendation = "Good Match"
        elif match_score >= 40:
            recommendation = "Weak Match"
        else:
            recommendation = "Not Recommended"
        
        return {
            "match_score": match_score,
            "matched_required_skills": list(matched_required),
            "matched_preferred_skills": list(matched_preferred),
            "missing_required_skills": list(missing_required),
            "missing_preferred_skills": list(missing_preferred),
            "transferable_skills": [],
            "recommendation": recommendation,
            "improvement_suggestions": [
                f"Develop missing required skills: {', '.join(missing_required)}"
            ] if missing_required else []
        }


# Singleton instance
_ai_analysis_agent = None


def get_ai_analysis_agent() -> AIAnalysisAgent:
    """Get or create AI Analysis Agent instance"""
    global _ai_analysis_agent
    if _ai_analysis_agent is None:
        _ai_analysis_agent = AIAnalysisAgent()
    return _ai_analysis_agent

