'use client';

import React from 'react';
import { DashboardLayout } from '@/components/federal/layout';
import { Card, CardHeader, CardBody } from '@/components/federal/Card';
import { Button } from '@/components/federal/Button';
import { Badge } from '@/components/federal/Badge';
import { federalAnalytics } from '@/data/eight-faculty-mock-data';
import { FACULTY_METADATA, Faculty } from '@/types/eight-faculty-model';

export default function EightFacultyAnalyticsPage() {
  const user = {
    name: 'Ahmed Al Mansoori',
    email: 'ahmed.almansoori@uae.gov.ae',
    role: 'Federal Administrator',
  };

  const analytics = federalAnalytics;

  const getFacultyColor = (faculty: Faculty) => {
    return FACULTY_METADATA[faculty].color;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'primary';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const nationalAverage = Math.round(
    Object.values(analytics.nationalFacultyAverages).reduce((sum, score) => sum + score, 0) / 8
  );

  return (
    <DashboardLayout user={user} notificationCount={7}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-federal-gold to-yellow-600 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-cairo mb-2">
                National Eight-Faculty Analytics
              </h1>
              <p className="text-yellow-100 text-lg font-noto">
                UAE Workforce Intelligence Dashboard
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold">{nationalAverage}</div>
              <div className="text-sm text-yellow-100">National Average</div>
            </div>
          </div>
        </div>

        {/* National Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-federal-gold">
                  {analytics.totalCitizens.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mt-1">Citizens Assessed</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-federal-navy">
                  {analytics.totalInstitutions}
                </div>
                <div className="text-sm text-gray-600 mt-1">Institutions</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">
                  {analytics.topPerformingInstitutions.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Top Institutions</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600">
                  {analytics.skillsGaps.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Skills Gaps</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* National Eight-Faculty Scores */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 font-cairo">
              National Eight-Faculty Scores
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(analytics.nationalFacultyAverages).map(([faculty, score]) => {
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
                      <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                        {score}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${score}%`,
                          backgroundColor: metadata.color,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">{metadata.custodianMinistry}</div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Faculty Trends */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 font-cairo">
              Six-Month Faculty Trends
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {analytics.facultyTrends.map((trend) => {
                const metadata = FACULTY_METADATA[trend.faculty];
                return (
                  <div
                    key={trend.faculty}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: metadata.color }}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{metadata.name}</h3>
                          <p className="text-sm text-gray-600">{metadata.arabicName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{getTrendIcon(trend.trend)}</div>
                        <Badge
                          color={trend.yearOverYearChange > 0 ? 'success' : trend.yearOverYearChange < 0 ? 'danger' : 'default'}
                          variant="flat"
                        >
                          {trend.yearOverYearChange > 0 ? '+' : ''}{trend.yearOverYearChange}% YoY
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {trend.monthlyAverages.map((monthly) => (
                        <div key={monthly.month} className="text-center">
                          <div className="text-xs text-gray-500 mb-1">
                            {monthly.month.split('-')[1]}
                          </div>
                          <div
                            className="text-sm font-bold"
                            style={{ color: metadata.color }}
                          >
                            {monthly.average}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Ministry Breakdown and Skills Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ministry Breakdown */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 font-cairo">
                  Ministry Performance
                </h2>
                <Button variant="light" size="sm" color="primary">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {analytics.ministryBreakdown.map((ministry) => {
                  const ministryAverage = Math.round(
                    Object.values(ministry.facultyAverages).reduce((sum, score) => sum + score, 0) / 8
                  );
                  return (
                    <div
                      key={ministry.ministryId}
                      className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {ministry.ministryName}
                          </div>
                          <div className="text-xs text-gray-600">
                            {ministry.employeeCount.toLocaleString()} employees
                          </div>
                        </div>
                        <div className={`text-2xl font-bold ${getScoreColor(ministryAverage)}`}>
                          {ministryAverage}
                        </div>
                      </div>
                      {ministry.custodianFaculty && (
                        <Badge color="primary" variant="flat" size="sm">
                          Custodian: {FACULTY_METADATA[ministry.custodianFaculty].name}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* Skills Gaps */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 font-cairo">
                National Skills Gaps
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {analytics.skillsGaps.map((gap) => {
                  const metadata = FACULTY_METADATA[gap.faculty];
                  return (
                    <div
                      key={gap.faculty}
                      className="border-2 rounded-lg p-4"
                      style={{ borderColor: metadata.color }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-gray-900">{metadata.name}</div>
                          <div className="text-sm text-gray-600">{metadata.arabicName}</div>
                        </div>
                        <Badge color={getPriorityColor(gap.priority)} variant="flat">
                          {gap.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center mb-3">
                        <div>
                          <div className="text-xs text-gray-600">Demand</div>
                          <div className="text-lg font-bold text-red-600">
                            {gap.demand.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Supply</div>
                          <div className="text-lg font-bold text-green-600">
                            {gap.supply.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Gap</div>
                          <div className="text-lg font-bold text-orange-600">
                            {gap.gap.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="bordered" fullWidth>
                        Create National Initiative
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Top Performing Institutions */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 font-cairo">
              Top Performing Institutions
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {analytics.topPerformingInstitutions.map((institution) => (
                <div
                  key={institution.institutionId}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-federal-gold text-white flex items-center justify-center font-bold text-xl">
                      #{institution.rank}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{institution.institutionName}</div>
                      <div className="text-sm text-gray-600">
                        {institution.employeeCount.toLocaleString()} employees
                      </div>
                      <div className="flex gap-1 mt-1">
                        {institution.topFaculties.map((faculty) => {
                          const metadata = FACULTY_METADATA[faculty];
                          return (
                            <div
                              key={faculty}
                              className="px-2 py-1 rounded text-xs text-white"
                              style={{ backgroundColor: metadata.color }}
                            >
                              {metadata.name.split(' ')[0]}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getScoreColor(institution.overallScore)}`}>
                      {institution.overallScore}
                    </div>
                    <div className="text-xs text-gray-500">Overall Score</div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Data Flow Visualization */}
        <Card className="bg-gradient-to-r from-federal-gold/10 to-federal-navy/10 border-2 border-federal-gold">
          <CardBody>
            <div className="text-center py-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-cairo">
                Eight-Faculty Model Data Flow
              </h3>
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-individual-red text-white flex items-center justify-center text-3xl mb-2">
                    👤
                  </div>
                  <div className="font-semibold text-gray-900">Individual</div>
                  <div className="text-sm text-gray-600">Skills Passport</div>
                  <div className="text-xs text-gray-500 mt-1">45,892 citizens</div>
                </div>
                <div className="text-4xl text-federal-gold">→</div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-institutional-blue text-white flex items-center justify-center text-3xl mb-2">
                    🏢
                  </div>
                  <div className="font-semibold text-gray-900">Institutional</div>
                  <div className="text-sm text-gray-600">HCM Dashboard</div>
                  <div className="text-xs text-gray-500 mt-1">234 institutions</div>
                </div>
                <div className="text-4xl text-federal-gold">→</div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-federal-gold text-white flex items-center justify-center text-3xl mb-2">
                    🇦🇪
                  </div>
                  <div className="font-semibold text-gray-900">Federal</div>
                  <div className="text-sm text-gray-600">National Analytics</div>
                  <div className="text-xs text-gray-500 mt-1">Vision 2071</div>
                </div>
              </div>
              <p className="text-gray-700 max-w-3xl mx-auto">
                The Eight-Faculty Model powers NOOR's holistic workforce intelligence system.
                Individual assessments aggregate to institutional HCM insights, which feed into
                federal-level analytics for strategic national workforce planning aligned with UAE Vision 2071.
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button color="primary" fullWidth>
            Export National Report
          </Button>
          <Button variant="bordered" fullWidth>
            Compare Ministries
          </Button>
          <Button variant="bordered" fullWidth>
            View Historical Data
          </Button>
          <Button variant="bordered" fullWidth>
            Download Dataset
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

