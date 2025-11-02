// NOOR Platform - MongoDB Collection Schemas (Part 3)
// AI Agent Interactions, Logs, and Decision Tracking
// Version: 7.1.0

// ============================================================================
// AI AGENT INTERACTIONS
// ============================================================================

// Collection: agent_interactions
db.createCollection("agent_interactions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["agent_id", "user_id", "session_id", "timestamp"],
      properties: {
        _id: { bsonType: "objectId" },
        agent_id: {
          bsonType: "string",
          description: "ID of the AI agent (e.g., radiant-ai, mentor-matching)"
        },
        agent_name: { bsonType: "string" },
        agent_category: {
          enum: ["orchestrator", "development", "infrastructure", "intelligence", "content", "specialized", "strategic"]
        },
        user_id: {
          bsonType: "string",
          description: "UUID reference to users table"
        },
        session_id: {
          bsonType: "string",
          description: "Unique session identifier"
        },
        timestamp: { bsonType: "date" },
        interaction_type: {
          enum: ["chat", "recommendation", "analysis", "task_execution", "validation", "coordination"],
          description: "Type of agent interaction"
        },
        messages: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              message_id: { bsonType: "string" },
              role: {
                enum: ["user", "agent", "system"]
              },
              content: { bsonType: "string" },
              content_type: {
                enum: ["text", "markdown", "json", "code"]
              },
              timestamp: { bsonType: "date" },
              tokens_used: { bsonType: "int" },
              model: { bsonType: "string" },
              metadata: { bsonType: "object" }
            }
          }
        },
        context: {
          bsonType: "object",
          properties: {
            page_url: { bsonType: "string" },
            feature: { bsonType: "string" },
            user_intent: { bsonType: "string" },
            conversation_context: { bsonType: "array" },
            relevant_data: { bsonType: "object" }
          }
        },
        tools_used: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              tool_name: { bsonType: "string" },
              tool_input: { bsonType: "object" },
              tool_output: { bsonType: "object" },
              execution_time_ms: { bsonType: "int" },
              success: { bsonType: "bool" },
              error: { bsonType: "string" }
            }
          }
        },
        recommendations_made: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              recommendation_type: { bsonType: "string" },
              recommendation_content: { bsonType: "string" },
              confidence_score: { bsonType: "double" },
              user_action: {
                enum: ["accepted", "rejected", "deferred", "modified", "no_action"]
              }
            }
          }
        },
        sentiment_analysis: {
          bsonType: "object",
          properties: {
            user_sentiment: {
              enum: ["very_negative", "negative", "neutral", "positive", "very_positive"]
            },
            satisfaction_score: { bsonType: "double" },
            frustration_detected: { bsonType: "bool" },
            escalation_needed: { bsonType: "bool" }
          }
        },
        performance_metrics: {
          bsonType: "object",
          properties: {
            response_time_ms: { bsonType: "int" },
            total_tokens: { bsonType: "int" },
            api_calls: { bsonType: "int" },
            cache_hits: { bsonType: "int" },
            errors_count: { bsonType: "int" }
          }
        },
        session_duration_seconds: { bsonType: "int" },
        session_ended: { bsonType: "bool" },
        session_end_reason: {
          enum: ["user_closed", "timeout", "task_completed", "error", "escalated"]
        },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes for agent_interactions
db.agent_interactions.createIndex({ "agent_id": 1 });
db.agent_interactions.createIndex({ "user_id": 1 });
db.agent_interactions.createIndex({ "session_id": 1 });
db.agent_interactions.createIndex({ "timestamp": -1 });
db.agent_interactions.createIndex({ "interaction_type": 1 });
db.agent_interactions.createIndex({ "sentiment_analysis.user_sentiment": 1 });

// TTL index to automatically delete old interactions after 90 days
db.agent_interactions.createIndex({ "created_at": 1 }, { expireAfterSeconds: 7776000 });

// ============================================================================
// AI AGENT DECISIONS & ACTIONS
// ============================================================================

