# Health Certification Service

**NOOR Platform v7.1** - Microservice for managing health certifications and medical compliance

## Overview

The Health Certification Service manages all aspects of health certifications required for employment in various sectors:

- **Certificate Management**: Issue, suspend, revoke health certificates
- **Medical Exam Scheduling**: Schedule and track medical examinations
- **Renewal Workflows**: Automated renewal processes for expiring certificates
- **Compliance Verification**: Check employee compliance with health requirements
- **Notifications**: Automated expiry reminders and renewal notifications
- **Reporting**: Compliance reports and analytics

## Certificate Types

1. **General Health** - Food handlers, public-facing roles (12 months)
2. **Occupational Health** - Industrial, construction workers (12 months)
3. **Food Handler** - Restaurant, catering staff (12 months)
4. **Healthcare Worker** - Medical professionals (12 months)
5. **Childcare Worker** - Daycare, education (12 months)
6. **Fitness to Work** - Pre-employment medical (12 months)
7. **Driving Medical** - Commercial drivers (24 months)
8. **Aviation Medical** - Pilots, crew (12 months)

## Architecture

### Technology Stack

- **Framework**: FastAPI 0.104 (Python 3.11)
- **Databases**:
  - PostgreSQL (certificate records, compliance tracking)
  - MongoDB (exam schedules, medical results)
  - Redis (caching, session management)
- **Messaging**: Kafka (health events)
- **Storage**: Azure Files Premium (certificate documents)
- **Scheduler**: APScheduler (background jobs)
- **Security**: JWT, RBAC, data encryption (L1 Personal Zone)

### API Endpoints

#### Certificate Management

```
POST   /api/v1/certificates                    Create certificate record
GET    /api/v1/certificates/{id}               Get certificate
GET    /api/v1/certificates/user/{user_id}     Get user certificates
PUT    /api/v1/certificates/{id}/issue         Issue certificate
PUT    /api/v1/certificates/{id}/suspend       Suspend certificate
PUT    /api/v1/certificates/{id}/revoke        Revoke certificate
```

#### Medical Exam Management

```
POST   /api/v1/exams/schedule                  Schedule medical exam
GET    /api/v1/exams/upcoming/user/{user_id}   Get upcoming exams
PUT    /api/v1/exams/{id}/complete             Record exam results
```

#### Renewal Workflow

```
POST   /api/v1/renewals                        Initiate renewal
GET    /api/v1/renewals/user/{user_id}         Get renewal workflows
```

#### Compliance

```
POST   /api/v1/compliance/check                Check user compliance
POST   /api/v1/compliance/bulk                 Bulk compliance check
GET    /api/v1/compliance/expiring             Get expiring certificates
```

#### Notifications

```
POST   /api/v1/notifications/preferences       Set notification preferences
POST   /api/v1/notifications/send-reminders    Send expiry reminders
```

#### Reports

```
GET    /api/v1/reports/certificate-statistics  Certificate statistics
GET    /api/v1/reports/compliance-report       Compliance report
```

## Data Models

### Health Certificate

```python
{
  "id": "uuid",
  "user_id": "uuid",
  "certificate_number": "GH-20240115120000-ABCD1234",
  "certificate_type": "general_health",
  "status": "active|expiring_soon|expired|suspended|revoked",
  "issue_date": "2024-01-15",
  "expiry_date": "2025-01-15",
  "exam_date": "2024-01-10",
  "exam_result": "fit|fit_with_restrictions|temporarily_unfit",
  "restrictions": ["No heavy lifting"],
  "issuing_authority": "Dubai Health Authority",
  "certificate_document_url": "https://storage.noor.gov.ae/...",
  "days_until_expiry": 365
}
```

### Medical Exam Schedule

```python
{
  "certificate_id": "uuid",
  "exam_date": "2024-02-01T10:00:00Z",
  "medical_facility": "Dubai Medical Center",
  "medical_facility_address": "Sheikh Zayed Road, Dubai",
  "contact_number": "+971-4-XXX-XXXX",
  "special_instructions": "Fasting required",
  "reminder_sent": false
}
```

### Compliance Status

```python
{
  "user_id": "uuid",
  "role_id": "uuid",
  "company_id": "uuid",
  "is_compliant": true,
  "certificates_required": ["general_health", "food_handler"],
  "certificates_valid": [
    {
      "type": "general_health",
      "certificate_id": "uuid",
      "expiry_date": "2025-01-15",
      "days_remaining": 365
    }
  ],
  "certificates_missing": [],
  "certificates_expiring": [],
  "certificates_expired": [],
  "compliance_percentage": 100.0,
  "next_action_required": null
}
```

## Events Published

### Certificate Events

**Topic**: `noor.health.certificate.issued`
```json
{
  "event_type": "ISSUED",
  "certificate_id": "uuid",
  "user_id": "uuid",
  "certificate_type": "general_health",
  "issue_date": "2024-01-15",
  "expiry_date": "2025-01-15"
}
```

**Topic**: `noor.health.certificate.expired`
**Topic**: `noor.health.certificate.suspended`
**Topic**: `noor.health.certificate.revoked`

### Exam Events

**Topic**: `noor.health.exam.scheduled`
**Topic**: `noor.health.exam.completed`

### Renewal Events

**Topic**: `noor.health.renewal.initiated`
**Topic**: `noor.health.renewal.completed`

## Background Jobs

### Daily Tasks

**9:00 AM UAE**: `check_expiring_certificates`
- Find certificates expiring in 30, 14, 7, 1 days
- Send notifications to users
- Publish notification events

**10:00 AM UAE**: `auto_initiate_renewals`
- Find certificates expiring in 60 days
- Auto-create renewal workflows
- Send renewal reminders

