"""
Matching Agent for NOOR Platform

This agent handles intelligent matching between:
- Job seekers and job postings
- Skills and job requirements
- Candidates and employers
- Learning paths and career goals
- Mentors and mentees
"""

import logging
from typing import Dict, List, Any, Optional
from datetime import datetime

from app.agents.base_agent import BaseAgent, AgentCapability, AgentStatus
from app.core.ai_client import get_ai_client
from app.agents.data_retrieval_agent import get_data_retrieval_agent
from app.agents.ai_analysis_agent import get_ai_analysis_agent

logger = logging.getLogger(__name__)


class MatchingAgent(BaseAgent):
    """Agent for intelligent matching and recommendations"""
    
    def __init__(self):
        super().__init__(
            agent_id="matching-001",
            name="Matching Agent",
            description="Handles intelligent matching between users, jobs, skills, and opportunities",
            capabilities=[
                AgentCapability.SKILL_MATCHING,
                AgentCapability.RECOMMENDATIONS,
                AgentCapability.AI_ANALYSIS
            ]
        )
        self.ai_client = get_ai_client()
        self.data_agent = get_data_retrieval_agent()
        self.analysis_agent = get_ai_analysis_agent()
        
    async def execute(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute matching task
        
        Args:
            task: Task dictionary with action and parameters
            
        Returns:
            Result dictionary with matching results
        """
        try:
            self.status = AgentStatus.BUSY
            action = task.get("action")
            parameters = task.get("parameters", {})
            
            logger.info(f"Matching Agent executing: {action}")
            
            # Route to appropriate method
            if action == "match_jobs_to_user":
                result = await self.match_jobs_to_user(
                    user_id=parameters.get("user_id"),
                    limit=parameters.get("limit", 10)
                )
            elif action == "match_candidates_to_job":
                result = await self.match_candidates_to_job(
                    job_id=parameters.get("job_id"),
                    limit=parameters.get("limit", 20)
                )
            elif action == "match_skills_to_job":
                result = await self.match_skills_to_job(
                    user_skills=parameters.get("user_skills", []),
                    job_requirements=parameters.get("job_requirements", {})
                )
            elif action == "recommend_learning_paths":
                result = await self.recommend_learning_paths(
                    user_id=parameters.get("user_id"),
                    target_role=parameters.get("target_role")
                )
            elif action == "find_similar_profiles":
                result = await self.find_similar_profiles(
                    user_id=parameters.get("user_id"),
                    limit=parameters.get("limit", 10)
                )
            elif action == "match_mentors":
                result = await self.match_mentors(
                    user_id=parameters.get("user_id"),
                    skills=parameters.get("skills", [])
                )
            elif action == "recommend_skill_development":
                result = await self.recommend_skill_development(
                    user_id=parameters.get("user_id")
                )
            else:
                raise ValueError(f"Unknown action: {action}")
            
            self.status = AgentStatus.IDLE
            return {
                "success": True,
                "action": action,
                "matches": result,
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            self.status = AgentStatus.ERROR
            logger.error(f"Matching Agent error: {e}")
            return {
                "success": False,
                "error": str(e),
                "action": task.get("action"),
                "timestamp": datetime.utcnow().isoformat()
            }
    
    async def match_jobs_to_user(
        self,
        user_id: str,
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """Find best job matches for a user"""
        try:
            # Fetch user profile and skills
            user_profile = await self.data_agent.fetch_user_profile(user_id)
            user_skills = await self.data_agent.fetch_user_skills(user_id)
            work_experience = await self.data_agent.fetch_work_experience(user_id)
            
            # Fetch available jobs
            jobs = await self.data_agent.fetch_job_postings({
                "limit": 100  # Get more jobs for better matching
            })
            
            # Score each job
            scored_jobs = []
            for job in jobs:
                # Use AI Analysis Agent for skill matching
                match_result = await self.analysis_agent.execute({
                    "action": "analyze_skill_match",
                    "parameters": {
                        "user_skills": user_skills,
                        "job_requirements": {
                            "title": job.get("title"),
                            "required_skills": job.get("required_skills", []),
                            "preferred_skills": job.get("preferred_skills", []),
                            "industry": job.get("industry")
                        }
                    }
                })
                
                if match_result.get("success"):
                    analysis = match_result.get("analysis", {})
                    match_score = analysis.get("match_score", 0)
                    
                    scored_jobs.append({
                        **job,
                        "match_score": match_score,
                        "matched_skills": analysis.get("matched_required_skills", []),
                        "missing_skills": analysis.get("missing_required_skills", []),
                        "recommendation": analysis.get("recommendation")
                    })
            
            # Sort by match score and return top matches
            scored_jobs.sort(key=lambda x: x["match_score"], reverse=True)
            top_matches = scored_jobs[:limit]
            
            logger.info(f"Found {len(top_matches)} job matches for user {user_id}")
            return top_matches
            
        except Exception as e:
            logger.error(f"Error matching jobs to user: {e}")
            return []
    
    async def match_candidates_to_job(
        self,
        job_id: str,
        limit: int = 20
    ) -> List[Dict[str, Any]]:
        """Find best candidate matches for a job"""
        try:
            # In production, would fetch job details and all candidates
            # For MVP, return simplified matching
            
            logger.info(f"Matching candidates to job {job_id}")
            
            # Placeholder for MVP
            return {
                "job_id": job_id,
                "total_candidates": 0,
                "top_matches": [],
                "message": "Candidate matching will be implemented in next phase"
            }
            
        except Exception as e:
            logger.error(f"Error matching candidates to job: {e}")
            return []
    
    async def match_skills_to_job(
        self,
        user_skills: List[Dict[str, Any]],
        job_requirements: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Match user skills against job requirements"""
        try:
            # Use AI Analysis Agent
            result = await self.analysis_agent.execute({
                "action": "analyze_skill_match",
                "parameters": {
                    "user_skills": user_skills,
                    "job_requirements": job_requirements
                }
            })
            
            if result.get("success"):
                return result.get("analysis", {})
            else:
                # Fallback to rule-based matching
                return self._fallback_skill_matching(user_skills, job_requirements)
            
        except Exception as e:
            logger.error(f"Error matching skills to job: {e}")
            return self._fallback_skill_matching(user_skills, job_requirements)
    
    async def recommend_learning_paths(
        self,
        user_id: str,
        target_role: Optional[str] = None
    ) -> Dict[str, Any]:
        """Recommend learning paths for career development"""
        try:
            # Fetch user skills
            user_skills = await self.data_agent.fetch_user_skills(user_id)
            current_skills = [skill["skill_name"] for skill in user_skills]
            
            if not target_role:
                # Infer target role from work experience
                work_experience = await self.data_agent.fetch_work_experience(user_id)
                if work_experience:
                    latest_job = work_experience[0]
                    target_role = f"Senior {latest_job.get('job_title')}"
                else:
                    target_role = "Professional Development"
            
            # Use AI Analysis Agent to create learning path
            result = await self.analysis_agent.execute({
                "action": "create_learning_path",
                "parameters": {
                    "current_skills": current_skills,
                    "target_role": target_role
                }
            })
            
            if result.get("success"):
                return result.get("analysis", {})
            else:
                return {"error": "Unable to generate learning path"}
            
        except Exception as e:
            logger.error(f"Error recommending learning paths: {e}")
            return {"error": str(e)}
    
    async def find_similar_profiles(
        self,
        user_id: str,
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """Find users with similar profiles"""
        try:
            # Fetch user data
            user_skills = await self.data_agent.fetch_user_skills(user_id)
            work_experience = await self.data_agent.fetch_work_experience(user_id)
            
            # In production, would search database for similar profiles
            # For MVP, return placeholder
            
            logger.info(f"Finding similar profiles for user {user_id}")
            
            return {
                "user_id": user_id,
                "similar_profiles": [],
                "message": "Similar profile matching will be implemented in next phase"
            }
            
        except Exception as e:
            logger.error(f"Error finding similar profiles: {e}")
            return []
    
    async def match_mentors(
        self,
        user_id: str,
        skills: List[str]
    ) -> List[Dict[str, Any]]:
        """Match user with potential mentors"""
        try:
            # In production, would find experienced professionals with desired skills
            # For MVP, return placeholder
            
            logger.info(f"Matching mentors for user {user_id} in skills: {skills}")
            
            return {
                "user_id": user_id,
                "requested_skills": skills,
                "potential_mentors": [],
                "message": "Mentor matching will be implemented in next phase"
            }
            
        except Exception as e:
            logger.error(f"Error matching mentors: {e}")
            return []
    
    async def recommend_skill_development(
        self,
        user_id: str
    ) -> Dict[str, Any]:
        """Recommend skills to develop based on market demand"""
        try:
            # Fetch user skills and experience
            user_skills = await self.data_agent.fetch_user_skills(user_id)
            work_experience = await self.data_agent.fetch_work_experience(user_id)
            
            # Determine user's industry and role
            industry = "Technology"  # Default
            current_role = "Professional"
            
            if work_experience:
                latest_job = work_experience[0]
                industry = latest_job.get("industry", industry)
                current_role = latest_job.get("job_title", current_role)
            
            # AI-powered skill recommendations
            prompt = f"""Recommend skills to develop for career advancement.

Current Profile:
- Industry: {industry}
- Current Role: {current_role}
- Current Skills: {[s["skill_name"] for s in user_skills[:10]]}

Provide recommendations:
1. Top 5 in-demand skills for this industry
2. Skills that complement current skillset
3. Emerging technologies to learn
4. Soft skills to develop
5. Priority ranking (1-5, 1=highest)

Format as JSON."""

            recommendations = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "in_demand_skills": "array of objects with: skill, reason, priority",
                    "complementary_skills": "array of strings",
                    "emerging_technologies": "array of strings",
                    "soft_skills": "array of strings",
                    "learning_resources": "array of objects with: skill, resource_type, url"
                }
            )
            
            logger.info(f"Generated skill development recommendations for user {user_id}")
            return recommendations
            
        except Exception as e:
            logger.error(f"Error recommending skill development: {e}")
            return self._fallback_skill_recommendations()
    
    def _fallback_skill_matching(
        self,
        user_skills: List[Dict[str, Any]],
        job_requirements: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Fallback rule-based skill matching"""
        user_skill_names = {
            skill.get("skill_name", skill.get("name", "")).lower()
            for skill in user_skills
        }
        
        required = set(s.lower() for s in job_requirements.get("required_skills", []))
        preferred = set(s.lower() for s in job_requirements.get("preferred_skills", []))
        
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
            recommendation = "Strong Match - Highly Recommended"
        elif match_score >= 60:
            recommendation = "Good Match - Recommended"
        elif match_score >= 40:
            recommendation = "Moderate Match - Consider Applying"
        else:
            recommendation = "Weak Match - Develop More Skills"
        
        return {
            "match_score": match_score,
            "matched_required_skills": list(matched_required),
            "matched_preferred_skills": list(matched_preferred),
            "missing_required_skills": list(missing_required),
            "missing_preferred_skills": list(missing_preferred),
            "recommendation": recommendation
        }
    
    def _fallback_skill_recommendations(self) -> Dict[str, Any]:
        """Fallback skill recommendations"""
        return {
            "in_demand_skills": [
                {"skill": "Cloud Computing (AWS/Azure)", "reason": "High demand across industries", "priority": 1},
                {"skill": "Data Analysis", "reason": "Essential for data-driven decisions", "priority": 2},
                {"skill": "AI/Machine Learning", "reason": "Emerging technology with growth potential", "priority": 3},
                {"skill": "Cybersecurity", "reason": "Critical for digital transformation", "priority": 4},
                {"skill": "Project Management", "reason": "Leadership and coordination skills", "priority": 5}
            ],
            "complementary_skills": [
                "Communication",
                "Problem Solving",
                "Teamwork",
                "Adaptability"
            ],
            "emerging_technologies": [
                "Artificial Intelligence",
                "Blockchain",
                "Internet of Things (IoT)",
                "Quantum Computing"
            ],
            "soft_skills": [
                "Leadership",
                "Critical Thinking",
                "Emotional Intelligence",
                "Time Management"
            ]
        }


# Singleton instance
_matching_agent = None


def get_matching_agent() -> MatchingAgent:
    """Get or create Matching Agent instance"""
    global _matching_agent
    if _matching_agent is None:
        _matching_agent = MatchingAgent()
    return _matching_agent

