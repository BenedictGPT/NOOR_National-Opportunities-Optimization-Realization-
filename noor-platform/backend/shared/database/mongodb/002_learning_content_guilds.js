// NOOR Platform - MongoDB Collection Schemas (Part 2)
// Learning Content, Guilds, and Content Management
// Version: 7.1.0

// ============================================================================
// LEARNING CONTENT MANAGEMENT
// ============================================================================

// Collection: learning_content
db.createCollection("learning_content", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["content_id", "title", "content_type", "language"],
      properties: {
        _id: { bsonType: "objectId" },
        content_id: {
          bsonType: "string",
          description: "Unique content identifier"
        },
        title: { bsonType: "string" },
        title_ar: { bsonType: "string" },
        description: { bsonType: "string" },
        description_ar: { bsonType: "string" },
        content_type: {
          enum: ["course", "module", "lesson", "video", "article", "quiz", "assessment", "certification"],
          description: "Type of learning content"
        },
        category: {
          enum: ["technical", "soft_skills", "leadership", "compliance", "safety", "onboarding", "professional_development"]
        },
        difficulty_level: {
          enum: ["beginner", "intermediate", "advanced", "expert"]
        },
        language: {
          enum: ["en", "ar", "both"],
          description: "Content language"
        },
        duration_minutes: { bsonType: "int" },
        content_url: { bsonType: "string" },
        thumbnail_url: { bsonType: "string" },
        tags: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        competencies_covered: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              competency_id: { bsonType: "string" },
              competency_name: { bsonType: "string" },
              proficiency_level: {
                enum: ["beginner", "intermediate", "advanced", "expert"]
              }
            }
          }
        },
        prerequisites: {
          bsonType: "array",
          items: { bsonType: "string" },
          description: "Required content_ids before this content"
        },
        learning_objectives: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        instructor: {
          bsonType: "object",
          properties: {
            instructor_id: { bsonType: "string" },
            name: { bsonType: "string" },
            bio: { bsonType: "string" },
            photo_url: { bsonType: "string" }
          }
        },
        content_structure: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              section_id: { bsonType: "string" },
              section_title: { bsonType: "string" },
              section_order: { bsonType: "int" },
              duration_minutes: { bsonType: "int" },
              resources: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  properties: {
                    resource_type: { enum: ["video", "pdf", "quiz", "exercise"] },
                    resource_url: { bsonType: "string" },
                    resource_title: { bsonType: "string" }
                  }
                }
              }
            }
          }
        },
        certification: {
          bsonType: "object",
          properties: {
            provides_certificate: { bsonType: "bool" },
            certificate_type: { bsonType: "string" },
            validity_months: { bsonType: "int" },
            passing_score: { bsonType: "double" }
          }
        },
        metadata: {
          bsonType: "object",
          properties: {
            views_count: { bsonType: "int" },
            enrollments_count: { bsonType: "int" },
            completions_count: { bsonType: "int" },
            average_rating: { bsonType: "double" },
            ratings_count: { bsonType: "int" },
            average_completion_time_minutes: { bsonType: "int" }
          }
        },
        status: {
          enum: ["draft", "published", "archived", "under_review"],
          description: "Content publication status"
        },
        created_by: { bsonType: "string" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" },
        published_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes for learning_content
db.learning_content.createIndex({ "content_id": 1 }, { unique: true });
db.learning_content.createIndex({ "content_type": 1 });
db.learning_content.createIndex({ "category": 1 });
db.learning_content.createIndex({ "language": 1 });
db.learning_content.createIndex({ "difficulty_level": 1 });
db.learning_content.createIndex({ "tags": 1 });
db.learning_content.createIndex({ "metadata.average_rating": -1 });
db.learning_content.createIndex({ "created_at": -1 });

// Collection: user_learning_progress
db.createCollection("user_learning_progress", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "content_id", "progress_percentage"],
      properties: {
        _id: { bsonType: "objectId" },
        user_id: { bsonType: "string" },
        content_id: { bsonType: "string" },
        enrollment_date: { bsonType: "date" },
        progress_percentage: {
          bsonType: "double",
          minimum: 0.0,
          maximum: 100.0
        },
        time_spent_minutes: { bsonType: "int" },
        last_accessed: { bsonType: "date" },
        completed: { bsonType: "bool" },
        completion_date: { bsonType: "date" },
        sections_completed: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        quiz_attempts: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              attempt_number: { bsonType: "int" },
              attempt_date: { bsonType: "date" },
              score: { bsonType: "double" },
              passed: { bsonType: "bool" },
              time_taken_minutes: { bsonType: "int" }
            }
          }
        },
        assessment_results: {
          bsonType: "object",
          properties: {
            final_score: { bsonType: "double" },
            passed: { bsonType: "bool" },
            certificate_issued: { bsonType: "bool" },
            certificate_url: { bsonType: "string" },
            certificate_date: { bsonType: "date" }
          }
        },
        user_rating: {
          bsonType: "object",
          properties: {
            rating: { bsonType: "double", minimum: 1.0, maximum: 5.0 },
            review: { bsonType: "string" },
            rated_at: { bsonType: "date" }
          }
        },
        bookmarks: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              section_id: { bsonType: "string" },
              timestamp_seconds: { bsonType: "int" },
              note: { bsonType: "string" }
            }
          }
        },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes for user_learning_progress
