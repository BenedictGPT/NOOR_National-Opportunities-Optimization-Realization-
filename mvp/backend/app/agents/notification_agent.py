"""
Notification Agent for NOOR Platform

This agent handles all notification delivery:
- Email notifications (SendGrid)
- SMS notifications (Twilio)
- In-app notifications
- Push notifications
- Notification templates and scheduling
"""

import logging
from typing import Dict, List, Any, Optional
from datetime import datetime
from enum import Enum

from app.agents.base_agent import BaseAgent, AgentCapability, AgentStatus
from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


class NotificationType(str, Enum):
    """Types of notifications"""
    EMAIL = "email"
    SMS = "sms"
    IN_APP = "in_app"
    PUSH = "push"


class NotificationPriority(str, Enum):
    """Notification priority levels"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class NotificationAgent(BaseAgent):
    """Agent for handling all notification delivery"""
    
    def __init__(self):
        super().__init__(
            agent_id="notification-001",
            name="Notification Agent",
            description="Handles email, SMS, in-app, and push notifications",
            capabilities=[
                AgentCapability.NOTIFICATION,
                AgentCapability.EMAIL,
                AgentCapability.SMS
            ]
        )
        self.email_enabled = settings.ENABLE_EMAIL_NOTIFICATIONS
        self.sms_enabled = settings.ENABLE_SMS_NOTIFICATIONS
        
    async def execute(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute notification task
        
        Args:
            task: Task dictionary with action and parameters
            
        Returns:
            Result dictionary with delivery status
        """
        try:
            self.status = AgentStatus.BUSY
            action = task.get("action")
            parameters = task.get("parameters", {})
            
            logger.info(f"Notification Agent executing: {action}")
            
            # Route to appropriate method
            if action == "send_email":
                result = await self.send_email(
                    to=parameters.get("to"),
                    subject=parameters.get("subject"),
                    body=parameters.get("body"),
                    template=parameters.get("template"),
                    data=parameters.get("data", {})
                )
            elif action == "send_sms":
                result = await self.send_sms(
                    to=parameters.get("to"),
                    message=parameters.get("message")
                )
            elif action == "send_verification_email":
                result = await self.send_verification_email(
                    user_email=parameters.get("user_email"),
                    verification_code=parameters.get("verification_code")
                )
            elif action == "send_password_reset_email":
                result = await self.send_password_reset_email(
                    user_email=parameters.get("user_email"),
                    reset_token=parameters.get("reset_token")
                )
            elif action == "send_job_alert":
                result = await self.send_job_alert(
                    user_email=parameters.get("user_email"),
                    jobs=parameters.get("jobs", [])
                )
            elif action == "send_application_notification":
                result = await self.send_application_notification(
                    user_email=parameters.get("user_email"),
                    job_title=parameters.get("job_title"),
                    status=parameters.get("status")
                )
            elif action == "send_skill_verification_notification":
                result = await self.send_skill_verification_notification(
                    user_email=parameters.get("user_email"),
                    skill_name=parameters.get("skill_name"),
                    status=parameters.get("status")
                )
            elif action == "send_otp_sms":
                result = await self.send_otp_sms(
                    phone_number=parameters.get("phone_number"),
                    otp_code=parameters.get("otp_code")
                )
            elif action == "send_bulk_notifications":
                result = await self.send_bulk_notifications(
                    notifications=parameters.get("notifications", [])
                )
            else:
                raise ValueError(f"Unknown action: {action}")
            
            self.status = AgentStatus.IDLE
            return {
                "success": True,
                "action": action,
                "result": result,
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            self.status = AgentStatus.ERROR
            logger.error(f"Notification Agent error: {e}")
            return {
                "success": False,
                "error": str(e),
                "action": task.get("action"),
                "timestamp": datetime.utcnow().isoformat()
            }
    
    async def send_email(
        self,
        to: str,
        subject: str,
        body: str,
        template: Optional[str] = None,
        data: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Send email notification"""
        try:
            if not self.email_enabled:
                logger.info(f"[EMAIL DISABLED] Would send to {to}: {subject}")
                return {
                    "delivered": False,
                    "message": "Email notifications disabled (demo mode)",
                    "to": to,
                    "subject": subject
                }
            
            # TODO: Implement actual SendGrid integration
            logger.info(f"Sending email to {to}: {subject}")
            
            # Simulate email sending
            return {
                "delivered": True,
                "message_id": f"msg_{datetime.utcnow().timestamp()}",
                "to": to,
                "subject": subject,
                "sent_at": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error sending email: {e}")
            raise
    
    async def send_sms(self, to: str, message: str) -> Dict[str, Any]:
        """Send SMS notification"""
        try:
            if not self.sms_enabled:
                logger.info(f"[SMS DISABLED] Would send to {to}: {message}")
                return {
                    "delivered": False,
                    "message": "SMS notifications disabled (demo mode)",
                    "to": to
                }
            
            # TODO: Implement actual Twilio integration
            logger.info(f"Sending SMS to {to}: {message}")
            
            # Simulate SMS sending
            return {
                "delivered": True,
                "message_sid": f"SM{datetime.utcnow().timestamp()}",
                "to": to,
                "sent_at": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error sending SMS: {e}")
            raise
    
    async def send_verification_email(
        self,
        user_email: str,
        verification_code: str
    ) -> Dict[str, Any]:
        """Send email verification code"""
        subject = "Verify Your NOOR Platform Account"
        body = f"""
        Welcome to NOOR Platform!
        
        Please verify your email address by entering this code:
        
        {verification_code}
        
        This code will expire in 24 hours.
        
        If you didn't create an account, please ignore this email.
        
        Best regards,
        NOOR Platform Team
        """
        
        return await self.send_email(
            to=user_email,
            subject=subject,
            body=body,
            template="verification",
            data={"verification_code": verification_code}
        )
    
    async def send_password_reset_email(
        self,
        user_email: str,
        reset_token: str
    ) -> Dict[str, Any]:
        """Send password reset email"""
        reset_url = f"{settings.APP_URL}/reset-password?token={reset_token}"
        
        subject = "Reset Your NOOR Platform Password"
        body = f"""
        You requested to reset your password for NOOR Platform.
        
        Click the link below to reset your password:
        {reset_url}
        
        This link will expire in 1 hour.
        
        If you didn't request this, please ignore this email.
        
        Best regards,
        NOOR Platform Team
        """
        
        return await self.send_email(
            to=user_email,
            subject=subject,
            body=body,
            template="password_reset",
            data={"reset_url": reset_url}
        )
    
    async def send_job_alert(
        self,
        user_email: str,
        jobs: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Send job alert with matching opportunities"""
        if not jobs:
            return {"delivered": False, "message": "No jobs to alert"}
        
        job_list = "\n\n".join([
            f"• {job['title']} at {job['company']}\n"
            f"  Location: {job['location']}\n"
            f"  Match Score: {job.get('match_score', 'N/A')}%"
            for job in jobs[:5]  # Top 5 jobs
        ])
        
        subject = f"New Job Opportunities - {len(jobs)} Matches Found"
        body = f"""
        Great news! We found {len(jobs)} new job opportunities matching your profile:
        
        {job_list}
        
        View all opportunities: {settings.APP_URL}/jobs
        
        Best regards,
        NOOR Platform Team
        """
        
        return await self.send_email(
            to=user_email,
            subject=subject,
            body=body,
            template="job_alert",
            data={"jobs": jobs}
        )
    
    async def send_application_notification(
        self,
        user_email: str,
        job_title: str,
        status: str
    ) -> Dict[str, Any]:
        """Send job application status notification"""
        status_messages = {
            "submitted": "Your application has been submitted successfully",
            "reviewed": "Your application is being reviewed",
            "shortlisted": "Congratulations! You've been shortlisted",
            "interview": "You've been invited for an interview",
            "accepted": "Congratulations! Your application has been accepted",
            "rejected": "Thank you for your interest. Unfortunately, we've decided to move forward with other candidates"
        }
        
        message = status_messages.get(status, "Your application status has been updated")
        
        subject = f"Application Update: {job_title}"
        body = f"""
        {message} for the position of {job_title}.
        
        View your application: {settings.APP_URL}/applications
        
        Best regards,
        NOOR Platform Team
        """
        
        return await self.send_email(
            to=user_email,
            subject=subject,
            body=body,
            template="application_status",
            data={"job_title": job_title, "status": status}
        )
    
    async def send_skill_verification_notification(
        self,
        user_email: str,
        skill_name: str,
        status: str
    ) -> Dict[str, Any]:
        """Send skill verification status notification"""
        if status == "approved":
            message = f"Your {skill_name} skill has been verified!"
        elif status == "rejected":
            message = f"Your {skill_name} skill verification was not approved."
        else:
            message = f"Your {skill_name} skill verification status: {status}"
        
        subject = f"Skill Verification Update: {skill_name}"
        body = f"""
        {message}
        
        View your skills: {settings.APP_URL}/profile/skills
        
        Best regards,
        NOOR Platform Team
        """
        
        return await self.send_email(
            to=user_email,
            subject=subject,
            body=body,
            template="skill_verification",
            data={"skill_name": skill_name, "status": status}
        )
    
    async def send_otp_sms(
        self,
        phone_number: str,
        otp_code: str
    ) -> Dict[str, Any]:
        """Send OTP code via SMS"""
        message = f"Your NOOR Platform verification code is: {otp_code}. Valid for 10 minutes."
        
        return await self.send_sms(
            to=phone_number,
            message=message
        )
    
    async def send_bulk_notifications(
        self,
        notifications: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Send multiple notifications in bulk"""
        results = {
            "total": len(notifications),
            "successful": 0,
            "failed": 0,
            "details": []
        }
        
        for notification in notifications:
            try:
                notification_type = notification.get("type")
                
                if notification_type == NotificationType.EMAIL:
                    result = await self.send_email(
                        to=notification["to"],
                        subject=notification["subject"],
                        body=notification["body"]
                    )
                elif notification_type == NotificationType.SMS:
                    result = await self.send_sms(
                        to=notification["to"],
                        message=notification["message"]
                    )
                else:
                    result = {"delivered": False, "error": "Unknown notification type"}
                
                if result.get("delivered"):
                    results["successful"] += 1
                else:
                    results["failed"] += 1
                
                results["details"].append({
                    "notification": notification,
                    "result": result
                })
                
            except Exception as e:
                results["failed"] += 1
                results["details"].append({
                    "notification": notification,
                    "error": str(e)
                })
                logger.error(f"Error sending bulk notification: {e}")
        
        logger.info(f"Bulk notifications: {results['successful']}/{results['total']} successful")
        return results
    
    async def send_welcome_email(self, user_email: str, user_name: str) -> Dict[str, Any]:
        """Send welcome email to new user"""
        subject = "Welcome to NOOR Platform!"
        body = f"""
        Dear {user_name},
        
        Welcome to NOOR Platform - Your gateway to career opportunities in the UAE!
        
        Here's what you can do:
        • Build your professional profile
        • Add your skills and experience
        • Get AI-powered career recommendations
        • Apply to job opportunities
        • Track your applications
        
        Get started: {settings.APP_URL}/profile
        
        Best regards,
        NOOR Platform Team
        """
        
        return await self.send_email(
            to=user_email,
            subject=subject,
            body=body,
            template="welcome",
            data={"user_name": user_name}
        )


# Singleton instance
_notification_agent = None


def get_notification_agent() -> NotificationAgent:
    """Get or create Notification Agent instance"""
    global _notification_agent
    if _notification_agent is None:
        _notification_agent = NotificationAgent()
    return _notification_agent

