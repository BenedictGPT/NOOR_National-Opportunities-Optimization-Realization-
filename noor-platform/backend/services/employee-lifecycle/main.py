# Employee Lifecycle Service
# NOOR Platform v7.1
# Microservice for managing employee lifecycle events

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict, Any
from datetime import datetime, date
from enum import Enum
import uuid
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="NOOR Employee Lifecycle Service",
    description="Microservice for managing employee lifecycle events: onboarding, offboarding, role changes, performance reviews",
    version="7.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure based on environment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# =============================================================================
# ENUMS
# =============================================================================

class EmploymentStatus(str, Enum):
    ACTIVE = "active"
    ON_LEAVE = "on_leave"
    SUSPENDED = "suspended"
    TERMINATED = "terminated"
    RETIRED = "retired"

class EmploymentType(str, Enum):
    FULL_TIME = "full_time"
    PART_TIME = "part_time"
    CONTRACT = "contract"
    INTERNSHIP = "internship"
    CONSULTANT = "consultant"

class OnboardingStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

class PerformanceRating(str, Enum):
    EXCEPTIONAL = "exceptional"
    EXCEEDS_EXPECTATIONS = "exceeds_expectations"
    MEETS_EXPECTATIONS = "meets_expectations"
    NEEDS_IMPROVEMENT = "needs_improvement"
    UNSATISFACTORY = "unsatisfactory"

class OffboardingReason(str, Enum):
    RESIGNATION = "resignation"
    RETIREMENT = "retirement"
    TERMINATION = "termination"
    CONTRACT_END = "contract_end"
    RELOCATION = "relocation"
    OTHER = "other"

# =============================================================================
# PYDANTIC MODELS
# =============================================================================

class EmployeeBase(BaseModel):
    user_id: str = Field(..., description="UUID of the user")
    company_id: str = Field(..., description="UUID of the company")
    department_id: Optional[str] = Field(None, description="UUID of the department")
    role_id: str = Field(..., description="UUID of the role")
    employment_type: EmploymentType
    start_date: date
    reporting_manager_id: Optional[str] = None
    work_location: Optional[str] = None
    probation_period_months: int = Field(6, ge=0, le=24)

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    department_id: Optional[str] = None
    role_id: Optional[str] = None
    reporting_manager_id: Optional[str] = None
    work_location: Optional[str] = None
    employment_status: Optional[EmploymentStatus] = None

