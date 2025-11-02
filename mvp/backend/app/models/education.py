"""
Pydantic models for Education endpoints.

This module defines request/response models for educational background management
in the NOOR Platform MVP.
"""

from datetime import date
from typing import Optional, List
from uuid import UUID
from enum import Enum
from pydantic import BaseModel, Field, validator, root_validator


# ============================================================================
# Enums
# ============================================================================

class DegreeLevel(str, Enum):
    """Educational degree levels."""
    HIGH_SCHOOL = "high_school"
    DIPLOMA = "diploma"
    ASSOCIATE = "associate"
    BACHELOR = "bachelor"
    MASTER = "master"
    DOCTORATE = "doctorate"
    CERTIFICATE = "certificate"
    OTHER = "other"


class EducationStatus(str, Enum):
    """Education record status."""
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    DISCONTINUED = "discontinued"


class VerificationStatus(str, Enum):
    """Verification status for education records."""
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"
    EXPIRED = "expired"


# ============================================================================
# Request Models
# ============================================================================

class EducationCreate(BaseModel):
    """Request model for creating education record."""
    
    institution_name: str = Field(
        ...,
        min_length=2,
        max_length=200,
        description="Name of educational institution",
        example="United Arab Emirates University"
    )
    degree: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Degree or qualification obtained",
        example="Bachelor of Science"
    )
    degree_level: DegreeLevel = Field(
        ...,
        description="Level of degree",
        example=DegreeLevel.BACHELOR
    )
    field_of_study: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Major or field of study",
        example="Computer Science"
    )
    start_date: date = Field(
        ...,
        description="Start date of education",
        example="2015-09-01"
    )
    end_date: Optional[date] = Field(
        None,
        description="End date (null if in progress)",
        example="2019-06-30"
    )
    status: EducationStatus = Field(
        default=EducationStatus.COMPLETED,
        description="Current status of education"
    )
    gpa: Optional[float] = Field(
        None,
        ge=0.0,
        le=4.0,
        description="Grade Point Average (0.0-4.0 scale)",
        example=3.75
    )
    honors: Optional[str] = Field(
        None,
        max_length=200,
        description="Academic honors or distinctions",
        example="Summa Cum Laude"
    )
    activities: Optional[List[str]] = Field(
        default=None,
        description="Extracurricular activities",
        example=["Student Council", "Debate Team"]
    )
    description: Optional[str] = Field(
        None,
        max_length=1000,
        description="Additional details about education"
    )
    
    @validator('end_date')
    def validate_end_date(cls, v, values):
        """Validate that end date is after start date."""
        if v and 'start_date' in values and v < values['start_date']:
            raise ValueError('End date must be after start date')
        return v
    
    @root_validator
    def validate_status(cls, values):
        """Validate status consistency with dates."""
        status = values.get('status')
        end_date = values.get('end_date')
        
        if status == EducationStatus.IN_PROGRESS and end_date:
            raise ValueError('In-progress education cannot have end date')
        if status == EducationStatus.COMPLETED and not end_date:
            raise ValueError('Completed education must have end date')
        
        return values
    
    class Config:
        json_schema_extra = {
            "example": {
                "institution_name": "United Arab Emirates University",
                "degree": "Bachelor of Science",
                "degree_level": "bachelor",
                "field_of_study": "Computer Science",
                "start_date": "2015-09-01",
                "end_date": "2019-06-30",
                "status": "completed",
                "gpa": 3.75,
                "honors": "Summa Cum Laude",
                "activities": ["Student Council", "Programming Club"],
                "description": "Focused on AI and machine learning"
            }
        }


class EducationUpdate(BaseModel):
    """Request model for updating education record."""
    
    institution_name: Optional[str] = Field(None, min_length=2, max_length=200)
    degree: Optional[str] = Field(None, min_length=2, max_length=100)
    degree_level: Optional[DegreeLevel] = None
    field_of_study: Optional[str] = Field(None, min_length=2, max_length=100)
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    status: Optional[EducationStatus] = None
    gpa: Optional[float] = Field(None, ge=0.0, le=4.0)
    honors: Optional[str] = Field(None, max_length=200)
    activities: Optional[List[str]] = None
    description: Optional[str] = Field(None, max_length=1000)


