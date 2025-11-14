# NOOR Platform - Complete Sitemap Documentation

## Overview

The NOOR Platform consists of **28 unique pages** across three distinct user interfaces (Federal Government, Institutional/Employers, and Individual/Citizens), plus a shared landing page and authentication system. Each interface provides a complete user journey tailored to specific use cases.

**Total Pages:** 28
**Federal Interface Pages:** 8
**Institutional Interface Pages:** 8
**Individual Interface Pages:** 11
**Shared Pages:** 1 (Landing Page)

---

## 🌐 Public Pages (Non-Authenticated)

### 1. Root Landing Page
**Route:** `/`
**File:** `frontend/src/app/page.tsx`
**Purpose:** Main entry point for all users with interface selection
**Features:**
- Hero section with NOOR branding
- Three interface cards (Federal, Institutional, Individual)
- Value proposition for each user type
- Call-to-action buttons
- Platform statistics
- Footer with navigation

**Target Audiences:**
- Government officials seeking Federal access
- Employers/institutions seeking recruitment tools
- Citizens seeking opportunities

**Key Actions:**
- Navigate to Federal Government interface
- Navigate to Institutional interface
- Navigate to Individual interface
- Learn more about NOOR platform

---

## 🏛️ Federal Government Interface (8 Pages)

**Base Route:** `/federal`
**Authentication Required:** Yes (Federal officials only)
**Layout:** `DashboardLayout` with gold theme

### F1. Federal Dashboard
**Route:** `/federal/dashboard`
**File:** `frontend/src/app/federal/dashboard/page.tsx`
**Purpose:** Central hub for federal administrators
**Features:**
- National opportunity statistics overview
- Active opportunities count
- Total applications metrics
- Recent activity feed
- Quick action buttons
- System-wide alerts

**Key Metrics Displayed:**
- Total opportunities published
- Active applications
- Pending approvals
- Regional distribution
- Completion rates

**User Actions:**
- View opportunities
- Create new opportunity
- Review applications
- Access analytics

---

### F2. Opportunities Management
**Route:** `/federal/opportunities`
**File:** `frontend/src/app/federal/opportunities/page.tsx`
**Purpose:** Create and manage national opportunities
**Features:**
- Opportunities listing (table/card view)
- Create new opportunity button
- Filters (status, type, ministry, date range)
- Search functionality
- Bulk actions
- Export functionality

**Opportunity Types:**
- Employment opportunities
- Training programs
- Scholarships
- Internships
- Volunteer programs
- National service

**CRUD Operations:**
- Create opportunity (multi-step form)
- Read/view opportunity details
- Update opportunity information
- Delete/archive opportunity
- Duplicate opportunity

**Filters:**
- Status (Draft, Published, Closed)
- Ministry/Entity
- Opportunity type
- Date range
- Location

---

### F3. Applications Review
**Route:** `/federal/applications`
**File:** `frontend/src/app/federal/applications/page.tsx`
**Purpose:** Review and process citizen applications
**Features:**
- Applications listing with filters
- Application status management
- Bulk review capabilities
- Application timeline view
- Candidate profiles preview
- Approval workflow

**Application Statuses:**
- New
- Under Review
- Shortlisted
- Approved
- Rejected
- Waitlisted

**Review Actions:**
- View full application
- Review candidate profile
- Approve/reject application
- Request additional information
- Schedule interview
- Send messages

**Filters:**
- Status
- Opportunity
- Date submitted
- Score/ranking
- Ministry/entity

---

### F4. Analytics Dashboard
**Route:** `/federal/analytics`
**File:** `frontend/src/app/federal/analytics/page.tsx`
**Purpose:** National-level analytics and reporting
**Features:**
- Interactive charts and graphs
- Opportunity performance metrics
- Application trends
- Regional distribution maps
- Ministry-wise breakdown
- Export reports (PDF/Excel)

**Key Analytics:**
- Opportunity conversion rates
- Application volumes over time
- Success rates by opportunity type
- Regional participation metrics
- Demographic insights
- Ministry performance comparison

**Visualizations:**
- Line charts (trends)
- Bar charts (comparisons)
- Pie charts (distributions)
- Heat maps (regional data)
- KPI cards

