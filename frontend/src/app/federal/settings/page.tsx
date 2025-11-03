'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/federal/layout';
import { Card, CardHeader, CardBody } from '@/components/federal/Card';
import { Button } from '@/components/federal/Button';
import { Input } from '@/components/federal/Input';
import { Textarea } from '@/components/federal/Textarea';
import { Select, SelectOption } from '@/components/federal/Select';
import { Checkbox } from '@/components/federal/Checkbox';
import { RadioGroup, Radio } from '@/components/federal/Radio';
import { Alert } from '@/components/federal/Alert';

const languageOptions: SelectOption[] = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic (العربية)' },
];

const timezoneOptions: SelectOption[] = [
  { value: 'uae', label: 'UAE Standard Time (GST)' },
  { value: 'utc', label: 'UTC' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const user = {
    name: 'Ahmed Al Mansoori',
    email: 'ahmed.almansoori@uae.gov.ae',
    role: 'Federal Administrator',
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'account', label: 'Account', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'preferences', label: 'Preferences', icon: '🎨' },
  ];

  const handleSave = () => {
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  return (
    <DashboardLayout user={user} notificationCount={5}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-cairo">
            Settings
          </h1>
          <p className="text-gray-600 mt-1 font-noto">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Save Alert */}
        {showSaveAlert && (
          <Alert
            type="success"
            title="Settings saved successfully"
            description="Your changes have been saved and applied."
            isClosable
            onClose={() => setShowSaveAlert(false)}
          />
        )}

        {/* Settings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <Card className="lg:col-span-1 h-fit">
            <CardBody className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      text-left transition-colors
                      ${activeTab === tab.id
                        ? 'bg-federal-gold text-white font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </CardBody>
          </Card>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 font-cairo">
                    Profile Information
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-federal-gold rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        A
                      </div>
                      <div>
                        <Button size="sm" variant="bordered">
                          Change Photo
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        defaultValue="Ahmed Al Mansoori"
                        isRequired
                      />
                      <Input
                        label="Job Title"
                        defaultValue="Federal Administrator"
                      />
                      <Input
                        label="Email"
                        type="email"
                        defaultValue="ahmed.almansoori@uae.gov.ae"
                        isRequired
                      />
                      <Input
                        label="Phone"
                        defaultValue="+971 50 123 4567"
                      />
                      <Input
                        label="Department"
                        defaultValue="Federal HR Department"
                      />
                      <Input
                        label="Employee ID"
                        defaultValue="FED-2024-001"
                        isDisabled
                      />
                    </div>

                    <Textarea
                      label="Bio"
                      placeholder="Tell us about yourself..."
                      minRows={4}
                    />

                    <div className="flex justify-end gap-3">
                      <Button variant="bordered">
                        Cancel
                      </Button>
                      <Button color="primary" onPress={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 font-cairo">
                    Account Settings
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <Input
                      label="Username"
                      defaultValue="ahmed.almansoori"
                      description="This is your unique identifier"
                    />

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Change Password
                      </h3>
                      <div className="space-y-4">
                        <Input
                          label="Current Password"
                          type="password"
                        />
                        <Input
                          label="New Password"
                          type="password"
                        />
                        <Input
                          label="Confirm New Password"
                          type="password"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Two-Factor Authentication
                      </h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            2FA is currently disabled
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Button size="sm" color="primary">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="bordered">
                        Cancel
                      </Button>
                      <Button color="primary" onPress={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 font-cairo">
                    Notification Preferences
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Email Notifications
                      </h3>
                      <div className="space-y-3">
                        <Checkbox defaultSelected>
                          New application submissions
                        </Checkbox>
                        <Checkbox defaultSelected>
                          Opportunity status changes
                        </Checkbox>
                        <Checkbox>
                          Weekly summary reports
                        </Checkbox>
                        <Checkbox>
                          System maintenance alerts
                        </Checkbox>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Push Notifications
                      </h3>
                      <div className="space-y-3">
                        <Checkbox defaultSelected>
                          Urgent application reviews
                        </Checkbox>
                        <Checkbox defaultSelected>
                          Deadline reminders
                        </Checkbox>
                        <Checkbox>
                          Daily activity summary
                        </Checkbox>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Notification Frequency
                      </h3>
                      <RadioGroup name="frequency" defaultValue="realtime">
                        <Radio value="realtime">
                          Real-time (as they happen)
                        </Radio>
                        <Radio value="hourly">
                          Hourly digest
                        </Radio>
                        <Radio value="daily">
                          Daily digest
                        </Radio>
                      </RadioGroup>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="bordered">
                        Cancel
                      </Button>
                      <Button color="primary" onPress={handleSave}>
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 font-cairo">
                    Security Settings
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-green-900">
                            Your account is secure
                          </p>
                          <p className="text-xs text-green-700 mt-1">
                            Last login: Today at 9:30 AM from Abu Dhabi
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Active Sessions
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Chrome on Windows
                              </p>
                              <p className="text-xs text-gray-500">
                                Abu Dhabi, UAE • Active now
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-green-600">
                            Current
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Security Options
                      </h3>
                      <div className="space-y-3">
                        <Checkbox defaultSelected>
                          Require password on sensitive actions
                        </Checkbox>
                        <Checkbox defaultSelected>
                          Alert me of new login attempts
                        </Checkbox>
                        <Checkbox>
                          Automatically log out after 30 minutes of inactivity
                        </Checkbox>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button color="primary" onPress={handleSave}>
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 font-cairo">
                    System Preferences
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Language"
                        options={languageOptions}
                        defaultValue="en"
                      />
                      <Select
                        label="Timezone"
                        options={timezoneOptions}
                        defaultValue="uae"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Display Settings
                      </h3>
                      <div className="space-y-3">
                        <Checkbox defaultSelected>
                          Show application match scores
                        </Checkbox>
                        <Checkbox defaultSelected>
                          Enable data visualizations
                        </Checkbox>
                        <Checkbox>
                          Compact view mode
                        </Checkbox>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Data & Privacy
                      </h3>
                      <div className="space-y-3">
                        <Checkbox defaultSelected>
                          Allow usage analytics
                        </Checkbox>
                        <Checkbox>
                          Share anonymized data for research
                        </Checkbox>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="bordered">
                        Reset to Defaults
                      </Button>
                      <Button color="primary" onPress={handleSave}>
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

