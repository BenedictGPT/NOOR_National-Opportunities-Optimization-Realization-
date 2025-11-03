'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Card, CardHeader, CardBody } from '@/components/individual/Card';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { availableAssessments, fatimaTokenWallet } from '@/data/gamification-mock-data';
import { FACULTY_METADATA, Faculty } from '@/types/eight-faculty-model';
import { Assessment } from '@/types/gamification';

export default function AssessmentsPage() {
  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | 'all'>('all');
  
  const wallet = fatimaTokenWallet;
  const assessments = availableAssessments;

  const filteredAssessments = selectedFaculty === 'all' 
    ? assessments 
    : assessments.filter(a => a.faculty === selectedFaculty);

  const completedCount = assessments.filter(a => a.isCompleted).length;
  const totalCount = assessments.length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'primary';
      case 'advanced': return 'danger';
      default: return 'default';
    }
  };

  const getFacultyColor = (faculty: Faculty) => {
    return FACULTY_METADATA[faculty].color;
  };

  return (
    <DashboardLayout user={user} notificationCount={3}>
      <div className="space-y-6">
        {/* Header with Token Balance */}
        <div className="bg-gradient-to-r from-individual-red to-red-700 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-playfair mb-2">
                Assessments
              </h1>
              <p className="text-red-100 text-lg font-inter">
                Complete assessments to earn tokens and unlock courses
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                <span className="text-5xl">🪙</span>
                <div className="text-6xl font-bold font-crimson">{wallet.balance}</div>
              </div>
              <div className="text-sm text-red-100">Token Balance</div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-individual-red font-crimson">
                  {completedCount}/{totalCount}
                </div>
                <div className="text-sm text-gray-600 mt-1">Assessments Completed</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 font-crimson">
                  {wallet.totalEarned}
                </div>
                <div className="text-sm text-gray-600 mt-1">Tokens Earned</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 font-crimson">
                  {wallet.totalSpent}
                </div>
                <div className="text-sm text-gray-600 mt-1">Tokens Spent</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-individual-beige font-crimson">
                  {Math.round((completedCount / totalCount) * 100)}%
                </div>
                <div className="text-sm text-gray-600 mt-1">Completion Rate</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Token Rewards Info */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="text-5xl">🏆</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 font-playfair text-lg">
                  Token Rewards System
                </h3>
                <div className="grid grid-cols-5 gap-3 text-sm">
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="font-bold text-green-600">100 🪙</div>
                    <div className="text-xs text-gray-600">90-100</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="font-bold text-blue-600">75 🪙</div>
                    <div className="text-xs text-gray-600">80-89</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-2xl mb-1">👍</div>
                    <div className="font-bold text-yellow-600">50 🪙</div>
                    <div className="text-xs text-gray-600">70-79</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-2xl mb-1">📈</div>
                    <div className="font-bold text-orange-600">25 🪙</div>
                    <div className="text-xs text-gray-600">60-69</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-2xl mb-1">💪</div>
                    <div className="font-bold text-gray-600">10 🪙</div>
                    <div className="text-xs text-gray-600">0-59</div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Faculty Filter */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">
              Filter by Faculty
            </h2>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={selectedFaculty === 'all' ? 'solid' : 'bordered'}
                color={selectedFaculty === 'all' ? 'primary' : 'default'}
                onClick={() => setSelectedFaculty('all')}
              >
                All Faculties
              </Button>
              {Object.values(Faculty).map((faculty) => {
                const metadata = FACULTY_METADATA[faculty];
                return (
                  <Button
                    key={faculty}
                    size="sm"
                    variant={selectedFaculty === faculty ? 'solid' : 'bordered'}
                    style={{
                      backgroundColor: selectedFaculty === faculty ? metadata.color : 'transparent',
                      borderColor: metadata.color,
                      color: selectedFaculty === faculty ? 'white' : metadata.color,
                    }}
                    onClick={() => setSelectedFaculty(faculty)}
                  >
                    {metadata.name}
                  </Button>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Assessments List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Available Assessments
              </h2>
              <Badge color="primary" variant="flat">
                {filteredAssessments.length} assessments
              </Badge>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAssessments.map((assessment) => {
                const metadata = FACULTY_METADATA[assessment.faculty];
                return (
                  <div
                    key={assessment.id}
                    className="border-2 rounded-lg p-4 hover:shadow-lg transition-all"
                    style={{ borderColor: metadata.color }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 font-inter">
                            {assessment.title}
                          </h3>
                          {assessment.isCompleted && (
                            <Badge color="success" variant="flat" size="sm">
                              ✓ Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {assessment.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        ⏱️ {assessment.estimatedTime} min
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        📝 {assessment.questionCount} questions
                      </span>
                      <span>•</span>
                      <Badge 
                        color={getDifficultyColor(assessment.difficulty)} 
                        variant="flat" 
                        size="sm"
                      >
                        {assessment.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                          style={{ backgroundColor: metadata.color }}
                        >
                          {metadata.name}
                        </div>
                        <div className="flex items-center gap-1 text-lg font-bold text-yellow-600">
                          🪙 {assessment.tokenReward}
                        </div>
                      </div>
                      {assessment.isCompleted ? (
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Last Score</div>
                          <div className="text-2xl font-bold text-green-600">
                            {assessment.lastAttempt?.score}
                          </div>
                        </div>
                      ) : (
                        <Button size="sm" color="primary">
                          Start Assessment
                        </Button>
                      )}
                    </div>

                    {assessment.isCompleted && assessment.lastAttempt && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>
                            Completed: {new Date(assessment.lastAttempt.completedAt!).toLocaleDateString()}
                          </span>
                          <span className="text-green-600 font-semibold">
                            Earned: 🪙 {assessment.lastAttempt.tokensEarned}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button color="primary" fullWidth>
            View My Progress
          </Button>
          <Button variant="bordered" fullWidth>
            Browse Learning Center
          </Button>
          <Button variant="bordered" fullWidth>
            Join Team Challenge
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

