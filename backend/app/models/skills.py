"""
NOOR Platform - Skills Pydantic Models
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import date, datetime
from enum import Enum


class ProficiencyLevel(str, Enum):
    """Skill proficiency levels"""
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"


class SkillCategory(str, Enum):
    """Skill categories"""
    TECHNICAL = "technical"
    SOFT_SKILLS = "soft_skills"
    LANGUAGE = "language"
    MANAGEMENT = "management"
    CREATIVE = "creative"
    ANALYTICAL = "analytical"
    COMMUNICATION = "communication"
    OTHER = "other"


# ============================================================================
# BASE MODELS
# ============================================================================

class SkillBase(BaseModel):
    """Base skill model"""
    name: str = Field(..., min_length=2, max_length=200, description="Skill name")
    category: SkillCategory = Field(..., description="Skill category")
    description: Optional[str] = Field(None, max_length=1000, description="Skill description")
    
    class Config:
        use_enum_values = True


class UserSkillBase(BaseModel):
    """Base user skill model"""
    proficiency_level: ProficiencyLevel = Field(..., description="Proficiency level")
    years_of_experience: Optional[float] = Field(
        None,
        ge=0,
        le=50,
        description="Years of experience with this skill"
    )
    last_used_date: Optional[date] = Field(None, description="Last date skill was used")
    
    @validator('years_of_experience')
    def validate_years(cls, v):
        if v is not None and v < 0:
            raise ValueError('Years of experience must be non-negative')
        return v
    
    @validator('last_used_date')
    def validate_last_used(cls, v):
        if v is not None and v > date.today():
            raise ValueError('Last used date cannot be in the future')
        return v
    
    class Config:
        use_enum_values = True


# ============================================================================
# REQUEST MODELS
# ============================================================================

class SkillCreate(SkillBase):
    """Create new skill (admin only)"""
    pass


class SkillUpdate(BaseModel):
    """Update existing skill (admin only)"""
    name: Optional[str] = Field(None, min_length=2, max_length=200)
    category: Optional[SkillCategory] = None
    description: Optional[str] = Field(None, max_length=1000)
    
    class Config:
        use_enum_values = True


class UserSkillCreate(UserSkillBase):
    """Add skill to user profile"""
    skill_id: str = Field(..., description="UUID of the skill to add")
    
    class Config:
        schema_extra = {
            "example": {
                "skill_id": "123e4567-e89b-12d3-a456-426614174000",
                "proficiency_level": "advanced",
                "years_of_experience": 5.0,
                "last_used_date": "2024-11-01"
            }
        }


class UserSkillUpdate(BaseModel):
    """Update user's skill"""
    proficiency_level: Optional[ProficiencyLevel] = None
    years_of_experience: Optional[float] = Field(None, ge=0, le=50)
    last_used_date: Optional[date] = None
    
    @validator('years_of_experience')
    def validate_years(cls, v):
        if v is not None and v < 0:
            raise ValueError('Years of experience must be non-negative')
        return v
    
    class Config:
        use_enum_values = True
        schema_extra = {
            "example": {
                "proficiency_level": "expert",
                "years_of_experience": 7.5,
                "last_used_date": "2024-11-01"
            }
        }


class SkillVerificationRequest(BaseModel):
    """Request skill verification"""
    user_skill_id: str = Field(..., description="UUID of user skill to verify")
    verification_evidence: Optional[str] = Field(
        None,
        max_length=2000,
        description="Evidence or notes for verification"
    )
    
    class Config:
        schema_extra = {
            "example": {
                "user_skill_id": "123e4567-e89b-12d3-a456-426614174000",
                "verification_evidence": "Completed certification exam with 95% score"
            }
        }


# ============================================================================
# RESPONSE MODELS
# ============================================================================

class SkillResponse(SkillBase):
    """Skill response model"""
    id: str = Field(..., description="Skill UUID")
    created_at: datetime = Field(..., description="Creation timestamp")
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "name": "Python Programming",
                "category": "technical",
                "description": "Programming in Python language",
                "created_at": "2024-01-01T00:00:00Z"
            }
        }


class UserSkillResponse(UserSkillBase):
    """User skill response model"""
    id: str = Field(..., description="User skill UUID")
    user_id: str = Field(..., description="User UUID")
    skill: SkillResponse = Field(..., description="Skill details")
    is_verified: bool = Field(..., description="Whether skill is verified")
    verified_by: Optional[str] = Field(None, description="UUID of verifier")
    verified_at: Optional[datetime] = Field(None, description="Verification timestamp")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174001",
                "user_id": "123e4567-e89b-12d3-a456-426614174002",
                "skill": {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "name": "Python Programming",
                    "category": "technical",
                    "description": "Programming in Python language",
                    "created_at": "2024-01-01T00:00:00Z"
                },
                "proficiency_level": "advanced",
                "years_of_experience": 5.0,
                "last_used_date": "2024-11-01",
                "is_verified": True,
                "verified_by": "123e4567-e89b-12d3-a456-426614174003",
                "verified_at": "2024-06-15T10:30:00Z",
                "created_at": "2024-01-15T08:00:00Z",
                "updated_at": "2024-06-15T10:30:00Z"
            }
        }


