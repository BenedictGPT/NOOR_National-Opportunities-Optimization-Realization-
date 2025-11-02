# NOOR Platform - Web Application

Next.js 14+ web application serving all three layers of the NOOR Platform.

## Applications

### 1. Skills Passport (Individual Layer)
**Target Users:** 5 million Emiratis
**Pages:**
- Dashboard (profile, competencies, Radiant AI)
- Competencies (skill gaps, recommendations)
- Learning Pathways (courses, assessments, certificates)
- Career Pathways (target roles, mentor matching, jobs)
- Health & Wellness (health profile, vaccinations, medical certificates)
- Radiant AI (full-page chat interface)
- Token Wallet (NOOR tokens, rewards)

### 2. Institutional HCM Suite (Institutional Layer)
**Target Users:** HR Managers, CXOs
**Access Levels:**
- L2 (Institutional Restricted): HR Managers - team/entity scope
- L3 (Institutional Executive): CXOs - entity-wide aggregates

**Pages:**
- HR Dashboard (workforce overview, EQI, leave requests)
- Employee Lifecycle (directory, onboarding, leave, relocation)
- Payroll & Pensions (payroll processing, GPSSA/ADPF)
- Learning & Development (pathways, assessments, competency gaps)
- Emiratization (quota tracking, EQI dashboard)
- Performance Management (appraisals, goals, feedback)
- Engagement & Culture (surveys, sentiment, work-life balance)

### 3. Federal Canvas (Federal Layer)
**Target Users:** Federal Analysts (FAHR, MOHRE, NAFIS)
**Access Level:** L4 (Federal Analysts) - requires Cabinet approval

**Pages:**
- National Workforce View (aggregated demographics)
- Emiratization Dashboard (national rates, EQI leaderboard)
- Labor Market Analytics (skill demand, talent supply)
- Policy Simulator (simulate policy changes)
- ESG Impact Dashboard (environmental, social, governance metrics)

**CRITICAL:** All data aggregated with differential privacy (k ≥ 100, ε ≤ 1.0)

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **UI:** React 18+ with TypeScript
- **Styling:** TailwindCSS
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts / D3.js
- **i18n:** i18next (Arabic/English)
- **Auth:** UAE Pass OAuth + JWT

## Features

- Bilingual support (Arabic/English)
- Responsive design (mobile-first)
- Dark mode support
- Accessibility (WCAG 2.1 AA)
- Real-time updates (WebSockets)
- Progressive Web App (PWA)

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint
```

## Environment Variables

Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_UAE_PASS_CLIENT_ID=your_client_id
NEXT_PUBLIC_UAE_PASS_REDIRECT_URI=http://localhost:3000/auth/callback
```

## Deployment

Deployed to Vercel or Kubernetes with:
- Edge runtime for optimal performance
- Incremental Static Regeneration (ISR)
- Image optimization
- Automatic HTTPS
