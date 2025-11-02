"""
NOOR Platform - AI Client (Anthropic Claude)
Wrapper for Anthropic API integration
"""

from anthropic import Anthropic, AsyncAnthropic
from typing import List, Dict, Any, Optional
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)


class ClaudeAIClient:
    """
    Anthropic Claude AI client for NOOR Platform
    """
    
    def __init__(self):
        """Initialize Claude AI client"""
        if not settings.ANTHROPIC_API_KEY:
            logger.warning("Anthropic API key not configured")
            self.client = None
            self.async_client = None
        else:
            self.client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
            self.async_client = AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
            logger.info("✅ Claude AI client initialized successfully")
    
    def is_available(self) -> bool:
        """Check if AI client is available"""
        return self.client is not None and settings.ENABLE_AI_FEATURES
    
    def generate_completion(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        max_tokens: Optional[int] = None,
        temperature: Optional[float] = None,
        model: Optional[str] = None
    ) -> str:
        """
        Generate completion using Claude
        
        Args:
            prompt: User prompt
            system_prompt: System instructions
            max_tokens: Maximum tokens to generate
            temperature: Sampling temperature (0-1)
            model: Model to use
            
        Returns:
            Generated text completion
        """
        if not self.is_available():
            raise ValueError("AI client not available")
        
        try:
            message = self.client.messages.create(
                model=model or settings.AI_MODEL,
                max_tokens=max_tokens or settings.AI_MAX_TOKENS,
                temperature=temperature or settings.AI_TEMPERATURE,
                system=system_prompt or "You are a helpful AI assistant for the NOOR Platform.",
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            response_text = message.content[0].text
            
            if settings.ENABLE_AGENT_LOGGING:
                logger.info(f"AI completion generated: {len(response_text)} characters")
            
            return response_text
            
        except Exception as e:
            logger.error(f"AI completion error: {str(e)}")
            raise
    
    async def generate_completion_async(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        max_tokens: Optional[int] = None,
        temperature: Optional[float] = None,
        model: Optional[str] = None
    ) -> str:
        """
        Generate completion using Claude (async)
        
        Args:
            prompt: User prompt
            system_prompt: System instructions
            max_tokens: Maximum tokens to generate
            temperature: Sampling temperature (0-1)
            model: Model to use
            
        Returns:
            Generated text completion
        """
        if not self.is_available():
            raise ValueError("AI client not available")
        
        try:
            message = await self.async_client.messages.create(
                model=model or settings.AI_MODEL,
                max_tokens=max_tokens or settings.AI_MAX_TOKENS,
                temperature=temperature or settings.AI_TEMPERATURE,
                system=system_prompt or "You are a helpful AI assistant for the NOOR Platform.",
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            response_text = message.content[0].text
            
            if settings.ENABLE_AGENT_LOGGING:
                logger.info(f"AI completion generated (async): {len(response_text)} characters")
            
            return response_text
            
        except Exception as e:
            logger.error(f"AI completion error (async): {str(e)}")
            raise
    
    def generate_structured_output(
        self,
        prompt: str,
        system_prompt: str,
        output_schema: Dict[str, Any],
        model: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate structured JSON output
        
        Args:
            prompt: User prompt
            system_prompt: System instructions
            output_schema: Expected output schema
            model: Model to use
            
        Returns:
            Structured JSON output
        """
        import json
        
        enhanced_system_prompt = f"""{system_prompt}

You must respond with valid JSON matching this schema:
{json.dumps(output_schema, indent=2)}

Return ONLY the JSON object, no additional text."""
        
        response = self.generate_completion(
            prompt=prompt,
            system_prompt=enhanced_system_prompt,
            model=model,
            temperature=0.3  # Lower temperature for structured output
        )
        
        try:
            # Extract JSON from response
            json_start = response.find('{')
            json_end = response.rfind('}') + 1
            if json_start >= 0 and json_end > json_start:
                json_str = response[json_start:json_end]
                return json.loads(json_str)
            else:
                return json.loads(response)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse JSON response: {e}")
            logger.error(f"Response: {response}")
            raise ValueError(f"Invalid JSON response from AI: {str(e)}")
    
    async def generate_structured_output_async(
        self,
        prompt: str,
        system_prompt: str,
        output_schema: Dict[str, Any],
        model: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate structured JSON output (async)
        
        Args:
            prompt: User prompt
            system_prompt: System instructions
            output_schema: Expected output schema
            model: Model to use
            
        Returns:
            Structured JSON output
        """
        import json
        
        enhanced_system_prompt = f"""{system_prompt}

You must respond with valid JSON matching this schema:
{json.dumps(output_schema, indent=2)}

Return ONLY the JSON object, no additional text."""
        
        response = await self.generate_completion_async(
            prompt=prompt,
            system_prompt=enhanced_system_prompt,
            model=model,
            temperature=0.3  # Lower temperature for structured output
        )
        
        try:
            # Extract JSON from response
            json_start = response.find('{')
            json_end = response.rfind('}') + 1
            if json_start >= 0 and json_end > json_start:
                json_str = response[json_start:json_end]
                return json.loads(json_str)
            else:
                return json.loads(response)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse JSON response: {e}")
            logger.error(f"Response: {response}")
            raise ValueError(f"Invalid JSON response from AI: {str(e)}")


# Global AI client instance
ai_client = ClaudeAIClient()


def get_ai_client() -> ClaudeAIClient:
    """Get global AI client instance"""
    return ai_client

