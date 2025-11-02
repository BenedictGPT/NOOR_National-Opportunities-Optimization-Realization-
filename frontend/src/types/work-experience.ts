/**
 * NOOR Platform - Work Experience TypeScript Types
 * Auto-generated from Pydantic models
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum EmploymentType {
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
  CONTRACT = "contract",
  INTERNSHIP = "internship",
  FREELANCE = "freelance",
}

export enum IndustryType {
  TECHNOLOGY = "technology",
  FINANCE = "finance",
  HEALTHCARE = "healthcare",
  EDUCATION = "education",
  GOVERNMENT = "government",
  RETAIL = "retail",
  MANUFACTURING = "manufacturing",
  CONSTRUCTION = "construction",
  HOSPITALITY = "hospitality",
  TRANSPORTATION = "transportation",
  ENERGY = "energy",
  TELECOMMUNICATIONS = "telecommunications",
  MEDIA = "media",
  REAL_ESTATE = "real_estate",
  CONSULTING = "consulting",
  OTHER = "other",
}

// ============================================================================
// REQUEST TYPES
// ============================================================================

export interface WorkExperienceCreate {
  company_name: string;
  job_title: string;
  employment_type: EmploymentType;
  industry?: IndustryType;
  location?: string;
  start_date: string; // ISO date string
  end_date?: string; // ISO date string
  is_current: boolean;
  description?: string;
  achievements?: string[];
  skills_used?: string[]; // Array of skill UUIDs
}

export interface WorkExperienceUpdate {
  company_name?: string;
  job_title?: string;
  employment_type?: EmploymentType;
  industry?: IndustryType;
  location?: string;
  start_date?: string; // ISO date string
  end_date?: string; // ISO date string
  is_current?: boolean;
  description?: string;
  achievements?: string[];
  skills_used?: string[];
}

export interface WorkExperienceVerificationRequest {
  experience_id: string;
  verification_document?: string; // URL
  contact_person?: string;
  contact_email?: string;
  notes?: string;
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

export interface WorkExperienceResponse {
  id: string;
  user_id: string;
  company_name: string;
  job_title: string;
  employment_type: EmploymentType;
  industry?: IndustryType;
  location?: string;
  start_date: string; // ISO date string
  end_date?: string; // ISO date string
  is_current: boolean;
  description?: string;
  achievements?: string[];
  skills_used?: string[]; // Array of skill names
  duration_months: number;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface SkillDetail {
  skill_id: string;
  skill_name: string;
  proficiency_level: string;
}

export interface WorkExperienceDetailedResponse extends WorkExperienceResponse {
  skills_details?: SkillDetail[];
  verification_status?: string;
  verified_by?: string;
  verified_at?: string; // ISO datetime string
}

export interface WorkExperienceListResponse {
  success: boolean;
  total: number;
  experiences: WorkExperienceResponse[];
  total_years: number;
}

export interface WorkExperienceSummary {
  total_experiences: number;
  total_years: number;
  total_months: number;
  current_positions: number;
  companies_worked: number;
  industries: string[];
  employment_types: Record<string, number>;
  top_skills: Array<{ skill: string; count: number }>;
}

export interface WorkExperienceVerificationResponse {
  success: boolean;
  experience_id: string;
  verification_status: string;
  message: string;
  estimated_completion?: string; // ISO datetime string
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface WorkExperienceFilterParams {
  employment_type?: EmploymentType;
  industry?: IndustryType;
  current_only?: boolean;
  company_name?: string;
  min_duration_months?: number;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface CareerTimelineItem {
  period: string;
  title: string;
  company: string;
  duration_months: number;
}

export interface CareerProgressionResponse {
  success: boolean;
  user_id: string;
  timeline: CareerTimelineItem[];
  progression_score: number; // 0-10
  average_tenure: number;
  job_changes: number;
  industry_changes: number;
  salary_growth?: number;
  insights: string[];
  recommendations: string[];
}

// ============================================================================
// HELPER TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const getEmploymentTypeLabel = (type: EmploymentType): string => {
  const labels: Record<EmploymentType, string> = {
    [EmploymentType.FULL_TIME]: "Full-time",
    [EmploymentType.PART_TIME]: "Part-time",
    [EmploymentType.CONTRACT]: "Contract",
    [EmploymentType.INTERNSHIP]: "Internship",
    [EmploymentType.FREELANCE]: "Freelance",
  };
  return labels[type];
};

export const getEmploymentTypeColor = (type: EmploymentType): string => {
  const colors: Record<EmploymentType, string> = {
    [EmploymentType.FULL_TIME]: "text-green-600",
    [EmploymentType.PART_TIME]: "text-blue-600",
    [EmploymentType.CONTRACT]: "text-purple-600",
    [EmploymentType.INTERNSHIP]: "text-yellow-600",
    [EmploymentType.FREELANCE]: "text-pink-600",
  };
  return colors[type];
};

export const getIndustryLabel = (industry: IndustryType): string => {
  const labels: Record<IndustryType, string> = {
    [IndustryType.TECHNOLOGY]: "Technology",
    [IndustryType.FINANCE]: "Finance",
    [IndustryType.HEALTHCARE]: "Healthcare",
    [IndustryType.EDUCATION]: "Education",
    [IndustryType.GOVERNMENT]: "Government",
    [IndustryType.RETAIL]: "Retail",
    [IndustryType.MANUFACTURING]: "Manufacturing",
    [IndustryType.CONSTRUCTION]: "Construction",
    [IndustryType.HOSPITALITY]: "Hospitality",
    [IndustryType.TRANSPORTATION]: "Transportation",
    [IndustryType.ENERGY]: "Energy",
    [IndustryType.TELECOMMUNICATIONS]: "Telecommunications",
    [IndustryType.MEDIA]: "Media",
    [IndustryType.REAL_ESTATE]: "Real Estate",
    [IndustryType.CONSULTING]: "Consulting",
    [IndustryType.OTHER]: "Other",
  };
  return labels[industry];
};

export const getIndustryIcon = (industry: IndustryType): string => {
  const icons: Record<IndustryType, string> = {
    [IndustryType.TECHNOLOGY]: "💻",
    [IndustryType.FINANCE]: "💰",
    [IndustryType.HEALTHCARE]: "🏥",
    [IndustryType.EDUCATION]: "🎓",
    [IndustryType.GOVERNMENT]: "🏛️",
    [IndustryType.RETAIL]: "🛒",
    [IndustryType.MANUFACTURING]: "🏭",
    [IndustryType.CONSTRUCTION]: "🏗️",
    [IndustryType.HOSPITALITY]: "🏨",
    [IndustryType.TRANSPORTATION]: "🚚",
    [IndustryType.ENERGY]: "⚡",
    [IndustryType.TELECOMMUNICATIONS]: "📡",
    [IndustryType.MEDIA]: "📺",
    [IndustryType.REAL_ESTATE]: "🏠",
    [IndustryType.CONSULTING]: "💼",
    [IndustryType.OTHER]: "📌",
  };
  return icons[industry];
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export const validateDateRange = (
  startDate: string,
  endDate?: string
): boolean => {
  const start = new Date(startDate);
  if (endDate) {
    const end = new Date(endDate);
    return end > start && end <= new Date();
  }
  return true;
};

export const validateCurrentEmployment = (
  isCurrent: boolean,
  endDate?: string
): boolean => {
  if (isCurrent && endDate) {
    return false; // Current employment cannot have end date
  }
  if (!isCurrent && !endDate) {
    return false; // Past employment must have end date
  }
  return true;
};

export const calculateDuration = (
  startDate: string,
  endDate?: string
): { months: number; years: number } => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  
  const years = Math.floor(months / 12);
  
  return { months, years };
};

export const formatDuration = (months: number): string => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${months} ${months === 1 ? "month" : "months"}`;
  }
  
  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? "year" : "years"}`;
  }
  
  return `${years} ${years === 1 ? "year" : "years"}, ${remainingMonths} ${
    remainingMonths === 1 ? "month" : "months"
  }`;
};

export const formatDateRange = (
  startDate: string,
  endDate?: string,
  isCurrent?: boolean
): string => {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  
  if (isCurrent) {
    return `${startFormatted} - Present`;
  }
  
  if (endDate) {
    const end = new Date(endDate);
    const endFormatted = end.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    return `${startFormatted} - ${endFormatted}`;
  }
  
  return startFormatted;
};

export const getProgressionScoreLabel = (score: number): string => {
  if (score >= 8) return "Excellent";
  if (score >= 6) return "Good";
  if (score >= 4) return "Fair";
  return "Developing";
};

export const getProgressionScoreColor = (score: number): string => {
  if (score >= 8) return "text-green-600";
  if (score >= 6) return "text-blue-600";
  if (score >= 4) return "text-yellow-600";
  return "text-gray-600";
};

