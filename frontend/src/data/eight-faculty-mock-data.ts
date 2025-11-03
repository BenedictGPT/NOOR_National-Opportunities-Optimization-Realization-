/**
 * Mock Data for Eight-Faculty Model Demonstration
 * 
 * This file contains sample data to demonstrate the data flow:
 * Individual → Institutional → Federal
 */

import {
  Faculty,
  EightFacultyProfile,
  SkillsPassport,
  InstitutionalHCMData,
  FederalAnalytics,
  FacultyScore,
  CompetencyScore,
} from '../types/eight-faculty-model';

// ============================================================================
// Individual Level - Fatima Al Hashimi's Skills Passport
// ============================================================================

const fatimaCompetencyScores: CompetencyScore[] = [
  // Physical Faculty
  { competencyId: 'phys_health', score: 92, assessmentDate: '2024-10-15', assessmentMethod: 'Health Questionnaire', verifiedBy: 'MoHAP' },
  { competencyId: 'phys_fitness', score: 88, assessmentDate: '2024-10-10', assessmentMethod: 'Fitness Test' },
  { competencyId: 'phys_energy', score: 85, assessmentDate: '2024-10-12', assessmentMethod: 'Self-Report' },
  
  // Mental Faculty
  { competencyId: 'ment_critical', score: 95, assessmentDate: '2024-10-20', assessmentMethod: 'Watson-Glaser Test', verifiedBy: 'Etihad Credit Bureau' },
  { competencyId: 'ment_problem', score: 93, assessmentDate: '2024-10-18', assessmentMethod: 'Problem-Solving Simulation' },
  { competencyId: 'ment_memory', score: 90, assessmentDate: '2024-10-16', assessmentMethod: 'Memory Task' },
  
  // Emotional Faculty
  { competencyId: 'emot_awareness', score: 87, assessmentDate: '2024-10-14', assessmentMethod: 'Self-Awareness Scale' },
  { competencyId: 'emot_regulation', score: 89, assessmentDate: '2024-10-13', assessmentMethod: 'Emotion Regulation Questionnaire' },
  { competencyId: 'emot_empathy', score: 91, assessmentDate: '2024-10-11', assessmentMethod: 'IRI Scale' },
  
  // Spiritual Faculty
  { competencyId: 'spir_purpose', score: 94, assessmentDate: '2024-10-09', assessmentMethod: 'Purpose in Life Test' },
  { competencyId: 'spir_peace', score: 90, assessmentDate: '2024-10-08', assessmentMethod: 'Inner Peace Scale' },
  { competencyId: 'spir_gratitude', score: 92, assessmentDate: '2024-10-07', assessmentMethod: 'GQ-6' },
  
  // Social Faculty
  { competencyId: 'soc_communication', score: 88, assessmentDate: '2024-10-25', assessmentMethod: 'Communication Evaluation' },
  { competencyId: 'soc_teamwork', score: 90, assessmentDate: '2024-10-24', assessmentMethod: 'Teamwork Simulation' },
  { competencyId: 'soc_cultural', score: 86, assessmentDate: '2024-10-23', assessmentMethod: 'CQS' },
  
  // Volitional Faculty
  { competencyId: 'vol_motivation', score: 93, assessmentDate: '2024-10-22', assessmentMethod: 'WEIMS' },
  { competencyId: 'vol_grit', score: 91, assessmentDate: '2024-10-21', assessmentMethod: 'Grit-S' },
  { competencyId: 'vol_discipline', score: 89, assessmentDate: '2024-10-19', assessmentMethod: 'Self-Discipline Task' },
  
  // Intellectual Faculty
  { competencyId: 'int_critical', score: 96, assessmentDate: '2024-10-17', assessmentMethod: 'Watson-Glaser' },
  { competencyId: 'int_learning', score: 94, assessmentDate: '2024-10-15', assessmentMethod: 'Learning Agility Assessment' },
  { competencyId: 'int_curiosity', score: 92, assessmentDate: '2024-10-14', assessmentMethod: 'Curiosity Inventory' },
  
  // Moral Faculty
  { competencyId: 'mor_integrity', score: 95, assessmentDate: '2024-10-12', assessmentMethod: 'Integrity Inventory' },
  { competencyId: 'mor_ethics', score: 93, assessmentDate: '2024-10-11', assessmentMethod: 'Ethical Reasoning Test' },
  { competencyId: 'mor_fairness', score: 91, assessmentDate: '2024-10-10', assessmentMethod: 'Justice Orientation Scale' },
];

