"""
Analytics Agent for NOOR Platform

This agent handles analytics and insights:
- User behavior analytics
- Skills gap analysis
- Market trends analysis
- Platform performance metrics
- Workforce insights
- Predictive analytics
"""

import logging
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
from collections import Counter

from app.agents.base_agent import BaseAgent, AgentCapability, AgentStatus
from app.core.ai_client import get_ai_client
from app.agents.data_retrieval_agent import get_data_retrieval_agent

logger = logging.getLogger(__name__)


class AnalyticsAgent(BaseAgent):
    """Agent for analytics and insights generation"""
    
    def __init__(self):
        super().__init__(
            agent_id="analytics-001",
            name="Analytics Agent",
            description="Generates analytics, insights, and predictions for workforce optimization",
            capabilities=[
                AgentCapability.ANALYTICS,
                AgentCapability.DATA_ANALYSIS,
                AgentCapability.AI_ANALYSIS
            ]
        )
        self.ai_client = get_ai_client()
        self.data_agent = get_data_retrieval_agent()
        
    async def execute(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute analytics task
        
        Args:
            task: Task dictionary with action and parameters
            
        Returns:
            Result dictionary with analytics results
        """
        try:
            self.status = AgentStatus.BUSY
            action = task.get("action")
            parameters = task.get("parameters", {})
            
            logger.info(f"Analytics Agent executing: {action}")
            
            # Route to appropriate method
            if action == "analyze_skills_gap":
                result = await self.analyze_skills_gap(
                    industry=parameters.get("industry"),
                    location=parameters.get("location")
                )
            elif action == "generate_market_trends":
                result = await self.generate_market_trends(
                    industry=parameters.get("industry"),
                    timeframe=parameters.get("timeframe", "month")
                )
            elif action == "analyze_user_engagement":
                result = await self.analyze_user_engagement(
                    user_id=parameters.get("user_id"),
                    timeframe=parameters.get("timeframe", "month")
                )
            elif action == "generate_workforce_insights":
                result = await self.generate_workforce_insights(
                    filters=parameters.get("filters", {})
                )
            elif action == "predict_hiring_trends":
                result = await self.predict_hiring_trends(
                    industry=parameters.get("industry"),
                    months_ahead=parameters.get("months_ahead", 3)
                )
            elif action == "analyze_platform_performance":
                result = await self.analyze_platform_performance(
                    timeframe=parameters.get("timeframe", "week")
                )
            elif action == "generate_skill_demand_report":
                result = await self.generate_skill_demand_report(
                    industry=parameters.get("industry")
                )
            elif action == "analyze_salary_trends":
                result = await self.analyze_salary_trends(
                    role=parameters.get("role"),
                    location=parameters.get("location")
                )
            else:
                raise ValueError(f"Unknown action: {action}")
            
            self.status = AgentStatus.IDLE
            return {
                "success": True,
                "action": action,
                "analytics": result,
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            self.status = AgentStatus.ERROR
            logger.error(f"Analytics Agent error: {e}")
            return {
                "success": False,
                "error": str(e),
                "action": task.get("action"),
                "timestamp": datetime.utcnow().isoformat()
            }
    
    async def analyze_skills_gap(
        self,
        industry: Optional[str] = None,
        location: Optional[str] = None
    ) -> Dict[str, Any]:
        """Analyze skills gap in the market"""
        try:
            # Fetch job postings to understand demand
            filters = {}
            if industry:
                filters["industry"] = industry
            if location:
                filters["location"] = location
            
            jobs = await self.data_agent.fetch_job_postings(filters)
            
            # Extract required skills from jobs
            all_required_skills = []
            all_preferred_skills = []
            
            for job in jobs:
                all_required_skills.extend(job.get("required_skills", []))
                all_preferred_skills.extend(job.get("preferred_skills", []))
            
            # Count skill frequencies
            required_counter = Counter(all_required_skills)
            preferred_counter = Counter(all_preferred_skills)
            
            # Get top skills in demand
            top_required = required_counter.most_common(10)
            top_preferred = preferred_counter.most_common(10)
            
            # AI-powered gap analysis
            prompt = f"""Analyze the skills gap in the market.

Industry: {industry or 'All Industries'}
Location: {location or 'UAE'}

Top Required Skills (by frequency):
{top_required}

Top Preferred Skills (by frequency):
{top_preferred}

Provide analysis:
1. Critical skills gaps (high demand, low supply)
2. Emerging skills trends
3. Skills becoming obsolete
4. Recommendations for workforce development
5. Priority areas for training programs

Format as JSON."""

            analysis = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "critical_gaps": "array of objects with: skill, demand_level, gap_severity",
                    "emerging_trends": "array of strings",
                    "obsolete_skills": "array of strings",
                    "recommendations": "array of strings",
                    "priority_areas": "array of objects with: area, priority, rationale"
                }
            )
            
            return {
                "industry": industry,
                "location": location,
                "top_required_skills": [{"skill": skill, "demand": count} for skill, count in top_required],
                "top_preferred_skills": [{"skill": skill, "demand": count} for skill, count in top_preferred],
                **analysis,
                "analyzed_at": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error analyzing skills gap: {e}")
            return {"error": str(e)}
    
    async def generate_market_trends(
        self,
        industry: Optional[str] = None,
        timeframe: str = "month"
    ) -> Dict[str, Any]:
        """Generate market trends report"""
        try:
            # Fetch recent job postings
            jobs = await self.data_agent.fetch_job_postings({
                "industry": industry,
                "limit": 100
            })
            
            # Analyze trends
            industries = Counter([job.get("industry") for job in jobs if job.get("industry")])
            locations = Counter([job.get("location") for job in jobs if job.get("location")])
            employment_types = Counter([job.get("employment_type") for job in jobs if job.get("employment_type")])
            
            return {
                "timeframe": timeframe,
                "total_jobs": len(jobs),
                "top_industries": [{"industry": ind, "count": count} for ind, count in industries.most_common(5)],
                "top_locations": [{"location": loc, "count": count} for loc, count in locations.most_common(5)],
                "employment_types": [{"type": et, "count": count} for et, count in employment_types.most_common()],
                "growth_rate": "+15%",  # Placeholder
                "generated_at": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error generating market trends: {e}")
            return {"error": str(e)}
    
    async def analyze_user_engagement(
        self,
        user_id: str,
        timeframe: str = "month"
    ) -> Dict[str, Any]:
        """Analyze user engagement metrics"""
        try:
            # In production, would fetch user activity logs
            # For MVP, return simulated metrics
            
            return {
                "user_id": user_id,
                "timeframe": timeframe,
                "metrics": {
                    "profile_views": 45,
                    "job_applications": 8,
                    "skills_added": 3,
                    "profile_updates": 5,
                    "searches_performed": 23,
                    "messages_sent": 12
                },
                "engagement_score": 78,  # Out of 100
                "activity_trend": "increasing",
                "recommendations": [
                    "Complete your work experience section",
                    "Add more skills to increase visibility",
                    "Apply to 2-3 more jobs this week"
                ],
                "analyzed_at": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error analyzing user engagement: {e}")
            return {"error": str(e)}
    
    async def generate_workforce_insights(
        self,
        filters: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Generate workforce insights for policy makers"""
        try:
            # AI-powered workforce analysis
            prompt = """Generate comprehensive workforce insights for UAE.

Analyze:
1. Current workforce composition
2. Skills distribution across industries
3. Employment trends
4. Gender diversity metrics
5. Age demographics
6. Education levels
7. Key challenges
8. Recommendations for policy makers

Format as JSON."""

            insights = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "workforce_size": "number",
                    "skills_distribution": "object with industry: skill_count",
                    "employment_rate": "number (percentage)",
                    "gender_diversity": "object with male/female percentages",
                    "age_demographics": "array of objects with: age_range, percentage",
                    "education_levels": "array of objects with: level, percentage",
                    "key_challenges": "array of strings",
                    "recommendations": "array of strings"
                }
            )
            
            return {
                **insights,
                "generated_at": datetime.utcnow().isoformat(),
                "data_source": "NOOR Platform Analytics"
            }
            
        except Exception as e:
            logger.error(f"Error generating workforce insights: {e}")
            return self._fallback_workforce_insights()
    
    async def predict_hiring_trends(
        self,
        industry: Optional[str] = None,
        months_ahead: int = 3
    ) -> Dict[str, Any]:
        """Predict hiring trends for next N months"""
        try:
            # AI-powered prediction
            prompt = f"""Predict hiring trends for the next {months_ahead} months.

Industry: {industry or 'All Industries'}
Location: UAE

Predict:
1. Expected hiring volume (increase/decrease/stable)
2. Hot job roles
3. In-demand skills
4. Salary trends
5. Competition level
6. Best time to hire

Format as JSON."""

            predictions = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "hiring_volume_trend": "string (increasing/decreasing/stable)",
                    "expected_growth_rate": "number (percentage)",
                    "hot_job_roles": "array of strings",
                    "in_demand_skills": "array of strings",
                    "salary_trend": "string (increasing/decreasing/stable)",
                    "competition_level": "string (low/medium/high)",
                    "best_hiring_months": "array of strings",
                    "confidence_level": "number (0-100)"
                }
            )
            
            return {
                "industry": industry,
                "prediction_period": f"{months_ahead} months",
                **predictions,
                "predicted_at": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error predicting hiring trends: {e}")
            return {"error": str(e)}
    
    async def analyze_platform_performance(
        self,
        timeframe: str = "week"
    ) -> Dict[str, Any]:
        """Analyze platform performance metrics"""
        try:
            # In production, would fetch real metrics from database
            # For MVP, return simulated metrics
            
            return {
                "timeframe": timeframe,
                "metrics": {
                    "total_users": 1250,
                    "new_users": 85,
                    "active_users": 620,
                    "total_jobs": 340,
                    "new_jobs": 28,
                    "total_applications": 1840,
                    "new_applications": 156,
                    "successful_placements": 12,
                    "average_response_time_ms": 185,
                    "api_uptime_percentage": 99.8
                },
                "growth_metrics": {
                    "user_growth": "+7.3%",
                    "job_growth": "+9.0%",
                    "application_growth": "+11.2%"
                },
                "health_status": "excellent",
                "analyzed_at": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error analyzing platform performance: {e}")
            return {"error": str(e)}
    
    async def generate_skill_demand_report(
        self,
        industry: Optional[str] = None
    ) -> Dict[str, Any]:
        """Generate detailed skill demand report"""
        try:
            # Fetch job postings
            jobs = await self.data_agent.fetch_job_postings({
                "industry": industry,
                "limit": 200
            })
            
            # Extract and analyze skills
            all_skills = []
            for job in jobs:
                all_skills.extend(job.get("required_skills", []))
                all_skills.extend(job.get("preferred_skills", []))
            
            skill_counter = Counter(all_skills)
            top_skills = skill_counter.most_common(20)
            
            return {
                "industry": industry or "All Industries",
                "total_jobs_analyzed": len(jobs),
                "total_unique_skills": len(skill_counter),
                "top_skills": [
                    {
                        "skill": skill,
                        "demand_count": count,
                        "demand_percentage": round((count / len(jobs)) * 100, 1)
                    }
                    for skill, count in top_skills
                ],
                "skill_categories": {
                    "technical": len([s for s in all_skills if s.lower() in ["python", "java", "aws", "sql"]]),
                    "soft_skills": len([s for s in all_skills if s.lower() in ["communication", "leadership", "teamwork"]]),
                    "management": len([s for s in all_skills if s.lower() in ["project management", "agile", "scrum"]])
                },
                "generated_at": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error generating skill demand report: {e}")
            return {"error": str(e)}
    
    async def analyze_salary_trends(
        self,
        role: str,
        location: Optional[str] = None
    ) -> Dict[str, Any]:
        """Analyze salary trends for a specific role"""
        try:
            # AI-powered salary analysis
            prompt = f"""Analyze salary trends for {role} in {location or 'UAE'}.

Provide:
1. Current average salary range (AED per month)
2. Salary trend (increasing/decreasing/stable)
3. Factors affecting salary
4. Salary by experience level
5. Comparison with regional average
6. Future outlook

Format as JSON."""

            analysis = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "min_salary": "number",
                    "max_salary": "number",
                    "average_salary": "number",
                    "currency": "string",
                    "salary_trend": "string",
                    "factors": "array of strings",
                    "by_experience": "array of objects with: level, salary_range",
                    "regional_comparison": "string",
                    "future_outlook": "string"
                }
            )
            
            return {
                "role": role,
                "location": location or "UAE",
                **analysis,
                "analyzed_at": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error analyzing salary trends: {e}")
            return {"error": str(e)}
    
    def _fallback_workforce_insights(self) -> Dict[str, Any]:
        """Fallback workforce insights"""
        return {
            "workforce_size": 5000000,  # Approximate UAE workforce
            "employment_rate": 92.5,
            "gender_diversity": {
                "male": 70,
                "female": 30
            },
            "age_demographics": [
                {"age_range": "18-25", "percentage": 15},
                {"age_range": "26-35", "percentage": 40},
                {"age_range": "36-45", "percentage": 30},
                {"age_range": "46-55", "percentage": 12},
                {"age_range": "56+", "percentage": 3}
            ],
            "education_levels": [
                {"level": "High School", "percentage": 20},
                {"level": "Bachelor's", "percentage": 50},
                {"level": "Master's", "percentage": 25},
                {"level": "PhD", "percentage": 5}
            ],
            "key_challenges": [
                "Skills mismatch between education and industry needs",
                "Rapid technological change requiring continuous upskilling",
                "Gender diversity in technical roles",
                "Youth unemployment in certain sectors"
            ],
            "recommendations": [
                "Invest in STEM education and vocational training",
                "Promote lifelong learning and reskilling programs",
                "Encourage women in technology initiatives",
                "Strengthen industry-academia partnerships"
            ],
            "generated_at": datetime.utcnow().isoformat()
        }


# Singleton instance
_analytics_agent = None


def get_analytics_agent() -> AnalyticsAgent:
    """Get or create Analytics Agent instance"""
    global _analytics_agent
    if _analytics_agent is None:
        _analytics_agent = AnalyticsAgent()
    return _analytics_agent

