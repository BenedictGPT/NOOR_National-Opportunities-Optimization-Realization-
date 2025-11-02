"""SQLAlchemy ORM models for Applications."""
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Integer, Date, Float, ForeignKey, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.db.postgres import Base
from app.models.applications import ApplicationStatus, ApplicationSource

class Application(Base):
    """Application model."""
    __tablename__ = "applications"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    job_id = Column(UUID(as_uuid=True), ForeignKey("job_postings.id", ondelete="CASCADE"), nullable=False, index=True)
    
    cover_letter = Column(String(5000), nullable=True)
    expected_salary = Column(Integer, nullable=True)
    available_from = Column(Date, nullable=True)
    
    status = Column(SQLEnum(ApplicationStatus), default=ApplicationStatus.DRAFT, nullable=False, index=True)
    source = Column(SQLEnum(ApplicationSource), default=ApplicationSource.NOOR_PLATFORM, nullable=False)
    referral_code = Column(String(50), nullable=True)
    
    match_score = Column(Float, nullable=True)
    submitted_at = Column(DateTime, nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    interview_date = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
