// NOOR Platform - Neo4j Graph Database Schema
// Version: 7.1.0
// Purpose: Competency Graphs, Career Pathways, Organizational Relationships

// ============================================================================
// CONSTRAINTS & INDEXES
// ============================================================================

// Node uniqueness constraints
CREATE CONSTRAINT user_id_unique IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE;
CREATE CONSTRAINT competency_id_unique IF NOT EXISTS FOR (c:Competency) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT role_id_unique IF NOT EXISTS FOR (r:Role) REQUIRE r.id IS UNIQUE;
CREATE CONSTRAINT company_id_unique IF NOT EXISTS FOR (co:Company) REQUIRE co.id IS UNIQUE;
CREATE CONSTRAINT content_id_unique IF NOT EXISTS FOR (lc:LearningContent) REQUIRE lc.id IS UNIQUE;
CREATE CONSTRAINT mentor_id_unique IF NOT EXISTS FOR (m:Mentor) REQUIRE m.id IS UNIQUE;
CREATE CONSTRAINT skill_id_unique IF NOT EXISTS FOR (s:Skill) REQUIRE s.id IS UNIQUE;
CREATE CONSTRAINT department_id_unique IF NOT EXISTS FOR (d:Department) REQUIRE d.id IS UNIQUE;

// Performance indexes
CREATE INDEX user_name_index IF NOT EXISTS FOR (u:User) ON (u.name);
CREATE INDEX competency_category_index IF NOT EXISTS FOR (c:Competency) ON (c.category);
CREATE INDEX role_title_index IF NOT EXISTS FOR (r:Role) ON (r.title);
CREATE INDEX role_seniority_index IF NOT EXISTS FOR (r:Role) ON (r.seniority_level);
CREATE INDEX company_industry_index IF NOT EXISTS FOR (co:Company) ON (co.industry);
CREATE INDEX content_type_index IF NOT EXISTS FOR (lc:LearningContent) ON (lc.content_type);

// Full-text search indexes
CALL db.index.fulltext.createNodeIndex('userSearch', ['User'], ['name', 'bio']) IF NOT EXISTS;
CALL db.index.fulltext.createNodeIndex('competencySearch', ['Competency'], ['name', 'description']) IF NOT EXISTS;
CALL db.index.fulltext.createNodeIndex('roleSearch', ['Role'], ['title', 'description']) IF NOT EXISTS;
CALL db.index.fulltext.createNodeIndex('contentSearch', ['LearningContent'], ['title', 'description']) IF NOT EXISTS;

// ============================================================================
// NODE LABELS & PROPERTIES
// ============================================================================

// User Node
// Properties: id, name, email, role, nationality, current_role, years_experience, location, bio, profile_picture_url
// Labels: :User, :Emirati (if applicable)

// Competency Node
// Properties: id, name, name_ar, category, level, description, description_ar, parent_id, created_at, updated_at
// Categories: technical, soft_skill, language, leadership, domain_knowledge
// Levels: beginner, intermediate, advanced, expert

// Role Node
// Properties: id, title, title_ar, seniority_level, department, industry, description, description_ar, avg_salary_range, demand_score, created_at
// Seniority: entry, junior, mid, senior, lead, manager, director, executive

// Company Node
// Properties: id, name, name_ar, industry, size, location, emiratization_rate, eqi_score, founded_date

// LearningContent Node
// Properties: id, title, title_ar, content_type, difficulty_level, duration_minutes, provider, rating, language
// Types: course, certification, workshop, mentorship, book, article

// Mentor Node
// Properties: id, user_id, expertise_areas, years_of_experience, mentee_count, avg_rating, availability, languages, bio

// Skill Node (fine-grained version of Competency)
// Properties: id, name, category, trending_score, demand_score, related_tools

// Department Node
// Properties: id, name, company_id, head_id, employee_count, budget

// ============================================================================
// RELATIONSHIP TYPES
// ============================================================================

// User Competencies
// (User)-[:HAS_COMPETENCY {proficiency_level, verified, verified_date, evidence_url, last_used_date}]->(Competency)

// User Career Aspirations
// (User)-[:ASPIRES_TO {priority, target_date, motivation, created_at}]->(Role)

// User Employment
// (User)-[:WORKS_AT {start_date, position, department, status, current}]->(Company)
// (User)-[:REPORTS_TO {since}]->(User)
// (User)-[:MEMBER_OF]->(Department)

// Competency Hierarchies
// (Competency)-[:PREREQUISITE_OF]->(Competency)
// (Competency)-[:RELATED_TO {similarity_score}]->(Competency)
// (Competency)-[:BELONGS_TO_CATEGORY]->(Category)

// Role Requirements
// (Role)-[:REQUIRES {min_proficiency, weight, mandatory}]->(Competency)
// (Role)-[:REQUIRES_EXPERIENCE {min_years, preferred_years}]->(Skill)
// (Role)-[:LEADS_TO {typical_years, probability}]->(Role)  // Career progression

