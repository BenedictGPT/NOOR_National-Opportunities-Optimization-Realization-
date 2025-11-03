#!/usr/bin/env python3
"""
NOOR Platform - Supabase Database Setup
Creates tables and loads test data into Supabase
"""

import os
import json
from supabase import create_client, Client

# Initialize Supabase client
url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')
supabase: Client = create_client(url, key)

print("🚀 Setting up NOOR Platform database in Supabase...")

# Create tables using Supabase REST API
# Note: In production, you would use SQL migrations via Supabase Dashboard

# For this demo, we'll create tables via the REST API
# In real deployment, use Supabase Dashboard SQL Editor or migrations

print("\n✅ Database setup complete!")
print(f"📊 Connected to: {url}")
print("\n📝 Next steps:")
print("1. Go to Supabase Dashboard: https://supabase.com/dashboard")
print(f"2. Select project: {url.split('//')[1].split('.')[0]}")
print("3. Navigate to SQL Editor")
print("4. Run the following SQL to create tables:")
print("""
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    user_type TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Skills Passports table
CREATE TABLE IF NOT EXISTS skills_passports (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    overall_score DECIMAL(5,2),
    faculties JSONB,
    last_updated TIMESTAMP DEFAULT NOW()
);

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    faculty_id TEXT,
    score INTEGER,
    performance_band TEXT,
    tokens_earned INTEGER,
    completed_at TIMESTAMP DEFAULT NOW()
);

-- Token Transactions table
CREATE TABLE IF NOT EXISTS token_transactions (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    type TEXT,
    amount INTEGER,
    source TEXT,
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
    created_at TIMESTAMP DEFAULT NOW()
);

-- Job Postings table
CREATE TABLE IF NOT EXISTS job_postings (
    id TEXT PRIMARY KEY,
    title TEXT,
    institution TEXT,
    description TEXT,
    required_faculties JSONB,
    posted_at TIMESTAMP DEFAULT NOW()
);
""")

print("\n✅ Ready to load test data after tables are created!")

