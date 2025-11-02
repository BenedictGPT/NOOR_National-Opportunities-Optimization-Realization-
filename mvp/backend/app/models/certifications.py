"""
Pydantic models for Certifications endpoints.

This module defines request/response models for professional certifications
in the NOOR Platform MVP.
"""

from datetime import date
from typing import Optional, List
from uuid import UUID
from enum import Enum
from pydantic import BaseModel, Field, validator, HttpUrl


# ============================================================================
# Enums
# ============================================================================

class CertificationType(str, Enum):
    """Types of professional certifications."""
    PROFESSIONAL = "professional"
    TECHNICAL = "technical"
    LANGUAGE = "language"
    SAFETY = "safety"
    MANAGEMENT = "management"
    LICENSE = "license"
    OTHER = "other"


class CertificationStatus(str, Enum):
    """Certification status."""
    ACTIVE = "active"
    EXPIRED = "expired"
    PENDING = "pending"
    REVOKED = "revoked"


class VerificationStatus(str, Enum):
    """Verification status."""
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"


# ============================================================================
# Request Models
# ============================================================================

class CertificationCreate(BaseModel):
    """Request model for creating certification."""
    
    name: str = Field(
        ...,
        min_length=2,
        max_length=200,
        description="Name of certification",
        example="AWS Certified Solutions Architect"
    )
    issuing_organization: str = Field(
        ...,
        min_length=2,
        max_length=200,
        description="Organization that issued the certification",
        example="Amazon Web Services"
    )
    certification_type: CertificationType = Field(
        ...,
        description="Type of certification"
    )
    issue_date: date = Field(
        ...,
        description="Date certification was issued",
        example="2023-06-15"
    )
    expiry_date: Optional[date] = Field(
        None,
        description="Expiration date (null if no expiry)",
        example="2026-06-15"
    )
    credential_id: Optional[str] = Field(
        None,
        max_length=100,
        description="Credential or certificate ID",
        example="AWS-SAA-2023-123456"
    )
    credential_url: Optional[HttpUrl] = Field(
        None,
        description="URL to verify credential",
        example="https://aws.amazon.com/verification/123456"
    )
    description: Optional[str] = Field(
        None,
        max_length=1000,
        description="Description of certification"
    )
    skills: Optional[List[str]] = Field(
        default=None,
        description="Skills covered by certification",
        example=["Cloud Architecture", "AWS Services", "Security"]
    )
    
    @validator('expiry_date')
    def validate_expiry_date(cls, v, values):
        """Validate that expiry date is after issue date."""
        if v and 'issue_date' in values and v < values['issue_date']:
            raise ValueError('Expiry date must be after issue date')
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "AWS Certified Solutions Architect",
                "issuing_organization": "Amazon Web Services",
                "certification_type": "technical",
                "issue_date": "2023-06-15",
                "expiry_date": "2026-06-15",
                "credential_id": "AWS-SAA-2023-123456",
                "credential_url": "https://aws.amazon.com/verification/123456",
                "description": "Professional-level certification for AWS architects",
                "skills": ["Cloud Architecture", "AWS Services", "Security"]
            }
        }


class CertificationUpdate(BaseModel):
    """Request model for updating certification."""
    
    name: Optional[str] = Field(None, min_length=2, max_length=200)
    issuing_organization: Optional[str] = Field(None, min_length=2, max_length=200)
    certification_type: Optional[CertificationType] = None
    issue_date: Optional[date] = None
    expiry_date: Optional[date] = None
    credential_id: Optional[str] = Field(None, max_length=100)
    credential_url: Optional[HttpUrl] = None
    description: Optional[str] = Field(None, max_length=1000)
    skills: Optional[List[str]] = None


class CertificationVerificationRequest(BaseModel):
    """Request model for certification verification."""
    
    certification_id: UUID = Field(..., description="ID of certification to verify")
    verification_document_url: Optional[str] = Field(
        None,
        description="URL to verification document",
        example="https://storage.noor.ae/documents/cert_123.pdf"
    )
    notes: Optional[str] = Field(
        None,
        max_length=500,
        description="Additional notes for verification"
    )


# ============================================================================
# Response Models
# ============================================================================

class CertificationResponse(BaseModel):
    """Response model for certification."""
    
    id: UUID
    user_id: UUID
    name: str
    issuing_organization: str
    certification_type: CertificationType
    issue_date: date
    expiry_date: Optional[date]
    credential_id: Optional[str]
    credential_url: Optional[str]
    description: Optional[str]
    skills: Optional[List[str]]
    status: CertificationStatus
    is_verified: bool
    verification_status: VerificationStatus
    verified_at: Optional[date]
    created_at: date
    updated_at: date
    
    class Config:
        from_attributes = True


class CertificationListResponse(BaseModel):
    """Response model for list of certifications."""
    
    total: int
    items: List[CertificationResponse]
    page: int = 1
    page_size: int = 10


class CertificationStatsResponse(BaseModel):
    """Response model for certification statistics."""
    
    total_certifications: int
    by_type: dict[str, int]
    by_status: dict[str, int]
    active_count: int
    expired_count: int
    verified_count: int
    expiring_soon_count: int  # Expiring within 90 days


# ============================================================================
# Filter Models
# ============================================================================

class CertificationFilterParams(BaseModel):
    """Filter parameters for certification list."""
    
    certification_type: Optional[CertificationType] = None
    status: Optional[CertificationStatus] = None
    is_verified: Optional[bool] = None
    issuing_organization: Optional[str] = None
    expiring_soon: Optional[bool] = Field(None, description="Filter certifications expiring within 90 days")
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=10, ge=1, le=100)

