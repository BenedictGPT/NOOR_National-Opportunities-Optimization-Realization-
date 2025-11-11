'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/individual/layout';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/individual/Card';
import { Button } from '@/components/individual/Button';
import { Badge } from '@/components/individual/Badge';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@/components/individual/Modal';
import { Textarea } from '@/components/individual/Textarea';

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  // Mock job data - In production, this would be fetched based on jobId
  const job = {
    id: jobId,
    title: 'Senior Software Engineer',
    company: 'Ministry of Artificial Intelligence',
    logo: '🤖',
    location: 'Abu Dhabi',
    locationType: 'Hybrid',
    salary: 'AED 25,000 - 35,000',
    employmentType: 'Full-time',
    experienceLevel: 'Senior Level',
    postedDate: '2 days ago',
    deadline: 'December 15, 2025',
    matchScore: 95,
    applicants: 47,
    openings: 3,
    description: `We are seeking a talented Senior Software Engineer to join our AI Innovation team. You will be responsible for designing and implementing cutting-edge AI solutions that will transform government services across the UAE.

This is an exciting opportunity to work on high-impact projects that directly contribute to the UAE's vision for digital transformation and smart government initiatives.`,
    responsibilities: [
      'Design and develop scalable AI-powered applications',
      'Lead technical architecture decisions and code reviews',
      'Mentor junior developers and contribute to team growth',
      'Collaborate with cross-functional teams on innovative projects',
      'Implement best practices for code quality and security',
      'Stay current with emerging AI and software technologies',
    ],
    requirements: [
      'Bachelor\'s or Master\'s degree in Computer Science or related field',
      '5+ years of professional software development experience',
      'Strong proficiency in Python, JavaScript, and modern frameworks',
      'Experience with AI/ML frameworks (TensorFlow, PyTorch)',
      'Excellent problem-solving and communication skills',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
    ],
    benefits: [
      'Competitive salary package',
      'Comprehensive health insurance',
      'Annual leave and public holidays',
      'Professional development opportunities',
      'Flexible working arrangements',
      'Pension and end-of-service benefits',
    ],
    skills: [
      'Python',
      'JavaScript',
      'React',
      'TensorFlow',
      'Docker',
      'AWS',
      'PostgreSQL',
      'Machine Learning',
      'System Design',
      'Agile',
    ],
    aboutCompany: `The Ministry of Artificial Intelligence is at the forefront of the UAE's digital transformation journey. We are committed to leveraging AI and emerging technologies to enhance government services and improve the quality of life for all residents.`,
  };

  const handleApply = () => {
    // In production, this would submit the application
    console.log('Application submitted with cover letter:', coverLetter);
    setIsApplyModalOpen(false);
    // Show success message
    alert('Application submitted successfully!');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    // In production, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opportunity at ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            onClick={() => router.push('/individual/jobs')}
            className="hover:text-individual-red transition-colors"
          >
            Jobs
          </button>
          <span>/</span>
          <span className="text-gray-900">{job.title}</span>
        </div>

        {/* Job Header */}
        <Card>
          <CardBody>
            <div className="flex items-start gap-6">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-individual-red to-red-700 rounded-xl flex items-center justify-center text-4xl">
                  {job.logo}
                </div>
              </div>

              {/* Job Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-playfair mb-2">
                      {job.title}
                    </h1>
                    <p className="text-xl text-gray-700 font-inter mb-3">{job.company}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        📍 {job.location} • {job.locationType}
                      </span>
                      <span className="flex items-center gap-1">
                        💼 {job.employmentType}
                      </span>
                      <span className="flex items-center gap-1">
                        📊 {job.experienceLevel}
                      </span>
                      <span className="flex items-center gap-1">
                        💰 {job.salary}
                      </span>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="text-center">
                    <div className="bg-green-100 text-green-800 rounded-full w-20 h-20 flex items-center justify-center">
                      <div>
                        <div className="text-2xl font-bold">{job.matchScore}%</div>
                        <div className="text-xs">Match</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-6">
                  <Button
                    color="primary"
                    size="lg"
                    onClick={() => setIsApplyModalOpen(true)}
                    className="px-8"
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="bordered"
                    size="lg"
                    onClick={handleSave}
                    className={isSaved ? 'border-individual-red text-individual-red' : ''}
                  >
                    {isSaved ? '❤️ Saved' : '🤍 Save Job'}
                  </Button>
                  <Button
                    variant="bordered"
                    size="lg"
                    onClick={handleShare}
                  >
                    📤 Share
                  </Button>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                  <span>Posted {job.postedDate}</span>
                  <span>•</span>
                  <span>{job.applicants} applicants</span>
                  <span>•</span>
                  <span>{job.openings} openings</span>
                  <span>•</span>
                  <span className="text-orange-600 font-medium">Deadline: {job.deadline}</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                  Job Description
                </h2>
              </CardHeader>
              <CardBody>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                </div>
              </CardBody>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                  Key Responsibilities
                </h2>
              </CardHeader>
              <CardBody>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-individual-red mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                  Requirements & Qualifications
                </h2>
              </CardHeader>
              <CardBody>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-individual-red mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                  Benefits & Perks
                </h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* About Company */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 font-playfair">
                  About {job.company}
                </h2>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700">{job.aboutCompany}</p>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Apply */}
            <Card className="border-2 border-individual-red">
              <CardBody>
                <div className="text-center space-y-4">
                  <div className="text-4xl">{job.logo}</div>
                  <h3 className="font-semibold text-gray-900">Ready to Apply?</h3>
                  <p className="text-sm text-gray-600">
                    Your profile matches {job.matchScore}% with this role
                  </p>
                  <Button
                    color="primary"
                    fullWidth
                    size="lg"
                    onClick={() => setIsApplyModalOpen(true)}
                  >
                    Apply Now
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Required Skills */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 font-playfair">
                  Required Skills
                </h3>
              </CardHeader>
              <CardBody>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="flat" color="primary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 font-playfair">
                  Job Details
                </h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-medium text-gray-900">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Work Type</p>
                    <p className="font-medium text-gray-900">{job.locationType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Employment Type</p>
                    <p className="font-medium text-gray-900">{job.employmentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Experience Level</p>
                    <p className="font-medium text-gray-900">{job.experienceLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Salary Range</p>
                    <p className="font-medium text-gray-900">{job.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Application Deadline</p>
                    <p className="font-medium text-orange-600">{job.deadline}</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 font-playfair">
                  Similar Opportunities
                </h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {[
                    { title: 'Full Stack Developer', company: 'Ministry of Interior', match: 88 },
                    { title: 'AI Engineer', company: 'Smart Dubai', match: 85 },
                    { title: 'Cloud Architect', company: 'Ministry of Education', match: 82 },
                  ].map((similar, index) => (
                    <div
                      key={index}
                      className="p-3 border border-gray-200 rounded-lg hover:border-individual-red hover:shadow-md transition-all cursor-pointer"
                      onClick={() => router.push(`/individual/jobs/${index + 2}`)}
                    >
                      <h4 className="font-medium text-sm text-gray-900">{similar.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{similar.company}</p>
                      <Badge variant="flat" color="success" size="sm" className="mt-2">
                        {similar.match}% Match
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} size="lg">
        <ModalContent>
          <ModalHeader>
            <h3 className="text-xl font-semibold font-playfair">Apply for {job.title}</h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">ℹ️</span>
                  <div>
                    <p className="font-medium text-blue-900">Your profile will be submitted</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Make sure your Skills Passport and profile are up to date for the best chance of success.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Tell the employer why you're interested in this position and what makes you a great fit..."
                  rows={8}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tip: Mention specific skills and experiences that align with the job requirements.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="useTokens" className="rounded" />
                <label htmlFor="useTokens" className="text-sm text-gray-700">
                  Use 2 tokens for priority application (faster review)
                </label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex gap-3 w-full">
              <Button
                variant="bordered"
                fullWidth
                onClick={() => setIsApplyModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                fullWidth
                onClick={handleApply}
                disabled={!coverLetter.trim()}
              >
                Submit Application
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}
