"""
NOOR Platform - Stripe Payment Service
Handles token purchases and subscription management
"""

import os
import stripe
from typing import Dict, Optional
from datetime import datetime

# Initialize Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sb_secret_UTXcpkk5Zk4z7rnObCj-aA_jj7wfnD6")

# Token Purchase Packages
TOKEN_PACKAGES = {
    "starter": {
        "tokens": 100,
        "price": 10.00,  # USD
        "currency": "usd",
        "name": "Starter Pack",
        "description": "100 tokens to unlock courses"
    },
    "professional": {
        "tokens": 500,
        "price": 45.00,
        "currency": "usd",
        "name": "Professional Pack",
        "description": "500 tokens with 10% bonus"
    },
    "enterprise": {
        "tokens": 1000,
        "price": 80.00,
        "currency": "usd",
        "name": "Enterprise Pack",
        "description": "1000 tokens with 20% bonus"
    }
}

# Subscription Plans
SUBSCRIPTION_PLANS = {
    "basic": {
        "name": "Basic Plan",
        "price": 9.99,
        "currency": "usd",
        "interval": "month",
        "features": [
            "50 tokens per month",
            "Access to beginner courses",
            "Basic assessments",
            "Email support"
        ],
        "tokens_per_month": 50
    },
    "pro": {
        "name": "Professional Plan",
        "price": 29.99,
        "currency": "usd",
        "interval": "month",
        "features": [
            "200 tokens per month",
            "Access to all courses",
            "Advanced assessments",
            "Priority support",
            "Team challenges"
        ],
        "tokens_per_month": 200
    },
    "premium": {
        "name": "Premium Plan",
        "price": 99.99,
        "currency": "usd",
        "interval": "month",
        "features": [
            "Unlimited tokens",
            "Access to all courses",
            "All assessments",
            "24/7 priority support",
            "Team challenges",
            "Personal AI coach",
            "Custom learning paths"
        ],
        "tokens_per_month": -1  # Unlimited
    }
}


