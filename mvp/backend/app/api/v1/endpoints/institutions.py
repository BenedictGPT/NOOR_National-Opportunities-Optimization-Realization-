"""Institutions API endpoints."""
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.postgres import get_db
from app.models.institutions import (
    InstitutionCreate, InstitutionUpdate, InstitutionResponse,
    InstitutionListResponse, InstitutionStatsResponse, InstitutionFilterParams
)
from app.services.institutions_service import InstitutionsService

router = APIRouter()

@router.post("/", response_model=InstitutionResponse, status_code=status.HTTP_201_CREATED)
async def create_institution(inst_data: InstitutionCreate, db: Session = Depends(get_db)):
    service = InstitutionsService(db)
    return await service.create_institution(inst_data)

@router.get("/", response_model=InstitutionListResponse)
async def list_institutions(
    institution_type: str = None, industry: str = None, size: str = None,
    emirate: str = None, is_verified: bool = None, name: str = None,
    min_employees: int = None, max_employees: int = None,
    page: int = 1, page_size: int = 10, db: Session = Depends(get_db)
):
    filters = InstitutionFilterParams(
        institution_type=institution_type, industry=industry, size=size,
        emirate=emirate, is_verified=is_verified, name=name,
        min_employees=min_employees, max_employees=max_employees,
        page=page, page_size=page_size
    )
    service = InstitutionsService(db)
    return await service.list_institutions(filters)

@router.get("/stats", response_model=InstitutionStatsResponse)
async def get_institution_stats(db: Session = Depends(get_db)):
    service = InstitutionsService(db)
    return await service.get_stats()

@router.get("/{inst_id}", response_model=InstitutionResponse)
async def get_institution(inst_id: UUID, db: Session = Depends(get_db)):
    service = InstitutionsService(db)
    inst = await service.get_institution(inst_id)
    if not inst:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Institution not found")
    return inst

@router.put("/{inst_id}", response_model=InstitutionResponse)
async def update_institution(inst_id: UUID, inst_data: InstitutionUpdate, db: Session = Depends(get_db)):
    service = InstitutionsService(db)
    inst = await service.update_institution(inst_id, inst_data)
    if not inst:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Institution not found")
    return inst

@router.delete("/{inst_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_institution(inst_id: UUID, db: Session = Depends(get_db)):
    service = InstitutionsService(db)
    deleted = await service.delete_institution(inst_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Institution not found")
    return None
