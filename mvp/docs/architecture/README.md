# NOOR Platform MVP - Architecture & Infrastructure Diagrams

**Generated**: November 2, 2025  
**Version**: 1.0  
**Status**: Complete

---

## 📋 Table of Contents

1. [System Architecture](#system-architecture)
2. [Agent Coordination](#agent-coordination)
3. [Infrastructure Deployment](#infrastructure-deployment)
4. [Database Schema](#database-schema)
5. [API Flow](#api-flow)
6. [Diagram Files](#diagram-files)

---

## 🏗️ System Architecture

**File**: `01_mvp_system_architecture.png`

### Overview
Complete system architecture showing all layers of the NOOR MVP platform:

- **User Layer**: Citizens, Employers, Government
- **Frontend Layer**: Next.js application (1,209 lines)
- **API Gateway**: FastAPI with authentication and rate limiting
- **Agent Orchestration**: Master Orchestrator + Agent Registry (548 lines)
- **Specialized Agents**: 8 AI agents (3,709 lines total)
- **Business Logic**: Services layer (976 lines)
- **Data Models**: SQLAlchemy ORM (688 lines)
- **Data Layer**: 6 databases (PostgreSQL, MongoDB, Redis, Neo4j, Elasticsearch, Kafka)
- **External Services**: Claude AI, SendGrid, Twilio, UAE Pass
- **Infrastructure**: Kubernetes, Docker, CI/CD

### Key Metrics
- **Total Code**: 11,117 lines
- **Total Files**: 208 files
- **Agents**: 8 specialized agents
- **Databases**: 6 different data stores
- **API Endpoints**: 51 endpoints

---

## 🤖 Agent Coordination

### Agent Coordination Flow
**File**: `02_agent_coordination_flow.png`

Sequence diagram showing complete job matching request flow:

1. **User Request** → API Gateway
2. **Authentication** → JWT validation
3. **Rate Limiting** → Check limits
4. **Master Orchestrator** → Analyze and decompose task
5. **Data Retrieval Agent** → Fetch user profile, skills, jobs
6. **AI Analysis Agent** → Claude AI skill matching
7. **Matching Agent** → Calculate final scores
8. **Notification Agent** → Send job alert
9. **Response** → Return top 10 matches

**Total Time**: ~1.3 seconds

### Agent Interactions
**File**: `03_agent_interactions.png`

Graph showing how all 8 agents interact:

#### **Master Orchestrator** (Central Hub)
- Delegates tasks to all agents
- Coordinates workflows
- Aggregates results

#### **Data & Retrieval**
- **Data Retrieval Agent**: 8 functions
  - Queries PostgreSQL, MongoDB, Redis
  - Provides data to all other agents

#### **AI & Intelligence**
- **AI Analysis Agent**: 7 AI functions
  - Calls Claude AI
  - Provides insights to Matching and Analytics agents
- **Matching Agent**: 7 match functions
  - Requests data and analysis
  - Triggers notifications
- **Analytics Agent**: 8 analytics functions
  - Generates reports and insights

#### **Operations & Communication**
- **Notification Agent**: 10 notification types
  - Email, SMS, in-app notifications
- **Verification Agent**: 7 verification types
  - AI-powered evidence analysis

#### **Backend Operations**
- **Backend API Agent**: 14 CRUD operations
  - Generates FastAPI endpoints
  - Creates Pydantic models

---

## 🚀 Infrastructure Deployment

**File**: `04_infrastructure_deployment.png`

### CI/CD Pipeline
1. **GitHub Repository** → Source code
2. **GitHub Actions** → Automated testing
3. **Docker Build** → Multi-stage builds
4. **Push to Registry** → Docker Hub/ECR
5. **Kubernetes Deployment** → Production cluster

### Kubernetes Architecture

#### **Frontend Pods** (3 replicas)
- Next.js application
- 512MB RAM each
- Port 3000

#### **Backend Pods** (4 replicas)
- FastAPI application
- 1GB RAM each
- Port 8000

#### **Agent Pods** (2 replicas)
- All 8 agents
- 2GB RAM each
- High availability

### Data Layer (Managed Services)
- **PostgreSQL**: AWS RDS/Azure DB (100GB SSD)
- **MongoDB Atlas**: 3-node replica (50GB)
- **Redis Cluster**: ElastiCache/Azure Cache (6GB)

### External Services
- **Anthropic Claude**: AI analysis
- **SendGrid**: Email notifications
- **Twilio**: SMS notifications
- **UAE Pass**: OAuth authentication

### Monitoring & Logging
- **Prometheus**: Metrics collection
- **Grafana**: Dashboards
- **Loki**: Log aggregation
- **AlertManager**: Notifications

### Security
- **Cert Manager**: SSL/TLS certificates
- **HashiCorp Vault**: Secrets management
- **WAF**: Web Application Firewall

---

## 💾 Database Schema

**File**: `05_database_schema.png`

### Entity Relationship Diagram

#### **Core Tables** (20+ tables)

**Layer 1: Individual/Citizens**
- `users` - User accounts and profiles
- `skills` - Master skills catalog
- `user_skills` - User skills with proficiency
- `work_experience` - Employment history
- `work_experience_skills` - Skills used in jobs
- `work_experience_verifications` - Verification records
- `education` - Educational background
- `certifications` - Professional certifications
- `health_records` - Encrypted health data

**Layer 2: Institutional/Employers**
- `institutions` - Employer organizations
- `employees` - Employee records
- `job_postings` - Job opportunities
- `job_skills` - Required skills for jobs

**Layer 3: Federal/Government**
- `applications` - Job applications
- `analytics_data` - Workforce analytics

### Key Relationships
- Users → User Skills (One-to-Many)
- Users → Work Experience (One-to-Many)
- Skills → User Skills (One-to-Many)
- Work Experience → Work Experience Skills (One-to-Many)
- Institutions → Job Postings (One-to-Many)
- Job Postings → Applications (One-to-Many)

### Data Types
- **UUID**: Primary keys
- **Enums**: Status, types, categories
- **JSONB**: Flexible data storage
- **Timestamps**: Audit trails
- **Text**: Descriptions and notes

---

## 🔌 API Flow

**File**: `06_api_flow.png`

### API Gateway Architecture

#### **Middleware Chain**
1. **CORS Middleware** → Cross-origin requests
2. **Logging Middleware** → Request/response logging
3. **Authentication Middleware** → JWT validation
4. **Rate Limiting Middleware** → 60/min, 1000/hr

### API Endpoints (51 Total)

#### **Authentication** - `/api/v1/auth`
- POST `/register` - User registration
- POST `/login` - User login
- POST `/refresh` - Token refresh
- POST `/logout` - User logout

#### **Users** - `/api/v1/users`
- GET `/me` - Current user profile
- PUT `/me` - Update profile
- GET `/:id` - Get user by ID
- DELETE `/:id` - Delete user

#### **Skills** - `/api/v1/skills`
- GET `/` - List all skills
- POST `/` - Create skill
- GET `/:id` - Get skill details
- PUT `/:id` - Update skill
- DELETE `/:id` - Delete skill
- POST `/user-skills` - Add user skill
- GET `/user-skills` - Get user skills
- POST `/match` - Match skills to jobs

#### **Work Experience** - `/api/v1/work-experience`
- GET `/` - List experiences
- POST `/` - Add experience
- GET `/:id` - Get experience details
- PUT `/:id` - Update experience
- DELETE `/:id` - Delete experience
- POST `/verify` - Request verification

#### **Jobs** - `/api/v1/jobs`
- GET `/` - List job postings
- POST `/` - Create job posting
- GET `/:id` - Get job details
- PUT `/:id` - Update job
- DELETE `/:id` - Delete job
- POST `/match` - Match jobs to user
- GET `/recommendations` - Get recommendations

#### **Applications** - `/api/v1/applications`
- GET `/` - List applications
- POST `/` - Submit application
- GET `/:id` - Get application details
- PUT `/:id/status` - Update status

#### **AI Features** - `/api/v1/ai`
- POST `/skill-match` - AI skill matching
- POST `/career-recommendations` - Career guidance
- POST `/resume-analysis` - Resume optimization
- POST `/job-optimization` - Job description enhancement

### Response Format

#### **Success Response** (200-299)
```json
{
  "success": true,
  "data": {...},
  "metadata": {
    "timestamp": "2025-11-02T10:00:00Z",
    "request_id": "uuid"
  }
}
```

#### **Error Response** (400-599)
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {...}
  },
  "metadata": {
    "timestamp": "2025-11-02T10:00:00Z",
    "request_id": "uuid"
  }
}
```

---

## 📦 Diagram Files

### Available Formats

All diagrams are available in both Mermaid source (`.mmd`) and rendered PNG (`.png`) formats:

| Diagram | Mermaid Source | PNG Image | Size |
|---------|---------------|-----------|------|
| System Architecture | `01_mvp_system_architecture.mmd` | `01_mvp_system_architecture.png` | 134KB |
| Agent Coordination Flow | `02_agent_coordination_flow.mmd` | `02_agent_coordination_flow.png` | 94KB |
| Agent Interactions | `03_agent_interactions.mmd` | `03_agent_interactions.png` | 110KB |
| Infrastructure Deployment | `04_infrastructure_deployment.mmd` | `04_infrastructure_deployment.png` | 96KB |
| Database Schema | `05_database_schema.mmd` | `05_database_schema.png` | 94KB |
| API Flow | `06_api_flow.mmd` | `06_api_flow.png` | 93KB |

**Total**: 6 diagrams, 12 files, 621KB

### Usage

#### **View PNG Images**
Simply open the `.png` files in any image viewer or browser.

#### **Edit Mermaid Diagrams**
1. Open `.mmd` files in any text editor
2. Edit the Mermaid syntax
3. Render using: `manus-render-diagram <input.mmd> <output.png>`

#### **Embed in Documentation**
```markdown
![System Architecture](01_mvp_system_architecture.png)
```

---

## 🎯 Diagram Purpose

### For Developers
- Understand system architecture
- Learn agent interactions
- Follow API flow patterns
- Design database queries

### For DevOps
- Plan infrastructure deployment
- Configure Kubernetes resources
- Set up monitoring and logging
- Implement CI/CD pipeline

### For Stakeholders
- Visualize platform architecture
- Understand data flow
- Review security measures
- Plan scaling strategy

### For Documentation
- Technical specifications
- Onboarding materials
- Architecture decision records
- System design documents

---

## 📊 Statistics

### Code Coverage
- **Backend**: 9,908 lines (40% complete)
- **Frontend**: 1,209 lines (15% complete)
- **Agents**: 3,709 lines (100% complete)
- **Total**: 11,117 lines (35% MVP complete)

### Infrastructure
- **Kubernetes Pods**: 9 total (3 frontend, 4 backend, 2 agents)
- **Databases**: 6 types
- **External Services**: 4 integrations
- **API Endpoints**: 51 endpoints
- **Monitoring Tools**: 4 systems

### Performance Targets
- **API Response Time**: <200ms (average)
- **Agent Execution**: <2s (average)
- **Database Queries**: <50ms (average)
- **Uptime**: 99.9%

---

## 🔄 Updates

This documentation is automatically updated when diagrams are regenerated. Last update: November 2, 2025.

For questions or updates, contact the NOOR Platform development team.

---

**NOOR Platform** - National Opportunities Optimization & Realization  
Building the Future of UAE's Workforce 🇦🇪

