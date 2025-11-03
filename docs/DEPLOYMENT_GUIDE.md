# NOOR Platform - Production Deployment Guide

**Purpose**: Complete guide for deploying NOOR Platform to production  
**Target Environment**: Cloud-based infrastructure (AWS/Azure/GCP)  
**Architecture**: Microservices with containerization  
**Status**: Production-ready configuration

---

## Architecture Overview

The NOOR Platform follows a modern microservices architecture designed for scalability, reliability, and maintainability. This architecture separates concerns, enables independent scaling of components, and provides resilience through redundancy.

### System Components

**Frontend Application** serves the user interfaces for Federal, Individual, and Institutional personas. Built with Next.js 14, the frontend is deployed as a static site with server-side rendering capabilities, ensuring fast page loads and excellent SEO.

**Backend API** provides RESTful endpoints for all platform functionality including authentication, assessments, gamification, and learning center operations. Built with FastAPI, the backend is containerized and deployed behind a load balancer for high availability.

**Database Layer** uses PostgreSQL for relational data (users, assessments, courses) and Redis for caching and session management. Both are deployed in managed service configurations for automatic backups and failover.

**File Storage** leverages object storage (S3-compatible) for user uploads, course materials, and generated certificates. CDN integration ensures fast global delivery of static assets.

**AI Services** integrate Claude AI for assessment question generation and intelligent recommendations. API keys are securely managed through environment variables and secrets management.

---

## Infrastructure Requirements

### Compute Resources

**Frontend Servers**: 2-4 instances (2 vCPU, 4GB RAM each)  
**Backend API Servers**: 4-8 instances (4 vCPU, 8GB RAM each)  
**Database Server**: 1 primary + 1 replica (8 vCPU, 32GB RAM, 500GB SSD)  
**Redis Cache**: 1 instance (2 vCPU, 8GB RAM)  
**Load Balancer**: Managed service (Application Load Balancer)

### Network Configuration

**Domain**: noor.ae (primary domain)  
**Subdomains**:
- app.noor.ae (frontend application)
- api.noor.ae (backend API)
- cdn.noor.ae (static assets)

**SSL/TLS**: Wildcard certificate for *.noor.ae  
**Firewall**: Allow HTTPS (443), SSH (22 from bastion only)  
**VPC**: Private subnets for backend, public subnets for load balancers

---

## Deployment Process

### Step 1: Environment Setup

Create production environment with proper isolation, security groups, and network configuration. Provision all required infrastructure components using infrastructure-as-code.

```bash
# Create production environment
terraform init
terraform plan -var-file=production.tfvars
terraform apply -var-file=production.tfvars

# Verify infrastructure
terraform output
```

### Step 2: Database Migration

Set up production database with proper schema, indexes, and initial data. Run migrations to create all required tables and relationships.

```bash
# Connect to database server
ssh bastion.noor.ae

# Run migrations
cd /opt/noor/backend
source venv/bin/activate
alembic upgrade head

# Verify schema
psql -h db.noor.internal -U noor_admin -d noor_prod -c "\dt"
```

### Step 3: Backend Deployment

Build and deploy backend API servers with proper configuration, environment variables, and health checks.

```bash
# Build Docker image
cd backend
docker build -t noor-backend:latest .

# Tag for registry
docker tag noor-backend:latest registry.noor.ae/noor-backend:v1.0.0

# Push to registry
docker push registry.noor.ae/noor-backend:v1.0.0

# Deploy to production
kubectl apply -f k8s/backend-deployment.yaml
kubectl rollout status deployment/noor-backend

# Verify deployment
kubectl get pods -l app=noor-backend
curl https://api.noor.ae/health
```

### Step 4: Frontend Deployment

Build and deploy frontend application with optimized production build and CDN integration.

```bash
# Build production frontend
cd frontend
npm run build
npm run export

# Upload to S3/CDN
aws s3 sync out/ s3://noor-frontend-prod/ --delete
aws cloudfront create-invalidation --distribution-id E123ABC --paths "/*"

# Verify deployment
curl https://app.noor.ae
```

### Step 5: Configuration & Secrets

Configure environment variables, API keys, and secrets using secure secrets management.

```bash
# Set environment variables
kubectl create secret generic noor-secrets \
  --from-literal=database-url="postgresql://..." \
  --from-literal=anthropic-api-key="sk-..." \
  --from-literal=supabase-url="https://..." \
  --from-literal=supabase-key="..." \
  --from-literal=openai-api-key="sk-..."

# Verify secrets
kubectl get secrets
```