class SkillsListResponse(BaseModel):
    """List of skills response"""
    success: bool = True
    total: int = Field(..., description="Total number of skills")
    skills: List[SkillResponse] = Field(..., description="List of skills")
    skip: int = Field(..., description="Number of records skipped")
    limit: int = Field(..., description="Maximum number of records returned")
    
    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "total": 150,
                "skills": [
                    {
                        "id": "123e4567-e89b-12d3-a456-426614174000",
                        "name": "Python Programming",
                        "category": "technical",
                        "description": "Programming in Python language",
                        "created_at": "2024-01-01T00:00:00Z"
                    }
                ],
                "skip": 0,
                "limit": 50
            }
        }


class UserSkillsListResponse(BaseModel):
    """List of user skills response"""
    success: bool = True
    total: int = Field(..., description="Total number of user skills")
    skills: List[UserSkillResponse] = Field(..., description="List of user skills")
    
    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "total": 12,
                "skills": []
            }
        }


class SkillStatsResponse(BaseModel):
    """Skill statistics response"""
    skill_id: str
    skill_name: str
    total_users: int = Field(..., description="Number of users with this skill")
    average_proficiency: float = Field(..., description="Average proficiency score (1-4)")
    average_experience: float = Field(..., description="Average years of experience")
    verified_count: int = Field(..., description="Number of verified instances")
    
    class Config:
        schema_extra = {
            "example": {
                "skill_id": "123e4567-e89b-12d3-a456-426614174000",
                "skill_name": "Python Programming",
                "total_users": 1250,
                "average_proficiency": 2.8,
                "average_experience": 4.5,
                "verified_count": 850
            }
        }


# ============================================================================
# FILTER MODELS
# ============================================================================

class SkillsFilterParams(BaseModel):
    """Skills filter parameters"""
    category: Optional[SkillCategory] = Field(None, description="Filter by category")
    search: Optional[str] = Field(None, min_length=2, description="Search by name")
    skip: int = Field(0, ge=0, description="Number of records to skip")
    limit: int = Field(50, ge=1, le=100, description="Maximum number of records")
    
    class Config:
        use_enum_values = True


class UserSkillsFilterParams(BaseModel):
    """User skills filter parameters"""
    proficiency_level: Optional[ProficiencyLevel] = Field(None, description="Filter by proficiency")
    category: Optional[SkillCategory] = Field(None, description="Filter by skill category")
    verified_only: bool = Field(False, description="Show only verified skills")
    
    class Config:
        use_enum_values = True


# ============================================================================
# SKILL MATCHING MODELS
# ============================================================================

class SkillMatchRequest(BaseModel):
    """Request to match skills against job requirements"""
    job_id: str = Field(..., description="Job posting UUID")
    user_id: Optional[str] = Field(None, description="User UUID (optional, defaults to current user)")


class SkillMatchScore(BaseModel):
    """Individual skill match score"""
    skill_name: str
    required: bool = Field(..., description="Whether skill is required for job")
    user_has_skill: bool = Field(..., description="Whether user has this skill")
    user_proficiency: Optional[ProficiencyLevel] = None
    required_proficiency: Optional[ProficiencyLevel] = None
    match_score: float = Field(..., ge=0, le=1, description="Match score (0-1)")


class SkillMatchResponse(BaseModel):
    """Skill match analysis response"""
    success: bool = True
    job_id: str
    user_id: str
    overall_match_score: float = Field(..., ge=0, le=1, description="Overall match score")
    required_skills_met: int = Field(..., description="Number of required skills met")
    total_required_skills: int = Field(..., description="Total required skills")
    optional_skills_met: int = Field(..., description="Number of optional skills met")
    total_optional_skills: int = Field(..., description="Total optional skills")
    skill_details: List[SkillMatchScore] = Field(..., description="Detailed skill matching")
    recommendation: str = Field(..., description="AI-generated recommendation")
    
    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "job_id": "123e4567-e89b-12d3-a456-426614174000",
                "user_id": "123e4567-e89b-12d3-a456-426614174001",
                "overall_match_score": 0.85,
                "required_skills_met": 8,
                "total_required_skills": 10,
                "optional_skills_met": 5,
                "total_optional_skills": 8,
                "skill_details": [],
                "recommendation": "Strong match. You meet 80% of required skills. Consider improving SQL and Docker skills."
            }
        }

