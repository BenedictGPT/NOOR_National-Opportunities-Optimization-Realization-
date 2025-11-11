'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { Input } from '@/components/individual/Input';
import { Select } from '@/components/individual/Select';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'registered' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'AI & Machine Learning Summit 2024',
      category: 'Skills',
      date: '2024-11-20',
      time: '09:00 - 17:00',
      location: 'Dubai World Trade Centre',
      type: 'In-Person',
      image: '🤖',
      organizer: 'Ministry of AI',
      attendees: 1247,
      maxCapacity: 2000,
      description: 'Join us for a full-day summit on the latest trends in AI and Machine Learning. Network with industry leaders and learn cutting-edge techniques.',
      speakers: ['Dr. Ahmed Al Mansouri', 'Dr. Sara Ali', 'Eng. Khaled Hassan'],
      agenda: ['Opening Keynote', 'AI in Government', 'ML Workshops', 'Panel Discussion', 'Networking Session'],
      price: 'Free',
      tags: ['AI', 'Machine Learning', 'Technology'],
      registered: false,
    },
    {
      id: 2,
      title: 'Career Development Workshop',
      category: 'Career',
      date: '2024-11-18',
      time: '14:00 - 16:00',
      location: 'NOOR Headquarters, Abu Dhabi',
      type: 'Hybrid',
      image: '💼',
      organizer: 'NOOR Career Center',
      attendees: 345,
      maxCapacity: 500,
      description: 'Learn essential career development strategies, from resume building to interview preparation. Perfect for job seekers at all levels.',
      speakers: ['Ms. Fatima Al Zaabi', 'Mr. Omar Mohammed'],
      agenda: ['Resume Writing', 'Interview Skills', 'Networking Tips', 'Q&A Session'],
      price: 'Free',
      tags: ['Career', 'Professional Development', 'Skills'],
      registered: true,
    },
    {
      id: 3,
      title: 'Networking Night: Tech Professionals',
      category: 'Networking',
      date: '2024-11-22',
      time: '18:00 - 21:00',
      location: 'Emirates Towers, Dubai',
      type: 'In-Person',
      image: '🤝',
      organizer: 'Ministry of Human Resources',
      attendees: 567,
      maxCapacity: 800,
      description: 'Connect with fellow tech professionals, share experiences, and build meaningful relationships. Light refreshments provided.',
      speakers: ['Various Industry Leaders'],
      agenda: ['Welcome Reception', 'Speed Networking', 'Panel Discussion', 'Open Networking'],
      price: 'Free',
      tags: ['Networking', 'Technology', 'Community'],
      registered: false,
    },
    {
      id: 4,
      title: 'Cloud Architecture Masterclass',
      category: 'Skills',
      date: '2024-11-25',
      time: '10:00 - 13:00',
      location: 'Virtual Event',
      type: 'Virtual',
      image: '☁️',
      organizer: 'NOOR Learning Center',
      attendees: 892,
      maxCapacity: 1500,
      description: 'Deep dive into cloud architecture patterns and best practices. Hands-on exercises and real-world case studies.',
      speakers: ['Dr. Ahmed Al Mansouri', 'Eng. Mohammed Bin Rashid'],
      agenda: ['Cloud Fundamentals', 'Design Patterns', 'Hands-on Workshop', 'Case Studies'],
      price: 'Free',
      tags: ['Cloud', 'AWS', 'Architecture'],
      registered: true,
    },
    {
      id: 5,
      title: 'Women in Tech Conference',
      category: 'Networking',
      date: '2024-12-01',
      time: '09:00 - 18:00',
      location: 'Abu Dhabi Convention Centre',
      type: 'In-Person',
      image: '👩‍💻',
      organizer: 'Ministry of AI',
      attendees: 2134,
      maxCapacity: 3000,
      description: 'Celebrating and empowering women in technology. Inspiring talks, workshops, and networking opportunities.',
      speakers: ['Dr. Sara Ali', 'Eng. Mariam Ahmed', 'Ms. Fatima Al Zaabi'],
      agenda: ['Keynote Speeches', 'Panel Discussions', 'Workshops', 'Networking Lunch', 'Awards Ceremony'],
      price: 'Free',
      tags: ['Women in Tech', 'Diversity', 'Networking'],
      registered: false,
    },
  ];

  const registeredEvents = upcomingEvents.filter(event => event.registered);

  const pastEvents = [
    {
      id: 1,
      title: 'Cybersecurity Awareness Day',
      category: 'Skills',
      date: '2024-10-15',
      location: 'Dubai',
      image: '🔒',
      attendees: 1543,
      recording: true,
      certificate: true,
    },
    {
      id: 2,
      title: 'Government Innovation Forum',
      category: 'Career',
      date: '2024-09-28',
      location: 'Abu Dhabi',
      image: '💡',
      attendees: 2341,
      recording: true,
      certificate: false,
    },
    {
      id: 3,
      title: 'Python Programming Bootcamp',
      category: 'Skills',
      date: '2024-09-10',
      location: 'Virtual',
      image: '🐍',
      attendees: 892,
      recording: true,
      certificate: true,
    },
  ];

  const eventCategories = [
    { value: 'all', label: 'All Categories', count: upcomingEvents.length },
    { value: 'networking', label: 'Networking', count: upcomingEvents.filter(e => e.category === 'Networking').length },
    { value: 'skills', label: 'Skills Development', count: upcomingEvents.filter(e => e.category === 'Skills').length },
    { value: 'career', label: 'Career', count: upcomingEvents.filter(e => e.category === 'Career').length },
  ];

  const registerForEvent = (event: any) => {
    alert(`Registering for: ${event.title}`);
  };

  const unregisterFromEvent = (event: any) => {
    alert(`Cancelling registration for: ${event.title}`);
  };

  const addToCalendar = (event: any) => {
    alert(`Adding ${event.title} to calendar...`);
  };

  const shareEvent = (event: any) => {
    alert(`Sharing event: ${event.title}`);
  };

  const viewRecording = (event: any) => {
    alert(`Opening recording for: ${event.title}`);
  };

  const downloadCertificate = (event: any) => {
    alert(`Downloading certificate for: ${event.title}`);
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
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Events & Workshops</span>
            </div>
            <h1 className="text-4xl font-black font-playfair mb-2">Upcoming Events</h1>
            <p className="text-gray-300">Discover workshops, networking events, and career development opportunities</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Registered Events', value: registeredEvents.length.toString(), icon: '✓', color: 'border-green-500' },
            { label: 'Upcoming Events', value: upcomingEvents.length.toString(), icon: '📅', color: 'border-blue-500' },
            { label: 'Events Attended', value: pastEvents.length.toString(), icon: '🎯', color: 'border-yellow-500' },
            { label: 'Certificates Earned', value: '2', icon: '🏆', color: 'border-red-500' },
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

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-wrap gap-3">
            {eventCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  categoryFilter === cat.value
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label} <span className="ml-2 opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Upcoming ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('registered')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'registered'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              My Events ({registeredEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'past'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>
          <div className="w-64">
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Upcoming Events Tab */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-red-600 transition-all">
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Event Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center text-5xl shadow-lg">
                        {event.image}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900 font-playfair">{event.title}</h3>
                            {event.registered && (
                              <Badge variant="success">✓ Registered</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">Organized by {event.organizer}</p>
                        </div>
                        <Badge variant="default" className="text-xs font-bold">
                          {event.category}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">{event.description}</p>

                      {/* Event Info Grid */}
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-xl">📅</span>
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-bold text-gray-900">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-xl">⏰</span>
                          <div>
                            <p className="text-xs text-gray-500">Time</p>
                            <p className="font-bold text-gray-900">{event.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-xl">📍</span>
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="font-bold text-gray-900">{event.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-xl">💻</span>
                          <div>
                            <p className="text-xs text-gray-500">Type</p>
                            <p className="font-bold text-gray-900">{event.type}</p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Capacity</span>
                          <span className="font-bold text-gray-900">{event.attendees}/{event.maxCapacity} registered</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all"
                            style={{ width: `${(event.attendees / event.maxCapacity) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Speakers */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2 font-semibold">SPEAKERS</p>
                        <div className="flex flex-wrap gap-2">
                          {event.speakers.map((speaker, idx) => (
                            <Badge key={idx} variant="default" className="text-xs">
                              {speaker}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {event.registered ? (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => addToCalendar(event)} className="border-gray-300 hover:border-gray-400">
                              Add to Calendar
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => unregisterFromEvent(event)} className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                              Cancel Registration
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" onClick={() => registerForEvent(event)} className="bg-red-600 hover:bg-red-700">
                              Register / RSVP →
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => addToCalendar(event)} className="border-gray-300 hover:border-gray-400">
                              Add to Calendar
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => shareEvent(event)} className="border-gray-300 hover:border-gray-400">
                              Share
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Registered Events Tab */}
        {activeTab === 'registered' && (
          <div className="space-y-6">
            {registeredEvents.length > 0 ? (
              registeredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-600">
                  <div className="p-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{event.image}</div>
                        <div>
                          <h3 className="text-xl font-bold font-playfair">{event.title}</h3>
                          <p className="text-sm opacity-90">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • {event.time}</p>
                        </div>
                      </div>
                      <Badge variant="success" className="bg-white/20 text-white border-white/30">
                        ✓ Confirmed
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-700 mb-4">{event.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        View Event Details
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => addToCalendar(event)} className="border-gray-300 hover:border-gray-400">
                        Add to Calendar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => shareEvent(event)} className="border-gray-300 hover:border-gray-400">
                        Share with Friends
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Registered Events</h3>
                <p className="text-gray-600 mb-4">You haven't registered for any events yet.</p>
                <Button onClick={() => setActiveTab('upcoming')} className="bg-red-600 hover:bg-red-700">
                  Browse Events
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Past Events Tab */}
        {activeTab === 'past' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
                <div className="p-6 bg-gradient-to-r from-gray-600 to-gray-700 text-white">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{event.image}</div>
                    <div>
                      <h3 className="text-xl font-bold font-playfair">{event.title}</h3>
                      <p className="text-sm opacity-90">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">📍</span>
                        <span className="font-semibold">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-lg">👥</span>
                        <span className="font-semibold">{event.attendees} attended</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {event.recording && (
                      <Button size="sm" onClick={() => viewRecording(event)} className="flex-1 bg-red-600 hover:bg-red-700">
                        View Recording
                      </Button>
                    )}
                    {event.certificate && (
                      <Button size="sm" variant="outline" onClick={() => downloadCertificate(event)} className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                        Get Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
