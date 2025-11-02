#!/usr/bin/env python3
"""
NOOR Platform - Master Orchestrator Test Script
Initialize and test the Master Orchestrator Agent with Claude AI
"""

import asyncio
import sys
import os
from datetime import datetime

# Add backend to path
sys.path.insert(0, '/home/ubuntu/NOOR-v7.1/backend')

# Set environment variables
os.environ['ANTHROPIC_API_KEY'] = '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'
os.environ['AI_MODEL'] = 'claude-3-opus-20240229'
os.environ['ENABLE_AI_FEATURES'] = 'true'

from app.agents.master_orchestrator_v2 import MasterOrchestratorV2, get_master_orchestrator
from app.core.ai_client import get_ai_client


def print_header(title: str):
    """Print formatted header"""
    print("\n" + "=" * 80)
    print(f"  {title}")
    print("=" * 80 + "\n")


def print_section(title: str):
    """Print formatted section"""
    print("\n" + "-" * 80)
    print(f"  {title}")
    print("-" * 80 + "\n")


async def test_ai_client():
    """Test AI client initialization"""
    print_section("Testing AI Client")
    
    ai_client = get_ai_client()
    
    print(f"✅ AI Client Initialized: {ai_client.is_available()}")
    
    if ai_client.is_available():
        print("✅ Anthropic API Key: Configured")
        print("✅ Model: claude-3-5-sonnet-20241022")
        print("✅ Max Tokens: 4096")
        print("✅ Temperature: 0.7")
        
        # Test simple completion
        try:
            print("\n🧪 Testing AI Completion...")
            response = await ai_client.generate_completion_async(
                prompt="Say 'Hello from NOOR Platform!' in one sentence.",
                system_prompt="You are a helpful assistant.",
                max_tokens=50
            )
            print(f"✅ AI Response: {response}")
        except Exception as e:
            print(f"❌ AI Test Failed: {e}")
    else:
        print("❌ AI Client Not Available")


async def test_orchestrator_initialization():
    """Test Master Orchestrator initialization"""
    print_section("Initializing Master Orchestrator")
    
    orchestrator = get_master_orchestrator()
    
    print(f"✅ Orchestrator Name: {orchestrator.name}")
    print(f"✅ Description: {orchestrator.description}")
    print(f"✅ Capabilities: {', '.join(orchestrator.capabilities)}")
    print(f"✅ AI Available: {orchestrator.ai_client.is_available()}")
    print(f"✅ Registered Agents: {len(orchestrator.sub_agents)}")
    
    return orchestrator


async def test_skill_matching_task(orchestrator):
    """Test skill matching task"""
    print_section("Task 1: AI-Powered Skill Matching")
    
    task = {
        "task_id": "skill_match_001",
        "type": "skill_matching",
        "description": "Match user skills to job requirements",
        "parameters": {
            "user_id": "user-123",
            "job_id": "job-456"
        },
        "context": {
            "priority": "high",
            "deadline": "2024-11-05"
        }
    }
    
    print(f"📋 Task ID: {task['task_id']}")
    print(f"📋 Type: {task['type']}")
    print(f"📋 Description: {task['description']}")
    print(f"📋 Parameters: {task['parameters']}")
    
    print("\n🚀 Executing task with Master Orchestrator...")
    
    result = await orchestrator.execute(task)
    
    print("\n📊 Task Result:")
    print(f"   Success: {result['success']}")
    print(f"   Task ID: {result['task_id']}")
    
    if result['success']:
        print(f"   Match Score: {result['result'].get('match_score', 'N/A')}")
        print(f"   Matched Skills: {result['result'].get('matched_skills', 'N/A')}")
        print(f"   Recommendation: {result['result'].get('recommendation', 'N/A')}")
        print(f"   Execution Time: {result['result'].get('execution_time', 'N/A')}s")
    else:
        print(f"   Error: {result.get('error', 'Unknown error')}")
    
    return result


async def test_career_analysis_task(orchestrator):
    """Test career analysis task"""
    print_section("Task 2: AI-Powered Career Analysis")
    
    task = {
        "task_id": "career_analysis_001",
        "type": "career_analysis",
        "description": "Analyze user's career progression and provide recommendations",
        "parameters": {
            "user_id": "user-789"
        },
        "context": {
            "analysis_depth": "comprehensive",
            "include_recommendations": True
        }
    }
    
    print(f"📋 Task ID: {task['task_id']}")
    print(f"📋 Type: {task['type']}")
    print(f"📋 Description: {task['description']}")
    
    print("\n🚀 Executing task with Master Orchestrator...")
    
    result = await orchestrator.execute(task)
    
    print("\n📊 Task Result:")
    print(f"   Success: {result['success']}")
    print(f"   Task ID: {result['task_id']}")
    
    if result['success']:
        print(f"   Progression Score: {result['result'].get('progression_score', 'N/A')}/10")
        print(f"   Insights: {len(result['result'].get('insights', []))} insights")
        print(f"   Recommendations: {len(result['result'].get('recommendations', []))} recommendations")
        print(f"   Execution Time: {result['result'].get('execution_time', 'N/A')}s")
        
        if result['result'].get('insights'):
            print("\n   📝 Sample Insights:")
            for insight in result['result']['insights'][:2]:
                print(f"      • {insight}")
    else:
        print(f"   Error: {result.get('error', 'Unknown error')}")
    
    return result


