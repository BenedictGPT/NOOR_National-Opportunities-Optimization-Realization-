// NOOR Platform - MongoDB Collection Schemas
// Version: 7.1.0
// Database: noor_mongo

// ============================================================================
// EMPLOYEE ENGAGEMENT & CULTURE
// ============================================================================

// Collection: employee_engagement
db.createCollection("employee_engagement", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["employee_id", "survey_date", "metrics"],
      properties: {
        _id: {
          bsonType: "objectId"
        },
        employee_id: {
          bsonType: "string",
          description: "UUID reference to employees table"
        },
        company_id: {
          bsonType: "string",
          description: "UUID reference to companies table"
        },
        survey_id: {
          bsonType: "string"
        },
        survey_date: {
          bsonType: "date"
        },
        survey_type: {
          enum: ["quarterly", "pulse", "exit", "onboarding", "annual"],
          description: "Type of engagement survey"
        },
        metrics: {
          bsonType: "object",
          required: ["overall_satisfaction", "engagement_score"],
          properties: {
            overall_satisfaction: {
              bsonType: "double",
              minimum: 1.0,
              maximum: 5.0
            },
            engagement_score: {
              bsonType: "double",
              minimum: 0.0,
              maximum: 100.0
            },
            manager_effectiveness: {
              bsonType: "double",
              minimum: 1.0,
              maximum: 5.0
            },
            work_life_balance: {
              bsonType: "double",
              minimum: 1.0,
              maximum: 5.0
            },
            career_development: {
              bsonType: "double",
              minimum: 1.0,
              maximum: 5.0
            },
            compensation_satisfaction: {
              bsonType: "double",
              minimum: 1.0,
              maximum: 5.0
            },
            team_collaboration: {
              bsonType: "double",
              minimum: 1.0,
              maximum: 5.0
            },
            recognition: {
              bsonType: "double",
              minimum: 1.0,
              maximum: 5.0
            },
            company_culture: {
              bsonType: "double",
              minimum: 1.0,
              maximum: 5.0
            }
          }
        },
        survey_responses: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              question_id: { bsonType: "string" },
              question_text: { bsonType: "string" },
              response_type: {
                enum: ["rating", "multiple_choice", "text", "yes_no"]
              },
              response_value: { bsonType: "string" },
              response_score: { bsonType: "double" }
            }
          }
        },
        sentiment_analysis: {
          bsonType: "object",
          properties: {
            overall_sentiment: {
              enum: ["very_negative", "negative", "neutral", "positive", "very_positive"]
            },
            sentiment_score: {
              bsonType: "double",
              minimum: -1.0,
              maximum: 1.0
            },
            key_themes: {
              bsonType: "array",
              items: { bsonType: "string" }
            },
            keywords: {
              bsonType: "array",
              items: { bsonType: "string" }
            }
          }
        },
        participation_rate: {
          bsonType: "double",
          minimum: 0.0,
          maximum: 100.0
        },
        completion_time_minutes: {
          bsonType: "int"
        },
        anonymous: {
          bsonType: "bool",
          description: "Whether survey was completed anonymously"
        },
        created_at: {
          bsonType: "date"
        },
        updated_at: {
          bsonType: "date"
        }
      }
    }
  }
});

// Indexes for employee_engagement
db.employee_engagement.createIndex({ "employee_id": 1 });
db.employee_engagement.createIndex({ "company_id": 1 });
db.employee_engagement.createIndex({ "survey_date": -1 });
db.employee_engagement.createIndex({ "metrics.engagement_score": -1 });
db.employee_engagement.createIndex({ "sentiment_analysis.overall_sentiment": 1 });

// ============================================================================
// PERFORMANCE MANAGEMENT
// ============================================================================

