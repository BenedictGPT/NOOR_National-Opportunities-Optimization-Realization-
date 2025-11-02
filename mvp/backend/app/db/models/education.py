"""
SQLAlchemy ORM models for Education.

This module defines database models for educational background in the NOOR Platform MVP.
"""

from datetime import datetime
from sqlalchemy import (
    Column, String, DateTime, Boolean, Float, Date, ForeignKey, Enum as SQLEnum, JSON
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from app.db.postgres import Base
from app.models.education import DegreeLevel, EducationStatus, VerificationStatus


class Education(Base):
    """Education record model."""
    
    __tablename__ = "education"
    
    # Primary Key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # Foreign Keys
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Basic Information
    institution_name = Column(String(200), nullable=False, index=True)
    degree = Column(String(100), nullable=False)
    degree_level = Column(SQLEnum(DegreeLevel), nullable=False, index=True)
    field_of_study = Column(String(100), nullable=False, index=True)
    
    # Dates
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    
    # Status
    status = Column(SQLEnum(EducationStatus), nullable=False, default=EducationStatus.COMPLETED, index=True)
    
    # Academic Performance
    gpa = Column(Float, nullable=True)
    honors = Column(String(200), nullable=True)
    
    # Additional Information
    activities = Column(JSON, nullable=True)  # List of extracurricular activities
    description = Column(String(1000), nullable=True)
    
    # Verification
    is_verified = Column(Boolean, default=False, nullable=False, index=True)
    verification_status = Column(SQLEnum(VerificationStatus), default=VerificationStatus.PENDING, nullable=False)
    verified_at = Column(Date, nullable=True)
    verified_by = Column(String(200), nullable=True)
    verification_notes = Column(String(500), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationships
    # user = relationship("User", back_populates="education_records")
    
    def __repr__(self):
        return f"<Education(id={self.id}, user_id={self.user_id}, degree={self.degree}, institution={self.institution_name})>"
    
    @property
    def duration_years(self) -> float:
        """Calculate duration of education in years."""
        if not self.end_date:
            # If in progress, calculate from start to now
            end = datetime.now().date()
        else:
            end = self.end_date
        
        delta = end - self.start_date
        return round(delta.days / 365.25, 1)
    
    @property
    def is_current(self) -> bool:
        """Check if education is currently in progress."""
        return self.status == EducationStatus.IN_PROGRESS
    
    @property
    def is_completed(self) -> bool:
        """Check if education is completed."""
        return self.status == EducationStatus.COMPLETED


class EducationVerificationRequest(Base):
    """Education verification request model."""
    
    __tablename__ = "education_verification_requests"
    
    # Primary Key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # Foreign Keys
    education_id = Column(UUID(as_uuid=True), ForeignKey("education.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Verification Details
    verification_document_url = Column(String(500), nullable=True)
    contact_email = Column(String(200), nullable=True)
    notes = Column(String(500), nullable=True)
    
    # Status
    status = Column(SQLEnum(VerificationStatus), default=VerificationStatus.PENDING, nullable=False, index=True)
    
    # Response
    response_notes = Column(String(1000), nullable=True)
    verified_by = Column(String(200), nullable=True)
    verified_at = Column(DateTime, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationships
    # education = relationship("Education", back_populates="verification_requests")
    
    def __repr__(self):
        return f"<EducationVerificationRequest(id={self.id}, education_id={self.education_id}, status={self.status})>"

