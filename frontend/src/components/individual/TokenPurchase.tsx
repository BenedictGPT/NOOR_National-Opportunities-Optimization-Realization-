import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';

interface TokenPackage {
  id: string;
  tokens: number;
  price: number;
  name: string;
  description: string;
  popular?: boolean;
}

const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: 'starter',
    tokens: 100,
    price: 10.00,
    name: 'Starter Pack',
    description: '100 tokens to unlock courses',
  },
  {
    id: 'professional',
    tokens: 500,
    price: 45.00,
    name: 'Professional Pack',
    description: '500 tokens with 10% bonus',
    popular: true,
  },
  {
    id: 'enterprise',
    tokens: 1000,
    price: 80.00,
    name: 'Enterprise Pack',
    description: '1000 tokens with 20% bonus',
  },
];

export const TokenPurchase: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (packageId: string) => {
    setLoading(packageId);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/purchase-tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package_id: packageId,
          success_url: `${window.location.origin}/individual/wallet?payment=success`,
          cancel_url: `${window.location.origin}/individual/wallet?payment=cancelled`,
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
      console.error('Error creating checkout session:', error);
      alert('Failed to initiate purchase. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Purchase Tokens</h2>
        <p className="text-gray-600">Unlock courses and accelerate your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TOKEN_PACKAGES.map((pkg) => (
          <Card key={pkg.id} className={`relative ${pkg.popular ? 'border-2 border-red-500' : ''}`}>
            {pkg.popular && (
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                Most Popular
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-gray-600 ml-2">USD</span>
                </div>
                <div className="text-2xl font-semibold text-red-600 mt-2">
                  🪙 {pkg.tokens} Tokens
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  ${(pkg.price / pkg.tokens).toFixed(3)} per token
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={() => handlePurchase(pkg.id)}
                disabled={loading === pkg.id}
              >
                {loading === pkg.id ? 'Processing...' : 'Purchase Now'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Purchase Tokens?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start">
            <span className="text-2xl mr-3">📚</span>
            <div>
              <h4 className="font-semibold text-gray-900">Unlock Courses</h4>
              <p className="text-sm text-gray-600">Access premium courses across all Eight Faculties</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">⚡</span>
            <div>
              <h4 className="font-semibold text-gray-900">Instant Access</h4>
              <p className="text-sm text-gray-600">Tokens are credited immediately after purchase</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">🎯</span>
            <div>
              <h4 className="font-semibold text-gray-900">Flexible Learning</h4>
              <p className="text-sm text-gray-600">Use tokens whenever you're ready to learn</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>💳 Secure payment powered by Stripe</p>
        <p className="mt-1">All transactions are encrypted and secure</p>
      </div>
    </div>
  );
};

