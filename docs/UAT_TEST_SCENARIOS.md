# NOOR Platform - User Acceptance Testing Scenarios

**Version**: 1.0.0  
**Date**: November 3, 2024  
**Purpose**: Comprehensive UAT test cases for all three user personas

---

## Overview

This document provides detailed test scenarios for validating the NOOR Platform across all three user interfaces: Federal Government, Individual Citizens, and Institutional Employers. Each scenario includes preconditions, test steps, expected results, and acceptance criteria.

---

## Test Environment Setup

### Test Accounts

**Federal Government Admin**
- Email: `admin@moh.gov.ae`
- Password: `FederalAdmin2024!`
- Role: Federal Administrator
- Ministry: Ministry of Health and Prevention

**Individual Citizen**
- Email: `fatima.alhashimi@gmail.com`
- Password: `Citizen2024!`
- Role: Individual User
- Emirates ID: 784-1990-1234567-1

**Institutional Employer**
- Email: `hr@ministryofai.gov.ae`
- Password: `Institution2024!`
- Role: Institutional Admin
- Organization: Ministry of Artificial Intelligence

### Test Data

- **8 Faculties** with full competency definitions
- **96 Competencies** across all faculties
- **384 Assessment Questions** (sample set)
- **64 Courses** in Learning Center
- **Token Economy** fully configured

---

## Federal Government Interface Tests

### FG-001: Federal Dashboard Access

**Objective**: Verify Federal admin can access dashboard and view national statistics

**Preconditions**:
- User is logged in as Federal admin
- System has sample data populated

**Test Steps**:
1. Navigate to `/federal/dashboard`
2. Verify page loads within 3 seconds
3. Check "National Statistics" section displays:
   - Total citizens assessed
   - Average competency scores
   - Active opportunities
   - Institutional participation rate
4. Verify "Eight-Faculty Overview" chart displays all 8 faculties
5. Check "Recent Activities" feed shows latest system events

**Expected Results**:
- Dashboard loads successfully
- All statistics display with correct formatting
- Eight-Faculty chart renders with accurate data
- Activities feed shows chronological events
- No console errors

**Acceptance Criteria**:
- ✅ Page load time < 3 seconds
- ✅ All data sections populated
- ✅ Charts render correctly
- ✅ No broken UI elements

---

### FG-002: Eight-Faculty National Analytics

**Objective**: Verify Federal admin can view national Eight-Faculty competency data

**Preconditions**:
- Logged in as Federal admin
- Multiple citizens have completed assessments

**Test Steps**:
1. Navigate to `/federal/eight-faculty-analytics`
2. Verify "National Competency Overview" displays all 8 faculties
3. Check each faculty shows:
   - Average national score
   - Number of citizens assessed
   - Trend indicator (up/down/stable)
   - Custodian ministry
4. Click on "Physical Faculty" card
5. Verify detailed breakdown shows all 12 competencies
6. Check "Ministry Distribution" chart displays correctly
7. Verify "Top Performing Institutions" list shows rankings

**Expected Results**:
- All 8 faculties display with correct data
- Faculty cards are interactive and clickable
- Detailed views show competency breakdowns
- Charts and visualizations render properly
- Ministry associations are correct

**Acceptance Criteria**:
- ✅ All 8 faculties visible
- ✅ Scores accurate and up-to-date
- ✅ Drill-down functionality works
- ✅ Ministry mappings correct

---

### FG-003: Opportunities Management

**Objective**: Verify Federal admin can view and manage national opportunities

**Test Steps**:
1. Navigate to `/federal/opportunities`
2. Verify opportunities list displays with:
   - Job title
   - Ministry/Institution
   - Required competencies
   - Application count
   - Status
3. Click "Filter" button
4. Select "Ministry of Health" from ministry filter
5. Verify list updates to show only MOHAP opportunities
6. Click on an opportunity to view details
7. Verify detail page shows:
   - Full job description
   - Required Eight-Faculty scores
   - Applicant statistics
   - Match quality distribution

