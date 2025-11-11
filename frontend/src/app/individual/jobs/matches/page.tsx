'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/individual/layout';
import { Card, CardHeader, CardBody } from '@/components/individual/Card';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';

interface JobMatch {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  locationType: string;
  salary: string;
  matchScore: number;
  matchReasons: string[];
  postedDate: string;
  applicants: number;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  experienceMatch: boolean;
  salaryMatch: boolean;
  locationMatch: boolean;
}

export default function AIJobMatchesPage() {
  const router = useRouter();
  const [showOnlyPerfectMatches, setShowOnlyPerfectMatches] = useState(false);

  // Mock AI-matched jobs data
  const jobMatches: JobMatch[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Ministry of AI',
      companyLogo: '🤖',
      location: 'Abu Dhabi',
      locationType: 'Hybrid',
      salary: 'AED 25,000 - 35,000',
      matchScore: 98,
      matchReasons: [
        'Your Python and Machine Learning skills are a perfect fit',
        'Your 5+ years experience matches the requirement',
        'Location preference aligns',
        'Salary expectation within range',
      ],
      postedDate: '2 days ago',
      applicants: 12,
      requiredSkills: ['Python', 'TensorFlow', 'Docker', 'AWS', 'React'],
      matchedSkills: ['Python', 'TensorFlow', 'Docker', 'AWS', 'React'],
      missingSkills: [],
      experienceMatch: true,
      salaryMatch: true,
      locationMatch: true,
    },
    {
      id: '2',
      title: 'AI Research Scientist',
      company: 'Mohamed bin Zayed University of AI',
      companyLogo: '🎓',
      location: 'Abu Dhabi',
      locationType: 'On-site',
      salary: 'AED 30,000 - 45,000',
      matchScore: 95,
      matchReasons: [
        'Your Machine Learning expertise is highly relevant',
        'Research publications align with role',
        'PhD qualification matches requirement',
        'Strong match in NLP and Computer Vision',
      ],
      postedDate: '1 week ago',
      applicants: 8,
      requiredSkills: ['Python', 'PyTorch', 'NLP', 'Computer Vision', 'Research'],
      matchedSkills: ['Python', 'PyTorch', 'NLP', 'Computer Vision'],
      missingSkills: ['Research'],
      experienceMatch: true,
      salaryMatch: true,
      locationMatch: true,
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'Ministry of Interior',
      companyLogo: '🛡️',
      location: 'Dubai',
      locationType: 'Hybrid',
      salary: 'AED 20,000 - 28,000',
      matchScore: 88,
      matchReasons: [
        'Strong match in React and Node.js',
        'Your experience level fits well',
        'Previous government sector experience is a plus',
      ],
      postedDate: '3 days ago',
      applicants: 24,
      requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript'],
      matchedSkills: ['React', 'Node.js', 'Docker', 'TypeScript'],
      missingSkills: ['PostgreSQL'],
      experienceMatch: true,
      salaryMatch: true,
      locationMatch: false,
    },
    {
      id: '4',
      title: 'Cloud Solutions Architect',
      company: 'Ministry of Education',
      companyLogo: '📚',
      location: 'Abu Dhabi',
      locationType: 'Hybrid',
      salary: 'AED 28,000 - 38,000',
      matchScore: 85,
      matchReasons: [
        'AWS certification matches requirement',
        'Strong cloud architecture experience',
        'DevOps skills are relevant',
      ],
      postedDate: '5 days ago',
      applicants: 18,
      requiredSkills: ['AWS', 'Kubernetes', 'Terraform', 'Python', 'System Design'],
      matchedSkills: ['AWS', 'Kubernetes', 'Python'],
      missingSkills: ['Terraform', 'System Design'],
      experienceMatch: true,
      salaryMatch: true,
      locationMatch: true,
    },
  ];

  const filteredMatches = showOnlyPerfectMatches
    ? jobMatches.filter(job => job.matchScore >= 90)
    : jobMatches;

  const getMatchLevel = (score: number) => {
    if (score >= 90) return { label: 'Excellent Match', color: 'success', emoji: '🎯' };
    if (score >= 80) return { label: 'Great Match', color: 'primary', emoji: '✨' };
    if (score >= 70) return { label: 'Good Match', color: 'warning', emoji: '👍' };
    return { label: 'Fair Match', color: 'default', emoji: '📌' };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-individual-red to-red-700 rounded-xl p-8 text-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🤖</span>
            <h1 className="text-3xl font-bold font-playfair">AI Job Matches</h1>
          </div>
          <p className="text-red-100 text-lg">
            Personalized job recommendations powered by AI based on your skills, experience, and preferences
          </p>
        </div>

        {/* Stats & Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="lg:col-span-3">
            <CardBody>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-3xl font-bold text-individual-red">{filteredMatches.length}</div>
                    <div className="text-sm text-gray-600">Matched Jobs</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      {filteredMatches.filter(j => j.matchScore >= 90).length}
                    </div>
                    <div className="text-sm text-gray-600">Excellent Matches</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">
                      {filteredMatches.reduce((sum, j) => sum + j.matchScore, 0) / filteredMatches.length | 0}%
                    </div>
                    <div className="text-sm text-gray-600">Avg. Match Score</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnlyPerfectMatches}
                      onChange={(e) => setShowOnlyPerfectMatches(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span>Show only 90%+ matches</span>
                  </label>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardBody>
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm text-blue-700 font-medium">AI-Powered</div>
                <div className="text-xs text-blue-600 mt-1">Updated daily</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* How it Works */}
        <Card className="border-2 border-individual-beige">
          <CardBody>
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 font-playfair mb-2">
                  How AI Matching Works
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Our AI analyzes your profile, skills, experience, and preferences to find the best job matches for you.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">Skills matching</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">Experience level</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">Location preference</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">Salary expectations</span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Job Matches */}
        <div className="space-y-4">
          {filteredMatches.length === 0 ? (
            <Card>
              <CardBody>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or update your profile for better matches
                  </p>
                  <Button color="primary" onClick={() => router.push('/individual/profile')}>
                    Update Profile
                  </Button>
                </div>
              </CardBody>
            </Card>
          ) : (
            filteredMatches.map((job) => {
              const matchLevel = getMatchLevel(job.matchScore);
              return (
                <Card key={job.id} className="hover:shadow-xl transition-all border-2 border-transparent hover:border-individual-red">
                  <CardBody>
                    <div className="flex items-start gap-6">
                      {/* Company Logo & Match Score */}
                      <div className="flex-shrink-0 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-individual-beige to-individual-red rounded-xl flex items-center justify-center text-4xl mb-3">
                          {job.companyLogo}
                        </div>
                        <div className="bg-green-100 text-green-800 rounded-lg px-3 py-2">
                          <div className="text-2xl font-bold">{job.matchScore}%</div>
                          <div className="text-xs">Match</div>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-2xl font-semibold text-gray-900 font-inter">
                                {job.title}
                              </h3>
                              <Badge color={matchLevel.color as any} variant="flat">
                                {matchLevel.emoji} {matchLevel.label}
                              </Badge>
                            </div>
                            <p className="text-lg text-gray-700 font-medium mb-2">{job.company}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                📍 {job.location} • {job.locationType}
                              </span>
                              <span className="flex items-center gap-1">
                                💰 {job.salary}
                              </span>
                              <span className="flex items-center gap-1">
                                🕒 {job.postedDate}
                              </span>
                              <span className="flex items-center gap-1">
                                👥 {job.applicants} applicants
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Match Reasons */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                            <span>✨</span>
                            Why this is a great match for you:
                          </h4>
                          <ul className="space-y-1">
                            {job.matchReasons.map((reason, idx) => (
                              <li key={idx} className="text-sm text-green-800 flex items-start gap-2">
                                <span className="text-green-600 mt-0.5">•</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills Match */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {/* Matched Skills */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <span className="text-green-600">✓</span>
                              Your Matching Skills ({job.matchedSkills.length})
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {job.matchedSkills.map((skill, idx) => (
                                <Badge key={idx} variant="flat" color="success" size="sm">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Missing Skills */}
                          {job.missingSkills.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <span className="text-orange-600">○</span>
                                Skills to Learn ({job.missingSkills.length})
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {job.missingSkills.map((skill, idx) => (
                                  <Badge key={idx} variant="flat" color="warning" size="sm">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Match Indicators */}
                        <div className="flex items-center gap-4 mb-4 text-sm">
                          <div className={`flex items-center gap-1 ${job.experienceMatch ? 'text-green-600' : 'text-gray-400'}`}>
                            {job.experienceMatch ? '✓' : '○'} Experience Match
                          </div>
                          <div className={`flex items-center gap-1 ${job.salaryMatch ? 'text-green-600' : 'text-gray-400'}`}>
                            {job.salaryMatch ? '✓' : '○'} Salary Match
                          </div>
                          <div className={`flex items-center gap-1 ${job.locationMatch ? 'text-green-600' : 'text-gray-400'}`}>
                            {job.locationMatch ? '✓' : '○'} Location Match
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          <Button
                            color="primary"
                            size="lg"
                            onClick={() => router.push(`/individual/jobs/${job.id}`)}
                          >
                            View Details & Apply
                          </Button>
                          <Button
                            variant="bordered"
                            size="lg"
                          >
                            🤍 Save
                          </Button>
                          <Button
                            variant="bordered"
                            size="lg"
                          >
                            📤 Share
                          </Button>
                          {job.missingSkills.length > 0 && (
                            <Button
                              variant="bordered"
                              size="lg"
                              onClick={() => router.push('/individual/learning-center')}
                            >
                              📚 Learn Missing Skills
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })
          )}
        </div>

        {/* Improve Matches CTA */}
        <Card className="bg-gradient-to-r from-individual-red to-red-700 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold font-playfair mb-2">
                  Want better matches?
                </h3>
                <p className="text-red-100">
                  Complete assessments, update your skills, and keep your profile current for more accurate AI recommendations
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="bordered"
                  className="border-white text-white hover:bg-white hover:text-individual-red"
                  onClick={() => router.push('/individual/assessments')}
                >
                  Take Assessments
                </Button>
                <Button
                  variant="bordered"
                  className="border-white text-white hover:bg-white hover:text-individual-red"
                  onClick={() => router.push('/individual/profile')}
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
