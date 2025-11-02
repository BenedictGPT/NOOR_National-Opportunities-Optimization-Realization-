"""
NOOR Platform - Users Endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date
import logging

from app.api.v1.endpoints.auth import get_current_user, TokenData

logger = logging.getLogger(__name__)

router = APIRouter()


# ============================================================================
# SCHEMAS
# ============================================================================

class UserProfile(BaseModel):
    id: str
    emirates_id: str
    email: EmailStr
    phone: Optional[str]
    first_name: str
    last_name: str
    date_of_birth: date
    gender: Optional[str]
    nationality: Optional[str]
    profile_picture_url: Optional[str]
    is_verified: bool
    created_at: str


class UserUpdate(BaseModel):
    phone: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture_url: Optional[str] = None


class SkillsPassport(BaseModel):
    user_id: str
    skills: List[dict]
    education: List[dict]
    work_experience: List[dict]
    certifications: List[dict]
    assessments: List[dict]


# ============================================================================
# ENDPOINTS
# ============================================================================

@router.get("/me", response_model=UserProfile)
async def get_my_profile(current_user: TokenData = Depends(get_current_user)):
    """
    Get current user's profile
    """
    logger.info(f"Fetching profile for user: {current_user.user_id}")
    
    # TODO: Fetch user from database
    
    # Mock response
    return UserProfile(
        id=current_user.user_id,
        emirates_id="784-1234-1234567-1",
        email="user@example.com",
        phone="+971501234567",
        first_name="Ahmed",
        last_name="Al Maktoum",
        date_of_birth=date(1990, 1, 1),
        gender="male",
        nationality="UAE",
        profile_picture_url=None,
        is_verified=True,
        created_at="2024-01-01T00:00:00Z"
    )


@router.put("/me", response_model=UserProfile)
async def update_my_profile(
    user_update: UserUpdate,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Update current user's profile
    """
    logger.info(f"Updating profile for user: {current_user.user_id}")
    
    # TODO: Update user in database
    
    return {
        "success": True,
        "message": "Profile updated successfully"
    }


@router.get("/me/skills-passport", response_model=SkillsPassport)
async def get_my_skills_passport(current_user: TokenData = Depends(get_current_user)):
    """
    Get current user's complete Skills Passport
    
    **Includes:**
    - Skills with proficiency levels
    - Education history
    - Work experience
    - Certifications
    - Assessment results
    """
    logger.info(f"Fetching Skills Passport for user: {current_user.user_id}")
    
    # TODO: Fetch complete skills passport from database
    
    # Mock response
    return SkillsPassport(
        user_id=current_user.user_id,
        skills=[
            {
                "skill_name": "Python Programming",
                "category": "Technical",
                "proficiency_level": "expert",
                "years_of_experience": 5.0,
                "is_verified": True
            }
        ],
        education=[
            {
                "institution_name": "UAE University",
                "degree": "Bachelor of Science",
                "field_of_study": "Computer Science",
                "start_date": "2010-09-01",
                "end_date": "2014-06-30",
                "gpa": 3.8
            }
        ],
        work_experience=[
            {
                "company_name": "Emirates Digital",
                "job_title": "Senior Software Engineer",
                "employment_type": "full-time",
                "start_date": "2018-01-01",
                "end_date": None,
                "is_current": True
            }
        ],
        certifications=[
            {
                "name": "AWS Certified Solutions Architect",
                "issuing_organization": "Amazon Web Services",
                "issue_date": "2022-03-15",
                "expiry_date": "2025-03-15"
            }
        ],
        assessments=[
            {
                "assessment_name": "Cognitive Ability Test",
                "assessment_type": "cognitive",
                "score": 92.5,
                "completed_at": "2023-06-01T10:00:00Z"
            }
        ]
    )


@router.get("/{user_id}", response_model=UserProfile)
async def get_user_by_id(
    user_id: str,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Get user profile by ID (requires appropriate permissions)
    """
    logger.info(f"Fetching user profile: {user_id}")
    
    # TODO: Check permissions
    # TODO: Fetch user from database
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
    )


@router.get("/")
async def search_users(
    query: Optional[str] = Query(None, description="Search query"),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    current_user: TokenData = Depends(get_current_user)
):
    """
    Search users (requires appropriate permissions)
    
    **Parameters:**
    - query: Search by name, email, or Emirates ID
    - skip: Number of records to skip (pagination)
    - limit: Maximum number of records to return
    """
    logger.info(f"Searching users with query: {query}")
    
    # TODO: Implement user search with proper permissions
    
    return {
        "success": True,
        "total": 0,
        "users": [],
        "skip": skip,
        "limit": limit
    }


@router.delete("/me")
async def delete_my_account(current_user: TokenData = Depends(get_current_user)):
    """
    Delete current user's account (soft delete)
    """
    logger.info(f"Account deletion requested for user: {current_user.user_id}")
    
    # TODO: Implement account deletion (soft delete)
    # 1. Mark account as inactive
    # 2. Anonymize personal data (GDPR compliance)
    # 3. Retain necessary records for legal purposes
    
    return {
        "success": True,
        "message": "Account deletion initiated. Your data will be removed within 30 days."
    }

