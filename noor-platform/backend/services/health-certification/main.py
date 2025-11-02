# Health Certification Service
# NOOR Platform v7.1
# Microservice for managing health certifications and medical compliance

from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict, Any
from datetime import datetime, date, timedelta
from enum import Enum
import uuid
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="NOOR Health Certification Service",
    description="Microservice for managing health certifications, medical exams, and compliance verification",
    version="7.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# =============================================================================
# ENUMS
# =============================================================================

class CertificateType(str, Enum):
    """Types of health certificates"""
    GENERAL_HEALTH = "general_health"  # Food handlers, public-facing roles
    OCCUPATIONAL_HEALTH = "occupational_health"  # Industrial, construction
    FOOD_HANDLER = "food_handler"  # Restaurant, catering
    HEALTHCARE_WORKER = "healthcare_worker"  # Medical professionals
    CHILDCARE_WORKER = "childcare_worker"  # Daycare, education
    FITNESS_TO_WORK = "fitness_to_work"  # Pre-employment medical
    DRIVING_MEDICAL = "driving_medical"  # Commercial drivers
    AVIATION_MEDICAL = "aviation_medical"  # Pilots, crew

class CertificateStatus(str, Enum):
    PENDING_EXAM = "pending_exam"
    EXAM_SCHEDULED = "exam_scheduled"
    EXAM_COMPLETED = "exam_completed"
    ACTIVE = "active"
    EXPIRING_SOON = "expiring_soon"  # < 30 days
    EXPIRED = "expired"
    SUSPENDED = "suspended"
    REVOKED = "revoked"

class ExamResult(str, Enum):
    FIT = "fit"
    FIT_WITH_RESTRICTIONS = "fit_with_restrictions"
    TEMPORARILY_UNFIT = "temporarily_unfit"
    PERMANENTLY_UNFIT = "permanently_unfit"
    REQUIRES_FOLLOW_UP = "requires_follow_up"

class RenewalStatus(str, Enum):
    NOT_REQUIRED = "not_required"
    UPCOMING = "upcoming"
    OVERDUE = "overdue"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

# =============================================================================
# PYDANTIC MODELS
# =============================================================================

class HealthCertificateBase(BaseModel):
    user_id: str = Field(..., description="UUID of the user")
    certificate_type: CertificateType
    issuing_authority: str = Field(..., description="Medical facility or authority")
    required_for_role: Optional[str] = Field(None, description="Role ID requiring this certificate")
    required_for_company: Optional[str] = Field(None, description="Company ID requiring this certificate")

class HealthCertificateCreate(HealthCertificateBase):
    exam_date: Optional[date] = None
    pass

class HealthCertificate(HealthCertificateBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    certificate_number: str = Field(..., description="Unique certificate number")
    status: CertificateStatus = CertificateStatus.PENDING_EXAM
    issue_date: Optional[date] = None
    expiry_date: Optional[date] = None
    exam_date: Optional[date] = None
    exam_result: Optional[ExamResult] = None
    exam_notes: Optional[str] = None
    restrictions: List[str] = []
    renewal_status: RenewalStatus = RenewalStatus.NOT_REQUIRED
    certificate_document_url: Optional[str] = None
    days_until_expiry: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True

class MedicalExamBase(BaseModel):
    user_id: str
    certificate_id: str
    exam_type: CertificateType
    medical_facility: str
    examining_physician: str
    physician_license_number: str

class MedicalExamSchedule(BaseModel):
    certificate_id: str
    exam_date: datetime
    medical_facility: str
    medical_facility_address: str
    contact_number: str
    special_instructions: Optional[str] = None
    reminder_sent: bool = False

class MedicalExamResult(MedicalExamBase):
    exam_result: ExamResult
    exam_date: date
    exam_findings: str
    restrictions: List[str] = []
    follow_up_required: bool = False
    follow_up_date: Optional[date] = None
    lab_results_url: Optional[str] = None
    xray_results_url: Optional[str] = None

class MedicalExam(MedicalExamResult):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)

