"""
NOOR Platform - Work Experience Pydantic Models
"""

from pydantic import BaseModel, Field, validator, root_validator
from typing import Optional, List
from datetime import date, datetime
from enum import Enum


class EmploymentType(str, Enum):
    """Employment types"""
    FULL_TIME = "full-time"
    PART_TIME = "part-time"
    CONTRACT = "contract"
    INTERNSHIP = "internship"
    FREELANCE = "freelance"


class IndustryType(str, Enum):
    """Industry types"""
    TECHNOLOGY = "technology"
    FINANCE = "finance"
    HEALTHCARE = "healthcare"
    EDUCATION = "education"
    GOVERNMENT = "government"
    RETAIL = "retail"
    MANUFACTURING = "manufacturing"
    CONSTRUCTION = "construction"
    HOSPITALITY = "hospitality"
    TRANSPORTATION = "transportation"
    ENERGY = "energy"
    TELECOMMUNICATIONS = "telecommunications"
    MEDIA = "media"
    REAL_ESTATE = "real_estate"
    CONSULTING = "consulting"
    OTHER = "other"


# ============================================================================
# BASE MODELS
# ============================================================================

class WorkExperienceBase(BaseModel):
    """Base work experience model"""
    company_name: str = Field(..., min_length=2, max_length=255, description="Company name")
    job_title: str = Field(..., min_length=2, max_length=200, description="Job title")
    employment_type: EmploymentType = Field(..., description="Type of employment")
    industry: Optional[IndustryType] = Field(None, description="Industry sector")
    location: Optional[str] = Field(None, max_length=255, description="Work location (city, country)")
    start_date: date = Field(..., description="Start date")
    end_date: Optional[date] = Field(None, description="End date (null if current)")
    is_current: bool = Field(False, description="Whether this is current employment")
    description: Optional[str] = Field(
        None,
        max_length=2000,
        description="Job description and responsibilities"
    )
    
    @validator('end_date')
    def validate_end_date(cls, v, values):
        """Validate end date is after start date"""
        if v is not None and 'start_date' in values:
            if v < values['start_date']:
                raise ValueError('End date must be after start date')
            if v > date.today():
                raise ValueError('End date cannot be in the future')
        return v
    
    @root_validator
    def validate_current_employment(cls, values):
        """Validate current employment logic"""
        is_current = values.get('is_current', False)
        end_date = values.get('end_date')
        
        if is_current and end_date is not None:
            raise ValueError('Current employment cannot have an end date')
        if not is_current and end_date is None:
            raise ValueError('Past employment must have an end date')
        
        return values
    
    class Config:
        use_enum_values = True


# ============================================================================
# REQUEST MODELS
# ============================================================================

class WorkExperienceCreate(WorkExperienceBase):
    """Create new work experience"""
    achievements: Optional[List[str]] = Field(
        None,
        max_items=20,
        description="List of key achievements"
    )
    skills_used: Optional[List[str]] = Field(
        None,
        max_items=30,
        description="List of skill UUIDs used in this role"
    )
    
    class Config:
        schema_extra = {
            "example": {
                "company_name": "Emirates Digital Solutions",
                "job_title": "Senior Software Engineer",
                "employment_type": "full-time",
                "industry": "technology",
                "location": "Dubai, UAE",
                "start_date": "2020-03-01",
                "end_date": None,
                "is_current": True,
                "description": "Lead development of cloud-based solutions for government clients. Manage team of 5 developers.",
                "achievements": [
                    "Reduced system latency by 40%",
                    "Led migration to microservices architecture",
                    "Mentored 3 junior developers"
                ],
                "skills_used": [
                    "123e4567-e89b-12d3-a456-426614174000",
                    "123e4567-e89b-12d3-a456-426614174001"
                ]
            }
        }


