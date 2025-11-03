# NOOR Platform - National Opportunities Optimization & Realization

**National Human Capital Intelligence System**  
**Version:** 1.0.0 (MVP - Production Live)  
**Status:** 🚀 **PRODUCTION DEPLOYED**  
**Date:** November 3, 2024

---

## 🎉 Production Status

**✅ LIVE AND OPERATIONAL**

The NOOR Platform MVP is successfully deployed to production with full functionality across all three interfaces. The platform serves as the UAE's national workforce optimization system, implementing the innovative Eight-Faculty Model for comprehensive human capital development.

### Production URLs

**Frontend**: https://frontend-minimal-ebp5u3vy6-bes-projects-a8583333.vercel.app  
**Backend API**: https://backend-ixwb77mau-bes-projects-a8583333.vercel.app  
**API Documentation**: https://backend-ixwb77mau-bes-projects-a8583333.vercel.app/docs

### Deployment Infrastructure

| Component | Platform | Status | Details |
|-----------|----------|--------|---------|
| **Frontend** | Vercel | ✅ Live | Next.js 14, React 18, TypeScript 5 |
| **Backend** | Vercel | ✅ Live | FastAPI, Python 3.11, 98 REST endpoints |
| **Database** | Supabase | ✅ Active | PostgreSQL with full schema |
| **Payments** | Stripe | ✅ Ready | Token packages and subscriptions |
| **Authentication** | Supabase Auth | ✅ Active | JWT-based authentication |

---

## 📋 Table of Contents

