/**
 * NOOR Platform - Work Experience API Client
 */

import {
  WorkExperienceCreate,
  WorkExperienceUpdate,
  WorkExperienceResponse,
  WorkExperienceDetailedResponse,
  WorkExperienceListResponse,
  WorkExperienceSummary,
  WorkExperienceVerificationRequest,
  WorkExperienceVerificationResponse,
  WorkExperienceFilterParams,
  CareerProgressionResponse,
  ApiResponse,
} from "@/types/work-experience";

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
// WORK EXPERIENCE CRUD API
// ============================================================================

export const getMyWorkExperience = async (
  params?: WorkExperienceFilterParams
): Promise<WorkExperienceListResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.employment_type)
    queryParams.append("employment_type", params.employment_type);
  if (params?.industry) queryParams.append("industry", params.industry);
  if (params?.current_only)
    queryParams.append("current_only", params.current_only.toString());

  const response = await fetch(
    `${API_BASE_URL}/api/v1/work-experience/me?${queryParams}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse<WorkExperienceListResponse>(response);
};

export const getMyExperienceSummary = async (): Promise<WorkExperienceSummary> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/work-experience/me/summary`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse<WorkExperienceSummary>(response);
};

export const getMyExperienceById = async (
  experienceId: string
): Promise<WorkExperienceDetailedResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/work-experience/me/${experienceId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse<WorkExperienceDetailedResponse>(response);
};

export const addWorkExperience = async (
  experienceData: WorkExperienceCreate
): Promise<WorkExperienceResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/work-experience/me`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(experienceData),
  });

  return handleResponse<WorkExperienceResponse>(response);
};

export const updateWorkExperience = async (
  experienceId: string,
  experienceData: WorkExperienceUpdate
): Promise<WorkExperienceResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/work-experience/me/${experienceId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(experienceData),
    }
  );

  return handleResponse<WorkExperienceResponse>(response);
};

export const deleteWorkExperience = async (
  experienceId: string
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/work-experience/me/${experienceId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete work experience");
  }
};

// ============================================================================
// VERIFICATION API
// ============================================================================

export const requestExperienceVerification = async (
  verificationData: WorkExperienceVerificationRequest
): Promise<WorkExperienceVerificationResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/work-experience/verify`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(verificationData),
  });

  return handleResponse<WorkExperienceVerificationResponse>(response);
};

export const getVerificationStatus = async (
  experienceId: string
): Promise<ApiResponse<any>> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/work-experience/me/${experienceId}/verification-status`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse<ApiResponse<any>>(response);
};

// ============================================================================
// CAREER ANALYTICS API
// ============================================================================

export const getCareerProgression = async (): Promise<CareerProgressionResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/work-experience/me/analytics/progression`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse<CareerProgressionResponse>(response);
};

export const getSkillsTimeline = async (): Promise<ApiResponse<any>> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/work-experience/me/analytics/skills-timeline`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse<ApiResponse<any>>(response);
};

// ============================================================================
// EXPORT API
// ============================================================================

export const exportExperienceToPDF = async (): Promise<ApiResponse<{ download_url: string }>> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/work-experience/me/export/pdf`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse<ApiResponse<{ download_url: string }>>(response);
};

export const exportExperienceToJSON = async (): Promise<ApiResponse<any>> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/work-experience/me/export/json`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse<ApiResponse<any>>(response);
};

