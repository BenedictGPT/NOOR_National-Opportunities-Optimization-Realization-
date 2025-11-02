/**
 * NOOR Platform - Skills API Client
 */

import {
  SkillCreate,
  SkillUpdate,
  SkillResponse,
  SkillsListResponse,
  UserSkillCreate,
  UserSkillUpdate,
  UserSkillResponse,
  UserSkillsListResponse,
  SkillsFilterParams,
  UserSkillsFilterParams,
  SkillMatchRequest,
  SkillMatchResponse,
  SkillStatsResponse,
  SkillVerificationRequest,
  ApiResponse,
} from "@/types/skills";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new Error(error.message || "API request failed");
  }
  return response.json();
};

// ============================================================================
// SKILLS CATALOG API
// ============================================================================

export const listSkills = async (
  params?: SkillsFilterParams
): Promise<SkillsListResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.append("category", params.category);
  if (params?.search) queryParams.append("search", params.search);
  if (params?.skip !== undefined) queryParams.append("skip", params.skip.toString());
  if (params?.limit !== undefined) queryParams.append("limit", params.limit.toString());

  const response = await fetch(
    `${API_BASE_URL}/api/v1/skills?${queryParams}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse<SkillsListResponse>(response);
};

export const getSkillById = async (skillId: string): Promise<SkillResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/skills/${skillId}`, {
    headers: getAuthHeaders(),
  });

  return handleResponse<SkillResponse>(response);
};

export const getSkillStatistics = async (
  skillId: string
): Promise<SkillStatsResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/skills/${skillId}/stats`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse<SkillStatsResponse>(response);
};

export const createSkill = async (
  skillData: SkillCreate
): Promise<SkillResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/skills`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(skillData),
  });

  return handleResponse<SkillResponse>(response);
};

// ============================================================================
// USER SKILLS API
// ============================================================================

export const getMySkills = async (
  params?: UserSkillsFilterParams
): Promise<UserSkillsListResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.proficiency_level)
    queryParams.append("proficiency_level", params.proficiency_level);
  if (params?.category) queryParams.append("category", params.category);
  if (params?.verified_only)
    queryParams.append("verified_only", params.verified_only.toString());

  const response = await fetch(
    `${API_BASE_URL}/api/v1/skills/me?${queryParams}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse<UserSkillsListResponse>(response);
};

export const addMySkill = async (
  skillData: UserSkillCreate
): Promise<UserSkillResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/skills/me`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(skillData),
  });

  return handleResponse<UserSkillResponse>(response);
};

export const updateMySkill = async (
  skillId: string,
  skillData: UserSkillUpdate
): Promise<UserSkillResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/skills/me/${skillId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(skillData),
  });

  return handleResponse<UserSkillResponse>(response);
};

export const removeMySkill = async (skillId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/skills/me/${skillId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to remove skill");
  }
};

// ============================================================================
// SKILL VERIFICATION API
// ============================================================================

export const requestSkillVerification = async (
  verificationData: SkillVerificationRequest
): Promise<ApiResponse<{ request_id: string }>> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/skills/verify`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(verificationData),
  });

  return handleResponse<ApiResponse<{ request_id: string }>>(response);
};

// ============================================================================
// SKILL MATCHING API
// ============================================================================

export const matchSkillsToJob = async (
  matchData: SkillMatchRequest
): Promise<SkillMatchResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/skills/match`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(matchData),
  });

  return handleResponse<SkillMatchResponse>(response);
};

// ============================================================================
// BULK OPERATIONS API
// ============================================================================

export const addMultipleSkills = async (
  skills: UserSkillCreate[]
): Promise<UserSkillResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/skills/me/bulk`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(skills),
  });

  return handleResponse<UserSkillResponse[]>(response);
};

export const removeMultipleSkills = async (
  skillIds: string[]
): Promise<ApiResponse<{ removed_count: number }>> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/skills/me/bulk`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify(skillIds),
  });

  return handleResponse<ApiResponse<{ removed_count: number }>>(response);
};