**Expected Results**:
- Opportunities list loads with all fields
- Filtering works correctly
- Detail views show complete information
- Match scores display accurately

**Acceptance Criteria**:
- ✅ All opportunities visible
- ✅ Filters function correctly
- ✅ Detail pages complete
- ✅ Match scores calculated properly

---

### FG-004: Application Review

**Objective**: Verify Federal admin can review applications across institutions

**Test Steps**:
1. Navigate to `/federal/applications`
2. Verify applications table displays:
   - Applicant name
   - Opportunity title
   - Institution
   - Match score
   - Application date
   - Status
3. Sort by "Match Score" descending
4. Verify table re-sorts correctly
5. Click on high-match application
6. Verify applicant profile shows:
   - Eight-Faculty scores
   - Skills Passport summary
   - Work history
   - Certifications
7. Check "Competency Match" visualization

**Expected Results**:
- Applications table populates correctly
- Sorting functions work
- Applicant profiles display completely
- Match visualizations render

**Acceptance Criteria**:
- ✅ All applications visible
- ✅ Sorting/filtering works
- ✅ Profiles complete
- ✅ Match scores accurate

---

## Individual Citizens Interface Tests

### IC-001: Individual Dashboard Access

**Objective**: Verify citizen can access personalized dashboard

**Preconditions**:
- User logged in as Individual citizen
- User has completed at least one assessment

**Test Steps**:
1. Navigate to `/individual/dashboard`
2. Verify "Welcome Back" section displays user name
3. Check "Your Progress" shows:
   - Overall competency score
   - Assessments completed
   - Courses unlocked
   - Current level
4. Verify "Token Wallet" widget displays:
   - Current balance
   - Recent transactions
5. Check "Recommended Assessments" section
6. Verify "Learning Path" suggestions display

**Expected Results**:
- Dashboard personalizes to logged-in user
- All statistics accurate
- Token balance correct
- Recommendations relevant

**Acceptance Criteria**:
- ✅ Personalization works
- ✅ Statistics accurate
- ✅ Wallet balance correct
- ✅ Recommendations display

---

### IC-002: Skills Passport Viewing

**Objective**: Verify citizen can view complete Skills Passport with Eight-Faculty scores

**Preconditions**:
- User has completed assessments in multiple faculties

**Test Steps**:
1. Navigate to `/individual/skills-passport`
2. Verify "Eight-Faculty Overview" displays:
   - Octagon chart with all 8 faculties
   - Score for each faculty (0-100)
   - Color-coded by faculty
3. Click on "Physical Faculty" section
4. Verify detailed view shows:
   - All 12 competencies
   - Score for each competency
   - Last assessed date
   - "Retake Assessment" button
5. Check "Faculty Insights" panel shows:
   - Strengths (top 3 competencies)
   - Development areas (bottom 3)
   - Recommended courses
6. Verify "Download Certificate" button works

**Expected Results**:
- Skills Passport displays all faculties
- Octagon chart renders correctly
- Competency details accurate
- Insights relevant and helpful

**Acceptance Criteria**:
- ✅ All 8 faculties visible
- ✅ Scores accurate
- ✅ Drill-down works
- ✅ Insights generated correctly

---

### IC-003: Assessment Taking Flow

**Objective**: Verify complete assessment taking experience with gamification

**Preconditions**:
- User logged in
- User has not completed "Mental Faculty" assessment

**Test Steps**:
1. Navigate to `/individual/assessments`
2. Find "Mental Faculty Assessment" card
3. Verify card shows:
   - Faculty name and icon
   - Duration estimate
   - Token reward range
   - Difficulty level
4. Click "Start Assessment"
5. Verify assessment interface shows:
   - Progress bar (0%)
   - Question counter (1/48)
   - Timer
   - Question text
   - Answer options
6. Answer first question (select option C)
7. Click "Next"
8. Verify progress updates (2/48, ~2%)
9. Continue answering all 48 questions
10. On final question, click "Submit Assessment"
11. Verify results screen shows:
    - Overall score (0-100)
    - Performance band (Excellent/Good/Average/Fair)
    - Tokens earned
    - Competency breakdown
    - "View Skills Passport" button
    - "Unlock Courses" button

