/**
 * NOOR Platform API Client
 * 
 * Centralized API client for all backend communication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// ============================================================================
// Types
// ============================================================================

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// ============================================================================
// HTTP Client
// ============================================================================

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  clearAccessToken() {
    this.accessToken = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include', // Include cookies
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || {
            code: 'UNKNOWN_ERROR',
            message: 'An unknown error occurred',
          },
        };
      }

      return { data };
    } catch (error) {
      return {
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network error',
        },
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const apiClient = new ApiClient(API_BASE_URL);

// ============================================================================
// Authentication API
// ============================================================================

export const authApi = {
  async register(data: { email: string; password: string; name: string; role: string }) {
    return apiClient.post('/auth/register', data);
  },

  async login(email: string, password: string) {
    const response = await apiClient.post<{ accessToken: string; user: any }>('/auth/login', {
      email,
      password,
    });
    
    if (response.data) {
      apiClient.setAccessToken(response.data.accessToken);
    }
    
    return response;
  },

  async logout() {
    const response = await apiClient.post('/auth/logout');
    apiClient.clearAccessToken();
    return response;
  },

  async getMe() {
    return apiClient.get<any>('/auth/me');
  },

  async updateProfile(data: any) {
    return apiClient.put('/auth/profile', data);
  },
};

// ============================================================================
// Assessment API
// ============================================================================

export const assessmentApi = {
  async list() {
    return apiClient.get<any[]>('/assessments');
  },

  async get(id: string) {
    return apiClient.get<any>(`/assessments/${id}`);
  },

  async start(id: string) {
    return apiClient.post<any>(`/assessments/${id}/start`);
  },

  async submitAnswer(id: string, questionId: string, answer: any) {
    return apiClient.put(`/assessments/${id}/answer`, { questionId, answer });
  },

  async submit(id: string, attemptId: string) {
    return apiClient.post<any>(`/assessments/${id}/submit`, { attemptId });
  },

  async getHistory() {
    return apiClient.get<any[]>('/assessments/history');
  },
};

// ============================================================================
// Skills Passport API
// ============================================================================

export const skillsPassportApi = {
  async get() {
    return apiClient.get<any>('/skills-passport');
  },

  async getScores() {
    return apiClient.get<any>('/skills-passport/scores');
  },

  async requestVerification(data: any) {
    return apiClient.post('/skills-passport/verify', data);
  },

  async getAchievements() {
    return apiClient.get<any[]>('/skills-passport/achievements');
  },
};

// ============================================================================
// Gamification API
// ============================================================================

export const gamificationApi = {
  async getWallet() {
    return apiClient.get<any>('/wallet');
  },

  async getTransactions() {
    return apiClient.get<any[]>('/wallet/transactions');
  },

  async getProgress() {
    return apiClient.get<any>('/progress');
  },

  async getAchievements() {
    return apiClient.get<any[]>('/achievements');
  },

  async getLeaderboard(period: string = 'weekly') {
    return apiClient.get<any>(`/leaderboard?period=${period}`);
  },

  async getStreak() {
    return apiClient.get<any>('/streak');
  },
};

// ============================================================================
// Learning Center API
// ============================================================================

export const learningApi = {
  async listCourses() {
    return apiClient.get<any[]>('/courses');
  },

  async getCourse(id: string) {
    return apiClient.get<any>(`/courses/${id}`);
  },

  async unlockCourse(id: string) {
    return apiClient.post<any>(`/courses/${id}/unlock`);
  },

  async getMyCourses() {
    return apiClient.get<any[]>('/courses/my-courses');
  },

  async updateProgress(id: string, progress: number) {
    return apiClient.put(`/courses/${id}/progress`, { progress });
  },

  async completeCourse(id: string) {
    return apiClient.post(`/courses/${id}/complete`);
  },
};

// ============================================================================
// Team Challenges API
// ============================================================================

export const teamApi = {
  async listChallenges() {
    return apiClient.get<any[]>('/challenges');
  },

  async getChallenge(id: string) {
    return apiClient.get<any>(`/challenges/${id}`);
  },

  async joinChallenge(id: string) {
    return apiClient.post<any>(`/challenges/${id}/join`);
  },

  async getMyTeams() {
    return apiClient.get<any[]>('/challenges/my-teams');
  },

  async updateProgress(id: string, progress: number) {
    return apiClient.put(`/challenges/${id}/progress`, { progress });
  },

  async submitEvaluation(id: string, evaluations: any[]) {
    return apiClient.post(`/challenges/${id}/evaluate`, { evaluations });
  },
};

// ============================================================================
// Institutional API
// ============================================================================

export const institutionalApi = {
  async getEmployees() {
    return apiClient.get<any[]>('/institution/employees');
  },

  async getAnalytics() {
    return apiClient.get<any>('/institution/analytics');
  },

  async getDepartments() {
    return apiClient.get<any[]>('/institution/departments');
  },

  async getTopPerformers() {
    return apiClient.get<any[]>('/institution/top-performers');
  },

  async getGaps() {
    return apiClient.get<any[]>('/institution/gaps');
  },
};

// ============================================================================
// Federal API
// ============================================================================

export const federalApi = {
  async getAnalytics() {
    return apiClient.get<any>('/federal/analytics');
  },

  async getMinistries() {
    return apiClient.get<any[]>('/federal/ministries');
  },

  async getTrends() {
    return apiClient.get<any[]>('/federal/trends');
  },

  async getGaps() {
    return apiClient.get<any[]>('/federal/gaps');
  },

  async getInstitutions() {
    return apiClient.get<any[]>('/federal/institutions');
  },
};

// ============================================================================
// Export All
// ============================================================================

export default {
  auth: authApi,
  assessment: assessmentApi,
  skillsPassport: skillsPassportApi,
  gamification: gamificationApi,
  learning: learningApi,
  team: teamApi,
  institutional: institutionalApi,
  federal: federalApi,
};

