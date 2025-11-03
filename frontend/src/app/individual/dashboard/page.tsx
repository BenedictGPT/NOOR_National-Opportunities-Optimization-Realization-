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
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-individual-red to-red-700 rounded-xl p-8 text-white">
          <h1 className="text-4xl font-bold font-playfair mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-red-100 text-lg font-inter">
            Your journey to the perfect opportunity continues
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-inter">{stat.label}</p>
                    <p className={`text-3xl font-bold mt-2 font-crimson ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-4xl">{stat.icon}</div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommended Jobs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                  Recommended for You
                </h2>
                <Button variant="light" size="sm" color="primary">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-individual-red hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 font-inter">
                            {job.title}
                          </h3>
                          <Badge color="success" variant="flat" size="sm">
                            {job.match}% Match
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 font-inter">{job.company}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            📍 {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            💰 {job.salary}
                          </span>
                          <span className="text-xs">{job.posted}</span>
                        </div>
                      </div>
                      <Button size="sm" color="primary">
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Quick Actions
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <Button variant="bordered" fullWidth className="justify-start" color="primary">
                  <span className="text-xl mr-2">📋</span>
                  Update Skills Passport
                </Button>
                <Button variant="bordered" fullWidth className="justify-start">
                  <span className="text-xl mr-2">🔍</span>
                  Search Jobs
                </Button>
                <Button variant="bordered" fullWidth className="justify-start">
                  <span className="text-xl mr-2">📚</span>
                  Browse Courses
                </Button>
                <Button variant="bordered" fullWidth className="justify-start">
                  <span className="text-xl mr-2">👤</span>
                  Edit Profile
                </Button>
                <Button variant="bordered" fullWidth className="justify-start">
                  <span className="text-xl mr-2">⭐</span>
                  View Achievements
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* My Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                My Applications
              </h2>
              <Button variant="light" size="sm" color="primary">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {myApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge color={getStatusColor(app.status)} variant="flat" size="sm">
                      {getStatusLabel(app.status)}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 font-inter mb-1">
                    {app.position}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{app.company}</p>
                  <p className="text-xs text-gray-400">
                    Applied: {new Date(app.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Learning Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Learning Progress
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Advanced Python</span>
                    <span className="text-gray-500">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-individual-red h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Cloud Architecture</span>
                    <span className="text-gray-500">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-individual-beige h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Machine Learning</span>
                    <span className="text-gray-500">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Recent Achievements
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="text-3xl">🏆</div>
                  <div>
                    <p className="font-medium text-sm">Skills Master</p>
                    <p className="text-xs text-gray-600">Verified 20+ skills</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-3xl">📚</div>
                  <div>
                    <p className="font-medium text-sm">Lifelong Learner</p>
                    <p className="text-xs text-gray-600">Completed 5 courses</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <p className="font-medium text-sm">Rising Star</p>
                    <p className="text-xs text-gray-600">Top 10% profile views</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