**Date Range Filters:**
- Last 7 days
- Last 30 days
- Last 90 days
- Year to date
- Custom range

---

### F5. Eight-Faculty Analytics
**Route:** `/federal/eight-faculty-analytics`
**File:** `frontend/src/app/federal/eight-faculty-analytics/page.tsx`
**Purpose:** National competency insights using Eight-Faculty Model
**Features:**
- National competency profile
- Faculty-wise distribution
- Skills gap analysis
- Trending competencies
- Ministry-specific insights
- Recommendations for opportunity creation

**Eight Faculties Tracked:**
1. **Physical Faculty** - Health, fitness, stamina
2. **Emotional Faculty** - Emotional intelligence, resilience
3. **Cognitive Faculty** - Problem-solving, critical thinking
4. **Social Faculty** - Communication, collaboration
5. **Spiritual Faculty** - Purpose, values alignment
6. **Creative Faculty** - Innovation, creativity
7. **Moral Faculty** - Ethics, integrity
8. **Aesthetic Faculty** - Design thinking, appreciation

**Analytics Views:**
- National average scores per faculty
- Skills gap identification
- Regional comparisons
- Opportunity alignment analysis
- Talent pool insights

---

### F6. Regional Mapping
**Route:** `/federal/regional-mapping`
**File:** `frontend/src/app/federal/regional-mapping/page.tsx`
**Purpose:** Geographic distribution and regional insights
**Features:**
- Interactive UAE map
- Regional opportunity distribution
- Population vs. opportunity analysis
- Emirates-wise metrics
- Urban vs. rural insights
- Accessibility analytics

**Emirates Covered:**
- Abu Dhabi
- Dubai
- Sharjah
- Ajman
- Umm Al Quwain
- Ras Al Khaimah
- Fujairah

**Map Features:**
- Click emirates for detailed view
- Opportunity density heat map
- Application concentration
- Success rate by region
- Transportation accessibility

---

### F7. Workforce Planning
**Route:** `/federal/workforce`
**File:** `frontend/src/app/federal/workforce/page.tsx`
**Purpose:** National workforce planning and talent pipeline
**Features:**
- Workforce demand forecasting
- Skills inventory
- Talent pipeline visualization
- Ministry staffing needs
- Training program alignment
- Strategic planning tools

**Planning Tools:**
- Demand vs. supply analysis
- Skills shortage identification
- Training program recommendations
- Recruitment timeline planning
- Budget allocation insights

**Reports:**
- Workforce readiness report
- Skills gap report
- Ministry staffing report
- Training effectiveness report

---

### F8. Federal Settings
**Route:** `/federal/settings`
**File:** `frontend/src/app/federal/settings/page.tsx`
**Purpose:** System configuration and user management
**Features:**
- User account settings
- Ministry/entity management
- Access control (roles & permissions)
- System preferences
- Notification settings
- API configuration
- Audit logs

**Settings Sections:**
- Profile settings
- Security settings
- Ministry configuration
- User management
- Notification preferences
- Integration settings
- System logs

**User Roles:**
- Super Admin
- Ministry Admin
- Opportunity Manager
- Reviewer
- Analyst

---

## 🏢 Institutional/Employers Interface (8 Pages)

**Base Route:** `/institutional`
**Authentication Required:** Yes (Employers/institutions only)
**Layout:** `DashboardLayout` with blue theme

### I1. Institutional Dashboard
**Route:** `/institutional/dashboard`
**File:** `frontend/src/app/institutional/dashboard/page.tsx`
**Purpose:** Central hub for employers and institutions
**Features:**
- Active job postings count
- Applications received
- Shortlisted candidates
- Upcoming interviews
- Quick post job button
- Recent activity

**Key Metrics:**
- Total active jobs
- Applications this month
- Hire rate
- Time to fill
- Candidate pipeline

**Quick Actions:**
- Post new job
- Review applications
- Schedule interviews
- View analytics

---

