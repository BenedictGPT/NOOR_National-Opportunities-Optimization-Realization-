-- NOOR Platform PostgreSQL Schema - Initial Migration
-- Version: 7.1.0
-- Date: 2025-11-02

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uae_pass_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL DEFAULT 'individual',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ,
    CONSTRAINT chk_role CHECK (role IN ('individual', 'hr_manager', 'cxo', 'federal_analyst', 'admin')),
    CONSTRAINT chk_status CHECK (status IN ('active', 'inactive', 'suspended'))
);

CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    first_name_ar VARCHAR(100),
    last_name_ar VARCHAR(100),
    date_of_birth DATE NOT NULL,
    nationality VARCHAR(3) NOT NULL,
    emirates_id VARCHAR(20) UNIQUE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    profile_picture_url TEXT,
    bio TEXT,
    preferred_language VARCHAR(5) DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_gender CHECK (gender IN ('male', 'female', 'other')),
    CONSTRAINT chk_language CHECK (preferred_language IN ('en', 'ar'))
);

CREATE TABLE user_biometric_metadata (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    facial_enrolled BOOLEAN DEFAULT FALSE,
    voice_enrolled BOOLEAN DEFAULT FALSE,
    facial_enrollment_date TIMESTAMPTZ,
    voice_enrollment_date TIMESTAMPTZ,
    last_facial_verification TIMESTAMPTZ,
    last_voice_verification TIMESTAMPTZ,
    verification_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- COMPANIES & ORGANIZATIONS
-- ============================================================================

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trade_license VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255),
    industry VARCHAR(100) NOT NULL,
    sub_industry VARCHAR(100),
    employee_count INTEGER DEFAULT 0,
    emirati_count INTEGER DEFAULT 0,
    emiratization_target DECIMAL(5,2),
    founded_date DATE,
    headquarters_location VARCHAR(100),
    website VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_emiratization_target CHECK (emiratization_target >= 0 AND emiratization_target <= 100),
    CONSTRAINT chk_company_status CHECK (status IN ('active', 'inactive', 'suspended'))
);

CREATE TABLE company_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    access_level VARCHAR(20) NOT NULL,
    department VARCHAR(100),
    position VARCHAR(100),
    granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    granted_by UUID REFERENCES users(id),
    revoked_at TIMESTAMPTZ,
    UNIQUE(user_id, company_id),
    CONSTRAINT chk_access_level CHECK (access_level IN ('L2_restricted', 'L3_executive'))
);

-- ============================================================================
-- EMPLOYEE LIFECYCLE
-- ============================================================================

CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    employee_number VARCHAR(50) NOT NULL,
    hire_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    department VARCHAR(100),
    position VARCHAR(100),
    employment_type VARCHAR(50) NOT NULL,
    manager_id UUID REFERENCES employees(id),
    salary_grade VARCHAR(20),
    work_location VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(company_id, employee_number),
    CONSTRAINT chk_employee_status CHECK (status IN ('active', 'on_leave', 'suspended', 'terminated')),
    CONSTRAINT chk_employment_type CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'intern'))
);

CREATE TABLE leave_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    leave_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    reason TEXT,
    medical_cert_id UUID,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_leave_type CHECK (leave_type IN ('annual', 'sick', 'maternity', 'paternity', 'unpaid', 'emergency')),
    CONSTRAINT chk_leave_status CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
    CONSTRAINT chk_dates CHECK (end_date >= start_date)
);

CREATE TABLE relocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    from_location VARCHAR(100) NOT NULL,
    to_location VARCHAR(100) NOT NULL,
    relocation_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'planned',
    relocation_package_amount DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_relocation_status CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled'))
);

CREATE TABLE onboarding_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    task_name VARCHAR(255) NOT NULL,
    task_description TEXT,
    category VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    due_date DATE,
    completed_date DATE,
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_task_status CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped'))
);

-- ============================================================================
-- PAYROLL & PENSIONS
-- ============================================================================

CREATE TABLE payroll_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    gross_salary DECIMAL(12,2) NOT NULL,
    net_salary DECIMAL(12,2) NOT NULL,
    basic_salary DECIMAL(12,2) NOT NULL,
    housing_allowance DECIMAL(12,2) DEFAULT 0,
    transport_allowance DECIMAL(12,2) DEFAULT 0,
    other_allowances DECIMAL(12,2) DEFAULT 0,
    tax_deductions DECIMAL(12,2) DEFAULT 0,
    pension_deductions DECIMAL(12,2) DEFAULT 0,
    insurance_deductions DECIMAL(12,2) DEFAULT 0,
    other_deductions DECIMAL(12,2) DEFAULT 0,
    bonuses DECIMAL(12,2) DEFAULT 0,
    overtime_pay DECIMAL(12,2) DEFAULT 0,
    payment_date DATE,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_payment_status CHECK (payment_status IN ('pending', 'processed', 'paid', 'failed')),
    CONSTRAINT chk_period CHECK (period_end >= period_start)
);

CREATE TABLE pension_contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    employer_contribution DECIMAL(12,2) NOT NULL,
    employee_contribution DECIMAL(12,2) NOT NULL,
    total_contribution DECIMAL(12,2) GENERATED ALWAYS AS (employer_contribution + employee_contribution) STORED,
    scheme_type VARCHAR(20) NOT NULL,
    submission_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    submitted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_scheme_type CHECK (scheme_type IN ('GPSSA', 'ADPF', 'GCC')),
    CONSTRAINT chk_submission_status CHECK (submission_status IN ('pending', 'submitted', 'confirmed', 'rejected'))
);

CREATE TABLE gpssa_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    submission_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    total_contributions DECIMAL(15,2) NOT NULL,
    employee_count INTEGER NOT NULL,
    submission_reference VARCHAR(100),
    response_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_gpssa_status CHECK (status IN ('pending', 'submitted', 'confirmed', 'rejected', 'error'))
);

-- ============================================================================
-- HEALTH & WELLNESS
-- ============================================================================

CREATE TABLE health_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    blood_type VARCHAR(5),
    allergies TEXT[],
    chronic_conditions TEXT[],
    medications TEXT[],
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relationship VARCHAR(50),
    health_insurance_provider VARCHAR(100),
    health_insurance_number VARCHAR(50),
    data_encryption_key_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_blood_type CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'))
);

CREATE TABLE medical_certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    issuer VARCHAR(100) NOT NULL,
    issuer_type VARCHAR(20) NOT NULL,
    fit_status VARCHAR(20) NOT NULL,
    certificate_hash VARCHAR(64) NOT NULL,
    verification_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    verified_at TIMESTAMPTZ,
    leave_request_id UUID REFERENCES leave_requests(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_issuer_type CHECK (issuer_type IN ('SEHA', 'DHA', 'MOHAP', 'other')),
    CONSTRAINT chk_fit_status CHECK (fit_status IN ('fit', 'unfit', 'fit_with_restrictions')),
    CONSTRAINT chk_verification_status CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired'))
);

CREATE TABLE vaccinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vaccine_name VARCHAR(100) NOT NULL,
    dose_number INTEGER NOT NULL,
    vaccination_date DATE NOT NULL,
    next_dose_date DATE,
    vaccination_center VARCHAR(100),
    batch_number VARCHAR(50),
    verified BOOLEAN DEFAULT FALSE,
    certificate_hash VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_dose_number CHECK (dose_number > 0)
);

-- To be continued in next part...
