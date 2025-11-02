"""
NOOR Platform - Pinecone Vector Database Configuration
Version: 7.1.0

Purpose: Configure vector database for:
- Biometric embeddings (facial, voice)
- Semantic job/skill matching
- Content recommendations
- Similar user discovery
"""

import os
from enum import Enum
from typing import Dict, List, Optional
from dataclasses import dataclass

import pinecone


class IndexName(str, Enum):
    """Vector database index names."""
    BIOMETRIC_EMBEDDINGS = "noor-biometric-embeddings"
    JOB_SKILL_EMBEDDINGS = "noor-job-skill-embeddings"
    USER_SKILL_EMBEDDINGS = "noor-user-skill-embeddings"
    LEARNING_CONTENT_EMBEDDINGS = "noor-learning-content-embeddings"
    USER_PROFILE_EMBEDDINGS = "noor-user-profile-embeddings"


class DistanceMetric(str, Enum):
    """Distance metrics for similarity search."""
    COSINE = "cosine"  # For semantic similarity
    EUCLIDEAN = "euclidean"  # For biometric matching
    DOT_PRODUCT = "dotproduct"  # For recommendation systems


@dataclass
class IndexConfig:
    """Configuration for a Pinecone index."""
    name: str
    dimension: int
    metric: DistanceMetric
    pod_type: str = "p1.x1"  # Performance pod
    replicas: int = 1
    shards: int = 1
    metadata_config: Optional[Dict] = None

    def to_dict(self) -> Dict:
        """Convert to Pinecone index spec."""
        return {
            "name": self.name,
            "dimension": self.dimension,
            "metric": self.metric.value,
            "pod_type": self.pod_type,
            "replicas": self.replicas,
            "shards": self.shards,
            "metadata_config": self.metadata_config or {}
        }


# ============================================================================
# INDEX CONFIGURATIONS
# ============================================================================

# 1. BIOMETRIC EMBEDDINGS INDEX
# Purpose: Store facial and voice biometric embeddings for identity verification
# Security: L1 (Personal Zone) - User-scoped encryption
# Access: Biometric Identity Service ONLY

BIOMETRIC_INDEX_CONFIG = IndexConfig(
    name=IndexName.BIOMETRIC_EMBEDDINGS.value,
    dimension=768,  # 512 (facial) + 256 (voice) = 768 concatenated
    metric=DistanceMetric.EUCLIDEAN,  # Better for biometric matching
    pod_type="p1.x2",  # Higher performance for security-critical operations
    replicas=2,  # High availability for critical service
    metadata_config={
        "indexed": [
            "user_id",
            "modality",  # "facial" or "voice"
            "enrollment_date",
            "last_verified",
            "verification_count",
            "encrypted"  # Always true
        ]
    }
)

# Biometric similarity thresholds
BIOMETRIC_THRESHOLDS = {
    "facial": {
        "verification": 0.95,  # 95% similarity for identity verification
        "far_target": 0.001,  # False Acceptance Rate < 0.1%
        "frr_target": 0.01,  # False Rejection Rate < 1%
    },
    "voice": {
        "verification": 0.92,  # 92% similarity for voice verification
        "far_target": 0.002,
        "frr_target": 0.02,
    },
    "multimodal": {
        "verification": 0.97,  # Higher confidence with both
        "far_target": 0.0001,  # Ultra-low FAR
    }
}


# 2. JOB & SKILL EMBEDDINGS INDEX
# Purpose: Semantic search for job descriptions and skill requirements
# Model: Sentence Transformers (768-dim)

JOB_SKILL_INDEX_CONFIG = IndexConfig(
    name=IndexName.JOB_SKILL_EMBEDDINGS.value,
    dimension=768,  # sentence-transformers/paraphrase-multilingual-mpnet-base-v2
    metric=DistanceMetric.COSINE,  # Best for semantic similarity
    pod_type="p1.x1",
    replicas=1,
    metadata_config={
        "indexed": [
            "job_id",
            "company_id",
            "role_title",
            "seniority_level",
            "department",
            "industry",
            "location",
            "salary_range_min",
            "salary_range_max",
            "posted_date",
            "status",
            "language",  # "en" or "ar"
            "required_skills",  # Array of skill IDs
            "emiratization_priority"  # Boolean
        ]
    }
)


# 3. USER SKILL PROFILE EMBEDDINGS
# Purpose: Match users to jobs based on skill profiles
# Model: Sentence Transformers (768-dim)

USER_SKILL_INDEX_CONFIG = IndexConfig(
    name=IndexName.USER_SKILL_EMBEDDINGS.value,
    dimension=768,
    metric=DistanceMetric.COSINE,
    pod_type="p1.x1",
    replicas=1,
    metadata_config={
        "indexed": [
            "user_id",
            "nationality",
            "current_role",
            "years_experience",
            "location",
            "competency_ids",  # Array of competency IDs
            "skill_levels",  # Array of proficiency levels
            "open_to_opportunities",  # Boolean
            "preferred_industries",  # Array
            "last_updated"
        ]
    }
)


# 4. LEARNING CONTENT EMBEDDINGS
# Purpose: Semantic content recommendations
# Model: Sentence Transformers (768-dim)