class RenewalRequest(BaseModel):
    certificate_id: str
    requested_by: str
    renewal_reason: str = "Standard renewal"
    urgent: bool = False

class RenewalWorkflow(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    certificate_id: str
    original_certificate_id: str
    requested_at: datetime = Field(default_factory=datetime.utcnow)
    requested_by: str
    exam_scheduled: bool = False
    exam_date: Optional[date] = None
    exam_completed: bool = False
    new_certificate_issued: bool = False
    new_certificate_id: Optional[str] = None
    status: str = "pending"

class ComplianceCheck(BaseModel):
    user_id: str
    role_id: str
    company_id: str
    required_certificates: List[CertificateType]

class ComplianceStatus(BaseModel):
    user_id: str
    role_id: str
    company_id: str
    is_compliant: bool
    certificates_required: List[CertificateType]
    certificates_valid: List[Dict[str, Any]]
    certificates_missing: List[CertificateType]
    certificates_expiring: List[Dict[str, Any]]
    certificates_expired: List[Dict[str, Any]]
    compliance_percentage: float
    next_action_required: Optional[str] = None

class BulkComplianceRequest(BaseModel):
    company_id: str
    role_ids: Optional[List[str]] = None
    include_expiring: bool = True
    expiring_within_days: int = 30

class NotificationPreferences(BaseModel):
    user_id: str
    email_notifications: bool = True
    sms_notifications: bool = False
    push_notifications: bool = True
    notify_at_days_before_expiry: List[int] = [30, 14, 7, 1]

# =============================================================================
# AUTHENTICATION & AUTHORIZATION
# =============================================================================

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """Verify JWT token and extract user information"""
    token = credentials.credentials
    # TODO: Implement actual JWT verification
    return {
        "user_id": "mock-user-id",
        "roles": ["hr_manager"],
        "company_id": "mock-company-id"
    }

async def require_health_admin(user: Dict[str, Any] = Depends(verify_token)) -> Dict[str, Any]:
    """Require health admin role"""
    if "health_admin" not in user.get("roles", []) and "admin" not in user.get("roles", []):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Health admin role required"
        )
    return user

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def generate_certificate_number(certificate_type: CertificateType) -> str:
    """Generate unique certificate number"""
    prefix_map = {
        CertificateType.GENERAL_HEALTH: "GH",
        CertificateType.OCCUPATIONAL_HEALTH: "OH",
        CertificateType.FOOD_HANDLER: "FH",
        CertificateType.HEALTHCARE_WORKER: "HW",
        CertificateType.CHILDCARE_WORKER: "CW",
        CertificateType.FITNESS_TO_WORK: "FW",
        CertificateType.DRIVING_MEDICAL: "DM",
        CertificateType.AVIATION_MEDICAL: "AM"
    }

    prefix = prefix_map.get(certificate_type, "HC")
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    random_suffix = str(uuid.uuid4())[:8].upper()

    return f"{prefix}-{timestamp}-{random_suffix}"

def calculate_expiry_date(issue_date: date, certificate_type: CertificateType) -> date:
    """Calculate certificate expiry date based on type"""
    validity_months = {
        CertificateType.GENERAL_HEALTH: 12,
        CertificateType.OCCUPATIONAL_HEALTH: 12,
        CertificateType.FOOD_HANDLER: 12,
        CertificateType.HEALTHCARE_WORKER: 12,
        CertificateType.CHILDCARE_WORKER: 12,
        CertificateType.FITNESS_TO_WORK: 12,
        CertificateType.DRIVING_MEDICAL: 24,
        CertificateType.AVIATION_MEDICAL: 12
    }

    months = validity_months.get(certificate_type, 12)
    return issue_date + timedelta(days=months * 30)

def calculate_days_until_expiry(expiry_date: date) -> int:
    """Calculate days remaining until expiry"""
    delta = expiry_date - date.today()
    return delta.days

