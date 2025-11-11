'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30days');

  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const analyticsData = {
    profileViews: { current: 1247, change: 15.3, trend: 'up' },
    applicationRate: { current: 68, change: 8.2, trend: 'up' },
    skillsProgress: { current: 24, change: 4, trend: 'up' },
    learningHours: { current: 45, change: -2.1, trend: 'down' },
  };

  const chartData = {
    profileViews: [
      { date: 'Week 1', views: 280 },
      { date: 'Week 2', views: 320 },
      { date: 'Week 3', views: 290 },
      { date: 'Week 4', views: 357 },
    ],
    applicationSuccess: [
      { month: 'Jan', success: 45, total: 100 },
      { month: 'Feb', success: 52, total: 95 },
      { month: 'Mar', success: 68, total: 110 },
    ],
    skillsGrowth: [
      { category: 'Technical', count: 12 },
      { category: 'Leadership', count: 5 },
      { category: 'Communication', count: 4 },
      { category: 'Language', count: 3 },
    ],
  };

  const careerTimeline = [
    {
      date: '2024-11-01',
      type: 'application',
      title: 'Applied to Senior Software Engineer',
      company: 'Ministry of AI',
      status: 'Interview Scheduled',
    },
    {
      date: '2024-10-28',
      type: 'achievement',
      title: 'Completed Cloud Architecture Course',
      company: 'NOOR Learning Center',
      status: 'Certified',
    },
    {
      date: '2024-10-15',
      type: 'skill',
      title: 'Verified Advanced Python Skill',
      company: 'NOOR Skills Passport',
      status: 'Verified',
    },
    {
      date: '2024-09-30',
      type: 'application',
      title: 'Applied to Data Analyst',
      company: 'Ministry of Health',
      status: 'Accepted',
    },
  ];

  const recommendations = [
    {
      icon: '🎯',
      title: 'Improve Profile Visibility',
      description: 'Add 3 more skills to increase your profile ranking by 15%',
      action: 'Add Skills',
    },
    {
      icon: '📈',
      title: 'Boost Application Rate',
      description: 'Complete your Skills Passport to improve success rate',
      action: 'Complete Profile',
    },
    {
      icon: '📚',
      title: 'Continue Learning',
      description: 'You are 2 hours away from this month\'s learning goal',
      action: 'Browse Courses',
    },
    {
      icon: '💼',
      title: 'Network More',
      description: 'Connect with 5 mentors in your field to expand opportunities',
      action: 'Find Mentors',
    },
  ];

  const exportReport = () => {
    alert('Exporting analytics report as PDF...');
  };

  return (
    <DashboardLayout user={user} notificationCount={3}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-8 text-white overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Career Analytics</span>
              </div>
              <h1 className="text-4xl font-black font-playfair mb-2">Performance Dashboard</h1>
              <p className="text-gray-300">Track your career progress and get personalized insights</p>
            </div>
            <Button onClick={exportReport} className="bg-red-600 hover:bg-red-700">
              Export Report
            </Button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg">
          <span className="text-sm font-semibold text-gray-700">Time Range:</span>
          {['7days', '30days', '90days', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                timeRange === range
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range === '7days' ? '7 Days' : range === '30days' ? '30 Days' : range === '90days' ? '90 Days' : 'Year'}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Profile Views', ...analyticsData.profileViews, icon: '👁️' },
            { label: 'Application Success', ...analyticsData.applicationRate, icon: '✅', suffix: '%' },
            { label: 'Skills Verified', ...analyticsData.skillsProgress, icon: '⭐' },
            { label: 'Learning Hours', ...analyticsData.learningHours, icon: '📚' },
          ].map((metric, index) => (
            <div key={index} className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-red-600">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-4xl">{metric.icon}</div>
                  <div className={`flex items-center gap-1 text-sm font-bold ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? '↑' : '↓'} {Math.abs(metric.change)}%
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">{metric.label}</p>
                <p className="text-4xl font-black text-gray-900 mt-2 font-mono">
                  {metric.current}{metric.suffix || ''}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Views Chart */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
              <h2 className="text-xl font-bold font-playfair">Profile Views Trend</h2>
              <p className="text-sm text-red-100 mt-1">Weekly breakdown</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {chartData.profileViews.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-gray-900">{item.date}</span>
                      <span className="text-red-600 font-bold">{item.views} views</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-600 to-red-500 h-3 rounded-full shadow-lg transition-all duration-500"
                        style={{ width: `${(item.views / 400) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Success Rate */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 bg-gradient-to-r from-gray-900 to-black text-white">
              <h2 className="text-xl font-bold font-playfair">Application Success Rate</h2>
              <p className="text-sm text-gray-300 mt-1">Monthly performance</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {chartData.applicationSuccess.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-gray-900">{item.month}</span>
                      <span className="text-red-600 font-bold">{item.success}/{item.total} ({Math.round((item.success/item.total)*100)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-600 to-green-500 h-3 rounded-full shadow-lg transition-all duration-500"
                        style={{ width: `${(item.success/item.total)*100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Growth & Career Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skills Growth */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
              <h2 className="text-xl font-bold font-playfair">Skills Distribution</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {chartData.skillsGrowth.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold text-gray-900">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full"
                          style={{ width: `${(item.count / 12) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-red-600 w-8 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Career Timeline */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 bg-gradient-to-r from-gray-900 to-black text-white">
              <h2 className="text-xl font-bold font-playfair">Career Timeline</h2>
              <p className="text-sm text-gray-300 mt-1">Your recent activities</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {careerTimeline.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 border-l-4 border-red-600 bg-gray-50 rounded-lg hover:shadow-lg transition-all">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                        item.type === 'application' ? 'bg-blue-100' :
                        item.type === 'achievement' ? 'bg-green-100' :
                        'bg-yellow-100'
                      }`}>
                        {item.type === 'application' ? '📝' : item.type === 'achievement' ? '🏆' : '⭐'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      <h3 className="font-bold text-gray-900 mt-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.company}</p>
                      <Badge variant={item.status === 'Certified' || item.status === 'Verified' ? 'success' : 'primary'} className="mt-2">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
            <h2 className="text-xl font-bold font-playfair">Personalized Recommendations</h2>
            <p className="text-sm text-red-100 mt-1">Based on your analytics</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-5 border-2 border-gray-200 rounded-xl hover:border-red-600 hover:shadow-lg transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{rec.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{rec.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                      <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                        {rec.action} →
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