**Expected Results**:
- Assessment interface intuitive
- Progress tracking works
- All questions display correctly
- Scoring calculates accurately
- Tokens awarded based on performance

**Acceptance Criteria**:
- ✅ 48 questions presented
- ✅ Progress tracking accurate
- ✅ Scoring correct
- ✅ Tokens awarded properly
- ✅ Results comprehensive

---

### IC-004: Token Wallet Management

**Objective**: Verify token wallet displays transactions and balance correctly

**Preconditions**:
- User has earned tokens from assessments
- User has spent tokens on courses

**Test Steps**:
1. Navigate to `/individual/wallet`
2. Verify "Token Balance" section shows:
   - Current balance (large, prominent)
   - Total earned
   - Total spent
3. Check "Transaction History" displays:
   - Date/time
   - Type (Earned/Spent)
   - Amount (+/-)
   - Source (assessment name or course name)
   - Running balance
4. Verify transactions sorted by date (newest first)
5. Click "Filter" and select "Earned Only"
6. Verify list updates to show only earning transactions
7. Check "Achievements" section shows:
   - Unlocked badges
   - Progress toward next badge
8. Verify "Streak" widget shows:
   - Current streak days
   - Longest streak
   - Streak bonus multiplier

**Expected Results**:
- Balance accurate and prominent
- All transactions listed
- Filtering works correctly
- Achievements display properly
- Streak tracking accurate

**Acceptance Criteria**:
- ✅ Balance matches transactions
- ✅ History complete
- ✅ Filtering functional
- ✅ Achievements correct

---

### IC-005: Learning Center Course Unlocking

**Objective**: Verify user can browse courses and unlock with tokens

**Preconditions**:
- User has at least 150 tokens
- User has not unlocked "Advanced Python Programming" course

**Test Steps**:
1. Navigate to `/individual/learning-center`
2. Verify course catalog displays:
   - Course cards with title, description, token cost
   - Faculty filter tabs
   - Sort options (Price, Rating, Popularity)
3. Click "Intellectual" faculty tab
4. Verify courses filter to Intellectual faculty only
5. Find "Advanced Python Programming" (150 tokens)
6. Click course card to view details
7. Verify detail page shows:
   - Full description
   - Module list
   - Instructor info
   - Duration
   - Rating and reviews
   - Token cost
   - "Unlock Course" button
8. Click "Unlock Course"
9. Verify confirmation modal shows:
   - Course title
   - Token cost
   - Current balance
   - New balance after purchase
   - "Confirm" and "Cancel" buttons
10. Click "Confirm"
11. Verify success message displays
12. Check token balance decreased by 150
13. Verify course now shows "Start Learning" button
14. Check "My Courses" tab shows newly unlocked course

**Expected Results**:
- Course catalog displays all courses
- Filtering works correctly
- Detail pages complete
- Unlock process smooth
- Token deduction accurate
- Course accessible after unlock

**Acceptance Criteria**:
- ✅ All 64 courses visible
- ✅ Filtering works
- ✅ Unlock process functions
- ✅ Tokens deducted correctly
- ✅ Course accessible post-unlock

---

### IC-006: Team Challenges Participation

**Objective**: Verify collaborative assessment features

**Preconditions**:
- User logged in
- At least one active team challenge exists

**Test Steps**:
1. Navigate to `/individual/team-challenges`
2. Verify "Active Challenges" section displays:
   - Challenge name
   - Team size
   - Faculty focus
   - Reward pool
   - Time remaining
3. Click "Join Challenge" on available challenge
4. Verify team formation interface shows:
   - Current team members
   - Invite friends option
   - Start when ready button
5. Click "Start Challenge"
6. Complete collaborative assessment
7. Verify team results show:
   - Individual scores
   - Team average
   - Ranking
   - Token distribution

**Expected Results**:
- Challenges list displays correctly
- Team formation works
- Collaborative assessment functions
- Results calculated fairly

