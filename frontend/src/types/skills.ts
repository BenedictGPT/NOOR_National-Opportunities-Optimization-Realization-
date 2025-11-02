/**
 * NOOR Platform - Skills TypeScript Types
 * Auto-generated from Pydantic models
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum ProficiencyLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

export enum SkillCategory {
  TECHNICAL = "technical",
  SOFT_SKILLS = "soft_skills",
  LANGUAGE = "language",
  MANAGEMENT = "management",
  CREATIVE = "creative",
  ANALYTICAL = "analytical",
  COMMUNICATION = "communication",
  OTHER = "other",
}

// ============================================================================
// REQUEST TYPES
// ============================================================================

export interface SkillCreate {
  name: string;
  category: SkillCategory;
  description?: string;
}

export interface SkillUpdate {
  name?: string;
  category?: SkillCategory;
  description?: string;
}

export interface UserSkillCreate {
  skill_id: string;
  proficiency_level: ProficiencyLevel;
  years_of_experience?: number;
  last_used_date?: string; // ISO date string
}

export interface UserSkillUpdate {
  proficiency_level?: ProficiencyLevel;
  years_of_experience?: number;
  last_used_date?: string; // ISO date string
}

export interface SkillVerificationRequest {
  user_skill_id: string;
  verification_evidence?: string;
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

export interface SkillResponse {
  id: string;
  name: string;
  category: SkillCategory;
  description?: string;
  created_at: string; // ISO datetime string
}

export interface UserSkillResponse {
  id: string;
  user_id: string;
  skill: SkillResponse;
  proficiency_level: ProficiencyLevel;
  years_of_experience?: number;
  last_used_date?: string; // ISO date string
  is_verified: boolean;
  verified_by?: string;
  verified_at?: string; // ISO datetime string
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface SkillsListResponse {
  success: boolean;
  total: number;
  skills: SkillResponse[];
  skip: number;
  limit: number;
}

export interface UserSkillsListResponse {
  success: boolean;
  total: number;
  skills: UserSkillResponse[];
}

export interface SkillStatsResponse {
  skill_id: string;
  skill_name: string;
  total_users: number;
  average_proficiency: number;
  average_experience: number;
  verified_count: number;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface SkillsFilterParams {
  category?: SkillCategory;
  search?: string;
  skip?: number;
  limit?: number;
}

export interface UserSkillsFilterParams {
  proficiency_level?: ProficiencyLevel;
  category?: SkillCategory;
  verified_only?: boolean;
}

// ============================================================================
// SKILL MATCHING TYPES
// ============================================================================

export interface SkillMatchRequest {
  job_id: string;
  user_id?: string;
}

export interface SkillMatchScore {
  skill_name: string;
  required: boolean;
  user_has_skill: boolean;
  user_proficiency?: ProficiencyLevel;
  required_proficiency?: ProficiencyLevel;
  match_score: number; // 0-1
}

export interface SkillMatchResponse {
  success: boolean;
  job_id: string;
  user_id: string;
  overall_match_score: number; // 0-1
  required_skills_met: number;
  total_required_skills: number;
  optional_skills_met: number;
  total_optional_skills: number;
  skill_details: SkillMatchScore[];
  recommendation: string;
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

export const getProficiencyLevelLabel = (level: ProficiencyLevel): string => {
  const labels: Record<ProficiencyLevel, string> = {
    [ProficiencyLevel.BEGINNER]: "Beginner",
    [ProficiencyLevel.INTERMEDIATE]: "Intermediate",
    [ProficiencyLevel.ADVANCED]: "Advanced",
    [ProficiencyLevel.EXPERT]: "Expert",
  };
  return labels[level];
};

export const getProficiencyLevelColor = (level: ProficiencyLevel): string => {
  const colors: Record<ProficiencyLevel, string> = {
    [ProficiencyLevel.BEGINNER]: "text-yellow-600",
    [ProficiencyLevel.INTERMEDIATE]: "text-blue-600",
    [ProficiencyLevel.ADVANCED]: "text-green-600",
    [ProficiencyLevel.EXPERT]: "text-purple-600",
  };
  return colors[level];
};

export const getSkillCategoryLabel = (category: SkillCategory): string => {
  const labels: Record<SkillCategory, string> = {
    [SkillCategory.TECHNICAL]: "Technical",
    [SkillCategory.SOFT_SKILLS]: "Soft Skills",
    [SkillCategory.LANGUAGE]: "Language",
    [SkillCategory.MANAGEMENT]: "Management",
    [SkillCategory.CREATIVE]: "Creative",
    [SkillCategory.ANALYTICAL]: "Analytical",
    [SkillCategory.COMMUNICATION]: "Communication",
    [SkillCategory.OTHER]: "Other",
  };
  return labels[category];
};

export const getSkillCategoryIcon = (category: SkillCategory): string => {
  const icons: Record<SkillCategory, string> = {
    [SkillCategory.TECHNICAL]: "🔧",
    [SkillCategory.SOFT_SKILLS]: "🤝",
    [SkillCategory.LANGUAGE]: "🌐",
    [SkillCategory.MANAGEMENT]: "📊",
    [SkillCategory.CREATIVE]: "🎨",
    [SkillCategory.ANALYTICAL]: "📈",
    [SkillCategory.COMMUNICATION]: "💬",
    [SkillCategory.OTHER]: "📌",
  };
  return icons[category];
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export const validateYearsOfExperience = (years: number): boolean => {
  return years >= 0 && years <= 50;
};

export const validateLastUsedDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  return date <= today;
};

export const calculateProficiencyScore = (level: ProficiencyLevel): number => {
  const scores: Record<ProficiencyLevel, number> = {
    [ProficiencyLevel.BEGINNER]: 1,
    [ProficiencyLevel.INTERMEDIATE]: 2,
    [ProficiencyLevel.ADVANCED]: 3,
    [ProficiencyLevel.EXPERT]: 4,
  };
  return scores[level];
};

