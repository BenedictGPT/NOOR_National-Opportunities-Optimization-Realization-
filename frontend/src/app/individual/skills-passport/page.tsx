'use client';

import React from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Card, CardHeader, CardBody } from '@/components/individual/Card';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { fatimaSkillsPassport } from '@/data/eight-faculty-mock-data';
import { FACULTY_METADATA, Faculty } from '@/types/eight-faculty-model';

export default function SkillsPassportPage() {
  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const passport = fatimaSkillsPassport;
  const profile = passport.eightFacultyProfile;

  const getFacultyColor = (faculty: Faculty) => {
    return FACULTY_METADATA[faculty].color;
  };

  const getFacultyName = (faculty: Faculty) => {
    return FACULTY_METADATA[faculty].name;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout user={user} notificationCount={3}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-individual-red to-red-700 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-playfair mb-2">
                Skills Passport
              </h1>
              <p className="text-red-100 text-lg font-inter">
                Eight-Faculty Model Assessment
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold font-crimson">{profile.overallScore}</div>
              <div className="text-sm text-red-100">Overall Score</div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">
              Assessment Progress
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-individual-red font-crimson">
                  {profile.totalCompetenciesAssessed}
                </div>
                <div className="text-sm text-gray-600 mt-1">Competencies Assessed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-individual-beige font-crimson">
                  {profile.totalCompetencies}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Competencies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 font-crimson">
                  {Math.round((profile.totalCompetenciesAssessed / profile.totalCompetencies) * 100)}%
                </div>
                <div className="text-sm text-gray-600 mt-1">Completion Rate</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-individual-red to-individual-beige h-3 rounded-full transition-all"
                  style={{ width: `${(profile.totalCompetenciesAssessed / profile.totalCompetencies) * 100}%` }}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Eight Faculty Scores */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">
              Eight-Faculty Model Scores
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.facultyScores.map((facultyScore) => {
                const metadata = FACULTY_METADATA[facultyScore.faculty];
                return (
                  <div
                    key={facultyScore.faculty}
                    className="border-2 rounded-lg p-4 hover:shadow-lg transition-shadow"
                    style={{ borderColor: metadata.color }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 font-inter">
                          {metadata.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-crimson">
                          {metadata.arabicName}
                        </p>
                      </div>
                      <div
                        className={`text-3xl font-bold font-crimson ${getScoreColor(facultyScore.averageScore)}`}
                      >
                        {facultyScore.averageScore}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${facultyScore.averageScore}%`,
                            backgroundColor: metadata.color,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{facultyScore.competencyScores.length} of 12 assessed</span>
                      <span>Last: {new Date(facultyScore.lastAssessed).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Strengths and Development Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Top Strengths
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {passport.strengths.map((faculty, index) => {
                  const metadata = FACULTY_METADATA[faculty];
                  const score = profile.facultyScores.find(f => f.faculty === faculty);
                  return (
                    <div
                      key={faculty}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: `${metadata.color}15` }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: metadata.color }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{metadata.name}</div>
                          <div className="text-xs text-gray-600">{metadata.custodianMinistry}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold" style={{ color: metadata.color }}>
                        {score?.averageScore}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* Development Areas */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Development Areas
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {passport.developmentAreas.map((faculty, index) => {
                  const metadata = FACULTY_METADATA[faculty];
                  const score = profile.facultyScores.find(f => f.faculty === faculty);
                  return (
                    <div
                      key={faculty}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-700 font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{metadata.name}</div>
                          <div className="text-xs text-gray-600">Recommended for improvement</div>
                        </div>
                      </div>
                      <Button size="sm" variant="bordered" color="primary">
                        Improve
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Achievements
              </h2>
              <Badge color="primary" variant="flat">
                {passport.achievements.length} Earned
              </Badge>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {passport.achievements.map((achievement) => {
                const metadata = FACULTY_METADATA[achievement.faculty];
                return (
                  <div
                    key={achievement.id}
                    className="border-2 rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                    style={{ borderColor: metadata.color }}
                  >
                    <div className="text-5xl mb-2">{achievement.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <Badge color="default" variant="flat" size="sm">
                      {metadata.name}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Verifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Official Verifications
              </h2>
              <Badge color="success" variant="flat">
                {passport.verifications.length} Verified
              </Badge>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {passport.verifications.map((verification) => (
                <div
                  key={verification.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{verification.verifiedBy}</div>
                      <div className="text-sm text-gray-600">{verification.method}</div>
                      <div className="text-xs text-gray-400">
                        Verified: {new Date(verification.verificationDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  {verification.certificateUrl && (
                    <Button size="sm" variant="light" color="primary">
                      View Certificate
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button color="primary" fullWidth>
            Take New Assessment
          </Button>
          <Button variant="bordered" fullWidth>
            Share with Employer
          </Button>
          <Button variant="bordered" fullWidth>
            Download Report
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

