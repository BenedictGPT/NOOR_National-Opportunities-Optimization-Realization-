"""
NOOR Platform - User SQLAlchemy ORM Model
"""

from sqlalchemy import Column, String, Boolean, DateTime, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.db.postgres import Base


class User(Base):
    """
    Users table
    """
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    emirates_id = Column(String(15), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    date_of_birth = Column(Date, nullable=True)
    phone_number = Column(String(20), nullable=True)
    nationality = Column(String(100), nullable=True)
    gender = Column(String(20), nullable=True)
    profile_picture_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    email_verified = Column(Boolean, default=False, nullable=False)
    phone_verified = Column(Boolean, default=False, nullable=False)
    uae_pass_verified = Column(Boolean, default=False, nullable=False)
    last_login = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    skills = relationship("UserSkill", back_populates="user", foreign_keys="UserSkill.user_id", cascade="all, delete-orphan")
    work_experiences = relationship("WorkExperience", back_populates="user", cascade="all, delete-orphan")
    career_analytics = relationship("CareerAnalytics", back_populates="user", uselist=False, cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', name='{self.first_name} {self.last_name}')>"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