const fatimaFacultyScores: FacultyScore[] = [
  {
    faculty: Faculty.PHYSICAL,
    averageScore: 88,
    competencyScores: fatimaCompetencyScores.filter(c => c.competencyId.startsWith('phys')),
    lastAssessed: '2024-10-15',
    completionPercentage: 25, // 3 out of 12 competencies
  },
  {
    faculty: Faculty.MENTAL,
    averageScore: 93,
    competencyScores: fatimaCompetencyScores.filter(c => c.competencyId.startsWith('ment')),
    lastAssessed: '2024-10-20',
    completionPercentage: 25,
  },
  {
    faculty: Faculty.EMOTIONAL,
    averageScore: 89,
    competencyScores: fatimaCompetencyScores.filter(c => c.competencyId.startsWith('emot')),
    lastAssessed: '2024-10-14',
    completionPercentage: 25,
  },
  {
    faculty: Faculty.SPIRITUAL,
    averageScore: 92,
    competencyScores: fatimaCompetencyScores.filter(c => c.competencyId.startsWith('spir')),
    lastAssessed: '2024-10-09',
    completionPercentage: 25,
  },
  {
    faculty: Faculty.SOCIAL,
    averageScore: 88,
    competencyScores: fatimaCompetencyScores.filter(c => c.competencyId.startsWith('soc')),
    lastAssessed: '2024-10-25',
    completionPercentage: 25,
  },
  {
    faculty: Faculty.VOLITIONAL,
    averageScore: 91,
    competencyScores: fatimaCompetencyScores.filter(c => c.competencyId.startsWith('vol')),
    lastAssessed: '2024-10-22',
    completionPercentage: 25,
  },
  {
    faculty: Faculty.INTELLECTUAL,
    averageScore: 94,
    competencyScores: fatimaCompetencyScores.filter(c => c.competencyId.startsWith('int')),
    lastAssessed: '2024-10-17',
    completionPercentage: 25,
  },
  {
    faculty: Faculty.MORAL,
    averageScore: 93,
    competencyScores: fatimaCompetencyScores.filter(c => c.competencyId.startsWith('mor')),
    lastAssessed: '2024-10-12',
    completionPercentage: 25,
  },
];

export const fatimaEightFacultyProfile: EightFacultyProfile = {
  userId: 'fatima_alhashimi',
  overallScore: 91,
  facultyScores: fatimaFacultyScores,
  totalCompetenciesAssessed: 24,
  totalCompetencies: 96,
  lastUpdated: '2024-10-25',
  createdAt: '2024-09-01',
};

export const fatimaSkillsPassport: SkillsPassport = {
  id: 'passport_fatima_001',
  userId: 'fatima_alhashimi',
  eightFacultyProfile: fatimaEightFacultyProfile,
  strengths: [Faculty.INTELLECTUAL, Faculty.MENTAL, Faculty.MORAL],
  developmentAreas: [Faculty.PHYSICAL, Faculty.SOCIAL, Faculty.EMOTIONAL],
  achievements: [
    {
      id: 'ach_001',
      title: 'Intellectual Excellence',
      description: 'Scored 94+ in Intellectual Faculty',
      faculty: Faculty.INTELLECTUAL,
      earnedDate: '2024-10-17',
      icon: '🎓',
    },
    {
      id: 'ach_002',
      title: 'Mental Mastery',
      description: 'Scored 93+ in Mental Faculty',
      faculty: Faculty.MENTAL,
      earnedDate: '2024-10-20',
      icon: '🧠',
    },
    {
      id: 'ach_003',
      title: 'Ethical Leader',
      description: 'Scored 93+ in Moral Faculty',
      faculty: Faculty.MORAL,
      earnedDate: '2024-10-12',
      icon: '⚖️',
    },
  ],
  verifications: [
    {
      id: 'ver_001',
      competencyId: 'phys_health',
      verifiedBy: 'Ministry of Health and Prevention',
      verificationDate: '2024-10-15',
      method: 'Official Health Assessment',
      certificateUrl: '/certificates/health_fatima.pdf',
    },
    {
      id: 'ver_002',
      competencyId: 'ment_critical',
      verifiedBy: 'Etihad Credit Bureau',
      verificationDate: '2024-10-20',
      method: 'Watson-Glaser Critical Thinking Test',
      certificateUrl: '/certificates/critical_thinking_fatima.pdf',
    },
  ],
  privacySettings: {
    shareWithEmployers: true,
    shareWithGovernment: true,
    visibleFaculties: Object.values(Faculty),
    anonymousData: false,
  },
};

