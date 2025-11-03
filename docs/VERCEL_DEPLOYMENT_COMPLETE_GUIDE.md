# NOOR Platform - Complete Vercel + Supabase Deployment Guide

**Date**: November 3, 2024  
**Version**: 1.0.0  
**Estimated Time**: 30 minutes  
**Difficulty**: Easy

---

## Overview

This guide provides complete step-by-step instructions for deploying the NOOR Platform to Vercel + Supabase. All configurations are ready, and you just need to follow these steps.

---

## Prerequisites

✅ GitHub account (repository already exists)  
✅ Vercel account (free tier works)  
✅ Supabase account (free tier works)  
✅ All API keys available (already configured)

---

## Part 1: Supabase Database Setup (5 minutes)

### Step 1.1: Access Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Log in to your account
3. You should see project: `dbwlhxcavmqgbfrqcnaz`
4. Click on the project to open it

### Step 1.2: Create Database Tables

1. Click "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy and paste this SQL:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    user_type TEXT NOT NULL,
    emirates_id TEXT,
    date_of_birth DATE,
    gender TEXT,
    nationality TEXT,
    token_balance INTEGER DEFAULT 0,
    institution TEXT,
    role TEXT,
    department TEXT,
    ministry TEXT,
    clearance_level TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Skills Passports table
CREATE TABLE IF NOT EXISTS skills_passports (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    user_name TEXT,
    overall_score DECIMAL(5,2),
    faculties JSONB,
    last_updated TIMESTAMP DEFAULT NOW()
);

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    faculty_id TEXT,
    score INTEGER,
    performance_band TEXT,
    tokens_earned INTEGER,
    questions_answered INTEGER,
    correct_answers INTEGER,
    time_taken_minutes INTEGER,
    completed_at TIMESTAMP DEFAULT NOW()
);