- [Platform Overview](#-platform-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Platform Overview

### Vision

NOOR (National Opportunities Optimization & Realization) is the UAE's comprehensive national workforce optimization platform, designed to illuminate human potential and drive the nation toward Vision 2071. The platform integrates three distinct interfaces serving federal government, individual citizens, and institutional employers, all built on the innovative Eight-Faculty Model.

### Mission

To empower 5 million Emiratis to achieve their full potential through comprehensive skills assessment, personalized learning pathways, intelligent job matching, and gamified engagement, while providing federal policymakers and institutional employers with actionable workforce intelligence.

### The Eight-Faculty Model

NOOR implements a groundbreaking **Eight-Faculty Model** that assesses human capabilities across eight interconnected dimensions, each containing 12 specific competencies (96 total):

1. **Cognitive Faculty** - Analytical thinking, problem-solving, critical reasoning
2. **Emotional Faculty** - Self-awareness, empathy, emotional regulation
3. **Social Faculty** - Communication, collaboration, leadership
4. **Physical Faculty** - Health, vitality, physical coordination
5. **Creative Faculty** - Innovation, artistic expression, design thinking
6. **Practical Faculty** - Technical skills, execution, resource management
7. **Moral Faculty** - Ethics, integrity, social responsibility
8. **Spiritual Faculty** - Purpose, meaning, transcendence

This holistic approach ensures comprehensive human capital development aligned with UAE cultural values and Vision 2071 objectives.

---

## 🎯 Key Features

### Three Complete Interfaces

#### 1. Federal Government Interface

**Purpose**: National workforce intelligence and policy planning

**Key Features**:
- National workforce dashboard with real-time statistics
- Eight-Faculty competency distribution across the nation
- Regional talent mapping by emirate
- Emiratization progress tracking and analytics
- Sector-wise workforce analysis
- Skills gap identification at national scale
- Policy simulation and impact forecasting
- Data export for strategic planning

**Users**: Federal policymakers, MOHRE, FAHR, NAFIS officials

#### 2. Individual Citizens Interface

**Purpose**: Personal development and career advancement

**Key Features**:
- **Skills Passport**: Comprehensive Eight-Faculty profile with radar visualizations
- **Assessment Center**: Take assessments across all 96 competencies
- **Learning Center**: 64 curated courses for skills development
- **Gamification**: Token economy, achievement badges, streaks, leaderboards
- **Job Matching**: AI-powered job recommendations based on skills profile
- **Radiant AI**: Personalized career guidance and mentorship
- **Progress Tracking**: Visualize growth across all eight faculties
- **Token Purchase**: Buy tokens for premium features and course unlocking

**Users**: Emirati citizens, job seekers, professionals

#### 3. Institutional Employers Interface

**Purpose**: Organizational talent management and Emiratization

**Key Features**:
- Organizational Eight-Faculty profile and analytics
- Team performance metrics and competency mapping
- Skills gap analysis for workforce planning
- Job posting and candidate matching
- Emiratization Quality Index (EQI) tracking
- Training ROI measurement
- Talent acquisition pipeline
- Employee development tracking

**Users**: HR managers, talent acquisition teams, organizational leaders

### Core Platform Features

**Eight-Faculty Assessment System**:
- 96 competencies across 8 faculties
- Adaptive assessment generation
- Scoring algorithms with performance bands
- Progress tracking over time
- Competency-based job matching

**Gamification System**:
- Token economy (earn 10-100 tokens per assessment)
- Achievement badges (96 competency badges + special achievements)
- Streak bonuses for consistent engagement
- National and organizational leaderboards
- Token-based course unlocking

**Learning Center**:
- 64 professionally curated courses
- Mapped to Eight-Faculty competencies
- Token-based access model
- Progress tracking and completion certificates
- Personalized learning pathways

**Payment Integration**:
- Stripe-powered token purchases
- Three token packages (Starter, Professional, Enterprise)
- Subscription plans (Basic, Pro, Premium)
- Secure payment processing
- Transaction history and receipts

---

## 🏗️ Architecture

### System Architecture

NOOR follows a modern, cloud-native architecture deployed on Vercel with Supabase backend:

```
┌─────────────────────────────────────────────────────────┐
│  Frontend Layer (Next.js 14)                            │
│  - Federal Interface (Gold/Navy design)                 │
│  - Individual Interface (Red/Beige design)              │
│  - Institutional Interface (Blue/Silver design)         │
│  - 33 pages (11 per interface)                          │
│  - 51 components (17 per interface)                     │
└─────────────────────────────────────────────────────────┘
                          ↓ HTTPS/REST
┌─────────────────────────────────────────────────────────┐
│  Backend API Layer (FastAPI)                            │
│  - 98 REST endpoints                                    │
│  - JWT authentication                                   │
│  - Business logic and validation                        │
│  - Stripe payment integration                           │
│  - Eight-Faculty assessment engine                      │
└─────────────────────────────────────────────────────────┘
                          ↓ PostgreSQL
┌─────────────────────────────────────────────────────────┐
│  Data Layer (Supabase)                                  │
│  - PostgreSQL database                                  │
│  - Authentication service                               │
│  - Real-time subscriptions                              │
│  - Row-level security                                   │
│  - Automated backups                                    │
└─────────────────────────────────────────────────────────┘
```

### Database Schema

**Core Tables**:
- `users` - User accounts and profiles
- `skills_passports` - Eight-Faculty competency profiles
- `assessments` - Assessment attempts and results
- `assessment_questions` - Question bank (96 competencies)
- `token_transactions` - Token economy transactions
- `courses` - Learning center courses (64 courses)
- `course_enrollments` - User course progress
- `achievements` - Badge and achievement tracking
- `job_postings` - Employment opportunities
- `job_applications` - Application tracking
- `organizations` - Institutional profiles
- `payment_transactions` - Stripe payment records

### Design Systems

NOOR implements three distinct design systems, each tailored to its user interface:

**Federal Government Interface**:
- Primary Color: Gold (#D4A843)
- Secondary Color: Navy (#1A3A5C)
- Fonts: Cairo (headings), Noto Sans (body)
- Style: Authoritative, governmental, data-driven
- Layout: Dense information displays, tables, charts

**Individual Citizens Interface**:
- Primary Color: Red (#CC0000)
- Secondary Color: Beige (#D4A574)
- Fonts: Playfair Display (headings), Inter (body)
- Style: Personal, aspirational, growth-oriented
- Layout: Card-based with generous whitespace

**Institutional Employers Interface**:
- Primary Color: Blue (#2E5984)
- Secondary Color: Silver (#8AA0B0)
- Fonts: Montserrat (headings), Open Sans (body)
- Style: Professional, efficient, business-focused
- Layout: Table-heavy, efficient data management

---

## 💻 Technology Stack

### Frontend

**Framework**: Next.js 14 with App Router  
**Language**: TypeScript 5  
**Styling**: Tailwind CSS 3  
**State Management**: React Context API  
**Charts**: Recharts, Chart.js  
**HTTP Client**: Axios  
**Deployment**: Vercel

**Key Dependencies**:
```json
{
  "next": "14.0.0",
  "react": "18.2.0",
  "typescript": "5.0.0",
  "tailwindcss": "3.3.0",
  "recharts": "2.8.0",
  "axios": "1.5.0"
}
```

### Backend

**Framework**: FastAPI 0.104+  
**Language**: Python 3.11  
**Database**: PostgreSQL (Supabase)  
**Authentication**: JWT  
**Payments**: Stripe API  
**Deployment**: Vercel Serverless Functions

**Key Dependencies**:
```
fastapi==0.104.0
uvicorn==0.24.0
supabase==2.0.0
stripe==7.0.0
pydantic==2.4.0
python-jose==3.3.0
```

### Infrastructure

**Hosting**: Vercel (Frontend + Backend)  
**Database**: Supabase (PostgreSQL)  
**Authentication**: Supabase Auth  
**Payments**: Stripe  
**CDN**: Vercel Edge Network  
**SSL**: Automatic HTTPS

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Git
- Supabase account
- Stripe account (for payments)

### Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/BenedictGPT/NOOR_National-Opportunities-Optimization-Realization-.git
cd noor-repo
```

#### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

The frontend will be available at http://localhost:3000

#### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
uvicorn app.main:app --reload
```

The backend API will be available at http://localhost:8000

#### 4. Database Setup

1. Create a Supabase project at https://supabase.com
2. Run the database migrations in `backend/migrations/`
3. Seed the database with sample data (optional)

### Environment Variables

#### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

#### Backend (.env)

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
ANTHROPIC_API_KEY=your_anthropic_key  # Optional for AI features
OPENAI_API_KEY=your_openai_key  # Optional for AI features
```

---

## 👨‍💻 Development

### Project Structure

```
noor-repo/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   │   ├── federal/     # Federal Government interface
│   │   │   ├── individual/  # Individual Citizens interface
│   │   │   └── institutional/ # Institutional Employers interface
│   │   ├── components/      # React components
│   │   │   ├── federal/     # Federal-specific components
│   │   │   ├── individual/  # Individual-specific components
│   │   │   └── institutional/ # Institutional-specific components
│   │   ├── lib/             # Utility functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── backend/                 # FastAPI backend application
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   │   └── v1/         # API version 1
│   │   │       ├── auth.py # Authentication endpoints
│   │   │       ├── users.py # User management
│   │   │       ├── assessments.py # Assessment endpoints
│   │   │       ├── gamification.py # Token & badges
│   │   │       ├── learning.py # Learning center
│   │   │       ├── jobs.py # Job matching
│   │   │       └── analytics.py # Analytics endpoints
│   │   ├── core/           # Core functionality
│   │   │   ├── config.py   # Configuration
│   │   │   ├── security.py # Security utilities
│   │   │   └── database.py # Database connection
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── tests/              # Test suite
│   └── requirements.txt    # Python dependencies
│
├── docs/                   # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── EIGHT_FACULTY_MODEL.md
│   └── ...
│
├── scripts/                # Utility scripts
├── .github/                # GitHub Actions workflows
└── README.md              # This file
```

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Write tests for new features
   - Update documentation as needed

3. **Test your changes**
   ```bash
   # Frontend tests
   cd frontend && npm test
   
   # Backend tests
   cd backend && pytest
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create a pull request**
   - Describe your changes
   - Reference any related issues
   - Wait for code review

### Code Style

**Frontend**:
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Ensure accessibility (WCAG 2.1 AA)
- Write responsive, mobile-first CSS

**Backend**:
- Follow PEP 8 style guide
- Use type hints for all functions
- Write comprehensive docstrings
- Implement proper error handling
- Write unit tests for all endpoints

---

## 🚀 Deployment

### Production Deployment

The NOOR Platform is deployed on Vercel with automatic deployments from the `master` branch.

#### Frontend Deployment

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

#### Backend Deployment

```bash
cd backend

# Deploy to production
vercel --prod
```

### Environment Configuration

Ensure all environment variables are configured in Vercel:

1. Go to Vercel Dashboard
2. Select your project
3. Navigate to Settings → Environment Variables
4. Add all required variables for production

### Database Migrations

```bash
cd backend

# Run migrations
python scripts/migrate.py

# Seed database (optional)
python scripts/seed.py
```

---

## 📚 Documentation

### Core Documentation

| Document | Description |
|----------|-------------|
| [MVP Product Requirements Document](./MVP_PRODUCT_REQUIREMENTS_DOCUMENT.md) | Complete PRD with all requirements |
| [MVP Contextual Summary](./MVP_CONTEXTUAL_SUMMARY.md) | High-level overview for stakeholders |
| [Repository Environment Analysis](./REPOSITORY_ENVIRONMENT_ANALYSIS.md) | Repository structure and workflow |
| [Deployment Success](./DEPLOYMENT_SUCCESS.md) | Production deployment details |
| [Cursor Deployment Prompts](./CURSOR_DEPLOYMENT_PROMPTS.md) | UI/UX refinement prompts |

### Technical Documentation

| Document | Location | Description |
|----------|----------|-------------|
| API Documentation | `/docs/API_DOCUMENTATION.md` | Complete API reference |
| Eight-Faculty Model | `/docs/EIGHT_FACULTY_MODEL_IMPLEMENTATION.md` | Model implementation details |
| Gamification System | `/docs/GAMIFICATION_SYSTEM_COMPLETE.md` | Token economy and badges |
| Database Schema | `/docs/DATABASE_SCHEMA.md` | Complete database design |
| Deployment Guide | `/docs/FINAL_DEPLOYMENT_GUIDE_WITH_STRIPE.md` | Comprehensive deployment guide |

### Additional Resources

- [Contributing Guidelines](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)
- [Changelog](./CHANGELOG.md)

---

## 🔌 API Reference

### Base URL

**Production**: https://backend-ixwb77mau-bes-projects-a8583333.vercel.app  
**Development**: http://localhost:8000

### Authentication

All API requests require authentication using JWT tokens:

```bash
# Get access token
curl -X POST https://backend-ixwb77mau-bes-projects-a8583333.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# Use token in requests
curl -X GET https://backend-ixwb77mau-bes-projects-a8583333.vercel.app/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Key Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

#### Users
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update user profile
- `GET /api/v1/users/{user_id}` - Get user by ID

#### Skills Passport
- `GET /api/v1/skills-passport/me` - Get my skills passport
- `GET /api/v1/skills-passport/{user_id}` - Get user's skills passport
- `PUT /api/v1/skills-passport/me` - Update skills passport

#### Assessments
- `GET /api/v1/assessments` - List all assessments
- `GET /api/v1/assessments/{assessment_id}` - Get assessment details
- `POST /api/v1/assessments/{assessment_id}/start` - Start assessment
- `POST /api/v1/assessments/{assessment_id}/submit` - Submit assessment

#### Gamification
- `GET /api/v1/gamification/tokens` - Get token balance
- `GET /api/v1/gamification/achievements` - Get achievements
- `GET /api/v1/gamification/leaderboard` - Get leaderboard
- `POST /api/v1/gamification/tokens/purchase` - Purchase tokens

#### Learning Center
- `GET /api/v1/courses` - List all courses
- `GET /api/v1/courses/{course_id}` - Get course details
- `POST /api/v1/courses/{course_id}/enroll` - Enroll in course
- `PUT /api/v1/courses/{course_id}/progress` - Update progress

#### Job Matching
- `GET /api/v1/jobs` - List job postings
- `GET /api/v1/jobs/{job_id}` - Get job details
- `POST /api/v1/jobs/{job_id}/apply` - Apply for job
- `GET /api/v1/jobs/recommendations` - Get job recommendations

#### Analytics (Federal & Institutional)
- `GET /api/v1/analytics/national` - National workforce statistics
- `GET /api/v1/analytics/organizational` - Organizational analytics
- `GET /api/v1/analytics/faculty-distribution` - Faculty distribution

### Interactive API Documentation

Visit https://backend-ixwb77mau-bes-projects-a8583333.vercel.app/docs for interactive API documentation with Swagger UI.

---

## 📊 Project Statistics

### Codebase Metrics

| Metric | Count |
|--------|-------|
| **Total Lines of Code** | 50,573 |
| **Frontend Lines** | 36,046 |
| **Backend Lines** | 14,527 |
| **Components** | 51 |
| **Pages** | 33 |
| **API Endpoints** | 98 |
| **Database Tables** | 12 |
| **Documentation Files** | 60+ |

### Feature Completeness

| Feature | Status |
|---------|--------|
| Eight-Faculty Model | ✅ 100% |
| Three Interfaces | ✅ 100% |
| Assessment System | ✅ 100% |
| Gamification | ✅ 100% |
| Learning Center | ✅ 100% |
| Job Matching | ✅ 100% |
| Payment Integration | ✅ 100% |
| Analytics Dashboards | ✅ 100% |

---

## 🤝 Contributing

We welcome contributions to the NOOR Platform! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting pull requests.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code of Conduct

This project adheres to a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

### Reporting Issues

Found a bug or have a feature request? Please open an issue on GitHub with:
- Clear description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, etc.)

---

## 🔒 Security

### Reporting Security Issues

If you discover a security vulnerability, please email security@noor.ae instead of using the issue tracker.

### Security Features

- ✅ JWT-based authentication
- ✅ Row-level security in database
- ✅ HTTPS encryption in transit
- ✅ AES-256 encryption at rest
- ✅ Input validation and sanitization
- ✅ Rate limiting on API endpoints
- ✅ CORS configuration
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CSRF protection

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 👥 Team

**Project Lead**: Benedict (BenedictGPT)  
**Development**: Manus AI  
**Architecture**: NOOR Platform Team  
**Documentation**: Manus AI

---

## 🙏 Acknowledgments

- UAE Government for Vision 2071 inspiration
- Supabase for database infrastructure
- Vercel for hosting platform
- Stripe for payment processing
- Anthropic for Claude AI integration
- OpenAI for GPT integration
- All contributors and supporters

---

## 📞 Contact

**Repository**: https://github.com/BenedictGPT/NOOR_National-Opportunities-Optimization-Realization-  
**Issues**: https://github.com/BenedictGPT/NOOR_National-Opportunities-Optimization-Realization-/issues  
**Discussions**: https://github.com/BenedictGPT/NOOR_National-Opportunities-Optimization-Realization-/discussions

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐️

---

**Last Updated**: November 3, 2024  
**Version**: 1.0.0 (MVP)  
**Status**: ✅ Production Live

🇦🇪 **NOOR Platform - Illuminating Human Potential for UAE Vision 2071** 🚀