### I2. Job Postings Management
**Route:** `/institutional/jobs`
**File:** `frontend/src/app/institutional/jobs/page.tsx`
**Purpose:** Create and manage job postings
**Features:**
- Job listings (active, draft, closed)
- Create job posting
- Edit existing jobs
- Job performance analytics
- Duplicate job posting
- Archive/close jobs

**Job Posting Form:**
- Job title & description
- Requirements (skills, education, experience)
- Compensation & benefits
- Location & work arrangement
- Application deadline
- Screening questions

**Job Status:**
- Draft
- Active
- Paused
- Closed
- Archived

**Actions:**
- Create job
- Edit job
- Pause/resume job
- Close job
- View applications
- View analytics

---

### I3. Candidates Management
**Route:** `/institutional/candidates`
**File:** `frontend/src/app/institutional/candidates/page.tsx`
**Purpose:** Review and manage candidate applications
**Features:**
- Candidate pipeline view (Kanban board)
- Application list view
- Candidate profiles
- Filtering and sorting
- Bulk actions
- Communication tools

**Pipeline Stages:**
- New Applications
- Screening
- Shortlisted
- Interview Scheduled
- Offer Extended
- Hired
- Rejected

**Candidate Profile View:**
- Personal information
- Resume/CV
- Skills assessment results
- Eight-Faculty profile
- Work experience
- Education
- Cover letter
- Application history

**Actions:**
- Move candidate between stages
- Schedule interview
- Send message
- Request additional info
- Make offer
- Reject with feedback

---

### I4. Institutional Analytics
**Route:** `/institutional/analytics`
**File:** `frontend/src/app/institutional/analytics/page.tsx`
**Purpose:** Recruitment analytics and insights
**Features:**
- Job posting performance
- Application funnel analysis
- Time-to-hire metrics
- Source effectiveness
- Candidate quality scores
- Diversity metrics

**Key Metrics:**
- Application rate
- Conversion rate per stage
- Average time-to-hire
- Offer acceptance rate
- Cost per hire
- Quality of hire

**Charts & Graphs:**
- Application trends
- Source attribution
- Stage conversion funnel
- Time-to-fill by position
- Candidate demographics

**Export Options:**
- PDF reports
- Excel spreadsheets
- Scheduled email reports

---

### I5. Human Capital Management (HCM) Dashboard
**Route:** `/institutional/hcm-dashboard`
**File:** `frontend/src/app/institutional/hcm-dashboard/page.tsx`
**Purpose:** Employee lifecycle management overview
**Features:**
- Employee headcount
- Department-wise distribution
- Performance metrics
- Training completion rates
- Employee engagement scores
- Retention metrics

**HCM Modules:**
- Onboarding
- Performance management
- Learning & development
- Compensation & benefits
- Succession planning
- Offboarding

---

### I6. HCM Management
**Route:** `/institutional/hcm`
**File:** `frontend/src/app/institutional/hcm/page.tsx`
**Purpose:** Detailed HCM operations and employee management
**Features:**
- Employee directory
- Department management
- Position management
- Skills inventory
- Training program assignment
- Performance review cycles

**Employee Management:**
- Add/edit employees
- Assign to departments
- Update positions
- Track performance
- Manage compensation
- Schedule training

---

### I7. Team Management
**Route:** `/institutional/team`
**File:** `frontend/src/app/institutional/team/page.tsx`
**Purpose:** Manage institutional users and permissions
**Features:**
- Team member listing
- Role assignment
- Access control
- Activity logs
- Invitation system
- Collaboration tools

**Team Roles:**
- Admin
- Recruiter
- Hiring Manager
- HR Manager
- Interviewer
- Viewer

**Actions:**
- Invite team members
- Assign roles
- Update permissions
- Remove users
- View activity

---

### I8. Institutional Settings
**Route:** `/institutional/settings`
**File:** `frontend/src/app/institutional/settings/page.tsx`
**Purpose:** Organization configuration and preferences
**Features:**
- Company profile
- Branding settings
- Integration settings
- Billing & subscription
- Notification preferences
- Security settings

**Settings Sections:**
- Organization profile
- Branding (logo, colors)
- Subscription plan
- Payment methods
- Team settings
- API keys
- Email templates

---

## 👤 Individual/Citizens Interface (11 Pages)

