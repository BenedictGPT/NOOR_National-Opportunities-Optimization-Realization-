"""
Education API endpoints.

This module implements REST API endpoints for education management.
"""

from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.postgres import get_db
from app.models.education import (
    EducationCreate,
    EducationUpdate,
    EducationResponse,
    EducationListResponse,
    EducationStatsResponse,
    EducationFilterParams,
    EducationVerificationRequest
)
from app.services.education_service import EducationService


router = APIRouter()


# Dependency to get current user ID (placeholder - implement with actual auth)
async def get_current_user_id() -> UUID:
    """Get current authenticated user ID."""
    # TODO: Implement actual authentication
    return UUID("123e4567-e89b-12d3-a456-426614174000")


@router.post(
    "/",
    response_model=EducationResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create education record",
    description="Create a new education record for the authenticated user"
)
async def create_education(
    education_data: EducationCreate,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """Create a new education record."""
    service = EducationService(db)
    return await service.create_education(user_id, education_data)


@router.get(
    "/",
    response_model=EducationListResponse,
    summary="List education records",
    description="Get a paginated list of education records for the authenticated user"
)
async def list_education(
    degree_level: str = None,
    status: str = None,
    is_verified: bool = None,
    min_gpa: float = None,
    institution_name: str = None,
    field_of_study: str = None,
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """List education records with optional filters."""
    filters = EducationFilterParams(
        degree_level=degree_level,
        status=status,
        is_verified=is_verified,
        min_gpa=min_gpa,
        institution_name=institution_name,
        field_of_study=field_of_study,
        page=page,
        page_size=page_size
    )
    
    service = EducationService(db)
    return await service.list_education(user_id, filters)


@router.get(
    "/stats",
    response_model=EducationStatsResponse,
    summary="Get education statistics",
    description="Get statistics about the user's education records"
)
async def get_education_stats(
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """Get education statistics for the authenticated user."""
    service = EducationService(db)
    return await service.get_education_stats(user_id)


@router.get(
    "/{education_id}",
    response_model=EducationResponse,
    summary="Get education record",
    description="Get a specific education record by ID"
)
async def get_education(
    education_id: UUID,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """Get a specific education record."""
    service = EducationService(db)
    education = await service.get_education(education_id, user_id)
    
    if not education:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Education record not found"
        )
    
    return education


@router.put(
    "/{education_id}",
    response_model=EducationResponse,
    summary="Update education record",
    description="Update an existing education record"
)
async def update_education(
    education_id: UUID,
    education_data: EducationUpdate,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """Update an education record."""
    service = EducationService(db)
    education = await service.update_education(education_id, user_id, education_data)
    
    if not education:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Education record not found"
        )
    
    return education


@router.delete(
    "/{education_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete education record",
    description="Delete an education record"
)
async def delete_education(
    education_id: UUID,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """Delete an education record."""
    service = EducationService(db)
    deleted = await service.delete_education(education_id, user_id)
    
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Education record not found"
        )
    
    return None


@router.post(
    "/verify",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Request education verification",
    description="Submit a request to verify an education record"
)
async def request_verification(
    verification_data: EducationVerificationRequest,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """Request verification for an education record."""
    service = EducationService(db)
    
    try:
        result = await service.request_verification(user_id, verification_data)
        return result
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )

