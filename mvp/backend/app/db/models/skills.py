"""
NOOR Platform - Skills SQLAlchemy ORM Models
"""

from sqlalchemy import Column, String, Text, Boolean, DateTime, Numeric, Date, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.db.postgres import Base


class Skill(Base):
    """
    Skills catalog table
    """
    __tablename__ = "skills"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False, index=True)
    category = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    
    # Relationships
    user_skills = relationship("UserSkill", back_populates="skill", cascade="all, delete-orphan")
    
    # Indexes
    __table_args__ = (
        Index('idx_skills_name_trgm', 'name', postgresql_using='gin', postgresql_ops={'name': 'gin_trgm_ops'}),
        Index('idx_skills_category', 'category'),
    )
    
    def __repr__(self):
        return f"<Skill(id={self.id}, name='{self.name}', category='{self.category}')>"


class UserSkill(Base):
    """
    User skills (Skills Passport)
    """
    __tablename__ = "user_skills"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    skill_id = Column(UUID(as_uuid=True), ForeignKey('skills.id', ondelete='CASCADE'), nullable=False, index=True)
    proficiency_level = Column(String(50), nullable=False)
    years_of_experience = Column(Numeric(4, 1), nullable=True)
    last_used_date = Column(Date, nullable=True)
    is_verified = Column(Boolean, default=False, nullable=False)
    verified_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=True)
    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    skill = relationship("Skill", back_populates="user_skills")
    user = relationship("User", foreign_keys=[user_id], back_populates="skills")
    verifier = relationship("User", foreign_keys=[verified_by])
    
    # Constraints
    __table_args__ = (
        Index('idx_user_skills_user_id', 'user_id'),
        Index('idx_user_skills_skill_id', 'skill_id'),
        Index('idx_user_skills_proficiency', 'proficiency_level'),
        Index('idx_user_skills_verified', 'is_verified'),
    )
    
    def __repr__(self):
        return f"<UserSkill(id={self.id}, user_id={self.user_id}, skill_id={self.skill_id}, proficiency='{self.proficiency_level}')>"
    
    @property
    def duration_months(self):
        """Calculate duration in months from years of experience"""
        if self.years_of_experience:
            return int(self.years_of_experience * 12)
        return 0


class SkillVerificationRequest(Base):
    """
    Skill verification requests
    """
    __tablename__ = "skill_verification_requests"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_skill_id = Column(UUID(as_uuid=True), ForeignKey('user_skills.id', ondelete='CASCADE'), nullable=False)
    requested_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    verification_evidence = Column(Text, nullable=True)
    status = Column(String(50), default='pending', nullable=False)  # pending, approved, rejected
    reviewed_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=True)
    reviewed_at = Column(DateTime(timezone=True), nullable=True)
    review_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    user_skill = relationship("UserSkill")
    requester = relationship("User", foreign_keys=[requested_by])
    reviewer = relationship("User", foreign_keys=[reviewed_by])
    
    # Indexes
    __table_args__ = (
        Index('idx_verification_user_skill', 'user_skill_id'),
        Index('idx_verification_status', 'status'),
        Index('idx_verification_requested_by', 'requested_by'),
    )
    
    def __repr__(self):
        return f"<SkillVerificationRequest(id={self.id}, user_skill_id={self.user_skill_id}, status='{self.status}')>"

