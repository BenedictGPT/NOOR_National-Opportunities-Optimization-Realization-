# NOOR Platform - Quick Start Guide

Get the NOOR Platform running locally in **5 minutes**.

## Prerequisites

- Docker & Docker Compose installed
- Git installed
- 8GB+ RAM available

## Steps

### 1. Navigate to Project

```bash
cd /home/user/NOOR-v7.1/noor-platform
```

### 2. Start Infrastructure

```bash
cd infrastructure/docker
cp .env.example .env
docker-compose up -d
```

### 3. Verify Services

```bash
docker-compose ps
```

You should see 6 services running:
- ✅ noor-postgres (port 5432)
- ✅ noor-mongodb (port 27017)
- ✅ noor-neo4j (ports 7474, 7687)
- ✅ noor-redis (port 6379)
- ✅ noor-kafka (port 9092)
- ✅ noor-nginx (ports 80, 443)

### 4. Initialize Database

```bash
# Copy migration files to container
docker cp ../../backend/shared/database/migrations/001_initial_schema.sql noor-postgres:/tmp/
docker cp ../../backend/shared/database/migrations/002_learning_emiratization_audit.sql noor-postgres:/tmp/

# Run migrations
docker exec -it noor-postgres psql -U noor_user -d noor_db -f /tmp/001_initial_schema.sql
docker exec -it noor-postgres psql -U noor_user -d noor_db -f /tmp/002_learning_emiratization_audit.sql
```

### 5. Access Services

| Service | URL | Credentials |
|---------|-----|-------------|
| **Neo4j Browser** | http://localhost:7474 | neo4j / noor_password |
| **Nginx** | http://localhost | - |
| **PostgreSQL** | localhost:5432 | noor_user / noor_password |
| **MongoDB** | localhost:27017 | noor_user / noor_password |
| **Redis** | localhost:6379 | password: noor_password |
| **Kafka** | localhost:9092 | - |

### 6. Test Database Connection

```bash
# PostgreSQL
docker exec -it noor-postgres psql -U noor_user -d noor_db -c "\dt"

# MongoDB
docker exec -it noor-mongodb mongosh -u noor_user -p noor_password --authenticationDatabase admin

# Neo4j
docker exec -it noor-neo4j cypher-shell -u neo4j -p noor_password "RETURN 1"

# Redis
docker exec -it noor-redis redis-cli -a noor_password PING
```

## What's Next?

### For Backend Developers

```bash
cd backend
poetry install
poetry run uvicorn main:app --reload --port 8000
```

### For Frontend Developers

```bash
cd frontend/web
pnpm install
pnpm dev
```

### For DevOps Engineers

```bash
# Deploy to Kubernetes
cd infrastructure/kubernetes
kubectl apply -f base/namespace.yaml
kubectl apply -f base/
```

## Troubleshooting

### Services won't start

```bash
# Check logs
docker-compose logs service-name

# Restart
docker-compose restart
```

### Port conflicts

Edit `docker-compose.yml` to change conflicting ports.

### Permission issues

```bash
# Reset volumes
docker-compose down -v
docker-compose up -d
```

### Clear everything and start fresh

```bash
docker-compose down -v
rm -rf volumes/
docker-compose up -d
```

## Learn More

- **Full Guide:** See `DEPLOYMENT_GUIDE.md`
- **Docker Details:** See `infrastructure/docker/README.md`
- **Kubernetes Details:** See `infrastructure/kubernetes/README.md`
- **Database Schema:** See `backend/shared/database/migrations/`

## Support

For issues, check the documentation or contact the NOOR Platform team.

**نور - The Light of Knowledge** ✨