// ============================================================================
// Institutional Level - Ministry of AI HCM Data
// ============================================================================

export const ministryOfAIHCMData: InstitutionalHCMData = {
  institutionId: 'inst_moai',
  institutionName: 'Ministry of Artificial Intelligence',
  totalEmployees: 245,
  facultyAverages: {
    [Faculty.PHYSICAL]: 86,
    [Faculty.MENTAL]: 92,
    [Faculty.EMOTIONAL]: 88,
    [Faculty.SPIRITUAL]: 89,
    [Faculty.SOCIAL]: 87,
    [Faculty.VOLITIONAL]: 90,
    [Faculty.INTELLECTUAL]: 94,
    [Faculty.MORAL]: 91,
  },
  departmentBreakdown: [
    {
      departmentId: 'dept_ai_research',
      departmentName: 'AI Research',
      employeeCount: 85,
      facultyAverages: {
        [Faculty.PHYSICAL]: 84,
        [Faculty.MENTAL]: 95,
        [Faculty.EMOTIONAL]: 87,
        [Faculty.SPIRITUAL]: 88,
        [Faculty.SOCIAL]: 85,
        [Faculty.VOLITIONAL]: 91,
        [Faculty.INTELLECTUAL]: 96,
        [Faculty.MORAL]: 92,
      },
    },
    {
      departmentId: 'dept_ai_strategy',
      departmentName: 'AI Strategy',
      employeeCount: 60,
      facultyAverages: {
        [Faculty.PHYSICAL]: 87,
        [Faculty.MENTAL]: 93,
        [Faculty.EMOTIONAL]: 90,
        [Faculty.SPIRITUAL]: 91,
        [Faculty.SOCIAL]: 89,
        [Faculty.VOLITIONAL]: 92,
        [Faculty.INTELLECTUAL]: 94,
        [Faculty.MORAL]: 93,
      },
    },
    {
      departmentId: 'dept_ai_operations',
      departmentName: 'Operations',
      employeeCount: 100,
      facultyAverages: {
        [Faculty.PHYSICAL]: 87,
        [Faculty.MENTAL]: 89,
        [Faculty.EMOTIONAL]: 88,
        [Faculty.SPIRITUAL]: 88,
        [Faculty.SOCIAL]: 88,
        [Faculty.VOLITIONAL]: 88,
        [Faculty.INTELLECTUAL]: 91,
        [Faculty.MORAL]: 89,
      },
    },
  ],
  topPerformers: [
    {
      employeeId: 'emp_001',
      name: 'Fatima Al Hashimi',
      position: 'Senior AI Researcher',
      department: 'AI Research',
      overallScore: 91,
      topFaculties: [Faculty.INTELLECTUAL, Faculty.MENTAL, Faculty.MORAL],
    },
    {
      employeeId: 'emp_002',
      name: 'Ahmed Al Mansoori',
      position: 'AI Strategy Lead',
      department: 'AI Strategy',
      overallScore: 93,
      topFaculties: [Faculty.INTELLECTUAL, Faculty.VOLITIONAL, Faculty.MENTAL],
    },
    {
      employeeId: 'emp_003',
      name: 'Sara Al Zaabi',
      position: 'Research Scientist',
      department: 'AI Research',
      overallScore: 92,
      topFaculties: [Faculty.INTELLECTUAL, Faculty.MENTAL, Faculty.SPIRITUAL],
    },
  ],
  developmentNeeds: [
    {
      faculty: Faculty.PHYSICAL,
      currentAverage: 86,
      targetAverage: 90,
      gap: 4,
      affectedEmployees: 120,
    },
    {
      faculty: Faculty.SOCIAL,
      currentAverage: 87,
      targetAverage: 90,
      gap: 3,
      affectedEmployees: 95,
    },
  ],
  lastUpdated: '2024-11-01',
};

// ============================================================================
// Federal Level - National Analytics
// ============================================================================

