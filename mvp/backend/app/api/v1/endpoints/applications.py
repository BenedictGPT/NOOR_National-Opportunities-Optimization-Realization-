"""Applications API endpoints."""
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.postgres import get_db
from app.models.applications import (
    ApplicationCreate, ApplicationUpdate, ApplicationResponse,
    ApplicationListResponse, ApplicationStatsResponse, ApplicationFilterParams
)
from app.services.applications_service import ApplicationsService

router = APIRouter()

async def get_current_user_id() -> UUID:
    return UUID("123e4567-e89b-12d3-a456-426614174000")

@router.post("/", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
async def create_application(app_data: ApplicationCreate, db: Session = Depends(get_db), user_id: UUID = Depends(get_current_user_id)):
    service = ApplicationsService(db)
    return await service.create_application(user_id, app_data)

@router.get("/", response_model=ApplicationListResponse)
async def list_applications(
    job_id: UUID = None, status: str = None, source: str = None,
    min_match_score: float = None, page: int = 1, page_size: int = 10,
    db: Session = Depends(get_db), user_id: UUID = Depends(get_current_user_id)
):
    filters = ApplicationFilterParams(
        job_id=job_id, status=status, source=source,
        min_match_score=min_match_score, page=page, page_size=page_size
    )
    service = ApplicationsService(db)
    return await service.list_applications(user_id, filters)

@router.get("/stats", response_model=ApplicationStatsResponse)
async def get_application_stats(db: Session = Depends(get_db), user_id: UUID = Depends(get_current_user_id)):
    service = ApplicationsService(db)
    return await service.get_stats(user_id)

@router.get("/{app_id}", response_model=ApplicationResponse)
async def get_application(app_id: UUID, db: Session = Depends(get_db), user_id: UUID = Depends(get_current_user_id)):
    service = ApplicationsService(db)
    app = await service.get_application(app_id, user_id)
    if not app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
    return app

@router.put("/{app_id}", response_model=ApplicationResponse)
async def update_application(app_id: UUID, app_data: ApplicationUpdate, db: Session = Depends(get_db), user_id: UUID = Depends(get_current_user_id)):
    service = ApplicationsService(db)
    app = await service.update_application(app_id, user_id, app_data)
    if not app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
    return app

@router.post("/{app_id}/submit", response_model=ApplicationResponse)
async def submit_application(app_id: UUID, db: Session = Depends(get_db), user_id: UUID = Depends(get_current_user_id)):
    service = ApplicationsService(db)
    app = await service.submit_application(app_id, user_id)
    if not app:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot submit application")
    return app

@router.delete("/{app_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_application(app_id: UUID, db: Session = Depends(get_db), user_id: UUID = Depends(get_current_user_id)):
    service = ApplicationsService(db)
    deleted = await service.delete_application(app_id, user_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
    return None
