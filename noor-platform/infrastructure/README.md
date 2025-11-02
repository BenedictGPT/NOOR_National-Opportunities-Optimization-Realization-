# NOOR Platform - Infrastructure

Infrastructure as Code (IaC) for the NOOR Platform.

## Structure

```
infrastructure/
├── docker/              # Docker configurations
│   ├── docker-compose.yml
│   └── Dockerfiles/
├── kubernetes/          # Kubernetes manifests
│   ├── base/
│   ├── overlays/
│   └── network-policies/
└── terraform/           # Terraform IaC
    ├── modules/
    └── environments/
```

## Docker (Local Development)

### Services

1. **PostgreSQL 15** (port 5432)
2. **MongoDB 7** (port 27017)
3. **Neo4j 5** (ports 7687, 7474)
4. **Redis 7** (port 6379)
5. **Kafka** (port 9092) + Zookeeper (port 2181)
6. **Nginx** (ports 80, 443)

### Usage

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild services
docker-compose up -d --build
```

## Kubernetes (Production)

### Node Pools

**1. General-Purpose Pool:**
- FastAPI services
- Kafka brokers
- Redis cache
- Frontend applications
- Nginx Ingress

**2. GPU-Enabled Inference Pool:**
- Radiant AI Agent
- Mentor Matching Agent
- Predictive Analytics Agent
- Scholar AI Agent
- Vector Database

**3. High-Sensitivity Pool:**
- Payroll & Pensions Service
- Health Certification Service
- Biometric Identity Service
- Security Agent
- Federal Intelligence Agent (dormant)

### Network Policies

```
General → GPU: ALLOWED
General → High-Sensitivity: BLOCKED
GPU → High-Sensitivity: BLOCKED
High-Sensitivity → External APIs: ALLOWED (via secure gateway)
```

### Usage

```bash
# Apply all manifests
kubectl apply -f kubernetes/

# Check status
kubectl get pods -n noor-platform

# View logs
kubectl logs -f deployment/noor-backend -n noor-platform

# Port forward for local testing
kubectl port-forward service/noor-api 8000:8000 -n noor-platform
```

## Terraform (Infrastructure as Code)

### Modules

- **vpc:** Virtual Private Cloud setup
- **eks:** Amazon EKS cluster
- **rds:** PostgreSQL RDS instance
- **mongodb:** MongoDB Atlas cluster
- **redis:** ElastiCache Redis
- **s3:** S3 buckets for storage
- **iam:** IAM roles and policies

### Usage

```bash
# Initialize Terraform
cd terraform/environments/production
terraform init

# Plan changes
terraform plan

# Apply changes
terraform apply

# Destroy infrastructure (use with caution!)
terraform destroy
```

## Monitoring

### Prometheus
- Metrics collection from all services
- Custom metrics for agents and services

### Grafana
- Pre-configured dashboards
- Real-time monitoring
- Alerting rules

### ELK Stack
- Centralized logging
- Log aggregation from all pods
- Search and analysis

## Security

- **Encryption at Rest:** AES-256 for all databases
- **Encryption in Transit:** TLS 1.3 for all communication
- **Network Segmentation:** 3 isolated Kubernetes pools
- **Zero-Trust Architecture:** Every service authenticated and authorized
- **Secrets Management:** Kubernetes Secrets + HashiCorp Vault
- **Audit Logging:** All actions logged to immutable storage

## Backup & Recovery

- **PostgreSQL:** Daily automated backups, 7-day retention
- **MongoDB:** Continuous backup, point-in-time recovery
- **Neo4j:** Daily snapshots, 7-day retention
- **Redis:** AOF persistence for critical data
- **Kafka:** Replicated topics (replication factor: 3)

## Disaster Recovery

- **RTO (Recovery Time Objective):** 1 hour
- **RPO (Recovery Point Objective):** 15 minutes
- **Failover:** Automated failover to secondary region
- **Backups:** Stored in geographically separate regions
