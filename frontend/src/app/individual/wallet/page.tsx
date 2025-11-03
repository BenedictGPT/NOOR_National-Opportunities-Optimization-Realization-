'use client';

import React from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Card, CardHeader, CardBody } from '@/components/individual/Card';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { fatimaTokenWallet, fatimaProgress } from '@/data/gamification-mock-data';

export default function WalletPage() {
  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const wallet = fatimaTokenWallet;
  const progress = fatimaProgress;

  return (
    <DashboardLayout user={user} notificationCount={3}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-playfair mb-2">
                Token Wallet
              </h1>
              <p className="text-yellow-100 text-lg font-inter">
                Earn tokens through assessments, spend on courses
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-3 justify-end mb-2">
                <span className="text-6xl">🪙</span>
                <div className="text-7xl font-bold font-crimson">{wallet.balance}</div>
              </div>
              <div className="text-sm text-yellow-100">Available Balance</div>
            </div>
          </div>
        </div>

        {/* Wallet Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 font-crimson">
                  {wallet.totalEarned}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Earned</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 font-crimson">
                  {wallet.totalSpent}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Spent</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 font-crimson">
                  {progress.level}
                </div>
                <div className="text-sm text-gray-600 mt-1">Current Level</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 font-crimson">
                  {progress.streak.currentStreak}
                </div>
                <div className="text-sm text-gray-600 mt-1">Day Streak</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Earning Potential */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="text-5xl">💰</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 font-playfair text-lg">
                  Earning Potential
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Complete the remaining 5 assessments to earn up to <strong>500 more tokens</strong>!
                </p>
                <div className="flex items-center gap-2">
                  <Button size="sm" color="primary">
                    View Assessments
                  </Button>
                  <span className="text-xs text-gray-600">
                    Current streak bonus: +{Math.round((progress.streak.bonusMultiplier - 1) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Transaction History
              </h2>
              <Badge color="primary" variant="flat">
                {wallet.transactions.length} transactions
              </Badge>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {wallet.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    transaction.type === 'earn'
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        transaction.type === 'earn' ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      {transaction.type === 'earn' ? '📈' : '📚'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{transaction.source}</div>
                      <div className="text-sm text-gray-600">{transaction.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(transaction.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${
                        transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'earn' ? '+' : '-'}
                      {transaction.amount} 🪙
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Progress to Next Level */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">
              Level Progress
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-individual-red">
                    Level {progress.level}
                  </div>
                  <div className="text-sm text-gray-600">
                    {progress.experiencePoints} / {progress.nextLevelXP} XP
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-600">
                    Level {progress.level + 1}
                  </div>
                  <div className="text-sm text-gray-500">
                    {progress.nextLevelXP - progress.experiencePoints} XP to go
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-individual-red to-individual-beige h-4 rounded-full transition-all"
                  style={{ width: `${(progress.experiencePoints / progress.nextLevelXP) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{progress.assessmentsCompleted}</div>
                  <div className="text-gray-600">Assessments</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{progress.coursesCompleted}</div>
                  <div className="text-gray-600">Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{progress.achievements.length}</div>
                  <div className="text-gray-600">Achievements</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Achievements
              </h2>
              <Badge color="success" variant="flat">
                {progress.achievements.length} unlocked
              </Badge>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {progress.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="border-2 border-green-200 bg-green-50 rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl mb-2">{achievement.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  <Badge color="success" variant="flat" size="sm">
                    +{achievement.tokenReward} 🪙
                  </Badge>
                  {achievement.unlockedAt && (
                    <div className="text-xs text-gray-500 mt-2">
                      Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Streak Bonus */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-400">
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="text-5xl">🔥</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 font-playfair text-lg">
                  {progress.streak.currentStreak}-Day Streak!
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  You're on fire! Keep your streak going to earn bonus tokens on every assessment.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Current Bonus:</span>{' '}
                    <span className="text-orange-600">+{Math.round((progress.streak.bonusMultiplier - 1) * 100)}%</span>
                  </div>
                  <div>
                    <span className="font-semibold">Longest Streak:</span>{' '}
                    <span className="text-blue-600">{progress.streak.longestStreak} days</span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button color="primary" fullWidth>
            Earn More Tokens
          </Button>
          <Button variant="bordered" fullWidth>
            Browse Courses
          </Button>
          <Button variant="bordered" fullWidth>
            View Leaderboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

