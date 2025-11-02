# Employee Lifecycle Service

**NOOR Platform v7.1** - Microservice for managing employee lifecycle events

## Overview

The Employee Lifecycle Service is a FastAPI-based microservice that handles all employee lifecycle management including:

- **Onboarding**: Automated checklists, task tracking, new hire workflows
- **Employment Management**: Role changes, transfers, promotions, demotions
- **Performance Reviews**: Creation, tracking, acknowledgment
- **Offboarding**: Exit interviews, equipment returns, access revocation
- **Event Publishing**: Publishes domain events to Kafka for event-driven architecture

## Architecture

### Technology Stack

- **Framework**: FastAPI 0.104 (Python 3.11)
- **Databases**:
  - PostgreSQL (employment records, role changes)
  - MongoDB (onboarding checklists, performance reviews)
  - Redis (caching, rate limiting)
- **Messaging**: Kafka with Avro schemas
- **Authentication**: JWT Bearer tokens
- **Deployment**: Kubernetes (AKS) with HPA

### API Endpoints

#### Employee Management

```
POST   /api/v1/employees              Create employee (hiring)
GET    /api/v1/employees/{id}         Get employee details
PUT    /api/v1/employees/{id}         Update employee
GET    /api/v1/employees/user/{user_id}  Get all employment records
```

#### Onboarding

```
POST   /api/v1/onboarding                        Create onboarding checklist
GET    /api/v1/onboarding/employee/{employee_id} Get onboarding status
PUT    /api/v1/onboarding/{id}/tasks/{task_id}/complete  Mark task complete
```

#### Role Changes

```
POST   /api/v1/role-changes           Request role change
PUT    /api/v1/role-changes/{id}/approve    Approve/reject
PUT    /api/v1/role-changes/{id}/implement  Implement change
```

#### Performance Reviews

```
POST   /api/v1/performance-reviews                Create review
GET    /api/v1/performance-reviews/employee/{id}  Get employee reviews
PUT    /api/v1/performance-reviews/{id}/acknowledge  Employee acknowledges
```

#### Offboarding

```
POST   /api/v1/offboarding                       Initiate offboarding
GET    /api/v1/offboarding/employee/{id}         Get offboarding status
PUT    /api/v1/offboarding/{id}/tasks/{idx}/complete  Mark task complete
```

#### Health & Monitoring

```
GET    /health                Health check (liveness probe)
GET    /ready                 Readiness check
GET    /api/docs              OpenAPI documentation
GET    /metrics               Prometheus metrics
```

## Data Models

### Employee

```python
{
  "id": "uuid",
  "user_id": "uuid",
  "company_id": "uuid",
  "department_id": "uuid",
  "role_id": "uuid",
  "employment_type": "full_time|part_time|contract|internship",
  "employment_status": "active|on_leave|suspended|terminated",
  "start_date": "2024-01-15",
  "end_date": null,
  "reporting_manager_id": "uuid",
  "work_location": "Dubai",
  "probation_period_months": 6
}
```

### Onboarding Checklist

```python
{
  "id": "uuid",
  "employee_id": "uuid",
  "status": "pending|in_progress|completed|failed",
  "tasks": [
    {
      "task_name": "Complete I9 form",
      "assigned_to_role": "HR",
      "due_days_after_start": 1,
      "is_mandatory": true,
      "completed": false
    }
  ],
  "completion_percentage": 45.5,
  "start_date": "2024-01-15",
  "expected_completion_date": "2024-02-15"
}
```

### Performance Review

```python
{
  "id": "uuid",
  "employee_id": "uuid",
  "reviewer_id": "uuid",
  "review_period_start": "2024-01-01",
  "review_period_end": "2024-06-30",
  "overall_rating": "exceeds_expectations",
  "strengths": ["Leadership", "Technical expertise"],
  "areas_for_improvement": ["Time management"],
  "goals_achieved": ["Completed project X"],
  "future_goals": ["Lead team Y"],
  "manager_comments": "...",
  "employee_acknowledged": false
}
```

## Events Published

### Employment Events

**Topic**: `noor.users.employment.hired`
```json
{
  "event_type": "HIRED",
  "employee_id": "uuid",
  "user_id": "uuid",
  "company_id": "uuid",
  "role_id": "uuid",
  "start_date": "2024-01-15",
  "employment_type": "full_time"
}
```

**Topic**: `noor.users.employment.terminated`
```json
{
  "event_type": "TERMINATED",
  "employee_id": "uuid",
  "user_id": "uuid",
  "termination_date": "2024-12-31",
  "reason": "resignation"
}
```

### Onboarding Events

**Topic**: `noor.onboarding.started`
**Topic**: `noor.onboarding.completed`

### Performance Events

**Topic**: `noor.performance.review.created`
**Topic**: `noor.performance.review.acknowledged`

## Configuration

### Environment Variables

Required:
- `POSTGRES_PASSWORD`: PostgreSQL password
- `MONGODB_PASSWORD`: MongoDB password
- `JWT_SECRET_KEY`: JWT secret (min 32 chars)

Optional:
- `ENVIRONMENT`: development|staging|production (default: development)
- `LOG_LEVEL`: DEBUG|INFO|WARNING|ERROR (default: INFO)
- `POSTGRES_HOST`: PostgreSQL host (default: postgresql.noor-data.svc.cluster.local)
- `MONGODB_HOST`: MongoDB host
- `REDIS_HOST`: Redis host
- `KAFKA_BOOTSTRAP_SERVERS`: Kafka brokers

See `config.py` for full list.

### Example .env File

