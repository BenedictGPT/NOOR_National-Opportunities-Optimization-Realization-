"""
NOOR Platform - AI Features API Endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any, List

from app.db.postgres import get_db
from app.services.ai_skill_matching_service import AISkillMatchingService
from app.services.ai_career_recommendations_service import AICareerRecommendationsService
from app.services.ai_work_experience_insights_service import AIWorkExperienceInsightsService
from app.core.ai_client import get_ai_client

router = APIRouter(prefix="/ai", tags=["AI Features"])


@router.get("/status")
async def get_ai_status():
    """
    Get AI service status
    """
    ai_client = get_ai_client()
    
    return {
        "ai_available": ai_client.is_available(),
        "model": "claude-3-5-sonnet-20241022",
        "features": [
            "skill_matching",
            "career_recommendations",
            "work_experience_insights",
            "learning_paths",
            "job_recommendations"
        ]
    }


# ============================================================================
# Skill Matching Endpoints
# ============================================================================

@router.post("/skills/match-to-job")
async def match_user_to_job(
    user_id: str,
    job_requirements: Dict[str, Any],
    db: AsyncSession = Depends(get_db)
):
    """
    Match user skills to job requirements using AI
    
    **Request Body:**
    ```json
    {
        "required_skills": ["Python", "FastAPI", "PostgreSQL"],
        "optional_skills": ["Docker", "Kubernetes"],
        "min_experience_years": 3,
        "education_level": "Bachelor's"
    }
    ```
    """
    service = AISkillMatchingService(db)
    
    try:
        result = await service.match_user_to_job(user_id, job_requirements)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Skill matching failed: {str(e)}"
        )


@router.post("/skills/recommend-jobs")
async def recommend_jobs(
    user_id: str,
    available_jobs: List[Dict[str, Any]],
    top_n: int = 10,
    db: AsyncSession = Depends(get_db)
):
    """
    Recommend best matching jobs for user
    """
    service = AISkillMatchingService(db)
    
    try:
        recommendations = await service.recommend_jobs_for_user(
            user_id=user_id,
            available_jobs=available_jobs,
            top_n=top_n
        )
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Job recommendation failed: {str(e)}"
        )


@router.post("/skills/suggest-improvements")
async def suggest_skill_improvements(
    user_id: str,
    target_job_title: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Suggest skills to improve for target job
    """
    service = AISkillMatchingService(db)
    
    try:
        suggestions = await service.suggest_skill_improvements(user_id, target_job_title)
        return suggestions
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Skill suggestions failed: {str(e)}"
        )


@router.post("/skills/analyze-gaps")
async def analyze_skill_gaps(
    user_id: str,
    industry: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Analyze skill gaps for specific industry
    """
    service = AISkillMatchingService(db)
    
    try:
        analysis = await service.analyze_skill_gaps(user_id, industry)
        return analysis
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Gap analysis failed: {str(e)}"
        )


# ============================================================================
# Career Recommendations Endpoints
# ============================================================================

@router.get("/career/recommendations/{user_id}")
async def get_career_recommendations(
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Get personalized career recommendations
    
    Returns comprehensive career guidance including:
    - Career progression assessment
    - Recommended next roles
    - Skills to develop
    - Industries to explore
    - Salary expectations
    - Action steps
    """
    service = AICareerRecommendationsService(db)
    
    try:
        recommendations = await service.generate_career_recommendations(user_id)
        return recommendations
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Career recommendations failed: {str(e)}"
        )


@router.post("/career/learning-path")
async def generate_learning_path(
    user_id: str,
    target_role: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Generate personalized learning path for target role
    """
    service = AICareerRecommendationsService(db)
    
    try:
        learning_path = await service.generate_learning_path(user_id, target_role)
        return learning_path
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Learning path generation failed: {str(e)}"
        )


@router.get("/career/trajectory/{user_id}")
async def analyze_career_trajectory(
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Analyze career trajectory and predict future path
    """
    service = AICareerRecommendationsService(db)
    
    try:
        analysis = await service.analyze_career_trajectory(user_id)
        return analysis
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Trajectory analysis failed: {str(e)}"
        )


# ============================================================================
# Work Experience Insights Endpoints
# ============================================================================

@router.get("/experience/summary/{user_id}")
async def get_experience_summary(
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Generate AI-powered work experience summary
    
    Returns professional summary with:
    - Key strengths
    - Expertise areas
    - Career progression insights
    - Notable achievements
    - Specializations
    """
    service = AIWorkExperienceInsightsService(db)
    
    try:
        summary = await service.generate_experience_summary(user_id)
        return summary
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Experience summary failed: {str(e)}"
        )


@router.get("/experience/highlights/{user_id}")
async def get_achievement_highlights(
    user_id: str,
    max_highlights: int = 5,
    db: AsyncSession = Depends(get_db)
):
    """
    Extract top achievement highlights
    """
    service = AIWorkExperienceInsightsService(db)
    
    try:
        highlights = await service.generate_achievement_highlights(user_id, max_highlights)
        return highlights
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Highlights generation failed: {str(e)}"
        )


@router.get("/experience/improvements/{user_id}")
async def get_experience_improvements(
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Suggest improvements to work experience descriptions
    """
    service = AIWorkExperienceInsightsService(db)
    
    try:
        suggestions = await service.suggest_experience_improvements(user_id)
        return suggestions
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Improvement suggestions failed: {str(e)}"
        )


@router.get("/experience/linkedin-summary/{user_id}")
async def get_linkedin_summary(
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Generate LinkedIn-optimized professional summary
    """
    service = AIWorkExperienceInsightsService(db)
    
    try:
        summary = await service.generate_linkedin_summary(user_id)
        return summary
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"LinkedIn summary generation failed: {str(e)}"
        )


@router.get("/experience/gap-analysis/{user_id}")
async def analyze_employment_gaps(
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Analyze employment gaps and provide guidance
    """
    service = AIWorkExperienceInsightsService(db)
    
    try:
        analysis = await service.analyze_career_gaps(user_id)
        return analysis
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Gap analysis failed: {str(e)}"
        )

