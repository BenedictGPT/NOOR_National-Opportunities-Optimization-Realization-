"""
NOOR Platform - API v1 Router
"""

from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    users,
    skills,
    education,
    work_experience,
    certifications,
    assessments,
    health,
    institutions,
    employees,
    jobs,
    applications,
    ai_agents,
    ai_features,
    eight_faculty,
    gamification,
    learning
)

api_router = APIRouter()

# Authentication
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"]
)

# Layer 1: Individual (Skills Passport)
api_router.include_router(
    users.router,
    prefix="/users",
    tags=["Users"]
)

api_router.include_router(
    skills.router,
    prefix="/skills",
    tags=["Skills"]
)

api_router.include_router(
    education.router,
    prefix="/education",
    tags=["Education"]
)

api_router.include_router(
    work_experience.router,
    prefix="/work-experience",
    tags=["Work Experience"]
)

api_router.include_router(
    certifications.router,
    prefix="/certifications",
    tags=["Certifications"]
)

api_router.include_router(
    assessments.router,
    prefix="/assessments",
    tags=["Assessments"]
)

api_router.include_router(
    health.router,
    prefix="/health-records",
    tags=["Health Records"]
)

# Layer 2: Institutional (HCM Suite)
api_router.include_router(
    institutions.router,
    prefix="/institutions",
    tags=["Institutions"]
)

api_router.include_router(
    employees.router,
    prefix="/employees",
    tags=["Employees"]
)

# Layer 3: Federal (Opportunities Board)
api_router.include_router(
    jobs.router,
    prefix="/jobs",
    tags=["Job Postings"]
)

api_router.include_router(
    applications.router,
    prefix="/applications",
    tags=["Job Applications"]
)

# AI Agents
api_router.include_router(
    ai_agents.router,
    prefix="/agents",
    tags=["AI Agents"]
)

# AI Features
api_router.include_router(
    ai_features.router,
    tags=["AI Features"]
)

# Eight-Faculty Model
api_router.include_router(
    eight_faculty.router,
    prefix="/eight-faculty",
    tags=["Eight-Faculty Model"]
)

# Gamification
api_router.include_router(
    gamification.router,
    prefix="/gamification",
    tags=["Gamification"]
)

# Learning Center
api_router.include_router(
    learning.router,
    prefix="/learning",
    tags=["Learning Center"]
)

