'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/federal/layout';
import { Card, CardHeader, CardBody } from '@/components/federal/Card';
import { Button } from '@/components/federal/Button';
import { Badge } from '@/components/federal/Badge';
import { Input } from '@/components/federal/Input';
import { Select, SelectOption } from '@/components/federal/Select';

// Mock opportunities data
const mockOpportunities = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    institution: 'Ministry of Artificial Intelligence',
    location: 'Abu Dhabi',
    type: 'Full-time',
    salary: 'AED 25,000 - 35,000',
    applications: 45,
    status: 'active',
    posted: '2 days ago',
    deadline: '15 days left',
    description: 'Lead development of AI-powered government services platform.',
  },
  {
    id: 2,
    title: 'Data Analyst',
    institution: 'Ministry of Health and Prevention',
    location: 'Dubai',
    type: 'Full-time',
    salary: 'AED 18,000 - 25,000',
    applications: 32,
    status: 'active',
    posted: '5 days ago',
    deadline: '10 days left',
    description: 'Analyze healthcare data to improve public health outcomes.',
  },
  {
    id: 3,
    title: 'Cybersecurity Specialist',
    institution: 'Ministry of Interior',
    location: 'Abu Dhabi',
    type: 'Full-time',
    salary: 'AED 22,000 - 30,000',
    applications: 28,
    status: 'active',
    posted: '1 week ago',
    deadline: '7 days left',
    description: 'Protect national digital infrastructure and data security.',
  },
  {
    id: 4,
    title: 'Education Program Manager',
    institution: 'Ministry of Education',
    location: 'Sharjah',
    type: 'Full-time',
    salary: 'AED 20,000 - 28,000',
    applications: 18,
    status: 'active',
    posted: '3 days ago',
    deadline: '12 days left',
    description: 'Develop and manage innovative education programs.',
  },
  {
    id: 5,
    title: 'Sports Development Officer',
    institution: 'General Authority for Sports',
    location: 'Dubai',
    type: 'Contract',
    salary: 'AED 15,000 - 20,000',
    applications: 15,
    status: 'active',
    posted: '4 days ago',
    deadline: '20 days left',
    description: 'Promote sports initiatives and community engagement.',
  },
  {
    id: 6,
    title: 'Cultural Heritage Specialist',
    institution: 'Ministry of Culture and Youth',
    location: 'Abu Dhabi',
    type: 'Full-time',
    salary: 'AED 18,000 - 24,000',
    applications: 12,
    status: 'active',
    posted: '6 days ago',
    deadline: '18 days left',
    description: 'Preserve and promote UAE cultural heritage.',
  },
];

const typeOptions: SelectOption[] = [
  { value: 'all', label: 'All Types' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

const statusOptions: SelectOption[] = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
  { value: 'draft', label: 'Draft' },
];

const sortOptions: SelectOption[] = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'applications', label: 'Most Applications' },
  { value: 'deadline', label: 'Deadline Soon' },
  { value: 'salary', label: 'Highest Salary' },
];

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
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
              Opportunities
            </h1>
            <p className="text-gray-600 mt-1 font-noto">
              Manage and monitor all job opportunities across federal institutions
            </p>
          </div>
          <Button color="primary" size="lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Opportunity
          </Button>
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Opportunities</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">1,247</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">892</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-1">124</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Closed</p>
                  <p className="text-2xl font-bold text-gray-600 mt-1">231</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search opportunities..."
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
                options={typeOptions}
                value={selectedType}
                onChange={setSelectedType}
                placeholder="Filter by type"
              />
              <Select
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Filter by status"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-600">
                Showing {mockOpportunities.length} opportunities
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

        {/* Opportunities List */}
        <div className="space-y-4">
          {mockOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-federal-gold/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-federal-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 font-cairo">
                          {opportunity.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 font-noto">
                          {opportunity.institution}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {opportunity.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {opportunity.location}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {opportunity.salary}
                          </div>
                          <Badge color="primary" variant="flat" size="sm">
                            {opportunity.type}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {opportunity.applications} applications
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 ml-4">
                    <Badge
                      color={opportunity.status === 'active' ? 'success' : 'default'}
                      variant="solid"
                    >
                      {opportunity.status}
                    </Badge>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Posted {opportunity.posted}</p>
                      <p className="text-xs text-red-600 font-medium">{opportunity.deadline}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="light">
                        View
                      </Button>
                      <Button size="sm" variant="bordered">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing 1 to {mockOpportunities.length} of {mockOpportunities.length} results
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