class EducationVerificationRequest(BaseModel):
    """Request model for education verification."""
    
    education_id: UUID = Field(..., description="ID of education record to verify")
    verification_document_url: Optional[str] = Field(
        None,
        description="URL to verification document (transcript, diploma)",
        example="https://storage.noor.ae/documents/transcript_123.pdf"
    )
    contact_email: Optional[str] = Field(
        None,
        description="Institution contact email for verification",
        example="registrar@uaeu.ac.ae"
    )
    notes: Optional[str] = Field(
        None,
        max_length=500,
        description="Additional notes for verification"
    )


# ============================================================================
# Response Models
# ============================================================================

class EducationResponse(BaseModel):
    """Response model for education record."""
    
    id: UUID
    user_id: UUID
    institution_name: str
    degree: str
    degree_level: DegreeLevel
    field_of_study: str
    start_date: date
    end_date: Optional[date]
    status: EducationStatus
    gpa: Optional[float]
    honors: Optional[str]
    activities: Optional[List[str]]
    description: Optional[str]
    is_verified: bool
    verification_status: VerificationStatus
    verified_at: Optional[date]
    created_at: date
    updated_at: date
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "user_id": "987e6543-e21b-12d3-a456-426614174000",
                "institution_name": "United Arab Emirates University",
                "degree": "Bachelor of Science",
                "degree_level": "bachelor",
                "field_of_study": "Computer Science",
                "start_date": "2015-09-01",
                "end_date": "2019-06-30",
                "status": "completed",
                "gpa": 3.75,
                "honors": "Summa Cum Laude",
                "activities": ["Student Council", "Programming Club"],
                "description": "Focused on AI and machine learning",
                "is_verified": True,
                "verification_status": "verified",
                "verified_at": "2019-07-15",
                "created_at": "2024-01-15",
                "updated_at": "2024-01-15"
            }
        }


class EducationListResponse(BaseModel):
    """Response model for list of education records."""
    
    total: int = Field(..., description="Total number of education records")
    items: List[EducationResponse] = Field(..., description="List of education records")
    page: int = Field(default=1, description="Current page number")
    page_size: int = Field(default=10, description="Number of items per page")
    
    class Config:
        json_schema_extra = {
            "example": {
                "total": 3,
                "items": [],
                "page": 1,
                "page_size": 10
            }
        }


class EducationStatsResponse(BaseModel):
    """Response model for education statistics."""
    
    total_records: int
    by_degree_level: dict[str, int]
    by_status: dict[str, int]
    verified_count: int
    average_gpa: Optional[float]
    highest_degree: Optional[DegreeLevel]
    
    class Config:
        json_schema_extra = {
            "example": {
                "total_records": 3,
                "by_degree_level": {
                    "bachelor": 1,
                    "master": 1,
                    "certificate": 1
                },
                "by_status": {
                    "completed": 2,
                    "in_progress": 1
                },
                "verified_count": 2,
                "average_gpa": 3.65,
                "highest_degree": "master"
            }
        }


# ============================================================================
# Filter Models
# ============================================================================

class EducationFilterParams(BaseModel):
    """Filter parameters for education list."""
    
    degree_level: Optional[DegreeLevel] = Field(None, description="Filter by degree level")
    status: Optional[EducationStatus] = Field(None, description="Filter by status")
    is_verified: Optional[bool] = Field(None, description="Filter by verification status")
    min_gpa: Optional[float] = Field(None, ge=0.0, le=4.0, description="Minimum GPA")
    institution_name: Optional[str] = Field(None, description="Search by institution name")
    field_of_study: Optional[str] = Field(None, description="Search by field of study")
    page: int = Field(default=1, ge=1, description="Page number")
    page_size: int = Field(default=10, ge=1, le=100, description="Items per page")
    
    class Config:
        json_schema_extra = {
            "example": {
                "degree_level": "bachelor",
                "status": "completed",
                "is_verified": True,
                "min_gpa": 3.0,
                "page": 1,
                "page_size": 10
            }
        }