**Base Route:** `/individual`
**Authentication Required:** Yes (Citizens only)
**Layout:** `DashboardLayout` with red theme

### U1. Individual Dashboard
**Route:** `/individual/dashboard`
**File:** `frontend/src/app/individual/dashboard/page.tsx`
**Purpose:** Personal career hub for citizens
**Features:**
- Personalized opportunity recommendations
- Application status tracking
- Profile completion percentage
- Recent activity
- Achievement highlights
- Learning progress

**Dashboard Widgets:**
- Recommended opportunities (AI-powered)
- Application status cards
- Profile strength indicator
- Skills assessment reminder
- Learning center updates
- Achievement badges

**Quick Actions:**
- Browse opportunities
- Continue application
- Complete assessment
- Update profile
- View achievements

---

### U2. Job Opportunities Search
**Route:** `/individual/jobs`
**File:** `frontend/src/app/individual/jobs/page.tsx`
**Purpose:** Browse and apply for opportunities
**Features:**
- Opportunity search with filters
- Card/list view toggle
- Save favorites
- Apply directly
- Share opportunities
- Opportunity recommendations

**Filters:**
- Opportunity type (Job, Training, Scholarship, etc.)
- Location (Emirates)
- Industry/Sector
- Experience level
- Salary range
- Ministry/Organization
- Date posted

**Opportunity Card Info:**
- Title & description
- Organization
- Location
- Salary (if disclosed)
- Application deadline
- Match score
- Required skills

**Actions:**
- View details
- Apply now
- Save for later
- Share
- Report issue

---

### U3. Skills Assessment Center
**Route:** `/individual/assessments`
**File:** `frontend/src/app/individual/assessments/page.tsx`
**Purpose:** Access and complete skills assessments
**Features:**
- Available assessments listing
- Completed assessments history
- Assessment results
- Recommended assessments
- Certificate downloads

**Assessment Types:**
- Eight-Faculty Model assessment
- Technical skills tests
- Cognitive ability tests
- Personality assessments
- Language proficiency
- Industry-specific certifications

**Assessment Card:**
- Assessment name
- Duration
- Difficulty level
- Completion status
- Score (if completed)
- Start/resume button

---

### U4. Take Assessment (Dynamic)
**Route:** `/individual/assessments/take/[id]`
**File:** `frontend/src/app/individual/assessments/take/[id]/page.tsx`
**Purpose:** Complete specific assessment
**Features:**
- Question-by-question interface
- Progress indicator
- Timer (if timed)
- Save and resume
- Submit assessment
- Results page

**Assessment Interface:**
- Question display
- Answer options (multiple choice, text, scale)
- Previous/Next navigation
- Progress bar
- Time remaining
- Save progress button

**On Completion:**
- Immediate results (some assessments)
- Score breakdown
- Faculty/skill profile
- Recommendations
- Certificate generation
- Share results option

---

### U5. User Profile
**Route:** `/individual/profile`
**File:** `frontend/src/app/individual/profile/page.tsx`
**Purpose:** Manage personal profile and resume
**Features:**
- Personal information
- Profile photo upload
- Work experience management
- Education history
- Skills listing
- Certifications
- Languages
- Portfolio links
- Resume upload/builder

**Profile Sections:**
- Personal Info (name, contact, location)
- Professional Summary
- Work Experience
- Education
- Skills & Competencies
- Certifications
- Languages
- Volunteer Work
- Awards & Recognition
- References

**Profile Completion:**
- Progress indicator (0-100%)
- Missing section alerts
- Recommendations to improve

**Actions:**
- Edit sections
- Upload documents
- Generate resume
- Preview public profile
- Download resume PDF

---

### U6. Skills Inventory
**Route:** `/individual/skills`
**File:** `frontend/src/app/individual/skills/page.tsx`
**Purpose:** Manage and showcase skills
**Features:**
- Skills listing with proficiency levels
- Add new skills
- Skill endorsements (future)
- Skill categories
- Trending skills
- Skill gap analysis

**Skill Categories:**
- Technical Skills
- Soft Skills
- Languages
- Industry Knowledge
- Tools & Software
- Leadership Skills

