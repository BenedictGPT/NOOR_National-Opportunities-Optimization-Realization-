# NOOR Platform - API Architecture & Integration Strategy

**Date**: November 3, 2024  
**Version**: 1.0.0  
**Status**: Design Complete

---

## Overview

This document outlines the API architecture for connecting the NOOR Platform frontend (Next.js) to the backend (FastAPI + Supabase).

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js 14)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Federal    │  │  Individual  │  │Institutional │      │
│  │  Interface   │  │  Interface   │  │  Interface   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │   API Client    │                        │
│                   │  (axios/fetch)  │                        │
│                   └────────┬────────┘                        │
└────────────────────────────┼──────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   API Gateway   │
                    │  (Next.js API)  │
                    └────────┬────────┘
                             │
┌────────────────────────────┼──────────────────────────────────┐
│                   ┌────────▼────────┐                         │
│                   │  Backend API    │                         │
│                   │    (FastAPI)    │                         │
│                   └────────┬────────┘                         │
│                            │                                  │
│         ┌──────────────────┼──────────────────┐              │
│         │                  │                  │              │
│  ┌──────▼──────┐  ┌────────▼────────┐  ┌─────▼──────┐      │
│  │  Supabase   │  │   AI Agents     │  │  External  │      │
│  │  Database   │  │   (Claude AI)   │  │    APIs    │      │
│  └─────────────┘  └─────────────────┘  └────────────┘      │
│                                                               │
│                    BACKEND (FastAPI + Supabase)              │
└───────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

### Authentication

```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
POST   /api/auth/refresh           - Refresh access token
GET    /api/auth/me                - Get current user
PUT    /api/auth/profile           - Update user profile
```

### Eight-Faculty Model

```
GET    /api/faculties              - List all faculties
GET    /api/faculties/:id          - Get faculty details
GET    /api/competencies           - List all competencies
GET    /api/competencies/:id       - Get competency details
```

### Assessments

```
GET    /api/assessments            - List available assessments
GET    /api/assessments/:id        - Get assessment details
POST   /api/assessments/:id/start  - Start assessment attempt
PUT    /api/assessments/:id/answer - Submit answer
POST   /api/assessments/:id/submit - Submit completed assessment
GET    /api/assessments/history    - Get user assessment history
```

### Skills Passport

```
GET    /api/skills-passport        - Get user's skills passport
GET    /api/skills-passport/scores - Get faculty scores
POST   /api/skills-passport/verify - Request verification
GET    /api/skills-passport/achievements - Get achievements
```

### Gamification

```
GET    /api/wallet                 - Get token wallet
GET    /api/wallet/transactions    - Get transaction history
POST   /api/wallet/earn            - Award tokens
POST   /api/wallet/spend           - Spend tokens
GET    /api/progress               - Get user progress
GET    /api/achievements           - Get achievements
GET    /api/leaderboard            - Get leaderboard
GET    /api/streak                 - Get streak info
```

### Learning Center

```
GET    /api/courses                - List all courses
GET    /api/courses/:id            - Get course details
POST   /api/courses/:id/unlock     - Unlock course with tokens
GET    /api/courses/my-courses     - Get enrolled courses
PUT    /api/courses/:id/progress   - Update course progress
POST   /api/courses/:id/complete   - Mark course complete
```

### Team Challenges

```
GET    /api/challenges             - List team challenges
GET    /api/challenges/:id         - Get challenge details
POST   /api/challenges/:id/join    - Join team challenge
GET    /api/challenges/my-teams    - Get user's teams
PUT    /api/challenges/:id/progress - Update team progress
POST   /api/challenges/:id/evaluate - Submit peer evaluation
```

### Institutional (HCM)

```
GET    /api/institution/employees  - List employees
GET    /api/institution/analytics  - Get HCM analytics
GET    /api/institution/departments - Get department breakdown
GET    /api/institution/top-performers - Get top performers
GET    /api/institution/gaps       - Get development needs
```

### Federal (Analytics)

