# NOOR Platform - Backend Services

This directory contains the 6 core deterministic microservices that handle all source-of-truth database operations.

## Services

### 1. Employee Lifecycle Service
- **Purpose:** Manage employee onboarding, leave requests, relocations, and offboarding
- **Port:** 8001
- **Database:** PostgreSQL

### 2. Payroll & Pensions Service
- **Purpose:** Process payroll, manage pension contributions, integrate with GPSSA/ADPF
- **Port:** 8002
- **Database:** PostgreSQL
- **Security:** High-sensitivity pool

### 3. Learning & Assessment Service
- **Purpose:** Manage learning pathways, assessments, competency verification
- **Port:** 8003
- **Databases:** PostgreSQL, Neo4j, Vector DB

### 4. Emiratization Compliance Service
- **Purpose:** Track emiratization quotas, calculate EQI scores, ensure compliance
- **Port:** 8004
- **Database:** PostgreSQL

### 5. Health Certification Service
- **Purpose:** Verify medical certificates, manage health profiles (L1 Personal Zone)
- **Port:** 8005
- **Database:** PostgreSQL
- **Security:** High-sensitivity pool, user-scoped encryption

### 6. Biometric Identity Service
- **Purpose:** Enroll and verify facial/voice biometrics for fraud prevention
- **Port:** 8006
- **Databases:** Vector DB (embeddings only, no raw biometric data)
- **Security:** High-sensitivity pool, local processing

## Architecture Principles

**CRITICAL:** Only these deterministic services write to canonical databases. AI agents propose, validate, and recommend, but do NOT directly write to source-of-truth systems.

## Common Dependencies

All services use:
- FastAPI for API endpoints
- Pydantic for data validation
- SQLAlchemy for database ORM
- Kafka for event streaming
- OpenTelemetry for observability

## Development

Each service is independently deployable and follows the same structure:
```
service-name/
├── main.py           # FastAPI application
├── models.py         # Pydantic models
├── database.py       # Database connection
├── routes/           # API routes
├── services/         # Business logic
├── schemas/          # Request/response schemas
└── tests/            # Service tests
```

## Testing

```bash
cd service-name
pytest
```

## Deployment

Each service is containerized and deployed to Kubernetes with:
- Horizontal Pod Autoscaling (3-10 replicas)
- Health checks (liveness + readiness probes)
- Network policies for isolation
- Service mesh integration (Istio)
