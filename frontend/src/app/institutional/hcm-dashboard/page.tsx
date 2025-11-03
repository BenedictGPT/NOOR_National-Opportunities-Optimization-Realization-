'use client';

import React from 'react';
import { DashboardLayout } from '@/components/institutional/layout';
import { Card, CardHeader, CardBody } from '@/components/institutional/Card';
import { Button } from '@/components/institutional/Button';
import { Badge } from '@/components/institutional/Badge';
import { ministryOfAIHCMData } from '@/data/eight-faculty-mock-data';
import { FACULTY_METADATA, Faculty } from '@/types/eight-faculty-model';

export default function HCMDashboardPage() {
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@moai.gov.ae',
    role: 'HR Manager',
  };

  const hcmData = ministryOfAIHCMData;

  const getFacultyColor = (faculty: Faculty) => {
    return FACULTY_METADATA[faculty].color;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const overallAverage = Math.round(
    Object.values(hcmData.facultyAverages).reduce((sum, score) => sum + score, 0) / 8
  );

  return (
    <DashboardLayout user={user} notificationCount={5}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-institutional-blue to-blue-700 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-inter mb-2">
                HCM Dashboard
              </h1>
              <p className="text-blue-100 text-lg">
                {hcmData.institutionName} - Eight-Faculty Analytics
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold">{overallAverage}</div>
              <div className="text-sm text-blue-100">Average Score</div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-institutional-blue">
                  {hcmData.totalEmployees}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Employees</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">
                  {hcmData.topPerformers.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Top Performers</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600">
                  {hcmData.developmentNeeds.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Development Areas</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-institutional-silver">
                  {hcmData.departmentBreakdown.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Departments</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Eight-Faculty Organizational Averages */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">
              Organizational Eight-Faculty Scores
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(hcmData.facultyAverages).map(([faculty, score]) => {
                const metadata = FACULTY_METADATA[faculty as Faculty];
                return (
                  <div
                    key={faculty}
                    className="border-2 rounded-lg p-4 hover:shadow-lg transition-shadow"
                    style={{ borderColor: metadata.color }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-semibold text-gray-700">
                        {metadata.name}
                      </div>
                      <div
                        className={`text-2xl font-bold ${getScoreColor(score)}`}
                      >
                        {score}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${score}%`,
                          backgroundColor: metadata.color,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {metadata.arabicName}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Department Performance
              </h2>
              <Button variant="light" size="sm" color="primary">
                View All Departments
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {hcmData.departmentBreakdown.map((dept) => {
                const deptAverage = Math.round(
                  Object.values(dept.facultyAverages).reduce((sum, score) => sum + score, 0) / 8
                );
                return (
                  <div
                    key={dept.departmentId}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{dept.departmentName}</h3>
                        <p className="text-sm text-gray-600">{dept.employeeCount} employees</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(deptAverage)}`}>
                          {deptAverage}
                        </div>
                        <div className="text-xs text-gray-500">Avg Score</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(dept.facultyAverages).slice(0, 4).map(([faculty, score]) => {
                        const metadata = FACULTY_METADATA[faculty as Faculty];
                        return (
                          <div key={faculty} className="text-center">
                            <div className="text-xs text-gray-600 mb-1">{metadata.name.split(' ')[0]}</div>
                            <div
                              className="text-lg font-bold"
                              style={{ color: metadata.color }}
                            >
                              {score}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Top Performers and Development Needs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">
                Top Performers
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {hcmData.topPerformers.map((performer, index) => (
                  <div
                    key={performer.employeeId}
                    className="flex items-center justify-between p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{performer.name}</div>
                        <div className="text-sm text-gray-600">{performer.position}</div>
                        <div className="text-xs text-gray-500">{performer.department}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {performer.overallScore}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {performer.topFaculties.slice(0, 3).map((faculty) => {
                          const metadata = FACULTY_METADATA[faculty];
                          return (
                            <div
                              key={faculty}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: metadata.color }}
                              title={metadata.name}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Development Needs */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">
                Development Priorities
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {hcmData.developmentNeeds.map((need) => {
                  const metadata = FACULTY_METADATA[need.faculty];
                  return (
                    <div
                      key={need.faculty}
                      className="border-2 rounded-lg p-4"
                      style={{ borderColor: metadata.color }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-semibold text-gray-900">{metadata.name}</div>
                          <div className="text-sm text-gray-600">
                            {need.affectedEmployees} employees need development
                          </div>
                        </div>
                        <Badge color="warning" variant="flat">
                          Gap: {need.gap}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current</span>
                          <span className="font-semibold">{need.currentAverage}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${need.currentAverage}%`,
                              backgroundColor: metadata.color,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Target</span>
                          <span className="font-semibold">{need.targetAverage}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="bordered" fullWidth className="mt-3">
                        Create Training Program
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Faculty Distribution Chart */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">
              Eight-Faculty Distribution
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {Object.entries(hcmData.facultyAverages).map(([faculty, score]) => {
                const metadata = FACULTY_METADATA[faculty as Faculty];
                return (
                  <div key={faculty}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: metadata.color }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {metadata.name}
                        </span>
                      </div>
                      <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                        {score}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{
                          width: `${score}%`,
                          backgroundColor: metadata.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button color="primary" fullWidth>
            Export Report
          </Button>
          <Button variant="bordered" fullWidth>
            Schedule Assessments
          </Button>
          <Button variant="bordered" fullWidth>
            View Trends
          </Button>
          <Button variant="bordered" fullWidth>
            Compare Departments
          </Button>
        </div>

        {/* Data Flow Indicator */}
        <Card className="bg-blue-50 border-2 border-institutional-blue">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="text-4xl">📊</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Eight-Faculty Data Flow
                </h3>
                <p className="text-sm text-gray-600">
                  This HCM dashboard aggregates Eight-Faculty scores from {hcmData.totalEmployees} individual employee Skills Passports.
                  Data is automatically synchronized and feeds into Federal-level analytics for national workforce insights.
                </p>
              </div>
              <Button variant="light" size="sm">
                Learn More
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}

