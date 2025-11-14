'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { Input } from '@/components/individual/Input';
import { Textarea } from '@/components/individual/Textarea';
import { Select } from '@/components/individual/Select';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'discussions' | 'popular' | 'my-posts'>('discussions');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false);

  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚', count: 245 },
    { id: 'career', name: 'Career Advice', icon: '💼', count: 89 },
    { id: 'skills', name: 'Skills & Learning', icon: '🎓', count: 67 },
    { id: 'tech', name: 'Technology', icon: '💻', count: 54 },
    { id: 'networking', name: 'Networking', icon: '🤝', count: 35 },
  ];

  const discussions = [
    {
      id: 1,
      title: 'Best practices for transitioning to cloud architecture?',
      author: 'Ahmed Al Mansouri',
      avatar: '👨‍💼',
      category: 'Technology',
      categoryIcon: '💻',
      content: 'I\'m currently working as a systems administrator and looking to transition into cloud architecture. What certifications should I pursue first? AWS or Azure?',
      replies: 23,
      likes: 45,
      views: 342,
      timestamp: '2 hours ago',
      tags: ['Cloud', 'AWS', 'Career Transition'],
      isAnswered: true,
      isPinned: false,
      lastActivity: '15 min ago',
    },
    {
      id: 2,
      title: 'How to negotiate salary in government positions?',
      author: 'Sara Mohammed',
      avatar: '👩‍💻',
      category: 'Career Advice',
      categoryIcon: '💼',
      content: 'I have an interview coming up for a position at the Ministry of AI. Any tips on how to approach salary negotiation in government roles?',
      replies: 17,
      likes: 38,
      views: 256,
      timestamp: '5 hours ago',
      tags: ['Salary', 'Government Jobs', 'Interview'],
      isAnswered: true,
      isPinned: false,
      lastActivity: '1 hour ago',
    },
    {
      id: 3,
      title: 'Recommended Python courses for data science beginners?',
      author: 'Khaled Hassan',
      avatar: '🧑‍💼',
      category: 'Skills & Learning',
      categoryIcon: '🎓',
      content: 'Looking to start learning data science. Which Python courses on NOOR Learning Center would you recommend for complete beginners?',
      replies: 31,
      likes: 67,
      views: 543,
      timestamp: '1 day ago',
      tags: ['Python', 'Data Science', 'Learning'],
      isAnswered: true,
      isPinned: true,
      lastActivity: '3 hours ago',
    },
    {
      id: 4,
      title: 'Networking tips for introverts in tech?',
      author: 'Mariam Ahmed',
      avatar: '👩',
      category: 'Networking',
      categoryIcon: '🤝',
      content: 'As an introvert, I find networking events challenging. What strategies have helped you build professional relationships?',
      replies: 42,
      likes: 89,
      views: 678,
      timestamp: '2 days ago',
      tags: ['Networking', 'Career Development', 'Soft Skills'],
      isAnswered: false,
      isPinned: true,
      lastActivity: '30 min ago',
    },
    {
      id: 5,
      title: 'Remote work opportunities in UAE government?',
      author: 'Omar Abdullah',
      avatar: '👨',
      category: 'Career Advice',
      categoryIcon: '💼',
      content: 'Are there remote or hybrid work opportunities available in UAE government positions? What has been your experience?',
      replies: 15,
      likes: 28,
      views: 234,
      timestamp: '3 days ago',
      tags: ['Remote Work', 'Government', 'Work-Life Balance'],
      isAnswered: false,
      isPinned: false,
      lastActivity: '2 hours ago',
    },
    {
      id: 6,
      title: 'Cybersecurity career path in UAE - Your experiences?',
      author: 'Fatima Al Zaabi',
      avatar: '👩‍💼',
      category: 'Technology',
      categoryIcon: '💻',
      content: 'Interested in pursuing a career in cybersecurity. What certifications and skills are most valued by UAE employers?',
      replies: 19,
      likes: 41,
      views: 389,
      timestamp: '4 days ago',
      tags: ['Cybersecurity', 'Career Path', 'Certifications'],
      isAnswered: true,
      isPinned: false,
      lastActivity: '4 hours ago',
    },
  ];

  const popularDiscussions = discussions.sort((a, b) => b.likes - a.likes).slice(0, 5);
  const myPosts = discussions.filter(d => d.author === user.name);

  const recentActivity = [
    {
      id: 1,
      user: 'Dr. Ahmed Al Mansouri',
      avatar: '👨‍💼',
      action: 'replied to',
      discussion: 'Best practices for transitioning to cloud architecture?',
      time: '5 min ago',
    },
    {
      id: 2,
      user: 'Eng. Sara Mohammed',
      avatar: '👩‍💻',
      action: 'liked',
      discussion: 'Networking tips for introverts in tech?',
      time: '15 min ago',
    },
    {
      id: 3,
      user: 'Ms. Mariam Ahmed',
      avatar: '👩',
      action: 'created',
      discussion: 'Recommended Python courses for data science beginners?',
      time: '1 hour ago',
    },
    {
      id: 4,
      user: 'Mr. Khaled Hassan',
      avatar: '🧑‍💼',
      action: 'replied to',
      discussion: 'How to negotiate salary in government positions?',
      time: '2 hours ago',
    },
  ];

  const viewDiscussion = (discussion: any) => {
    alert(`Opening discussion: ${discussion.title}`);
  };

  const likeDiscussion = (discussion: any) => {
    alert(`Liked: ${discussion.title}`);
  };

  const createDiscussion = () => {
    alert('Creating new discussion...');
    setShowNewDiscussionModal(false);
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

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Community Hub</span>
              </div>
              <h1 className="text-4xl font-black font-playfair mb-2">Discussion Forums</h1>
              <p className="text-gray-300">Connect, share knowledge, and grow together</p>
            </div>
            <Button onClick={() => setShowNewDiscussionModal(true)} className="bg-red-600 hover:bg-red-700">
              + New Discussion
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Discussions', value: '245', icon: '💬', color: 'border-blue-500' },
            { label: 'My Posts', value: myPosts.length.toString(), icon: '✍️', color: 'border-green-500' },
            { label: 'My Replies', value: '34', icon: '💭', color: 'border-yellow-500' },
            { label: 'Reputation Points', value: '487', icon: '⭐', color: 'border-red-500' },
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

        {/* Categories */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`p-4 rounded-xl transition-all text-left ${
                  categoryFilter === cat.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className={`font-bold text-sm ${categoryFilter === cat.id ? 'text-white' : 'text-gray-900'}`}>
                  {cat.name}
                </p>
                <p className={`text-xs ${categoryFilter === cat.id ? 'text-red-100' : 'text-gray-500'}`}>
                  {cat.count} discussions
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Tabs */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('discussions')}
                className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                  activeTab === 'discussions'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Discussions ({discussions.length})
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                  activeTab === 'popular'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Popular ({popularDiscussions.length})
              </button>
              <button
                onClick={() => setActiveTab('my-posts')}
                className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                  activeTab === 'my-posts'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                My Posts ({myPosts.length})
              </button>
            </div>
          </div>
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Discussions List */}
          <div className="lg:col-span-2 space-y-4">
            {(activeTab === 'discussions' ? discussions : activeTab === 'popular' ? popularDiscussions : myPosts).map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 hover:border-red-600 transition-all cursor-pointer"
                onClick={() => viewDiscussion(discussion)}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-4xl flex-shrink-0">{discussion.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-2">
                          {discussion.isPinned && (
                            <Badge variant="default" className="bg-yellow-100 text-yellow-700 border-yellow-300 text-xs">
                              📌 Pinned
                            </Badge>
                          )}
                          {discussion.isAnswered && (
                            <Badge variant="success" className="text-xs">
                              ✓ Answered
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 hover:text-red-600 transition-colors mb-1">
                          {discussion.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          by <span className="font-semibold">{discussion.author}</span> • {discussion.timestamp}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl">{discussion.categoryIcon}</div>
                        <Badge variant="default" className="text-xs">
                          {discussion.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">{discussion.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {discussion.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <button
                        onClick={(e) => { e.stopPropagation(); likeDiscussion(discussion); }}
                        className="flex items-center gap-1.5 hover:text-red-600 transition-colors"
                      >
                        <span className="text-lg">❤️</span>
                        <span className="font-semibold">{discussion.likes}</span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">💬</span>
                        <span className="font-semibold">{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">👁️</span>
                        <span className="font-semibold">{discussion.views} views</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Last activity: {discussion.lastActivity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white font-playfair">Recent Activity</h2>
                <p className="text-sm text-gray-400 mt-1">Latest community updates</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3 p-3 bg-gray-900 rounded-lg border border-gray-800 hover:border-red-600 transition-all">
                      <div className="text-3xl flex-shrink-0">{activity.avatar}</div>
                      <div>
                        <p className="text-sm text-white">
                          <span className="font-bold">{activity.user}</span>
                          <span className="text-gray-400"> {activity.action}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{activity.discussion}</p>
                        <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
                <h2 className="text-xl font-bold font-playfair">Community Guidelines</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <p className="text-gray-700">Be respectful and professional</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <p className="text-gray-700">Share knowledge and help others</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <p className="text-gray-700">Stay on topic and relevant</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <p className="text-gray-700">Use appropriate language</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">✗</span>
                    <p className="text-gray-700">No spam or self-promotion</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="p-6 bg-gradient-to-r from-gray-900 to-black text-white">
                <h2 className="text-xl font-bold font-playfair">Top Contributors</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { name: 'Dr. Ahmed Al Mansouri', avatar: '👨‍💼', posts: 156, reputation: 2341 },
                    { name: 'Eng. Sara Mohammed', avatar: '👩‍💻', posts: 143, reputation: 2189 },
                    { name: 'Ms. Mariam Ahmed', avatar: '👩', posts: 128, reputation: 1876 },
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="text-3xl">{contributor.avatar}</div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-gray-900">{contributor.name}</p>
                        <p className="text-xs text-gray-600">{contributor.posts} posts • {contributor.reputation} reputation</p>
                      </div>
                      <div className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Discussion Modal Placeholder */}
        {showNewDiscussionModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-600 to-red-700 text-white">
                <h2 className="text-2xl font-bold font-playfair">Create New Discussion</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <Input placeholder="What's your question or topic?" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <Select>
                    <option>Select a category</option>
                    <option>Career Advice</option>
                    <option>Skills & Learning</option>
                    <option>Technology</option>
                    <option>Networking</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <Textarea placeholder="Provide details about your discussion..." rows={6} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma separated)</label>
                  <Input placeholder="e.g., Python, Career, Networking" />
                </div>
                <div className="flex gap-3">
                  <Button onClick={createDiscussion} className="flex-1 bg-red-600 hover:bg-red-700">
                    Create Discussion
                  </Button>
                  <Button onClick={() => setShowNewDiscussionModal(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