class StripeService:
    """Service for handling Stripe payments"""
    
    @staticmethod
    def create_token_purchase_session(
        user_id: str,
        package_id: str,
        success_url: str,
        cancel_url: str
    ) -> Dict:
        """
        Create a Stripe Checkout session for token purchase
        
        Args:
            user_id: User ID making the purchase
            package_id: Token package ID (starter, professional, enterprise)
            success_url: URL to redirect after successful payment
            cancel_url: URL to redirect if payment is cancelled
            
        Returns:
            Dict with session ID and checkout URL
        """
        if package_id not in TOKEN_PACKAGES:
            raise ValueError(f"Invalid package ID: {package_id}")
        
        package = TOKEN_PACKAGES[package_id]
        
        try:
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': package['currency'],
                        'unit_amount': int(package['price'] * 100),  # Convert to cents
                        'product_data': {
                            'name': package['name'],
                            'description': package['description'],
                        },
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=success_url,
                cancel_url=cancel_url,
                client_reference_id=user_id,
                metadata={
                    'user_id': user_id,
                    'package_id': package_id,
                    'tokens': package['tokens'],
                    'type': 'token_purchase'
                }
            )
            
            return {
                'session_id': session.id,
                'checkout_url': session.url,
                'package': package
            }
            
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    @staticmethod
    def create_subscription_session(
        user_id: str,
        plan_id: str,
        success_url: str,
        cancel_url: str
    ) -> Dict:
        """
        Create a Stripe Checkout session for subscription
        
        Args:
            user_id: User ID subscribing
            plan_id: Subscription plan ID (basic, pro, premium)
            success_url: URL to redirect after successful subscription
            cancel_url: URL to redirect if subscription is cancelled
            
        Returns:
            Dict with session ID and checkout URL
        """
        if plan_id not in SUBSCRIPTION_PLANS:
            raise ValueError(f"Invalid plan ID: {plan_id}")
        
        plan = SUBSCRIPTION_PLANS[plan_id]
        
        try:
            # Create or retrieve Stripe product and price
            product = stripe.Product.create(
                name=plan['name'],
                description=f"{plan['tokens_per_month']} tokens per month" if plan['tokens_per_month'] > 0 else "Unlimited tokens"
            )
            
            price = stripe.Price.create(
                product=product.id,
                unit_amount=int(plan['price'] * 100),
                currency=plan['currency'],
                recurring={'interval': plan['interval']},
            )
            
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price': price.id,
                    'quantity': 1,
                }],
                mode='subscription',
                success_url=success_url,
                cancel_url=cancel_url,
                client_reference_id=user_id,
                metadata={
                    'user_id': user_id,
                    'plan_id': plan_id,
                    'tokens_per_month': plan['tokens_per_month'],
                    'type': 'subscription'
                }
            )
            
            return {
                'session_id': session.id,
                'checkout_url': session.url,
                'plan': plan
            }
            
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    @staticmethod
    def handle_webhook_event(payload: bytes, sig_header: str) -> Dict:
        """
        Handle Stripe webhook events
        
        Args:
            payload: Raw request body
            sig_header: Stripe signature header
            
        Returns:
            Dict with event type and data
        """
        webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
        
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        except ValueError:
            raise ValueError("Invalid payload")
        except stripe.error.SignatureVerificationError:
            raise ValueError("Invalid signature")
        
        # Handle different event types
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            return StripeService._handle_checkout_completed(session)
        
        elif event['type'] == 'customer.subscription.created':
            subscription = event['data']['object']
            return StripeService._handle_subscription_created(subscription)
        
        elif event['type'] == 'customer.subscription.updated':
            subscription = event['data']['object']
            return StripeService._handle_subscription_updated(subscription)
        
        elif event['type'] == 'customer.subscription.deleted':
            subscription = event['data']['object']
            return StripeService._handle_subscription_cancelled(subscription)
        
        elif event['type'] == 'invoice.payment_succeeded':
            invoice = event['data']['object']
            return StripeService._handle_payment_succeeded(invoice)
        
        elif event['type'] == 'invoice.payment_failed':
            invoice = event['data']['object']
            return StripeService._handle_payment_failed(invoice)
        
        return {'type': event['type'], 'handled': False}
    
    @staticmethod
    def _handle_checkout_completed(session: Dict) -> Dict:
        """Handle successful checkout completion"""
        user_id = session['metadata']['user_id']
        payment_type = session['metadata']['type']
        
        if payment_type == 'token_purchase':
            tokens = int(session['metadata']['tokens'])
            package_id = session['metadata']['package_id']
            
            return {
                'type': 'token_purchase_completed',
                'user_id': user_id,
                'tokens': tokens,
                'package_id': package_id,
                'amount_paid': session['amount_total'] / 100,
                'currency': session['currency']
            }
        
        elif payment_type == 'subscription':
            plan_id = session['metadata']['plan_id']
            tokens_per_month = int(session['metadata']['tokens_per_month'])
            
            return {
                'type': 'subscription_started',
                'user_id': user_id,
                'plan_id': plan_id,
                'tokens_per_month': tokens_per_month,
                'subscription_id': session['subscription']
            }
        
        return {'type': 'checkout_completed', 'handled': True}
    
    @staticmethod
    def _handle_subscription_created(subscription: Dict) -> Dict:
        """Handle new subscription creation"""
        return {
            'type': 'subscription_created',
            'subscription_id': subscription['id'],
            'customer_id': subscription['customer'],
            'status': subscription['status']
        }
    
    @staticmethod
    def _handle_subscription_updated(subscription: Dict) -> Dict:
        """Handle subscription update"""
        return {
            'type': 'subscription_updated',
            'subscription_id': subscription['id'],
            'status': subscription['status']
        }
    
    @staticmethod
    def _handle_subscription_cancelled(subscription: Dict) -> Dict:
        """Handle subscription cancellation"""
        return {
            'type': 'subscription_cancelled',
            'subscription_id': subscription['id'],
            'customer_id': subscription['customer']
        }
    
    @staticmethod
    def _handle_payment_succeeded(invoice: Dict) -> Dict:
        """Handle successful recurring payment"""
        return {
            'type': 'payment_succeeded',
            'subscription_id': invoice['subscription'],
            'amount_paid': invoice['amount_paid'] / 100,
            'currency': invoice['currency']
        }
    
    @staticmethod
    def _handle_payment_failed(invoice: Dict) -> Dict:
        """Handle failed recurring payment"""
        return {
            'type': 'payment_failed',
            'subscription_id': invoice['subscription'],
            'amount_due': invoice['amount_due'] / 100
        }
    
    @staticmethod
    def cancel_subscription(subscription_id: str) -> Dict:
        """
        Cancel a subscription
        
        Args:
            subscription_id: Stripe subscription ID
            
        Returns:
            Dict with cancellation details
        """
        try:
            subscription = stripe.Subscription.delete(subscription_id)
            return {
                'success': True,
                'subscription_id': subscription.id,
                'status': subscription.status
            }
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
    
    @staticmethod
    def get_subscription_details(subscription_id: str) -> Dict:
        """
        Get subscription details
        
        Args:
            subscription_id: Stripe subscription ID
            
        Returns:
            Dict with subscription details
        """
        try:
            subscription = stripe.Subscription.retrieve(subscription_id)
            return {
                'id': subscription.id,
                'status': subscription.status,
                'current_period_start': datetime.fromtimestamp(subscription.current_period_start),
                'current_period_end': datetime.fromtimestamp(subscription.current_period_end),
                'cancel_at_period_end': subscription.cancel_at_period_end
            }
        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")


# Export package and plan information
def get_token_packages() -> Dict:
    """Get all available token packages"""
    return TOKEN_PACKAGES


def get_subscription_plans() -> Dict:
    """Get all available subscription plans"""
    return SUBSCRIPTION_PLANS

