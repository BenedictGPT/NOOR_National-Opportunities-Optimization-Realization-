"""
NOOR Platform - Work Experience SQLAlchemy ORM Models
"""

from sqlalchemy import Column, String, Text, Boolean, DateTime, Integer, Date, ForeignKey, Index, Table
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import date
import uuid

from app.db.postgres import Base


# Association table for work experience and skills
work_experience_skills = Table(
    'work_experience_skills',
    Base.metadata,
    Column('work_experience_id', UUID(as_uuid=True), ForeignKey('work_experience.id', ondelete='CASCADE'), primary_key=True),
    Column('skill_id', UUID(as_uuid=True), ForeignKey('skills.id', ondelete='CASCADE'), primary_key=True),
    Column('created_at', DateTime(timezone=True), server_default=func.now())
)


class WorkExperience(Base):
    """
    Work experience records
    """
    __tablename__ = "work_experience"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    company_name = Column(String(255), nullable=False, index=True)
    job_title = Column(String(200), nullable=False, index=True)
    employment_type = Column(String(50), nullable=False, index=True)
    industry = Column(String(100), nullable=True, index=True)
    location = Column(String(255), nullable=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    is_current = Column(Boolean, default=False, nullable=False, index=True)
    description = Column(Text, nullable=True)
    achievements = Column(ARRAY(Text), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="work_experiences")
    skills = relationship("Skill", secondary=work_experience_skills, backref="work_experiences")
    verification_requests = relationship("WorkExperienceVerification", back_populates="work_experience", cascade="all, delete-orphan")
    
    # Indexes
    __table_args__ = (
        Index('idx_work_exp_user_id', 'user_id'),
        Index('idx_work_exp_company', 'company_name'),
        Index('idx_work_exp_employment_type', 'employment_type'),
        Index('idx_work_exp_industry', 'industry'),
        Index('idx_work_exp_current', 'is_current'),
        Index('idx_work_exp_dates', 'start_date', 'end_date'),
    )
    
    def __repr__(self):
        return f"<WorkExperience(id={self.id}, user_id={self.user_id}, title='{self.job_title}', company='{self.company_name}')>"
    
    @property
    def duration_months(self):
        """Calculate duration in months"""
        end = self.end_date if self.end_date else date.today()
        delta = (end.year - self.start_date.year) * 12 + (end.month - self.start_date.month)
        return max(delta, 0)
    
    @property
    def duration_years(self):
        """Calculate duration in years"""
        return round(self.duration_months / 12, 1)


class WorkExperienceVerification(Base):
    """
    Work experience verification requests
    """
    __tablename__ = "work_experience_verifications"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    work_experience_id = Column(UUID(as_uuid=True), ForeignKey('work_experience.id', ondelete='CASCADE'), nullable=False)
    requested_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    verification_document_url = Column(String(500), nullable=True)
    contact_person = Column(String(200), nullable=True)
    contact_email = Column(String(255), nullable=True)
    contact_phone = Column(String(50), nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String(50), default='pending', nullable=False)  # pending, in_progress, verified, rejected
    verified_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=True)
    verified_at = Column(DateTime(timezone=True), nullable=True)
    verification_notes = Column(Text, nullable=True)
    verification_method = Column(String(100), nullable=True)  # email, phone, document, reference_check
    estimated_completion = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    work_experience = relationship("WorkExperience", back_populates="verification_requests")
    requester = relationship("User", foreign_keys=[requested_by])
    verifier = relationship("User", foreign_keys=[verified_by])
    
    # Indexes
    __table_args__ = (
        Index('idx_work_verification_experience', 'work_experience_id'),
        Index('idx_work_verification_status', 'status'),
        Index('idx_work_verification_requested_by', 'requested_by'),
    )
    
    def __repr__(self):
        return f"<WorkExperienceVerification(id={self.id}, work_experience_id={self.work_experience_id}, status='{self.status}')>"


class CareerAnalytics(Base):
    """
    Cached career analytics and insights
    """
    __tablename__ = "career_analytics"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True, index=True)
    total_experiences = Column(Integer, default=0)
    total_months = Column(Integer, default=0)
    total_years = Column(Integer, default=0)
    current_positions = Column(Integer, default=0)
    companies_worked = Column(Integer, default=0)
    industries = Column(ARRAY(String), nullable=True)
    progression_score = Column(Integer, nullable=True)  # 0-10
    average_tenure_months = Column(Integer, nullable=True)
    job_changes = Column(Integer, default=0)
    industry_changes = Column(Integer, default=0)
    insights = Column(ARRAY(Text), nullable=True)
    recommendations = Column(ARRAY(Text), nullable=True)
    last_calculated = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="career_analytics")
    
    # Indexes
    __table_args__ = (
        Index('idx_career_analytics_user', 'user_id'),
        Index('idx_career_analytics_updated', 'updated_at'),
    )
    
    def __repr__(self):
        return f"<CareerAnalytics(id={self.id}, user_id={self.user_id}, total_years={self.total_years})>"
    
    @property
    def needs_refresh(self):
        """Check if analytics need to be recalculated (older than 24 hours)"""
        from datetime import datetime, timedelta
        return datetime.now() - self.last_calculated > timedelta(hours=24)