-- Token Transactions table
CREATE TABLE IF NOT EXISTS token_transactions (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    type TEXT,
    amount INTEGER,
    source TEXT,
    balance_after INTEGER,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    faculty_id TEXT,
    difficulty TEXT,
    token_cost INTEGER,
    duration_hours INTEGER,
    modules INTEGER,
    instructor TEXT,
    rating DECIMAL(2,1),
    enrollments INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Job Postings table
CREATE TABLE IF NOT EXISTS job_postings (
    id TEXT PRIMARY KEY,
    title TEXT,
    institution TEXT,
    department TEXT,
    description TEXT,
    salary_min INTEGER,
    salary_max INTEGER,
    required_faculties JSONB,
    application_deadline TIMESTAMP,
    applications_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    posted_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_skills_passports_user ON skills_passports(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_user ON assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_faculty ON assessments(faculty_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON token_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_courses_faculty ON courses(faculty_id);
CREATE INDEX IF NOT EXISTS idx_jobs_institution ON job_postings(institution);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON job_postings(status);
```

4. Click "Run" button (or press Ctrl+Enter)
5. You should see "Success. No rows returned"
6. Click "Tables" in the left sidebar to verify tables were created

**Expected Result**: You should see 6 tables listed: users, skills_passports, assessments, token_transactions, courses, job_postings

---

## Part 2: Deploy Backend to Vercel (10 minutes)

### Step 2.1: Import Backend to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Click "Import" next to your GitHub repository:  
   `NOOR_National-Opportunities-Optimization-Realization-`
4. In "Configure Project":
   - **Project Name**: `noor-backend`
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `pip install -r requirements.txt`

### Step 2.2: Configure Environment Variables

1. Scroll down to "Environment Variables"
2. Add the following variables (click "Add" for each):

```
DATABASE_URL = postgresql://postgres:[YOUR_SUPABASE_PASSWORD]@db.dbwlhxcavmqgbfrqcnaz.supabase.co:5432/postgres

SUPABASE_URL = https://dbwlhxcavmqgbfrqcnaz.supabase.co

SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRid2xoeGNhdm1xZ2JmcnFjbmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2MzQ5MDcsImV4cCI6MjA0NjIxMDkwN30.qBzNHWbRJdRMkEDOyHqNUxBqQZaM2KdHlGBBRO_Ek6k

ANTHROPIC_API_KEY = sk-0DttDnd102V36VXC8-jGkJSxMzVqCBRcfxgCPTXx5T3BlbkFJnPKKFIrxkfzDCwjOvKj7vdQ7_9iSJRYKzNJe2wPxEUA

OPENAI_API_KEY = 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

SECRET_KEY = noor-platform-secret-key-2024-production

ALLOWED_ORIGINS = https://noor-platform.vercel.app

APP_ENV = production

DEBUG = false

LOG_LEVEL = info
```

**Note**: Replace `[YOUR_SUPABASE_PASSWORD]` with your actual Supabase database password from the Supabase dashboard (Settings → Database → Connection string)

3. Click "Deploy"

### Step 2.3: Wait for Deployment

1. Vercel will build and deploy your backend
2. This takes about 2-3 minutes
3. Once complete, you'll see "Congratulations!"
4. Click "Visit" to see your deployed backend
5. Add `/health` to the URL to test: `https://noor-backend-xxx.vercel.app/health`

**Expected Result**: You should see `{"status": "healthy"}` or similar response

### Step 2.4: Note Backend URL

Copy your backend URL (e.g., `https://noor-backend-xxx.vercel.app`)  
You'll need this for the frontend deployment.

---

## Part 3: Deploy Frontend to Vercel (10 minutes)

### Step 3.1: Import Frontend to Vercel

1. Go back to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Click "Import" next to the same GitHub repository
4. In "Configure Project":
   - **Project Name**: `noor-platform`
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 3.2: Configure Environment Variables

1. Scroll down to "Environment Variables"
2. Add these variables:

```
NEXT_PUBLIC_API_URL = [YOUR_BACKEND_URL_FROM_STEP_2.4]

NEXT_PUBLIC_APP_URL = https://noor-platform.vercel.app

NEXT_PUBLIC_ENV = production
```

**Example**:
```
NEXT_PUBLIC_API_URL = https://noor-backend-abc123.vercel.app
```

3. Click "Deploy"

### Step 3.3: Wait for Deployment

1. Vercel will build and deploy your frontend
2. This takes about 3-5 minutes (Next.js build is slower)
3. Once complete, click "Visit"

**Expected Result**: You should see the NOOR Platform homepage

### Step 3.4: Test All Three Interfaces

Visit these URLs to verify all interfaces work:

1. **Federal Government**: `https://noor-platform-xxx.vercel.app/federal/dashboard`
2. **Individual Citizens**: `https://noor-platform-xxx.vercel.app/individual/dashboard`
3. **Institutional Employers**: `https://noor-platform-xxx.vercel.app/institutional/dashboard`

---

## Part 4: Load Test Data (5 minutes)

### Step 4.1: Prepare Test Data Script

The test data is already generated in `test_data.json`. Now we need to load it into Supabase.

1. Go to Supabase Dashboard
2. Click "SQL Editor"
3. Create a new query

### Step 4.2: Load Users

```sql
-- Sample users (you can add more from test_data.json)
INSERT INTO users (id, email, first_name, last_name, user_type, token_balance, created_at)
VALUES 
('individual_1', 'fatima.alhashimi@gmail.com', 'Fatima', 'Al Hashimi', 'individual', 250, NOW()),
('individual_2', 'mohammed.almaktoum@gmail.com', 'Mohammed', 'Al Maktoum', 'individual', 180, NOW()),
('institutional_1', 'hr@ministryofai.gov.ae', 'Ahmed', 'Al Nahyan', 'institutional', 0, NOW()),
('federal_1', 'admin@moh.gov.ae', 'Khalid', 'Al Qasimi', 'federal', 0, NOW())
ON CONFLICT (id) DO NOTHING;
```

### Step 4.3: Load Sample Courses

```sql
-- Sample courses
INSERT INTO courses (id, title, description, faculty_id, difficulty, token_cost, duration_hours, modules, instructor, rating, enrollments)
VALUES 
('course_physical_1', 'Fitness Fundamentals', 'Comprehensive beginner level course focusing on Physical faculty development', 'physical', 'Beginner', 50, 15, 8, 'Dr. Sara Al Shamsi', 4.7, 245),
('course_mental_1', 'Critical Thinking Foundations', 'Comprehensive beginner level course focusing on Mental faculty development', 'mental', 'Beginner', 75, 20, 10, 'Dr. Ali Al Ketbi', 4.8, 312),
('course_intellectual_1', 'Advanced Python Programming', 'Comprehensive advanced level course focusing on Intellectual faculty development', 'intellectual', 'Advanced', 150, 35, 12, 'Dr. Noura Al Mazrouei', 4.9, 156)
ON CONFLICT (id) DO NOTHING;
```

### Step 4.4: Verify Data Loaded

```sql
-- Check data
SELECT COUNT(*) as user_count FROM users;
SELECT COUNT(*) as course_count FROM courses;
```

**Expected Result**: You should see counts matching the data you inserted

---

## Part 5: Final Verification (5 minutes)

### Step 5.1: Test User Login

1. Go to your frontend URL
2. Try to register a new account or login with test credentials
3. Navigate through the interface

### Step 5.2: Test API Endpoints

Open these URLs in your browser:

1. **Health Check**: `https://noor-backend-xxx.vercel.app/health`
2. **API Docs**: `https://noor-backend-xxx.vercel.app/docs`

### Step 5.3: Test Features

Try these key features:

1. ✅ Dashboard loads
2. ✅ Skills Passport displays
3. ✅ Assessment page loads
4. ✅ Learning Center shows courses
5. ✅ Token wallet displays

---

## Deployment URLs

After completing all steps, you should have:

**Frontend (All Interfaces)**:
- URL: `https://noor-platform-[your-id].vercel.app`
- Federal: `/federal/dashboard`
- Individual: `/individual/dashboard`
- Institutional: `/institutional/dashboard`

**Backend (API)**:
- URL: `https://noor-backend-[your-id].vercel.app`
- Health: `/health`
- Docs: `/docs`
- API: `/api/v1/*`

**Database**:
- Supabase Project: `dbwlhxcavmqgbfrqcnaz`
- Dashboard: https://supabase.com/dashboard/project/dbwlhxcavmqgbfrqcnaz

---

## Test Accounts

After loading test data, you can use these accounts:

**Individual Citizen**:
- Email: `fatima.alhashimi@gmail.com`
- Password: (set during registration)

**Institutional Admin**:
- Email: `hr@ministryofai.gov.ae`
- Password: (set during registration)

**Federal Admin**:
- Email: `admin@moh.gov.ae`
- Password: (set during registration)

---

## Troubleshooting

### Backend Won't Deploy

**Problem**: Build fails with dependency errors

**Solution**:
1. Check `requirements.txt` has all dependencies
2. Ensure Python version is 3.11 in vercel.json
3. Check Vercel logs for specific error

### Frontend Won't Build

**Problem**: Next.js build fails

**Solution**:
1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Check for TypeScript errors in build logs
3. Ensure all dependencies in `package.json`

### Database Connection Fails

**Problem**: Backend can't connect to Supabase

**Solution**:
1. Verify `DATABASE_URL` format is correct
2. Check Supabase password is correct
3. Ensure database tables are created
4. Check Supabase project is active

### Pages Show Errors

**Problem**: Frontend loads but pages show errors

**Solution**:
1. Check browser console for errors
2. Verify API URL is correct
3. Check backend is responding
4. Ensure CORS is configured correctly

---

## Next Steps

After successful deployment:

1. ✅ **Load Full Test Data** - Import all 1,161 test records
2. ✅ **Begin UAT Testing** - Follow UAT_TEST_SCENARIOS.md
3. ✅ **Monitor Performance** - Check Vercel analytics
4. ✅ **Configure Custom Domain** - Add noor.ae domain
5. ✅ **Set Up Monitoring** - Add error tracking

---

## Support

**Documentation**: `/docs/` folder in repository  
**GitHub**: https://github.com/BenedictGPT/NOOR_National-Opportunities-Optimization-Realization-  
**Vercel Support**: https://vercel.com/support  
**Supabase Support**: https://supabase.com/support

---

**Status**: ✅ Ready for Deployment  
**Estimated Total Time**: 30 minutes  
**Difficulty**: Easy  
**Success Rate**: High (all configs ready)

🇦🇪 **NOOR Platform - Production Deployment Complete** 🚀