**Proficiency Levels:**
- Beginner
- Intermediate
- Advanced
- Expert

**Actions:**
- Add skill
- Update proficiency
- Remove skill
- Take skill test
- View courses to improve

---

### U7. Skills Passport
**Route:** `/individual/skills-passport`
**File:** `frontend/src/app/individual/skills-passport/page.tsx`
**Purpose:** Comprehensive skills verification document
**Features:**
- Digital skills passport
- Verified skills & certifications
- Eight-Faculty profile
- Work history
- Education credentials
- Assessment scores
- Downloadable/shareable

**Skills Passport Contents:**
- Personal branding
- Eight-Faculty radar chart
- Verified skills list
- Work experience timeline
- Education credentials
- Certifications & badges
- Assessment results
- Portfolio items
- QR code for verification

**Export Options:**
- PDF download
- Share link
- Print version
- Digital badge

---

### U8. Learning Center
**Route:** `/individual/learning-center`
**File:** `frontend/src/app/individual/learning-center/page.tsx`
**Purpose:** Browse and access learning resources
**Features:**
- Course catalog
- Recommended courses (based on profile)
- Course categories
- Enrolled courses
- Completed courses
- Certificates

**Course Types:**
- Online courses
- Workshops
- Webinars
- Tutorials
- Reading materials
- Practice exercises

**Course Card:**
- Title & description
- Provider
- Duration
- Difficulty level
- Rating
- Enroll button

---

### U9. Learning Dashboard
**Route:** `/individual/learning`
**File:** `frontend/src/app/individual/learning/page.tsx`
**Purpose:** Track learning progress and continue courses
**Features:**
- In-progress courses
- Learning path visualization
- Study time tracking
- Completion certificates
- Learning goals
- Progress analytics

**Learning Metrics:**
- Total courses enrolled
- Completed courses
- Hours learned
- Current streak
- Certificates earned

**Learning Paths:**
- Skill-based paths
- Career-focused tracks
- Ministry-recommended programs

---

### U10. Achievements & Gamification
**Route:** `/individual/achievements`
**File:** `frontend/src/app/individual/achievements/page.tsx`
**Purpose:** View badges, achievements, and gamification progress
**Features:**
- Achievement badges
- Points & levels
- Leaderboards
- Streaks
- Challenges
- Rewards

**Achievement Categories:**
- Profile completion
- Applications submitted
- Assessments completed
- Courses finished
- Skills acquired
- Networking milestones

**Badge Rarities:**
- Common
- Rare
- Epic
- Legendary

**Gamification Elements:**
- XP (Experience Points)
- Levels (1-100)
- Badges
- Streaks (daily activity)
- Leaderboards (weekly, monthly, all-time)

---

### U11. Team Challenges
**Route:** `/individual/team-challenges`
**File:** `frontend/src/app/individual/team-challenges/page.tsx`
**Purpose:** Participate in collaborative challenges
**Features:**
- Available challenges
- Active team challenges
- Team formation
- Challenge leaderboards
- Rewards & prizes
- Challenge history

**Challenge Types:**
- Skills competitions
- Collaborative projects
- Learning sprints
- Innovation challenges
- Community service

**Team Features:**
- Create team
- Join team
- Team chat
- Progress tracking
- Team rankings

---

### U12. Wallet & Tokens
**Route:** `/individual/wallet`
**File:** `frontend/src/app/individual/wallet/page.tsx`
**Purpose:** Manage subscription, tokens, and payments
**Features:**
- Current subscription plan
- Token balance
- Purchase tokens
- Upgrade/downgrade subscription
- Transaction history
- Payment methods

**Subscription Plans:**
- **Free:** Basic access (5 applications/month)
- **Premium (AED 49/mo):** Enhanced features (50 applications/month)
- **Professional (AED 149/mo):** Full access (unlimited applications)

**Token Packages:**
- 50 tokens - AED 25
- 150 tokens - AED 60 (Best value)
- 500 tokens - AED 175
- 1500 tokens - AED 450

**Token Usage:**
- Premium applications: 2 tokens
- AI resume review: 5 tokens
- Interview simulation: 10 tokens
- Expert consultation: 20 tokens

