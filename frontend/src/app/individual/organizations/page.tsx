'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/individual/layout';
import { DashboardLayout } from '@/components/individual/DashboardLayout';
import { Card, CardBody } from '@/components/individual/Card';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { Input } from '@/components/individual/Input';

interface Organization {
  id: string;
  name: string;
  logo: string;
  type: 'Government' | 'Private' | 'Semi-Government';
  sector: string;
  location: string;
  employees: string;
  founded: string;
  description: string;
  openJobs: number;
  followers: number;
  rating: number;
  benefits: string[];
  culture: string[];
}

export default function OrganizationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [following, setFollowing] = useState<Set<string>>(new Set(['1', '3']));

  const organizations: Organization[] = [
    {
      id: '1',
      name: 'Ministry of Artificial Intelligence',
      logo: '🤖',
      type: 'Government',
      sector: 'Technology & Innovation',
      location: 'Abu Dhabi',
      employees: '500-1000',
      founded: '2017',
      description: 'Leading the UAE\'s AI transformation and digital government initiatives. We develop cutting-edge solutions that enhance government services and improve quality of life.',
      openJobs: 12,
      followers: 15234,
      rating: 4.8,
      benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Pension'],
      culture: ['Innovation-driven', 'Collaborative', 'Growth-focused'],
    },
    {
      id: '2',
      name: 'Ministry of Interior',
      logo: '🛡️',
      type: 'Government',
      sector: 'Public Safety & Security',
      location: 'Abu Dhabi',
      employees: '10,000+',
      founded: '1971',
      description: 'Ensuring safety and security across the UAE through advanced technology and dedicated professionals. Join us in building a safer nation.',
      openJobs: 28,
      followers: 24567,
      rating: 4.7,
      benefits: ['Comprehensive Benefits', 'Job Security', 'Training', 'Housing Allowance'],
      culture: ['Service-oriented', 'Disciplined', 'Teamwork'],
    },
    {
      id: '3',
      name: 'Smart Dubai',
      logo: '🌟',
      type: 'Semi-Government',
      sector: 'Smart City Solutions',
      location: 'Dubai',
      employees: '200-500',
      founded: '2014',
      description: 'Making Dubai the smartest and happiest city on earth. We leverage technology to improve city services and create innovative urban solutions.',
      openJobs: 8,
      followers: 18923,
      rating: 4.9,
      benefits: ['Competitive Salary', 'Innovation Time', 'Remote Work', 'Wellness Programs'],
      culture: ['Innovative', 'Agile', 'Customer-centric'],
    },
    {
      id: '4',
      name: 'Ministry of Education',
      logo: '📚',
      type: 'Government',
      sector: 'Education',
      location: 'Dubai & Abu Dhabi',
      employees: '5,000+',
      founded: '1971',
      description: 'Shaping the future of education in the UAE. We create opportunities for learning and development at all levels.',
      openJobs: 45,
      followers: 32145,
      rating: 4.6,
      benefits: ['Educational Benefits', 'Summer Break', 'Professional Development', 'Job Stability'],
      culture: ['Learning-focused', 'Supportive', 'Diverse'],
    },
    {
      id: '5',
      name: 'Ministry of Health and Prevention',
      logo: '🏥',
      type: 'Government',
      sector: 'Healthcare',
      location: 'Dubai',
      employees: '8,000+',
      founded: '1971',
      description: 'Ensuring the health and well-being of UAE residents through world-class healthcare services and preventive programs.',
      openJobs: 67,
      followers: 28934,
      rating: 4.7,
      benefits: ['Medical Coverage', 'Continuous Training', 'Career Growth', 'Research Opportunities'],
      culture: ['Patient-centered', 'Excellence-driven', 'Compassionate'],
    },
    {
      id: '6',
      name: 'Ministry of Finance',
      logo: '💰',
      type: 'Government',
      sector: 'Finance & Economics',
      location: 'Abu Dhabi',
      employees: '1,000-2,000',
      founded: '1971',
      description: 'Managing the UAE\'s financial strategy and economic policies. Join us in driving sustainable economic growth.',
      openJobs: 15,
      followers: 12456,
      rating: 4.5,
      benefits: ['Competitive Package', 'Professional Certifications', 'Job Security', 'Networking'],
      culture: ['Professional', 'Strategic', 'Result-oriented'],
    },
  ];

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || org.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleFollow = (orgId: string) => {
    const newFollowing = new Set(following);
    if (newFollowing.has(orgId)) {
      newFollowing.delete(orgId);
    } else {
      newFollowing.add(orgId);
    }
    setFollowing(newFollowing);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair mb-2">
            Organizations & Employers
          </h1>
          <p className="text-gray-600">
            Explore organizations and discover your next career opportunity
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Search organizations or sectors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-individual-red"
              >
                <option value="all">All Types</option>
                <option value="Government">Government</option>
                <option value="Semi-Government">Semi-Government</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </CardBody>
        </Card>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrgs.map((org) => (
            <Card key={org.id} className="hover:shadow-xl transition-all">
              <CardBody>
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-individual-beige to-individual-red rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {org.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 font-inter mb-1 truncate">
                      {org.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Badge variant="flat" color="primary" size="sm">
                        {org.type}
                      </Badge>
                      <span>•</span>
                      <span>{org.sector}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📍 {org.location}</span>
                      <span>👥 {org.employees}</span>
                      <span>⭐ {org.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {org.description}
                </p>

                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Key Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {org.benefits.slice(0, 4).map((benefit, idx) => (
                      <Badge key={idx} variant="flat" color="success" size="sm">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Culture */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Culture:</h4>
                  <div className="flex flex-wrap gap-1">
                    {org.culture.map((trait, idx) => (
                      <Badge key={idx} variant="flat" size="sm">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                  <span className="font-medium text-individual-red">
                    {org.openJobs} open positions
                  </span>
                  <span>{org.followers.toLocaleString()} followers</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    color="primary"
                    fullWidth
                    onClick={() => router.push(`/individual/jobs?org=${org.id}`)}
                  >
                    View Jobs ({org.openJobs})
                  </Button>
                  <Button
                    variant="bordered"
                    onClick={() => handleFollow(org.id)}
                    className={following.has(org.id) ? 'border-individual-red text-individual-red' : ''}
                  >
                    {following.has(org.id) ? '✓ Following' : '+ Follow'}
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {filteredOrgs.length === 0 && (
          <Card>
            <CardBody>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No organizations found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
