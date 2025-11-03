/**
 * NOOR Eight-Faculty Model - Type Definitions
 * 
 * The Eight-Faculty Model represents a comprehensive framework for holistic human
 * assessment, integrating 96 competencies across eight dimensions of human capability.
 * 
 * Rooted in Arabian-Islamic intellectual tradition and contemporary psychological science.
 */

// ============================================================================
// Eight Faculties
// ============================================================================

export enum Faculty {
  PHYSICAL = 'physical',
  MENTAL = 'mental',
  EMOTIONAL = 'emotional',
  SPIRITUAL = 'spiritual',
  SOCIAL = 'social',
  VOLITIONAL = 'volitional',
  INTELLECTUAL = 'intellectual',
  MORAL = 'moral',
}

export interface FacultyMetadata {
  id: Faculty;
  name: string;
  arabicName: string;
  color: string;
  custodianMinistry: string;
  classicalScholar: string;
  description: string;
}

export const FACULTY_METADATA: Record<Faculty, FacultyMetadata> = {
  [Faculty.PHYSICAL]: {
    id: Faculty.PHYSICAL,
    name: 'Physical Faculty',
    arabicName: 'الملكة الجسدية',
    color: '#DC2626', // Red
    custodianMinistry: 'Ministry of Health and Prevention',
    classicalScholar: 'Ibn Sina (Canon of Medicine)',
    description: 'Bodily dimension including health, vitality, and physical capabilities',
  },
  [Faculty.MENTAL]: {
    id: Faculty.MENTAL,
    name: 'Mental Faculty',
    arabicName: 'الملكة العقلية',
    color: '#2563EB', // Blue
    custodianMinistry: 'Etihad Credit Bureau',
    classicalScholar: 'Al-Farabi (The Virtuous City)',
    description: 'Cognitive abilities, reasoning, and mental processing',
  },
  [Faculty.EMOTIONAL]: {
    id: Faculty.EMOTIONAL,
    name: 'Emotional Faculty',
    arabicName: 'الملكة العاطفية',
    color: '#EA580C', // Orange
    custodianMinistry: 'Ministry of Tolerance',
    classicalScholar: 'Al-Ghazali (Revival of Religious Sciences)',
    description: 'Emotional awareness, regulation, and interpersonal sensitivity',
  },
  [Faculty.SPIRITUAL]: {
    id: Faculty.SPIRITUAL,
    name: 'Spiritual Faculty',
    arabicName: 'الملكة الروحية',
    color: '#D4A843', // Gold
    custodianMinistry: 'Ministry of Islamic Affairs',
    classicalScholar: 'Al-Ghazali (Alchemy of Happiness)',
    description: 'Spiritual awareness, purpose, and transcendent values',
  },
  [Faculty.SOCIAL]: {
    id: Faculty.SOCIAL,
    name: 'Social Faculty',
    arabicName: 'الملكة الاجتماعية',
    color: '#16A34A', // Green
    custodianMinistry: 'Ministry of Community Development',
    classicalScholar: 'Ibn Khaldun (Muqaddimah)',
    description: 'Social skills, relationships, and community engagement',
  },
  [Faculty.VOLITIONAL]: {
    id: Faculty.VOLITIONAL,
    name: 'Volitional Faculty',
    arabicName: 'الملكة الإرادية',
    color: '#9333EA', // Purple
    custodianMinistry: 'Ministry of Culture and Youth',
    classicalScholar: 'Al-Ghazali (concept of irada)',
    description: 'Willpower, motivation, and goal-directed behavior',
  },
  [Faculty.INTELLECTUAL]: {
    id: Faculty.INTELLECTUAL,
    name: 'Intellectual Faculty',
    arabicName: 'الملكة الفكرية',
    color: '#0891B2', // Teal
    custodianMinistry: 'Ministry of Education',
    classicalScholar: 'Al-Kindi (On the Intellect)',
    description: 'Critical thinking, learning, and knowledge acquisition',
  },
  [Faculty.MORAL]: {
    id: Faculty.MORAL,
    name: 'Moral Faculty',
    arabicName: 'الملكة الأخلاقية',
    color: '#64748B', // Silver
    custodianMinistry: 'Ministry of Interior',
    classicalScholar: 'Miskawayh (Refinement of Character)',
    description: 'Ethical reasoning, integrity, and moral character',
  },
};

// ============================================================================
// Competencies (12 per Faculty = 96 total)
// ============================================================================

export interface Competency {
  id: string;
  faculty: Faculty;
  name: string;
  arabicName: string;
  description: string;
  assessmentMethods: string[];
  importance: string;
  philosophicalRoots: {
    islamic: string;
    western: string;
  };
}

// ============================================================================
// Assessment Scores
// ============================================================================

