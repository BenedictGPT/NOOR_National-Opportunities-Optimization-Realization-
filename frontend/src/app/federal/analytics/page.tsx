'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/federal/layout';
import { Card, CardHeader, CardBody } from '@/components/federal/Card';
import { Button } from '@/components/federal/Button';
import { Select, SelectOption } from '@/components/federal/Select';

const timeRangeOptions: SelectOption[] = [
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'quarter', label: 'Last 3 Months' },
  { value: 'year', label: 'Last Year' },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');

  const user = {
    name: 'Ahmed Al Mansoori',
    email: 'ahmed.almansoori@uae.gov.ae',
    role: 'Federal Administrator',
  };

  // Mock data
  const keyMetrics = [
    { label: 'Total Opportunities', value: '1,247', change: '+12%', trend: 'up' },
    { label: 'Active Applications', value: '3,842', change: '+8%', trend: 'up' },
    { label: 'Placement Rate', value: '68%', change: '+5%', trend: 'up' },
    { label: 'Avg. Time to Hire', value: '21 days', change: '-3 days', trend: 'up' },
  ];

  const topInstitutions = [
    { name: 'Ministry of AI', opportunities: 145, applications: 892, placements: 78 },
    { name: 'Ministry of Health', opportunities: 128, applications: 756, placements: 65 },
    { name: 'Ministry of Interior', opportunities: 98, applications: 645, placements: 52 },
    { name: 'Ministry of Education', opportunities: 87, applications: 534, placements: 48 },
    { name: 'Ministry of Culture', opportunities: 76, applications: 423, placements: 38 },
  ];

  const topSkills = [
    { skill: 'Artificial Intelligence', demand: 245, supply: 189, gap: 56 },
    { skill: 'Data Analysis', demand: 198, supply: 167, gap: 31 },
    { skill: 'Cybersecurity', demand: 176, supply: 134, gap: 42 },
    { skill: 'Project Management', demand: 156, supply: 145, gap: 11 },
    { skill: 'Cloud Computing', demand: 142, supply: 98, gap: 44 },
  ];

  return (
    <DashboardLayout user={user} notificationCount={5}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-cairo">
              Analytics & Reports
            </h1>
            <p className="text-gray-600 mt-1 font-noto">
              Comprehensive insights into workforce optimization and opportunity matching
            </p>
          </div>
          <div className="flex gap-3">
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              size="md"
              className="w-48"
            />
            <Button color="primary">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <Card key={index}>
              <CardBody>
                <p className="text-sm text-gray-600 font-noto">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2 font-space">
                  {metric.value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <svg
                    className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {metric.trend === 'up' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    )}
                  </svg>
                  <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500">vs last period</span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Trends */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 font-cairo">
                Application Trends
              </h2>
            </CardHeader>
            <CardBody>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-gray-500 mt-2">Chart visualization would be rendered here</p>
                  <p className="text-sm text-gray-400">Using Chart.js or D3.js</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Placement Success Rate */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 font-cairo">
                Placement Success Rate
              </h2>
            </CardHeader>
            <CardBody>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <p className="text-gray-500 mt-2">Pie chart visualization</p>
                  <p className="text-sm text-gray-400">Success rate by institution</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Top Institutions */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 font-cairo">
              Top Performing Institutions
            </h2>
          </CardHeader>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Institution
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Opportunities
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Placements
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Success Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topInstitutions.map((institution, index) => {
                    const successRate = ((institution.placements / institution.applications) * 100).toFixed(1);
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 bg-federal-gold/10 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-federal-gold font-semibold text-sm">
                                {index + 1}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {institution.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                          {institution.opportunities}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                          {institution.applications}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-green-600">
                          {institution.placements}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-sm font-semibold text-gray-900">
                            {successRate}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        {/* Skills Gap Analysis */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 font-cairo">
              Skills Gap Analysis
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {topSkills.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.skill}</span>
                    <span className="text-sm text-gray-500">
                      Gap: <span className="font-semibold text-red-600">{item.gap}</span>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Demand</span>
                        <span>{item.demand}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-federal-gold h-2 rounded-full"
                          style={{ width: `${(item.demand / 250) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Supply</span>
                        <span>{item.supply}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(item.supply / 250) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}