export const federalAnalytics: FederalAnalytics = {
  totalCitizens: 45892,
  totalInstitutions: 234,
  nationalFacultyAverages: {
    [Faculty.PHYSICAL]: 84,
    [Faculty.MENTAL]: 87,
    [Faculty.EMOTIONAL]: 85,
    [Faculty.SPIRITUAL]: 90,
    [Faculty.SOCIAL]: 86,
    [Faculty.VOLITIONAL]: 88,
    [Faculty.INTELLECTUAL]: 89,
    [Faculty.MORAL]: 91,
  },
  facultyTrends: [
    {
      faculty: Faculty.INTELLECTUAL,
      monthlyAverages: [
        { month: '2024-05', average: 87 },
        { month: '2024-06', average: 87.5 },
        { month: '2024-07', average: 88 },
        { month: '2024-08', average: 88.3 },
        { month: '2024-09', average: 88.7 },
        { month: '2024-10', average: 89 },
      ],
      yearOverYearChange: 2.3,
      trend: 'increasing',
    },
    {
      faculty: Faculty.PHYSICAL,
      monthlyAverages: [
        { month: '2024-05', average: 84.2 },
        { month: '2024-06', average: 84.1 },
        { month: '2024-07', average: 84 },
        { month: '2024-08', average: 83.9 },
        { month: '2024-09', average: 84 },
        { month: '2024-10', average: 84 },
      ],
      yearOverYearChange: -0.2,
      trend: 'stable',
    },
  ],
  ministryBreakdown: [
    {
      ministryId: 'min_ai',
      ministryName: 'Ministry of Artificial Intelligence',
      employeeCount: 245,
      facultyAverages: {
        [Faculty.PHYSICAL]: 86,
        [Faculty.MENTAL]: 92,
        [Faculty.EMOTIONAL]: 88,
        [Faculty.SPIRITUAL]: 89,
        [Faculty.SOCIAL]: 87,
        [Faculty.VOLITIONAL]: 90,
        [Faculty.INTELLECTUAL]: 94,
        [Faculty.MORAL]: 91,
      },
    },
    {
      ministryId: 'min_health',
      ministryName: 'Ministry of Health and Prevention',
      employeeCount: 1250,
      facultyAverages: {
        [Faculty.PHYSICAL]: 92,
        [Faculty.MENTAL]: 88,
        [Faculty.EMOTIONAL]: 89,
        [Faculty.SPIRITUAL]: 90,
        [Faculty.SOCIAL]: 88,
        [Faculty.VOLITIONAL]: 87,
        [Faculty.INTELLECTUAL]: 87,
        [Faculty.MORAL]: 92,
      },
      custodianFaculty: Faculty.PHYSICAL,
    },
    {
      ministryId: 'min_education',
      ministryName: 'Ministry of Education',
      employeeCount: 2150,
      facultyAverages: {
        [Faculty.PHYSICAL]: 83,
        [Faculty.MENTAL]: 89,
        [Faculty.EMOTIONAL]: 87,
        [Faculty.SPIRITUAL]: 91,
        [Faculty.SOCIAL]: 88,
        [Faculty.VOLITIONAL]: 88,
        [Faculty.INTELLECTUAL]: 93,
        [Faculty.MORAL]: 92,
      },
      custodianFaculty: Faculty.INTELLECTUAL,
    },
  ],
  skillsGaps: [
    {
      faculty: Faculty.INTELLECTUAL,
      demand: 1245,
      supply: 892,
      gap: 353,
      priority: 'critical',
    },
    {
      faculty: Faculty.MENTAL,
      demand: 980,
      supply: 756,
      gap: 224,
      priority: 'high',
    },
    {
      faculty: Faculty.PHYSICAL,
      demand: 650,
      supply: 580,
      gap: 70,
      priority: 'medium',
    },
  ],
  topPerformingInstitutions: [
    {
      institutionId: 'inst_moai',
      institutionName: 'Ministry of Artificial Intelligence',
      overallScore: 90,
      rank: 1,
      employeeCount: 245,
      topFaculties: [Faculty.INTELLECTUAL, Faculty.MENTAL, Faculty.MORAL],
    },
    {
      institutionId: 'inst_education',
      institutionName: 'Ministry of Education',
      overallScore: 89,
      rank: 2,
      employeeCount: 2150,
      topFaculties: [Faculty.INTELLECTUAL, Faculty.MORAL, Faculty.SPIRITUAL],
    },
    {
      institutionId: 'inst_health',
      institutionName: 'Ministry of Health and Prevention',
      overallScore: 89,
      rank: 3,
      employeeCount: 1250,
      topFaculties: [Faculty.PHYSICAL, Faculty.MORAL, Faculty.SPIRITUAL],
    },
  ],
  lastUpdated: '2024-11-03',
};