```bash
# Database Credentials
POSTGRES_PASSWORD=your_secure_password
MONGODB_PASSWORD=your_secure_password
REDIS_PASSWORD=your_secure_password

# JWT
JWT_SECRET_KEY=your_jwt_secret_minimum_32_characters_long

# Environment
ENVIRONMENT=production
LOG_LEVEL=INFO

# CORS
CORS_ORIGINS=["https://noor.gov.ae"]
```

## Development

### Local Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
uvicorn main:app --reload --port 8001

# Run tests
pytest --cov=. --cov-report=html

# Code formatting
black .
flake8 .
mypy .
```

### Docker Build

```bash
# Build image
docker build -t employee-lifecycle:7.1.0 .

# Run container
docker run -p 8001:8001 \
  -e POSTGRES_PASSWORD=secret \
  -e MONGODB_PASSWORD=secret \
  -e JWT_SECRET_KEY=your_secret_key_here \
  employee-lifecycle:7.1.0
```

## Deployment

### Kubernetes Deployment

```bash
# Create namespace
kubectl create namespace noor-services

# Create secrets
kubectl create secret generic employee-lifecycle-secrets \
  --from-literal=POSTGRES_PASSWORD=your_password \
  --from-literal=MONGODB_PASSWORD=your_password \
  --from-literal=JWT_SECRET_KEY=your_jwt_secret \
  -n noor-services

# Deploy
kubectl apply -f k8s-deployment.yaml

# Check status
kubectl get pods -n noor-services -l app=employee-lifecycle
kubectl logs -n noor-services -l app=employee-lifecycle --tail=100

# Port forward for testing
kubectl port-forward -n noor-services svc/employee-lifecycle 8001:80
```

### Scaling

The service uses Horizontal Pod Autoscaler (HPA):
- **Min replicas**: 3
- **Max replicas**: 10
- **CPU target**: 70%
- **Memory target**: 80%

## Monitoring

### Metrics

Prometheus metrics exposed at `/metrics`:
- Request count and latency
- Database connection pool stats
- Kafka producer metrics
- Custom business metrics

### Logging

Structured JSON logging with the following fields:
- `timestamp`: ISO 8601
- `level`: DEBUG|INFO|WARNING|ERROR
- `service`: employee-lifecycle
- `correlation_id`: Request tracking
- `user_id`: Authenticated user
- `message`: Log message

### Health Checks

- **Liveness**: `/health` - Basic health status
- **Readiness**: `/ready` - Database connectivity check

## Security

### Authentication

- JWT Bearer token required for all endpoints (except /health)
- Token validated against central auth service
- User roles extracted from token claims

### Authorization

Role-based access control:
- **HR Manager**: Full access to all endpoints
- **Manager**: Access to own team's data
- **Employee**: Read-only access to own data

### Data Security

- All sensitive data encrypted at rest (PostgreSQL L2 zone)
- TLS 1.3 for data in transit
- Secrets managed via Kubernetes secrets
- No PII in logs

### Network Security

Network policies enforce:
- Ingress only from API Gateway
- Egress only to databases and Kafka
- DNS resolution allowed
- All other traffic denied

## Database Schema

### PostgreSQL Tables

- `employees`: Employment records
- `role_changes`: Role change requests and history
- `offboarding_requests`: Termination requests

### MongoDB Collections

- `onboarding_checklists`: Onboarding task tracking
- `performance_reviews`: Performance review documents
- `offboarding_checklists`: Offboarding task tracking

## API Examples

### Create Employee (Hiring)

```bash
curl -X POST "http://localhost:8001/api/v1/employees" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "company_id": "660e8400-e29b-41d4-a716-446655440000",
    "role_id": "770e8400-e29b-41d4-a716-446655440000",
    "employment_type": "full_time",
    "start_date": "2024-02-01",
    "reporting_manager_id": "880e8400-e29b-41d4-a716-446655440000",
    "work_location": "Dubai",
    "probation_period_months": 6
  }'
```

### Create Performance Review

```bash
curl -X POST "http://localhost:8001/api/v1/performance-reviews" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "550e8400-e29b-41d4-a716-446655440000",
    "reviewer_id": "880e8400-e29b-41d4-a716-446655440000",
    "review_period_start": "2024-01-01",
    "review_period_end": "2024-06-30",
    "overall_rating": "exceeds_expectations",
    "strengths": ["Technical leadership", "Problem solving"],
    "areas_for_improvement": ["Delegation"],
    "goals_achieved": ["Led migration to microservices"],
    "future_goals": ["Mentor 2 junior developers"],
    "manager_comments": "Excellent performance this period."
  }'
```

## Troubleshooting

### Common Issues

**Database connection errors**:
```bash
# Check database connectivity from pod
kubectl exec -it -n noor-services <pod-name> -- ping postgresql.noor-data.svc.cluster.local
```

**Kafka publishing failures**:
```bash
# Check Kafka logs
kubectl logs -n noor-messaging -l app=kafka --tail=100

# Check schema registry
curl http://schema-registry.noor-messaging.svc.cluster.local:8081/subjects
```

**Authentication failures**:
- Verify JWT_SECRET_KEY matches auth service
- Check token expiration
- Validate token claims include required roles

## Performance

### Expected Throughput

- **Employee creation**: 100 req/sec
- **Read operations**: 1000 req/sec
- **Review creation**: 50 req/sec

### Latency Targets

- **p50**: < 50ms
- **p95**: < 200ms
- **p99**: < 500ms

## License

Proprietary - UAE Government - NOOR Platform

## Support

For issues and questions:
- **Email**: noor-support@mohre.gov.ae
- **Slack**: #noor-platform-dev
- **Docs**: https://docs.noor.gov.ae
