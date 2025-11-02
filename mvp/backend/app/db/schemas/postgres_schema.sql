-- NOOR Platform - PostgreSQL Schema
-- Version: 7.2
-- Purpose: Relational data for users, institutions, and structured records

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- ============================================================================
-- LAYER 1: INDIVIDUAL (SKILLS PASSPORT)
-- ============================================================================

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    emirates_id VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    nationality VARCHAR(50),
    profile_picture_url TEXT,
    biometric_facial_id VARCHAR(255),
    biometric_voice_id VARCHAR(255),
    uae_pass_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    CONSTRAINT valid_gender CHECK (gender IN ('male', 'female', 'other'))
);

-- Skills Table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Skills (Skills Passport)
CREATE TABLE user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level VARCHAR(50) NOT NULL,
    years_of_experience DECIMAL(4,1),
    last_used_date DATE,
    is_verified BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_proficiency CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    UNIQUE(user_id, skill_id)
);

-- Education Records
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    field_of_study VARCHAR(200),
    start_date DATE NOT NULL,
    end_date DATE,
    gpa DECIMAL(3,2),
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Work Experience
CREATE TABLE work_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(200) NOT NULL,
    employment_type VARCHAR(50),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_employment_type CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship', 'freelance'))
);

-- Certifications
CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    credential_id VARCHAR(255),
    credential_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Assessments
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    assessment_type VARCHAR(50) NOT NULL,
    duration_minutes INTEGER,
    passing_score DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_assessment_type CHECK (assessment_type IN ('cognitive', 'personality', 'technical', 'language'))
);

-- User Assessment Results
CREATE TABLE user_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    score DECIMAL(5,2) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    biometric_verified BOOLEAN DEFAULT false,
    results_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Health Records (SEHA/DHA/MOHAP Integration)
CREATE TABLE health_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blood_type VARCHAR(5),
    allergies TEXT[],
    chronic_conditions TEXT[],
    medications TEXT[],
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data_source VARCHAR(50),
    CONSTRAINT valid_blood_type CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'))
);

-- Sick Leave Records
CREATE TABLE sick_leave (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    diagnosis_code VARCHAR(20),
    issuing_authority VARCHAR(100),
    certificate_url TEXT,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- LAYER 2: INSTITUTIONAL (HCM SUITE)
-- ============================================================================

-- Institutions Table
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255),
    trade_license VARCHAR(100) UNIQUE NOT NULL,
    industry VARCHAR(100),
    size VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    emirate VARCHAR(50),
    country VARCHAR(50) DEFAULT 'UAE',
    website TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    is_government BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_size CHECK (size IN ('1-10', '11-50', '51-200', '201-500', '500+'))
);

-- Employees (Link users to institutions)
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    employee_number VARCHAR(50),
    job_title VARCHAR(200) NOT NULL,
    department VARCHAR(100),
    employment_type VARCHAR(50),
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    salary DECIMAL(12,2),
    currency VARCHAR(3) DEFAULT 'AED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_employment_type CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship')),
    UNIQUE(user_id, institution_id, employee_number)
);

-- Payroll Records
CREATE TABLE payroll (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    gross_salary DECIMAL(12,2) NOT NULL,
    deductions DECIMAL(12,2) DEFAULT 0,
    net_salary DECIMAL(12,2) NOT NULL,
    payment_date DATE,
    payment_status VARCHAR(50) DEFAULT 'pending',
    gpssa_contribution DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'processed', 'paid', 'failed'))
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id),
    review_period_start DATE NOT NULL,
    review_period_end DATE NOT NULL,
    overall_rating DECIMAL(3,2),
    strengths TEXT,
    areas_for_improvement TEXT,
    goals TEXT,
    review_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Learning & Development
CREATE TABLE learning_courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    provider VARCHAR(255),
    duration_hours INTEGER,
    difficulty_level VARCHAR(50),
    category VARCHAR(100),
    url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_difficulty CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced'))
);

-- Employee Learning Progress
CREATE TABLE employee_learning (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES learning_courses(id) ON DELETE CASCADE,
    enrollment_date DATE NOT NULL,
    completion_date DATE,
    progress_percentage INTEGER DEFAULT 0,
    final_score DECIMAL(5,2),
    status VARCHAR(50) DEFAULT 'enrolled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_progress CHECK (progress_percentage BETWEEN 0 AND 100),
    CONSTRAINT valid_status CHECK (status IN ('enrolled', 'in-progress', 'completed', 'dropped'))
);

-- ============================================================================
-- LAYER 3: FEDERAL (OPPORTUNITIES BOARD & FEDERAL CANVAS)
-- ============================================================================

-- Job Postings
CREATE TABLE job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    employment_type VARCHAR(50),
    experience_level VARCHAR(50),
    salary_min DECIMAL(12,2),
    salary_max DECIMAL(12,2),
    currency VARCHAR(3) DEFAULT 'AED',
    location VARCHAR(255),
    emirate VARCHAR(50),
    is_remote BOOLEAN DEFAULT false,
    posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    views_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_status CHECK (status IN ('draft', 'active', 'closed', 'filled'))
);

-- Job Applications
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_posting_id UUID NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cover_letter TEXT,
    resume_url TEXT,
    application_status VARCHAR(50) DEFAULT 'submitted',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES users(id),
    notes TEXT,
    CONSTRAINT valid_application_status CHECK (application_status IN ('submitted', 'under-review', 'shortlisted', 'interview', 'offered', 'accepted', 'rejected')),
    UNIQUE(job_posting_id, user_id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Users
CREATE INDEX idx_users_emirates_id ON users(emirates_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_uae_pass_id ON users(uae_pass_id);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Skills
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_name_trgm ON skills USING gin (name gin_trgm_ops);

-- User Skills
CREATE INDEX idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX idx_user_skills_skill_id ON user_skills(skill_id);

-- Education
CREATE INDEX idx_education_user_id ON education(user_id);

-- Work Experience
CREATE INDEX idx_work_experience_user_id ON work_experience(user_id);

-- Institutions
CREATE INDEX idx_institutions_trade_license ON institutions(trade_license);
CREATE INDEX idx_institutions_industry ON institutions(industry);

-- Employees
CREATE INDEX idx_employees_user_id ON employees(user_id);
CREATE INDEX idx_employees_institution_id ON employees(institution_id);
CREATE INDEX idx_employees_is_active ON employees(is_active);

-- Job Postings
CREATE INDEX idx_job_postings_institution_id ON job_postings(institution_id);
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_job_postings_posted_date ON job_postings(posted_date);

-- Job Applications
CREATE INDEX idx_job_applications_job_posting_id ON job_applications(job_posting_id);
CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_job_applications_status ON job_applications(application_status);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON institutions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON employees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON job_postings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

