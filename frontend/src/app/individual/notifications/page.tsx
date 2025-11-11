'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { Checkbox } from '@/components/individual/Checkbox';

export default function NotificationsPage() {
  const [filterType, setFilterType] = useState<'all' | 'jobs' | 'applications' | 'learning' | 'achievements'>('all');
  const [showPreferences, setShowPreferences] = useState(false);
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      type: 'jobs',
      title: 'New Job Match: Senior Software Engineer',
      message: 'A position at Ministry of AI matches your skills with 95% compatibility',
      timestamp: '5 minutes ago',
      read: false,
      icon: '💼',
      link: '/individual/jobs',
      priority: 'high',
    },
    {
      id: 2,
      type: 'applications',
      title: 'Interview Scheduled',
      message: 'Your interview for Software Engineer position is scheduled for Nov 20, 2024 at 2:00 PM',
      timestamp: '1 hour ago',
      read: false,
      icon: '📅',
      link: '/individual/jobs',
      priority: 'high',
    },
    {
      id: 3,
      type: 'learning',
      title: 'Course Completed',
      message: 'Congratulations! You have completed "Advanced Python Programming"',
      timestamp: '2 hours ago',
      read: false,
      icon: '🎓',
      link: '/individual/learning',
      priority: 'normal',
    },
    {
      id: 4,
      type: 'achievements',
      title: 'New Badge Earned',
      message: 'You earned the "Fast Learner" badge for completing 3 certifications in 6 months',
      timestamp: '3 hours ago',
      read: true,
      icon: '⭐',
      link: '/individual/achievements',
      priority: 'normal',
    },
    {
      id: 5,
      type: 'applications',
      title: 'Application Status Update',
      message: 'Your application for Data Analyst position is now under review',
      timestamp: '5 hours ago',
      read: true,
      icon: '📝',
      link: '/individual/jobs',
      priority: 'normal',
    },
    {
      id: 6,
      type: 'learning',
      title: 'New Course Available',
      message: 'Machine Learning Fundamentals course is now available in the Learning Center',
      timestamp: '1 day ago',
      read: true,
      icon: '📚',
      link: '/individual/learning-center',
      priority: 'low',
    },
    {
      id: 7,
      type: 'jobs',
      title: 'Job Application Deadline',
      message: 'Application deadline for Cloud Architect position is in 2 days',
      timestamp: '1 day ago',
      read: true,
      icon: '⏰',
      link: '/individual/jobs',
      priority: 'high',
    },
    {
      id: 8,
      type: 'achievements',
      title: 'Profile Milestone',
      message: 'Your profile has been viewed 1,000 times! Keep up the great work',
      timestamp: '2 days ago',
      read: true,
      icon: '👁️',
      link: '/individual/profile',
      priority: 'low',
    },
    {
      id: 9,
      type: 'applications',
      title: 'Application Accepted',
      message: 'Congratulations! Your application for Junior Developer position has been accepted',
      timestamp: '3 days ago',
      read: true,
      icon: '✅',
      link: '/individual/jobs',
      priority: 'high',
    },
    {
      id: 10,
      type: 'learning',
      title: 'Assessment Available',
      message: 'New skills assessment for Python Programming is ready to take',
      timestamp: '3 days ago',
      read: true,
      icon: '📊',
      link: '/individual/assessments',
      priority: 'normal',
    },
  ]);

  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const notificationTypes = [
    { value: 'all', label: 'All', icon: '📬', count: notificationsList.length },
    { value: 'jobs', label: 'Jobs', icon: '💼', count: notificationsList.filter(n => n.type === 'jobs').length },
    { value: 'applications', label: 'Applications', icon: '📝', count: notificationsList.filter(n => n.type === 'applications').length },
    { value: 'learning', label: 'Learning', icon: '📚', count: notificationsList.filter(n => n.type === 'learning').length },
    { value: 'achievements', label: 'Achievements', icon: '⭐', count: notificationsList.filter(n => n.type === 'achievements').length },
  ];

  const [preferences, setPreferences] = useState({
    email: {
      jobs: true,
      applications: true,
      learning: true,
      achievements: true,
      newsletter: false,
    },
    push: {
      jobs: true,
      applications: true,
      learning: false,
      achievements: true,
      newsletter: false,
    },
  });

  const filteredNotifications = filterType === 'all'
    ? notificationsList
    : notificationsList.filter(n => n.type === filterType);

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationsList(notificationsList.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotificationsList([]);
    }
  };

  const deleteNotification = (id: number) => {
    setNotificationsList(notificationsList.filter(n => n.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'normal': return 'border-blue-500';
      case 'low': return 'border-gray-300';
      default: return 'border-gray-300';
    }
  };

  const savePreferences = () => {
    alert('Notification preferences saved successfully!');
    setShowPreferences(false);
  };

  return (
    <DashboardLayout user={user} notificationCount={unreadCount}>
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

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Updates</span>
              </div>
              <h1 className="text-4xl font-black font-playfair mb-2">Notifications</h1>
              <p className="text-gray-300">Stay updated with your career journey</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setShowPreferences(!showPreferences)} variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                ⚙️ Preferences
              </Button>
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} className="bg-red-600 hover:bg-red-700">
                  Mark All Read
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total', value: notificationsList.length.toString(), icon: '📬', color: 'border-blue-500' },
            { label: 'Unread', value: unreadCount.toString(), icon: '🔔', color: 'border-red-500' },
            { label: 'High Priority', value: notificationsList.filter(n => n.priority === 'high').length.toString(), icon: '⚠️', color: 'border-yellow-500' },
            { label: 'Today', value: notificationsList.filter(n => n.timestamp.includes('hour') || n.timestamp.includes('min')).length.toString(), icon: '📅', color: 'border-green-500' },
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

        {/* Notification Preferences Panel */}
        {showPreferences && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-red-600">
            <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
              <h2 className="text-2xl font-bold font-playfair">Notification Preferences</h2>
              <p className="text-sm text-red-100 mt-1">Choose how you want to receive notifications</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Notifications */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📧</span> Email Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Job Matches</span>
                      <Checkbox
                        checked={preferences.email.jobs}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          email: { ...preferences.email, jobs: e.target.checked }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Application Updates</span>
                      <Checkbox
                        checked={preferences.email.applications}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          email: { ...preferences.email, applications: e.target.checked }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Learning & Courses</span>
                      <Checkbox
                        checked={preferences.email.learning}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          email: { ...preferences.email, learning: e.target.checked }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Achievements & Badges</span>
                      <Checkbox
                        checked={preferences.email.achievements}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          email: { ...preferences.email, achievements: e.target.checked }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Newsletter & Updates</span>
                      <Checkbox
                        checked={preferences.email.newsletter}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          email: { ...preferences.email, newsletter: e.target.checked }
                        })}
                      />
                    </div>
                  </div>
                </div>

                {/* Push Notifications */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔔</span> Push Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Job Matches</span>
                      <Checkbox
                        checked={preferences.push.jobs}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          push: { ...preferences.push, jobs: e.target.checked }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Application Updates</span>
                      <Checkbox
                        checked={preferences.push.applications}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          push: { ...preferences.push, applications: e.target.checked }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Learning & Courses</span>
                      <Checkbox
                        checked={preferences.push.learning}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          push: { ...preferences.push, learning: e.target.checked }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Achievements & Badges</span>
                      <Checkbox
                        checked={preferences.push.achievements}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          push: { ...preferences.push, achievements: e.target.checked }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-700">Newsletter & Updates</span>
                      <Checkbox
                        checked={preferences.push.newsletter}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          push: { ...preferences.push, newsletter: e.target.checked }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={savePreferences} className="flex-1 bg-red-600 hover:bg-red-700">
                  Save Preferences
                </Button>
                <Button onClick={() => setShowPreferences(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {notificationTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFilterType(type.value as any)}
                  className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                    filterType === type.value
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type.icon} {type.label} ({type.count})
                </button>
              ))}
            </div>
            {notificationsList.length > 0 && (
              <Button onClick={clearAll} variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'border-2 border-red-600' : 'border-2 border-gray-200'
                } hover:shadow-2xl transition-all`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      !notification.read ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      {notification.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`text-lg font-bold ${
                            !notification.read ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={notification.priority === 'high' ? 'default' : 'default'}
                            className={`text-xs ${
                              notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                              notification.priority === 'normal' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {notification.priority}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-gray-500">{notification.timestamp}</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => alert(`Opening: ${notification.link}`)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            View
                          </Button>
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead(notification.id)}
                              className="border-gray-300 hover:border-gray-400"
                            >
                              Mark Read
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteNotification(notification.id)}
                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Notifications</h3>
              <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