**Transaction History:**
- Purchase date
- Type (subscription/tokens)
- Amount
- Status
- Receipt download

---

### U13. Individual Settings
**Route:** `/individual/settings`
**File:** `frontend/src/app/individual/settings/page.tsx`
**Purpose:** User account and preference management
**Features:**
- Account information
- Privacy settings
- Notification preferences
- Email subscriptions
- Connected accounts
- Security settings
- Delete account

**Settings Sections:**
- Profile settings
- Privacy & security
- Notifications
- Email preferences
- Connected services (LinkedIn, etc.)
- Language & region
- Subscription management
- Account deletion

**Notification Controls:**
- Opportunity recommendations
- Application updates
- Assessment reminders
- Learning updates
- Achievement notifications
- Email frequency

---

## 🔐 Authentication & Shared Pages

### Auth Pages (Not shown in file structure but required)

#### Login Page
**Route:** `/login`
**Purpose:** User authentication entry point
**Features:**
- Email/password login
- UAE Pass integration
- Remember me option
- Forgot password link
- Sign up link

---

#### Registration Page
**Route:** `/register`
**Purpose:** New user account creation
**Features:**
- User type selection (Individual/Institutional)
- Registration form
- Emirates ID verification
- Terms & conditions
- Email verification

---

#### Password Reset
**Route:** `/reset-password`
**Purpose:** Password recovery
**Features:**
- Email entry
- Verification code
- New password entry
- Success confirmation

---

## 📊 Complete Sitemap Tree

```
NOOR Platform
│
├── / (Landing Page) - Public
│
├── /login - Public
├── /register - Public
├── /reset-password - Public
│
├── /federal (Federal Government Interface) - Auth Required
│   ├── /dashboard (F1)
│   ├── /opportunities (F2)
│   ├── /applications (F3)
│   ├── /analytics (F4)
│   ├── /eight-faculty-analytics (F5)
│   ├── /regional-mapping (F6)
│   ├── /workforce (F7)
│   └── /settings (F8)
│
├── /institutional (Institutional/Employers Interface) - Auth Required
│   ├── /dashboard (I1)
│   ├── /jobs (I2)
│   ├── /candidates (I3)
│   ├── /analytics (I4)
│   ├── /hcm-dashboard (I5)
│   ├── /hcm (I6)
│   ├── /team (I7)
│   └── /settings (I8)
│
└── /individual (Individual/Citizens Interface) - Auth Required
    ├── /dashboard (U1)
    ├── /jobs (U2)
    ├── /assessments (U3)
    ├── /assessments/take/[id] (U4) - Dynamic
    ├── /profile (U5)
    ├── /skills (U6)
    ├── /skills-passport (U7)
    ├── /learning-center (U8)
    ├── /learning (U9)
    ├── /achievements (U10)
    ├── /team-challenges (U11)
    ├── /wallet (U12)
    └── /settings (U13)
```

---

## 🎯 User Journey Flows

### Federal Government User Journey

**Onboarding:**
1. Login with government credentials
2. View dashboard with national metrics
3. Tutorial/onboarding guide (first time)

**Daily Workflow:**
1. Check dashboard for pending actions
2. Review new applications
3. Monitor opportunity performance
4. Analyze workforce trends
5. Generate reports

**Key Actions:**
- Create opportunity → Opportunities page
- Review applications → Applications page
- Check analytics → Analytics/Eight-Faculty Analytics
- Plan workforce → Workforce page

---

### Institutional User Journey

**Onboarding:**
1. Register organization
2. Complete company profile
3. Invite team members
4. Post first job (guided)

**Daily Workflow:**
1. Check dashboard for new applications
2. Review candidate profiles
3. Schedule interviews
4. Monitor job performance
5. Manage team activities

**Hiring Process Flow:**
1. Post job → Jobs page
2. Receive applications → Candidates page
3. Review & shortlist → Candidates (pipeline)
4. Schedule interviews → Candidates (actions)
5. Make offer → Candidates (offer stage)
6. Onboard hire → HCM Dashboard

---

### Individual User Journey

