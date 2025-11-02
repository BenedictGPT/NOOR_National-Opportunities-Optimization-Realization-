# NOOR Platform - Backend API

FastAPI-based backend service for the NOOR Platform (National Opportunities Optimization & Realization).

## Architecture

- **Framework**: FastAPI 0.104+
- **Python**: 3.11+
- **Databases**: PostgreSQL, MongoDB, Neo4j, Redis, Elasticsearch, Kafka
- **Authentication**: JWT + UAE Pass OAuth
- **AI Integration**: OpenAI GPT-4, Anthropic Claude

## Project Structure

```
backend/
├── app/
│   ├── api/              # API endpoints
│   │   └── v1/
│   │       ├── endpoints/  # Individual endpoint modules
│   │       └── router.py   # Main API router
│   ├── core/             # Core functionality
│   │   ├── config.py     # Configuration settings
│   │   ├── logging.py    # Logging setup
│   │   └── security.py   # Security utilities
│   ├── db/               # Database connections
│   │   ├── postgres.py
│   │   ├── mongodb.py
│   │   ├── redis.py
│   │   └── schemas/      # Database schemas
│   ├── models/           # Pydantic models
│   ├── services/         # Business logic
│   ├── agents/           # AI agents
│   └── main.py           # Application entry point
├── tests/                # Test suites
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/              # Utility scripts
├── Dockerfile
└── requirements.txt
```

## Quick Start

### 1. Prerequisites

- Python 3.11+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### 2. Installation

```bash
# Clone repository
git clone https://github.com/BenedictGPT/NOOR_National-Opportunities-Optimization-Realization-.git
cd NOOR_National-Opportunities-Optimization-Realization-/backend

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configuration

```bash
# Copy environment variables
cp ../.env.example ../.env

# Edit .env with your configuration
nano ../.env
```

### 4. Database Setup

```bash
# Start databases with Docker Compose
cd ..
docker-compose up -d postgres mongodb redis neo4j elasticsearch

# Run migrations
cd backend
alembic upgrade head

# Seed sample data (optional)
python scripts/seed_data.py
```

### 5. Run Development Server

```bash
# Run with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or use the Makefile
cd ..
make dev
```

### 6. Access API

- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **Health Check**: http://localhost:8000/health

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login with credentials
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/uae-pass/authorize` - UAE Pass OAuth
- `POST /api/v1/auth/uae-pass/callback` - UAE Pass callback
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/me` - Get current user

### Layer 1: Skills Passport
- `GET /api/v1/users/me` - Get user profile
- `PUT /api/v1/users/me` - Update user profile
- `GET /api/v1/users/me/skills-passport` - Get complete skills passport
- `GET /api/v1/skills/` - List all skills
- `POST /api/v1/skills/me` - Add skill to profile
- `GET /api/v1/education/me` - Get education history
- `POST /api/v1/education/me` - Add education record
- `GET /api/v1/work-experience/me` - Get work experience
- `POST /api/v1/work-experience/me` - Add work experience
- `GET /api/v1/certifications/me` - Get certifications
- `POST /api/v1/certifications/me` - Add certification
- `GET /api/v1/assessments/` - List available assessments
- `POST /api/v1/assessments/take` - Take assessment
- `GET /api/v1/health-records/me` - Get health records

### Layer 2: Institutional HCM
- `GET /api/v1/institutions/` - List institutions
- `POST /api/v1/institutions/` - Create institution
- `GET /api/v1/employees/` - List employees
- `POST /api/v1/employees/` - Add employee

### Layer 3: Federal Opportunities
- `GET /api/v1/jobs/` - List job postings
- `POST /api/v1/jobs/` - Create job posting
- `GET /api/v1/applications/` - List applications
- `POST /api/v1/applications/` - Submit application

### AI Agents
- `POST /api/v1/ai/orchestrate` - Trigger AI orchestration
- `GET /api/v1/ai/agents/status` - Get agent status

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test suite
pytest tests/unit/
pytest tests/integration/
pytest tests/e2e/

# Run specific test file
pytest tests/unit/test_auth.py
```

## Code Quality

```bash
# Format code
black app/ tests/
isort app/ tests/

# Lint code
flake8 app/ tests/

# Type checking
mypy app/
```

## Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# View migration history
alembic history
```

## Docker Deployment

```bash
# Build image
docker build -t noor-backend:latest .

# Run container
docker run -p 8000:8000 \
  -e POSTGRES_HOST=postgres \
  -e REDIS_HOST=redis \
  noor-backend:latest
```

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `POSTGRES_URL` - PostgreSQL connection string
- `MONGODB_URL` - MongoDB connection string
- `REDIS_URL` - Redis connection string
- `SECRET_KEY` - JWT secret key
- `UAE_PASS_CLIENT_ID` - UAE Pass OAuth client ID
- `OPENAI_API_KEY` - OpenAI API key
- `ANTHROPIC_API_KEY` - Anthropic API key

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on all endpoints
- CORS configuration
- Input validation with Pydantic
- SQL injection prevention with SQLAlchemy
- XSS protection
- HTTPS enforcement in production

## Monitoring

- Health check endpoint: `/health`
- Metrics endpoint: `/metrics`
- Sentry integration for error tracking
- Structured logging with JSON format

## Contributing

1. Create feature branch
2. Write tests for new features
3. Ensure all tests pass
4. Format code with black and isort
5. Submit pull request

## License

Proprietary - UAE Government

## Support

For issues and questions, contact the NOOR Platform team.

