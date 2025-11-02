"""Applications Service Layer."""
from typing import Optional
from uuid import UUID
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.db.models.applications import Application
from app.models.applications import (
    ApplicationCreate, ApplicationUpdate, ApplicationResponse,
    ApplicationListResponse, ApplicationStatsResponse, ApplicationFilterParams,
    ApplicationStatus
)

class ApplicationsService:
    def __init__(self, db: Session):
        self.db = db
    
    async def create_application(self, user_id: UUID, app_data: ApplicationCreate) -> ApplicationResponse:
        application = Application(user_id=user_id, **app_data.dict())
        self.db.add(application)
        self.db.commit()
        self.db.refresh(application)
        return ApplicationResponse.from_orm(application)
    
    async def get_application(self, app_id: UUID, user_id: Optional[UUID] = None) -> Optional[ApplicationResponse]:
        query = self.db.query(Application).filter(Application.id == app_id)
        if user_id:
            query = query.filter(Application.user_id == user_id)
        app = query.first()
        return ApplicationResponse.from_orm(app) if app else None
    
    async def list_applications(self, user_id: UUID, filters: ApplicationFilterParams) -> ApplicationListResponse:
        query = self.db.query(Application).filter(Application.user_id == user_id)
        
        if filters.job_id:
            query = query.filter(Application.job_id == filters.job_id)
        if filters.status:
            query = query.filter(Application.status == filters.status)
        if filters.source:
            query = query.filter(Application.source == filters.source)
        if filters.min_match_score:
            query = query.filter(Application.match_score >= filters.min_match_score)
        if filters.submitted_after:
            query = query.filter(Application.submitted_at >= filters.submitted_after)
        if filters.submitted_before:
            query = query.filter(Application.submitted_at <= filters.submitted_before)
        
        total = query.count()
        offset = (filters.page - 1) * filters.page_size
        apps = query.order_by(Application.created_at.desc()).offset(offset).limit(filters.page_size).all()
        
        return ApplicationListResponse(
            total=total, items=[ApplicationResponse.from_orm(a) for a in apps],
            page=filters.page, page_size=filters.page_size
        )
    
    async def update_application(self, app_id: UUID, user_id: UUID, app_data: ApplicationUpdate) -> Optional[ApplicationResponse]:
        app = self.db.query(Application).filter(and_(Application.id == app_id, Application.user_id == user_id)).first()
        if not app:
            return None
        
        update_data = app_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(app, field, value)
        
        app.updated_at = datetime.utcnow()
        self.db.commit()
        self.db.refresh(app)
        return ApplicationResponse.from_orm(app)
    
    async def submit_application(self, app_id: UUID, user_id: UUID) -> Optional[ApplicationResponse]:
        app = self.db.query(Application).filter(and_(Application.id == app_id, Application.user_id == user_id)).first()
        if not app or app.status != ApplicationStatus.DRAFT:
            return None
        
        app.status = ApplicationStatus.SUBMITTED
        app.submitted_at = datetime.utcnow()
        app.updated_at = datetime.utcnow()
        self.db.commit()
        self.db.refresh(app)
        return ApplicationResponse.from_orm(app)
    
    async def delete_application(self, app_id: UUID, user_id: UUID) -> bool:
        app = self.db.query(Application).filter(and_(Application.id == app_id, Application.user_id == user_id)).first()
        if not app:
            return False
        self.db.delete(app)
        self.db.commit()
        return True
    
    async def get_stats(self, user_id: UUID) -> ApplicationStatsResponse:
        apps = self.db.query(Application).filter(Application.user_id == user_id).all()
        
        if not apps:
            return ApplicationStatsResponse(
                total_applications=0, by_status={}, by_source={}, average_match_score=0.0,
                submitted_count=0, under_review_count=0, shortlisted_count=0,
                interview_count=0, offer_count=0, accepted_count=0, rejected_count=0
            )
        
        by_status = {}
        by_source = {}
        total_match_score = 0.0
        match_count = 0
        
        for app in apps:
            by_status[app.status.value] = by_status.get(app.status.value, 0) + 1
            by_source[app.source.value] = by_source.get(app.source.value, 0) + 1
            if app.match_score:
                total_match_score += app.match_score
                match_count += 1
        
        return ApplicationStatsResponse(
            total_applications=len(apps), by_status=by_status, by_source=by_source,
            average_match_score=round(total_match_score / match_count, 2) if match_count > 0 else 0.0,
            submitted_count=by_status.get("submitted", 0),
            under_review_count=by_status.get("under_review", 0),
            shortlisted_count=by_status.get("shortlisted", 0),
            interview_count=by_status.get("interview_scheduled", 0) + by_status.get("interviewed", 0),
            offer_count=by_status.get("offer_extended", 0),
            accepted_count=by_status.get("accepted", 0),
            rejected_count=by_status.get("rejected", 0)
        )