def determine_status(expiry_date: Optional[date], current_status: CertificateStatus) -> CertificateStatus:
    """Determine certificate status based on expiry date"""
    if not expiry_date:
        return current_status

    days_remaining = calculate_days_until_expiry(expiry_date)

    if days_remaining < 0:
        return CertificateStatus.EXPIRED
    elif days_remaining <= 30:
        return CertificateStatus.EXPIRING_SOON
    else:
        return CertificateStatus.ACTIVE

# =============================================================================
# API ENDPOINTS - CERTIFICATE MANAGEMENT
# =============================================================================

@app.post("/api/v1/certificates", response_model=HealthCertificate, status_code=status.HTTP_201_CREATED)
async def create_certificate(
    certificate: HealthCertificateCreate,
    user: Dict[str, Any] = Depends(require_health_admin)
):
    """
    Create a new health certificate record.
    Triggers medical exam scheduling workflow.
    """
    logger.info(f"Creating health certificate for user: {certificate.user_id}")

    # Generate certificate number
    cert_number = generate_certificate_number(certificate.certificate_type)

    # TODO: Save to PostgreSQL
    # TODO: Publish noor.health.certificate.created event to Kafka
    # TODO: Trigger exam scheduling workflow if exam_date provided

    new_cert = HealthCertificate(
        **certificate.dict(),
        certificate_number=cert_number
    )

    return new_cert

