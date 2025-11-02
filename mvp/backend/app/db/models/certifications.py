"""SQLAlchemy ORM models for Certifications."""

from datetime import datetime, date, timedelta
from sqlalchemy import Column, String, DateTime, Boolean, Date, ForeignKey, Enum as SQLEnum, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.db.postgres import Base
from app.models.certifications import CertificationType, CertificationStatus, VerificationStatus


class Certification(Base):
    """Certification model."""
    
    __tablename__ = "certifications"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    name = Column(String(200), nullable=False, index=True)
    issuing_organization = Column(String(200), nullable=False, index=True)
    certification_type = Column(SQLEnum(CertificationType), nullable=False, index=True)
    
    issue_date = Column(Date, nullable=False)
    expiry_date = Column(Date, nullable=True)
    
    credential_id = Column(String(100), nullable=True)
    credential_url = Column(String(500), nullable=True)
    description = Column(String(1000), nullable=True)
    skills = Column(JSON, nullable=True)
    
    status = Column(SQLEnum(CertificationStatus), default=CertificationStatus.ACTIVE, nullable=False, index=True)
    is_verified = Column(Boolean, default=False, nullable=False, index=True)
    verification_status = Column(SQLEnum(VerificationStatus), default=VerificationStatus.PENDING, nullable=False)
    verified_at = Column(Date, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    @property
    def is_expired(self) -> bool:
        """Check if certification is expired."""
        if not self.expiry_date:
            return False
        return date.today() > self.expiry_date
    
    @property
    def days_until_expiry(self) -> int:
        """Get days until expiry."""
        if not self.expiry_date:
            return 999999
        delta = self.expiry_date - date.today()
        return delta.days
    
    @property
    def is_expiring_soon(self) -> bool:
        """Check if expiring within 90 days."""
        return 0 < self.days_until_expiry <= 90