class WorkExperienceUpdate(BaseModel):
    """Update existing work experience"""
    company_name: Optional[str] = Field(None, min_length=2, max_length=255)
    job_title: Optional[str] = Field(None, min_length=2, max_length=200)
    employment_type: Optional[EmploymentType] = None
    industry: Optional[IndustryType] = None
    location: Optional[str] = Field(None, max_length=255)
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_current: Optional[bool] = None
    description: Optional[str] = Field(None, max_length=2000)
    achievements: Optional[List[str]] = Field(None, max_items=20)
    skills_used: Optional[List[str]] = Field(None, max_items=30)
    
    @validator('end_date')
    def validate_end_date(cls, v, values):
        if v is not None:
            if 'start_date' in values and values['start_date'] is not None:
                if v < values['start_date']:
                    raise ValueError('End date must be after start date')
            if v > date.today():
                raise ValueError('End date cannot be in the future')
        return v
    
    class Config:
        use_enum_values = True
        schema_extra = {
            "example": {
                "job_title": "Lead Software Engineer",
                "description": "Updated role with expanded responsibilities",
                "achievements": [
                    "Reduced system latency by 40%",
                    "Led migration to microservices architecture",
                    "Mentored 3 junior developers",
                    "Implemented CI/CD pipeline"
                ]
            }
        }


# ============================================================================
# RESPONSE MODELS
# ============================================================================

class WorkExperienceResponse(WorkExperienceBase):
    """Work experience response model"""
    id: str = Field(..., description="Work experience UUID")
    user_id: str = Field(..., description="User UUID")
    achievements: Optional[List[str]] = Field(None, description="List of achievements")
    skills_used: Optional[List[str]] = Field(None, description="List of skill names")
    duration_months: int = Field(..., description="Duration in months")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "user_id": "123e4567-e89b-12d3-a456-426614174001",
                "company_name": "Emirates Digital Solutions",
                "job_title": "Senior Software Engineer",
                "employment_type": "full-time",
                "industry": "technology",
                "location": "Dubai, UAE",
                "start_date": "2020-03-01",
                "end_date": None,
                "is_current": True,
                "description": "Lead development of cloud-based solutions",
                "achievements": [
                    "Reduced system latency by 40%",
                    "Led migration to microservices architecture"
                ],
                "skills_used": ["Python", "AWS", "Docker", "Kubernetes"],
                "duration_months": 44,
                "created_at": "2024-01-15T08:00:00Z",
                "updated_at": "2024-06-15T10:30:00Z"
            }
        }


class WorkExperienceDetailedResponse(WorkExperienceResponse):
    """Detailed work experience with related data"""
    skills_details: Optional[List[dict]] = Field(
        None,
        description="Detailed skill information with proficiency"
    )
    verification_status: Optional[str] = Field(
        None,
        description="Verification status (verified/pending/unverified)"
    )
    verified_by: Optional[str] = Field(None, description="Verifier name")
    verified_at: Optional[datetime] = Field(None, description="Verification timestamp")
    
    class Config:
        schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "user_id": "123e4567-e89b-12d3-a456-426614174001",
                "company_name": "Emirates Digital Solutions",
                "job_title": "Senior Software Engineer",
                "employment_type": "full-time",
                "industry": "technology",
                "location": "Dubai, UAE",
                "start_date": "2020-03-01",
                "end_date": None,
                "is_current": True,
                "description": "Lead development of cloud-based solutions",
                "achievements": ["Reduced system latency by 40%"],
                "skills_used": ["Python", "AWS", "Docker"],
                "skills_details": [
                    {
                        "skill_id": "123e4567-e89b-12d3-a456-426614174000",
                        "skill_name": "Python",
                        "proficiency_level": "expert"
                    }
                ],
                "duration_months": 44,
                "verification_status": "verified",
                "verified_by": "HR Manager",
                "verified_at": "2024-03-20T14:00:00Z",
                "created_at": "2024-01-15T08:00:00Z",
                "updated_at": "2024-06-15T10:30:00Z"
            }
        }


class WorkExperienceListResponse(BaseModel):
    """List of work experiences response"""
    success: bool = True
    total: int = Field(..., description="Total number of work experiences")
    experiences: List[WorkExperienceResponse] = Field(..., description="List of work experiences")
    total_years: float = Field(..., description="Total years of experience")
    
    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "total": 3,
                "experiences": [],
                "total_years": 8.5
            }
        }


