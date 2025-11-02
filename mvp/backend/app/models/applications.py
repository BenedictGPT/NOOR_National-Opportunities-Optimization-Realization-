"""
Pydantic models for Applications endpoints (Layer 3 - Federal).

This module defines request/response models for job applications
in the NOOR Platform MVP.
"""

from datetime import date, datetime
from typing import Optional, List
from uuid import UUID
from enum import Enum
from pydantic import BaseModel, Field, validator


# ============================================================================
# Enums
# ============================================================================

class ApplicationStatus(str, Enum):
    """Application status workflow."""
    DRAFT = "draft"
    SUBMITTED = "submitted"
    UNDER_REVIEW = "under_review"
    SHORTLISTED = "shortlisted"
    INTERVIEW_SCHEDULED = "interview_scheduled"
    INTERVIEWED = "interviewed"
    OFFER_EXTENDED = "offer_extended"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    WITHDRAWN = "withdrawn"


class ApplicationSource(str, Enum):
    """Source of application."""
    NOOR_PLATFORM = "noor_platform"
    DIRECT_APPLY = "direct_apply"
    REFERRAL = "referral"
    RECRUITMENT_AGENCY = "recruitment_agency"
    OTHER = "other"


# ============================================================================
# Request Models
# ============================================================================

class ApplicationCreate(BaseModel):
    """Request model for creating application."""
    
    job_id: UUID = Field(..., description="ID of job posting")
    cover_letter: Optional[str] = Field(
        None,
        max_length=5000,
        description="Cover letter",
        example="I am excited to apply for this position..."
    )
    expected_salary: Optional[int] = Field(
        None,
        ge=0,
        description="Expected salary in AED",
        example=15000
    )
    available_from: Optional[date] = Field(
        None,
        description="Available start date",
        example="2024-12-01"
    )
    source: ApplicationSource = Field(
        default=ApplicationSource.NOOR_PLATFORM,
        description="Application source"
    )
    referral_code: Optional[str] = Field(
        None,
        max_length=50,
        description="Referral code if applicable"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "job_id": "123e4567-e89b-12d3-a456-426614174000",
                "cover_letter": "I am excited to apply for this position...",
                "expected_salary": 15000,
                "available_from": "2024-12-01",
                "source": "noor_platform"
            }
        }


class ApplicationUpdate(BaseModel):
    """Request model for updating application."""
    
    cover_letter: Optional[str] = Field(None, max_length=5000)
    expected_salary: Optional[int] = Field(None, ge=0)
    available_from: Optional[date] = None
    status: Optional[ApplicationStatus] = None


class ApplicationStatusUpdate(BaseModel):
    """Request model for updating application status (employer use)."""
    
    status: ApplicationStatus = Field(..., description="New status")
    notes: Optional[str] = Field(
        None,
        max_length=1000,
        description="Status update notes"
    )
    interview_date: Optional[datetime] = Field(
        None,
        description="Interview date/time if scheduling interview"
    )


# ============================================================================
# Response Models
# ============================================================================

class ApplicationResponse(BaseModel):
    """Response model for application."""
    
    id: UUID
    user_id: UUID
    job_id: UUID
    cover_letter: Optional[str]
    expected_salary: Optional[int]
    available_from: Optional[date]
    status: ApplicationStatus
    source: ApplicationSource
    referral_code: Optional[str]
    match_score: Optional[float]  # AI-generated match score
    submitted_at: Optional[datetime]
    reviewed_at: Optional[datetime]
    interview_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ApplicationListResponse(BaseModel):
    """Response model for list of applications."""
    
    total: int
    items: List[ApplicationResponse]
    page: int = 1
    page_size: int = 10


class ApplicationStatsResponse(BaseModel):
    """Response model for application statistics."""
    
    total_applications: int
    by_status: dict[str, int]
    by_source: dict[str, int]
    average_match_score: float
    submitted_count: int
    under_review_count: int
    shortlisted_count: int
    interview_count: int
    offer_count: int
    accepted_count: int
    rejected_count: int


# ============================================================================
# Filter Models
# ============================================================================

class ApplicationFilterParams(BaseModel):
    """Filter parameters for application list."""
    
    job_id: Optional[UUID] = None
    status: Optional[ApplicationStatus] = None
    source: Optional[ApplicationSource] = None
    min_match_score: Optional[float] = Field(None, ge=0.0, le=1.0)
    submitted_after: Optional[date] = None
    submitted_before: Optional[date] = None
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=10, ge=1, le=100)

