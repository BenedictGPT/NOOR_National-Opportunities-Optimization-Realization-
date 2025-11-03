'use client';

import React from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Card, CardHeader, CardBody } from '@/components/individual/Card';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { FACULTY_METADATA, Faculty } from '@/types/eight-faculty-model';

export default function TeamChallengesPage() {
  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const teamChallenges = [
    {
      id: 'team_001',
      title: 'Innovation Sprint Challenge',
      description: 'Collaborate with 4 team members to solve real-world innovation problems',
      faculty: Faculty.INTELLECTUAL,
      teamSize: 5,
      currentParticipants: 3,
      tokenReward: 150,
      duration: '2 hours',
      difficulty: 'advanced',
      status: 'open',
    },
    {
      id: 'team_002',
      title: 'Leadership Simulation',
      description: 'Work together to navigate complex leadership scenarios',
      faculty: Faculty.SOCIAL,
      teamSize: 4,
      currentParticipants: 4,
      tokenReward: 120,
      duration: '90 min',
      difficulty: 'intermediate',
      status: 'full',
    },
    {
      id: 'team_003',
      title: 'Ethical Dilemma Workshop',
      description: 'Discuss and resolve ethical challenges as a team',
      faculty: Faculty.MORAL,
      teamSize: 6,
      currentParticipants: 2,
      tokenReward: 100,
      duration: '1 hour',
      difficulty: 'intermediate',
      status: 'open',
    },
    {
      id: 'team_004',
      title: 'Wellness Challenge',
      description: 'Complete physical wellness goals together',
      faculty: Faculty.PHYSICAL,
      teamSize: 3,
      currentParticipants: 1,
      tokenReward: 80,
      duration: '1 week',
      difficulty: 'beginner',
      status: 'open',
    },
  ];

  const myTeams = [
    {
      id: 'myteam_001',
      title: 'Mental Agility Challenge',
      faculty: Faculty.MENTAL,
      members: [
        { name: 'Fatima Al Hashimi', role: 'leader', contribution: 95 },
        { name: 'Ahmed Al Zaabi', role: 'member', contribution: 88 },
        { name: 'Sara Al Mansoori', role: 'member', contribution: 92 },
      ],
      progress: 75,
      tokenReward: 110,
      status: 'in_progress',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'primary';
      case 'advanced': return 'danger';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'success';
      case 'full': return 'warning';
      case 'in_progress': return 'primary';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout user={user} notificationCount={3}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-playfair mb-2">
                Team Challenges
              </h1>
              <p className="text-purple-100 text-lg font-inter">
                Collaborate with others, earn bonus tokens together
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold font-crimson">{myTeams.length}</div>
              <div className="text-sm text-purple-100">Active Teams</div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-400">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="text-5xl">🤝</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 font-playfair text-lg">
                  Why Join Team Challenges?
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🪙</span>
                    <span className="text-gray-700">Earn <strong>bonus tokens</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    <span className="text-gray-700">Build <strong>social skills</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    <span className="text-gray-700">Unlock <strong>team achievements</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* My Active Teams */}
        {myTeams.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                  My Active Teams
                </h2>
                <Badge color="primary" variant="flat">
                  {myTeams.length} active
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {myTeams.map((team) => {
                  const metadata = FACULTY_METADATA[team.faculty];
                  return (
                    <div
                      key={team.id}
                      className="border-2 rounded-lg p-4"
                      style={{ borderColor: metadata.color }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 font-inter">
                              {team.title}
                            </h3>
                            <Badge color={getStatusColor(team.status)} variant="flat" size="sm">
                              {team.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div
                            className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-2"
                            style={{ backgroundColor: metadata.color }}
                          >
                            {metadata.name} Faculty
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-yellow-600">
                            🪙 {team.tokenReward}
                          </div>
                          <div className="text-xs text-gray-600">per member</div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Team Progress</span>
                          <span className="font-semibold">{team.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${team.progress}%`,
                              backgroundColor: metadata.color,
                            }}
                          />
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="space-y-2 mb-4">
                        <div className="text-sm font-semibold text-gray-700">Team Members:</div>
                        {team.members.map((member, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
                                {member.name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {member.name}
                                  {member.role === 'leader' && (
                                    <Badge color="primary" variant="flat" size="sm" className="ml-2">
                                      Leader
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Contribution: </span>
                              <span className="font-semibold text-green-600">{member.contribution}%</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button color="primary" fullWidth>
                        Continue Challenge
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        )}

        {/* Available Challenges */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Available Team Challenges
              </h2>
              <Badge color="primary" variant="flat">
                {teamChallenges.filter(c => c.status === 'open').length} open
              </Badge>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamChallenges.map((challenge) => {
                const metadata = FACULTY_METADATA[challenge.faculty];
                const spotsLeft = challenge.teamSize - challenge.currentParticipants;

                return (
                  <div
                    key={challenge.id}
                    className="border-2 rounded-lg p-4 hover:shadow-lg transition-all"
                    style={{ borderColor: metadata.color }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 font-inter">
                            {challenge.title}
                          </h3>
                          <Badge color={getStatusColor(challenge.status)} variant="flat" size="sm">
                            {challenge.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {challenge.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                        style={{ backgroundColor: metadata.color }}
                      >
                        {metadata.name}
                      </div>
                      <Badge color={getDifficultyColor(challenge.difficulty)} variant="flat" size="sm">
                        {challenge.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                      <span>⏱️ {challenge.duration}</span>
                      <span>•</span>
                      <span>👥 {challenge.currentParticipants}/{challenge.teamSize}</span>
                      {challenge.status === 'open' && (
                        <>
                          <span>•</span>
                          <span className="text-green-600 font-semibold">
                            {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl">🪙</span>
                        <span className="text-lg font-bold text-yellow-600">
                          {challenge.tokenReward}
                        </span>
                        <span className="text-xs text-gray-600">per member</span>
                      </div>
                      {challenge.status === 'open' ? (
                        <Button size="sm" color="primary">
                          Join Team
                        </Button>
                      ) : (
                        <Button size="sm" variant="bordered" disabled>
                          Team Full
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Peer Evaluation Info */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-400">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="text-5xl">⭐</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 font-playfair text-lg">
                  Peer Evaluation System
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  After completing team challenges, you'll evaluate your teammates' contributions.
                  Fair evaluations earn you bonus reputation points and unlock exclusive challenges.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-xl">🎯</span>
                    <span>Objective feedback</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl">🤝</span>
                    <span>Build trust</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl">📈</span>
                    <span>Improve skills</span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button color="primary" fullWidth>
            Create Team Challenge
          </Button>
          <Button variant="bordered" fullWidth>
            View Leaderboard
          </Button>
          <Button variant="bordered" fullWidth>
            My Team History
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

