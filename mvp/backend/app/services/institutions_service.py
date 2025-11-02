"""Institutions Service Layer."""

from typing import Optional
from uuid import UUID
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_, func

from app.db.models.institutions import Institution
from app.models.institutions import (
    InstitutionCreate, InstitutionUpdate, InstitutionResponse,
    InstitutionListResponse, InstitutionStatsResponse, InstitutionFilterParams
)


class InstitutionsService:
    """Service class for institutions management."""
    
    def __init__(self, db: Session):
        self.db = db
    
    async def create_institution(self, inst_data: InstitutionCreate) -> InstitutionResponse:
        """Create a new institution."""
        institution = Institution(**inst_data.dict())
        self.db.add(institution)
        self.db.commit()
        self.db.refresh(institution)
        return InstitutionResponse.from_orm(institution)
    
    async def get_institution(self, inst_id: UUID) -> Optional[InstitutionResponse]:
        """Get institution by ID."""
        inst = self.db.query(Institution).filter(Institution.id == inst_id).first()
        return InstitutionResponse.from_orm(inst) if inst else None
    
    async def list_institutions(self, filters: InstitutionFilterParams) -> InstitutionListResponse:
        """List institutions with filters."""
        query = self.db.query(Institution)
        
        if filters.institution_type:
            query = query.filter(Institution.institution_type == filters.institution_type)
        if filters.industry:
            query = query.filter(Institution.industry == filters.industry)
        if filters.size:
            query = query.filter(Institution.size == filters.size)
        if filters.emirate:
            query = query.filter(Institution.emirate.ilike(f"%{filters.emirate}%"))
        if filters.is_verified is not None:
            query = query.filter(Institution.is_verified == filters.is_verified)
        if filters.name:
            query = query.filter(Institution.name.ilike(f"%{filters.name}%"))
        if filters.min_employees:
            query = query.filter(Institution.employee_count >= filters.min_employees)
        if filters.max_employees:
            query = query.filter(Institution.employee_count <= filters.max_employees)
        
        total = query.count()
        offset = (filters.page - 1) * filters.page_size
        insts = query.order_by(Institution.created_at.desc()).offset(offset).limit(filters.page_size).all()
        
        return InstitutionListResponse(
            total=total,
            items=[InstitutionResponse.from_orm(i) for i in insts],
            page=filters.page,
            page_size=filters.page_size
        )
    
    async def update_institution(self, inst_id: UUID, inst_data: InstitutionUpdate) -> Optional[InstitutionResponse]:
        """Update institution."""
        inst = self.db.query(Institution).filter(Institution.id == inst_id).first()
        if not inst:
            return None
        
        update_data = inst_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(inst, field, value)
        
        inst.updated_at = datetime.utcnow()
        self.db.commit()
        self.db.refresh(inst)
        return InstitutionResponse.from_orm(inst)
    
    async def delete_institution(self, inst_id: UUID) -> bool:
        """Delete institution."""
        inst = self.db.query(Institution).filter(Institution.id == inst_id).first()
        if not inst:
            return False
        self.db.delete(inst)
        self.db.commit()
        return True
    
    async def get_stats(self) -> InstitutionStatsResponse:
        """Get institution statistics."""
        insts = self.db.query(Institution).all()
        
        if not insts:
            return InstitutionStatsResponse(
                total_institutions=0, by_type={}, by_industry={}, by_size={},
                by_emirate={}, verified_count=0, total_employees=0, average_employee_count=0.0
            )
        
        by_type = {}
        by_industry = {}
        by_size = {}
        by_emirate = {}
        verified_count = 0
        total_employees = 0
        
        for inst in insts:
            by_type[inst.institution_type.value] = by_type.get(inst.institution_type.value, 0) + 1
            by_industry[inst.industry.value] = by_industry.get(inst.industry.value, 0) + 1
            by_size[inst.size.value] = by_size.get(inst.size.value, 0) + 1
            by_emirate[inst.emirate] = by_emirate.get(inst.emirate, 0) + 1
            if inst.is_verified:
                verified_count += 1
            total_employees += inst.employee_count
        
        return InstitutionStatsResponse(
            total_institutions=len(insts),
            by_type=by_type,
            by_industry=by_industry,
            by_size=by_size,
            by_emirate=by_emirate,
            verified_count=verified_count,
            total_employees=total_employees,
            average_employee_count=round(total_employees / len(insts), 1)
        )