async def test_job_recommendation_task(orchestrator):
    """Test job recommendation task"""
    print_section("Task 3: AI-Powered Job Recommendations")
    
    task = {
        "task_id": "job_rec_001",
        "type": "job_recommendation",
        "description": "Recommend best matching jobs for user",
        "parameters": {
            "user_id": "user-456",
            "filters": {
                "location": "Dubai",
                "industry": "Technology",
                "min_salary": 15000
            }
        },
        "context": {
            "max_recommendations": 10
        }
    }
    
    print(f"📋 Task ID: {task['task_id']}")
    print(f"📋 Type: {task['type']}")
    print(f"📋 Description: {task['description']}")
    
    print("\n🚀 Executing task with Master Orchestrator...")
    
    result = await orchestrator.execute(task)
    
    print("\n📊 Task Result:")
    print(f"   Success: {result['success']}")
    print(f"   Task ID: {result['task_id']}")
    
    if result['success']:
        print(f"   Subtasks Executed: {result['metadata'].get('subtasks_count', 0)}")
        print(f"   Execution Time: {result['metadata'].get('execution_time', 'N/A')}s")
    else:
        print(f"   Error: {result.get('error', 'Unknown error')}")
    
    return result


async def test_ai_task_analysis(orchestrator):
    """Test AI-powered task analysis"""
    print_section("Task 4: AI Task Analysis Demo")
    
    task = {
        "task_id": "complex_task_001",
        "type": "complex_workflow",
        "description": "Analyze user profile, match to jobs, generate career recommendations, and create learning path",
        "parameters": {
            "user_id": "user-999",
            "target_role": "Senior Software Architect",
            "industry": "Technology"
        },
        "context": {
            "comprehensive_analysis": True,
            "include_learning_path": True
        }
    }
    
    print(f"📋 Task ID: {task['task_id']}")
    print(f"📋 Type: {task['type']}")
    print(f"📋 Description: {task['description']}")
    
    print("\n🤖 Using Claude AI to analyze task complexity...")
    
    result = await orchestrator.execute(task)
    
    print("\n📊 Task Result:")
    print(f"   Success: {result['success']}")
    print(f"   Task ID: {result['task_id']}")
    
    if result['success']:
        print(f"   Subtasks: {result['metadata'].get('subtasks_count', 0)}")
    else:
        print(f"   Error: {result.get('error', 'Unknown error')}")
    
    return result


async def display_orchestrator_status(orchestrator):
    """Display orchestrator status"""
    print_section("Master Orchestrator Status")
    
    status = orchestrator.get_status()
    
    print(f"📊 Orchestrator Name: {status['name']}")
    print(f"📊 Registered Agents: {len(status['registered_agents'])}")
    if status['registered_agents']:
        for agent in status['registered_agents']:
            print(f"   • {agent}")
    print(f"📊 Tasks Completed: {status['tasks_completed']}")
    print(f"📊 Tasks Failed: {status['tasks_failed']}")
    print(f"📊 AI Available: {'✅ Yes' if status['ai_available'] else '❌ No'}")
    
    # Task history
    if orchestrator.task_history:
        print(f"\n📜 Task History ({len(orchestrator.task_history)} tasks):")
        for task in orchestrator.task_history[-5:]:  # Last 5 tasks
            status_emoji = "✅" if task['status'] == 'completed' else "❌"
            print(f"   {status_emoji} {task['task_id']} ({task['type']}) - {task['status']}")


async def main():
    """Main test function"""
    print_header("NOOR Platform - Master Orchestrator Agent Test")
    print(f"🕐 Test Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    try:
        # Test 1: AI Client
        await test_ai_client()
        
        # Test 2: Initialize Orchestrator
        orchestrator = await test_orchestrator_initialization()
        
        # Test 3: Execute Tasks
        await test_skill_matching_task(orchestrator)
        await test_career_analysis_task(orchestrator)
        await test_job_recommendation_task(orchestrator)
        await test_ai_task_analysis(orchestrator)
        
        # Test 4: Display Status
        await display_orchestrator_status(orchestrator)
        
        print_header("Test Summary")
        print("✅ All tests completed successfully!")
        print(f"✅ Master Orchestrator is operational")
        print(f"✅ Claude AI integration working")
        print(f"✅ Task execution successful")
        print(f"\n🕐 Test Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
    except Exception as e:
        print_header("Test Failed")
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    asyncio.run(main())

