"""SQLAlchemy ORM models for Institutions."""
from datetime import datetime, date
from sqlalchemy import Column, String, DateTime, Boolean, Integer, Date, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.db.postgres import Base
from app.models.institutions import InstitutionType, InstitutionSize, IndustryType, VerificationStatus

class Institution(Base):
    """Institution model."""
    __tablename__ = "institutions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(200), nullable=False, index=True)
    name_ar = Column(String(200), nullable=True)
    institution_type = Column(SQLEnum(InstitutionType), nullable=False, index=True)
    industry = Column(SQLEnum(IndustryType), nullable=False, index=True)
    size = Column(SQLEnum(InstitutionSize), nullable=False, index=True)
    
    email = Column(String(200), nullable=False)
    phone = Column(String(20), nullable=False)
    website = Column(String(500), nullable=True)
    
    address_line1 = Column(String(200), nullable=False)
    address_line2 = Column(String(200), nullable=True)
    city = Column(String(100), nullable=False)
    emirate = Column(String(100), nullable=False, index=True)
    po_box = Column(String(20), nullable=True)
    
    trade_license_number = Column(String(50), nullable=False, unique=True, index=True)
    established_date = Column(Date, nullable=False)
    employee_count = Column(Integer, nullable=False, default=1)
    
    description = Column(String(2000), nullable=True)
    description_ar = Column(String(2000), nullable=True)
    
    is_verified = Column(Boolean, default=False, nullable=False, index=True)
    verification_status = Column(SQLEnum(VerificationStatus), default=VerificationStatus.PENDING, nullable=False)
    verified_at = Column(Date, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