**Acceptance Criteria**:
- ✅ Challenges visible
- ✅ Team formation works
- ✅ Assessment collaborative
- ✅ Rewards distributed

---

## Institutional Employers Interface Tests

### IN-001: HCM Dashboard Access

**Objective**: Verify institutional admin can access HCM dashboard

**Preconditions**:
- User logged in as Institutional admin
- Organization has employees in system

**Test Steps**:
1. Navigate to `/institutional/hcm-dashboard`
2. Verify "Workforce Overview" displays:
   - Total employees
   - Average competency score
   - Assessment completion rate
   - Active job postings
3. Check "Eight-Faculty Workforce Profile" shows:
   - Radar chart with all 8 faculties
   - Organization average vs. national average
   - Strengths and gaps identified
4. Verify "Top Performers" list shows:
   - Employee names
   - Overall scores
   - Top faculty
5. Check "Skills Gaps" section highlights:
   - Competencies below threshold
   - Number of employees affected
   - Recommended training

**Expected Results**:
- Dashboard loads with organization data
- All statistics accurate
- Comparisons to national averages work
- Insights actionable

**Acceptance Criteria**:
- ✅ Organization data isolated
- ✅ Statistics accurate
- ✅ Comparisons correct
- ✅ Insights relevant

---

### IN-002: Employee Eight-Faculty Analytics

**Objective**: Verify detailed workforce competency analysis

**Preconditions**:
- Multiple employees have completed assessments

**Test Steps**:
1. Navigate to HCM Dashboard
2. Click "View Detailed Analytics"
3. Verify "Faculty Distribution" shows:
   - Histogram for each faculty
   - Distribution of employee scores
   - Mean, median, mode indicators
4. Click on "Physical Faculty"
5. Verify competency breakdown shows:
   - All 12 competencies
   - Average score per competency
   - Number of employees assessed
   - Trend over time
6. Check "Department Comparison" chart
7. Verify departments can be compared side-by-side

**Expected Results**:
- Analytics comprehensive
- Visualizations clear
- Drill-down functional
- Comparisons insightful

**Acceptance Criteria**:
- ✅ All faculties analyzed
- ✅ Distributions accurate
- ✅ Drill-down works
- ✅ Comparisons functional

---

### IN-003: Job Posting Creation

**Objective**: Verify institutional admin can create job posting with competency requirements

**Test Steps**:
1. Navigate to `/institutional/jobs`
2. Click "Create New Job Posting"
3. Fill in job details:
   - Title: "Senior AI Engineer"
   - Description: [detailed description]
   - Department: "AI Research"
   - Salary Range: "25,000 - 35,000 AED"
4. In "Required Competencies" section:
   - Select "Intellectual Faculty" minimum: 85
   - Select "Mental Faculty" minimum: 80
   - Select specific competencies:
     - Learning Agility: 90
     - Problem Solving: 85
     - Systems Thinking: 80
5. Set application deadline
6. Click "Publish Job"
7. Verify job appears in listings
8. Check job detail page shows all requirements

**Expected Results**:
- Job creation form complete
- Competency selection intuitive
- Job publishes successfully
- Requirements display correctly

**Acceptance Criteria**:
- ✅ Form validation works
- ✅ Competency selection functional
- ✅ Job publishes correctly
- ✅ Requirements clear

---

### IN-004: Candidate Evaluation

**Objective**: Verify institutional admin can evaluate candidates based on Eight-Faculty scores

**Preconditions**:
- Job posting has received applications
- Applicants have completed assessments

**Test Steps**:
1. Navigate to job posting
2. Click "View Applications"
3. Verify applicant list shows:
   - Name
   - Overall match score (%)
   - Eight-Faculty match visualization
   - Application date
4. Sort by "Match Score" descending
5. Click on top candidate
6. Verify candidate profile shows:
   - Complete Skills Passport
   - Eight-Faculty scores
   - Competency-by-competency comparison to requirements
   - Color-coded match indicators (green/yellow/red)
   - Work history
   - Certifications
