"""
Pydantic models for Institutions endpoints (Layer 2 - Employers).

This module defines request/response models for institutional/employer management
in the NOOR Platform MVP.
"""

from datetime import date
from typing import Optional, List
from uuid import UUID
from enum import Enum
from pydantic import BaseModel, Field, validator, EmailStr, HttpUrl


# ============================================================================
# Enums
# ============================================================================

class InstitutionType(str, Enum):
    """Types of institutions."""
    GOVERNMENT = "government"
    SEMI_GOVERNMENT = "semi_government"
    PRIVATE = "private"
    STARTUP = "startup"
    NON_PROFIT = "non_profit"
    EDUCATION = "education"
    HEALTHCARE = "healthcare"
    OTHER = "other"


class InstitutionSize(str, Enum):
    """Institution size categories."""
    MICRO = "micro"  # 1-10 employees
    SMALL = "small"  # 11-50 employees
    MEDIUM = "medium"  # 51-250 employees
    LARGE = "large"  # 251-1000 employees
    ENTERPRISE = "enterprise"  # 1000+ employees


class IndustryType(str, Enum):
    """Industry classifications."""
    TECHNOLOGY = "technology"
    FINANCE = "finance"
    HEALTHCARE = "healthcare"
    EDUCATION = "education"
    RETAIL = "retail"
    MANUFACTURING = "manufacturing"
    CONSTRUCTION = "construction"
    HOSPITALITY = "hospitality"
    TRANSPORTATION = "transportation"
    ENERGY = "energy"
    TELECOMMUNICATIONS = "telecommunications"
    REAL_ESTATE = "real_estate"
    GOVERNMENT = "government"
    NON_PROFIT = "non_profit"
    OTHER = "other"


class VerificationStatus(str, Enum):
    """Institution verification status."""
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"


# ============================================================================
# Request Models
# ============================================================================

class InstitutionCreate(BaseModel):
    """Request model for creating institution."""
    
    name: str = Field(
        ...,
        min_length=2,
        max_length=200,
        description="Institution name",
        example="Emirates Digital Solutions LLC"
    )
    name_ar: Optional[str] = Field(
        None,
        max_length=200,
        description="Institution name in Arabic",
        example="حلول الإمارات الرقمية"
    )
    institution_type: InstitutionType = Field(
        ...,
        description="Type of institution"
    )
    industry: IndustryType = Field(
        ...,
        description="Primary industry"
    )
    size: InstitutionSize = Field(
        ...,
        description="Institution size"
    )
    
    # Contact Information
    email: EmailStr = Field(
        ...,
        description="Primary contact email",
        example="contact@emiratesdigital.ae"
    )
    phone: str = Field(
        ...,
        min_length=7,
        max_length=20,
        description="Primary contact phone",
        example="+971-4-123-4567"
    )
    website: Optional[HttpUrl] = Field(
        None,
        description="Institution website",
        example="https://emiratesdigital.ae"
    )
    
    # Address
    address_line1: str = Field(
        ...,
        max_length=200,
        description="Address line 1",
        example="Dubai Internet City"
    )
    address_line2: Optional[str] = Field(
        None,
        max_length=200,
        description="Address line 2"
    )
    city: str = Field(
        ...,
        max_length=100,
        description="City",
        example="Dubai"
    )
    emirate: str = Field(
        ...,
        max_length=100,
        description="Emirate",
        example="Dubai"
    )
    po_box: Optional[str] = Field(
        None,
        max_length=20,
        description="P.O. Box",
        example="12345"
    )
    
    # Business Details
    trade_license_number: str = Field(
        ...,
        max_length=50,
        description="Trade license number",
        example="CN-1234567"
    )
    established_date: date = Field(
        ...,
        description="Date established",
        example="2015-01-15"
    )
    employee_count: int = Field(
        ...,
        ge=1,
        description="Number of employees",
        example=150
    )
    
    # Additional Information
    description: Optional[str] = Field(
        None,
        max_length=2000,
        description="Institution description"
    )
    description_ar: Optional[str] = Field(
        None,
        max_length=2000,
        description="Institution description in Arabic"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Emirates Digital Solutions LLC",
                "name_ar": "حلول الإمارات الرقمية",
                "institution_type": "private",
                "industry": "technology",
                "size": "medium",
                "email": "contact@emiratesdigital.ae",
                "phone": "+971-4-123-4567",
                "website": "https://emiratesdigital.ae",
                "address_line1": "Dubai Internet City",
                "city": "Dubai",
                "emirate": "Dubai",
                "po_box": "12345",
                "trade_license_number": "CN-1234567",
                "established_date": "2015-01-15",
                "employee_count": 150,
                "description": "Leading digital transformation company in UAE"
            }
        }


class InstitutionUpdate(BaseModel):
    """Request model for updating institution."""
    
    name: Optional[str] = Field(None, min_length=2, max_length=200)
    name_ar: Optional[str] = Field(None, max_length=200)
    institution_type: Optional[InstitutionType] = None
    industry: Optional[IndustryType] = None
    size: Optional[InstitutionSize] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, min_length=7, max_length=20)
    website: Optional[HttpUrl] = None
    address_line1: Optional[str] = Field(None, max_length=200)
    address_line2: Optional[str] = Field(None, max_length=200)
    city: Optional[str] = Field(None, max_length=100)
    emirate: Optional[str] = Field(None, max_length=100)
    po_box: Optional[str] = Field(None, max_length=20)
    employee_count: Optional[int] = Field(None, ge=1)
    description: Optional[str] = Field(None, max_length=2000)
    description_ar: Optional[str] = Field(None, max_length=2000)


# ============================================================================
# Response Models
# ============================================================================

class InstitutionResponse(BaseModel):
    """Response model for institution."""
    
    id: UUID
    name: str
    name_ar: Optional[str]
    institution_type: InstitutionType
    industry: IndustryType
    size: InstitutionSize
    email: str
    phone: str
    website: Optional[str]
    address_line1: str
    address_line2: Optional[str]
    city: str
    emirate: str
    po_box: Optional[str]
    trade_license_number: str
    established_date: date
    employee_count: int
    description: Optional[str]
    description_ar: Optional[str]
    is_verified: bool
    verification_status: VerificationStatus
    verified_at: Optional[date]
    created_at: date
    updated_at: date
    
    class Config:
        from_attributes = True


class InstitutionListResponse(BaseModel):
    """Response model for list of institutions."""
    
    total: int
    items: List[InstitutionResponse]
    page: int = 1
    page_size: int = 10


class InstitutionStatsResponse(BaseModel):
    """Response model for institution statistics."""
    
    total_institutions: int
    by_type: dict[str, int]
    by_industry: dict[str, int]
    by_size: dict[str, int]
    by_emirate: dict[str, int]
    verified_count: int
    total_employees: int
    average_employee_count: float


# ============================================================================
# Filter Models
# ============================================================================

class InstitutionFilterParams(BaseModel):
    """Filter parameters for institution list."""
    
    institution_type: Optional[InstitutionType] = None
    industry: Optional[IndustryType] = None
    size: Optional[InstitutionSize] = None
    emirate: Optional[str] = None
    is_verified: Optional[bool] = None
    name: Optional[str] = Field(None, description="Search by name")
    min_employees: Optional[int] = Field(None, ge=1)
    max_employees: Optional[int] = Field(None, ge=1)
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=10, ge=1, le=100)

