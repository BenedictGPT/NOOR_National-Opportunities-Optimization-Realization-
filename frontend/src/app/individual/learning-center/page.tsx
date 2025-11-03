'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/individual/layout';
import { Card, CardHeader, CardBody } from '@/components/individual/Card';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { Modal } from '@/components/individual/Modal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { availableCourses, fatimaTokenWallet } from '@/data/gamification-mock-data';
import { FACULTY_METADATA, Faculty } from '@/types/eight-faculty-model';
import { Course } from '@/types/gamification';

export default function LearningCenterPage() {
  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | 'all'>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const wallet = fatimaTokenWallet;
  const courses = availableCourses;

  const filteredCourses = selectedFaculty === 'all'
    ? courses
    : courses.filter(c => c.faculty === selectedFaculty);

  const myCourses = courses.filter(c => c.isPurchased);
  const availableToUnlock = courses.filter(c => !c.isPurchased && c.tokenCost <= wallet.balance);

  const handleUnlock = (course: Course) => {
    setSelectedCourse(course);
    onOpen();
  };

  const confirmUnlock = () => {
    // In real app, this would call an API
    alert(`Course "${selectedCourse?.title}" unlocked! -${selectedCourse?.tokenCost} tokens`);
    onClose();
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'success';
      case 'intermediate': return 'primary';
      case 'advanced': return 'danger';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout user={user} notificationCount={3}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-individual-red to-red-700 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-playfair mb-2">
                Learning Center
              </h1>
              <p className="text-red-100 text-lg font-inter">
                Unlock courses with tokens, expand your skills
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                <span className="text-5xl">🪙</span>
                <div className="text-6xl font-bold font-crimson">{wallet.balance}</div>
              </div>
              <div className="text-sm text-red-100">Available Tokens</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-individual-red font-crimson">
                  {myCourses.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">My Courses</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 font-crimson">
                  {availableToUnlock.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Can Unlock Now</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 font-crimson">
                  {courses.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Courses</div>
              </div>
            </CardBody>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 font-crimson">
                  {Math.round(myCourses.reduce((sum, c) => sum + c.progress, 0) / myCourses.length) || 0}%
                </div>
                <div className="text-sm text-gray-600 mt-1">Avg Progress</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* My Courses */}
        {myCourses.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                  My Courses
                </h2>
                <Badge color="success" variant="flat">
                  {myCourses.length} enrolled
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myCourses.map((course) => {
                  const metadata = FACULTY_METADATA[course.faculty];
                  return (
                    <div
                      key={course.id}
                      className="border-2 rounded-lg p-4 hover:shadow-lg transition-all"
                      style={{ borderColor: metadata.color }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1 font-inter">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {course.description}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${course.progress}%`,
                              backgroundColor: metadata.color,
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>⏱️ {course.duration}h</span>
                          <span>•</span>
                          <span>⭐ {course.rating}</span>
                          <span>•</span>
                          <Badge color={getLevelColor(course.level)} variant="flat" size="sm">
                            {course.level}
                          </Badge>
                        </div>
                        <Button size="sm" color="primary">
                          Continue
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        )}

        {/* Faculty Filter */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">
              Browse by Faculty
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

        {/* Available Courses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                Available Courses
              </h2>
              <Badge color="primary" variant="flat">
                {filteredCourses.length} courses
              </Badge>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => {
                const metadata = FACULTY_METADATA[course.faculty];
                const canAfford = course.tokenCost <= wallet.balance;
                const isLocked = !course.isPurchased;

                return (
                  <div
                    key={course.id}
                    className={`border-2 rounded-lg p-4 hover:shadow-lg transition-all ${
                      isLocked ? 'opacity-90' : ''
                    }`}
                    style={{ borderColor: metadata.color }}
                  >
                    {/* Course Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 font-inter text-sm">
                            {course.title}
                          </h3>
                          {course.isPurchased && (
                            <Badge color="success" variant="flat" size="sm">
                              ✓
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
                      <span>⏱️ {course.duration}h</span>
                      <span>•</span>
                      <span>⭐ {course.rating}</span>
                      <span>•</span>
                      <span>👥 {course.enrolledCount}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="px-2 py-1 rounded text-xs text-white font-semibold"
                        style={{ backgroundColor: metadata.color }}
                      >
                        {metadata.name}
                      </div>
                      <Badge color={getLevelColor(course.level)} variant="flat" size="sm">
                        {course.level}
                      </Badge>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl">🪙</span>
                        <span className={`text-lg font-bold ${
                          canAfford ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {course.tokenCost}
                        </span>
                      </div>
                      {course.isPurchased ? (
                        <Button size="sm" color="primary">
                          Continue
                        </Button>
                      ) : canAfford ? (
                        <Button 
                          size="sm" 
                          color="primary"
                          onClick={() => handleUnlock(course)}
                        >
                          Unlock
                        </Button>
                      ) : (
                        <Button size="sm" variant="bordered" disabled>
                          🔒 Locked
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Unlock Modal */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="md"
          title="Unlock Course"
        >
          {selectedCourse && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCourse.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedCourse.description}
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Course Cost:</span>
                    <span className="text-2xl font-bold text-red-600">
                      🪙 {selectedCourse.tokenCost}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Current Balance:</span>
                    <span className="text-2xl font-bold text-green-600">
                      🪙 {wallet.balance}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Remaining Balance:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        🪙 {wallet.balance - selectedCourse.tokenCost}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-center gap-4">
                    <span>⏱️ {selectedCourse.duration} hours</span>
                    <span>•</span>
                    <span>⭐ {selectedCourse.rating}/5.0</span>
                    <span>•</span>
                    <span>👥 {selectedCourse.enrolledCount} enrolled</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="bordered" fullWidth onClick={onClose}>
                  Cancel
                </Button>
                <Button color="primary" fullWidth onClick={confirmUnlock}>
                  Confirm Unlock
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Call to Action */}
        {availableToUnlock.length === 0 && (
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400">
            <CardBody>
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-playfair">
                  Earn More Tokens!
                </h3>
                <p className="text-gray-700 mb-4">
                  Complete assessments to earn tokens and unlock more courses
                </p>
                <Button color="primary">
                  Take Assessments
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