db.user_learning_progress.createIndex({ "user_id": 1 });
db.user_learning_progress.createIndex({ "content_id": 1 });
db.user_learning_progress.createIndex({ "user_id": 1, "content_id": 1 }, { unique: true });
db.user_learning_progress.createIndex({ "completed": 1 });
db.user_learning_progress.createIndex({ "last_accessed": -1 });

// ============================================================================
// PROFESSIONAL GUILDS
// ============================================================================

// Collection: guilds
db.createCollection("guilds", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["guild_id", "name", "category", "created_by"],
      properties: {
        _id: { bsonType: "objectId" },
        guild_id: { bsonType: "string" },
        name: { bsonType: "string" },
        name_ar: { bsonType: "string" },
        description: { bsonType: "string" },
        description_ar: { bsonType: "string" },
        category: {
          enum: ["technical", "industry", "professional", "cultural", "social", "learning"],
          description: "Type of professional guild"
        },
        focus_areas: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        logo_url: { bsonType: "string" },
        banner_url: { bsonType: "string" },
        visibility: {
          enum: ["public", "private", "company_only"],
          description: "Guild visibility setting"
        },
        members: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              user_id: { bsonType: "string" },
              role: {
                enum: ["founder", "admin", "moderator", "member"]
              },
              joined_at: { bsonType: "date" },
              contribution_score: { bsonType: "int" }
            }
          }
        },
        member_count: { bsonType: "int" },
        activities: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              activity_id: { bsonType: "string" },
              activity_type: {
                enum: ["meetup", "workshop", "webinar", "hackathon", "discussion", "project"]
              },
              title: { bsonType: "string" },
              description: { bsonType: "string" },
              scheduled_date: { bsonType: "date" },
              duration_minutes: { bsonType: "int" },
              location: { bsonType: "string" },
              virtual_link: { bsonType: "string" },
              max_participants: { bsonType: "int" },
              registered_count: { bsonType: "int" },
              status: {
                enum: ["scheduled", "in_progress", "completed", "cancelled"]
              },
              created_by: { bsonType: "string" },
              created_at: { bsonType: "date" }
            }
          }
        },
        discussions: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              discussion_id: { bsonType: "string" },
              title: { bsonType: "string" },
              author_id: { bsonType: "string" },
              content: { bsonType: "string" },
              tags: { bsonType: "array", items: { bsonType: "string" } },
              replies_count: { bsonType: "int" },
              likes_count: { bsonType: "int" },
              pinned: { bsonType: "bool" },
              created_at: { bsonType: "date" },
              last_activity: { bsonType: "date" }
            }
          }
        },
        resources: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              resource_id: { bsonType: "string" },
              title: { bsonType: "string" },
              resource_type: {
                enum: ["document", "link", "video", "tool", "template"]
              },
              url: { bsonType: "string" },
              uploaded_by: { bsonType: "string" },
              uploaded_at: { bsonType: "date" }
            }
          }
        },
        rules: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        status: {
          enum: ["active", "inactive", "archived"],
          description: "Guild operational status"
        },
        created_by: { bsonType: "string" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes for guilds
db.guilds.createIndex({ "guild_id": 1 }, { unique: true });
db.guilds.createIndex({ "category": 1 });
db.guilds.createIndex({ "visibility": 1 });
db.guilds.createIndex({ "members.user_id": 1 });
db.guilds.createIndex({ "member_count": -1 });
db.guilds.createIndex({ "created_at": -1 });

// ============================================================================
// KNOWLEDGE BASE & DOCUMENTATION
// ============================================================================

// Collection: knowledge_base
db.createCollection("knowledge_base", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["article_id", "title", "content", "category"],
      properties: {
        _id: { bsonType: "objectId" },
        article_id: { bsonType: "string" },
        title: { bsonType: "string" },
        title_ar: { bsonType: "string" },
        content: { bsonType: "string" },
        content_ar: { bsonType: "string" },
        summary: { bsonType: "string" },
        category: {
          enum: ["hr_policies", "benefits", "procedures", "faq", "technical", "compliance", "onboarding"]
        },
        subcategory: { bsonType: "string" },
        tags: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        target_audience: {
          bsonType: "array",
          items: {
            enum: ["all", "employees", "managers", "hr", "executives"]
          }
        },
        attachments: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              filename: { bsonType: "string" },
              url: { bsonType: "string" },
              file_type: { bsonType: "string" },
              file_size_kb: { bsonType: "int" }
            }
          }
        },
        related_articles: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        metadata: {
          bsonType: "object",
          properties: {
            views_count: { bsonType: "int" },
            helpful_votes: { bsonType: "int" },
            not_helpful_votes: { bsonType: "int" },
            last_reviewed: { bsonType: "date" }
          }
        },
        version: { bsonType: "int" },
        status: {
          enum: ["draft", "published", "archived", "under_review"]
        },
        author_id: { bsonType: "string" },
        reviewed_by: { bsonType: "string" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" },
        published_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes for knowledge_base
db.knowledge_base.createIndex({ "article_id": 1 }, { unique: true });
db.knowledge_base.createIndex({ "category": 1 });
db.knowledge_base.createIndex({ "tags": 1 });
db.knowledge_base.createIndex({ "status": 1 });
db.knowledge_base.createIndex({ "metadata.views_count": -1 });
db.knowledge_base.createIndex({ "title": "text", "content": "text" });

// Continue in next file for AI agent logs...
