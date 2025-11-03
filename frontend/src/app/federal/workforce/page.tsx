'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/federal/layout';

export default function WorkforceDashboard() {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedDemographic, setSelectedDemographic] = useState('all');

  const user = {
    name: 'Ahmed Al Mansoori',
    email: 'ahmed.almansoori@uae.gov.ae',
    role: 'Federal Administrator',
  };

  // F1A: Real-time Statistics
  const workforceStats = [
    {
      label: 'Total Workforce',
      value: '4.8M',
      change: '+125K',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Unemployment Rate',
      value: '2.8%',
      change: '-0.3%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: 'Labor Participation',
      value: '78.4%',
      change: '+2.1%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      label: 'Job Openings',
      value: '48,234',
      change: '+8,145',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  // F1B: Demographic Breakdowns
  const demographics = {
    gender: [
      { label: 'Male', value: 72, count: '3.46M', color: 'bg-blue-600' },
      { label: 'Female', value: 28, count: '1.34M', color: 'bg-pink-600' },
    ],
    nationality: [
      { label: 'UAE Nationals', value: 18, count: '864K', color: 'bg-amber-600' },
      { label: 'Expats', value: 82, count: '3.94M', color: 'bg-gray-600' },
    ],
    education: [
      { label: 'Bachelor+', value: 45, count: '2.16M', color: 'bg-green-600' },
      { label: 'Diploma', value: 28, count: '1.34M', color: 'bg-yellow-600' },
      { label: 'Secondary', value: 20, count: '960K', color: 'bg-orange-600' },
      { label: 'Other', value: 7, count: '336K', color: 'bg-gray-500' },
    ],
  };

  // F1C: Time Period Data
  const monthlyTrends = [
    { month: 'Jan', employed: 4650, unemployed: 145 },
    { month: 'Feb', employed: 4675, unemployed: 142 },
    { month: 'Mar', employed: 4698, unemployed: 138 },
    { month: 'Apr', employed: 4720, unemployed: 135 },
    { month: 'May', employed: 4745, unemployed: 132 },
    { month: 'Jun', employed: 4800, unemployed: 128 },
  ];

  // Age Pyramid Data
  const agePyramid = [
    { age: '60+', male: 8, female: 6 },
    { age: '50-59', male: 15, female: 12 },
    { age: '40-49', male: 22, female: 18 },
    { age: '30-39', male: 28, female: 24 },
    { age: '20-29', male: 25, female: 20 },
    { age: '18-19', male: 2, female: 1.5 },
  ];

  return (
    <DashboardLayout user={user} notificationCount={5}>
      <div className="space-y-6 bg-gradient-to-br from-amber-50 to-white min-h-screen p-6">
        {/* F1: National Workforce Dashboard Header */}
        <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-amber-100 font-semibold text-sm uppercase tracking-wider">Live Data</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight mb-2">
                National Workforce Dashboard
              </h1>
              <p className="text-amber-100 text-lg">
                Real-time insights into UAE's human capital landscape
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white border-2 border-white/30 hover:bg-white/30 transition-colors"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
              <button className="px-6 py-2 bg-white text-amber-600 rounded-lg font-bold hover:bg-amber-50 transition-colors shadow-lg">
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* F1A: Real-time Statistics */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-time Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workforceStats.map((stat, index) => (
              <div key={index} className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-amber-500">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-colors">
                      <div className="text-amber-600">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-bold uppercase tracking-wide">{stat.label}</p>
                  <p className="text-4xl font-black text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">vs last period</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* F1B: Demographic Breakdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gender Distribution */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚖️</span>
              Gender Distribution
            </h3>
            <div className="space-y-4">
              {demographics.gender.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.count} ({item.value}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className={`${item.color} h-3 rounded-full transition-all duration-500`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nationality Split */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🇦🇪</span>
              Nationality Split
            </h3>
            <div className="space-y-4">
              {demographics.nationality.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.count} ({item.value}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className={`${item.color} h-3 rounded-full transition-all duration-500`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Levels */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              Education Levels
            </h3>
            <div className="space-y-4">
              {demographics.education.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.count} ({item.value}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className={`${item.color} h-3 rounded-full transition-all duration-500`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* F1C: Monthly Trends & Age Pyramid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Employment Trends */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Employment Trends</h3>
            <div className="space-y-4">
              {monthlyTrends.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-600 w-12">{data.month}</span>
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">Employed: {data.employed}K</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(data.employed / 5000) * 100}%` }} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">Unemployed: {data.unemployed}K</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: `${(data.unemployed / 200) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age Pyramid */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Age Distribution Pyramid</h3>
            <div className="space-y-3">
              {agePyramid.map((data, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 flex justify-end">
                    <div className="text-right">
                      <div className="w-full bg-blue-200 rounded-l-full h-6 flex items-center justify-end pr-2" style={{ width: `${data.male * 10}px` }}>
                        <span className="text-xs font-bold text-blue-900">{data.male}%</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-16 text-center">{data.age}</span>
                  <div className="flex-1">
                    <div className="w-full bg-pink-200 rounded-r-full h-6 flex items-center pl-2" style={{ width: `${data.female * 10}px` }}>
                      <span className="text-xs font-bold text-pink-900">{data.female}%</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded" />
                  <span className="text-sm font-medium text-gray-700">Male</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-600 rounded" />
                  <span className="text-sm font-medium text-gray-700">Female</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* F1D: Comparison Tools */}
        <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-8 border-2 border-amber-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">YoY Comparison & Forecasting</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-gray-600 uppercase">2023</span>
                <span className="text-xl font-black text-gray-400">4.68M</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div className="bg-gray-500 h-2 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-amber-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-amber-600 uppercase">2024 (Current)</span>
                <span className="text-xl font-black text-amber-600">4.80M</span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2">
                <div className="bg-amber-600 h-2 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-green-600 uppercase">2025 (Projected)</span>
                <span className="text-xl font-black text-green-600">4.95M</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '103%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
