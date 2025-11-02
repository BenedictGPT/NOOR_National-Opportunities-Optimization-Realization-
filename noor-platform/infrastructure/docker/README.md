# NOOR Platform - Docker Development Environment

This directory contains Docker configurations for local development.

## Quick Start

1. **Copy environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

2. **Start all services:**
```bash
docker-compose up -d
```

3. **Check service health:**
```bash
docker-compose ps
```

4. **View logs:**
```bash
docker-compose logs -f
```

5. **Stop all services:**
```bash
docker-compose down
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| PostgreSQL | 5432 | Relational database |
| MongoDB | 27017 | Document database |
| Neo4j | 7474, 7687 | Graph database |
| Redis | 6379 | Cache & sessions |
| Zookeeper | 2181 | Kafka coordination |
| Kafka | 9092 | Event streaming |
| Nginx | 80, 443 | API Gateway |

## Service Access

### PostgreSQL
```bash
# Connect via psql
docker exec -it noor-postgres psql -U noor_user -d noor_db

# Or using a GUI client:
Host: localhost
Port: 5432
Database: noor_db
Username: noor_user
Password: (from .env)
```

### MongoDB
```bash
# Connect via mongosh
docker exec -it noor-mongodb mongosh -u noor_user -p noor_password --authenticationDatabase admin

# Or using MongoDB Compass:
mongodb://noor_user:noor_password@localhost:27017/?authSource=admin
```

### Neo4j
```bash
# Access web interface
http://localhost:7474

# Connect with bolt protocol:
bolt://localhost:7687
Username: neo4j
Password: (from .env)
```

### Redis
```bash
# Connect via redis-cli
docker exec -it noor-redis redis-cli -a noor_password

# Test connection
docker exec -it noor-redis redis-cli -a noor_password PING
```

### Kafka
```bash
# List topics
docker exec -it noor-kafka kafka-topics --bootstrap-server localhost:9092 --list

# Create a topic
docker exec -it noor-kafka kafka-topics --bootstrap-server localhost:9092 \
  --create --topic test-topic --partitions 3 --replication-factor 1

# Produce messages
docker exec -it noor-kafka kafka-console-producer \
  --bootstrap-server localhost:9092 --topic test-topic

# Consume messages
docker exec -it noor-kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 --topic test-topic --from-beginning
```

## Health Checks

All services include health checks. Check status:

```bash
docker-compose ps
```

Healthy services will show `(healthy)` in the status.

## Troubleshooting

### Services won't start
```bash
# Check logs
docker-compose logs service-name

# Restart a specific service
docker-compose restart service-name
```

### Port conflicts
If you have existing services on the same ports, either:
1. Stop the conflicting services
2. Change ports in docker-compose.yml

### Permission issues
```bash
# Reset volumes
docker-compose down -v
docker-compose up -d
```

### Clear all data and restart fresh
```bash
docker-compose down -v
rm -rf volumes/
docker-compose up -d
```

## Data Persistence

All data is persisted in Docker volumes:
- `postgres_data` - PostgreSQL data
- `mongodb_data` - MongoDB data
- `neo4j_data` - Neo4j data
- `redis_data` - Redis data
- `kafka_data` - Kafka data
- `zookeeper_data` - Zookeeper data

To backup data:
```bash
docker-compose exec postgres pg_dump -U noor_user noor_db > backup.sql
```

To restore data:
```bash
docker-compose exec -T postgres psql -U noor_user noor_db < backup.sql
```

## Development Workflow

1. Start services: `docker-compose up -d`
2. Run backend: `cd ../../backend && poetry run uvicorn main:app --reload`
3. Run frontend: `cd ../../frontend/web && pnpm dev`
4. Access application: `http://localhost`

## Production Build

To build Docker images for production:

```bash
# Build backend
docker build -f Dockerfiles/Dockerfile.backend -t noor-backend:latest ../..

# Build frontend
docker build -f Dockerfiles/Dockerfile.frontend -t noor-frontend:latest ../..
```

## Network

All services run on the `noor-network` bridge network with subnet `172.28.0.0/16`.

Services can communicate with each other using their service names:
- `postgres:5432`
- `mongodb:27017`
- `neo4j:7687`
- `redis:6379`
- `kafka:9092`