```
GET    /api/federal/analytics      - Get national analytics
GET    /api/federal/ministries     - Get ministry breakdown
GET    /api/federal/trends         - Get faculty trends
GET    /api/federal/gaps           - Get national skills gaps
GET    /api/federal/institutions   - Get institution rankings
```

---

## Data Models

### User

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'employer' | 'federal_admin';
  emiratesId?: string;
  institutionId?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Assessment Attempt

```typescript
interface AssessmentAttempt {
  id: string;
  userId: string;
  assessmentId: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
  tokensEarned?: number;
  answers: AssessmentAnswer[];
  status: 'in_progress' | 'completed' | 'abandoned';
}
```

### Token Transaction

```typescript
interface TokenTransaction {
  id: string;
  userId: string;
  type: 'earn' | 'spend';
  amount: number;
  source: string;
  description: string;
  timestamp: string;
}
```

---

## Authentication Flow

```
1. User enters credentials → POST /api/auth/login
2. Backend validates → Checks Supabase
3. Generate JWT tokens → Access + Refresh
4. Return tokens → Store in httpOnly cookies
5. Frontend requests → Include access token
6. Backend validates → Check JWT signature
7. Token expired → Use refresh token
8. Logout → POST /api/auth/logout → Clear cookies
```

---

## Error Handling

### Standard Error Response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  }
}
```

### Error Codes

- `VALIDATION_ERROR` - Invalid input data
- `AUTHENTICATION_ERROR` - Invalid credentials
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource already exists
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error

---

## Rate Limiting

```
- Authentication: 5 requests/minute
- Assessments: 10 requests/minute
- General API: 100 requests/minute
- Federal Analytics: 50 requests/minute
```

---

## Caching Strategy

```
- Faculty/Competency data: 1 hour
- Assessment questions: 30 minutes
- User profile: 5 minutes
- Leaderboard: 1 minute
- Analytics: 10 minutes
```

---

## Security

### API Key Management

- Environment variables for all secrets
- Supabase keys in `.env.local`
- JWT secret rotation every 90 days

### CORS Configuration

```typescript
{
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

### Input Validation

- Pydantic models for all inputs
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitize outputs)
- CSRF protection (tokens)

---

## Integration Steps

### Phase 1: Setup

1. Create API client in frontend
2. Configure environment variables
3. Set up authentication flow
4. Test basic connectivity

### Phase 2: Core Features

1. Integrate Eight-Faculty endpoints
2. Connect assessment system
3. Implement token wallet
4. Link learning center

### Phase 3: Advanced Features

1. Team challenges integration
2. HCM dashboard connection
3. Federal analytics integration
4. Real-time updates (WebSockets)

### Phase 4: Optimization

1. Implement caching
2. Add request batching
3. Optimize queries
4. Performance monitoring

---

## Testing Strategy

### Unit Tests

- API endpoint logic
- Data validation
- Authentication/authorization
- Token calculations

### Integration Tests

- Frontend → Backend flow
- Database operations
- External API calls
- Error handling

### End-to-End Tests

- Complete user journeys
- Assessment flow
- Course unlocking
- Team challenges

---

## Deployment

### Environment Variables

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://api.noor.ae
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# Backend (.env)
DATABASE_URL=postgresql://xxx
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=xxx
JWT_SECRET=xxx
ANTHROPIC_API_KEY=xxx
```

### Production Setup

1. Deploy backend to cloud (AWS/Azure/GCP)
2. Deploy frontend to Vercel/Netlify
3. Configure CDN for static assets
4. Set up monitoring (Sentry, DataDog)
5. Configure logging (CloudWatch, LogRocket)

---

## Monitoring

### Metrics to Track

- API response times
- Error rates
- Token transactions
- Assessment completions
- User engagement
- Database performance

### Alerts

- API downtime
- High error rates (>5%)
- Slow responses (>2s)
- Database connection issues
- Authentication failures

---

## Next Steps

1. ✅ Design complete
2. ⏳ Implement API client
3. ⏳ Build backend endpoints
4. ⏳ Connect frontend
5. ⏳ Test integration
6. ⏳ Deploy to production

---

**Status**: Ready for Implementation

