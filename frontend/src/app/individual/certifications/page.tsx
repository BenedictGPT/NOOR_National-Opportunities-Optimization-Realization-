'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { Input } from '@/components/individual/Input';

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState<'earned' | 'available'>('earned');
  const [searchQuery, setSearchQuery] = useState('');

  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const earnedCertifications = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2024-09-15',
      expiryDate: '2027-09-15',
      credentialId: 'AWS-SA-2024-95847',
      status: 'active',
      badge: '☁️',
      verified: true,
      skills: ['Cloud Computing', 'AWS', 'Architecture'],
    },
    {
      id: 2,
      title: 'Advanced Python Programming',
      issuer: 'NOOR Learning Center',
      issueDate: '2024-10-28',
      expiryDate: null,
      credentialId: 'NOOR-PY-2024-4523',
      status: 'active',
      badge: '🐍',
      verified: true,
      skills: ['Python', 'Programming', 'Data Structures'],
    },
    {
      id: 3,
      title: 'Cybersecurity Fundamentals',
      issuer: 'Ministry of Interior',
      issueDate: '2024-08-12',
      expiryDate: '2025-08-12',
      credentialId: 'MOI-CS-2024-7821',
      status: 'expiring',
      badge: '🔒',
      verified: true,
      skills: ['Security', 'Cybersecurity', 'Risk Management'],
    },
    {
      id: 4,
      title: 'Professional Scrum Master',
      issuer: 'Scrum.org',
      issueDate: '2024-06-20',
      expiryDate: null,
      credentialId: 'PSM-2024-1234',
      status: 'active',
      badge: '🎯',
      verified: true,
      skills: ['Agile', 'Scrum', 'Project Management'],
    },
    {
      id: 5,
      title: 'Digital Marketing Specialist',
      issuer: 'NOOR Learning Center',
      issueDate: '2023-12-10',
      expiryDate: '2024-12-10',
      credentialId: 'NOOR-DM-2023-8921',
      status: 'expired',
      badge: '📱',
      verified: true,
      skills: ['Marketing', 'Digital Marketing', 'SEO'],
    },
  ];

  const availableCertifications = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      provider: 'NOOR Learning Center',
      duration: '8 weeks',
      level: 'Intermediate',
      badge: '🤖',
      participants: 1247,
      rating: 4.8,
      description: 'Learn the fundamentals of machine learning and AI',
      requirements: ['Python Programming', 'Basic Statistics'],
    },
    {
      id: 2,
      title: 'Leadership Excellence',
      provider: 'Ministry of Human Resources',
      duration: '6 weeks',
      level: 'Advanced',
      badge: '👔',
      participants: 892,
      rating: 4.9,
      description: 'Develop essential leadership and management skills',
      requirements: ['2+ years experience', 'Team Management'],
    },
    {
      id: 3,
      title: 'Blockchain Technology',
      provider: 'NOOR Learning Center',
      duration: '10 weeks',
      level: 'Advanced',
      badge: '⛓️',
      participants: 654,
      rating: 4.7,
      description: 'Master blockchain technology and smart contracts',
      requirements: ['Programming Experience', 'Cryptography Basics'],
    },
    {
      id: 4,
      title: 'Data Analytics Professional',
      provider: 'Ministry of Economy',
      duration: '12 weeks',
      level: 'Intermediate',
      badge: '📊',
      participants: 1543,
      rating: 4.9,
      description: 'Become proficient in data analysis and visualization',
      requirements: ['Excel', 'Basic SQL'],
    },
  ];

  const achievementBadges = [
    { id: 1, title: 'Fast Learner', icon: '⚡', description: 'Earned 3 certifications in 6 months' },
    { id: 2, title: 'Cloud Master', icon: '☁️', description: 'Completed all cloud certifications' },
    { id: 3, title: 'Skill Pioneer', icon: '🚀', description: 'Among first 100 to earn NOOR certification' },
    { id: 4, title: 'Knowledge Sharer', icon: '🤝', description: 'Helped 50+ peers with certifications' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-300';
      case 'expiring': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'expired': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const downloadCertificate = (cert: any) => {
    alert(`Downloading certificate: ${cert.title}`);
  };

  const shareCertificate = (cert: any) => {
    alert(`Sharing certificate: ${cert.title}`);
  };

  const verifyCertificate = (cert: any) => {
    alert(`Certificate verification: ${cert.credentialId}\nStatus: Verified ✓`);
  };

  const enrollCertification = (cert: any) => {
    alert(`Enrolling in: ${cert.title}`);
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

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Credentials</span>
            </div>
            <h1 className="text-4xl font-black font-playfair mb-2">My Certifications</h1>
            <p className="text-gray-300">Showcase your achievements and continue learning</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Earned', value: '5', icon: '🏆', color: 'border-yellow-500' },
            { label: 'Active', value: '3', icon: '✅', color: 'border-green-500' },
            { label: 'In Progress', value: '2', icon: '📚', color: 'border-blue-500' },
            { label: 'Badges', value: '4', icon: '⭐', color: 'border-red-500' },
          ].map((stat, index) => (
            <div key={index} className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 ${stat.color}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">{stat.label}</p>
                <p className="text-4xl font-black text-gray-900 mt-2 font-mono">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Badges */}
        <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-white font-playfair">Achievement Badges</h2>
            <p className="text-sm text-gray-400 mt-1">Special recognition for your accomplishments</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {achievementBadges.map((badge) => (
                <div key={badge.id} className="p-4 bg-gray-900 rounded-xl border-2 border-gray-800 hover:border-yellow-500 transition-all text-center group">
                  <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">{badge.icon}</div>
                  <h3 className="font-bold text-white text-sm mb-1">{badge.title}</h3>
                  <p className="text-xs text-gray-400">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('earned')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'earned'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              My Certifications ({earnedCertifications.length})
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'available'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Available Certifications ({availableCertifications.length})
            </button>
          </div>
          <div className="w-64">
            <Input
              placeholder="Search certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Earned Certifications */}
        {activeTab === 'earned' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {earnedCertifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-red-600 transition-all group">
                <div className={`p-6 bg-gradient-to-r ${
                  cert.status === 'active' ? 'from-green-600 to-green-700' :
                  cert.status === 'expiring' ? 'from-yellow-600 to-yellow-700' :
                  'from-gray-600 to-gray-700'
                } text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 text-8xl opacity-10">{cert.badge}</div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-5xl">{cert.badge}</div>
                      {cert.verified && (
                        <Badge variant="success" className="bg-white/20 text-white border-white/30">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold font-playfair mt-4">{cert.title}</h3>
                    <p className="text-sm opacity-90 mt-1">{cert.issuer}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Issued:</span>
                      <span className="font-bold text-gray-900">{new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    {cert.expiryDate && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Expires:</span>
                        <span className="font-bold text-gray-900">{new Date(cert.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Credential ID:</span>
                      <span className="font-mono text-xs font-bold text-gray-900">{cert.credentialId}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-semibold">SKILLS</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, idx) => (
                        <Badge key={idx} variant="default" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => downloadCertificate(cert)} className="flex-1 bg-red-600 hover:bg-red-700">
                      Download
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => shareCertificate(cert)} className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                      Share
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => verifyCertificate(cert)} className="border-gray-300 hover:border-gray-400">
                      Verify
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Available Certifications */}
        {activeTab === 'available' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableCertifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-red-600 transition-all group">
                <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-8xl opacity-10">{cert.badge}</div>
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{cert.badge}</div>
                    <h3 className="text-xl font-bold font-playfair">{cert.title}</h3>
                    <p className="text-sm opacity-90 mt-1">{cert.provider}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4">{cert.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 font-semibold mb-1">DURATION</p>
                      <p className="text-sm font-bold text-gray-900">{cert.duration}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 font-semibold mb-1">LEVEL</p>
                      <p className="text-sm font-bold text-gray-900">{cert.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-bold text-gray-900">{cert.rating}</span>
                      <span className="text-gray-500">({cert.participants} enrolled)</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-semibold">REQUIREMENTS</p>
                    <div className="space-y-1">
                      {cert.requirements.map((req, idx) => (
                        <p key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <span className="text-green-600">✓</span> {req}
                        </p>
                      ))}
                    </div>
                  </div>

                  <Button onClick={() => enrollCertification(cert)} className="w-full bg-red-600 hover:bg-red-700">
                    Enroll Now →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
