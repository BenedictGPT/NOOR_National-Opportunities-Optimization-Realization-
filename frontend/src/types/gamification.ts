/**
 * NOOR Gamification System - Token Economy & Rewards
 * 
 * Token-based reward system for completing assessments and unlocking learning content
 */

import { Faculty } from './eight-faculty-model';

// ============================================================================
// Token System
// ============================================================================

export interface TokenWallet {
  userId: string;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  lastUpdated: string;
  transactions: TokenTransaction[];
}

export interface TokenTransaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  source: string; // e.g., "Physical Faculty Assessment", "Advanced Python Course"
  timestamp: string;
  description: string;
}

export enum ScoreBand {
  EXCELLENT = 'excellent', // 90-100
  GOOD = 'good',          // 80-89
  AVERAGE = 'average',    // 70-79
  FAIR = 'fair',          // 60-69
  POOR = 'poor',          // 0-59
}

export interface TokenReward {
  scoreBand: ScoreBand;
  minScore: number;
  maxScore: number;
  tokens: number;
  badge?: string;
  title: string;
}

export const TOKEN_REWARDS: TokenReward[] = [
  {
    scoreBand: ScoreBand.EXCELLENT,
    minScore: 90,
    maxScore: 100,
    tokens: 100,
    badge: '🏆',
    title: 'Excellent Performance',
  },
  {
    scoreBand: ScoreBand.GOOD,
    minScore: 80,
    maxScore: 89,
    tokens: 75,
    badge: '⭐',
    title: 'Good Performance',
  },
  {
    scoreBand: ScoreBand.AVERAGE,
    minScore: 70,
    maxScore: 79,
    tokens: 50,
    badge: '👍',
    title: 'Average Performance',
  },
  {
    scoreBand: ScoreBand.FAIR,
    minScore: 60,
    maxScore: 69,
    tokens: 25,
    badge: '📈',
    title: 'Fair Performance',
  },
  {
    scoreBand: ScoreBand.POOR,
    minScore: 0,
    maxScore: 59,
    tokens: 10,
    badge: '💪',
    title: 'Keep Trying',
  },
];

export function getTokenReward(score: number): TokenReward {
  return TOKEN_REWARDS.find(
    reward => score >= reward.minScore && score <= reward.maxScore
  ) || TOKEN_REWARDS[TOKEN_REWARDS.length - 1];
}

// ============================================================================
// Assessment System (Simplified for MVP)
// ============================================================================

export interface Assessment {
  id: string;
  faculty: Faculty;
  title: string;
  description: string;
  estimatedTime: number; // minutes
  questionCount: number;
  tokenReward: number; // base reward
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isCompleted: boolean;
  lastAttempt?: AssessmentAttempt;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
  tokensEarned?: number;
  answers: AssessmentAnswer[];
  status: 'in_progress' | 'completed' | 'abandoned';
}

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[]; // For multiple choice
  correctAnswer?: string | number; // For validation
  points: number;
  explanation?: string; // Shown after answering
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  LIKERT_SCALE = 'likert_scale',
  TRUE_FALSE = 'true_false',
  SCENARIO = 'scenario',
  SELF_ASSESSMENT = 'self_assessment',
}

export interface AssessmentAnswer {
  questionId: string;
  answer: string | number;
  isCorrect?: boolean;
  pointsEarned: number;
  answeredAt: string;
}

// ============================================================================
// Learning Center
// ============================================================================

export interface Course {
  id: string;
  title: string;
  description: string;
  faculty: Faculty;
  tokenCost: number;
  duration: number; // hours
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  thumbnail: string;
  isUnlocked: boolean;
  isPurchased: boolean;
  progress: number; // 0-100
  rating: number;
  enrolledCount: number;
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: number; // minutes
  isCompleted: boolean;
  content: string;
  quiz?: Quiz;
}

export interface Quiz {
  id: string;
  questions: AssessmentQuestion[];
  passingScore: number;
  attempts: number;
  bestScore?: number;
}

// ============================================================================
// Collaborative Features
// ============================================================================

export interface CollaborativeAssessment {
  id: string;
  title: string;
  description: string;
  faculty: Faculty;
  teamSize: number;
  participants: Participant[];
  status: 'waiting' | 'in_progress' | 'completed';
  tokenRewardPerMember: number;
  startedAt?: string;
  completedAt?: string;
}

export interface Participant {
  userId: string;
  name: string;
  role: 'leader' | 'member';
  contribution: number; // 0-100
  tokensEarned?: number;
}

export interface PeerEvaluation {
  id: string;
  assessmentId: string;
  evaluatorId: string;
  evaluateeId: string;
  faculty: Faculty;
  score: number;
  feedback: string;
  timestamp: string;
}

// ============================================================================
// Gamification Elements
// ============================================================================

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tokenReward: number;
  condition: string; // e.g., "Complete 5 assessments", "Earn 500 tokens"
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface Leaderboard {
  period: 'daily' | 'weekly' | 'monthly' | 'all_time';
  entries: LeaderboardEntry[];
  lastUpdated: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  score: number;
  tokensEarned: number;
  assessmentsCompleted: number;
  avatar?: string;
}

export interface Streak {
  userId: string;
  currentStreak: number; // days
  longestStreak: number;
  lastActivityDate: string;
  bonusMultiplier: number; // 1.0 = no bonus, 1.5 = 50% bonus
}

// ============================================================================
// Progress Tracking
// ============================================================================

export interface UserProgress {
  userId: string;
  level: number;
  experiencePoints: number;
  nextLevelXP: number;
  assessmentsCompleted: number;
  coursesCompleted: number;
  tokensEarned: number;
  achievements: Achievement[];
  streak: Streak;
  facultyProgress: FacultyProgress[];
}

export interface FacultyProgress {
  faculty: Faculty;
  assessmentsCompleted: number;
  averageScore: number;
  tokensEarned: number;
  coursesUnlocked: number;
  lastActivity: string;
}

