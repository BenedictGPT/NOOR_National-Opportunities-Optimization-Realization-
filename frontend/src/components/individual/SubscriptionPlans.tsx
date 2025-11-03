import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  tokens_per_month: number;
  popular?: boolean;
  color: string;
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 9.99,
    interval: 'month',
    tokens_per_month: 50,
    color: 'gray',
    features: [
      '50 tokens per month',
      'Access to beginner courses',
      'Basic assessments',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Professional Plan',
    price: 29.99,
    interval: 'month',
    tokens_per_month: 200,
    color: 'red',
    popular: true,
    features: [
      '200 tokens per month',
      'Access to all courses',
      'Advanced assessments',
      'Priority support',
      'Team challenges',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 99.99,
    interval: 'month',
    tokens_per_month: -1,
    color: 'gold',
    features: [
      'Unlimited tokens',
      'Access to all courses',
      'All assessments',
      '24/7 priority support',
      'Team challenges',
      'Personal AI coach',
      'Custom learning paths',
    ],
  },
];

export const SubscriptionPlans: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: planId,
          success_url: `${window.location.origin}/individual/dashboard?subscription=success`,
          cancel_url: `${window.location.origin}/individual/dashboard?subscription=cancelled`,
        }),
      });

      const data = await response.json();
      
      if (data.checkout_url) {
        // Redirect to Stripe Checkout
        window.location.href = data.checkout_url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('Failed to initiate subscription. Please try again.');
      setLoading(null);
    }
  };

  const getBorderColor = (color: string) => {
    switch (color) {
      case 'red': return 'border-red-500';
      case 'gold': return 'border-yellow-500';
      default: return 'border-gray-300';
    }
  };

  const getButtonColor = (color: string) => {
    switch (color) {
      case 'red': return 'primary';
      case 'gold': return 'primary';
      default: return 'secondary';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Plan</h2>
        <p className="text-xl text-gray-600">Unlock unlimited learning potential</p>
        <p className="text-sm text-gray-500 mt-2">Cancel anytime • No hidden fees • Secure payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? `border-2 ${getBorderColor(plan.color)}` : ''} hover:shadow-xl transition-shadow`}
          >
            {plan.popular && (
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-${plan.color}-500 text-white px-4 py-1 text-sm font-semibold rounded-full`}>
                ⭐ Most Popular
              </div>
            )}
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.interval}</span>
                </div>
                <div className="mt-3 text-lg font-semibold text-red-600">
                  {plan.tokens_per_month === -1 ? '🪙 Unlimited Tokens' : `🪙 ${plan.tokens_per_month} Tokens/month`}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={getButtonColor(plan.color) as any}
                fullWidth
                size="lg"
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
              >
                {loading === plan.id ? 'Processing...' : 'Subscribe Now'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-red-50 to-beige-50 rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Why Subscribe?</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">💰</div>
            <h4 className="font-semibold text-gray-900 mb-2">Save Money</h4>
            <p className="text-sm text-gray-600">Get more tokens for less compared to one-time purchases</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📈</div>
            <h4 className="font-semibold text-gray-900 mb-2">Consistent Growth</h4>
            <p className="text-sm text-gray-600">Monthly tokens encourage regular learning habits</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-semibold text-gray-900 mb-2">Priority Access</h4>
            <p className="text-sm text-gray-600">Get early access to new courses and features</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🤝</div>
            <h4 className="font-semibold text-gray-900 mb-2">Premium Support</h4>
            <p className="text-sm text-gray-600">Dedicated support team to help you succeed</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h4>
        <div className="max-w-3xl mx-auto space-y-4 text-left">
          <details className="bg-white rounded-lg p-4 shadow-sm">
            <summary className="font-semibold text-gray-900 cursor-pointer">Can I cancel anytime?</summary>
            <p className="text-gray-600 mt-2">Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
          </details>
          <details className="bg-white rounded-lg p-4 shadow-sm">
            <summary className="font-semibold text-gray-900 cursor-pointer">What happens to unused tokens?</summary>
            <p className="text-gray-600 mt-2">Unused tokens roll over to the next month, so you never lose them!</p>
          </details>
          <details className="bg-white rounded-lg p-4 shadow-sm">
            <summary className="font-semibold text-gray-900 cursor-pointer">Can I upgrade or downgrade my plan?</summary>
            <p className="text-gray-600 mt-2">Yes! You can change your plan at any time. Changes take effect at the start of your next billing cycle.</p>
          </details>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>💳 Secure payment powered by Stripe</p>
        <p className="mt-1">All transactions are encrypted and PCI compliant</p>
      </div>
    </div>
  );
};