// Learning Pathways
// (User)-[:ENROLLED_IN {enrollment_date, progress_percentage, status}]->(LearningContent)
// (User)-[:COMPLETED {completion_date, score, certificate_url}]->(LearningContent)
// (LearningContent)-[:TEACHES {proficiency_gain}]->(Competency)
// (LearningContent)-[:PREREQUISITE_FOR]->(LearningContent)
// (LearningContent)-[:RECOMMENDED_FOR]->(Role)

// Mentorship
// (User)-[:MENTORED_BY {start_date, end_date, status, focus_areas, rating}]->(Mentor)
// (Mentor)-[:EXPERT_IN {proficiency_level, years_experience}]->(Competency)
// (Mentor)-[:CAN_MENTOR]->(Role)

// Organizational Structure
// (Department)-[:PART_OF]->(Company)
// (Role)-[:WITHIN_DEPARTMENT]->(Department)
// (Company)-[:OPERATES_IN]->(Industry)

// Skill Networks
// (Skill)-[:OFTEN_PAIRED_WITH {co_occurrence_score}]->(Skill)
// (Skill)-[:SUPPORTS]->(Competency)
// (Role)-[:VALUES {importance_score}]->(Skill)

// ============================================================================
// SAMPLE DATA CREATION (Development)
// ============================================================================

// Create sample competencies
MERGE (c1:Competency {
  id: 'comp_python_programming',
  name: 'Python Programming',
  name_ar: 'برمجة بايثون',
  category: 'technical',
  level: 'intermediate',
  description: 'Ability to write clean, efficient Python code',
  created_at: datetime()
})

MERGE (c2:Competency {
  id: 'comp_data_analysis',
  name: 'Data Analysis',
  name_ar: 'تحليل البيانات',
  category: 'technical',
  level: 'intermediate',
  description: 'Ability to analyze and interpret complex data sets',
  created_at: datetime()
})

MERGE (c3:Competency {
  id: 'comp_machine_learning',
  name: 'Machine Learning',
  name_ar: 'تعلم الآلة',
  category: 'technical',
  level: 'advanced',
  description: 'Ability to build and deploy ML models',
  created_at: datetime()
})

MERGE (c4:Competency {
  id: 'comp_leadership',
  name: 'Leadership',
  name_ar: 'القيادة',
  category: 'soft_skill',
  level: 'advanced',
  description: 'Ability to lead and inspire teams',
  created_at: datetime()
})

MERGE (c5:Competency {
  id: 'comp_communication',
  name: 'Communication',
  name_ar: 'التواصل',
  category: 'soft_skill',
  level: 'intermediate',
  description: 'Effective written and verbal communication',
  created_at: datetime()
})

MERGE (c6:Competency {
  id: 'comp_project_management',
  name: 'Project Management',
  name_ar: 'إدارة المشاريع',
  category: 'leadership',
  level: 'advanced',
  description: 'Planning, executing, and closing projects',
  created_at: datetime()
})

// Create competency relationships (prerequisites)
MATCH (c1:Competency {id: 'comp_python_programming'})
MATCH (c2:Competency {id: 'comp_data_analysis'})
MERGE (c1)-[:PREREQUISITE_OF]->(c2)

MATCH (c2:Competency {id: 'comp_data_analysis'})
MATCH (c3:Competency {id: 'comp_machine_learning'})
MERGE (c2)-[:PREREQUISITE_OF]->(c3)

// Create sample roles
MERGE (r1:Role {
  id: 'role_data_analyst',
  title: 'Data Analyst',
  title_ar: 'محلل بيانات',
  seniority_level: 'mid',
  department: 'Analytics',
  description: 'Analyze data to provide business insights',
  avg_salary_range: '15000-25000',
  demand_score: 85,
  created_at: datetime()
})

MERGE (r2:Role {
  id: 'role_ml_engineer',
  title: 'Machine Learning Engineer',
  title_ar: 'مهندس تعلم آلي',
  seniority_level: 'senior',
  department: 'AI',
  description: 'Design and implement ML systems',
  avg_salary_range: '25000-40000',
  demand_score: 92,
  created_at: datetime()
})

MERGE (r3:Role {
  id: 'role_data_scientist',
  title: 'Data Scientist',
  title_ar: 'عالم بيانات',
  seniority_level: 'senior',
  department: 'Analytics',
  description: 'Extract insights from complex data',
  avg_salary_range: '25000-40000',
  demand_score: 90,
  created_at: datetime()
})

MERGE (r4:Role {
  id: 'role_team_lead',
  title: 'Team Lead',
  title_ar: 'قائد فريق',
  seniority_level: 'lead',
  department: 'Various',
  description: 'Lead and mentor team members',
  avg_salary_range: '30000-45000',
  demand_score: 78,
  created_at: datetime()
})

// Create role-competency requirements
MATCH (r1:Role {id: 'role_data_analyst'})
MATCH (c1:Competency {id: 'comp_python_programming'})
MERGE (r1)-[:REQUIRES {min_proficiency: 'intermediate', weight: 0.8, mandatory: true}]->(c1)