// Collection: agent_decisions
db.createCollection("agent_decisions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["agent_id", "decision_type", "timestamp"],
      properties: {
        _id: { bsonType: "objectId" },
        agent_id: { bsonType: "string" },
        agent_name: { bsonType: "string" },
        agent_category: {
          enum: ["orchestrator", "development", "infrastructure", "intelligence", "content", "specialized", "strategic"]
        },
        decision_type: {
          enum: [
            "recommendation",
            "prediction",
            "classification",
            "matching",
            "validation",
            "task_assignment",
            "resource_allocation",
            "escalation"
          ],
          description: "Type of decision made by agent"
        },
        timestamp: { bsonType: "date" },
        input_data: {
          bsonType: "object",
          description: "Input data used for decision"
        },
        decision_logic: {
          bsonType: "object",
          properties: {
            model_used: { bsonType: "string" },
            algorithm: { bsonType: "string" },
            features_considered: { bsonType: "array" },
            weights: { bsonType: "object" },
            reasoning_steps: { bsonType: "array" }
          }
        },
        output_data: {
          bsonType: "object",
          description: "Decision output and results"
        },
        confidence_score: {
          bsonType: "double",
          minimum: 0.0,
          maximum: 1.0,
          description: "Agent's confidence in the decision"
        },
        alternatives_considered: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              option: { bsonType: "string" },
              score: { bsonType: "double" },
              reason_not_chosen: { bsonType: "string" }
            }
          }
        },
        human_approval_required: {
          bsonType: "bool",
          description: "Whether decision requires human approval"
        },
        approval_status: {
          enum: ["pending", "approved", "rejected", "auto_approved", "not_required"]
        },
        approved_by: { bsonType: "string" },
        approved_at: { bsonType: "date" },
        rejection_reason: { bsonType: "string" },
        decision_outcome: {
          bsonType: "object",
          properties: {
            executed: { bsonType: "bool" },
            execution_time: { bsonType: "date" },
            success: { bsonType: "bool" },
            actual_result: { bsonType: "object" },
            feedback_score: { bsonType: "double" }
          }
        },
        context: {
          bsonType: "object",
          properties: {
            user_id: { bsonType: "string" },
            company_id: { bsonType: "string" },
            related_task_id: { bsonType: "string" },
            session_id: { bsonType: "string" },
            environment: { enum: ["production", "staging", "development"] }
          }
        },
        metadata: {
          bsonType: "object",
          properties: {
            execution_time_ms: { bsonType: "int" },
            api_calls_made: { bsonType: "int" },
            data_sources_used: { bsonType: "array" },
            cost_estimate: { bsonType: "double" }
          }
        },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes for agent_decisions
db.agent_decisions.createIndex({ "agent_id": 1 });
db.agent_decisions.createIndex({ "decision_type": 1 });
db.agent_decisions.createIndex({ "timestamp": -1 });
db.agent_decisions.createIndex({ "confidence_score": -1 });
db.agent_decisions.createIndex({ "approval_status": 1 });
db.agent_decisions.createIndex({ "context.user_id": 1 });

// ============================================================================
// AI AGENT PERFORMANCE METRICS
// ============================================================================

// Collection: agent_performance
db.createCollection("agent_performance", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["agent_id", "period_start", "period_end", "metrics"],
      properties: {
        _id: { bsonType: "objectId" },
        agent_id: { bsonType: "string" },
        agent_name: { bsonType: "string" },
        agent_category: {
          enum: ["orchestrator", "development", "infrastructure", "intelligence", "content", "specialized", "strategic"]
        },
        period_start: { bsonType: "date" },
        period_end: { bsonType: "date" },
        period_type: {
          enum: ["hourly", "daily", "weekly", "monthly"],
          description: "Aggregation period"
        },
        metrics: {
          bsonType: "object",
          properties: {
            total_interactions: { bsonType: "int" },
            total_decisions: { bsonType: "int" },
            successful_decisions: { bsonType: "int" },
            failed_decisions: { bsonType: "int" },
            average_confidence_score: { bsonType: "double" },
            average_response_time_ms: { bsonType: "int" },
            total_tokens_used: { bsonType: "int" },
            total_api_calls: { bsonType: "int" },
            error_rate: { bsonType: "double" },
            user_satisfaction_score: { bsonType: "double" },
            recommendation_acceptance_rate: { bsonType: "double" },
            tasks_completed: { bsonType: "int" },
            tasks_failed: { bsonType: "int" },
            escalations: { bsonType: "int" },
            cost_usd: { bsonType: "double" }
          }
        },
        performance_breakdown: {
          bsonType: "object",
          properties: {
            by_interaction_type: { bsonType: "object" },
            by_decision_type: { bsonType: "object" },
            by_time_of_day: { bsonType: "array" },
            by_user_segment: { bsonType: "object" }
          }
        },
        quality_indicators: {
          bsonType: "object",
          properties: {
            hallucination_incidents: { bsonType: "int" },
            bias_flags: { bsonType: "int" },
            safety_violations: { bsonType: "int" },
            compliance_score: { bsonType: "double" }
          }
        },
        resource_utilization: {
          bsonType: "object",
          properties: {
            cpu_average_percent: { bsonType: "double" },
            memory_average_mb: { bsonType: "int" },
            gpu_average_percent: { bsonType: "double" },
            network_mb: { bsonType: "double" }
          }
        },
        alerts_generated: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              alert_type: { enum: ["performance", "error", "quality", "resource"] },
              severity: { enum: ["low", "medium", "high", "critical"] },
              message: { bsonType: "string" },
              timestamp: { bsonType: "date" }
            }
          }
        },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes for agent_performance