export interface CompetencyScore {
  competencyId: string;
  score: number; // 0-100
  assessmentDate: string;
  assessmentMethod: string;
  verifiedBy?: string;
  notes?: string;
}

export interface FacultyScore {
  faculty: Faculty;
  averageScore: number; // 0-100
  competencyScores: CompetencyScore[];
  lastAssessed: string;
  completionPercentage: number; // 0-100
}

export interface EightFacultyProfile {
  userId: string;
  overallScore: number; // 0-100
  facultyScores: FacultyScore[];
  totalCompetenciesAssessed: number;
  totalCompetencies: number; // 96
  lastUpdated: string;
  createdAt: string;
}

// ============================================================================
// Individual Level - Skills Passport
// ============================================================================

export interface SkillsPassport {
  id: string;
  userId: string;
  eightFacultyProfile: EightFacultyProfile;
  strengths: Faculty[]; // Top 3 faculties
  developmentAreas: Faculty[]; // Bottom 3 faculties
  achievements: Achievement[];
  verifications: Verification[];
  privacySettings: PrivacySettings;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  faculty: Faculty;
  earnedDate: string;
  icon: string;
}

export interface Verification {
  id: string;
  competencyId: string;
  verifiedBy: string; // Institution or authority
  verificationDate: string;
  method: string;
  certificateUrl?: string;
}

export interface PrivacySettings {
  shareWithEmployers: boolean;
  shareWithGovernment: boolean;
  visibleFaculties: Faculty[];
  anonymousData: boolean;
}

// ============================================================================
// Institutional Level - HCM Dashboard
// ============================================================================

export interface InstitutionalHCMData {
  institutionId: string;
  institutionName: string;
  totalEmployees: number;
  facultyAverages: Record<Faculty, number>;
  departmentBreakdown: DepartmentFacultyData[];
  topPerformers: EmployeeSummary[];
  developmentNeeds: FacultyGap[];
  lastUpdated: string;
}

export interface DepartmentFacultyData {
  departmentId: string;
  departmentName: string;
  employeeCount: number;
  facultyAverages: Record<Faculty, number>;
}

export interface EmployeeSummary {
  employeeId: string;
  name: string;
  position: string;
  department: string;
  overallScore: number;
  topFaculties: Faculty[];
}

export interface FacultyGap {
  faculty: Faculty;
  currentAverage: number;
  targetAverage: number;
  gap: number;
  affectedEmployees: number;
}

// ============================================================================
// Federal Level - National Analytics
// ============================================================================

export interface FederalAnalytics {
  totalCitizens: number;
  totalInstitutions: number;
  nationalFacultyAverages: Record<Faculty, number>;
  facultyTrends: FacultyTrend[];
  ministryBreakdown: MinistryFacultyData[];
  skillsGaps: SkillsGapAnalysis[];
  topPerformingInstitutions: InstitutionRanking[];
  lastUpdated: string;
}

export interface FacultyTrend {
  faculty: Faculty;
  monthlyAverages: { month: string; average: number }[];
  yearOverYearChange: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface MinistryFacultyData {
  ministryId: string;
  ministryName: string;
  employeeCount: number;
  facultyAverages: Record<Faculty, number>;
  custodianFaculty?: Faculty; // If this ministry is custodian of a faculty
}

export interface SkillsGapAnalysis {
  faculty: Faculty;
  demand: number; // Number of job openings requiring this faculty
  supply: number; // Number of citizens with high scores in this faculty
  gap: number; // Demand - Supply
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface InstitutionRanking {
  institutionId: string;
  institutionName: string;
  overallScore: number;
  rank: number;
  employeeCount: number;
  topFaculties: Faculty[];
}

// ============================================================================
// Assessment System
// ============================================================================

export interface Assessment {
  id: string;
  userId: string;
  faculty: Faculty;
  competencyId: string;
  assessmentType: AssessmentType;
  status: AssessmentStatus;
  score?: number;
  startedAt: string;
  completedAt?: string;
  responses: AssessmentResponse[];
}

export enum AssessmentType {
  SELF_REPORT = 'self_report',
  PSYCHOMETRIC = 'psychometric',
  BIOMETRIC = 'biometric',
  SIMULATION = 'simulation',
  PEER_EVALUATION = 'peer_evaluation',
  EXPERT_ASSESSMENT = 'expert_assessment',
}

export enum AssessmentStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  VERIFIED = 'verified',
}

export interface AssessmentResponse {
  questionId: string;
  response: any;
  timestamp: string;
}

// ============================================================================
// Data Flow Tracking
// ============================================================================

export interface DataFlowLog {
  id: string;
  timestamp: string;
  level: 'individual' | 'institutional' | 'federal';
  action: string;
  userId?: string;
  institutionId?: string;
  facultyAffected: Faculty[];
  description: string;
}