### Step 6: Health Checks & Monitoring

Configure health checks, monitoring, and alerting for all components.

```bash
# Configure health checks
kubectl apply -f k8s/health-checks.yaml

# Set up monitoring
kubectl apply -f k8s/prometheus.yaml
kubectl apply -f k8s/grafana.yaml

# Configure alerts
kubectl apply -f k8s/alertmanager.yaml
```

---

## Docker Configuration

### Backend Dockerfile

```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY app ./app
COPY alembic ./alembic
COPY alembic.ini .

# Create non-root user
RUN useradd -m -u 1000 noor && chown -R noor:noor /app
USER noor

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD python -c "import requests; requests.get('http://localhost:8000/health')"

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build application
RUN npm run build

# Production image
FROM node:22-alpine

WORKDIR /app

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm ci --production

# Create non-root user
RUN addgroup -g 1000 noor && adduser -D -u 1000 -G noor noor
USER noor

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Run application
CMD ["npm", "start"]
```

---

## Kubernetes Configuration

### Backend Deployment

```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: noor-backend
  labels:
    app: noor-backend
spec:
  replicas: 4
  selector:
    matchLabels:
      app: noor-backend
  template:
    metadata:
      labels:
        app: noor-backend
    spec:
      containers:
      - name: backend
        image: registry.noor.ae/noor-backend:v1.0.0
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: noor-secrets
              key: database-url
        - name: ANTHROPIC_API_KEY
          valueFrom:
            secretKeyRef:
              name: noor-secrets
              key: anthropic-api-key
        resources:
          requests:
            memory: "4Gi"
            cpu: "2"
          limits:
            memory: "8Gi"
            cpu: "4"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: noor-backend-service
spec:
  selector:
    app: noor-backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8000
  type: LoadBalancer
```

### Frontend Deployment

```yaml
# k8s/frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: noor-frontend
  labels:
    app: noor-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: noor-frontend
  template:
    metadata:
      labels:
        app: noor-frontend
    spec:
      containers:
      - name: frontend
        image: registry.noor.ae/noor-frontend:v1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_API_URL
          value: "https://api.noor.ae"
        resources:
          requests:
            memory: "2Gi"
            cpu: "1"
          limits:
            memory: "4Gi"
            cpu: "2"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: noor-frontend-service
spec:
  selector:
    app: noor-frontend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

---

## Environment Variables

### Backend Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@db.noor.internal:5432/noor_prod
REDIS_URL=redis://redis.noor.internal:6379/0

# API Keys
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJ...
OPENAI_API_KEY=sk-...

# Application
APP_ENV=production
DEBUG=false
LOG_LEVEL=info
SECRET_KEY=<strong-random-key>

# CORS
ALLOWED_ORIGINS=https://app.noor.ae,https://noor.ae

# File Storage
S3_BUCKET=noor-uploads-prod
S3_REGION=me-south-1
CDN_URL=https://cdn.noor.ae
```

### Frontend Environment Variables

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.noor.ae
NEXT_PUBLIC_APP_URL=https://app.noor.ae

# Environment
NEXT_PUBLIC_ENV=production

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Database Configuration

### PostgreSQL Setup

```sql
-- Create production database
CREATE DATABASE noor_prod;

-- Create user with limited privileges
CREATE USER noor_app WITH PASSWORD '<strong-password>';
GRANT CONNECT ON DATABASE noor_prod TO noor_app;
GRANT USAGE ON SCHEMA public TO noor_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO noor_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO noor_app;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Configure connection pooling
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = '8GB';
ALTER SYSTEM SET effective_cache_size = '24GB';
ALTER SYSTEM SET work_mem = '64MB';
```

### Backup Configuration

```bash
# Automated daily backups
0 2 * * * pg_dump -h db.noor.internal -U noor_admin noor_prod | gzip > /backups/noor_$(date +\%Y\%m\%d).sql.gz

# Retention policy: 30 days
find /backups -name "noor_*.sql.gz" -mtime +30 -delete

# Backup to S3
aws s3 sync /backups/ s3://noor-backups-prod/database/
```

---

## Monitoring & Logging

### Prometheus Metrics

```yaml
# k8s/prometheus.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
      - job_name: 'noor-backend'
        static_configs:
          - targets: ['noor-backend-service:80']
      - job_name: 'noor-frontend'
        static_configs:
          - targets: ['noor-frontend-service:80']
```

### Grafana Dashboards