class WorkExperienceSummary(BaseModel):
    """Work experience summary"""
    total_experiences: int = Field(..., description="Total number of positions")
    total_years: float = Field(..., description="Total years of experience")
    total_months: int = Field(..., description="Total months of experience")
    current_positions: int = Field(..., description="Number of current positions")
    companies_worked: int = Field(..., description="Number of different companies")
    industries: List[str] = Field(..., description="List of industries worked in")
    employment_types: dict = Field(..., description="Count by employment type")
    top_skills: List[dict] = Field(..., description="Most used skills across all experiences")
    
    class Config:
        schema_extra = {
            "example": {
                "total_experiences": 5,
                "total_years": 8.5,
                "total_months": 102,
                "current_positions": 1,
                "companies_worked": 4,
                "industries": ["technology", "finance", "consulting"],
                "employment_types": {
                    "full-time": 4,
                    "contract": 1
                },
                "top_skills": [
                    {"skill": "Python", "count": 4},
                    {"skill": "AWS", "count": 3}
                ]
            }
        }


# ============================================================================
# VERIFICATION MODELS
# ============================================================================

class WorkExperienceVerificationRequest(BaseModel):
    """Request work experience verification"""
    experience_id: str = Field(..., description="Work experience UUID")
    verification_document: Optional[str] = Field(
        None,
        description="URL to verification document (offer letter, contract, etc.)"
    )
    contact_person: Optional[str] = Field(
        None,
        max_length=200,
        description="Contact person for verification"
    )
    contact_email: Optional[str] = Field(
        None,
        max_length=255,
        description="Contact email for verification"
    )
    notes: Optional[str] = Field(
        None,
        max_length=1000,
        description="Additional notes"
    )
    
    class Config:
        schema_extra = {
            "example": {
                "experience_id": "123e4567-e89b-12d3-a456-426614174000",
                "verification_document": "https://storage.noor.gov.ae/docs/offer_letter.pdf",
                "contact_person": "Ahmed Al Mansoori",
                "contact_email": "ahmed.almansoori@company.ae",
                "notes": "HR Manager can verify employment dates and role"
            }
        }


class WorkExperienceVerificationResponse(BaseModel):
    """Work experience verification response"""
    success: bool = True
    experience_id: str
    verification_status: str = Field(..., description="pending/verified/rejected")
    message: str
    estimated_completion: Optional[datetime] = Field(
        None,
        description="Estimated verification completion date"
    )
    
    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "experience_id": "123e4567-e89b-12d3-a456-426614174000",
                "verification_status": "pending",
                "message": "Verification request submitted. We will contact the employer within 3 business days.",
                "estimated_completion": "2024-11-10T17:00:00Z"
            }
        }


# ============================================================================
# FILTER MODELS
# ============================================================================

class WorkExperienceFilterParams(BaseModel):
    """Work experience filter parameters"""
    employment_type: Optional[EmploymentType] = Field(None, description="Filter by employment type")
    industry: Optional[IndustryType] = Field(None, description="Filter by industry")
    current_only: bool = Field(False, description="Show only current positions")
    company_name: Optional[str] = Field(None, description="Filter by company name")
    min_duration_months: Optional[int] = Field(None, ge=0, description="Minimum duration in months")
    
    class Config:
        use_enum_values = True


# ============================================================================
# ANALYTICS MODELS
# ============================================================================

class CareerProgressionResponse(BaseModel):
    """Career progression analysis"""
    success: bool = True
    user_id: str
    timeline: List[dict] = Field(..., description="Chronological career timeline")
    progression_score: float = Field(..., ge=0, le=10, description="Career progression score (0-10)")
    average_tenure: float = Field(..., description="Average tenure per position (months)")
    job_changes: int = Field(..., description="Number of job changes")
    industry_changes: int = Field(..., description="Number of industry changes")
    salary_growth: Optional[float] = Field(None, description="Estimated salary growth percentage")
    insights: List[str] = Field(..., description="AI-generated career insights")
    recommendations: List[str] = Field(..., description="Career development recommendations")
    
    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "user_id": "123e4567-e89b-12d3-a456-426614174001",
                "timeline": [
                    {
                        "period": "2016-2018",
                        "title": "Junior Developer",
                        "company": "Tech Startup",
                        "duration_months": 24
                    }
                ],
                "progression_score": 7.5,
                "average_tenure": 28.5,
                "job_changes": 4,
                "industry_changes": 1,
                "salary_growth": 85.0,
                "insights": [
                    "Strong technical progression from junior to senior roles",
                    "Consistent growth within technology sector"
                ],
                "recommendations": [
                    "Consider leadership roles to continue progression",
                    "Expand skills in cloud architecture"
                ]
            }
        }