db.agent_performance.createIndex({ "agent_id": 1 });
db.agent_performance.createIndex({ "period_start": -1 });
db.agent_performance.createIndex({ "period_type": 1 });
db.agent_performance.createIndex({ "metrics.user_satisfaction_score": -1 });
db.agent_performance.createIndex({ "metrics.error_rate": -1 });

// ============================================================================
// MCP MESSAGE LOG (Model Context Protocol)
// ============================================================================

// Collection: mcp_messages
db.createCollection("mcp_messages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["message_id", "sender_id", "receiver_id", "message_type", "timestamp"],
      properties: {
        _id: { bsonType: "objectId" },
        message_id: {
          bsonType: "string",
          description: "Unique MCP message identifier"
        },
        correlation_id: {
          bsonType: "string",
          description: "ID to correlate related messages"
        },
        sender_id: {
          bsonType: "string",
          description: "Agent ID of sender"
        },
        sender_name: { bsonType: "string" },
        receiver_id: {
          bsonType: "string",
          description: "Agent ID of receiver"
        },
        receiver_name: { bsonType: "string" },
        message_type: {
          enum: ["REQUEST", "RESPONSE", "NOTIFICATION", "ERROR", "HEARTBEAT"],
          description: "MCP message type"
        },
        timestamp: { bsonType: "date" },
        payload: {
          bsonType: "object",
          description: "Message payload data"
        },
        priority: {
          enum: ["low", "normal", "high", "urgent"],
          default: "normal"
        },
        delivery_status: {
          enum: ["sent", "delivered", "failed", "timeout"],
          description: "Message delivery status"
        },
        retry_count: { bsonType: "int" },
        response_expected: { bsonType: "bool" },
        response_timeout_ms: { bsonType: "int" },
        response_received: { bsonType: "bool" },
        response_time_ms: { bsonType: "int" },
        error_details: {
          bsonType: "object",
          properties: {
            error_code: { bsonType: "string" },
            error_message: { bsonType: "string" },
            stack_trace: { bsonType: "string" }
          }
        },
        metadata: {
          bsonType: "object",
          properties: {
            protocol_version: { bsonType: "string" },
            encryption_used: { bsonType: "bool" },
            compression_used: { bsonType: "bool" },
            message_size_bytes: { bsonType: "int" }
          }
        },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes for mcp_messages
db.mcp_messages.createIndex({ "message_id": 1 }, { unique: true });
db.mcp_messages.createIndex({ "correlation_id": 1 });
db.mcp_messages.createIndex({ "sender_id": 1 });
db.mcp_messages.createIndex({ "receiver_id": 1 });
db.mcp_messages.createIndex({ "timestamp": -1 });
db.mcp_messages.createIndex({ "message_type": 1 });
db.mcp_messages.createIndex({ "delivery_status": 1 });

// TTL index to automatically delete old MCP messages after 30 days
db.mcp_messages.createIndex({ "created_at": 1 }, { expireAfterSeconds: 2592000 });

print("MongoDB collections created successfully!");
print("Total collections: 11");
print("  - employee_engagement");
print("  - performance_reviews");
print("  - work_life_balance");
print("  - learning_content");
print("  - user_learning_progress");
print("  - guilds");
print("  - knowledge_base");
print("  - agent_interactions");
print("  - agent_decisions");
print("  - agent_performance");
print("  - mcp_messages");
