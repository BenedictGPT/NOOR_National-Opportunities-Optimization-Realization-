'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/federal/Button';
import { Input } from '@/components/federal/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/federal/Card';

export default function FederalLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implement actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Redirect to dashboard
      window.location.href = '/federal/dashboard';
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <Image
              src="/shared/brand-assets/federal/logo-navy-gold.png"
              alt="NOOR Federal Government"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Login Card */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-center">Federal Government Portal</CardTitle>
            <CardDescription className="text-center">
              Sign in to access the NOOR Platform
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-md bg-error/10 border border-error text-error text-sm">
                  {error}
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                placeholder="your.email@government.ae"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-neutral-600">Remember me</span>
                </label>
                <Link href="/federal/forgot-password" className="text-sm text-primary-500 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                Sign In
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-neutral-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  fullWidth
                  leftIcon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    </svg>
                  }
                >
                  UAE Pass
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col space-y-2">
            <div className="text-sm text-center text-neutral-600">
              Need access?{' '}
              <Link href="/federal/request-access" className="text-primary-500 hover:underline font-medium">
                Request Access
              </Link>
            </div>
            <div className="text-xs text-center text-neutral-500">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline">Privacy Policy</Link>
            </div>
          </CardFooter>
        </Card>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-white/80">
          <Link href="/individual/login" className="hover:text-white mx-2">
            Individual Portal
          </Link>
          <span>•</span>
          <Link href="/institutional/login" className="hover:text-white mx-2">
            Employer Portal
          </Link>
          <span>•</span>
          <Link href="/help" className="hover:text-white mx-2">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}