Key metrics to monitor:
- Request rate (requests/second)
- Response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- Database connection pool usage
- Memory and CPU utilization
- Token wallet transactions
- Assessment completion rate
- Course unlock rate

### Logging Configuration

```yaml
# k8s/fluentd.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/containers/*.log
      pos_file /var/log/fluentd-containers.log.pos
      tag kubernetes.*
      read_from_head true
      <parse>
        @type json
      </parse>
    </source>
    
    <match kubernetes.**>
      @type elasticsearch
      host elasticsearch.noor.internal
      port 9200
      logstash_format true
      logstash_prefix noor
    </match>
```

---

## Security Configuration

### SSL/TLS Certificates

```bash
# Request certificate from Let's Encrypt
certbot certonly --dns-route53 -d noor.ae -d *.noor.ae

# Auto-renewal
0 0 1 * * certbot renew --quiet
```

### Firewall Rules

```bash
# Allow HTTPS from anywhere
ufw allow 443/tcp

# Allow SSH from bastion only
ufw allow from 10.0.1.0/24 to any port 22

# Allow database from backend only
ufw allow from 10.0.2.0/24 to any port 5432

# Enable firewall
ufw enable
```

### Secrets Management

Use AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault for sensitive data:

```bash
# Store secret
aws secretsmanager create-secret \
  --name noor/prod/database-password \
  --secret-string "<strong-password>"

# Retrieve secret
aws secretsmanager get-secret-value \
  --secret-id noor/prod/database-password \
  --query SecretString --output text
```

---

## Scaling Configuration

### Horizontal Pod Autoscaler

```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: noor-backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: noor-backend
  minReplicas: 4
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### Database Read Replicas

Configure read replicas for scaling database reads:

```bash
# Create read replica
aws rds create-db-instance-read-replica \
  --db-instance-identifier noor-prod-replica-1 \
  --source-db-instance-identifier noor-prod-primary \
  --db-instance-class db.r6g.2xlarge
```

---

## Disaster Recovery

### Backup Strategy

**Full Backups**: Daily at 2:00 AM UTC  
**Incremental Backups**: Every 6 hours  
**Retention**: 30 days  
**Off-site Storage**: S3 with cross-region replication

### Recovery Procedures

**Recovery Time Objective (RTO)**: 4 hours  
**Recovery Point Objective (RPO)**: 6 hours

```bash
# Restore from backup
pg_restore -h db.noor.internal -U noor_admin -d noor_prod /backups/noor_20241103.sql.gz

# Verify restoration
psql -h db.noor.internal -U noor_admin -d noor_prod -c "SELECT COUNT(*) FROM users;"
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] Code review completed
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance testing completed
- [ ] Backup current production
- [ ] Notify stakeholders of deployment window

### Deployment

- [ ] Deploy backend API
- [ ] Run database migrations
- [ ] Deploy frontend application
- [ ] Update DNS records if needed
- [ ] Invalidate CDN cache
- [ ] Verify health checks

### Post-Deployment

- [ ] Monitor error rates
- [ ] Check application logs
- [ ] Verify key functionality
- [ ] Monitor performance metrics
- [ ] Update documentation
- [ ] Notify stakeholders of completion

---

## Rollback Procedures

If issues are detected post-deployment:

```bash
# Rollback backend
kubectl rollout undo deployment/noor-backend

# Rollback database migration
alembic downgrade -1

# Rollback frontend
aws s3 sync s3://noor-frontend-backup/ s3://noor-frontend-prod/
aws cloudfront create-invalidation --distribution-id E123ABC --paths "/*"

# Verify rollback
curl https://api.noor.ae/health
curl https://app.noor.ae
```

---

## Support & Maintenance

### Monitoring Alerts

Configure alerts for:
- API response time > 1s
- Error rate > 1%
- Database connections > 80%
- Disk usage > 85%
- Memory usage > 90%

### On-Call Rotation

Maintain 24/7 on-call coverage with escalation procedures for critical issues.

### Maintenance Windows

Schedule regular maintenance windows:
- Weekly: Sunday 2:00-4:00 AM UTC
- Monthly: First Sunday 2:00-6:00 AM UTC

---

## Status

✅ **Deployment Configuration Complete**  
✅ **Infrastructure Requirements Defined**  
✅ **Docker Containers Configured**  
✅ **Kubernetes Manifests Ready**  
✅ **Monitoring & Logging Configured**  
✅ **Security Hardened**  
✅ **Disaster Recovery Planned**

**Ready for Production Deployment**