LEARNING_CONTENT_INDEX_CONFIG = IndexConfig(
    name=IndexName.LEARNING_CONTENT_EMBEDDINGS.value,
    dimension=768,
    metric=DistanceMetric.COSINE,
    pod_type="p1.x1",
    replicas=1,
    metadata_config={
        "indexed": [
            "content_id",
            "title",
            "content_type",  # course, video, article, etc.
            "category",  # technical, soft_skills, etc.
            "difficulty_level",  # beginner, intermediate, advanced
            "duration_minutes",
            "language",
            "rating",
            "competencies",  # Array of competency IDs covered
            "prerequisites",  # Array of prerequisite content IDs
            "provider",
            "certification_available"
        ]
    }
)


# 5. USER PROFILE EMBEDDINGS (for similar user discovery)
# Purpose: Find similar users for mentoring, networking, peer matching
# Model: Sentence Transformers (768-dim)

USER_PROFILE_INDEX_CONFIG = IndexConfig(
    name=IndexName.USER_PROFILE_EMBEDDINGS.value,
    dimension=768,
    metric=DistanceMetric.COSINE,
    pod_type="p1.x1",
    replicas=1,
    metadata_config={
        "indexed": [
            "user_id",
            "role",
            "industry",
            "interests",  # Array
            "career_goals",  # Array
            "years_experience",
            "location",
            "languages",  # Array
            "willing_to_mentor",  # Boolean
            "seeking_mentor",  # Boolean
        ]
    }
)


# ============================================================================
# PINECONE CLIENT INITIALIZATION
# ============================================================================

def initialize_pinecone(
    api_key: Optional[str] = None,
    environment: Optional[str] = None
) -> None:
    """
    Initialize Pinecone client.

    Args:
        api_key: Pinecone API key (defaults to PINECONE_API_KEY env var)
        environment: Pinecone environment (defaults to PINECONE_ENVIRONMENT env var)
    """
    api_key = api_key or os.getenv("PINECONE_API_KEY")
    environment = environment or os.getenv("PINECONE_ENVIRONMENT", "us-west1-gcp")

    if not api_key:
        raise ValueError("PINECONE_API_KEY environment variable not set")

    pinecone.init(api_key=api_key, environment=environment)
    print(f"Pinecone initialized in environment: {environment}")


def create_index(config: IndexConfig, delete_if_exists: bool = False) -> None:
    """
    Create a Pinecone index with the given configuration.

    Args:
        config: Index configuration
        delete_if_exists: If True, delete existing index before creating
    """
    index_name = config.name

    # Check if index exists
    existing_indexes = pinecone.list_indexes()

    if index_name in existing_indexes:
        if delete_if_exists:
            print(f"Deleting existing index: {index_name}")
            pinecone.delete_index(index_name)
        else:
            print(f"Index {index_name} already exists. Skipping creation.")
            return

    # Create index
    print(f"Creating index: {index_name} (dimension={config.dimension}, metric={config.metric.value})")
    pinecone.create_index(
        name=index_name,
        dimension=config.dimension,
        metric=config.metric.value,
        pod_type=config.pod_type,
        replicas=config.replicas,
        shards=config.shards,
        metadata_config=config.metadata_config
    )
    print(f"Index {index_name} created successfully!")


def create_all_indexes(delete_if_exists: bool = False) -> None:
    """Create all NOOR platform vector indexes."""
    initialize_pinecone()

    configs = [
        BIOMETRIC_INDEX_CONFIG,
        JOB_SKILL_INDEX_CONFIG,
        USER_SKILL_INDEX_CONFIG,
        LEARNING_CONTENT_INDEX_CONFIG,
        USER_PROFILE_INDEX_CONFIG,
    ]

    for config in configs:
        try:
            create_index(config, delete_if_exists=delete_if_exists)
        except Exception as e:
            print(f"Error creating index {config.name}: {e}")

    print("\n✅ All indexes created successfully!")
    print(f"Total indexes: {len(configs)}")


def get_index_stats() -> Dict:
    """Get statistics for all indexes."""
    initialize_pinecone()

    stats = {}
    for index_name in pinecone.list_indexes():
        index = pinecone.Index(index_name)
        index_stats = index.describe_index_stats()
        stats[index_name] = {
            "total_vector_count": index_stats.get("total_vector_count", 0),
            "dimension": index_stats.get("dimension", 0),
            "index_fullness": index_stats.get("index_fullness", 0.0),
            "namespaces": index_stats.get("namespaces", {})
        }

    return stats


# ============================================================================
# USAGE EXAMPLES
# ============================================================================

if __name__ == "__main__":
    """
    Example usage:

    python pinecone_config.py
    """

    # Initialize and create all indexes
    try:
        create_all_indexes(delete_if_exists=False)

        # Display index statistics
        print("\n📊 Index Statistics:")
        print("=" * 60)
        stats = get_index_stats()
        for index_name, index_stats in stats.items():
            print(f"\n{index_name}:")
            print(f"  Vectors: {index_stats['total_vector_count']}")
            print(f"  Dimension: {index_stats['dimension']}")
            print(f"  Fullness: {index_stats['index_fullness']:.2%}")

    except Exception as e:
        print(f"Error: {e}")
        print("\nMake sure PINECONE_API_KEY environment variable is set:")
        print("export PINECONE_API_KEY='your-api-key'")
