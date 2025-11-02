"""
Agent Registry and Coordination System for NOOR Platform

This module provides centralized agent management:
- Agent registration and discovery
- Agent health monitoring
- Task routing and coordination
- Load balancing
- Agent lifecycle management
"""

import logging
from typing import Dict, List, Any, Optional
from datetime import datetime
from enum import Enum

from app.agents.base_agent import BaseAgent, AgentStatus
from app.agents.master_orchestrator_v2 import MasterOrchestrator
from app.agents.data_retrieval_agent import get_data_retrieval_agent
from app.agents.ai_analysis_agent import get_ai_analysis_agent
from app.agents.notification_agent import get_notification_agent
from app.agents.verification_agent import get_verification_agent
from app.agents.matching_agent import get_matching_agent
from app.agents.analytics_agent import get_analytics_agent

logger = logging.getLogger(__name__)


class AgentRegistry:
    """
    Central registry for all agents in the system
    
    Provides:
    - Agent registration and discovery
    - Health monitoring
    - Task routing
    - Load balancing
    """
    
    def __init__(self):
        self._agents: Dict[str, BaseAgent] = {}
        self._orchestrator: Optional[MasterOrchestrator] = None
        self._initialized = False
        
    def initialize(self) -> None:
        """Initialize all agents and register them"""
        if self._initialized:
            logger.info("Agent registry already initialized")
            return
        
        try:
            logger.info("Initializing agent registry...")
            
            # Initialize Master Orchestrator
            self._orchestrator = MasterOrchestrator()
            self._agents[self._orchestrator.agent_id] = self._orchestrator
            
            # Initialize all specialized agents
            agents = [
                get_data_retrieval_agent(),
                get_ai_analysis_agent(),
                get_notification_agent(),
                get_verification_agent(),
                get_matching_agent(),
                get_analytics_agent()
            ]
            
            # Register each agent
            for agent in agents:
                self._agents[agent.agent_id] = agent
                logger.info(f"Registered agent: {agent.name} ({agent.agent_id})")
            
            self._initialized = True
            logger.info(f"Agent registry initialized with {len(self._agents)} agents")
            
        except Exception as e:
            logger.error(f"Error initializing agent registry: {e}")
            raise
    
    def get_agent(self, agent_id: str) -> Optional[BaseAgent]:
        """Get agent by ID"""
        return self._agents.get(agent_id)
    
    def get_orchestrator(self) -> Optional[MasterOrchestrator]:
        """Get the Master Orchestrator"""
        return self._orchestrator
    
    def list_agents(self) -> List[Dict[str, Any]]:
        """List all registered agents"""
        return [
            {
                "agent_id": agent.agent_id,
                "name": agent.name,
                "description": agent.description,
                "status": agent.status.value,
                "capabilities": [cap.value for cap in agent.capabilities]
            }
            for agent in self._agents.values()
        ]
    
    def get_agent_status(self, agent_id: str) -> Dict[str, Any]:
        """Get status of a specific agent"""
        agent = self._agents.get(agent_id)
        if not agent:
            return {"error": f"Agent {agent_id} not found"}
        
        return {
            "agent_id": agent.agent_id,
            "name": agent.name,
            "status": agent.status.value,
            "capabilities": [cap.value for cap in agent.capabilities],
            "task_history_count": len(agent.task_history)
        }
    
    def get_system_health(self) -> Dict[str, Any]:
        """Get overall system health"""
        total_agents = len(self._agents)
        idle_agents = sum(1 for agent in self._agents.values() if agent.status == AgentStatus.IDLE)
        busy_agents = sum(1 for agent in self._agents.values() if agent.status == AgentStatus.BUSY)
        error_agents = sum(1 for agent in self._agents.values() if agent.status == AgentStatus.ERROR)
        
        health_status = "healthy"
        if error_agents > 0:
            health_status = "degraded"
        if error_agents >= total_agents // 2:
            health_status = "critical"
        
        return {
            "status": health_status,
            "total_agents": total_agents,
            "idle_agents": idle_agents,
            "busy_agents": busy_agents,
            "error_agents": error_agents,
            "initialized": self._initialized,
            "checked_at": datetime.utcnow().isoformat()
        }
    
    async def execute_task(
        self,
        agent_id: str,
        task: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Execute a task on a specific agent"""
        agent = self._agents.get(agent_id)
        if not agent:
            return {
                "success": False,
                "error": f"Agent {agent_id} not found"
            }
        
        try:
            result = await agent.execute(task)
            return result
        except Exception as e:
            logger.error(f"Error executing task on agent {agent_id}: {e}")
            return {
                "success": False,
                "error": str(e),
                "agent_id": agent_id
            }
    
    async def orchestrate_task(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """Orchestrate a complex task using Master Orchestrator"""
        if not self._orchestrator:
            return {
                "success": False,
                "error": "Master Orchestrator not initialized"
            }
        
        try:
            result = await self._orchestrator.execute(task)
            return result
        except Exception as e:
            logger.error(f"Error orchestrating task: {e}")
            return {
                "success": False,
                "error": str(e)
            }


# Global registry instance
_agent_registry = None


def get_agent_registry() -> AgentRegistry:
    """Get or create the global agent registry"""
    global _agent_registry
    if _agent_registry is None:
        _agent_registry = AgentRegistry()
        _agent_registry.initialize()
    return _agent_registry


def initialize_agents() -> AgentRegistry:
    """Initialize all agents and return registry"""
    registry = get_agent_registry()
    logger.info("All agents initialized and ready")
    return registry

