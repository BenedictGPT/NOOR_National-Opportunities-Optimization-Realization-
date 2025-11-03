'use client';

import React from 'react';
import { DashboardLayout } from '@/components/institutional/layout';
import { Card, CardHeader, CardBody } from '@/components/institutional/Card';
import { Button } from '@/components/institutional/Button';
import { Badge } from '@/components/institutional/Badge';
import { Alert } from '@/components/institutional/Alert';

export default function InstitutionalDashboard() {
  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.ae',
    role: 'Institutional Administrator',
  };

  // Mock statistics
  const stats = [
    {
      label: 'Total Job Postings',
      value: '1,247',
      change: '+12%',
      trend: 'up' as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-700',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Active Candidates',
      value: '3,842',
      change: '+8%',
      trend: 'up' as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: 'from-cyan-500 to-cyan-700',
      textColor: 'text-cyan-700',
      bgColor: 'bg-cyan-50',
    },
    {
      label: 'Registered Citizens',
      value: '45,892',
      change: '+15%',
      trend: 'up' as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-indigo-700',
      textColor: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
    },
    {
      label: 'Partner Institutions',
      value: '234',
      change: '+5%',
      trend: 'up' as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      gradient: 'from-slate-500 to-slate-700',
      textColor: 'text-slate-700',
      bgColor: 'bg-slate-50',
    },
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'application',
      title: 'New application submitted',
      description: 'Software Engineer position at Ministry of AI',
      time: '5 minutes ago',
      status: 'pending',
    },
    {
      id: 2,
      type: 'opportunity',
      title: 'New opportunity posted',
      description: 'Data Analyst role at Ministry of Health',
      time: '1 hour ago',
      status: 'active',
    },
    {
      id: 3,
      type: 'citizen',
      title: 'New citizen registered',
      description: 'Fatima Al Hashimi completed profile',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      id: 4,
      type: 'institution',
      title: 'Institution verified',
      description: 'Ministry of Education partnership approved',
      time: '3 hours ago',
      status: 'completed',
    },
  ];

  return (
    <DashboardLayout user={user} notificationCount={5}>
      <div className="space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        {/* Page Header - Blue & Silver Theme */}
        <div className="relative bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 rounded-2xl p-10 text-white overflow-hidden shadow-2xl">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(59,130,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.2) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Blue Glow Effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Institutional Portal</span>
                </div>
                <h1 className="text-5xl font-black font-cairo tracking-tight mb-2">
                  HCM Dashboard
                </h1>
                <p className="text-gray-300 text-lg font-noto">
                  Welcome back, {user.name}
                </p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all hover:scale-105 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Post New Job
              </button>
            </div>
          </div>
        </div>

        {/* Alert Banner - Blue Theme */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-xl shadow-md">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-bold text-blue-900">System Maintenance Scheduled</h3>
              <p className="text-sm text-blue-800 mt-1">The platform will undergo scheduled maintenance on Friday, November 10th from 2:00 AM to 4:00 AM GST.</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards - Blue & Silver Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 border-blue-600">
              {/* Silver Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-50" />

              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                    <div className={stat.textColor}>
                      {stat.icon}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-bold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-4xl font-black text-gray-900 mt-2 font-mono">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${stat.bgColor} ${stat.textColor}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">vs last month</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities - Blue & Silver Theme */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-cairo">
                  Recent Activities
                </h2>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors backdrop-blur-sm">
                  View All →
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {activity.type === 'application' && (
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {activity.type === 'opportunity' && (
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {activity.type === 'citizen' && (
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                      {activity.type === 'institution' && (
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                        activity.status === 'active' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions - Blue & Silver Theme */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white font-cairo">
                Quick Actions
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-900 border-2 border-slate-700 hover:border-blue-600 hover:bg-blue-950 transition-all text-left group">
                  <div className="p-2 bg-blue-900 rounded-lg group-hover:bg-blue-800 transition-colors">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">Post New Job</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-900 border-2 border-slate-700 hover:border-blue-600 hover:bg-blue-950 transition-all text-left group">
                  <div className="p-2 bg-blue-900 rounded-lg group-hover:bg-blue-800 transition-colors">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">Review Candidates</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-900 border-2 border-slate-700 hover:border-blue-600 hover:bg-blue-950 transition-all text-left group">
                  <div className="p-2 bg-blue-900 rounded-lg group-hover:bg-blue-800 transition-colors">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">View Analytics</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-900 border-2 border-slate-700 hover:border-blue-600 hover:bg-blue-950 transition-all text-left group">
                  <div className="p-2 bg-blue-900 rounded-lg group-hover:bg-blue-800 transition-colors">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">Talent Pipeline</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-900 border-2 border-slate-700 hover:border-blue-600 hover:bg-blue-950 transition-all text-left group">
                  <div className="p-2 bg-blue-900 rounded-lg group-hover:bg-blue-800 transition-colors">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">Workforce Planning</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-900 border-2 border-slate-700 hover:border-blue-600 hover:bg-blue-950 transition-all text-left group">
                  <div className="p-2 bg-blue-900 rounded-lg group-hover:bg-blue-800 transition-colors">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

