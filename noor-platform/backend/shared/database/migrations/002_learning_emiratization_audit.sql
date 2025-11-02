-- NOOR Platform PostgreSQL Schema - Part 2
-- Learning & Development, Emiratization, Audit & Compliance
-- Version: 7.1.0

-- ============================================================================
-- LEARNING & DEVELOPMENT
-- ============================================================================

CREATE TABLE competencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100),
    category VARCHAR(50) NOT NULL,
    level VARCHAR(20) NOT NULL,
    description TEXT,
    description_ar TEXT,
    parent_competency_id UUID REFERENCES competencies(id),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_competency_category CHECK (category IN ('technical', 'soft_skill', 'language', 'leadership', 'domain_knowledge')),
    CONSTRAINT chk_competency_level CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    CONSTRAINT chk_competency_status CHECK (status IN ('active', 'deprecated', 'archived'))
);

CREATE TABLE user_competencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    proficiency_level VARCHAR(20) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    verified_date DATE,
    verified_by UUID REFERENCES users(id),
    evidence_type VARCHAR(50),
    evidence_url TEXT,
    acquired_date DATE,
    expiry_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, competency_id),
    CONSTRAINT chk_proficiency_level CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert'))
);

CREATE TABLE learning_pathways (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pathway_name VARCHAR(255) NOT NULL,
    target_role VARCHAR(100),
    progress DECIMAL(5,2) DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'in_progress',
    started_at DATE NOT NULL DEFAULT CURRENT_DATE,
    target_completion_date DATE,
    completed_at DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_pathway_status CHECK (status IN ('not_started', 'in_progress', 'completed', 'abandoned')),
    CONSTRAINT chk_progress CHECK (progress >= 0 AND progress <= 100)
);

CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assessment_type VARCHAR(50) NOT NULL,
    assessment_title VARCHAR(255) NOT NULL,
    score DECIMAL(5,2),
    max_score DECIMAL(5,2) NOT NULL DEFAULT 100.00,
    passing_score DECIMAL(5,2) NOT NULL DEFAULT 70.00,
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    duration_minutes INTEGER,
    biometric_verified BOOLEAN DEFAULT FALSE,
    facial_verification_score DECIMAL(5,4),
    voice_verification_score DECIMAL(5,4),
    proctoring_alerts JSONB,
    certificate_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_assessment_type CHECK (assessment_type IN ('technical', 'soft_skill', 'language', 'certification', 'competency')),
    CONSTRAINT chk_assessment_status CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'failed'))
);

-- ============================================================================
-- EMIRATIZATION
-- ============================================================================

CREATE TABLE emiratization_quotas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    target_percentage DECIMAL(5,2) NOT NULL,
    current_percentage DECIMAL(5,2) DEFAULT 0.00,
    total_employees INTEGER DEFAULT 0,
    emirati_employees INTEGER DEFAULT 0,
    compliant BOOLEAN DEFAULT FALSE,
    compliance_status VARCHAR(20),
    last_calculated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(company_id, year),
    CONSTRAINT chk_target_percentage CHECK (target_percentage >= 0 AND target_percentage <= 100),
    CONSTRAINT chk_current_percentage CHECK (current_percentage >= 0 AND current_percentage <= 100),
    CONSTRAINT chk_compliance_status CHECK (compliance_status IN ('compliant', 'non_compliant', 'at_risk', 'exceeding'))
);

CREATE TABLE eqi_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    rank INTEGER,
    total_companies INTEGER,
    factors JSONB NOT NULL,
    headcount_percentage DECIMAL(5,2),
    leadership_percentage DECIMAL(5,2),
    salary_parity_score DECIMAL(5,2),
    retention_rate DECIMAL(5,2),
    training_investment DECIMAL(12,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_eqi_score CHECK (score >= 0 AND score <= 100),
    CONSTRAINT chk_period CHECK (period_end >= period_start)
);

-- ============================================================================
-- PERFORMANCE MANAGEMENT
-- ============================================================================

CREATE TABLE performance_appraisals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    appraisal_period_start DATE NOT NULL,
    appraisal_period_end DATE NOT NULL,
    overall_rating DECIMAL(3,2),
    rating_scale VARCHAR(10) DEFAULT '1-5',
    strengths TEXT,
    areas_for_improvement TEXT,
    goals_achieved INTEGER,
    goals_total INTEGER,
    reviewer_id UUID REFERENCES employees(id),
    review_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_appraisal_status CHECK (status IN ('draft', 'submitted', 'reviewed', 'finalized')),
    CONSTRAINT chk_period CHECK (appraisal_period_end >= appraisal_period_start)
);

CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    appraisal_id UUID REFERENCES performance_appraisals(id),
    goal_title VARCHAR(255) NOT NULL,
    goal_description TEXT,
    category VARCHAR(50),
    target_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'in_progress',
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    completion_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_goal_status CHECK (status IN ('not_started', 'in_progress', 'completed', 'cancelled', 'deferred')),
    CONSTRAINT chk_completion_percentage CHECK (completion_percentage >= 0 AND completion_percentage <= 100)
);

-- ============================================================================
-- AUDIT & COMPLIANCE
-- ============================================================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID REFERENCES users(id),
    agent_id VARCHAR(100),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    ip_address INET,
    user_agent TEXT,
    request_method VARCHAR(10),
    request_path TEXT,
    request_payload JSONB,
    response_status INTEGER,
    response_time_ms INTEGER,
    access_level VARCHAR(20),
    data_classification VARCHAR(20),
    metadata JSONB,
    CONSTRAINT chk_data_classification CHECK (data_classification IN ('L1_personal', 'L2_institutional', 'L3_federal', 'public'))
);

-- Make audit_logs append-only (no updates or deletes)
CREATE RULE audit_logs_no_update AS ON UPDATE TO audit_logs DO INSTEAD NOTHING;
CREATE RULE audit_logs_no_delete AS ON DELETE TO audit_logs DO INSTEAD NOTHING;

CREATE TABLE consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    data_type VARCHAR(50) NOT NULL,
    purpose VARCHAR(100) NOT NULL,
    scope VARCHAR(50) NOT NULL,
    granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    consent_text TEXT NOT NULL,
    consent_version VARCHAR(20) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_consent_status CHECK (status IN ('active', 'revoked', 'expired')),
    CONSTRAINT chk_scope CHECK (scope IN ('personal', 'institutional', 'federal', 'third_party'))
);

CREATE TABLE access_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_user_id UUID REFERENCES users(id),
    target_company_id UUID REFERENCES companies(id),
    access_level VARCHAR(20) NOT NULL,
    purpose TEXT NOT NULL,
    justification TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    access_granted_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_access_level CHECK (access_level IN ('L1_personal', 'L2_restricted', 'L3_executive', 'L4_federal')),
    CONSTRAINT chk_request_status CHECK (status IN ('pending', 'approved', 'rejected', 'expired', 'revoked'))
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Users & Authentication
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_uae_pass_id ON users(uae_pass_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_user_profiles_emirates_id ON user_profiles(emirates_id);

-- Companies
CREATE INDEX idx_companies_industry ON companies(industry);
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_company_users_user_id ON company_users(user_id);
CREATE INDEX idx_company_users_company_id ON company_users(company_id);

-- Employees
CREATE INDEX idx_employees_user_id ON employees(user_id);
CREATE INDEX idx_employees_company_id ON employees(company_id);
CREATE INDEX idx_employees_manager_id ON employees(manager_id);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_leave_requests_employee_id ON leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);

-- Payroll
CREATE INDEX idx_payroll_employee_id ON payroll_records(employee_id);
CREATE INDEX idx_payroll_period ON payroll_records(period_start, period_end);
CREATE INDEX idx_payroll_status ON payroll_records(payment_status);
CREATE INDEX idx_pension_employee_id ON pension_contributions(employee_id);
CREATE INDEX idx_gpssa_company_id ON gpssa_submissions(company_id);

-- Health
CREATE INDEX idx_medical_certs_user_id ON medical_certificates(user_id);
CREATE INDEX idx_medical_certs_status ON medical_certificates(verification_status);
CREATE INDEX idx_vaccinations_user_id ON vaccinations(user_id);

-- Learning
CREATE INDEX idx_competencies_category ON competencies(category);
CREATE INDEX idx_user_competencies_user_id ON user_competencies(user_id);
CREATE INDEX idx_learning_pathways_user_id ON learning_pathways(user_id);
CREATE INDEX idx_assessments_user_id ON assessments(user_id);
CREATE INDEX idx_assessments_status ON assessments(status);

-- Emiratization
CREATE INDEX idx_emiratization_quotas_company_id ON emiratization_quotas(company_id);
CREATE INDEX idx_emiratization_quotas_year ON emiratization_quotas(year);
CREATE INDEX idx_eqi_scores_company_id ON eqi_scores(company_id);

-- Audit
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_consent_records_user_id ON consent_records(user_id);
CREATE INDEX idx_consent_records_status ON consent_records(status);
CREATE INDEX idx_access_requests_requester_id ON access_requests(requester_id);
CREATE INDEX idx_access_requests_status ON access_requests(status);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON employees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leave_requests_updated_at BEFORE UPDATE ON leave_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payroll_records_updated_at BEFORE UPDATE ON payroll_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_competencies_updated_at BEFORE UPDATE ON competencies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emiratization_quotas_updated_at BEFORE UPDATE ON emiratization_quotas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Schema migration complete