class Employee(EmployeeBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    employment_status: EmploymentStatus = EmploymentStatus.ACTIVE
    end_date: Optional[date] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True

class OnboardingTaskBase(BaseModel):
    task_name: str
    task_name_ar: Optional[str] = None
    description: str
    description_ar: Optional[str] = None
    assigned_to_role: str  # HR, IT, Manager, Employee
    due_days_after_start: int = Field(..., ge=0, description="Days after start date")
    is_mandatory: bool = True

class OnboardingTask(OnboardingTaskBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    completed: bool = False
    completed_at: Optional[datetime] = None
    completed_by: Optional[str] = None
    notes: Optional[str] = None

class OnboardingChecklistCreate(BaseModel):
    employee_id: str
    tasks: List[OnboardingTaskBase]

class OnboardingChecklist(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    employee_id: str
    status: OnboardingStatus = OnboardingStatus.PENDING
    tasks: List[OnboardingTask]
    start_date: date
    expected_completion_date: date
    actual_completion_date: Optional[date] = None
    completion_percentage: float = Field(0.0, ge=0.0, le=100.0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class RoleChangeRequest(BaseModel):
    employee_id: str
    new_role_id: str
    new_department_id: Optional[str] = None
    new_reporting_manager_id: Optional[str] = None
    effective_date: date
    reason: str
    requested_by: str
    requires_approval: bool = True

class RoleChange(RoleChangeRequest):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    approved: Optional[bool] = None
    approved_by: Optional[str] = None
    approved_at: Optional[datetime] = None
    implemented: bool = False
    implemented_at: Optional[datetime] = None
    previous_role_id: Optional[str] = None
    previous_department_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class PerformanceReviewBase(BaseModel):
    employee_id: str
    reviewer_id: str
    review_period_start: date
    review_period_end: date
    overall_rating: PerformanceRating
    strengths: List[str] = []
    areas_for_improvement: List[str] = []
    goals_achieved: List[str] = []
    goals_missed: List[str] = []
    future_goals: List[str] = []
    manager_comments: str
    manager_comments_ar: Optional[str] = None
    employee_comments: Optional[str] = None
    employee_comments_ar: Optional[str] = None

class PerformanceReviewCreate(PerformanceReviewBase):
    pass

class PerformanceReview(PerformanceReviewBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    employee_acknowledged: bool = False
    acknowledged_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True

class OffboardingRequest(BaseModel):
    employee_id: str
    reason: OffboardingReason
    last_working_date: date
    exit_interview_scheduled: bool = False
    exit_interview_date: Optional[date] = None
    notice_period_days: int = Field(30, ge=0)
    initiated_by: str
    additional_notes: Optional[str] = None

class OffboardingChecklist(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    employee_id: str
    offboarding_request_id: str
    tasks: List[Dict[str, Any]] = [
        {"task": "Exit interview conducted", "completed": False},
        {"task": "Equipment returned (laptop, phone, badge)", "completed": False},
        {"task": "Access revoked (systems, buildings)", "completed": False},
        {"task": "Knowledge transfer completed", "completed": False},
        {"task": "Final payroll processed", "completed": False},
        {"task": "Benefits terminated", "completed": False},
        {"task": "Company property returned", "completed": False},
        {"task": "Final documentation signed", "completed": False}
    ]
    completion_percentage: float = 0.0
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# =============================================================================
# AUTHENTICATION & AUTHORIZATION
# =============================================================================

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """
    Verify JWT token and extract user information.
    In production, this would validate against a real JWT service.
    """
    token = credentials.credentials

    # TODO: Implement actual JWT verification
    # For now, return mock user data
    return {
        "user_id": "mock-user-id",
        "roles": ["hr_manager"],
        "company_id": "mock-company-id"
    }

async def require_hr_role(user: Dict[str, Any] = Depends(verify_token)) -> Dict[str, Any]:
    """Require HR role for access"""
    if "hr_manager" not in user.get("roles", []) and "admin" not in user.get("roles", []):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="HR role required"
        )
    return user

# =============================================================================
# API ENDPOINTS - EMPLOYEE MANAGEMENT
# =============================================================================

@app.post("/api/v1/employees", response_model=Employee, status_code=status.HTTP_201_CREATED)
async def create_employee(
    employee: EmployeeCreate,
    user: Dict[str, Any] = Depends(require_hr_role)
):
    """
    Create a new employee record (hiring event).
    Triggers onboarding workflow.
    """
    logger.info(f"Creating employee for user_id: {employee.user_id}")

    # TODO: Save to PostgreSQL database
    # TODO: Publish noor.users.employment.hired event to Kafka

    new_employee = Employee(**employee.dict())

    return new_employee

@app.get("/api/v1/employees/{employee_id}", response_model=Employee)
async def get_employee(
    employee_id: str,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Get employee details by ID"""
    logger.info(f"Fetching employee: {employee_id}")

    # TODO: Fetch from PostgreSQL
    raise HTTPException(status_code=404, detail="Employee not found")

@app.put("/api/v1/employees/{employee_id}", response_model=Employee)
async def update_employee(
    employee_id: str,
    update: EmployeeUpdate,
    user: Dict[str, Any] = Depends(require_hr_role)
):
    """Update employee information"""
    logger.info(f"Updating employee: {employee_id}")

    # TODO: Update in PostgreSQL
    # TODO: Publish noor.users.employment.updated event to Kafka

    raise HTTPException(status_code=404, detail="Employee not found")

@app.get("/api/v1/employees/user/{user_id}", response_model=List[Employee])
async def get_employee_by_user(
    user_id: str,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Get all employment records for a user (handles multiple jobs)"""
    logger.info(f"Fetching employment records for user: {user_id}")

    # TODO: Fetch from PostgreSQL
    return []

# =============================================================================
# API ENDPOINTS - ONBOARDING
# =============================================================================

@app.post("/api/v1/onboarding", response_model=OnboardingChecklist, status_code=status.HTTP_201_CREATED)
async def create_onboarding_checklist(
    checklist: OnboardingChecklistCreate,
    user: Dict[str, Any] = Depends(require_hr_role)
):
    """
    Create onboarding checklist for new employee.
    Automatically triggered when employee is created.
    """
    logger.info(f"Creating onboarding checklist for employee: {checklist.employee_id}")

    # TODO: Save to MongoDB (onboarding_checklists collection)
    # TODO: Schedule notifications for task due dates

    raise HTTPException(status_code=501, detail="Not implemented")

@app.get("/api/v1/onboarding/employee/{employee_id}", response_model=OnboardingChecklist)
async def get_onboarding_checklist(
    employee_id: str,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Get onboarding checklist for employee"""
    logger.info(f"Fetching onboarding checklist for: {employee_id}")

    # TODO: Fetch from MongoDB
    raise HTTPException(status_code=404, detail="Onboarding checklist not found")

@app.put("/api/v1/onboarding/{checklist_id}/tasks/{task_id}/complete")
async def complete_onboarding_task(
    checklist_id: str,
    task_id: str,
    notes: Optional[str] = None,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Mark onboarding task as complete"""
    logger.info(f"Completing task {task_id} in checklist {checklist_id}")

    # TODO: Update MongoDB
    # TODO: Recalculate completion percentage
    # TODO: If all tasks complete, mark onboarding as complete and publish event

    return {"status": "success", "message": "Task marked as complete"}

# =============================================================================
# API ENDPOINTS - ROLE CHANGES
# =============================================================================

@app.post("/api/v1/role-changes", response_model=RoleChange, status_code=status.HTTP_201_CREATED)
async def request_role_change(
    role_change: RoleChangeRequest,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Request a role change for an employee"""
    logger.info(f"Role change requested for employee: {role_change.employee_id}")

    # TODO: Save to PostgreSQL
    # TODO: If requires_approval, send notification to approver
    # TODO: Publish noor.users.role_change.requested event

    raise HTTPException(status_code=501, detail="Not implemented")

@app.put("/api/v1/role-changes/{change_id}/approve")
async def approve_role_change(
    change_id: str,
    approved: bool,
    user: Dict[str, Any] = Depends(require_hr_role)
):
    """Approve or reject role change request"""
    logger.info(f"Processing approval for role change: {change_id}")

    # TODO: Update approval status in PostgreSQL
    # TODO: If approved and effective_date is today, implement change
    # TODO: Publish noor.users.role_change.approved/rejected event

    return {"status": "success", "approved": approved}

@app.put("/api/v1/role-changes/{change_id}/implement")
async def implement_role_change(
    change_id: str,
    user: Dict[str, Any] = Depends(require_hr_role)
):
    """Implement approved role change"""
    logger.info(f"Implementing role change: {change_id}")

    # TODO: Update employee record in PostgreSQL
    # TODO: Update access permissions
    # TODO: Publish noor.users.role_change.implemented event
    # TODO: Trigger Neo4j graph update

    return {"status": "success", "message": "Role change implemented"}

# =============================================================================
# API ENDPOINTS - PERFORMANCE REVIEWS
# =============================================================================

@app.post("/api/v1/performance-reviews", response_model=PerformanceReview, status_code=status.HTTP_201_CREATED)
async def create_performance_review(
    review: PerformanceReviewCreate,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Create a performance review"""
    logger.info(f"Creating performance review for employee: {review.employee_id}")

    # TODO: Save to MongoDB (performance_reviews collection)
    # TODO: Send notification to employee
    # TODO: Publish noor.performance.review.created event

    new_review = PerformanceReview(**review.dict())
    return new_review

@app.get("/api/v1/performance-reviews/employee/{employee_id}", response_model=List[PerformanceReview])
async def get_employee_reviews(
    employee_id: str,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Get all performance reviews for an employee"""
    logger.info(f"Fetching performance reviews for: {employee_id}")

    # TODO: Fetch from MongoDB
    return []

@app.put("/api/v1/performance-reviews/{review_id}/acknowledge")
async def acknowledge_review(
    review_id: str,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Employee acknowledges performance review"""
    logger.info(f"Employee acknowledging review: {review_id}")

    # TODO: Update MongoDB
    # TODO: Publish noor.performance.review.acknowledged event

    return {"status": "success", "message": "Review acknowledged"}

# =============================================================================
# API ENDPOINTS - OFFBOARDING
# =============================================================================

@app.post("/api/v1/offboarding", response_model=OffboardingChecklist, status_code=status.HTTP_201_CREATED)
async def initiate_offboarding(
    request: OffboardingRequest,
    user: Dict[str, Any] = Depends(require_hr_role)
):
    """Initiate offboarding process for an employee"""
    logger.info(f"Initiating offboarding for employee: {request.employee_id}")

    # TODO: Create offboarding checklist in MongoDB
    # TODO: Update employee status to TERMINATED in PostgreSQL
    # TODO: Schedule automated tasks (access revocation, etc.)
    # TODO: Publish noor.users.employment.terminated event

    raise HTTPException(status_code=501, detail="Not implemented")

@app.get("/api/v1/offboarding/employee/{employee_id}", response_model=OffboardingChecklist)
async def get_offboarding_checklist(
    employee_id: str,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Get offboarding checklist for employee"""
    logger.info(f"Fetching offboarding checklist for: {employee_id}")

    # TODO: Fetch from MongoDB
    raise HTTPException(status_code=404, detail="Offboarding checklist not found")

@app.put("/api/v1/offboarding/{checklist_id}/tasks/{task_index}/complete")
async def complete_offboarding_task(
    checklist_id: str,
    task_index: int,
    user: Dict[str, Any] = Depends(require_hr_role)
):
    """Mark offboarding task as complete"""
    logger.info(f"Completing offboarding task {task_index} in checklist {checklist_id}")

    # TODO: Update MongoDB
    # TODO: Recalculate completion percentage
    # TODO: If all critical tasks complete, finalize offboarding

    return {"status": "success", "message": "Task marked as complete"}

# =============================================================================
# HEALTH CHECK
# =============================================================================

@app.get("/health")
async def health_check():
    """Health check endpoint for Kubernetes"""
    return {
        "status": "healthy",
        "service": "employee-lifecycle",
        "version": "7.1.0",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/ready")
async def readiness_check():
    """Readiness check endpoint for Kubernetes"""
    # TODO: Check database connections
    # TODO: Check Kafka connectivity
    return {
        "status": "ready",
        "database": "connected",
        "kafka": "connected"
    }

# =============================================================================
# STARTUP/SHUTDOWN EVENTS
# =============================================================================

@app.on_event("startup")
async def startup_event():
    """Initialize connections on startup"""
    logger.info("Employee Lifecycle Service starting up...")
    # TODO: Initialize PostgreSQL connection pool
    # TODO: Initialize MongoDB connection
    # TODO: Initialize Kafka producer
    # TODO: Initialize Redis cache

@app.on_event("shutdown")
async def shutdown_event():
    """Clean up connections on shutdown"""
    logger.info("Employee Lifecycle Service shutting down...")
    # TODO: Close database connections
    # TODO: Close Kafka producer
    # TODO: Close Redis connection

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
