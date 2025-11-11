'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/individual/layout';
import { Card, CardHeader, CardBody } from '@/components/individual/Card';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { Input } from '@/components/individual/Input';
import { Select } from '@/components/individual/Select';

type ApplicationStatus = 'all' | 'pending' | 'under_review' | 'interview' | 'offer' | 'rejected' | 'accepted';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  location: string;
  appliedDate: string;
  status: Exclude<ApplicationStatus, 'all'>;
  lastUpdate: string;
  salary: string;
  matchScore: number;
  nextStep?: string;
  interviewDate?: string;
}

export default function MyApplicationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus>('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock applications data
  const applications: Application[] = [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'Ministry of AI',
      companyLogo: '🤖',
      location: 'Abu Dhabi',
      appliedDate: '2024-11-08',
      status: 'interview',
      lastUpdate: '2024-11-10',
      salary: 'AED 25,000 - 35,000',
      matchScore: 95,
      nextStep: 'Technical interview scheduled',
      interviewDate: '2024-11-15',
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'Ministry of Interior',
      companyLogo: '🛡️',
      location: 'Dubai',
      appliedDate: '2024-11-05',
      status: 'under_review',
      lastUpdate: '2024-11-09',
      salary: 'AED 20,000 - 28,000',
      matchScore: 88,
      nextStep: 'Application under review by hiring team',
    },
    {
      id: '3',
      jobTitle: 'Cloud Architect',
      company: 'Ministry of Education',
      companyLogo: '📚',
      location: 'Abu Dhabi',
      appliedDate: '2024-11-01',
      status: 'pending',
      lastUpdate: '2024-11-01',
      salary: 'AED 30,000 - 40,000',
      matchScore: 82,
      nextStep: 'Awaiting initial review',
    },
    {
      id: '4',
      jobTitle: 'UX Designer',
      company: 'Smart Dubai',
      companyLogo: '🎨',
      location: 'Dubai',
      appliedDate: '2024-10-28',
      status: 'offer',
      lastUpdate: '2024-11-07',
      salary: 'AED 22,000 - 30,000',
      matchScore: 90,
      nextStep: 'Offer extended - respond by Nov 20',
    },
    {
      id: '5',
      jobTitle: 'Data Scientist',
      company: 'Ministry of Health',
      companyLogo: '🏥',
      location: 'Abu Dhabi',
      appliedDate: '2024-10-25',
      status: 'rejected',
      lastUpdate: '2024-10-30',
      salary: 'AED 18,000 - 25,000',
      matchScore: 75,
      nextStep: 'Position filled',
    },
    {
      id: '6',
      jobTitle: 'DevOps Engineer',
      company: 'Ministry of Finance',
      companyLogo: '💰',
      location: 'Dubai',
      appliedDate: '2024-10-20',
      status: 'accepted',
      lastUpdate: '2024-10-28',
      salary: 'AED 24,000 - 32,000',
      matchScore: 92,
      nextStep: 'Onboarding starts Dec 1',
    },
  ];

  const getStatusColor = (status: Exclude<ApplicationStatus, 'all'>) => {
    const colors = {
      pending: 'default',
      under_review: 'primary',
      interview: 'warning',
      offer: 'success',
      rejected: 'danger',
      accepted: 'success',
    };
    return colors[status] as any;
  };

  const getStatusLabel = (status: Exclude<ApplicationStatus, 'all'>) => {
    const labels = {
      pending: 'Pending',
      under_review: 'Under Review',
      interview: 'Interview',
      offer: 'Offer Extended',
      rejected: 'Not Selected',
      accepted: 'Accepted',
    };
    return labels[status];
  };

  const getStatusIcon = (status: Exclude<ApplicationStatus, 'all'>) => {
    const icons = {
      pending: '⏳',
      under_review: '👀',
      interview: '🎯',
      offer: '🎉',
      rejected: '❌',
      accepted: '✅',
    };
    return icons[status];
  };

  const filteredApplications = applications
    .filter(app => {
      const matchesSearch =
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      } else if (sortBy === 'match') {
        return b.matchScore - a.matchScore;
      }
      return 0;
    });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    interview: applications.filter(a => a.status === 'interview').length,
    offer: applications.filter(a => a.status === 'offer').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair mb-2">
            My Applications
          </h1>
          <p className="text-gray-600">Track and manage all your job applications</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardBody>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-blue-700 mt-1">Total Applications</div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardBody>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-yellow-700 mt-1">Pending Review</div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardBody>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{stats.interview}</div>
                <div className="text-sm text-orange-700 mt-1">Interviews Scheduled</div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardBody>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.offer}</div>
                <div className="text-sm text-green-700 mt-1">Offers Received</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="Search by job title or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-individual-red"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Not Selected</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-individual-red"
                >
                  <option value="recent">Most Recent</option>
                  <option value="match">Best Match</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <Card>
            <CardBody>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Start applying to opportunities that match your skills'}
                </p>
                <Button
                  color="primary"
                  onClick={() => router.push('/individual/jobs')}
                >
                  Browse Jobs
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex items-start gap-6">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-individual-beige to-individual-red rounded-lg flex items-center justify-center text-3xl">
                        {app.companyLogo}
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 font-inter mb-1">
                            {app.jobTitle}
                          </h3>
                          <p className="text-gray-700 font-medium">{app.company}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>📍 {app.location}</span>
                            <span>💰 {app.salary}</span>
                            <Badge variant="flat" color="success" size="sm">
                              {app.matchScore}% Match
                            </Badge>
                          </div>
                        </div>

                        <div className="text-right">
                          <Badge color={getStatusColor(app.status)} variant="flat" size="lg">
                            {getStatusIcon(app.status)} {getStatusLabel(app.status)}
                          </Badge>
                        </div>
                      </div>

                      {/* Timeline Info */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 mb-1">Applied</p>
                            <p className="font-medium text-gray-900">
                              {new Date(app.appliedDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Last Update</p>
                            <p className="font-medium text-gray-900">
                              {new Date(app.lastUpdate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          {app.interviewDate && (
                            <div>
                              <p className="text-gray-500 mb-1">Interview Date</p>
                              <p className="font-medium text-orange-600">
                                {new Date(app.interviewDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Next Step */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-600">Next Step:</span>
                          <span className="font-medium text-gray-900">{app.nextStep}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="bordered"
                            size="sm"
                            onClick={() => router.push(`/individual/jobs/${app.id}`)}
                          >
                            View Job
                          </Button>
                          {app.status === 'interview' && (
                            <Button color="primary" size="sm">
                              Prepare Interview
                            </Button>
                          )}
                          {app.status === 'offer' && (
                            <Button color="success" size="sm">
                              Review Offer
                            </Button>
                          )}
                          {app.status === 'rejected' && (
                            <Button variant="bordered" size="sm">
                              View Feedback
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Tips Card */}
        <Card className="bg-gradient-to-r from-individual-red to-red-700 text-white">
          <CardBody>
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <h3 className="text-xl font-semibold font-playfair mb-2">Application Tips</h3>
                <ul className="space-y-2 text-red-100">
                  <li>• Follow up on pending applications after 1 week</li>
                  <li>• Prepare for interviews using our Learning Center resources</li>
                  <li>• Keep your Skills Passport updated to improve your chances</li>
                  <li>• Use tokens for priority application review</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
