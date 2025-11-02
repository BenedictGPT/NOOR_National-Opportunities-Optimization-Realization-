"""Certifications Service Layer."""

from typing import List, Optional
from uuid import UUID
from datetime import datetime, date, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import and_

from app.db.models.certifications import Certification
from app.models.certifications import (
    CertificationCreate,
    CertificationUpdate,
    CertificationResponse,
    CertificationListResponse,
    CertificationStatsResponse,
    CertificationFilterParams,
    CertificationStatus
)


class CertificationsService:
    """Service class for certifications management."""
    
    def __init__(self, db: Session):
        self.db = db
    
    async def create_certification(
        self,
        user_id: UUID,
        cert_data: CertificationCreate
    ) -> CertificationResponse:
        """Create a new certification."""
        # Determine status based on expiry date
        status = CertificationStatus.ACTIVE
        if cert_data.expiry_date and cert_data.expiry_date < date.today():
            status = CertificationStatus.EXPIRED
        
        certification = Certification(
            user_id=user_id,
            status=status,
            **cert_data.dict()
        )
        
        self.db.add(certification)
        self.db.commit()
        self.db.refresh(certification)
        
        return CertificationResponse.from_orm(certification)
    
    async def get_certification(
        self,
        cert_id: UUID,
        user_id: Optional[UUID] = None
    ) -> Optional[CertificationResponse]:
        """Get certification by ID."""
        query = self.db.query(Certification).filter(Certification.id == cert_id)
        
        if user_id:
            query = query.filter(Certification.user_id == user_id)
        
        cert = query.first()
        return CertificationResponse.from_orm(cert) if cert else None
    
    async def list_certifications(
        self,
        user_id: UUID,
        filters: CertificationFilterParams
    ) -> CertificationListResponse:
        """List certifications with filters."""
        query = self.db.query(Certification).filter(Certification.user_id == user_id)
        
        if filters.certification_type:
            query = query.filter(Certification.certification_type == filters.certification_type)
        
        if filters.status:
            query = query.filter(Certification.status == filters.status)
        
        if filters.is_verified is not None:
            query = query.filter(Certification.is_verified == filters.is_verified)
        
        if filters.issuing_organization:
            query = query.filter(
                Certification.issuing_organization.ilike(f"%{filters.issuing_organization}%")
            )
        
        if filters.expiring_soon:
            expiry_threshold = date.today() + timedelta(days=90)
            query = query.filter(
                and_(
                    Certification.expiry_date.isnot(None),
                    Certification.expiry_date <= expiry_threshold,
                    Certification.expiry_date > date.today()
                )
            )
        
        total = query.count()
        offset = (filters.page - 1) * filters.page_size
        certs = query.order_by(Certification.issue_date.desc()).offset(offset).limit(filters.page_size).all()
        
        return CertificationListResponse(
            total=total,
            items=[CertificationResponse.from_orm(c) for c in certs],
            page=filters.page,
            page_size=filters.page_size
        )
    
    async def update_certification(
        self,
        cert_id: UUID,
        user_id: UUID,
        cert_data: CertificationUpdate
    ) -> Optional[CertificationResponse]:
        """Update certification."""
        cert = self.db.query(Certification).filter(
            and_(Certification.id == cert_id, Certification.user_id == user_id)
        ).first()
        
        if not cert:
            return None
        
        update_data = cert_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(cert, field, value)
        
        # Update status based on expiry
        if cert.expiry_date and cert.expiry_date < date.today():
            cert.status = CertificationStatus.EXPIRED
        
        cert.updated_at = datetime.utcnow()
        self.db.commit()
        self.db.refresh(cert)
        
        return CertificationResponse.from_orm(cert)
    
    async def delete_certification(self, cert_id: UUID, user_id: UUID) -> bool:
        """Delete certification."""
        cert = self.db.query(Certification).filter(
            and_(Certification.id == cert_id, Certification.user_id == user_id)
        ).first()
        
        if not cert:
            return False
        
        self.db.delete(cert)
        self.db.commit()
        return True
    
    async def get_stats(self, user_id: UUID) -> CertificationStatsResponse:
        """Get certification statistics."""
        certs = self.db.query(Certification).filter(Certification.user_id == user_id).all()
        
        if not certs:
            return CertificationStatsResponse(
                total_certifications=0,
                by_type={},
                by_status={},
                active_count=0,
                expired_count=0,
                verified_count=0,
                expiring_soon_count=0
            )
        
        by_type = {}
        by_status = {}
        active_count = 0
        expired_count = 0
        verified_count = 0
        expiring_soon_count = 0
        
        for cert in certs:
            # Count by type
            cert_type = cert.certification_type.value
            by_type[cert_type] = by_type.get(cert_type, 0) + 1
            
            # Count by status
            status = cert.status.value
            by_status[status] = by_status.get(status, 0) + 1
            
            if cert.status == CertificationStatus.ACTIVE:
                active_count += 1
            elif cert.status == CertificationStatus.EXPIRED:
                expired_count += 1
            
            if cert.is_verified:
                verified_count += 1
            
            if cert.is_expiring_soon:
                expiring_soon_count += 1
        
        return CertificationStatsResponse(
            total_certifications=len(certs),
            by_type=by_type,
            by_status=by_status,
            active_count=active_count,
            expired_count=expired_count,
            verified_count=verified_count,
            expiring_soon_count=expiring_soon_count
        )