**Every 6 hours**: `update_certificate_statuses`
- Update ACTIVE → EXPIRING_SOON (< 30 days)
- Update EXPIRING_SOON → EXPIRED (< 0 days)
- Publish status change events

### Weekly Tasks

**Monday 8:00 AM UAE**: `generate_compliance_reports`
- Generate compliance reports for all companies
- Email to HR contacts
- Store in document storage

### Monthly Tasks

**1st of month, 2:00 AM UAE**: `cleanup_old_records`
- Archive certificates expired > 2 years
- Delete old exam schedules
- Cleanup temporary files

## Configuration

### Environment Variables

```bash
# Service
SERVICE_NAME=health-certification
SERVICE_VERSION=7.1.0
ENVIRONMENT=production

# Databases
POSTGRES_PASSWORD=your_secure_password
MONGODB_PASSWORD=your_secure_password
REDIS_PASSWORD=your_secure_password

# Security
JWT_SECRET_KEY=your_jwt_secret_minimum_32_chars

# Certificate settings
DEFAULT_VALIDITY_MONTHS=12
EXPIRY_WARNING_DAYS=30,14,7,1
```

## Security

### Data Classification

- **L1 Personal Zone**: Health certificates (HIPAA/GDPR sensitive)
- **Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Access Control**: RBAC with health admin role
- **Audit Trail**: All certificate operations logged

### Deployment

- **Node Pool**: high-sensitivity
- **Network Policy**: Strict ingress/egress rules
- **Data Retention**: 10 years (compliance)
- **Backup**: Daily encrypted backups

## Development

### Local Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Run service
uvicorn main:app --reload --port 8002

# Run tests
pytest --cov=. --cov-report=html
```

### Docker

```bash
# Build
docker build -t health-certification:7.1.0 .

# Run
docker run -p 8002:8002 \
  -e POSTGRES_PASSWORD=secret \
  -e MONGODB_PASSWORD=secret \
  -e JWT_SECRET_KEY=your_secret \
  health-certification:7.1.0
```

## Deployment

### Kubernetes

```bash
# Create secrets
kubectl create secret generic health-certification-secrets \
  --from-literal=POSTGRES_PASSWORD=your_password \
  --from-literal=MONGODB_PASSWORD=your_password \
  --from-literal=JWT_SECRET_KEY=your_jwt_secret \
  -n noor-services

# Deploy
kubectl apply -f k8s-deployment.yaml

# Check status
kubectl get pods -n noor-services -l app=health-certification

# Port forward
kubectl port-forward -n noor-services svc/health-certification 8002:80
```

### Scaling

- **Min replicas**: 3
- **Max replicas**: 8
- **CPU target**: 70%
- **Memory target**: 80%

## API Examples

### Create Certificate

```bash
curl -X POST "http://localhost:8002/api/v1/certificates" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "certificate_type": "general_health",
    "issuing_authority": "Dubai Health Authority",
    "required_for_role": "660e8400-e29b-41d4-a716-446655440000"
  }'
```

### Check Compliance

```bash
curl -X POST "http://localhost:8002/api/v1/compliance/check" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "role_id": "660e8400-e29b-41d4-a716-446655440000",
    "company_id": "770e8400-e29b-41d4-a716-446655440000",
    "required_certificates": ["general_health", "food_handler"]
  }'
```

### Schedule Medical Exam

```bash
curl -X POST "http://localhost:8002/api/v1/exams/schedule" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "certificate_id": "880e8400-e29b-41d4-a716-446655440000",
    "exam_date": "2024-02-01T10:00:00Z",
    "medical_facility": "Dubai Medical Center",
    "medical_facility_address": "Sheikh Zayed Road, Dubai",
    "contact_number": "+971-4-123-4567"
  }'
```

## Database Schema

### PostgreSQL Tables

- `health_certificates`: Certificate records
- `certificate_renewals`: Renewal workflows
- `compliance_requirements`: Role-based requirements

### MongoDB Collections

- `medical_exam_schedules`: Scheduled exams
- `medical_exam_results`: Exam results and findings
- `notification_preferences`: User notification settings

## Compliance

### UAE Regulations

- Ministry of Health and Prevention (MOHAP) requirements
- Dubai Health Authority (DHA) regulations
- Department of Health – Abu Dhabi (DoH) standards

### Data Protection

- GDPR compliant (European citizens)
- UAE Data Protection Law
- HIPAA standards for health data

### Retention

- Active certificates: Lifetime
- Expired certificates: 10 years
- Medical exam results: 10 years
- Audit logs: 7 years

## Monitoring

### Metrics

- Certificate issuance rate
- Expiry rate and trends
- Compliance percentage by company
- Renewal conversion rate
- Exam scheduling time
- Background job execution time

### Alerts

- Certificate expiry surge
- Low compliance rate (< 80%)
- Background job failures
- Database connection issues

## Troubleshooting

### Common Issues

**Expiry notifications not sending**:
```bash
# Check scheduler status
kubectl logs -n noor-services -l app=health-certification | grep scheduler

# Manually trigger
curl -X POST "http://localhost:8002/api/v1/notifications/send-reminders" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**Compliance check returning wrong results**:
- Verify role requirements in database
- Check certificate status update job
- Review certificate expiry date calculations

## Performance

### Expected Throughput

- **Certificate creation**: 50 req/sec
- **Compliance checks**: 200 req/sec
- **Read operations**: 500 req/sec

### Latency Targets

- **p50**: < 50ms
- **p95**: < 150ms
- **p99**: < 400ms

## License

Proprietary - UAE Government - NOOR Platform

## Support

- **Email**: noor-health-support@mohre.gov.ae
- **Slack**: #noor-platform-health
- **Docs**: https://docs.noor.gov.ae/health-certification
