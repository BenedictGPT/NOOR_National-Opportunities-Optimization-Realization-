# Master Orchestrator REST API
# NOOR Platform v7.1

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
import logging
import os

from agent import MasterOrchestrator, TaskPriority

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="NOOR Master Orchestrator API",
    description="REST API for the Master Orchestrator Agent",
    version="7.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Master Orchestrator
anthropic_api_key = os.getenv("ANTHROPIC_API_KEY", "")
orchestrator = MasterOrchestrator(anthropic_api_key)

# =============================================================================
# REQUEST/RESPONSE MODELS
# =============================================================================

class ChatRequest(BaseModel):
    user_id: str
    message: str
    conversation_id: Optional[str] = None
    metadata: Dict[str, Any] = {}

class ChatResponse(BaseModel):
    conversation_id: str
    response: str
    status: str
    timestamp: datetime = datetime.utcnow()

class AgentStatusResponse(BaseModel):
    agent_type: str
    is_online: bool
    current_load: int
    max_load: int
    availability: float

# =============================================================================
# API ENDPOINTS
# =============================================================================

@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint for user interactions with Master Orchestrator
    """
    logger.info(f"Chat request from user {request.user_id}")

    try:
        result = await orchestrator.handle_user_request(
            user_id=request.user_id,
            message=request.message,
            conversation_id=request.conversation_id
        )

        return ChatResponse(
            conversation_id=result["conversation_id"],
            response=result["response"],
            status=result["status"]
        )

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.get("/api/v1/agents/{agent_type}/status", response_model=AgentStatusResponse)
async def get_agent_status(agent_type: str):
    """Get status of a specific agent"""
    result = orchestrator._get_agent_status(agent_type)

    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])

    return AgentStatusResponse(**result)

@app.get("/api/v1/agents")
async def list_agents():
    """List all registered agents"""
    agents = []
    for agent_type, profile in orchestrator.agents.items():
        agents.append({
            "agent_type": agent_type.value,
            "name": profile.name,
            "description": profile.description,
            "is_online": profile.is_online,
            "current_load": profile.current_load,
            "child_agents": [a.value for a in profile.child_agents]
        })

    return {
        "total_agents": len(agents),
        "agents": agents
    }

@app.get("/api/v1/tasks")
async def list_tasks(user_id: Optional[str] = None, status: Optional[str] = None):
    """List tasks with optional filtering"""
    tasks = []

    # Combine all tasks
    all_tasks = (
        orchestrator.pending_tasks +
        list(orchestrator.active_tasks.values()) +
        orchestrator.completed_tasks
    )

    # Filter
    for task in all_tasks:
        if user_id and task.user_id != user_id:
            continue
        if status and task.status.value != status:
            continue

        tasks.append({
            "task_id": task.task_id,
            "user_id": task.user_id,
            "task_type": task.task_type,
            "description": task.description,
            "priority": task.priority.value,
            "status": task.status.value,
            "assigned_agent": task.assigned_agent.value if task.assigned_agent else None,
            "created_at": task.created_at.isoformat()
        })

    return {
        "total_tasks": len(tasks),
        "tasks": tasks
    }

@app.get("/api/v1/conversations/{conversation_id}")
async def get_conversation(conversation_id: str):
    """Get conversation details"""
    if conversation_id not in orchestrator.conversations:
        raise HTTPException(status_code=404, detail="Conversation not found")

    context = orchestrator.conversations[conversation_id]

    return {
        "conversation_id": context.conversation_id,
        "user_id": context.user_id,
        "messages": context.messages,
        "session_start": context.session_start.isoformat(),
        "last_activity": context.last_activity.isoformat(),
        "message_count": len(context.messages)
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "master-orchestrator",
        "version": "7.1.0",
        "agents_registered": len(orchestrator.agents),
        "active_tasks": len(orchestrator.active_tasks),
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/ready")
async def readiness_check():
    """Readiness check"""
    # TODO: Check connections to databases, Kafka, etc.
    return {
        "status": "ready",
        "anthropic_api": "connected" if anthropic_api_key else "not_configured"
    }

# =============================================================================
# STARTUP/SHUTDOWN
# =============================================================================

@app.on_event("startup")
async def startup_event():
    """Initialize on startup"""
    logger.info("Master Orchestrator API starting up...")
    # TODO: Initialize database connections
    # TODO: Initialize Kafka consumers for MCP messages

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Master Orchestrator API shutting down...")
    # TODO: Close database connections
    # TODO: Close Kafka connections

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8100)
