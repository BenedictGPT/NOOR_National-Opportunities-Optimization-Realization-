'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { Input } from '@/components/individual/Input';
import { Select } from '@/components/individual/Select';

export default function MentorshipPage() {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-mentors' | 'sessions'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');

  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const availableMentors = [
    {
      id: 1,
      name: 'Dr. Ahmed Al Mansouri',
      title: 'Senior Cloud Architect',
      company: 'Ministry of AI',
      avatar: '👨‍💼',
      expertise: ['Cloud Computing', 'AWS', 'System Design'],
      experience: '15+ years',
      mentees: 47,
      rating: 4.9,
      sessions: 234,
      bio: 'Specialized in cloud architecture and digital transformation. Passionate about helping UAE nationals excel in tech.',
      availability: 'Available',
      languages: ['Arabic', 'English'],
      responseTime: '< 24 hours',
    },
    {
      id: 2,
      name: 'Eng. Sara Mohammed',
      title: 'Lead Software Engineer',
      company: 'Digital Government',
      avatar: '👩‍💻',
      expertise: ['Software Development', 'Python', 'Leadership'],
      experience: '12+ years',
      mentees: 38,
      rating: 4.8,
      sessions: 189,
      bio: 'Full-stack developer with expertise in Python and modern web technologies. Love mentoring aspiring developers.',
      availability: 'Limited',
      languages: ['Arabic', 'English'],
      responseTime: '1-2 days',
    },
    {
      id: 3,
      name: 'Dr. Khaled Hassan',
      title: 'Cybersecurity Director',
      company: 'Ministry of Interior',
      avatar: '🛡️',
      expertise: ['Cybersecurity', 'Risk Management', 'Compliance'],
      experience: '18+ years',
      mentees: 52,
      rating: 5.0,
      sessions: 312,
      bio: 'Expert in cybersecurity strategy and implementation. Committed to building secure digital infrastructure.',
      availability: 'Available',
      languages: ['Arabic', 'English', 'French'],
      responseTime: '< 48 hours',
    },
    {
      id: 4,
      name: 'Ms. Fatima Al Zaabi',
      title: 'Product Manager',
      company: 'Ministry of Economy',
      avatar: '👩‍💼',
      expertise: ['Product Management', 'Agile', 'Strategy'],
      experience: '10+ years',
      mentees: 31,
      rating: 4.9,
      sessions: 156,
      bio: 'Product leader focused on building user-centric solutions. Enjoy coaching product managers and entrepreneurs.',
      availability: 'Available',
      languages: ['Arabic', 'English'],
      responseTime: '< 24 hours',
    },
  ];

  const myMentors = [
    {
      id: 1,
      name: 'Dr. Ahmed Al Mansouri',
      avatar: '👨‍💼',
      expertise: 'Cloud Computing',
      startDate: '2024-09-01',
      sessionsCompleted: 6,
      nextSession: '2024-11-15',
      status: 'active',
      progress: 75,
    },
    {
      id: 2,
      name: 'Eng. Sara Mohammed',
      avatar: '👩‍💻',
      expertise: 'Software Development',
      startDate: '2024-10-01',
      sessionsCompleted: 3,
      nextSession: '2024-11-18',
      status: 'active',
      progress: 40,
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Dr. Ahmed Al Mansouri',
      avatar: '👨‍💼',
      topic: 'AWS Solution Architecture Review',
      date: '2024-11-15',
      time: '14:00 - 15:00',
      type: 'Video Call',
      status: 'confirmed',
      agenda: 'Review your AWS architecture design and discuss best practices',
    },
    {
      id: 2,
      mentor: 'Eng. Sara Mohammed',
      avatar: '👩‍💻',
      topic: 'Python Code Review Session',
      date: '2024-11-18',
      time: '10:00 - 11:00',
      type: 'Video Call',
      status: 'pending',
      agenda: 'Code review and discussion on Python best practices',
    },
    {
      id: 3,
      mentor: 'Dr. Ahmed Al Mansouri',
      avatar: '👨‍💼',
      topic: 'Career Development Planning',
      date: '2024-11-22',
      time: '15:00 - 16:00',
      type: 'Video Call',
      status: 'confirmed',
      agenda: 'Discuss career goals and create action plan for next quarter',
    },
  ];

  const mentorshipResources = [
    {
      id: 1,
      title: 'How to Make the Most of Mentorship',
      type: 'Guide',
      icon: '📖',
      duration: '5 min read',
    },
    {
      id: 2,
      title: 'Preparing for Your First Session',
      type: 'Checklist',
      icon: '✓',
      duration: '3 min read',
    },
    {
      id: 3,
      title: 'Setting Goals with Your Mentor',
      type: 'Template',
      icon: '🎯',
      duration: 'Download',
    },
    {
      id: 4,
      title: 'Best Practices for Virtual Mentorship',
      type: 'Video',
      icon: '🎥',
      duration: '12 min',
    },
  ];

  const requestMentorship = (mentor: any) => {
    alert(`Sending mentorship request to ${mentor.name}...`);
  };

  const joinSession = (session: any) => {
    alert(`Joining session: ${session.topic}`);
  };

  const rescheduleSession = (session: any) => {
    alert(`Rescheduling session with ${session.mentor}...`);
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
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Career Growth</span>
            </div>
            <h1 className="text-4xl font-black font-playfair mb-2">Mentorship Program</h1>
            <p className="text-gray-300">Connect with experienced professionals and accelerate your career</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'My Mentors', value: '2', icon: '👥', color: 'border-blue-500' },
            { label: 'Sessions Completed', value: '9', icon: '✓', color: 'border-green-500' },
            { label: 'Upcoming Sessions', value: '3', icon: '📅', color: 'border-yellow-500' },
            { label: 'Hours Learned', value: '15', icon: '⏰', color: 'border-red-500' },
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

        {/* Tabs */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'browse'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Browse Mentors
            </button>
            <button
              onClick={() => setActiveTab('my-mentors')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'my-mentors'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              My Mentors ({myMentors.length})
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'sessions'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Upcoming Sessions ({upcomingSessions.length})
            </button>
          </div>
        </div>

        {/* Browse Mentors Tab */}
        {activeTab === 'browse' && (
          <>
            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search mentors by name or expertise..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-48">
                  <Select
                    value={expertiseFilter}
                    onChange={(e) => setExpertiseFilter(e.target.value)}
                  >
                    <option value="all">All Expertise</option>
                    <option value="cloud">Cloud Computing</option>
                    <option value="software">Software Development</option>
                    <option value="security">Cybersecurity</option>
                    <option value="product">Product Management</option>
                  </Select>
                </div>
              </div>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableMentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-red-600 transition-all group">
                  <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white relative">
                    <div className="flex items-start gap-4">
                      <div className="text-6xl">{mentor.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold font-playfair">{mentor.name}</h3>
                            <p className="text-sm opacity-90">{mentor.title}</p>
                            <p className="text-xs opacity-75">{mentor.company}</p>
                          </div>
                          <Badge variant={mentor.availability === 'Available' ? 'success' : 'default'} className="bg-white/20 text-white border-white/30">
                            {mentor.availability}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">{mentor.bio}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">EXPERIENCE</p>
                        <p className="text-sm font-bold text-gray-900">{mentor.experience}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">MENTEES</p>
                        <p className="text-sm font-bold text-gray-900">{mentor.mentees} active</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500 text-xl">★</span>
                        <span className="font-bold text-gray-900">{mentor.rating}</span>
                        <span className="text-sm text-gray-500">({mentor.sessions} sessions)</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Response: {mentor.responseTime}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2 font-semibold">EXPERTISE</p>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="default" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2 font-semibold">LANGUAGES</p>
                      <p className="text-sm text-gray-700">{mentor.languages.join(', ')}</p>
                    </div>

                    <Button onClick={() => requestMentorship(mentor)} className="w-full bg-red-600 hover:bg-red-700">
                      Request Mentorship →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* My Mentors Tab */}
        {activeTab === 'my-mentors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myMentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
                  <div className="p-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{mentor.avatar}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-playfair">{mentor.name}</h3>
                        <p className="text-sm opacity-90">{mentor.expertise}</p>
                        <Badge variant="success" className="mt-2 bg-white/20 text-white border-white/30">
                          Active Mentorship
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">STARTED</p>
                        <p className="text-sm font-bold text-gray-900">{new Date(mentor.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold mb-1">SESSIONS</p>
                        <p className="text-sm font-bold text-gray-900">{mentor.sessionsCompleted} completed</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold text-gray-900">Mentorship Progress</span>
                        <span className="text-red-600 font-bold">{mentor.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-red-600 to-red-500 h-3 rounded-full shadow-lg transition-all"
                          style={{ width: `${mentor.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-lg mb-4">
                      <p className="text-xs text-blue-600 font-semibold mb-1">NEXT SESSION</p>
                      <p className="text-sm font-bold text-blue-900">{new Date(mentor.nextSession).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                        View Progress
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-red-600 transition-all">
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="text-6xl flex-shrink-0">{session.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 font-playfair">{session.topic}</h3>
                          <p className="text-sm text-gray-600 mt-1">with {session.mentor}</p>
                        </div>
                        <Badge variant={session.status === 'confirmed' ? 'success' : 'default'}>
                          {session.status === 'confirmed' ? '✓ Confirmed' : 'Pending'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-xl">📅</span>
                          <span className="font-semibold">{new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-xl">⏰</span>
                          <span className="font-semibold">{session.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-xl">💻</span>
                          <span className="font-semibold">{session.type}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg mb-4">
                        <p className="text-xs text-gray-500 font-semibold mb-1">AGENDA</p>
                        <p className="text-sm text-gray-700">{session.agenda}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => joinSession(session)} className="bg-red-600 hover:bg-red-700">
                          Join Session
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => rescheduleSession(session)} className="border-gray-300 hover:border-gray-400">
                          Reschedule
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-300 hover:border-gray-400">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mentorship Resources */}
        <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-white font-playfair">Mentorship Resources</h2>
            <p className="text-sm text-gray-400 mt-1">Guides and tools to help you succeed</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {mentorshipResources.map((resource) => (
                <div key={resource.id} className="p-4 bg-gray-900 rounded-xl border-2 border-gray-800 hover:border-red-600 transition-all group cursor-pointer">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{resource.icon}</div>
                  <Badge variant="default" className="mb-2 text-xs">
                    {resource.type}
                  </Badge>
                  <h3 className="font-bold text-white text-sm mb-2 group-hover:text-red-400 transition-colors">{resource.title}</h3>
                  <p className="text-xs text-gray-400">{resource.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