MATCH (r1:Role {id: 'role_data_analyst'})
MATCH (c2:Competency {id: 'comp_data_analysis'})
MERGE (r1)-[:REQUIRES {min_proficiency: 'intermediate', weight: 0.9, mandatory: true}]->(c2)

MATCH (r1:Role {id: 'role_data_analyst'})
MATCH (c5:Competency {id: 'comp_communication'})
MERGE (r1)-[:REQUIRES {min_proficiency: 'intermediate', weight: 0.6, mandatory: false}]->(c5)

MATCH (r2:Role {id: 'role_ml_engineer'})
MATCH (c1:Competency {id: 'comp_python_programming'})
MERGE (r2)-[:REQUIRES {min_proficiency: 'advanced', weight: 0.9, mandatory: true}]->(c1)

MATCH (r2:Role {id: 'role_ml_engineer'})
MATCH (c3:Competency {id: 'comp_machine_learning'})
MERGE (r2)-[:REQUIRES {min_proficiency: 'advanced', weight: 1.0, mandatory: true}]->(c3)

MATCH (r2:Role {id: 'role_ml_engineer'})
MATCH (c2:Competency {id: 'comp_data_analysis'})
MERGE (r2)-[:REQUIRES {min_proficiency: 'intermediate', weight: 0.7, mandatory: true}]->(c2)

// Create career progression paths
MATCH (r1:Role {id: 'role_data_analyst'})
MATCH (r3:Role {id: 'role_data_scientist'})
MERGE (r1)-[:LEADS_TO {typical_years: 3, probability: 0.65}]->(r3)

MATCH (r3:Role {id: 'role_data_scientist'})
MATCH (r2:Role {id: 'role_ml_engineer'})
MERGE (r3)-[:LEADS_TO {typical_years: 2, probability: 0.55}]->(r2)

MATCH (r2:Role {id: 'role_ml_engineer'})
MATCH (r4:Role {id: 'role_team_lead'})
MERGE (r2)-[:LEADS_TO {typical_years: 4, probability: 0.45}]->(r4)

// Create sample learning content
MERGE (lc1:LearningContent {
  id: 'course_python_basics',
  title: 'Python Programming Fundamentals',
  title_ar: 'أساسيات برمجة بايثون',
  content_type: 'course',
  difficulty_level: 'beginner',
  duration_minutes: 480,
  provider: 'NOOR Academy',
  rating: 4.5,
  language: 'both'
})

MERGE (lc2:LearningContent {
  id: 'course_data_analysis',
  title: 'Data Analysis with Python',
  title_ar: 'تحليل البيانات باستخدام بايثون',
  content_type: 'course',
  difficulty_level: 'intermediate',
  duration_minutes: 600,
  provider: 'NOOR Academy',
  rating: 4.7,
  language: 'both'
})

MERGE (lc3:LearningContent {
  id: 'course_ml_intro',
  title: 'Introduction to Machine Learning',
  title_ar: 'مقدمة في تعلم الآلة',
  content_type: 'course',
  difficulty_level: 'intermediate',
  duration_minutes: 720,
  provider: 'NOOR Academy',
  rating: 4.8,
  language: 'both'
})

// Link learning content to competencies
MATCH (lc1:LearningContent {id: 'course_python_basics'})
MATCH (c1:Competency {id: 'comp_python_programming'})
MERGE (lc1)-[:TEACHES {proficiency_gain: 'beginner to intermediate'}]->(c1)

MATCH (lc2:LearningContent {id: 'course_data_analysis'})
MATCH (c2:Competency {id: 'comp_data_analysis'})
MERGE (lc2)-[:TEACHES {proficiency_gain: 'beginner to intermediate'}]->(c2)

MATCH (lc3:LearningContent {id: 'course_ml_intro'})
MATCH (c3:Competency {id: 'comp_machine_learning'})
MERGE (lc3)-[:TEACHES {proficiency_gain: 'beginner to intermediate'}]->(c3)

// Create content prerequisites
MATCH (lc1:LearningContent {id: 'course_python_basics'})
MATCH (lc2:LearningContent {id: 'course_data_analysis'})
MERGE (lc1)-[:PREREQUISITE_FOR]->(lc2)

MATCH (lc2:LearningContent {id: 'course_data_analysis'})
MATCH (lc3:LearningContent {id: 'course_ml_intro'})
MERGE (lc2)-[:PREREQUISITE_FOR]->(lc3)

// Recommend content for roles
MATCH (lc1:LearningContent {id: 'course_python_basics'})
MATCH (r1:Role {id: 'role_data_analyst'})
MERGE (lc1)-[:RECOMMENDED_FOR]->(r1)

MATCH (lc2:LearningContent {id: 'course_data_analysis'})
MATCH (r1:Role {id: 'role_data_analyst'})
MERGE (lc2)-[:RECOMMENDED_FOR]->(r1)

MATCH (lc3:LearningContent {id: 'course_ml_intro'})
MATCH (r2:Role {id: 'role_ml_engineer'})
MERGE (lc3)-[:RECOMMENDED_FOR]->(r2)

// Confirmation message
RETURN "Neo4j graph schema initialized successfully!" AS status;