@app.get("/api/v1/certificates/{certificate_id}", response_model=HealthCertificate)
async def get_certificate(
    certificate_id: str,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Get health certificate by ID"""
    logger.info(f"Fetching certificate: {certificate_id}")

    # TODO: Fetch from PostgreSQL
    # TODO: Check user authorization (own certificate or health admin)

    raise HTTPException(status_code=404, detail="Certificate not found")

@app.get("/api/v1/certificates/user/{user_id}", response_model=List[HealthCertificate])
async def get_user_certificates(
    user_id: str,
    include_expired: bool = False,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Get all certificates for a user"""
    logger.info(f"Fetching certificates for user: {user_id}")

    # TODO: Fetch from PostgreSQL
    # TODO: Filter by expiry if include_expired=False
    # TODO: Update status based on current date

    return []

@app.put("/api/v1/certificates/{certificate_id}/issue")
async def issue_certificate(
    certificate_id: str,
    exam_result: MedicalExamResult,
    user: Dict[str, Any] = Depends(require_health_admin)
):
    """
    Issue certificate after successful medical exam.
    Sets status to ACTIVE and calculates expiry date.
    """
    logger.info(f"Issuing certificate: {certificate_id}")

    # TODO: Validate exam result
    # TODO: Update certificate in PostgreSQL:
    #   - Set status to ACTIVE
    #   - Set issue_date to today
    #   - Calculate and set expiry_date
    #   - Store exam_result and restrictions
    # TODO: Save medical exam record to MongoDB
    # TODO: Publish noor.health.certificate.issued event to Kafka
    # TODO: Send notification to user

    return {"status": "success", "message": "Certificate issued successfully"}

@app.put("/api/v1/certificates/{certificate_id}/suspend")
async def suspend_certificate(
    certificate_id: str,
    reason: str,
    user: Dict[str, Any] = Depends(require_health_admin)
):
    """Suspend a certificate (e.g., due to health concerns)"""
    logger.info(f"Suspending certificate: {certificate_id}")

    # TODO: Update status to SUSPENDED in PostgreSQL
    # TODO: Publish noor.health.certificate.suspended event
    # TODO: Send notification to user and employer

    return {"status": "success", "message": "Certificate suspended"}

@app.put("/api/v1/certificates/{certificate_id}/revoke")
async def revoke_certificate(
    certificate_id: str,
    reason: str,
    user: Dict[str, Any] = Depends(require_health_admin)
):
    """Revoke a certificate (permanent)"""
    logger.info(f"Revoking certificate: {certificate_id}")

    # TODO: Update status to REVOKED in PostgreSQL
    # TODO: Publish noor.health.certificate.revoked event
    # TODO: Send notification to user and employer
    # TODO: Trigger compliance check for affected roles

    return {"status": "success", "message": "Certificate revoked"}

# =============================================================================
# API ENDPOINTS - MEDICAL EXAM SCHEDULING
# =============================================================================

@app.post("/api/v1/exams/schedule", response_model=MedicalExamSchedule)
async def schedule_exam(
    schedule: MedicalExamSchedule,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Schedule a medical examination"""
    logger.info(f"Scheduling exam for certificate: {schedule.certificate_id}")

    # TODO: Save to MongoDB
    # TODO: Update certificate status to EXAM_SCHEDULED
    # TODO: Publish noor.health.exam.scheduled event
    # TODO: Send confirmation to user (email, SMS, push)
    # TODO: Schedule reminder notifications

    return schedule

@app.get("/api/v1/exams/upcoming/user/{user_id}", response_model=List[MedicalExamSchedule])
async def get_upcoming_exams(
    user_id: str,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Get upcoming medical exams for user"""
    logger.info(f"Fetching upcoming exams for user: {user_id}")

    # TODO: Fetch from MongoDB
    # TODO: Filter for future dates only

    return []

@app.put("/api/v1/exams/{schedule_id}/complete")
async def complete_exam(
    schedule_id: str,
    exam_result: MedicalExamResult,
    user: Dict[str, Any] = Depends(require_health_admin)
):
    """Mark exam as completed and record results"""
    logger.info(f"Completing exam: {schedule_id}")

    # TODO: Save exam result to MongoDB
    # TODO: Update certificate with exam results
    # TODO: If FIT, issue certificate
    # TODO: If FIT_WITH_RESTRICTIONS, issue with restrictions
    # TODO: If UNFIT, do not issue certificate
    # TODO: Publish noor.health.exam.completed event

    return {"status": "success", "message": "Exam results recorded"}

# =============================================================================
# API ENDPOINTS - RENEWAL WORKFLOW
# =============================================================================

@app.post("/api/v1/renewals", response_model=RenewalWorkflow, status_code=status.HTTP_201_CREATED)
async def initiate_renewal(
    renewal: RenewalRequest,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Initiate certificate renewal workflow"""
    logger.info(f"Initiating renewal for certificate: {renewal.certificate_id}")

    # TODO: Create new certificate record (pending)
    # TODO: Create renewal workflow in MongoDB
    # TODO: Send notification to schedule exam
    # TODO: Publish noor.health.renewal.initiated event

    raise HTTPException(status_code=501, detail="Not implemented")

@app.get("/api/v1/renewals/user/{user_id}", response_model=List[RenewalWorkflow])
async def get_user_renewals(
    user_id: str,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Get renewal workflows for user"""
    logger.info(f"Fetching renewals for user: {user_id}")

    # TODO: Fetch from MongoDB

    return []

# =============================================================================
# API ENDPOINTS - COMPLIANCE VERIFICATION
# =============================================================================

@app.post("/api/v1/compliance/check", response_model=ComplianceStatus)
async def check_compliance(
    check: ComplianceCheck,
    user: Dict[str, Any] = Depends(verify_token)
):
    """
    Check if user has all required health certificates for a role.
    Returns detailed compliance status.
    """
    logger.info(f"Checking compliance for user {check.user_id} in role {check.role_id}")

    # TODO: Fetch user's certificates from PostgreSQL
    # TODO: Fetch role requirements
    # TODO: Compare and generate compliance report
    # TODO: Identify missing, expiring, and expired certificates
    # TODO: Calculate compliance percentage

    # Mock response
    return ComplianceStatus(
        user_id=check.user_id,
        role_id=check.role_id,
        company_id=check.company_id,
        is_compliant=False,
        certificates_required=[CertificateType.GENERAL_HEALTH],
        certificates_valid=[],
        certificates_missing=[CertificateType.GENERAL_HEALTH],
        certificates_expiring=[],
        certificates_expired=[],
        compliance_percentage=0.0,
        next_action_required="Schedule general health examination"
    )

@app.post("/api/v1/compliance/bulk", response_model=List[ComplianceStatus])
async def bulk_compliance_check(
    request: BulkComplianceRequest,
    user: Dict[str, Any] = Depends(require_health_admin)
):
    """
    Bulk compliance check for a company.
    Useful for generating compliance reports.
    """
    logger.info(f"Bulk compliance check for company: {request.company_id}")

    # TODO: Fetch all employees for company
    # TODO: Run compliance check for each
    # TODO: Aggregate results
    # TODO: Generate report

    return []

@app.get("/api/v1/compliance/expiring")
async def get_expiring_certificates(
    days_threshold: int = 30,
    company_id: Optional[str] = None,
    user: Dict[str, Any] = Depends(require_health_admin)
):
    """
    Get all certificates expiring within threshold.
    Used for proactive renewal management.
    """
    logger.info(f"Fetching certificates expiring within {days_threshold} days")

    # TODO: Query PostgreSQL for certificates with expiry_date within threshold
    # TODO: Filter by company if provided
    # TODO: Group by user and certificate type

    return []

# =============================================================================
# API ENDPOINTS - NOTIFICATIONS
# =============================================================================

@app.post("/api/v1/notifications/preferences")
async def set_notification_preferences(
    preferences: NotificationPreferences,
    user: Dict[str, Any] = Depends(verify_token)
):
    """Set notification preferences for certificate expiry alerts"""
    logger.info(f"Setting notification preferences for user: {preferences.user_id}")

    # TODO: Save to MongoDB or Redis
    # TODO: Update notification scheduler

    return {"status": "success", "message": "Preferences updated"}

@app.post("/api/v1/notifications/send-reminders")
async def send_expiry_reminders(
    user: Dict[str, Any] = Depends(require_health_admin)
):
    """
    Manual trigger to send expiry reminders.
    Normally runs as scheduled job.
    """
    logger.info("Sending certificate expiry reminders")

    # TODO: Query for certificates expiring in 30, 14, 7, 1 days
    # TODO: Check user notification preferences
    # TODO: Send notifications via appropriate channels
    # TODO: Publish noor.notifications.email/sms/push.requested events

    return {"status": "success", "message": "Reminders sent"}

# =============================================================================
# API ENDPOINTS - REPORTING & ANALYTICS
# =============================================================================

@app.get("/api/v1/reports/certificate-statistics")
async def get_certificate_statistics(
    company_id: Optional[str] = None,
    user: Dict[str, Any] = Depends(require_health_admin)
):
    """Get certificate statistics and analytics"""
    logger.info("Generating certificate statistics")

    # TODO: Aggregate statistics from PostgreSQL:
    #   - Total certificates by type
    #   - Active vs expired count
    #   - Compliance rate by company
    #   - Renewal rate
    #   - Average time to renewal

    return {
        "total_certificates": 0,
        "active_certificates": 0,
        "expiring_soon": 0,
        "expired": 0,
        "compliance_rate": 0.0,
        "by_type": {}
    }

@app.get("/api/v1/reports/compliance-report")
async def generate_compliance_report(
    company_id: str,
    format: str = "json",  # json, csv, pdf
    user: Dict[str, Any] = Depends(require_health_admin)
):
    """Generate comprehensive compliance report for a company"""
    logger.info(f"Generating compliance report for company: {company_id}")

    # TODO: Generate detailed compliance report
    # TODO: Export in requested format

    return {"status": "success", "report_url": "https://storage.noor.gov.ae/reports/..."}

# =============================================================================
# HEALTH CHECK
# =============================================================================

@app.get("/health")
async def health_check():
    """Health check endpoint for Kubernetes"""
    return {
        "status": "healthy",
        "service": "health-certification",
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
    logger.info("Health Certification Service starting up...")
    # TODO: Initialize PostgreSQL connection pool
    # TODO: Initialize MongoDB connection
    # TODO: Initialize Kafka producer
    # TODO: Initialize Redis cache
    # TODO: Start background jobs (expiry checker)

@app.on_event("shutdown")
async def shutdown_event():
    """Clean up connections on shutdown"""
    logger.info("Health Certification Service shutting down...")
    # TODO: Close database connections
    # TODO: Close Kafka producer
    # TODO: Close Redis connection
    # TODO: Stop background jobs

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
