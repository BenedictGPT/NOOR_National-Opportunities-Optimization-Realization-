'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/federal/layout';
import { Card, CardBody } from '@/components/federal/Card';
import { Button } from '@/components/federal/Button';
import { Badge } from '@/components/federal/Badge';
import { Input } from '@/components/federal/Input';
import { Select, SelectOption } from '@/components/federal/Select';

// Mock applications data
const mockApplications = [
  {
    id: 1,
    applicantName: 'Fatima Al Hashimi',
    applicantEmail: 'fatima.alhashimi@email.ae',
    position: 'Senior Software Engineer',
    institution: 'Ministry of Artificial Intelligence',
    appliedDate: '2024-11-01',
    status: 'under_review',
    matchScore: 95,
    experience: '8 years',
    education: 'Master in Computer Science',
  },
  {
    id: 2,
    applicantName: 'Mohammed Al Zaabi',
    applicantEmail: 'mohammed.alzaabi@email.ae',
    position: 'Data Analyst',
    institution: 'Ministry of Health and Prevention',
    appliedDate: '2024-10-30',
    status: 'shortlisted',
    matchScore: 88,
    experience: '5 years',
    education: 'Bachelor in Statistics',
  },
  {
    id: 3,
    applicantName: 'Sara Al Mansoori',
    applicantEmail: 'sara.almansoori@email.ae',
    position: 'Cybersecurity Specialist',
    institution: 'Ministry of Interior',
    appliedDate: '2024-10-28',
    status: 'interview_scheduled',
    matchScore: 92,
    experience: '6 years',
    education: 'Master in Cybersecurity',
  },
  {
    id: 4,
    applicantName: 'Ali Al Ketbi',
    applicantEmail: 'ali.alketbi@email.ae',
    position: 'Education Program Manager',
    institution: 'Ministry of Education',
    appliedDate: '2024-10-25',
    status: 'pending',
    matchScore: 78,
    experience: '4 years',
    education: 'Bachelor in Education',
  },
  {
    id: 5,
    applicantName: 'Noura Al Shamsi',
    applicantEmail: 'noura.alshamsi@email.ae',
    position: 'Sports Development Officer',
    institution: 'General Authority for Sports',
    appliedDate: '2024-10-22',
    status: 'rejected',
    matchScore: 65,
    experience: '3 years',
    education: 'Bachelor in Sports Management',
  },
];

const statusOptions: SelectOption[] = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'interview_scheduled', label: 'Interview Scheduled' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'accepted', label: 'Accepted' },
];

const sortOptions: SelectOption[] = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'match_score', label: 'Highest Match Score' },
  { value: 'name', label: 'Name (A-Z)' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'default';
    case 'under_review':
      return 'primary';
    case 'shortlisted':
      return 'success';
    case 'interview_scheduled':
      return 'secondary';
    case 'rejected':
      return 'danger';
    case 'accepted':
      return 'success';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: string) => {
  return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const user = {
    name: 'Ahmed Al Mansoori',
    email: 'ahmed.almansoori@uae.gov.ae',
    role: 'Federal Administrator',
  };

  return (
    <DashboardLayout user={user} notificationCount={5}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-cairo">
              Applications
            </h1>
            <p className="text-gray-600 mt-1 font-noto">
              Review and manage all citizen applications across federal opportunities
            </p>
          </div>
          <Button color="primary" size="lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Applications
          </Button>
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3,842</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-600 mt-1">892</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-federal-gold mt-1">1,245</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Shortlisted</p>
              <p className="text-2xl font-bold text-green-600 mt-1">456</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Interviews</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">189</p>
            </CardBody>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by applicant name, email, or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
              </div>
              <Select
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Filter by status"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-600">
                Showing {mockApplications.length} applications
              </p>
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                size="sm"
                className="w-48"
              />
            </div>
          </CardBody>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institution
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Match Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 bg-federal-gold/10 rounded-full flex items-center justify-center">
                            <span className="text-federal-gold font-semibold">
                              {application.applicantName.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.applicantName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.applicantEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{application.position}</div>
                        <div className="text-xs text-gray-500">{application.experience} experience</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{application.institution}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900">
                              {application.matchScore}%
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div
                                className={`h-1.5 rounded-full ${
                                  application.matchScore >= 90 ? 'bg-green-500' :
                                  application.matchScore >= 75 ? 'bg-federal-gold' :
                                  'bg-yellow-500'
                                }`}
                                style={{ width: `${application.matchScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.appliedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          color={getStatusColor(application.status)}
                          variant="flat"
                          size="sm"
                        >
                          {getStatusLabel(application.status)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="light">
                            View
                          </Button>
                          <Button size="sm" variant="bordered" color="primary">
                            Review
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing 1 to {mockApplications.length} of {mockApplications.length} results
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="bordered" isDisabled>
              Previous
            </Button>
            <Button size="sm" color="primary">
              1
            </Button>
            <Button size="sm" variant="bordered">
              2
            </Button>
            <Button size="sm" variant="bordered">
              3
            </Button>
            <Button size="sm" variant="bordered">
              Next
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

