# NOOR Platform - Deployment Instructions

**Date**: November 3, 2024  
**Version**: 1.0.0  
**Deployment Targets**: Vercel + Supabase, Railway

---

## Overview

This document provides step-by-step instructions for deploying the NOOR Platform to production environments. We support two deployment options, each with different characteristics suited for various use cases.

---

## Option A: Vercel + Supabase Deployment

### Characteristics

**Best For**: Fast deployment, automatic scaling, global CDN  
**Cost**: Free tier available, pay-as-you-grow  
**Deployment Time**: ~15 minutes  
**Complexity**: Low

### Prerequisites

1. Vercel account (https://vercel.com)
2. Supabase account (https://supabase.com)
3. GitHub repository access

### Step 1: Set Up Supabase Database

1. **Create New Project**
   - Go to https://supabase.com/dashboard
   - Click "New Project"
   - Name: "noor-production"
   - Database Password: Generate strong password
   - Region: Choose closest to UAE (e.g., Singapore)
   - Click "Create new project"

2. **Get Connection String**
   - Navigate to Settings → Database
   - Copy "Connection string" under "Connection pooling"
   - Format: `postgresql://postgres:[password]@[host]:6543/postgres`
   - Save this for later

3. **Run Database Migrations**
   ```bash
   # Set database URL
   export DATABASE_URL="postgresql://postgres:[password]@[host]:6543/postgres"
   
   # Navigate to backend
   cd backend
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Run migrations
   alembic upgrade head
   
   # Verify tables created
   psql $DATABASE_URL -c "\dt"
   ```

4. **Enable Required Extensions**
   - Go to Database → Extensions
   - Enable: `uuid-ossp`, `pg_trgm`

### Step 2: Deploy Backend to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Backend**
   ```bash
   cd backend
   vercel --prod
   ```

4. **Configure Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add the following:
   
   ```
   DATABASE_URL=postgresql://postgres:[password]@[host]:6543/postgres
   ANTHROPIC_API_KEY=[your-key]
   SUPABASE_URL=[your-supabase-url]
   SUPABASE_KEY=[your-supabase-key]
   OPENAI_API_KEY=[your-key]
   SECRET_KEY=[generate-random-32-char-string]
   ALLOWED_ORIGINS=https://noor-platform.vercel.app
   ```

5. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

6. **Note Backend URL**
   - Copy the production URL (e.g., `https://noor-backend-xxx.vercel.app`)

### Step 3: Deploy Frontend to Vercel

1. **Update Frontend Environment**
   ```bash
   cd ../frontend
   ```

2. **Deploy Frontend**
   ```bash
   vercel --prod
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables
   - Add:
   
   ```
   NEXT_PUBLIC_API_URL=https://noor-backend-xxx.vercel.app
   NEXT_PUBLIC_APP_URL=https://noor-platform-xxx.vercel.app
   NEXT_PUBLIC_ENV=production
   ```

4. **Redeploy**
   ```bash
   vercel --prod
   ```

5. **Note Frontend URL**
   - Copy the production URL (e.g., `https://noor-platform-xxx.vercel.app`)

### Step 4: Verify Deployment

1. **Test Backend Health**
   ```bash
   curl https://noor-backend-xxx.vercel.app/health
   ```
   
   Expected response: `{"status": "healthy"}`

2. **Test Frontend**
   - Open browser to `https://noor-platform-xxx.vercel.app`
   - Verify all three interfaces load:
     - `/federal/dashboard`
     - `/individual/dashboard`
     - `/institutional/dashboard`

3. **Test API Integration**
   - Login to individual interface
   - Navigate to assessments
   - Start an assessment
   - Verify questions load from backend

### Step 5: Configure Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add: `app.noor.ae` (frontend)
   - Add: `api.noor.ae` (backend)

2. **Update DNS Records**
   - Add CNAME record: `app` → `cname.vercel-dns.com`
   - Add CNAME record: `api` → `cname.vercel-dns.com`

3. **Update Environment Variables**
   - Update `NEXT_PUBLIC_API_URL` to `https://api.noor.ae`
   - Update `NEXT_PUBLIC_APP_URL` to `https://app.noor.ae`
   - Update `ALLOWED_ORIGINS` to `https://app.noor.ae`

---

## Option B: Railway Deployment

### Characteristics

**Best For**: Full-stack deployment, Docker support, integrated database  
**Cost**: $5/month minimum, usage-based  
**Deployment Time**: ~30 minutes  
**Complexity**: Medium

### Prerequisites

1. Railway account (https://railway.app)
2. GitHub repository access

### Step 1: Create Railway Project

1. **Login to Railway**
   - Go to https://railway.app
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Authorize GitHub access
   - Select `NOOR_National-Opportunities-Optimization-Realization-` repository

2. **Add PostgreSQL Database**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Wait for provisioning (~2 minutes)
   - Note the connection details

### Step 2: Configure Backend Service

1. **Add Backend Service**
   - Click "New" → "GitHub Repo"
   - Select the NOOR repository
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

2. **Set Environment Variables**
   - Click on backend service → Variables
   - Add:
   
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ANTHROPIC_API_KEY=[your-key]
   SUPABASE_URL=[your-supabase-url]
   SUPABASE_KEY=[your-supabase-key]
   OPENAI_API_KEY=[your-key]
   SECRET_KEY=[generate-random-32-char-string]
   ALLOWED_ORIGINS=https://noor-platform.up.railway.app
   PORT=8000
   ```

3. **Deploy Backend**
   - Click "Deploy"
   - Wait for build to complete (~5 minutes)
   - Click "Generate Domain" to get public URL

4. **Run Migrations**
   - Go to backend service → Settings → Service
   - Under "Deploy", add:
   - Deploy Command: `alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Redeploy

### Step 3: Configure Frontend Service

1. **Add Frontend Service**
   - Click "New" → "GitHub Repo"
   - Select the NOOR repository
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

2. **Set Environment Variables**
   - Click on frontend service → Variables
   - Add:
   
   ```
   NEXT_PUBLIC_API_URL=https://noor-backend.up.railway.app
   NEXT_PUBLIC_APP_URL=https://noor-platform.up.railway.app
   NEXT_PUBLIC_ENV=production
   PORT=3000
   ```

3. **Deploy Frontend**
   - Click "Deploy"
   - Wait for build to complete (~5 minutes)
   - Click "Generate Domain" to get public URL

### Step 4: Verify Deployment

1. **Test Backend**
   ```bash
   curl https://noor-backend.up.railway.app/health
   ```

2. **Test Frontend**
   - Open `https://noor-platform.up.railway.app`
   - Verify all interfaces load correctly

3. **Test Database Connection**
   - Login to an account
   - Complete an assessment
   - Check that data persists

### Step 5: Configure Monitoring

1. **Enable Metrics**
   - Go to Project Settings → Observability
   - Enable metrics collection
   - Set up alerts for:
     - CPU usage > 80%
     - Memory usage > 90%
     - Response time > 1s

2. **Configure Logs**
   - Go to each service → Logs
   - Set log retention: 7 days
   - Enable log streaming

---

## Post-Deployment Checklist

### Security

- [ ] All environment variables set correctly
- [ ] HTTPS enabled (automatic on both platforms)
- [ ] CORS configured properly
- [ ] Database credentials secured
- [ ] API keys not exposed in frontend

### Functionality

- [ ] All three interfaces accessible
- [ ] User registration works
- [ ] User login works
- [ ] Assessments load and submit
- [ ] Token wallet updates correctly
- [ ] Courses can be unlocked
- [ ] Eight-Faculty data displays correctly

### Performance

- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Database queries optimized
- [ ] Images and assets cached

### Monitoring

- [ ] Health check endpoint responding
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Backup schedule configured

---

## Rollback Procedures

### Vercel Rollback

1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Railway Rollback

1. Go to Railway Dashboard → Service → Deployments
2. Find previous working deployment
3. Click "Redeploy"

---

## Troubleshooting

### Issue: Backend Health Check Fails

**Symptoms**: `/health` endpoint returns 500 or times out

**Solutions**:
1. Check environment variables are set correctly
2. Verify database connection string
3. Check logs for errors: `vercel logs` or Railway dashboard
4. Ensure database migrations ran successfully

### Issue: Frontend Can't Connect to Backend

**Symptoms**: API calls fail with CORS errors

**Solutions**:
1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Check `ALLOWED_ORIGINS` in backend includes frontend URL
3. Ensure both services are deployed and running
4. Check network tab in browser for actual error

### Issue: Database Connection Errors

**Symptoms**: "Could not connect to database" errors

**Solutions**:
1. Verify `DATABASE_URL` format is correct
2. Check database is running (Supabase dashboard or Railway)
3. Ensure IP whitelist allows connections (if applicable)
4. Test connection manually: `psql $DATABASE_URL`

### Issue: Slow Performance

**Symptoms**: Pages load slowly, API timeouts

**Solutions**:
1. Check database query performance
2. Add database indexes if needed
3. Enable caching (Redis)
4. Upgrade service tier if needed
5. Use CDN for static assets

---

## Maintenance

### Daily Tasks

- Monitor error rates
- Check application logs
- Verify backup completion

### Weekly Tasks

- Review performance metrics
- Update dependencies if needed
- Check security advisories

### Monthly Tasks

- Database maintenance (vacuum, analyze)
- Review and optimize slow queries
- Update SSL certificates (automatic on both platforms)
- Review and update documentation

---

## Support Contacts

**Platform Issues**:
- Vercel Support: https://vercel.com/support
- Railway Support: https://railway.app/help
- Supabase Support: https://supabase.com/support

**NOOR Platform**:
- Repository: https://github.com/BenedictGPT/NOOR_National-Opportunities-Optimization-Realization-
- Documentation: `/docs/`

---

## Deployment URLs

### Vercel + Supabase

**Frontend**: https://noor-platform.vercel.app  
**Backend**: https://noor-backend.vercel.app  
**Database**: Supabase hosted PostgreSQL

### Railway

**Frontend**: https://noor-platform.up.railway.app  
**Backend**: https://noor-backend.up.railway.app  
**Database**: Railway hosted PostgreSQL

---

**Status**: ✅ Ready for deployment  
**Last Updated**: November 3, 2024  
**Version**: 1.0.0

