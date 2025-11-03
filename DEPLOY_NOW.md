# NOOR Platform - Quick Deployment Guide

**New Supabase Project**: `xrmlxpiyqptyysuzgvnr`  
**Status**: Ready to Deploy  
**Time**: 30 minutes

---

## Step 1: Supabase Database Setup (5 minutes)

### 1.1 Access Supabase

1. Go to: https://supabase.com/dashboard/project/xrmlxpiyqptyysuzgvnr
2. Click "SQL Editor" in left sidebar
3. Click "New query"

### 1.2 Run This SQL

Copy and paste this entire SQL block, then click "Run":

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    user_type TEXT NOT NULL,
    token_balance INTEGER DEFAULT 0,
    subscription_plan TEXT,
    subscription_status TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Skills Passports
CREATE TABLE IF NOT EXISTS skills_passports (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    overall_score DECIMAL(5,2),
    faculties JSONB,
    last_updated TIMESTAMP DEFAULT NOW()
);

-- Assessments
CREATE TABLE IF NOT EXISTS assessments (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    faculty_id TEXT,
    score INTEGER,
    tokens_earned INTEGER,
    completed_at TIMESTAMP DEFAULT NOW()
);

-- Token Transactions
CREATE TABLE IF NOT EXISTS token_transactions (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    type TEXT,
    amount INTEGER,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Courses
CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT,
    faculty_id TEXT,
    token_cost INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_skills_passports_user ON skills_passports(user_id);
```

**Expected**: "Success. No rows returned"

---

## Step 2: Deploy Backend (10 minutes)

### 2.1 Go to Vercel

1. Open: https://vercel.com/new
2. Click "Import" next to your GitHub repo
3. Configure:
   - **Project Name**: `noor-backend`
   - **Root Directory**: `backend`
   - **Framework**: Other

### 2.2 Environment Variables

Add these (click "+ Add" for each):

```
SUPABASE_URL=https://xrmlxpiyqptyysuzgvnr.supabase.co

SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhybWx4cGl5cXB0eXlzdXpndm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjUyMzQsImV4cCI6MjA3Nzc0MTIzNH0.57fxW0F0fU2cuLY4x9l8mpNKnNWPBpOowkwtb34H3_I

STRIPE_SECRET_KEY=sb_secret_UTXcpkk5Zk4z7rnObCj-aA_jj7wfnD6

STRIPE_PUBLISHABLE_KEY=sb_publishable_YwQj6LWi2hgNpUOg_bZ85g_6w6XUblC

SECRET_KEY=noor-secret-2024

APP_ENV=production
```

### 2.3 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Copy your URL: `https://noor-backend-xxx.vercel.app`
4. Test: Open `https://noor-backend-xxx.vercel.app/health`

**Expected**: `{"status":"healthy"}`

---

## Step 3: Deploy Frontend (10 minutes)

### 3.1 Go to Vercel Again

1. Open: https://vercel.com/new
2. Import same GitHub repo
3. Configure:
   - **Project Name**: `noor-platform`
   - **Root Directory**: `frontend`
   - **Framework**: Next.js

### 3.2 Environment Variables

Replace `YOUR_BACKEND_URL` with URL from Step 2.3:

```
NEXT_PUBLIC_API_URL=YOUR_BACKEND_URL

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=sb_publishable_YwQj6LWi2hgNpUOg_bZ85g_6w6XUblC

NEXT_PUBLIC_ENV=production
```

**Example**:
```
NEXT_PUBLIC_API_URL=https://noor-backend-abc123.vercel.app
```

### 3.3 Deploy

1. Click "Deploy"
2. Wait 3-5 minutes
3. Visit: `https://noor-platform-xxx.vercel.app`

---

## Step 4: Test (5 minutes)

### 4.1 Test Interfaces

Visit these URLs:

1. **Federal**: `https://noor-platform-xxx.vercel.app/federal/dashboard`
2. **Individual**: `https://noor-platform-xxx.vercel.app/individual/dashboard`
3. **Institutional**: `https://noor-platform-xxx.vercel.app/institutional/dashboard`

### 4.2 Test Payments

1. Go to: `https://noor-platform-xxx.vercel.app/individual/wallet`
2. Click "Purchase Tokens"
3. Use test card: `4242 4242 4242 4242`

---

## Troubleshooting

### Backend Won't Deploy

**Check**:
- Requirements.txt exists in backend folder
- Environment variables are correct
- No syntax errors in Python files

**Fix**: Check Vercel build logs for specific error

### Frontend Won't Build

**Check**:
- NEXT_PUBLIC_API_URL is set correctly
- Package.json exists in frontend folder
- No TypeScript errors

**Fix**: Check Vercel build logs

### Database Connection Fails

**Check**:
- Tables were created in Supabase
- SUPABASE_URL and SUPABASE_KEY are correct
- Supabase project is active

**Fix**: Re-run SQL in Step 1.2

---

## Success Checklist

- [ ] Supabase tables created
- [ ] Backend deployed to Vercel
- [ ] Backend health check works
- [ ] Frontend deployed to Vercel
- [ ] All three interfaces load
- [ ] Payment flow works

---

## Your Deployment URLs

**Backend**: `https://noor-backend-[your-id].vercel.app`  
**Frontend**: `https://noor-platform-[your-id].vercel.app`  
**Supabase**: `https://supabase.com/dashboard/project/xrmlxpiyqptyysuzgvnr`

---

**Status**: ✅ Ready to Deploy  
**Time**: 30 minutes  
**Difficulty**: Easy

🚀 **Let's Deploy!**

