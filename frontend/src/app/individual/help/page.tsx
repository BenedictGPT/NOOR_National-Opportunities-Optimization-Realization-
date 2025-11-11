'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { Input } from '@/components/individual/Input';
import { Textarea } from '@/components/individual/Textarea';
import { Select } from '@/components/individual/Select';

export default function HelpCenterPage() {
  const [activeTab, setActiveTab] = useState<'faq' | 'articles' | 'videos' | 'contact'>('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const faqCategories = [
    {
      id: 1,
      title: 'Getting Started',
      icon: '🚀',
      questions: [
        {
          id: 1,
          question: 'How do I create my NOOR profile?',
          answer: 'To create your NOOR profile, click on "Sign Up" from the homepage, fill in your details including your Emirates ID, email, and phone number. Then complete your profile by adding your education, work experience, and skills. Your Skills Passport will be automatically created once you verify your first skill.',
        },
        {
          id: 2,
          question: 'What is the Skills Passport?',
          answer: 'The Skills Passport is your comprehensive digital credential that showcases all your verified skills, certifications, work experience, and achievements. It helps employers quickly understand your capabilities and matches you with relevant job opportunities.',
        },
        {
          id: 3,
          question: 'How do I verify my skills?',
          answer: 'You can verify your skills through three methods: 1) Complete skills assessments in the Assessment Center, 2) Upload certificates from recognized institutions, 3) Request endorsements from colleagues or supervisors who can vouch for your abilities.',
        },
      ],
    },
    {
      id: 2,
      title: 'Job Applications',
      icon: '💼',
      questions: [
        {
          id: 4,
          question: 'How do I apply for a job?',
          answer: 'Browse available positions in the Jobs section, click on a job that interests you, review the requirements, and click "Apply". Your Skills Passport information will be automatically included. You can also attach additional documents like cover letters if needed.',
        },
        {
          id: 5,
          question: 'Can I track my application status?',
          answer: 'Yes! Go to "My Applications" in your dashboard to see all your submitted applications and their current status (Under Review, Interview Scheduled, Accepted, etc.). You\'ll also receive notifications when your application status changes.',
        },
        {
          id: 6,
          question: 'What does the job match percentage mean?',
          answer: 'The match percentage indicates how well your skills and experience align with the job requirements. It\'s calculated based on your verified skills, experience level, education, and other relevant factors. Higher percentages mean you\'re a stronger candidate for that position.',
        },
      ],
    },
    {
      id: 3,
      title: 'Learning & Development',
      icon: '📚',
      questions: [
        {
          id: 7,
          question: 'Are the courses free?',
          answer: 'Yes! All courses in the NOOR Learning Center are free for UAE citizens and residents. The platform is sponsored by the UAE government to support national talent development and career growth.',
        },
        {
          id: 8,
          question: 'Do I get certificates for completing courses?',
          answer: 'Yes, you receive a digital certificate upon successful completion of each course. These certificates are automatically added to your Skills Passport and can be shared on social media or downloaded as PDF.',
        },
        {
          id: 9,
          question: 'How long do I have access to course materials?',
          answer: 'You have lifetime access to all course materials once you enroll. You can learn at your own pace and revisit content whenever you need a refresher.',
        },
      ],
    },
    {
      id: 4,
      title: 'Account & Settings',
      icon: '⚙️',
      questions: [
        {
          id: 10,
          question: 'How do I change my password?',
          answer: 'Go to Settings > Security, click "Change Password", enter your current password, then your new password twice to confirm. Make sure your new password is at least 8 characters and includes letters, numbers, and special characters.',
        },
        {
          id: 11,
          question: 'Can I make my profile private?',
          answer: 'You have granular privacy controls in Settings > Privacy. You can choose to hide your profile from public searches, control who can see your contact information, and manage which parts of your Skills Passport are visible to employers.',
        },
        {
          id: 12,
          question: 'How do I delete my account?',
          answer: 'If you wish to delete your account, go to Settings > Account > Delete Account. Please note this action is permanent and cannot be undone. All your data, applications, and progress will be permanently removed.',
        },
      ],
    },
  ];

  const helpArticles = [
    {
      id: 1,
      title: 'Complete Guide to Building Your Skills Passport',
      category: 'Skills & Profile',
      icon: '📋',
      readTime: '10 min read',
      views: 2341,
      helpful: 187,
      description: 'Learn how to create a comprehensive Skills Passport that stands out to employers.',
    },
    {
      id: 2,
      title: 'Mastering the Job Application Process',
      category: 'Career Development',
      icon: '💼',
      readTime: '8 min read',
      views: 1876,
      helpful: 154,
      description: 'Step-by-step guide to submitting winning job applications on NOOR.',
    },
    {
      id: 3,
      title: 'How to Excel in Skills Assessments',
      category: 'Assessments',
      icon: '📊',
      readTime: '12 min read',
      views: 1543,
      helpful: 142,
      description: 'Tips and strategies for acing your skills assessments and earning certifications.',
    },
    {
      id: 4,
      title: 'Maximizing Your Learning Journey',
      category: 'Learning',
      icon: '🎓',
      readTime: '7 min read',
      views: 1234,
      helpful: 128,
      description: 'Best practices for getting the most out of NOOR Learning Center courses.',
    },
    {
      id: 5,
      title: 'Networking Tips for Career Growth',
      category: 'Networking',
      icon: '🤝',
      readTime: '9 min read',
      views: 987,
      helpful: 89,
      description: 'How to leverage NOOR\'s networking features to advance your career.',
    },
    {
      id: 6,
      title: 'Understanding NOOR Tokens and Rewards',
      category: 'Tokens & Rewards',
      icon: '🪙',
      readTime: '6 min read',
      views: 856,
      helpful: 76,
      description: 'Everything you need to know about earning and spending NOOR Tokens.',
    },
  ];

  const videoTutorials = [
    {
      id: 1,
      title: 'Getting Started with NOOR - Complete Walkthrough',
      duration: '15:32',
      views: 4521,
      thumbnail: '🎥',
      category: 'Getting Started',
    },
    {
      id: 2,
      title: 'How to Create Your Skills Passport',
      duration: '8:45',
      views: 3214,
      thumbnail: '🎥',
      category: 'Skills & Profile',
    },
    {
      id: 3,
      title: 'Job Search and Application Tutorial',
      duration: '12:18',
      views: 2876,
      thumbnail: '🎥',
      category: 'Jobs',
    },
    {
      id: 4,
      title: 'Navigating the Learning Center',
      duration: '10:22',
      views: 2341,
      thumbnail: '🎥',
      category: 'Learning',
    },
    {
      id: 5,
      title: 'Taking Skills Assessments',
      duration: '9:15',
      views: 1987,
      thumbnail: '🎥',
      category: 'Assessments',
    },
    {
      id: 6,
      title: 'Using the Mentorship Program',
      duration: '11:40',
      views: 1654,
      thumbnail: '🎥',
      category: 'Mentorship',
    },
  ];

  const popularTopics = [
    { id: 1, title: 'Profile Setup', icon: '👤', articles: 12 },
    { id: 2, title: 'Job Applications', icon: '💼', articles: 18 },
    { id: 3, title: 'Skills Verification', icon: '✓', articles: 15 },
    { id: 4, title: 'Learning Courses', icon: '📚', articles: 24 },
    { id: 5, title: 'Assessments', icon: '📊', articles: 10 },
    { id: 6, title: 'Troubleshooting', icon: '🔧', articles: 8 },
  ];

  const quickLinks = [
    { id: 1, title: 'Account Recovery', icon: '🔑', link: '#' },
    { id: 2, title: 'Privacy Policy', icon: '🔒', link: '#' },
    { id: 3, title: 'Terms of Service', icon: '📜', link: '#' },
    { id: 4, title: 'Community Guidelines', icon: '🤝', link: '#' },
    { id: 5, title: 'Report an Issue', icon: '⚠️', link: '#' },
    { id: 6, title: 'Feedback', icon: '💬', link: '#' },
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const submitContactForm = () => {
    alert('Your support request has been submitted. Our team will respond within 24 hours.');
    setShowContactForm(false);
  };

  const viewArticle = (article: any) => {
    alert(`Opening article: ${article.title}`);
  };

  const playVideo = (video: any) => {
    alert(`Playing video: ${video.title}`);
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
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Support</span>
            </div>
            <h1 className="text-4xl font-black font-playfair mb-2">Help Center</h1>
            <p className="text-gray-300 mb-6">Find answers, learn best practices, and get support</p>

            {/* Search Bar */}
            <div className="max-w-2xl">
              <Input
                placeholder="Search for help articles, FAQs, tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Help Articles', value: helpArticles.length.toString(), icon: '📖', color: 'border-blue-500' },
            { label: 'Video Tutorials', value: videoTutorials.length.toString(), icon: '🎥', color: 'border-green-500' },
            { label: 'FAQ Questions', value: faqCategories.reduce((acc, cat) => acc + cat.questions.length, 0).toString(), icon: '❓', color: 'border-yellow-500' },
            { label: 'Avg Response Time', value: '< 24h', icon: '⏱️', color: 'border-red-500' },
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

        {/* Popular Topics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Browse by Topic</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {popularTopics.map((topic) => (
              <button
                key={topic.id}
                className="p-4 rounded-xl bg-gray-50 hover:bg-red-50 border-2 border-gray-200 hover:border-red-600 transition-all text-center group"
              >
                <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">{topic.icon}</div>
                <p className="font-bold text-sm text-gray-900 group-hover:text-red-600 transition-colors">{topic.title}</p>
                <p className="text-xs text-gray-500">{topic.articles} articles</p>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'faq'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ❓ FAQ
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'articles'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📖 Articles
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'videos'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🎥 Videos
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
                activeTab === 'contact'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📧 Contact Support
            </button>
          </div>
        </div>

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            {faqCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
                <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold font-playfair">{category.title}</h2>
                      <p className="text-sm text-red-100">{category.questions.length} questions</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {category.questions.map((faq) => (
                      <div key={faq.id} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-red-600 transition-all">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-bold text-gray-900 pr-4">{faq.question}</span>
                          <span className="text-2xl flex-shrink-0">{expandedFaq === faq.id ? '−' : '+'}</span>
                        </button>
                        {expandedFaq === faq.id && (
                          <div className="p-4 bg-gray-50 border-t-2 border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-300">
                              <p className="text-xs text-gray-500">Was this helpful?</p>
                              <Button size="sm" variant="outline" className="text-xs">
                                👍 Yes
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs">
                                👎 No
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {helpArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-red-600 transition-all cursor-pointer" onClick={() => viewArticle(article)}>
                <div className="p-6 bg-gradient-to-r from-gray-900 to-black text-white">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{article.icon}</div>
                    <Badge variant="default" className="bg-white/20 text-white border-white/30 text-xs">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-red-600 transition-colors">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{article.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <span className="text-lg">⏱️</span>
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-lg">👁️</span>
                        {article.views} views
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">👍</span>
                      <span className="font-semibold">{article.helpful}</span>
                    </div>
                  </div>

                  <Button size="sm" className="w-full mt-4 bg-red-600 hover:bg-red-700">
                    Read Article →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {videoTutorials.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-red-600 transition-all cursor-pointer group" onClick={() => playVideo(video)}>
                <div className="relative bg-gradient-to-br from-red-600 to-red-700 aspect-video flex items-center justify-center">
                  <div className="text-8xl opacity-50">{video.thumbnail}</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-l-8 border-l-red-600 border-y-6 border-y-transparent ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-xs font-bold rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <Badge variant="default" className="mb-2 text-xs">
                    {video.category}
                  </Badge>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{video.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="text-sm">👁️</span>
                    {video.views} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Support Tab */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
                <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <h2 className="text-2xl font-bold font-playfair">Contact Support</h2>
                  <p className="text-sm text-red-100 mt-1">Get help from our support team</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                      <Input placeholder="What do you need help with?" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                      <Select>
                        <option>Select a category</option>
                        <option>Account & Login</option>
                        <option>Job Applications</option>
                        <option>Skills Passport</option>
                        <option>Learning & Courses</option>
                        <option>Technical Issue</option>
                        <option>Other</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                      <Textarea placeholder="Describe your issue or question in detail..." rows={6} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                      <Select>
                        <option>Normal</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </Select>
                    </div>
                    <Button onClick={submitContactForm} className="w-full bg-red-600 hover:bg-red-700">
                      Submit Request
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-xl font-bold text-white font-playfair">Contact Information</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3 text-white">
                    <div className="text-2xl">📧</div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-semibold">support@noor.gov.ae</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-white">
                    <div className="text-2xl">📞</div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="font-semibold">800-NOOR (6667)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-white">
                    <div className="text-2xl">⏰</div>
                    <div>
                      <p className="text-sm text-gray-400">Working Hours</p>
                      <p className="font-semibold">Sun - Thu: 8AM - 6PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-6 bg-gradient-to-r from-gray-900 to-black text-white">
                  <h3 className="text-xl font-bold font-playfair">Quick Links</h3>
                </div>
                <div className="p-6 space-y-2">
                  {quickLinks.map((link) => (
                    <button
                      key={link.id}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-600 transition-all text-left"
                    >
                      <div className="text-xl">{link.icon}</div>
                      <span className="font-semibold text-sm text-gray-900">{link.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
