'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/individual/layout';
import { Card, CardHeader, CardBody } from '@/components/individual/Card';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { samplePhysicalAssessment } from '@/data/gamification-mock-data';
import { AssessmentQuestion, QuestionType, getTokenReward } from '@/types/gamification';
import { FACULTY_METADATA, Faculty } from '@/types/eight-faculty-model';

export default function TakeAssessmentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const user = {
    name: 'Fatima Al Hashimi',
    email: 'fatima.alhashimi@email.ae',
    role: 'Citizen',
  };

  // Mock data - in real app, fetch based on params.id
  const assessment = {
    id: params.id,
    faculty: Faculty.PHYSICAL,
    title: 'Physical Health & Wellness Assessment',
    description: 'Evaluate your physical health awareness and wellness practices',
    questions: samplePhysicalAssessment,
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | number }>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const metadata = FACULTY_METADATA[assessment.faculty];
  const questions = assessment.questions;
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Timer
  useEffect(() => {
    if (!isComplete) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate final score
      const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
      const earnedPoints = questions.reduce((sum, q) => {
        const answer = answers[q.id];
        if (answer === undefined) return sum;
        
        // Simple scoring logic for demo
        if (q.type === QuestionType.MULTIPLE_CHOICE || q.type === QuestionType.TRUE_FALSE) {
          return sum + (answer === q.correctAnswer ? q.points : 0);
        } else if (q.type === QuestionType.LIKERT_SCALE || q.type === QuestionType.SELF_ASSESSMENT) {
          // Assume higher values are better for demo
          const numAnswer = typeof answer === 'number' ? answer : parseInt(answer);
          return sum + ((numAnswer / 4) * q.points);
        }
        return sum + q.points * 0.5; // Default partial credit
      }, 0);
      
      const score = Math.round((earnedPoints / totalPoints) * 100);
      setFinalScore(score);
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    router.push('/individual/assessments');
  };

  if (isComplete) {
    const reward = getTokenReward(finalScore);
    
    return (
      <DashboardLayout user={user} notificationCount={3}>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Completion Celebration */}
          <div 
            className="rounded-xl p-12 text-white text-center"
            style={{ background: `linear-gradient(135deg, ${metadata.color}, ${metadata.color}dd)` }}
          >
            <div className="text-8xl mb-4">{reward.badge}</div>
            <h1 className="text-5xl font-bold mb-2 font-playfair">
              Assessment Complete!
            </h1>
            <p className="text-2xl text-white/90 font-inter">
              {reward.title}
            </p>
          </div>

          {/* Results Card */}
          <Card>
            <CardBody>
              <div className="text-center py-8">
                <div className="text-7xl font-bold mb-4" style={{ color: metadata.color }}>
                  {finalScore}
                </div>
                <div className="text-2xl text-gray-600 mb-8">Your Score</div>

                <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">
                      🪙 {reward.tokens}
                    </div>
                    <div className="text-sm text-gray-600">Tokens Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {questions.length}
                    </div>
                    <div className="text-sm text-gray-600">Questions Answered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {formatTime(timeElapsed)}
                    </div>
                    <div className="text-sm text-gray-600">Time Taken</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button color="primary" size="lg" fullWidth onClick={handleFinish}>
                    View All Assessments
                  </Button>
                  <Button variant="bordered" size="lg" fullWidth onClick={() => router.push('/individual/learning-center')}>
                    Browse Learning Center
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Faculty Info */}
          <Card>
            <CardBody>
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl"
                  style={{ backgroundColor: metadata.color }}
                >
                  {metadata.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{metadata.name} Faculty</h3>
                  <p className="text-sm text-gray-600">
                    Custodian: {metadata.custodianMinistry}
                  </p>
                </div>
                <Badge color="success" variant="flat">
                  ✓ Completed
                </Badge>
              </div>
            </CardBody>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user} notificationCount={3}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div 
          className="rounded-xl p-6 text-white"
          style={{ background: `linear-gradient(135deg, ${metadata.color}, ${metadata.color}dd)` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold font-playfair">
                {assessment.title}
              </h1>
              <p className="text-white/90 font-inter">
                {metadata.name} Faculty Assessment
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-white/80">Time Elapsed</div>
            </div>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-white/90 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        {/* Question Card */}
        <Card>
          <CardBody>
            <div className="py-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex-1 font-inter">
                  {question.text}
                </h2>
                <Badge color="primary" variant="flat">
                  {question.points} pts
                </Badge>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {question.type === QuestionType.MULTIPLE_CHOICE && question.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answers[question.id] === option
                        ? 'border-individual-red bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[question.id] === option
                            ? 'border-individual-red bg-individual-red'
                            : 'border-gray-300'
                        }`}
                      >
                        {answers[question.id] === option && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}

                {question.type === QuestionType.LIKERT_SCALE && question.options && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center gap-2">
                      {question.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(index)}
                          className={`flex-1 p-4 rounded-lg border-2 text-center transition-all ${
                            answers[question.id] === index
                              ? 'border-individual-red bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-2">{index + 1}</div>
                          <div className="text-xs text-gray-600">{option}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {question.type === QuestionType.TRUE_FALSE && (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleAnswer('true')}
                      className={`p-6 rounded-lg border-2 text-center transition-all ${
                        answers[question.id] === 'true'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-4xl mb-2">✓</div>
                      <div className="font-semibold">True</div>
                    </button>
                    <button
                      onClick={() => handleAnswer('false')}
                      className={`p-6 rounded-lg border-2 text-center transition-all ${
                        answers[question.id] === 'false'
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-4xl mb-2">✗</div>
                      <div className="font-semibold">False</div>
                    </button>
                  </div>
                )}

                {question.type === QuestionType.SELF_ASSESSMENT && question.options && (
                  <div className="space-y-4">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          answers[question.id] === index
                            ? 'border-individual-red bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Explanation (if answered) */}
              {answers[question.id] !== undefined && question.explanation && (
                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">💡</span>
                    <div>
                      <div className="font-semibold text-blue-900 mb-1">Did you know?</div>
                      <p className="text-sm text-blue-800">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="bordered"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </Button>
          <div className="text-sm text-gray-600">
            {Object.keys(answers).length} of {questions.length} answered
          </div>
          <Button
            color="primary"
            onClick={handleNext}
            disabled={answers[question.id] === undefined}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next →'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

