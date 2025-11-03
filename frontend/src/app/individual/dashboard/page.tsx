'use client';

import React from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Card, CardHeader, CardBody } from '@/components/individual/Card';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';

export default function IndividualDashboard() {
  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const stats = [
    { label: 'Skills Verified', value: '24', icon: '✓', color: 'text-green-600' },
    { label: 'Applications', value: '8', icon: '📝', color: 'text-individual-red' },
    { label: 'Interviews', value: '3', icon: '🎯', color: 'text-blue-600' },
    { label: 'Achievements', value: '12', icon: '⭐', color: 'text-yellow-600' },
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Ministry of AI',
      location: 'Abu Dhabi',
      salary: 'AED 25,000 - 35,000',
      match: 95,
      posted: '2 days ago',
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'Ministry of Health',
      location: 'Dubai',
      salary: 'AED 18,000 - 25,000',
      match: 88,
      posted: '5 days ago',
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Digital Government',
      location: 'Abu Dhabi',
      salary: 'AED 20,000 - 28,000',
      match: 82,
      posted: '1 week ago',
    },
  ];

  const myApplications = [
    {
      id: 1,
      position: 'Software Engineer',
      company: 'Ministry of AI',
      status: 'interview',
      date: '2024-11-01',
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'Ministry of Interior',
      status: 'under_review',
      date: '2024-10-28',
    },
    {
      id: 3,
      position: 'Cloud Architect',
      company: 'Ministry of Education',
      status: 'pending',
      date: '2024-10-25',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview': return 'success';
      case 'under_review': return 'primary';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <DashboardLayout user={user} notificationCount={3}>
      <div className="space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Welcome Header - Bold Red & Black */}
        <div className="relative bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-10 text-white overflow-hidden shadow-2xl">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />
          </div>

          {/* Red Glow Effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Active Profile</span>
            </div>
            <h1 className="text-5xl font-black font-playfair mb-3 tracking-tight">
              Welcome back, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-300 text-lg font-inter">
              Your journey to the perfect opportunity continues
            </p>
          </div>
        </div>

        {/* Statistics Cards - Red & Black Theme */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-red-600">
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-5xl">{stat.icon}</div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-inter font-medium uppercase tracking-wide">{stat.label}</p>
                <p className="text-4xl font-black text-gray-900 mt-2 font-mono">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommended Jobs - Red & Black Theme */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-playfair">
                  Recommended for You
                </h2>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors backdrop-blur-sm">
                  View All →
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="group p-5 border-2 border-gray-200 rounded-xl hover:border-red-600 hover:shadow-lg transition-all duration-300 bg-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900 font-inter group-hover:text-red-600 transition-colors">
                            {job.title}
                          </h3>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            {job.match}% Match
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 font-semibold font-inter mb-3">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5 font-semibold text-gray-700">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                            {job.salary}
                          </span>
                          <span className="text-xs">{job.posted}</span>
                        </div>
                      </div>
                      <button className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-red-600/50 transition-all hover:scale-105">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions - Red & Black Theme */}
          <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white font-playfair">
                Quick Actions
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-900 border-2 border-gray-800 hover:border-red-600 hover:bg-red-950 transition-all text-left group">
                  <div className="text-2xl">📋</div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">Update Skills Passport</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-900 border-2 border-gray-800 hover:border-red-600 hover:bg-red-950 transition-all text-left group">
                  <div className="text-2xl">🔍</div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">Search Jobs</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-900 border-2 border-gray-800 hover:border-red-600 hover:bg-red-950 transition-all text-left group">
                  <div className="text-2xl">📚</div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">Browse Courses</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-900 border-2 border-gray-800 hover:border-red-600 hover:bg-red-950 transition-all text-left group">
                  <div className="text-2xl">👤</div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">Edit Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-900 border-2 border-gray-800 hover:border-red-600 hover:bg-red-950 transition-all text-left group">
                  <div className="text-2xl">⭐</div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">View Achievements</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* My Applications - Red Theme */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-6 bg-gradient-to-r from-gray-900 to-black text-white border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-playfair">
                My Applications
              </h2>
              <button className="text-red-400 hover:text-red-300 text-sm font-semibold">
                View All →
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {myApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 border-2 border-gray-200 rounded-xl hover:border-red-600 hover:shadow-lg transition-all bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      app.status === 'interview' ? 'bg-green-100 text-green-700' :
                      app.status === 'under_review' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {getStatusLabel(app.status)}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 font-inter mb-2 text-lg">
                    {app.position}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium mb-3">{app.company}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {new Date(app.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Progress & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning Progress - Red Theme */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
              <h2 className="text-2xl font-bold font-playfair">
                Learning Progress
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-gray-900">Advanced Python</span>
                    <span className="text-red-600 font-bold">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600 to-red-500 h-3 rounded-full shadow-lg" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-gray-900">Cloud Architecture</span>
                    <span className="text-red-600 font-bold">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600 to-red-500 h-3 rounded-full shadow-lg" style={{ width: '60%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-gray-900">Machine Learning</span>
                    <span className="text-red-600 font-bold">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600 to-red-500 h-3 rounded-full shadow-lg" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Achievements - Red & Black Theme */}
          <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white font-playfair">
                Recent Achievements
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-yellow-500 transition-all">
                  <div className="text-4xl">🏆</div>
                  <div>
                    <p className="font-bold text-sm text-white">Skills Master</p>
                    <p className="text-xs text-gray-400">Verified 20+ skills</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-500 transition-all">
                  <div className="text-4xl">📚</div>
                  <div>
                    <p className="font-bold text-sm text-white">Lifelong Learner</p>
                    <p className="text-xs text-gray-400">Completed 5 courses</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-green-500 transition-all">
                  <div className="text-4xl">⭐</div>
                  <div>
                    <p className="font-bold text-sm text-white">Rising Star</p>
                    <p className="text-xs text-gray-400">Top 10% profile views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

