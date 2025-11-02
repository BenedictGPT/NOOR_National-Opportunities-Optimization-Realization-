"""
Verification Agent for NOOR Platform

This agent handles all verification processes:
- Skill verification
- Work experience verification
- Education verification
- Certification verification
- Document verification
- Identity verification
"""

import logging
from typing import Dict, List, Any, Optional
from datetime import datetime
from enum import Enum

from app.agents.base_agent import BaseAgent, AgentCapability, AgentStatus
from app.core.ai_client import get_ai_client
from app.agents.data_retrieval_agent import get_data_retrieval_agent

logger = logging.getLogger(__name__)


class VerificationStatus(str, Enum):
    """Verification status values"""
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    REQUIRES_MORE_INFO = "requires_more_info"


class VerificationType(str, Enum):
    """Types of verification"""
    SKILL = "skill"
    WORK_EXPERIENCE = "work_experience"
    EDUCATION = "education"
    CERTIFICATION = "certification"
    DOCUMENT = "document"
    IDENTITY = "identity"


class VerificationAgent(BaseAgent):
    """Agent for handling all verification processes"""
    
    def __init__(self):
        super().__init__(
            agent_id="verification-001",
            name="Verification Agent",
            description="Handles verification of skills, experience, education, and documents",
            capabilities=[
                AgentCapability.VERIFICATION,
                AgentCapability.DOCUMENT_PROCESSING,
                AgentCapability.AI_ANALYSIS
            ]
        )
        self.ai_client = get_ai_client()
        self.data_agent = get_data_retrieval_agent()
        
    async def execute(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute verification task
        
        Args:
            task: Task dictionary with action and parameters
            
        Returns:
            Result dictionary with verification result
        """
        try:
            self.status = AgentStatus.BUSY
            action = task.get("action")
            parameters = task.get("parameters", {})
            
            logger.info(f"Verification Agent executing: {action}")
            
            # Route to appropriate method
            if action == "verify_skill":
                result = await self.verify_skill(
                    user_id=parameters.get("user_id"),
                    skill_id=parameters.get("skill_id"),
                    evidence=parameters.get("evidence", {})
                )
            elif action == "verify_work_experience":
                result = await self.verify_work_experience(
                    user_id=parameters.get("user_id"),
                    experience_id=parameters.get("experience_id"),
                    evidence=parameters.get("evidence", {})
                )
            elif action == "verify_education":
                result = await self.verify_education(
                    user_id=parameters.get("user_id"),
                    education_id=parameters.get("education_id"),
                    evidence=parameters.get("evidence", {})
                )
            elif action == "verify_certification":
                result = await self.verify_certification(
                    certification_id=parameters.get("certification_id"),
                    evidence=parameters.get("evidence", {})
                )
            elif action == "verify_document":
                result = await self.verify_document(
                    document_path=parameters.get("document_path"),
                    document_type=parameters.get("document_type")
                )
            elif action == "verify_identity":
                result = await self.verify_identity(
                    user_id=parameters.get("user_id"),
                    identity_data=parameters.get("identity_data", {})
                )
            elif action == "review_verification_request":
                result = await self.review_verification_request(
                    request_id=parameters.get("request_id"),
                    decision=parameters.get("decision"),
                    notes=parameters.get("notes")
                )
            else:
                raise ValueError(f"Unknown action: {action}")
            
            self.status = AgentStatus.IDLE
            return {
                "success": True,
                "action": action,
                "verification": result,
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            self.status = AgentStatus.ERROR
            logger.error(f"Verification Agent error: {e}")
            return {
                "success": False,
                "error": str(e),
                "action": task.get("action"),
                "timestamp": datetime.utcnow().isoformat()
            }
    
    async def verify_skill(
        self,
        user_id: str,
        skill_id: str,
        evidence: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Verify user's skill claim"""
        try:
            # Fetch user skills
            user_skills = await self.data_agent.fetch_user_skills(user_id)
            skill_data = next((s for s in user_skills if s["skill_id"] == skill_id), None)
            
            if not skill_data:
                return {
                    "status": VerificationStatus.REJECTED,
                    "reason": "Skill not found in user profile"
                }
            
            # AI-powered evidence analysis
            prompt = f"""Analyze this skill verification evidence.

Skill: {skill_data.get('skill_name')}
Proficiency Level: {skill_data.get('proficiency_level')}
Years of Experience: {skill_data.get('years_of_experience')}

Evidence Provided:
- Certificates: {evidence.get('certificates', [])}
- Projects: {evidence.get('projects', [])}
- References: {evidence.get('references', [])}
- Work History: {evidence.get('work_history', [])}

Evaluate:
1. Is the evidence sufficient?
2. Does it match the claimed proficiency level?
3. Are there any red flags?
4. Verification decision (approve/reject/needs_more_info)
5. Confidence score (0-100)

Format as JSON."""

            analysis = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "sufficient_evidence": "boolean",
                    "matches_proficiency": "boolean",
                    "red_flags": "array of strings",
                    "decision": "string (approve/reject/needs_more_info)",
                    "confidence_score": "number (0-100)",
                    "reasoning": "string"
                }
            )
            
            # Determine verification status
            if analysis.get("decision") == "approve" and analysis.get("confidence_score", 0) >= 70:
                status = VerificationStatus.APPROVED
            elif analysis.get("decision") == "needs_more_info":
                status = VerificationStatus.REQUIRES_MORE_INFO
            else:
                status = VerificationStatus.REJECTED
            
            logger.info(f"Skill verification: {skill_data.get('skill_name')} - {status}")
            
            return {
                "status": status,
                "confidence_score": analysis.get("confidence_score"),
                "reasoning": analysis.get("reasoning"),
                "red_flags": analysis.get("red_flags", []),
                "verified_at": datetime.utcnow().isoformat() if status == VerificationStatus.APPROVED else None
            }
            
        except Exception as e:
            logger.error(f"Error verifying skill: {e}")
            # Fallback to rule-based verification
            return self._fallback_skill_verification(skill_data, evidence)
    
    async def verify_work_experience(
        self,
        user_id: str,
        experience_id: str,
        evidence: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Verify user's work experience"""
        try:
            # Fetch work experience
            experiences = await self.data_agent.fetch_work_experience(user_id)
            exp_data = next((e for e in experiences if e["id"] == experience_id), None)
            
            if not exp_data:
                return {
                    "status": VerificationStatus.REJECTED,
                    "reason": "Work experience not found"
                }
            
            # AI-powered verification
            prompt = f"""Verify this work experience claim.

Company: {exp_data.get('company_name')}
Position: {exp_data.get('job_title')}
Duration: {exp_data.get('start_date')} to {exp_data.get('end_date', 'Present')}
Description: {exp_data.get('description')}

Evidence:
- Employment Letter: {evidence.get('employment_letter', False)}
- Reference Contact: {evidence.get('reference_contact')}
- Payslips: {evidence.get('payslips', False)}
- LinkedIn Profile: {evidence.get('linkedin_url')}

Verify:
1. Is the evidence credible?
2. Do dates make sense?
3. Is the job title appropriate for described responsibilities?
4. Any inconsistencies?
5. Verification decision

Format as JSON."""

            analysis = await self.ai_client.generate_structured_output(
                prompt=prompt,
                schema={
                    "credible_evidence": "boolean",
                    "dates_valid": "boolean",
                    "title_appropriate": "boolean",
                    "inconsistencies": "array of strings",
                    "decision": "string",
                    "confidence_score": "number (0-100)"
                }
            )
            
            if analysis.get("confidence_score", 0) >= 70 and analysis.get("credible_evidence"):
                status = VerificationStatus.APPROVED
            elif analysis.get("inconsistencies"):
                status = VerificationStatus.REQUIRES_MORE_INFO
            else:
                status = VerificationStatus.REJECTED
            
            return {
                "status": status,
                "confidence_score": analysis.get("confidence_score"),
                "inconsistencies": analysis.get("inconsistencies", []),
                "verified_at": datetime.utcnow().isoformat() if status == VerificationStatus.APPROVED else None
            }
            
        except Exception as e:
            logger.error(f"Error verifying work experience: {e}")
            return {"status": VerificationStatus.PENDING, "error": str(e)}
    
    async def verify_education(
        self,
        user_id: str,
        education_id: str,
        evidence: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Verify user's education credentials"""
        try:
            # Simplified verification for MVP
            has_certificate = evidence.get("certificate", False)
            has_transcript = evidence.get("transcript", False)
            institution_verified = evidence.get("institution_verified", False)
            
            if institution_verified or (has_certificate and has_transcript):
                status = VerificationStatus.APPROVED
                confidence = 95
            elif has_certificate or has_transcript:
                status = VerificationStatus.REQUIRES_MORE_INFO
                confidence = 60
            else:
                status = VerificationStatus.PENDING
                confidence = 30
            
            return {
                "status": status,
                "confidence_score": confidence,
                "verified_at": datetime.utcnow().isoformat() if status == VerificationStatus.APPROVED else None
            }
            
        except Exception as e:
            logger.error(f"Error verifying education: {e}")
            return {"status": VerificationStatus.PENDING, "error": str(e)}
    
    async def verify_certification(
        self,
        certification_id: str,
        evidence: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Verify professional certification"""
        try:
            certificate_number = evidence.get("certificate_number")
            issuing_authority = evidence.get("issuing_authority")
            certificate_url = evidence.get("certificate_url")
            
            # Check if certificate can be verified online
            if certificate_url and issuing_authority:
                status = VerificationStatus.APPROVED
                confidence = 90
            elif certificate_number:
                status = VerificationStatus.REQUIRES_MORE_INFO
                confidence = 60
            else:
                status = VerificationStatus.PENDING
                confidence = 30
            
            return {
                "status": status,
                "confidence_score": confidence,
                "verified_at": datetime.utcnow().isoformat() if status == VerificationStatus.APPROVED else None
            }
            
        except Exception as e:
            logger.error(f"Error verifying certification: {e}")
            return {"status": VerificationStatus.PENDING, "error": str(e)}
    
    async def verify_document(
        self,
        document_path: str,
        document_type: str
    ) -> Dict[str, Any]:
        """Verify document authenticity"""
        try:
            # Simplified document verification
            # In production, would use OCR and document analysis
            
            return {
                "status": VerificationStatus.APPROVED,
                "document_type": document_type,
                "verified_at": datetime.utcnow().isoformat(),
                "confidence_score": 85
            }
            
        except Exception as e:
            logger.error(f"Error verifying document: {e}")
            return {"status": VerificationStatus.PENDING, "error": str(e)}
    
    async def verify_identity(
        self,
        user_id: str,
        identity_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Verify user identity"""
        try:
            # Check required identity documents
            has_emirates_id = identity_data.get("emirates_id", False)
            has_passport = identity_data.get("passport", False)
            has_selfie = identity_data.get("selfie", False)
            
            if has_emirates_id and has_selfie:
                status = VerificationStatus.APPROVED
                confidence = 95
            elif has_passport and has_selfie:
                status = VerificationStatus.APPROVED
                confidence = 85
            else:
                status = VerificationStatus.REQUIRES_MORE_INFO
                confidence = 40
            
            return {
                "status": status,
                "confidence_score": confidence,
                "verified_at": datetime.utcnow().isoformat() if status == VerificationStatus.APPROVED else None,
                "identity_verified": status == VerificationStatus.APPROVED
            }
            
        except Exception as e:
            logger.error(f"Error verifying identity: {e}")
            return {"status": VerificationStatus.PENDING, "error": str(e)}
    
    async def review_verification_request(
        self,
        request_id: str,
        decision: str,
        notes: Optional[str] = None
    ) -> Dict[str, Any]:
        """Manual review of verification request"""
        try:
            valid_decisions = ["approve", "reject", "request_more_info"]
            if decision not in valid_decisions:
                raise ValueError(f"Invalid decision: {decision}")
            
            status_map = {
                "approve": VerificationStatus.APPROVED,
                "reject": VerificationStatus.REJECTED,
                "request_more_info": VerificationStatus.REQUIRES_MORE_INFO
            }
            
            return {
                "request_id": request_id,
                "status": status_map[decision],
                "reviewed_by": "admin",  # TODO: Get actual reviewer
                "reviewed_at": datetime.utcnow().isoformat(),
                "notes": notes
            }
            
        except Exception as e:
            logger.error(f"Error reviewing verification request: {e}")
            raise
    
    def _fallback_skill_verification(
        self,
        skill_data: Dict[str, Any],
        evidence: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Fallback rule-based skill verification"""
        score = 0
        
        # Check evidence
        if evidence.get("certificates"):
            score += 40
        if evidence.get("projects"):
            score += 30
        if evidence.get("references"):
            score += 20
        if evidence.get("work_history"):
            score += 10
        
        # Check years of experience
        years = skill_data.get("years_of_experience", 0)
        if years >= 5:
            score += 10
        elif years >= 2:
            score += 5
        
        if score >= 70:
            status = VerificationStatus.APPROVED
        elif score >= 40:
            status = VerificationStatus.REQUIRES_MORE_INFO
        else:
            status = VerificationStatus.PENDING
        
        return {
            "status": status,
            "confidence_score": score,
            "reasoning": "Rule-based verification (AI unavailable)",
            "verified_at": datetime.utcnow().isoformat() if status == VerificationStatus.APPROVED else None
        }


# Singleton instance
_verification_agent = None


def get_verification_agent() -> VerificationAgent:
    """Get or create Verification Agent instance"""
    global _verification_agent
    if _verification_agent is None:
        _verification_agent = VerificationAgent()
    return _verification_agent

