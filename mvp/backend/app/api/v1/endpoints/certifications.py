"""Certifications API endpoints."""

from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.postgres import get_db
from app.models.certifications import (
    CertificationCreate,
    CertificationUpdate,
    CertificationResponse,
    CertificationListResponse,
    CertificationStatsResponse,
    CertificationFilterParams
)
from app.services.certifications_service import CertificationsService


router = APIRouter()


async def get_current_user_id() -> UUID:
    """Get current authenticated user ID."""
    return UUID("123e4567-e89b-12d3-a456-426614174000")


@router.post("/", response_model=CertificationResponse, status_code=status.HTTP_201_CREATED)
async def create_certification(
    cert_data: CertificationCreate,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """Create a new certification."""
    service = CertificationsService(db)
    return await service.create_certification(user_id, cert_data)


@router.get("/", response_model=CertificationListResponse)
async def list_certifications(
    certification_type: str = None,
    status: str = None,
    is_verified: bool = None,
    issuing_organization: str = None,
    expiring_soon: bool = None,
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """List certifications with filters."""
    filters = CertificationFilterParams(
        certification_type=certification_type,
        status=status,
        is_verified=is_verified,
        issuing_organization=issuing_organization,
        expiring_soon=expiring_soon,
        page=page,
        page_size=page_size
    )
    
    service = CertificationsService(db)
    return await service.list_certifications(user_id, filters)


@router.get("/stats", response_model=CertificationStatsResponse)
async def get_certification_stats(
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """Get certification statistics."""
    service = CertificationsService(db)
    return await service.get_stats(user_id)


@router.get("/{cert_id}", response_model=CertificationResponse)
async def get_certification(
    cert_id: UUID,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """Get a specific certification."""
    service = CertificationsService(db)
    cert = await service.get_certification(cert_id, user_id)
    
    if not cert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certification not found")
    
    return cert


@router.put("/{cert_id}", response_model=CertificationResponse)
async def update_certification(
    cert_id: UUID,
    cert_data: CertificationUpdate,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """Update a certification."""
    service = CertificationsService(db)
    cert = await service.update_certification(cert_id, user_id, cert_data)
    
    if not cert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certification not found")
    
    return cert


@router.delete("/{cert_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_certification(
    cert_id: UUID,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
):
    """Delete a certification."""
    service = CertificationsService(db)
    deleted = await service.delete_certification(cert_id, user_id)
    
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certification not found")
    
    return None