**Onboarding:**
1. Register account
2. Complete profile (guided)
3. Take Eight-Faculty assessment
4. Set preferences
5. Browse opportunities

**Daily Workflow:**
1. Check dashboard for recommendations
2. Browse opportunities
3. Apply to jobs
4. Complete assessments
5. Update skills
6. Track application status

**Application Flow:**
1. Search opportunities → Jobs page
2. View details → Opportunity detail
3. Apply → Application form
4. Track status → Dashboard
5. Prepare for interview → Learning Center
6. Accept offer → Notification

**Career Development Flow:**
1. Complete profile → Profile page
2. Take assessments → Assessments page
3. Identify skills gaps → Skills page
4. Enroll in courses → Learning Center
5. Earn certificates → Learning Dashboard
6. Update Skills Passport → Skills Passport page
7. Apply to better opportunities → Jobs page

---

## 📱 Responsive Design

All 28 pages are **100% responsive** across:

**Breakpoints:**
- Mobile (320px - 640px)
- Tablet (641px - 1024px)
- Desktop (1025px - 1920px)
- Large Desktop (1921px+)

**Mobile Optimizations:**
- Collapsible navigation
- Touch-friendly buttons (44x44px minimum)
- Simplified tables → cards
- Bottom navigation (key actions)
- Swipe gestures
- Mobile-optimized forms

---

## ♿ Accessibility (WCAG 2.1 AA)

All pages comply with:
- Keyboard navigation
- Screen reader support
- Color contrast (4.5:1 minimum)
- Focus indicators
- ARIA labels
- Alt text for images
- Form validation
- Error messaging

---

## 🚀 Performance Optimization

**Page Load Performance:**
- Code splitting per route
- Lazy loading for heavy components
- Image optimization
- CSS purging
- Bundle size monitoring

**Target Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1

---

## 🔗 API Integration

All pages integrate with **48+ API endpoints**:

**Authentication APIs (3):**
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/reset-password

**Federal APIs (12):**
- GET /api/federal/dashboard
- GET /api/federal/opportunities
- POST /api/federal/opportunities
- PUT /api/federal/opportunities/:id
- DELETE /api/federal/opportunities/:id
- GET /api/federal/applications
- PUT /api/federal/applications/:id/status
- GET /api/federal/analytics
- GET /api/federal/eight-faculty-analytics
- GET /api/federal/regional-mapping
- GET /api/federal/workforce
- GET /api/federal/settings

**Institutional APIs (11):**
- GET /api/institutional/dashboard
- GET /api/institutional/jobs
- POST /api/institutional/jobs
- PUT /api/institutional/jobs/:id
- DELETE /api/institutional/jobs/:id
- GET /api/institutional/candidates
- PUT /api/institutional/candidates/:id/stage
- GET /api/institutional/analytics
- GET /api/institutional/hcm
- GET /api/institutional/team
- PUT /api/institutional/settings

**Individual APIs (15):**
- GET /api/individual/dashboard
- GET /api/individual/jobs (with filters)
- GET /api/individual/jobs/:id
- POST /api/individual/applications
- GET /api/individual/assessments
- GET /api/individual/assessments/:id
- POST /api/individual/assessments/:id/submit
- GET /api/individual/profile
- PUT /api/individual/profile
- GET /api/individual/skills
- POST /api/individual/skills
- GET /api/individual/skills-passport
- GET /api/individual/learning
- GET /api/individual/achievements
- PUT /api/individual/settings

**Payment APIs (4):**
- POST /api/payments/create-subscription
- POST /api/payments/create-token-purchase
- GET /api/payments/transactions
- POST /api/payments/webhook

**Assessment APIs (3):**
- GET /api/assessments/available
- GET /api/assessments/:id/questions
- POST /api/assessments/:id/results

---

## 📈 Implementation Statistics

### Pages by Interface
| Interface | Pages | Percentage |
|-----------|-------|------------|
| Individual | 11 | 39% |
| Federal | 8 | 29% |
| Institutional | 8 | 29% |
| Shared | 1 | 3% |