// Collection: performance_reviews
db.createCollection("performance_reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["employee_id", "review_period", "ratings"],
      properties: {
        _id: { bsonType: "objectId" },
        employee_id: {
          bsonType: "string",
          description: "UUID reference to employees table"
        },
        reviewer_id: {
          bsonType: "string",
          description: "UUID reference to employees table"
        },
        review_period: {
          bsonType: "object",
          required: ["start_date", "end_date"],
          properties: {
            start_date: { bsonType: "date" },
            end_date: { bsonType: "date" }
          }
        },
        review_type: {
          enum: ["annual", "mid_year", "quarterly", "probation", "promotion"],
          description: "Type of performance review"
        },
        ratings: {
          bsonType: "object",
          required: ["overall_rating"],
          properties: {
            overall_rating: {
              bsonType: "double",
              minimum: 1.0,
              maximum: 5.0
            },
            quality_of_work: { bsonType: "double", minimum: 1.0, maximum: 5.0 },
            productivity: { bsonType: "double", minimum: 1.0, maximum: 5.0 },
            communication: { bsonType: "double", minimum: 1.0, maximum: 5.0 },
            teamwork: { bsonType: "double", minimum: 1.0, maximum: 5.0 },
            leadership: { bsonType: "double", minimum: 1.0, maximum: 5.0 },
            innovation: { bsonType: "double", minimum: 1.0, maximum: 5.0 },
            problem_solving: { bsonType: "double", minimum: 1.0, maximum: 5.0 },
            reliability: { bsonType: "double", minimum: 1.0, maximum: 5.0 },
            technical_skills: { bsonType: "double", minimum: 1.0, maximum: 5.0 }
          }
        },
        competency_ratings: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              competency_id: { bsonType: "string" },
              competency_name: { bsonType: "string" },
              current_level: {
                enum: ["beginner", "intermediate", "advanced", "expert"]
              },
              target_level: {
                enum: ["beginner", "intermediate", "advanced", "expert"]
              },
              rating: { bsonType: "double" },
              comments: { bsonType: "string" }
            }
          }
        },
        strengths: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        areas_for_improvement: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        goals_achieved: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              goal_id: { bsonType: "string" },
              goal_title: { bsonType: "string" },
              achievement_percentage: { bsonType: "double" },
              status: { enum: ["achieved", "partially_achieved", "not_achieved"] },
              comments: { bsonType: "string" }
            }
          }
        },
        feedback_360: {
          bsonType: "object",
          properties: {
            manager_feedback: { bsonType: "string" },
            peer_feedback: {
              bsonType: "array",
              items: {
                bsonType: "object",
                properties: {
                  peer_id: { bsonType: "string" },
                  feedback: { bsonType: "string" },
                  rating: { bsonType: "double" }
                }
              }
            },
            direct_reports_feedback: {
              bsonType: "array",
              items: {
                bsonType: "object",
                properties: {
                  report_id: { bsonType: "string" },
                  feedback: { bsonType: "string" },
                  rating: { bsonType: "double" }
                }
              }
            },
            self_assessment: { bsonType: "string" }
          }
        },
        development_plan: {
          bsonType: "object",
          properties: {
            learning_objectives: {
              bsonType: "array",
              items: { bsonType: "string" }
            },
            training_recommendations: {
              bsonType: "array",
              items: { bsonType: "string" }
            },
            mentorship_needs: { bsonType: "string" },
            career_aspirations: { bsonType: "string" }
          }
        },
        status: {
          enum: ["draft", "submitted", "under_review", "completed", "acknowledged"],
          description: "Review workflow status"
        },
        submitted_at: { bsonType: "date" },
        completed_at: { bsonType: "date" },
        employee_acknowledged_at: { bsonType: "date" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes for performance_reviews
db.performance_reviews.createIndex({ "employee_id": 1 });
db.performance_reviews.createIndex({ "reviewer_id": 1 });
db.performance_reviews.createIndex({ "review_period.start_date": -1 });
db.performance_reviews.createIndex({ "ratings.overall_rating": -1 });
db.performance_reviews.createIndex({ "status": 1 });

// ============================================================================
// WORK-LIFE BALANCE & WELLNESS
// ============================================================================

// Collection: work_life_balance
db.createCollection("work_life_balance", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["employee_id", "period_start", "period_end", "metrics"],
      properties: {
        _id: { bsonType: "objectId" },
        employee_id: { bsonType: "string" },
        period_start: { bsonType: "date" },
        period_end: { bsonType: "date" },
        metrics: {
          bsonType: "object",
          properties: {
            total_hours_worked: { bsonType: "double" },
            overtime_hours: { bsonType: "double" },
            weekend_work_hours: { bsonType: "double" },
            evening_work_hours: { bsonType: "double" },
            pto_days_used: { bsonType: "double" },
            pto_days_available: { bsonType: "double" },
            sick_days_used: { bsonType: "int" },
            work_from_home_days: { bsonType: "int" },
            office_days: { bsonType: "int" },
            average_daily_hours: { bsonType: "double" },
            flexibility_score: {
              bsonType: "double",
              minimum: 0.0,
              maximum: 100.0
            },
            stress_indicators: {
              bsonType: "object",
              properties: {
                late_night_emails: { bsonType: "int" },
                weekend_emails: { bsonType: "int" },
                meeting_overload_days: { bsonType: "int" },
                consecutive_work_days: { bsonType: "int" }
              }
            }
          }
        },
        wellness_activities: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              activity_type: {
                enum: ["gym", "meditation", "sports", "wellness_program", "mental_health_support"]
              },
              activity_date: { bsonType: "date" },
              duration_minutes: { bsonType: "int" },
              participation: { bsonType: "bool" }
            }
          }
        },
        burnout_risk_score: {
          bsonType: "double",
          minimum: 0.0,
          maximum: 100.0,
          description: "Calculated risk score for employee burnout"
        },
        recommendations: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes for work_life_balance
db.work_life_balance.createIndex({ "employee_id": 1 });
db.work_life_balance.createIndex({ "period_start": -1 });
db.work_life_balance.createIndex({ "burnout_risk_score": -1 });
db.work_life_balance.createIndex({ "metrics.overtime_hours": -1 });

// TTL index to automatically delete old records after 2 years
db.work_life_balance.createIndex({ "created_at": 1 }, { expireAfterSeconds: 63072000 });

// Continue in next file...
