"""
Education Service Layer.

This module implements business logic for education management in the NOOR Platform MVP.
"""

from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime, date
from sqlalchemy.orm import Session
from sqlalchemy import func, and_

from app.db.models.education import Education, EducationVerificationRequest
from app.models.education import (
    EducationCreate,
    EducationUpdate,
    EducationResponse,
    EducationListResponse,
    EducationStatsResponse,
    EducationFilterParams,
    EducationVerificationRequest as VerificationRequestModel,
    DegreeLevel,
    EducationStatus,
    VerificationStatus
)


class EducationService:
    """Service class for education management."""
    
    def __init__(self, db: Session):
        """Initialize education service."""
        self.db = db
    
    # ========================================================================
    # CRUD Operations
    # ========================================================================
    
    async def create_education(
        self,
        user_id: UUID,
        education_data: EducationCreate
    ) -> EducationResponse:
        """
        Create a new education record.
        
        Args:
            user_id: ID of the user
            education_data: Education creation data
            
        Returns:
            Created education record
        """
        education = Education(
            user_id=user_id,
            **education_data.dict()
        )
        
        self.db.add(education)
        self.db.commit()
        self.db.refresh(education)
        
        return EducationResponse.from_orm(education)
    
    async def get_education(
        self,
        education_id: UUID,
        user_id: Optional[UUID] = None
    ) -> Optional[EducationResponse]:
        """
        Get education record by ID.
        
        Args:
            education_id: ID of education record
            user_id: Optional user ID for authorization
            
        Returns:
            Education record or None
        """
        query = self.db.query(Education).filter(Education.id == education_id)
        
        if user_id:
            query = query.filter(Education.user_id == user_id)
        
        education = query.first()
        
        if not education:
            return None
        
        return EducationResponse.from_orm(education)
    
    async def list_education(
        self,
        user_id: UUID,
        filters: EducationFilterParams
    ) -> EducationListResponse:
        """
        List education records for a user with filters.
        
        Args:
            user_id: ID of the user
            filters: Filter parameters
            
        Returns:
            Paginated list of education records
        """
        query = self.db.query(Education).filter(Education.user_id == user_id)
        
        # Apply filters
        if filters.degree_level:
            query = query.filter(Education.degree_level == filters.degree_level)
        
        if filters.status:
            query = query.filter(Education.status == filters.status)
        
        if filters.is_verified is not None:
            query = query.filter(Education.is_verified == filters.is_verified)
        
        if filters.min_gpa:
            query = query.filter(Education.gpa >= filters.min_gpa)
        
        if filters.institution_name:
            query = query.filter(
                Education.institution_name.ilike(f"%{filters.institution_name}%")
            )
        
        if filters.field_of_study:
            query = query.filter(
                Education.field_of_study.ilike(f"%{filters.field_of_study}%")
            )
        
        # Get total count
        total = query.count()
        
        # Apply pagination
        offset = (filters.page - 1) * filters.page_size
        education_records = query.order_by(
            Education.start_date.desc()
        ).offset(offset).limit(filters.page_size).all()
        
        return EducationListResponse(
            total=total,
            items=[EducationResponse.from_orm(edu) for edu in education_records],
            page=filters.page,
            page_size=filters.page_size
        )
    
    async def update_education(
        self,
        education_id: UUID,
        user_id: UUID,
        education_data: EducationUpdate
    ) -> Optional[EducationResponse]:
        """
        Update education record.
        
        Args:
            education_id: ID of education record
            user_id: ID of the user
            education_data: Update data
            
        Returns:
            Updated education record or None
        """
        education = self.db.query(Education).filter(
            and_(
                Education.id == education_id,
                Education.user_id == user_id
            )
        ).first()
        
        if not education:
            return None
        
        # Update fields
        update_data = education_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(education, field, value)
        
        education.updated_at = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(education)
        
        return EducationResponse.from_orm(education)
    
    async def delete_education(
        self,
        education_id: UUID,
        user_id: UUID
    ) -> bool:
        """
        Delete education record.
        
        Args:
            education_id: ID of education record
            user_id: ID of the user
            
        Returns:
            True if deleted, False if not found
        """
        education = self.db.query(Education).filter(
            and_(
                Education.id == education_id,
                Education.user_id == user_id
            )
        ).first()
        
        if not education:
            return False
        
        self.db.delete(education)
        self.db.commit()
        
        return True
    
    # ========================================================================
    # Verification Operations
    # ========================================================================
    
    async def request_verification(
        self,
        user_id: UUID,
        verification_data: VerificationRequestModel
    ) -> Dict[str, Any]:
        """
        Request verification for education record.
        
        Args:
            user_id: ID of the user
            verification_data: Verification request data
            
        Returns:
            Verification request details
        """
        # Check if education exists and belongs to user
        education = self.db.query(Education).filter(
            and_(
                Education.id == verification_data.education_id,
                Education.user_id == user_id
            )
        ).first()
        
        if not education:
            raise ValueError("Education record not found")
        
        # Create verification request
        verification_request = EducationVerificationRequest(
            education_id=verification_data.education_id,
            user_id=user_id,
            verification_document_url=verification_data.verification_document_url,
            contact_email=verification_data.contact_email,
            notes=verification_data.notes
        )
        
        self.db.add(verification_request)
        self.db.commit()
        self.db.refresh(verification_request)
        
        return {
            "id": str(verification_request.id),
            "education_id": str(verification_request.education_id),
            "status": verification_request.status,
            "created_at": verification_request.created_at.isoformat(),
            "message": "Verification request submitted successfully"
        }
    
    # ========================================================================
    # Statistics & Analytics
    # ========================================================================
    
    async def get_education_stats(self, user_id: UUID) -> EducationStatsResponse:
        """
        Get education statistics for a user.
        
        Args:
            user_id: ID of the user
            
        Returns:
            Education statistics
        """
        education_records = self.db.query(Education).filter(
            Education.user_id == user_id
        ).all()
        
        if not education_records:
            return EducationStatsResponse(
                total_records=0,
                by_degree_level={},
                by_status={},
                verified_count=0,
                average_gpa=None,
                highest_degree=None
            )
        
        # Count by degree level
        by_degree_level = {}
        for record in education_records:
            level = record.degree_level.value
            by_degree_level[level] = by_degree_level.get(level, 0) + 1
        
        # Count by status
        by_status = {}
        for record in education_records:
            status = record.status.value
            by_status[status] = by_status.get(status, 0) + 1
        
        # Count verified
        verified_count = sum(1 for r in education_records if r.is_verified)
        
        # Calculate average GPA
        gpas = [r.gpa for r in education_records if r.gpa is not None]
        average_gpa = round(sum(gpas) / len(gpas), 2) if gpas else None
        
        # Find highest degree
        degree_hierarchy = {
            DegreeLevel.CERTIFICATE: 1,
            DegreeLevel.HIGH_SCHOOL: 2,
            DegreeLevel.DIPLOMA: 3,
            DegreeLevel.ASSOCIATE: 4,
            DegreeLevel.BACHELOR: 5,
            DegreeLevel.MASTER: 6,
            DegreeLevel.DOCTORATE: 7,
            DegreeLevel.OTHER: 0
        }
        
        highest_degree = max(
            education_records,
            key=lambda x: degree_hierarchy.get(x.degree_level, 0)
        ).degree_level if education_records else None
        
        return EducationStatsResponse(
            total_records=len(education_records),
            by_degree_level=by_degree_level,
            by_status=by_status,
            verified_count=verified_count,
            average_gpa=average_gpa,
            highest_degree=highest_degree
        )
    
    # ========================================================================
    # Helper Methods
    # ========================================================================
    
    async def get_highest_degree(self, user_id: UUID) -> Optional[DegreeLevel]:
        """
        Get the highest degree level for a user.
        
        Args:
            user_id: ID of the user
            
        Returns:
            Highest degree level or None
        """
        stats = await self.get_education_stats(user_id)
        return stats.highest_degree
    
    async def get_verified_education(self, user_id: UUID) -> List[EducationResponse]:
        """
        Get all verified education records for a user.
        
        Args:
            user_id: ID of the user
            
        Returns:
            List of verified education records
        """
        education_records = self.db.query(Education).filter(
            and_(
                Education.user_id == user_id,
                Education.is_verified == True
            )
        ).order_by(Education.start_date.desc()).all()
        
        return [EducationResponse.from_orm(edu) for edu in education_records]
    
    async def get_current_education(self, user_id: UUID) -> List[EducationResponse]:
        """
        Get current (in-progress) education records for a user.
        
        Args:
            user_id: ID of the user
            
        Returns:
            List of current education records
        """
        education_records = self.db.query(Education).filter(
            and_(
                Education.user_id == user_id,
                Education.status == EducationStatus.IN_PROGRESS
            )
        ).order_by(Education.start_date.desc()).all()
        
        return [EducationResponse.from_orm(edu) for edu in education_records]

