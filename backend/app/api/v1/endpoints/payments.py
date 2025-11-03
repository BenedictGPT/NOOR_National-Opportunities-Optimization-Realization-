"""
NOOR Platform - Payment API Endpoints
Handles Stripe payments for token purchases and subscriptions
"""

from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel
from typing import Dict, Optional
import logging

from app.services.stripe_service import (
    StripeService,
    get_token_packages,
    get_subscription_plans
)

router = APIRouter()
logger = logging.getLogger(__name__)


# Request Models
class TokenPurchaseRequest(BaseModel):
    package_id: str
    success_url: str
    cancel_url: str


class SubscriptionRequest(BaseModel):
    plan_id: str
    success_url: str
    cancel_url: str


class CancelSubscriptionRequest(BaseModel):
    subscription_id: str


# Response Models
class CheckoutSessionResponse(BaseModel):
    session_id: str
    checkout_url: str
    details: Dict


# Endpoints
@router.get("/packages")
async def list_token_packages():
    """
    Get all available token packages
    
    Returns list of token packages with pricing
    """
    try:
        packages = get_token_packages()
        return {
            "success": True,
            "packages": packages
        }
    except Exception as e:
        logger.error(f"Error fetching packages: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/plans")
async def list_subscription_plans():
    """
    Get all available subscription plans
    
    Returns list of subscription plans with features and pricing
    """
    try:
        plans = get_subscription_plans()
        return {
            "success": True,
            "plans": plans
        }
    except Exception as e:
        logger.error(f"Error fetching plans: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/purchase-tokens", response_model=CheckoutSessionResponse)
async def purchase_tokens(request: TokenPurchaseRequest):
    """
    Create a Stripe Checkout session for token purchase
    
    Args:
        request: TokenPurchaseRequest with package_id and URLs
        
    Returns:
        CheckoutSessionResponse with session ID and checkout URL
    """
    try:
        # TODO: Get user_id from authenticated session
        user_id = "demo_user_123"  # Replace with actual user ID from auth
        
        result = StripeService.create_token_purchase_session(
            user_id=user_id,
            package_id=request.package_id,
            success_url=request.success_url,
            cancel_url=request.cancel_url
        )
        
        return CheckoutSessionResponse(
            session_id=result['session_id'],
            checkout_url=result['checkout_url'],
            details=result['package']
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating token purchase session: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/subscribe", response_model=CheckoutSessionResponse)
async def create_subscription(request: SubscriptionRequest):
    """
    Create a Stripe Checkout session for subscription
    
    Args:
        request: SubscriptionRequest with plan_id and URLs
        
    Returns:
        CheckoutSessionResponse with session ID and checkout URL
    """
    try:
        # TODO: Get user_id from authenticated session
        user_id = "demo_user_123"  # Replace with actual user ID from auth
        
        result = StripeService.create_subscription_session(
            user_id=user_id,
            plan_id=request.plan_id,
            success_url=request.success_url,
            cancel_url=request.cancel_url
        )
        
        return CheckoutSessionResponse(
            session_id=result['session_id'],
            checkout_url=result['checkout_url'],
            details=result['plan']
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating subscription session: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/cancel-subscription")
async def cancel_subscription(request: CancelSubscriptionRequest):
    """
    Cancel an active subscription
    
    Args:
        request: CancelSubscriptionRequest with subscription_id
        
    Returns:
        Success status and cancellation details
    """
    try:
        result = StripeService.cancel_subscription(request.subscription_id)
        return {
            "success": True,
            "message": "Subscription cancelled successfully",
            "details": result
        }
    except Exception as e:
        logger.error(f"Error cancelling subscription: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/subscription/{subscription_id}")
async def get_subscription(subscription_id: str):
    """
    Get subscription details
    
    Args:
        subscription_id: Stripe subscription ID
        
    Returns:
        Subscription details
    """
    try:
        details = StripeService.get_subscription_details(subscription_id)
        return {
            "success": True,
            "subscription": details
        }
    except Exception as e:
        logger.error(f"Error fetching subscription: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/webhook")
async def stripe_webhook(request: Request):
    """
    Handle Stripe webhook events
    
    This endpoint receives events from Stripe about payments,
    subscriptions, and other account activities
    """
    try:
        payload = await request.body()
        sig_header = request.headers.get('stripe-signature')
        
        if not sig_header:
            raise HTTPException(status_code=400, detail="Missing signature header")
        
        event_data = StripeService.handle_webhook_event(payload, sig_header)
        
        # Handle different event types
        event_type = event_data['type']
        
        if event_type == 'token_purchase_completed':
            # Credit tokens to user account
            user_id = event_data['user_id']
            tokens = event_data['tokens']
            logger.info(f"Crediting {tokens} tokens to user {user_id}")
            # TODO: Update user token balance in database
            
        elif event_type == 'subscription_started':
            # Activate subscription for user
            user_id = event_data['user_id']
            plan_id = event_data['plan_id']
            logger.info(f"Activating {plan_id} subscription for user {user_id}")
            # TODO: Update user subscription status in database
            
        elif event_type == 'subscription_cancelled':
            # Deactivate subscription
            subscription_id = event_data['subscription_id']
            logger.info(f"Subscription {subscription_id} cancelled")
            # TODO: Update user subscription status in database
            
        elif event_type == 'payment_succeeded':
            # Credit monthly tokens for subscription
            subscription_id = event_data['subscription_id']
            logger.info(f"Payment succeeded for subscription {subscription_id}")
            # TODO: Credit monthly tokens to user
            
        elif event_type == 'payment_failed':
            # Handle failed payment
            subscription_id = event_data['subscription_id']
            logger.warning(f"Payment failed for subscription {subscription_id}")
            # TODO: Notify user of payment failure
        
        return {"success": True, "event_type": event_type}
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error handling webhook: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def payment_health():
    """Health check for payment service"""
    return {
        "status": "healthy",
        "service": "payments",
        "stripe_configured": True
    }