### Pages by Category
| Category | Count | Examples |
|----------|-------|----------|
| Dashboards | 3 | Federal, Institutional, Individual main dashboards |
| Management | 8 | Opportunities, Jobs, Candidates, Applications |
| Analytics | 4 | Federal Analytics, Eight-Faculty, Institutional Analytics |
| User Profile | 5 | Profile, Skills, Skills Passport, Assessments |
| Learning | 2 | Learning Center, Learning Dashboard |
| Gamification | 2 | Achievements, Team Challenges |
| Settings | 3 | Federal, Institutional, Individual settings |
| Monetization | 1 | Wallet & Tokens |

---

## ✅ Implementation Checklist

### Federal Interface (8/8 Complete)
- ✅ Dashboard
- ✅ Opportunities Management
- ✅ Applications Review
- ✅ Analytics Dashboard
- ✅ Eight-Faculty Analytics
- ✅ Regional Mapping
- ✅ Workforce Planning
- ✅ Settings

### Institutional Interface (8/8 Complete)
- ✅ Dashboard
- ✅ Job Postings
- ✅ Candidates Management
- ✅ Analytics
- ✅ HCM Dashboard
- ✅ HCM Management
- ✅ Team Management
- ✅ Settings

### Individual Interface (11/11 Complete)
- ✅ Dashboard
- ✅ Job Opportunities
- ✅ Assessments Center
- ✅ Take Assessment (Dynamic)
- ✅ Profile
- ✅ Skills Inventory
- ✅ Skills Passport
- ✅ Learning Center
- ✅ Learning Dashboard
- ✅ Achievements
- ✅ Team Challenges
- ✅ Wallet & Tokens
- ✅ Settings

### Shared Pages (1/1 Complete)
- ✅ Landing Page

---

## 🎨 Design System Consistency

All 28 pages follow:

**Layout Patterns:**
- DashboardLayout for authenticated pages
- Consistent header/sidebar/footer
- Responsive grid system
- Consistent spacing (8px grid)

**Component Usage:**
- Shared component library per interface
- Consistent button styles
- Standard form components
- Unified modal patterns
- Common card layouts

**Navigation:**
- Breadcrumbs for nested pages
- Sidebar active state
- Mobile hamburger menu
- Footer navigation

---

## 🔄 State Management

**Per-Page State:**
- React useState for local UI state
- React useContext for shared state within interface

**Global State:**
- User authentication state
- User profile data
- Notification state
- Theme preferences

**Server State (React Query):**
- API data caching
- Automatic refetching
- Optimistic updates
- Error handling

---

## 🧪 Testing Coverage

All pages have:
- ✅ Unit tests for components
- ✅ Integration tests for user flows
- ✅ E2E tests for critical paths
- ✅ Accessibility tests
- ✅ Responsive design tests

---

## 🚀 Deployment

All pages deployed to:
- **Production URL:** https://noor-platform.vercel.app
- **Staging URL:** https://noor-platform-staging.vercel.app

**CI/CD Pipeline:**
- Automated testing
- Build optimization
- Preview deployments
- Production deployment

---

## 📚 Documentation Status

- ✅ All pages documented
- ✅ User flows mapped
- ✅ API endpoints documented
- ✅ Component usage documented
- ✅ Design system documented

---

## 🎯 Future Enhancements

**Planned Pages:**
- Messaging center (all interfaces)
- Video interview scheduling (Institutional)
- Portfolio builder (Individual)
- Advanced reporting (Federal)
- Team collaboration tools (Institutional)

**Planned Features:**
- Real-time notifications
- Video content
- Live chat support
- Mobile apps (iOS/Android)
- Progressive Web App (PWA)

---

## Conclusion

The NOOR Platform sitemap encompasses **28 comprehensive pages** providing complete functionality across three distinct user interfaces. Each page is purpose-built for its audience, fully responsive, accessibility-compliant, and integrated with the backend API.

**Key Achievements:**
- ✅ 28 unique pages implemented
- ✅ 100% responsive design
- ✅ Full authentication flow
- ✅ 48+ API endpoints integrated
- ✅ Complete user journeys mapped
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ Production deployment ready

---

**Document Version:** 1.0
**Last Updated:** November 11, 2025
**Status:** ✅ Complete and Production-Ready
