# NOOR Platform: Prompt-by-Prompt Breakdown for AI Application Builder

**Version:** 7.2 (Accelerated Timeline: 6 Weeks)  
**Target:** AI Application Builders (Cursor, Replit, Claude, GPT-4, etc.)  
**Purpose:** Step-by-step prompts to build the complete NOOR Platform in 6 weeks  
**Status:** Production-Ready Blueprint  
**Date:** October 30, 2025  

**REVISED IN v7.2:** Timeline accelerated from 23 weeks to **6 weeks** (42 days) based on true agentic AI capabilities with 31 agents working 24/7 in parallel.

---

## 📋 Table of Contents

1. [Overview & Prerequisites](#overview--prerequisites)

1. [Phase 1: Infrastructure Setup](#phase-1-infrastructure-setup)

1. [Phase 2: Database Layer](#phase-2-database-layer)

1. [Phase 3: Service Layer](#phase-3-service-layer)

1. [Phase 4: Agent Orchestration Layer](#phase-4-agent-orchestration-layer)

1. [Phase 5: Experience Layer (Frontend)](#phase-5-experience-layer-frontend)

1. [Phase 6: Integration & Security](#phase-6-integration--security)

1. [Phase 7: Testing & Deployment](#phase-7-testing--deployment)

1. [Validation Checkpoints](#validation-checkpoints)

---

## Overview & Prerequisites

### **What You're Building**

The NOOR Platform is a national human capital intelligence system powered by 31 AI agents. It serves:

- **5 million Emiratis** (Individual users - Skills Passport)

- **Thousands of institutions** (HR departments - HCM Suite)

- **UAE Federal Government** (National workforce analytics - Federal Canvas)

### **Architecture Summary**

```
Layer 1: Experience Layer (React Web/Mobile)
    ↓
Layer 2: Orchestration & Policy Layer (31 AI Agents + MCP)
    ↓
Layer 3: Service Layer (FastAPI Microservices)
    ↓
Layer 4: Data Layer (PostgreSQL, MongoDB, Neo4j, Redis, Vector DB, Kafka)
    +
Audit/Governance Plane (Blockchain, RBAC, Audit Logs)
```

### **Technology Stack**

**Backend:**

- Python 3.11+ (FastAPI, LangChain, Pydantic)

- PostgreSQL 15+ (relational data)

- MongoDB 7+ (document data)

- Neo4j 5+ (graph data)

- Redis 7+ (cache)

- Pinecone/Weaviate (vector database)

- Apache Kafka (event streaming)

**Frontend:**

- React 18+ with TypeScript

- Next.js 14+ (SSR/SSG)

- TailwindCSS (styling)

- i18next (Arabic/English)

- Recharts/D3.js (visualizations)

**Infrastructure:**

- Docker & Docker Compose

- Kubernetes (3 node pools)

- Nginx (API Gateway)

- Prometheus + Grafana (monitoring)

**AI/ML:**

- OpenAI GPT-4 / Anthropic Claude

- LangChain (agent framework)

- Sentence Transformers (embeddings)

- XGBoost/LightGBM (ML models)

---

## Phase 1: Infrastructure Setup

**Duration:** Days 1-3 (3 days)  
**Objective:** Set up Kubernetes, Docker, and project structure

### **Prompt 1.1: Initialize Project Structure**

```
Create a monorepo project structure for the NOOR Platform with the following layout:

noor-platform/
├── backend/
│   ├── services/
│   │   ├── employee-lifecycle/
│   │   ├── payroll-pensions/
│   │   ├── learning-assessment/
│   │   ├── emiratization-compliance/
│   │   ├── health-certification/
│   │   └── biometric-identity/
│   ├── agents/
│   │   ├── orchestrator/
│   │   ├── development/
│   │   ├── infrastructure/
│   │   ├── intelligence/
│   │   ├── content/
│   │   ├── specialized/
│   │   └── strategic/
│   ├── shared/
│   │   ├── models/
│   │   ├── utils/
│   │   └── config/
│   └── tests/
├── frontend/
│   ├── web/
│   ├── mobile/
│   └── shared/
├── infrastructure/
│   ├── docker/
│   ├── kubernetes/
│   └── terraform/
├── docs/
└── scripts/

Use Python for backend, TypeScript for frontend.
Include .gitignore, README.md, and LICENSE files.
Set up package managers (Poetry for Python, pnpm for Node.js).
```

**Expected Output:**

- Complete directory structure

- Initial configuration files

- Package manager setup

**Validation:**

- [ ] Directory structure matches specification

- [ ] .gitignore includes node_modules, **pycache**, .env

- [ ] README.md contains project overview

---

### **Prompt 1.2: Set Up Docker Development Environment**

```
Create a docker-compose.yml file for local development with the following services:

1. PostgreSQL 15 (port 5432)
   - Database: noor_db
   - User: noor_user
   - Password: (use environment variable)
   - Volumes for persistence

2. MongoDB 7 (port 27017)
   - Database: noor_mongo
   - Volumes for persistence

3. Neo4j 5 (port 7687 for Bolt, 7474 for HTTP)
   - Database: noor_graph
   - Volumes for persistence

4. Redis 7 (port 6379)
   - Volumes for persistence

5. Kafka (port 9092)
   - Zookeeper (port 2181)
   - Single broker for development

6. Nginx (port 80, 443)
   - API Gateway configuration
   - Reverse proxy for backend services

Include health checks for all services.
Use Docker networks to isolate services.
Create .env.example file with all required environment variables.
```

**Expected Output:**

- docker-compose.yml with all services

- .env.example file

- Dockerfile for each custom service

**Validation:**

- [ ] `docker-compose up` starts all services

- [ ] All health checks pass

- [ ] Services can communicate via Docker network

---

### **Prompt 1.3: Configure Kubernetes Manifests**

```
Create Kubernetes manifests for production deployment with 3 node pools:

**General-Purpose Pool:**
- Deployment: FastAPI services (employee-lifecycle, learning-assessment, emiratization-compliance)
- Deployment: Kafka brokers
- Deployment: Redis cache
- Service: API Gateway (Nginx Ingress)
- Service: Frontend (React web/mobile)

**GPU-Enabled Inference Pool:**
- Deployment: Radiant AI Agent (with GPU resources)
- Deployment: Mentor Matching Agent
- Deployment: Predictive Analytics Agent
- Deployment: Vector Database (Pinecone/Weaviate)
- Deployment: Scholar AI Agent

**High-Sensitivity Pool:**
- Deployment: Payroll & Pensions Service
- Deployment: Health Certification Service
- Deployment: Biometric Identity Service
- Deployment: Security Agent
- Deployment: Federal Intelligence Agent (dormant)

Create NetworkPolicies:
- General → GPU: ALLOWED
- General → High-Sensitivity: BLOCKED
- GPU → High-Sensitivity: BLOCKED
- High-Sensitivity → External APIs: ALLOWED via secure gateway

Include:
- ConfigMaps for configuration
- Secrets for sensitive data
- PersistentVolumeClaims for databases
- HorizontalPodAutoscaler (3-10 replicas)
- Ingress with TLS termination
```

**Expected Output:**

- kubernetes/ directory with all manifests

- NetworkPolicy definitions

- Ingress configuration with TLS

**Validation:**

- [ ] `kubectl apply -f kubernetes/` succeeds

- [ ] All pods reach Running state

- [ ] NetworkPolicies enforce isolation

- [ ] Ingress routes traffic correctly

---

## Phase 2: Database Layer

**Duration:** Days 4-7 (4 days)  
**Objective:** Deploy and configure all 6 database systems

### **Prompt 2.1: Design PostgreSQL Schema**

```
Create a PostgreSQL database schema for the NOOR Platform with the following tables:

**Users & Authentication:**
- users (id, uae_pass_id, email, phone, role, created_at, updated_at)
- user_profiles (user_id, first_name, last_name, date_of_birth, nationality, emirates_id, gender)
- user_biometric_metadata (user_id, facial_enrolled, voice_enrolled, enrollment_date)

**Employee Lifecycle:**
- employees (id, user_id, company_id, employee_number, hire_date, status, department, position)
- leave_requests (id, employee_id, leave_type, start_date, end_date, status, medical_cert_id, approved_by)
- relocations (id, employee_id, from_location, to_location, relocation_date, status)
- onboarding_tasks (id, employee_id, task_name, status, due_date, completed_date)

**Payroll & Pensions:**
- payroll_records (id, employee_id, period_start, period_end, gross_salary, net_salary, deductions, bonuses)
- pension_contributions (id, employee_id, period, employer_contribution, employee_contribution, scheme_type)
- gpssa_submissions (id, company_id, period, submission_date, status, total_contributions)

**Health & Wellness:**
- health_profiles (user_id, blood_type, allergies, chronic_conditions, emergency_contact_name, emergency_contact_phone)
- medical_certificates (id, user_id, issue_date, expiry_date, issuer, fit_status, certificate_hash)
- vaccinations (id, user_id, vaccine_name, dose_number, vaccination_date, verified)

**Learning & Development:**
- learning_pathways (id, user_id, pathway_name, target_role, progress, status)
- assessments (id, user_id, assessment_type, score, completion_date, biometric_verified)
- competencies (id, name, category, level, description)
- user_competencies (user_id, competency_id, proficiency_level, verified_date)

**Emiratization:**
- companies (id, trade_license, name, industry, employee_count, emiratization_target)
- emiratization_quotas (company_id, year, target_percentage, current_percentage, compliant)
- eqi_scores (company_id, period, score, rank, factors_json)

**Audit & Compliance:**
- audit_logs (id, user_id, action, resource_type, resource_id, timestamp, ip_address, user_agent)
- consent_records (id, user_id, data_type, purpose, granted_at, revoked_at, status)
- access_requests (id, requester_id, target_user_id, access_level, purpose, status, approved_by)

Use appropriate data types, indexes, foreign keys, and constraints.
Include triggers for audit logging.
Add row-level security policies for data zoning (L1/L2/L3).
```

**Expected Output:**

- SQL migration files (using Alembic)

- Database schema diagram

- Seed data for development

**Validation:**

- [ ] All tables created successfully

- [ ] Foreign key constraints work

- [ ] Indexes improve query performance

- [ ] Row-level security policies enforce access control

---

### **Prompt 2.2: Design MongoDB Collections**

```
Create MongoDB collections for the NOOR Platform:

**Engagement & Culture:**
- employee_engagement (employee_id, survey_responses, sentiment_scores, participation_rate, timestamp)
- performance_appraisals (employee_id, period, ratings, feedback, goals, reviewer_id, timestamp)
- work_life_balance (employee_id, metrics: {overtime_hours, pto_usage, flexibility_score}, timestamp)

**Content & Learning:**
- learning_content (content_id, title, description, type, duration, language, tags, created_by)
- user_learning_progress (user_id, content_id, progress_percentage, time_spent, last_accessed, completed)
- guilds (guild_id, name, description, members[], activities[], created_at)

**AI Agent Logs:**
- agent_interactions (agent_id, user_id, session_id, messages[], context, timestamp)
- agent_decisions (agent_id, decision_type, input_data, output_data, confidence_score, timestamp)
- agent_performance (agent_id, metric_name, value, period, timestamp)

Use appropriate indexes for query performance.
Implement TTL indexes for temporary data.
Add validation schemas for data integrity.
```

**Expected Output:**

- MongoDB collection definitions

- Index specifications

- Validation schemas

**Validation:**

- [ ] Collections created with proper schemas

- [ ] Indexes improve query performance

- [ ] Validation schemas enforce data integrity

---

### **Prompt 2.3: Design Neo4j Graph Schema**

```
Create a Neo4j graph database schema for the NOOR Platform:

**Nodes:**
- User (id, name, role)
- Competency (id, name, category, level)
- Role (id, title, seniority_level)
- Company (id, name, industry)
- LearningContent (id, title, type)
- Mentor (id, user_id, expertise_areas)

**Relationships:**
- (User)-[:HAS_COMPETENCY {proficiency_level, verified_date}]->(Competency)
- (User)-[:WORKS_AT {start_date, position}]->(Company)
- (User)-[:ASPIRES_TO]->(Role)
- (Role)-[:REQUIRES {min_proficiency}]->(Competency)
- (User)-[:COMPLETED {completion_date, score}]->(LearningContent)
- (LearningContent)-[:TEACHES]->(Competency)
- (User)-[:MENTORED_BY {start_date, status}]->(Mentor)
- (Mentor)-[:EXPERT_IN]->(Competency)

Create Cypher queries for:
1. Find skill gaps for a user aspiring to a role
2. Recommend learning content to fill skill gaps
3. Find mentors with required expertise
4. Calculate career pathway viability score
5. Identify talent pools with specific competencies

Include indexes on frequently queried properties.
```

**Expected Output:**

- Neo4j schema definition

- Cypher query library

- Index specifications

**Validation:**

- [ ] Graph schema created successfully

- [ ] Sample queries return expected results

- [ ] Indexes improve query performance

---

### **Prompt 2.4: Set Up Vector Database**

```
Set up a vector database (Pinecone or Weaviate) for the NOOR Platform:

**Collections/Indexes:**

1. **user_biometric_embeddings**
   - facial_embedding (512-dim vector from FaceNet)
   - voice_embedding (256-dim vector from SpeechBrain)
   - Metadata: user_id, enrollment_date, last_verified
   - Access control: L1 (Personal Zone only)

2. **job_skill_embeddings**
   - job_description_embedding (768-dim from Sentence Transformers)
   - required_skills_embedding (768-dim)
   - Metadata: job_id, company_id, posted_date, location

3. **user_skill_embeddings**
   - skills_profile_embedding (768-dim)
   - career_goals_embedding (768-dim)
   - Metadata: user_id, last_updated

4. **learning_content_embeddings**
   - content_embedding (768-dim)
   - Metadata: content_id, title, type, language, difficulty_level

Configure:
- Similarity metrics (cosine for semantic search, euclidean for biometric)
- Hybrid search (vector + metadata filtering)
- Encryption at rest (AES-256)
- Access control policies

Create functions for:
1. Enroll biometric embeddings
2. Verify biometric identity (>95% similarity threshold)
3. Semantic job matching
4. Content recommendation
```

**Expected Output:**

- Vector database configuration

- Index definitions

- Python SDK integration code

**Validation:**

- [ ] Indexes created successfully

- [ ] Similarity search returns relevant results

- [ ] Biometric verification achieves >95% accuracy

- [ ] Encryption enabled

---

### **Prompt 2.5: Configure Apache Kafka**

```
Set up Apache Kafka for event streaming in the NOOR Platform:

**Topics:**

1. **employee-lifecycle-events**
   - Partitions: 3
   - Replication: 3
   - Events: onboarding_started, leave_approved, relocation_completed, offboarding_initiated

2. **payroll-events**
   - Partitions: 3
   - Replication: 3
   - Events: payroll_processed, pension_contributed, deduction_applied

3. **learning-events**
   - Partitions: 5
   - Replication: 3
   - Events: assessment_completed, competency_verified, pathway_updated, content_consumed

4. **emiratization-events**
   - Partitions: 2
   - Replication: 3
   - Events: quota_updated, eqi_calculated, compliance_status_changed

5. **audit-events**
   - Partitions: 10
   - Replication: 3
   - Events: user_login, data_accessed, consent_granted, consent_revoked

6. **agent-coordination-events**
   - Partitions: 5
   - Replication: 3
   - Events: task_assigned, task_completed, agent_status_changed

Configure:
- Retention: 30 days for most topics, 7 years for audit-events
- Compression: snappy
- Consumer groups for each microservice
- Schema registry for event validation

Create producers and consumers in Python using confluent-kafka.
```

**Expected Output:**

- Kafka topic configurations

- Producer/consumer code templates

- Schema definitions (Avro)

**Validation:**

- [ ] All topics created successfully

- [ ] Producers can publish events

- [ ] Consumers can subscribe and process events

- [ ] Schema validation works

---

## Phase 3: Service Layer

**Duration:** Days 8-17 (10 days)  
**Objective:** Build all microservices and API endpoints

### **Prompt 3.1: Build Employee Lifecycle Service**

```
Create a FastAPI microservice for Employee Lifecycle Management:

**Endpoints:**

POST /api/v1/employees/onboard
- Input: employee_data (name, position, department, start_date, etc.)
- Process: Create employee record, assign onboarding tasks, emit onboarding_started event
- Output: employee_id, onboarding_checklist

POST /api/v1/leave/request
- Input: employee_id, leave_type, start_date, end_date, medical_certificate (optional)
- Process: 
  - If sick leave, validate medical certificate via Health Certification Service
  - Check leave balance
  - Create leave request record
  - Emit leave_requested event
- Output: leave_request_id, status

PUT /api/v1/leave/{leave_id}/approve
- Input: leave_id, approver_id
- Process: Update leave status, deduct from balance, emit leave_approved event
- Output: updated_leave_record

POST /api/v1/relocations
- Input: employee_id, from_location, to_location, relocation_date
- Process: Create relocation record, trigger relocation workflow
- Output: relocation_id

GET /api/v1/employees/{employee_id}/lifecycle
- Output: Complete lifecycle timeline (onboarding, leaves, relocations, promotions, offboarding)

Include:
- Pydantic models for request/response validation
- SQLAlchemy ORM for database operations
- Kafka producer for event emission
- Error handling and logging
- API documentation (OpenAPI/Swagger)
- Unit tests (pytest)
```

**Expected Output:**

- FastAPI service with all endpoints

- Database models

- Kafka integration

- Tests with >80% coverage

**Validation:**

- [ ] All endpoints return correct responses

- [ ] Database operations succeed

- [ ] Events published to Kafka

- [ ] Tests pass

---

### **Prompt 3.2: Build Payroll & Pensions Service**

```
Create a FastAPI microservice for Payroll & Pensions Management:

**Endpoints:**

POST /api/v1/payroll/process
- Input: company_id, period_start, period_end
- Process:
  - Calculate gross salary for all employees
  - Apply deductions (tax, pension, insurance)
  - Calculate net salary
  - Create payroll records
  - Emit payroll_processed event
- Output: payroll_summary (total_gross, total_deductions, total_net)

POST /api/v1/pensions/contribute
- Input: employee_id, period, employer_contribution, employee_contribution, scheme_type (GPSSA/ADPF/GCC)
- Process:
  - Create pension contribution record
  - Emit pension_contributed event
- Output: contribution_id

POST /api/v1/pensions/gpssa/submit
- Input: company_id, period
- Process:
  - Aggregate all GPSSA contributions for period
  - Generate submission file
  - Call GPSSA API to submit
  - Create submission record
- Output: submission_id, status

GET /api/v1/payroll/{employee_id}/history
- Output: Payroll history for employee

GET /api/v1/pensions/{employee_id}/balance
- Output: Total pension balance across all schemes

Include:
- Integration with GPSSA/ADPF APIs (mock for development)
- Secure handling of financial data
- Audit logging for all transactions
- Compliance validation (minimum wage, pension contribution rates)
```

**Expected Output:**

- FastAPI service with all endpoints

- GPSSA/ADPF API integration

- Compliance validation logic

- Audit logging

**Validation:**

- [ ] Payroll calculations are accurate

- [ ] Pension contributions match regulations

- [ ] GPSSA submissions succeed

- [ ] Audit logs capture all transactions

---

### **Prompt 3.3: Build Health Certification Service**

```
Create a FastAPI microservice for Health Certification Management:

**Endpoints:**

POST /api/v1/health/certificates/verify
- Input: certificate_id, issuer (SEHA/DHA/MOHAP)
- Process:
  - Call SEHA/DHA/MOHAP API to verify certificate authenticity
  - Extract fit/not-fit status
  - Store certificate record (hash only, not full medical data)
  - Return verification result
- Output: valid (boolean), fit_status, expiry_date

POST /api/v1/health/profiles/update
- Input: user_id, blood_type, allergies[], chronic_conditions[], emergency_contact
- Process:
  - Encrypt health data with user-scoped key (L1)
  - Store in health_profiles table
  - Emit health_profile_updated event
- Output: success

GET /api/v1/health/profiles/{user_id}
- Authorization: User can only access own profile (L1)
- Process: Decrypt and return health profile
- Output: health_profile

POST /api/v1/health/vaccinations/record
- Input: user_id, vaccine_name, dose_number, vaccination_date, certificate_hash
- Process:
  - Verify vaccination certificate with health authority
  - Store vaccination record
- Output: vaccination_id

**CRITICAL SECURITY:**
- Health data stored in L1 (Personal Zone) with user-scoped encryption
- Agents/Services only see fit/not-fit status, NOT full medical data
- Compliance with UAE health data protection standards
- Audit all access to health data
```

**Expected Output:**

- FastAPI service with all endpoints

- SEHA/DHA/MOHAP API integration (mock for development)

- User-scoped encryption for health data

- Strict access control (L1 only)

**Validation:**

- [ ] Certificate verification works

- [ ] Health data encrypted at rest

- [ ] Access control enforced (users can only access own data)

- [ ] Audit logs capture all access

---

### **Prompt 3.4: Build Biometric Identity Service**

```
Create a FastAPI microservice for Biometric Identity Verification:

**Endpoints:**

POST /api/v1/biometric/enroll/facial
- Input: user_id, facial_image (base64)
- Process:
  - Process image locally (extract features using FaceNet)
  - Generate 512-dim embedding
  - Encrypt embedding with user-scoped key
  - Store in vector database (L1)
  - Delete raw image immediately
  - Emit biometric_enrolled event
- Output: enrollment_id, success

POST /api/v1/biometric/enroll/voice
- Input: user_id, voice_sample (base64 audio)
- Process:
  - Process audio locally (extract features using SpeechBrain)
  - Generate 256-dim embedding
  - Encrypt embedding with user-scoped key
  - Store in vector database (L1)
  - Delete raw audio immediately
  - Emit biometric_enrolled event
- Output: enrollment_id, success

POST /api/v1/biometric/verify/facial
- Input: user_id, facial_image (base64)
- Process:
  - Generate embedding from image
  - Query vector database for user's stored embedding
  - Calculate cosine similarity
  - If similarity > 95%, return verified=True
  - Log verification attempt (audit)
  - Delete raw image immediately
- Output: verified (boolean), confidence_score

POST /api/v1/biometric/verify/voice
- Input: user_id, voice_sample (base64 audio)
- Process: Similar to facial verification
- Output: verified (boolean), confidence_score

**CRITICAL SECURITY:**
- NO raw biometric data stored (only embeddings)
- Local processing (no transmission of raw biometrics to external services)
- User-scoped encryption (L1)
- Embeddings stored in vector database with strict access control
- Audit all verification attempts
- False Acceptance Rate (FAR) < 0.1%
```

**Expected Output:**

- FastAPI service with all endpoints

- FaceNet/SpeechBrain integration for embedding generation

- Vector database integration

- Strict security controls

**Validation:**

- [ ] Enrollment succeeds and stores embeddings

- [ ] Verification achieves >95% accuracy

- [ ] No raw biometric data stored

- [ ] FAR < 0.1%

- [ ] Audit logs capture all attempts

---

### **Prompt 3.5: Build Learning & Assessment Service**

```
Create a FastAPI microservice for Learning & Assessment Management:

**Endpoints:**

POST /api/v1/assessments/start
- Input: user_id, assessment_type
- Process:
  - Verify user identity via Biometric Service (facial + voice)
  - If verified, create assessment session
  - Generate assessment questions
  - Emit assessment_started event
- Output: session_id, questions[]

POST /api/v1/assessments/{session_id}/submit
- Input: session_id, answers[]
- Process:
  - Verify session is active
  - Score assessment
  - Update user competencies based on results
  - Emit assessment_completed event
- Output: score, competencies_updated[]

POST /api/v1/learning/pathways/create
- Input: user_id, target_role
- Process:
  - Query Neo4j for skill gaps (current competencies vs. role requirements)
  - Generate learning pathway with recommended content
  - Store pathway
- Output: pathway_id, skill_gaps[], recommended_content[]

GET /api/v1/learning/recommendations/{user_id}
- Process:
  - Get user's current competencies from Neo4j
  - Get user's learning goals
  - Query vector database for similar content
  - Rank by relevance
- Output: recommended_content[]

POST /api/v1/competencies/verify
- Input: user_id, competency_id, evidence (certificate, assessment_score, etc.)
- Process:
  - Validate evidence
  - Update Neo4j graph (User)-[:HAS_COMPETENCY]->(Competency)
  - Emit competency_verified event
- Output: verification_id

Include:
- Integration with Biometric Service for anti-fraud
- Neo4j integration for competency graph
- Vector database for content recommendations
- Assessment scoring algorithms
```

**Expected Output:**

- FastAPI service with all endpoints

- Biometric verification integration

- Neo4j graph queries

- Vector database integration

**Validation:**

- [ ] Assessments require biometric verification

- [ ] Scoring algorithms are accurate

- [ ] Learning pathways identify correct skill gaps

- [ ] Recommendations are relevant

---

### **Prompt 3.6: Build Emiratization Compliance Service**

```
Create a FastAPI microservice for Emiratization Compliance Management:

**Endpoints:**

POST /api/v1/emiratization/quotas/update
- Input: company_id, year, target_percentage
- Process:
  - Calculate current Emirati percentage
  - Update quota record
  - Check compliance status
  - Emit quota_updated event
- Output: current_percentage, target_percentage, compliant (boolean)

POST /api/v1/emiratization/eqi/calculate
- Input: company_id, period
- Process:
  - Calculate Emiratization Quality Index based on:
    - Emirati headcount percentage
    - Emirati in leadership positions
    - Salary parity (Emirati vs. non-Emirati)
    - Retention rate
    - Training investment in Emiratis
  - Store EQI score
  - Emit eqi_calculated event
- Output: eqi_score, rank, breakdown{}

GET /api/v1/emiratization/companies/{company_id}/status
- Output: Current emiratization status, quota, EQI score, compliance

GET /api/v1/emiratization/federal/dashboard
- Authorization: L4 (Federal Analysts only)
- Process:
  - Aggregate emiratization data across all companies
  - Apply differential privacy (k ≥ 100, ε ≤ 1.0)
  - Return national-level statistics
- Output: national_emiratization_rate, industry_breakdown, top_performers

**Compliance Rules:**
- Validate against UAE Emiratization regulations
- Ensure data privacy for L3 (Federal) aggregates
- Audit all access to emiratization data
```

**Expected Output:**

- FastAPI service with all endpoints

- EQI calculation algorithm

- Differential privacy implementation for L3

- Compliance validation

**Validation:**

- [ ] EQI calculations match specifications

- [ ] Federal dashboard applies differential privacy

- [ ] Compliance rules enforced

- [ ] Audit logs capture all access

---

## Phase 4: Agent Orchestration Layer

**Duration:** Days 18-24 (7 days)  
**Objective:** Deploy all 31 AI agents and MCP communication

### **Prompt 4.1: Build Master Orchestrator Agent**

```
Create the Master Orchestrator Agent using LangChain:

**Capabilities:**
1. Task decomposition (break down high-level goals into subtasks)
2. Task assignment (route subtasks to appropriate Category Orchestrators)
3. Progress monitoring (track task completion across all agents)
4. Conflict resolution (handle conflicting agent outputs)
5. Human-in-the-loop coordination (escalate to humans when needed)

**Architecture:**
- LLM: GPT-4 or Claude 3.5 Sonnet
- Memory: Conversation buffer + summary memory
- Tools:
  - MCP message sender (to communicate with Category Orchestrators)
  - Task tracker (PostgreSQL)
  - Human approval requester

**MCP Protocol:**
- Message types: REQUEST, RESPONSE, NOTIFICATION, ERROR
- Message format: {type, sender, receiver, payload, timestamp, correlation_id}

**Operating Modes:**
1. Planning Mode: Decompose goals, create execution plan
2. Coordination Mode: Assign tasks, monitor progress
3. Reflection Mode: Analyze outcomes, learn from failures

**Example Workflow:**
1. Receive high-level goal: "Build Skills Passport feature"
2. Decompose into subtasks:
   - Design UI/UX (assign to AURORA via Al-Kindi)
   - Build frontend (assign to Frontend Agent via Al-Kindi)
   - Build backend API (assign to Backend Agent via Al-Kindi)
   - Design database schema (assign to Database Agent via Al-Farabi)
   - Write tests (assign to QA Agent via Al-Kindi)
3. Monitor progress via MCP messages
4. Handle blockers and conflicts
5. Validate completion criteria
6. Report to human stakeholders

Implement:
- LangChain agent with custom tools
- MCP message handling
- Task tracking database
- Logging and monitoring
- Unit tests
```

**Expected Output:**

- Master Orchestrator agent code

- MCP protocol implementation

- Task tracking system

- Tests

**Validation:**

- [ ] Agent can decompose complex goals

- [ ] MCP messages sent/received correctly

- [ ] Task tracking works

- [ ] Human-in-the-loop escalation works

---

### **Prompt 4.2: Build Category Orchestrators (6 Agents)**

```
Create 6 Category Orchestrator Agents (Al-Kindi, Al-Farabi, Ibn Sina, Ibn Rushd, Al-Ghazali, Ibn Khaldun):

**Shared Architecture:**
- LLM: GPT-4 or Claude 3.5 Sonnet
- Memory: Conversation buffer
- MCP integration for communication with Master Orchestrator and execution agents

**Al-Kindi (Development - 11 agents):**
- Coordinates: AURORA, Frontend, Backend, Database, Security, QA, DevOps, Documentation, Data Science, API Integration, Mobile
- Specialization: Software development workflows
- Tools: Git operations, code review, deployment triggers

**Al-Farabi (Infrastructure - 3 agents):**
- Coordinates: Database Management, Monitoring, Cost Optimization
- Specialization: Infrastructure management and optimization
- Tools: Kubernetes API, database admin tools, cost analysis

**Ibn Sina (Intelligence - 4 agents):**
- Coordinates: Scholar AI, Radiant AI, Mentor Matching, Predictive Analytics
- Specialization: AI/ML model coordination and insights
- Tools: Model training triggers, inference APIs, data pipelines

**Ibn Rushd (Content - 3 agents):**
- Coordinates: Content Creation, Translation, Competency Library
- Specialization: Content management and localization
- Tools: CMS APIs, translation services, content validation

**Al-Ghazali (Specialized - 4 agents):**
- Coordinates: Assessment Management, Guild Management, Token Economy, Emiratization Compliance
- Specialization: Domain-specific business logic
- Tools: Assessment engines, blockchain APIs, compliance validators

**Ibn Khaldun (Strategic - 5 agents):**
- Coordinates: HR Analytics, Talent Intelligence, L&D, Culture & Engagement, Federal Intelligence (dormant)
- Specialization: Strategic insights and analytics
- Tools: Analytics dashboards, predictive models, reporting engines

Each Category Orchestrator:
1. Receives tasks from Master Orchestrator
2. Assigns subtasks to execution agents
3. Monitors execution agent progress
4. Aggregates results
5. Reports back to Master Orchestrator

Implement using LangChain with custom tools for each category.
```

**Expected Output:**

- 6 Category Orchestrator agents

- MCP integration for each

- Category-specific tools

- Tests

**Validation:**

- [ ] Each orchestrator can coordinate its agents

- [ ] MCP communication works bidirectionally

- [ ] Task assignment logic is correct

- [ ] Tests pass

---

### **Prompt 4.3: Build Execution Agents (31 Agents - Part 1: Development)**

```
Create the 11 Development Execution Agents coordinated by Al-Kindi:

**1. AURORA (UI/UX Designer Agent):**
- Capabilities: Design mockups, create component specifications, ensure brand consistency
- Tools: Figma API, design system reference, accessibility checker
- Input: Feature requirements
- Output: UI/UX designs, component specs

**2. Frontend Agent:**
- Capabilities: Build React components, implement responsive design, optimize performance
- Tools: React, TypeScript, TailwindCSS, i18next
- Input: UI/UX designs from AURORA
- Output: Frontend code

**3. Backend Agent:**
- Capabilities: Build FastAPI endpoints, implement business logic, optimize queries
- Tools: FastAPI, SQLAlchemy, Pydantic
- Input: API specifications
- Output: Backend code

**4. Database Agent:**
- Capabilities: Design schemas, create migrations, optimize queries
- Tools: PostgreSQL, MongoDB, Neo4j, Alembic
- Input: Data requirements
- Output: Database schemas, migrations

**5. Security Agent:**
- Capabilities: Scan for vulnerabilities, implement authentication, ensure compliance
- Tools: Bandit, OWASP ZAP, JWT libraries
- Input: Code to scan
- Output: Security reports, fixes

**6. QA Agent:**
- Capabilities: Write tests, run test suites, report bugs
- Tools: pytest, Playwright, coverage.py
- Input: Code to test
- Output: Test reports, bug reports

**7. DevOps Agent:**
- Capabilities: Build CI/CD pipelines, manage deployments, monitor infrastructure
- Tools: GitHub Actions, Docker, Kubernetes, Terraform
- Input: Deployment requirements
- Output: CI/CD configs, deployment scripts

**8. Documentation Agent:**
- Capabilities: Write technical documentation, generate API docs, create user guides
- Tools: MkDocs, OpenAPI generator
- Input: Code, features
- Output: Documentation

**9. Data Science Agent:**
- Capabilities: Build ML models, analyze data, create visualizations
- Tools: scikit-learn, XGBoost, pandas, matplotlib
- Input: Data, problem statement
- Output: ML models, analysis reports

**10. API Integration Agent:**
- Capabilities: Integrate external APIs, handle authentication, manage rate limits
- Tools: requests, httpx, OAuth libraries
- Input: API specifications
- Output: Integration code

**11. Mobile Agent:**
- Capabilities: Build React Native apps, optimize for mobile, handle platform-specific features
- Tools: React Native, Expo
- Input: Mobile requirements
- Output: Mobile app code

Each agent:
- Receives tasks via MCP from Al-Kindi
- Executes using appropriate tools
- Reports results via MCP
- Logs all actions for audit

Implement using LangChain with tool-calling capabilities.
```

**Expected Output:**

- 11 Development execution agents

- Tool integrations for each

- MCP communication

- Tests

**Validation:**

- [ ] Each agent can execute its specialized tasks

- [ ] Tool integrations work

- [ ] MCP communication works

- [ ] Tests pass

---

### **Prompt 4.4: Build Execution Agents (31 Agents - Part 2: Infrastructure, Intelligence, Content)**

```
Create the remaining 10 execution agents (Infrastructure: 3, Intelligence: 4, Content: 3):

**Infrastructure Agents (Al-Farabi):**

**1. Database Management & Streaming Agent:**
- Capabilities: Manage databases, configure Kafka, optimize data flows
- Tools: PostgreSQL admin, MongoDB admin, Kafka admin, Redis CLI
- Tasks: Database backups, replication, sharding, Kafka topic management

**2. Monitoring & Observability Agent:**
- Capabilities: Set up monitoring, create dashboards, alert on anomalies
- Tools: Prometheus, Grafana, ELK stack
- Tasks: Configure metrics, create dashboards, set up alerts

**3. Cost Optimization Agent:**
- Capabilities: Analyze resource usage, recommend optimizations, implement cost-saving measures
- Tools: Kubernetes metrics, cloud billing APIs
- Tasks: Identify underutilized resources, right-size pods, optimize storage

**Intelligence Agents (Ibn Sina):**

**1. Scholar AI Agent:**
- Capabilities: Research new AI techniques, learn from academic papers, report findings
- Tools: arXiv API, Google Scholar API, paper summarization
- Tasks: Research predictive models, human psychology, AI advancements

**2. Radiant AI Agent:**
- Capabilities: Provide career guidance, personality insights, personalized recommendations
- Tools: GPT-4, personality assessment models, career pathway database
- Tasks: Chat with users, recommend career paths, provide mentorship

**3. Mentor Matching Intelligence Agent:**
- Capabilities: Match mentees with mentors based on skills, goals, availability
- Tools: Neo4j queries, similarity algorithms
- Tasks: Find optimal mentor matches, track mentorship relationships

**4. Predictive Analytics Agent:**
- Capabilities: Forecast workforce trends, predict turnover, estimate skill demand
- Tools: XGBoost, time series models, pandas
- Tasks: Build predictive models, generate forecasts, create reports

**Content Agents (Ibn Rushd):**

**1. Content Creation Agent:**
- Capabilities: Generate learning content, create assessments, write articles
- Tools: GPT-4, content templates
- Tasks: Create learning modules, write blog posts, generate quizzes

**2. Translation Agent:**
- Capabilities: Translate content between Arabic and English, ensure cultural appropriateness
- Tools: GPT-4, translation APIs, cultural context database
- Tasks: Translate UI text, learning content, documentation

**3. Competency Library Agent:**
- Capabilities: Curate competency frameworks, map skills to roles, maintain taxonomy
- Tools: Neo4j, competency databases, industry standards
- Tasks: Update competency library, map skills to roles, validate competencies

Implement each with LangChain and appropriate tools.
```

**Expected Output:**

- 10 execution agents (Infrastructure, Intelligence, Content)

- Tool integrations

- MCP communication

- Tests

**Validation:**

- [ ] Each agent performs specialized tasks correctly

- [ ] Tool integrations work

- [ ] MCP communication works

- [ ] Tests pass

---

### **Prompt 4.5: Build Execution Agents (31 Agents - Part 3: Specialized, Strategic)**

```
Create the final 11 execution agents (Specialized: 4, Strategic: 5, Federal Intelligence: 1):

**Specialized Agents (Al-Ghazali):**

**1. Assessment Management Agent:**
- Capabilities: Generate assessments, score responses, prevent fraud via biometric verification
- Tools: Biometric Service API, question banks, scoring algorithms
- Tasks: Create assessments, verify identity, score submissions

**2. Guild Management Agent:**
- Capabilities: Manage professional guilds, coordinate activities, track engagement
- Tools: MongoDB (guilds collection), event scheduling
- Tasks: Create guilds, schedule events, track participation

**3. Token Economy Agent:**
- Capabilities: Manage NOOR tokens, reward achievements, track balances
- Tools: Blockchain API, smart contracts
- Tasks: Issue tokens, process transactions, maintain ledger

**4. Emiratization Compliance Agent:**
- Capabilities: Monitor compliance, calculate EQI, generate reports
- Tools: Emiratization Service API, compliance rules engine
- Tasks: Check quotas, calculate EQI, flag non-compliance

**Strategic Agents (Ibn Khaldun):**

**1. HR Analytics & Insights Agent:**
- Capabilities: Analyze HR data, generate insights, create dashboards
- Tools: PostgreSQL, MongoDB, pandas, Plotly
- Tasks: Workforce analytics, turnover analysis, compensation benchmarking

**2. Talent Intelligence Agent:**
- Capabilities: Match candidates to jobs, recommend career paths, identify talent pools
- Tools: Neo4j, vector database, matching algorithms
- Tasks: Job matching, career recommendations, talent segmentation

**3. Learning & Development Agent:**
- Capabilities: Curate learning pathways, track progress, recommend content
- Tools: Learning Service API, Neo4j, vector database
- Tasks: Create pathways, track completion, recommend content

**4. Culture & Engagement Agent:**
- Capabilities: Analyze engagement data, provide culture insights, validate health certificates
- Tools: MongoDB (engagement collection), SEHA/DHA APIs, sentiment analysis
- Tasks: Engagement surveys, culture reports, sick leave validation

**5. Federal Intelligence Agent (DORMANT):**
- Capabilities: Aggregate national workforce data, generate policy insights, predict trends
- Tools: Differential privacy library, aggregation pipelines, forecasting models
- Tasks: National workforce analytics, policy simulations, ESG impact analysis
- **Status:** DORMANT until post-MVP, requires Cabinet authorization to activate
- **Access Control:** Only NOOR founders, UAE Ministers, Cabinet members can activate

Implement with strict access controls for Federal Intelligence Agent.
```

**Expected Output:**

- 11 execution agents (Specialized, Strategic, Federal Intelligence)

- Federal Intelligence Agent with activation controls

- Tool integrations

- MCP communication

- Tests

**Validation:**

- [ ] Each agent performs tasks correctly

- [ ] Federal Intelligence Agent is dormant and cannot be activated without authorization

- [ ] Tool integrations work

- [ ] Tests pass

---

## Phase 5: Experience Layer (Frontend)

**Duration:** Days 25-31 (7 days)  
**Objective:** Build web and mobile frontends with bilingual support

### **Prompt 5.1: Build Skills Passport (Individual Layer)**

```
Create the Skills Passport web application using Next.js 14+ and React 18+:

**Pages:**

1. **Dashboard** (`/dashboard`)
   - User profile summary
   - Competency radar chart
   - Learning progress
   - Radiant AI chat widget
   - Health & wellness summary

2. **Competencies** (`/competencies`)
   - List of verified competencies with proficiency levels
   - Skill gap analysis (current vs. target role)
   - Recommended learning content
   - Competency verification upload

3. **Learning Pathways** (`/learning`)
   - Active pathways with progress bars
   - Recommended content (courses, articles, videos)
   - Assessment history
   - Certificates and badges

4. **Career Pathways** (`/career`)
   - Target role selection
   - Career viability score
   - Mentor matching
   - Job recommendations

5. **Health & Wellness** (`/health`)
   - Health profile (allergies, blood type, emergency contacts)
   - Vaccination records
   - Medical certificates
   - Work-life balance metrics

6. **Radiant AI** (`/radiant`)
   - Full-page chat interface with Radiant AI
   - Personality insights
   - Career guidance
   - Personalized recommendations

7. **Token Wallet** (`/tokens`)
   - NOOR token balance
   - Transaction history
   - Rewards and achievements

**Features:**
- Bilingual support (Arabic/English) using i18next
- Responsive design (mobile-first)
- Dark mode support
- Accessibility (WCAG 2.1 AA)
- Biometric authentication for assessments
- Real-time updates via WebSockets

**Tech Stack:**
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- TailwindCSS
- Recharts/D3.js for visualizations
- i18next for localization
- Socket.io for real-time updates

Implement with NOOR brand colors and typography (Space Mono + Hammersmith One).
```

**Expected Output:**

- Complete Skills Passport web app

- All pages implemented

- Bilingual support

- Responsive design

- Tests (Jest + React Testing Library)

**Validation:**

- [ ] All pages render correctly

- [ ] Bilingual switching works

- [ ] Responsive on mobile/tablet/desktop

- [ ] Accessibility standards met

- [ ] Tests pass

---

### **Prompt 5.2: Build Institutional HCM Suite (Institutional Layer)**

```
Create the Institutional HCM Suite web application:

**Pages:**

1. **HR Dashboard** (`/hr/dashboard`)
   - Workforce overview (headcount, demographics)
   - Emiratization status and EQI score
   - Leave requests pending approval
   - Onboarding tasks
   - Payroll summary

2. **Employee Lifecycle** (`/hr/employees`)
   - Employee directory with search/filter
   - Employee profiles
   - Onboarding workflows
   - Leave management
   - Relocation tracking
   - Offboarding

3. **Payroll & Pensions** (`/hr/payroll`)
   - Payroll processing interface
   - Pension contributions
   - GPSSA/ADPF submissions
   - Payroll reports

4. **Learning & Development** (`/hr/learning`)
   - Learning pathways for employees
   - Assessment results
   - Competency gap analysis
   - Training budget tracking

5. **Emiratization** (`/hr/emiratization`)
   - Quota tracking
   - EQI dashboard
   - Compliance status
   - Emiratization initiatives

6. **Performance Management** (`/hr/performance`)
   - Performance appraisal cycles
   - Goal setting and tracking
   - 360-degree feedback
   - Performance reports

7. **Engagement & Culture** (`/hr/engagement`)
   - Engagement survey results
   - Sentiment analysis
   - Work-life balance metrics
   - Culture initiatives

**Access Control:**
- L2 (Institutional Restricted): HR Managers see team/entity data
- L3 (Institutional Executive): CXOs see entity-wide aggregates
- Require MFA for all users

**Features:**
- Approval workflows for leave, payroll, etc.
- Export to Excel/PDF
- Audit trail viewer
- Real-time notifications

Implement with NOOR brand design system.
```

**Expected Output:**

- Complete HCM Suite web app

- All pages implemented

- Access control enforced

- MFA integration

- Tests

**Validation:**

- [ ] All pages render correctly

- [ ] Access control works (L2/L3)

- [ ] MFA required for login

- [ ] Approval workflows function

- [ ] Tests pass

---

### **Prompt 5.3: Build Federal Canvas (Federal Layer)**

```
Create the Federal Canvas web application for national workforce analytics:

**Pages:**

1. **National Workforce View** (`/federal/workforce`)
   - Total workforce size (aggregated, anonymized)
   - Demographics (age, gender, nationality) - differential privacy applied
   - Industry distribution
   - Geographic distribution

2. **Emiratization Dashboard** (`/federal/emiratization`)
   - National emiratization rate
   - Industry-level emiratization rates
   - Top-performing companies (EQI leaderboard)
   - Compliance trends

3. **Labor Market Analytics** (`/federal/labor-market`)
   - Skill demand forecasting
   - Talent supply analysis
   - Wage trends (aggregated)
   - Job vacancy trends

4. **Policy Simulator** (`/federal/policy-simulator`)
   - Simulate policy changes (e.g., increase emiratization quota)
   - Predict impact on workforce
   - Scenario analysis

5. **ESG Impact Dashboard** (`/federal/esg`)
   - Environmental impact metrics
   - Social impact metrics (diversity, inclusion)
   - Governance metrics (compliance, transparency)

**Access Control:**
- L4 (Federal Analysts): FAHR, MOHRE, NAFIS analysts
- Require Cabinet Office approval for access
- All data aggregated with differential privacy (k ≥ 100, ε ≤ 1.0)
- NO PII, NO biometrics, NO payroll-line data, NO medical data

**Features:**
- Interactive charts and maps
- Export to PDF for reports
- Audit trail for all access
- Federal Intelligence Agent integration (when activated)

**CRITICAL:**
- Implement differential privacy for all aggregates
- Ensure k-anonymity (k ≥ 100)
- Log all access to federal data

Implement with NOOR brand design system.
```

**Expected Output:**

- Complete Federal Canvas web app

- All pages implemented

- Differential privacy applied

- Access control enforced

- Tests

**Validation:**

- [ ] All pages render correctly

- [ ] Differential privacy applied to all aggregates

- [ ] k-anonymity enforced (k ≥ 100)

- [ ] Access control works (L4)

- [ ] Audit logs capture all access

- [ ] Tests pass

---

### **Prompt 5.4: Build Mobile App (React Native)**

```
Create the NOOR mobile app using React Native:

**Screens:**

1. **Onboarding**
   - Biometric enrollment (facial + voice)
   - UAE Pass authentication
   - Profile setup

2. **Home**
   - Quick stats (competencies, learning progress, tokens)
   - Radiant AI chat widget
   - Notifications

3. **Skills Passport**
   - Competencies list
   - Learning pathways
   - Certificates

4. **Radiant AI Chat**
   - Full-screen chat with Radiant AI
   - Voice input support
   - Personality insights

5. **Assessments**
   - Take assessments with biometric verification
   - View results
   - Certificate download

6. **Health & Wellness**
   - Health profile
   - Vaccination records
   - Medical certificates upload

7. **Notifications**
   - Push notifications for important events
   - In-app notification center

**Features:**
- Biometric authentication (Face ID / Touch ID)
- Offline mode for viewing profile
- Push notifications
- Camera integration for biometric enrollment
- Microphone integration for voice enrollment
- Arabic/English support

**Tech Stack:**
- React Native
- Expo
- TypeScript
- React Navigation
- Async Storage
- Expo Camera
- Expo Audio

Implement with NOOR brand design system (mobile-optimized).
```

**Expected Output:**

- Complete React Native mobile app

- All screens implemented

- Biometric enrollment

- Offline mode

- Tests (Jest + React Native Testing Library)

**Validation:**

- [ ] All screens render correctly

- [ ] Biometric enrollment works

- [ ] Offline mode functions

- [ ] Push notifications work

- [ ] Tests pass

---

## Phase 6: Integration & Security

**Duration:** Days 32-36 (5 days)  
**Objective:** Integrate external APIs and implement security measures

### **Prompt 6.1: Implement UAE Pass Authentication**

```
Integrate UAE Pass OAuth 2.0 authentication:

**Requirements:**
- OAuth 2.0 authorization code flow
- PKCE (Proof Key for Code Exchange) for security
- Redirect URI: https://noor.ae/auth/callback
- Scopes: profile, email, phone, emirates_id

**Implementation:**
1. Create OAuth client registration with UAE Pass
2. Implement authorization flow:
   - Redirect user to UAE Pass login
   - Receive authorization code
   - Exchange code for access token
   - Fetch user profile from UAE Pass
   - Create or update user in NOOR database
   - Issue JWT for NOOR session
3. Implement token refresh
4. Handle errors (user cancellation, invalid token, etc.)

**Backend (FastAPI):**
- Endpoint: POST /api/v1/auth/uae-pass/login
- Endpoint: POST /api/v1/auth/uae-pass/callback
- Endpoint: POST /api/v1/auth/refresh
- Endpoint: POST /api/v1/auth/logout

**Frontend:**
- Login button redirects to UAE Pass
- Callback page handles OAuth response
- Store JWT in httpOnly cookie
- Implement token refresh logic

**Security:**
- Use PKCE to prevent authorization code interception
- Validate state parameter to prevent CSRF
- Store tokens securely (httpOnly cookies)
- Implement token expiration and refresh

Include unit tests and integration tests.
```

**Expected Output:**

- UAE Pass OAuth integration (backend + frontend)

- Token management

- Tests

**Validation:**

- [ ] Login flow works end-to-end

- [ ] User profile fetched from UAE Pass

- [ ] JWT issued and stored securely

- [ ] Token refresh works

- [ ] Tests pass

---

### **Prompt 6.2: Implement Multi-Factor Authentication (MFA)**

```
Implement Multi-Factor Authentication for L2+ users (HR Managers, CXOs, Federal Analysts):

**MFA Methods:**
1. SMS OTP (primary)
2. Email OTP (backup)
3. Authenticator app (TOTP) - optional

**Flow:**
1. User logs in with UAE Pass
2. System checks user role
3. If L2+, require MFA:
   - Send OTP via SMS
   - User enters OTP
   - Validate OTP
   - Issue session token
4. If MFA fails 3 times, lock account for 15 minutes

**Backend (FastAPI):**
- Endpoint: POST /api/v1/auth/mfa/send-otp
- Endpoint: POST /api/v1/auth/mfa/verify-otp
- Endpoint: POST /api/v1/auth/mfa/setup-totp
- Endpoint: POST /api/v1/auth/mfa/verify-totp

**Frontend:**
- MFA setup page for first-time users
- OTP input page
- Resend OTP button
- Backup method selection

**Security:**
- OTP expires after 5 minutes
- Rate limit OTP requests (max 3 per hour)
- Lock account after 3 failed attempts
- Log all MFA attempts for audit

**Target:** 99.9% MFA adoption for L2+ users

Include unit tests and integration tests.
```

**Expected Output:**

- MFA implementation (backend + frontend)

- SMS/Email OTP integration

- TOTP support

- Tests

**Validation:**

- [ ] MFA required for L2+ users

- [ ] OTP sent and verified correctly

- [ ] Account lockout works after 3 failed attempts

- [ ] Tests pass

---

### **Prompt 6.3: Implement Row-Level Security (RLS) for Data Zoning**

```
Implement Row-Level Security in PostgreSQL for L1/L2/L3 data zoning:

**L1 (Personal Zone):**
- Users can only access their own data
- Policy: `user_id = current_user_id()`

**L2 (Institutional Zone):**
- HR Managers can access data for employees in their company/department
- Policy: `company_id IN (SELECT company_id FROM user_companies WHERE user_id = current_user_id())`

**L3 (Federal Zone):**
- Federal Analysts can only access aggregated data (no individual records)
- Implement via views with aggregation and differential privacy

**Implementation:**

1. Enable RLS on all sensitive tables:
```sql
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_records ENABLE ROW LEVEL SECURITY;
```

1. Create policies for each access level:

```sql
-- L1: Personal Zone
CREATE POLICY personal_zone ON employees
  FOR ALL
  TO authenticated_users
  USING (user_id = current_setting('app.current_user_id')::uuid);

-- L2: Institutional Zone
CREATE POLICY institutional_zone ON employees
  FOR ALL
  TO hr_managers
  USING (company_id IN (
    SELECT company_id FROM user_companies 
    WHERE user_id = current_setting('app.current_user_id')::uuid
  ));

-- L3: Federal Zone (via views only, no direct table access)
CREATE VIEW federal_workforce_aggregates AS
SELECT 
  industry,
  COUNT(*) as employee_count,
  AVG(salary) as avg_salary
FROM employees
WHERE COUNT(*) >= 100  -- k-anonymity
GROUP BY industry;
```

1. Set current_user_id in application context:

```python
@app.middleware("http")
async def set_user_context(request: Request, call_next):
    user_id = get_user_id_from_jwt(request)
    async with db.begin():
        await db.execute(f"SET app.current_user_id = '{user_id}'")
        response = await call_next(request)
    return response
```

1. Test RLS policies:

- Verify users can only access their own data (L1)

- Verify HR Managers can access company data (L2)

- Verify Federal Analysts can only access aggregates (L3)

Include unit tests for each policy.

```

**Expected Output:**
- RLS policies for all sensitive tables
- Application middleware to set user context
- Tests for each access level

**Validation:**
- [ ] L1 users can only access own data
- [ ] L2 users can access company data
- [ ] L3 users can only access aggregates
- [ ] Tests pass

---

### **Prompt 6.4: Implement Differential Privacy for Federal Aggregates**
```

Implement differential privacy for L3 (Federal) data aggregates:

**Requirements:**

- Privacy budget: ε ≤ 1.0 (epsilon)

- K-anonymity: k ≥ 100 (minimum group size)

- Laplace mechanism for noise addition

**Implementation:**

1. Install differential privacy library:

```bash
pip install diffprivlib
```

1. Create differential privacy utility functions:

```python
from diffprivlib.mechanisms import Laplace
from diffprivlib.tools import mean, count

def dp_count(data, epsilon=1.0):
    """Count with differential privacy"""
    return count(data, epsilon=epsilon)

def dp_mean(data, epsilon=1.0, bounds=(0, 1000000)):
    """Mean with differential privacy"""
    return mean(data, epsilon=epsilon, bounds=bounds)

def enforce_k_anonymity(df, group_by_cols, k=100):
    """Ensure minimum group size of k"""
    grouped = df.groupby(group_by_cols).size()
    valid_groups = grouped[grouped >= k].index
    return df[df.set_index(group_by_cols).index.isin(valid_groups)]
```

1. Apply to federal queries:

```python
@router.get("/api/v1/federal/workforce/industry-stats")
async def get_industry_stats(db: Session = Depends(get_db)):
    # Get aggregated data
    query = """
    SELECT industry, COUNT(*) as count, AVG(salary) as avg_salary
    FROM employees
    GROUP BY industry
    """
    df = pd.read_sql(query, db)
    
    # Enforce k-anonymity
    df = enforce_k_anonymity(df, ['industry'], k=100)
    
    # Apply differential privacy
    df['count'] = df['count'].apply(lambda x: dp_count([x] * int(x), epsilon=0.5))
    df['avg_salary'] = df['avg_salary'].apply(lambda x: dp_mean([x], epsilon=0.5, bounds=(0, 1000000)))
    
    return df.to_dict('records')
```

1. Test differential privacy:

- Verify noise is added to aggregates

- Verify k-anonymity is enforced

- Verify privacy budget (ε) is not exceeded

Include unit tests.

```

**Expected Output:**
- Differential privacy utility functions
- Integration with federal queries
- Tests

**Validation:**
- [ ] Noise added to all aggregates
- [ ] K-anonymity enforced (k ≥ 100)
- [ ] Privacy budget respected (ε ≤ 1.0)
- [ ] Tests pass

---

### **Prompt 6.5: Implement Audit Logging**
```

Implement comprehensive audit logging for all data access:

**Requirements:**

- Log all user actions (login, data access, data modification)

- Log all agent actions (task execution, data access)

- Store logs in immutable append-only table

- Retain logs for 7 years (compliance requirement)

**Implementation:**

1. Create audit_logs table:

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID,
  agent_id VARCHAR(100),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100),
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  request_payload JSONB,
  response_status INTEGER,
  metadata JSONB
);

-- Make table append-only (no updates or deletes)
CREATE RULE audit_logs_no_update AS ON UPDATE TO audit_logs DO INSTEAD NOTHING;
CREATE RULE audit_logs_no_delete AS ON DELETE TO audit_logs DO INSTEAD NOTHING;

-- Index for fast queries
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
```

1. Create audit logging middleware:

```python
@app.middleware("http")
async def audit_logging_middleware(request: Request, call_next):
    start_time = time.time()
    
    # Get user/agent info
    user_id = get_user_id_from_jwt(request)
    agent_id = request.headers.get("X-Agent-ID")
    
    # Execute request
    response = await call_next(request)
    
    # Log to database
    await db.execute(
        """
        INSERT INTO audit_logs (
          user_id, agent_id, action, resource_type, resource_id,
          ip_address, user_agent, request_payload, response_status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        """,
        user_id, agent_id, request.method + " " + request.url.path,
        extract_resource_type(request.url.path),
        extract_resource_id(request.url.path),
        request.client.host, request.headers.get("user-agent"),
        await request.json() if request.method in ["POST", "PUT"] else None,
        response.status_code
    )
    
    return response
```

1. Create audit log viewer (admin only):

```python
@router.get("/api/v1/admin/audit-logs")
async def get_audit_logs(
    user_id: Optional[UUID] = None,
    action: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    query = "SELECT * FROM audit_logs WHERE 1=1"
    params = []
    
    if user_id:
        query += " AND user_id = $" + str(len(params) + 1)
        params.append(user_id)
    if action:
        query += " AND action = $" + str(len(params) + 1)
        params.append(action)
    if start_date:
        query += " AND timestamp >= $" + str(len(params) + 1)
        params.append(start_date)
    if end_date:
        query += " AND timestamp <= $" + str(len(params) + 1)
        params.append(end_date)
    
    query += " ORDER BY timestamp DESC LIMIT 1000"
    
    results = await db.fetch(query, *params)
    return results
```

1. Test audit logging:

- Verify all actions are logged

- Verify logs are immutable

- Verify log retention policy

Include unit tests.

```

**Expected Output:**
- Audit logging table and middleware
- Audit log viewer
- Tests

**Validation:**
- [ ] All actions logged correctly
- [ ] Logs are immutable (cannot be updated/deleted)
- [ ] Audit log viewer works
- [ ] Tests pass

---

## Phase 7: Testing & Deployment

**Duration:** Days 37-42 (6 days)  
**Objective:** Test, validate, and deploy to production

### **Prompt 7.1: Write Comprehensive Test Suite**
```

Create a comprehensive test suite for the NOOR Platform:

**Unit Tests (pytest):**

- Test all service endpoints

- Test all agent functions

- Test database models

- Test utility functions

- Target: >80% code coverage

**Integration Tests:**

- Test end-to-end workflows (e.g., user onboarding, leave request approval)

- Test service-to-service communication

- Test agent coordination via MCP

- Test database transactions

**Security Tests:**

- Test authentication and authorization

- Test data access controls (L1/L2/L3)

- Test MFA flows

- Test biometric verification

- Test differential privacy

**Performance Tests (Locust):**

- Load test API endpoints (target: 1000 req/s)

- Stress test database queries

- Test agent response times

**Frontend Tests (Jest + React Testing Library):**

- Test all React components

- Test user interactions

- Test accessibility

- Test bilingual support

**E2E Tests (Playwright):**

- Test complete user journeys

- Test cross-browser compatibility

- Test mobile responsiveness

Create test fixtures, mocks, and test data generators. Run tests in CI/CD pipeline.

```

**Expected Output:**
- Comprehensive test suite (unit, integration, security, performance, frontend, E2E)
- Test fixtures and mocks
- CI/CD integration

**Validation:**
- [ ] All tests pass
- [ ] Code coverage >80%
- [ ] Performance targets met
- [ ] Security tests pass

---

### **Prompt 7.2: Set Up CI/CD Pipeline**
```

Create a CI/CD pipeline using GitHub Actions:

**Pipeline Stages:**

1. **Lint & Format**
  - Python: black, flake8, mypy
  - TypeScript: ESLint, Prettier
  - Fail if code doesn't meet standards

1. **Unit Tests**
  - Run pytest for backend
  - Run Jest for frontend
  - Fail if coverage <80%

1. **Integration Tests**
  - Spin up test database (Docker)
  - Run integration tests
  - Tear down test environment

1. **Security Scan**
  - Bandit (Python security)
  - npm audit (Node.js dependencies)
  - OWASP ZAP (web app security)
  - Fail if critical vulnerabilities found

1. **Build Docker Images**
  - Build images for all services
  - Tag with commit SHA
  - Push to container registry

1. **Deploy to Staging**
  - Deploy to Kubernetes staging cluster
  - Run smoke tests
  - Notify team

1. **E2E Tests (Staging)**
  - Run Playwright tests against staging
  - Fail if any test fails

1. **Deploy to Production** (manual approval required)
  - Deploy to Kubernetes production cluster
  - Run smoke tests
  - Notify team

**GitHub Actions Workflow:**

```yaml
name: NOOR Platform CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Lint Python
        run: |
          pip install black flake8 mypy
          black --check .
          flake8 .
          mypy .
      - name: Lint TypeScript
        run: |
          cd frontend
          npm install
          npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run backend tests
        run: |
          pip install -r requirements.txt
          pytest --cov=. --cov-report=xml
      - name: Run frontend tests
        run: |
          cd frontend
          npm install
          npm test -- --coverage

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Security scan
        run: |
          pip install bandit
          bandit -r .
          cd frontend && npm audit

  build:
    needs: [lint, test, security]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: |
          docker build -t noor-backend:${{ github.sha }} ./backend
          docker build -t noor-frontend:${{ github.sha }} ./frontend
      - name: Push to registry
        run: |
          docker push noor-backend:${{ github.sha }}
          docker push noor-frontend:${{ github.sha }}

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - name: Deploy to staging
        run: |
          kubectl set image deployment/noor-backend noor-backend=noor-backend:${{ github.sha }}
          kubectl set image deployment/noor-frontend noor-frontend=noor-frontend:${{ github.sha }}

  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Deploy to production
        run: |
          kubectl set image deployment/noor-backend noor-backend=noor-backend:${{ github.sha }}
          kubectl set image deployment/noor-frontend noor-frontend=noor-frontend:${{ github.sha }}
```

Include deployment scripts and rollback procedures.

```

**Expected Output:**
- Complete CI/CD pipeline
- GitHub Actions workflow
- Deployment scripts

**Validation:**
- [ ] Pipeline runs on every push
- [ ] All stages complete successfully
- [ ] Deployments work correctly
- [ ] Rollback procedure tested

---

### **Prompt 7.3: Set Up Monitoring & Observability**
```

Set up monitoring and observability using Prometheus and Grafana:

**Metrics to Collect:**

1. **Application Metrics:**
  - Request rate (req/s)
  - Response time (p50, p95, p99)
  - Error rate (%)
  - Active users

1. **Database Metrics:**
  - Query latency
  - Connection pool usage
  - Slow queries
  - Database size

1. **Agent Metrics:**
  - Task completion rate
  - Agent response time
  - MCP message latency
  - Agent errors

1. **Infrastructure Metrics:**
  - CPU usage
  - Memory usage
  - Disk I/O
  - Network traffic

**Prometheus Configuration:**

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'noor-backend'
    static_configs:
      - targets: ['backend:8000']
  
  - job_name: 'noor-agents'
    static_configs:
      - targets: ['orchestrator:8001', 'alkindi:8002', ...]
  
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']
  
  - job_name: 'kubernetes'
    kubernetes_sd_configs:
      - role: pod
```

**Grafana Dashboards:**

1. Application Overview (request rate, latency, errors)

1. Database Performance (query latency, connections)

1. Agent Coordination (task completion, MCP latency)

1. Infrastructure Health (CPU, memory, disk)

1. Business Metrics (user signups, assessments completed, EQI scores)

**Alerting Rules:**

- Alert if error rate > 1%

- Alert if p95 latency > 1s

- Alert if database connections > 80% of pool

- Alert if agent task failure rate > 5%

- Alert if any pod is down

Include Prometheus exporters for all services.

```

**Expected Output:**
- Prometheus configuration
- Grafana dashboards
- Alerting rules
- Exporters for all services

**Validation:**
- [ ] Metrics collected from all services
- [ ] Dashboards display correct data
- [ ] Alerts trigger correctly
- [ ] Exporters running

---

## Validation Checkpoints

### **Checkpoint 1: Infrastructure (After Phase 1)**
- [ ] Docker Compose starts all services
- [ ] Kubernetes cluster deployed
- [ ] Network policies enforced
- [ ] All health checks passing

### **Checkpoint 2: Database Layer (After Phase 2)**
- [ ] All databases created and seeded
- [ ] Schemas match specifications
- [ ] Row-level security policies work
- [ ] Kafka topics created

### **Checkpoint 3: Service Layer (After Phase 3)**
- [ ] All microservices running
- [ ] API endpoints return correct responses
- [ ] External API integrations work (SEHA/DHA, GPSSA/ADPF, UAE Pass)
- [ ] Events published to Kafka

### **Checkpoint 4: Agent Layer (After Phase 4)**
- [ ] Master Orchestrator coordinates Category Orchestrators
- [ ] Category Orchestrators coordinate execution agents
- [ ] MCP communication works end-to-end
- [ ] Agents complete tasks successfully

### **Checkpoint 5: Frontend (After Phase 5)**
- [ ] Skills Passport web app works
- [ ] HCM Suite web app works
- [ ] Federal Canvas web app works
- [ ] Mobile app works
- [ ] Bilingual support functional

### **Checkpoint 6: Security (After Phase 6)**
- [ ] UAE Pass authentication works
- [ ] MFA required for L2+ users
- [ ] Data access controls enforced (L1/L2/L3)
- [ ] Differential privacy applied to federal aggregates
- [ ] Audit logging captures all actions

### **Checkpoint 7: Production Readiness (After Phase 7)**
- [ ] All tests passing (>80% coverage)
- [ ] CI/CD pipeline functional
- [ ] Monitoring and alerting set up
- [ ] Performance targets met (99.99% uptime, <1s latency)
- [ ] Security audits passed

---

## Final Deployment Checklist

Before deploying to production, ensure:

- [ ] All 31 agents deployed and tested
- [ ] All 6 microservices deployed and tested
- [ ] All databases configured with backups
- [ ] UAE Pass integration configured
- [ ] SEHA/DHA/MOHAP integrations configured
- [ ] GPSSA/ADPF integrations configured
- [ ] Biometric verification tested (>95% accuracy, FAR <0.1%)
- [ ] Data zoning enforced (L1/L2/L3)
- [ ] Differential privacy applied (k ≥ 100, ε ≤ 1.0)
- [ ] MFA enabled for L2+ users (99.9% adoption target)
- [ ] Audit logging enabled (7-year retention)
- [ ] Monitoring and alerting configured
- [ ] CI/CD pipeline tested
- [ ] Load testing completed (1000 req/s target)
- [ ] Security audit completed (ISO 27001)
- [ ] Compliance validation completed (UAE Data Privacy Law, GDPR)
- [ ] Disaster recovery plan tested
- [ ] Documentation complete
- [ ] Training materials prepared
- [ ] Stakeholder approval obtained

---

## Success Metrics

After deployment, track these KPIs:

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| Platform Uptime | 99.99% | Uptime monitoring |
| User Adoption | 5M active users by 2028 | MAU tracking |
| Development Cost | <$1.2M annually | Budget tracking |
| User Satisfaction | NPS > 50 | Quarterly surveys |
| Emiratization Rate | 100% compliance | Compliance reports |
| Biometric Fraud Rate | <0.1% | Verification logs |
| MFA Adoption (L2+) | 99.9% | Enrollment tracking |
| Data Privacy Compliance | 100% audit trail | ISO 27001 audit |

---

## Conclusion

This prompt-by-prompt breakdown provides a complete blueprint for building the NOOR Platform. Each prompt is designed to be executed by an AI Application Builder in sequence, with clear inputs, outputs, and validation criteria.

**Total Build Time Estimate:** 7.5 months (with 31-agent team working in parallel)

**The future of national human capital intelligence begins now.** 🚀

**نور - The Light of Knowledge** ✨
```