7. Check "Competency Gap Analysis" section
8. Verify gaps highlighted with development recommendations

**Expected Results**:
- Applicant list complete
- Match scores accurate
- Profiles comprehensive
- Gap analysis helpful

**Acceptance Criteria**:
- ✅ All applicants visible
- ✅ Match scores correct
- ✅ Profiles complete
- ✅ Gap analysis accurate

---

## Cross-Functional Tests

### CF-001: Data Flow Validation

**Objective**: Verify data flows correctly from Individual to Institutional to Federal

**Test Steps**:
1. As Individual user, complete "Physical Faculty" assessment
2. Verify score appears in Skills Passport
3. As Institutional admin (same organization), check HCM dashboard
4. Verify employee's new score reflected in organization averages
5. As Federal admin, check national analytics
6. Verify national averages updated with new assessment

**Expected Results**:
- Data propagates through all levels
- Aggregations update correctly
- No data leakage between organizations
- Real-time or near-real-time updates

**Acceptance Criteria**:
- ✅ Individual data saves
- ✅ Institutional aggregates update
- ✅ Federal statistics update
- ✅ Data privacy maintained

---

### CF-002: Token Economy Flow

**Objective**: Verify complete token earning and spending cycle

**Test Steps**:
1. Note starting token balance
2. Complete assessment scoring 92 (should earn 100 tokens)
3. Verify wallet shows +100 tokens
4. Browse Learning Center
5. Unlock course costing 75 tokens
6. Verify wallet shows -75 tokens
7. Check final balance = starting + 100 - 75

**Expected Results**:
- Tokens earned correctly based on score
- Wallet updates immediately
- Course unlock deducts correct amount
- Balance always accurate

**Acceptance Criteria**:
- ✅ Earning calculation correct
- ✅ Spending deduction correct
- ✅ Balance always accurate
- ✅ No token duplication bugs

---

### CF-003: Performance Under Load

**Objective**: Verify system performs well with multiple concurrent users

**Test Steps**:
1. Simulate 100 concurrent users
2. Each user performs:
   - Login
   - View dashboard
   - Start assessment
   - Submit assessment
3. Measure:
   - Average response time
   - Error rate
   - Database connection pool usage

**Expected Results**:
- Response time < 500ms for 95% of requests
- Error rate < 1%
- No database connection exhaustion
- No memory leaks

**Acceptance Criteria**:
- ✅ Performance targets met
- ✅ No errors under load
- ✅ Resources managed efficiently

---

## UAT Sign-Off Criteria

### Federal Government Interface

- [ ] All dashboard statistics display correctly
- [ ] Eight-Faculty national analytics functional
- [ ] Opportunities management works
- [ ] Application review process complete
- [ ] Reports generate successfully

### Individual Citizens Interface

- [ ] Dashboard personalization works
- [ ] Skills Passport displays accurately
- [ ] Assessment taking flow smooth
- [ ] Token wallet functions correctly
- [ ] Learning Center unlocking works
- [ ] Team challenges functional

### Institutional Employers Interface

- [ ] HCM dashboard displays correctly
- [ ] Employee analytics comprehensive
- [ ] Job posting creation works
- [ ] Candidate evaluation functional
- [ ] Skills gap analysis helpful

### Cross-Functional

- [ ] Data flows correctly across all levels
- [ ] Token economy functions properly
- [ ] Performance acceptable under load
- [ ] Security and privacy maintained
- [ ] No critical bugs identified

---

## Test Execution Schedule

**Week 1**: Federal Government Interface (FG-001 to FG-004)  
**Week 2**: Individual Citizens Interface (IC-001 to IC-006)  
**Week 3**: Institutional Employers Interface (IN-001 to IN-004)  
**Week 4**: Cross-Functional Tests (CF-001 to CF-003)  
**Week 5**: Bug fixes and retesting  
**Week 6**: Final sign-off

---

**Total Test Cases**: 17  
**Estimated Testing Time**: 40-50 hours  
**Recommended Testers**: 3-5 users per persona  
**Success Criteria**: 95%+ test cases passing

