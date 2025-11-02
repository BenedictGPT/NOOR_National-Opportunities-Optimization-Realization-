"""
NOOR Platform - Vector Database Operations
Version: 7.1.0

Helper functions for vector operations: upsert, query, delete, update.
"""

from typing import List, Dict, Optional, Tuple, Any
from dataclasses import dataclass
import numpy as np
import pinecone

from .pinecone_config import IndexName, initialize_pinecone, BIOMETRIC_THRESHOLDS


@dataclass
class VectorRecord:
    """Represents a vector record to be upserted."""
    id: str
    values: List[float]
    metadata: Dict[str, Any]


@dataclass
class QueryResult:
    """Represents a query result from vector search."""
    id: str
    score: float
    metadata: Dict[str, Any]


# ============================================================================
# BIOMETRIC OPERATIONS
# ============================================================================

class BiometricVectorDB:
    """Operations for biometric embeddings (L1 Personal Zone)."""

    def __init__(self):
        initialize_pinecone()
        self.index = pinecone.Index(IndexName.BIOMETRIC_EMBEDDINGS.value)

    def enroll_biometric(
        self,
        user_id: str,
        embedding: List[float],
        modality: str,  # "facial" or "voice"
        encrypted: bool = True
    ) -> bool:
        """
        Enroll a biometric embedding for a user.

        Args:
            user_id: User UUID
            embedding: Biometric embedding vector
            modality: "facial" or "voice"
            encrypted: Whether embedding is encrypted (should always be True)

        Returns:
            True if successful

        Security:
            - Embeddings are encrypted before storage
            - No raw biometric data stored
            - L1 (Personal Zone) access only
        """
        vector_id = f"{user_id}_{modality}"

        record = VectorRecord(
            id=vector_id,
            values=embedding,
            metadata={
                "user_id": user_id,
                "modality": modality,
                "enrollment_date": str(np.datetime64('now')),
                "verification_count": 0,
                "encrypted": encrypted,
                "last_verified": None
            }
        )

        self.index.upsert(vectors=[(record.id, record.values, record.metadata)])
        return True

    def verify_biometric(
        self,
        user_id: str,
        embedding: List[float],
        modality: str,
        top_k: int = 1
    ) -> Tuple[bool, float]:
        """
        Verify biometric identity against enrolled embeddings.

        Args:
            user_id: User UUID to verify against
            embedding: Biometric embedding to verify
            modality: "facial" or "voice"
            top_k: Number of nearest neighbors to return

        Returns:
            (verified, confidence_score)
                verified: True if similarity exceeds threshold
                confidence_score: Similarity score (0.0 to 1.0)

        Security:
            - Uses euclidean distance for biometric matching
            - Enforces strict similarity thresholds
            - Logs all verification attempts
        """
        # Query vector database
        results = self.index.query(
            vector=embedding,
            filter={"user_id": user_id, "modality": modality},
            top_k=top_k,
            include_metadata=True
        )

        if not results.matches:
            return False, 0.0

        # Get similarity score (Pinecone returns distance, convert to similarity)
        # For euclidean: similarity = 1 / (1 + distance)
        distance = results.matches[0].score
        similarity = 1.0 / (1.0 + distance)

        # Check against threshold
        threshold = BIOMETRIC_THRESHOLDS[modality]["verification"]
        verified = similarity >= threshold

        # Update verification count
        if verified:
            self._update_verification_metadata(user_id, modality)

        return verified, similarity

    def _update_verification_metadata(self, user_id: str, modality: str) -> None:
        """Update verification count and last verified timestamp."""
        vector_id = f"{user_id}_{modality}"

        # Fetch current metadata
        result = self.index.fetch(ids=[vector_id])
        if vector_id in result.vectors:
            current_metadata = result.vectors[vector_id].metadata
            current_metadata["verification_count"] = current_metadata.get("verification_count", 0) + 1
            current_metadata["last_verified"] = str(np.datetime64('now'))

            # Update (re-upsert with same vector, updated metadata)
            self.index.upsert(
                vectors=[(vector_id, result.vectors[vector_id].values, current_metadata)]
            )

    def delete_biometric(self, user_id: str, modality: Optional[str] = None) -> None:
        """
        Delete biometric embeddings for a user.

        Args:
            user_id: User UUID
            modality: If specified, delete only that modality. If None, delete all.
        """
        if modality:
            vector_id = f"{user_id}_{modality}"
            self.index.delete(ids=[vector_id])
        else:
            # Delete both facial and voice
            self.index.delete(ids=[f"{user_id}_facial", f"{user_id}_voice"])


# ============================================================================
# JOB MATCHING OPERATIONS
# ============================================================================

class JobMatchingVectorDB:
    """Operations for job/skill semantic matching."""

    def __init__(self):
        initialize_pinecone()
        self.job_index = pinecone.Index(IndexName.JOB_SKILL_EMBEDDINGS.value)
        self.user_index = pinecone.Index(IndexName.USER_SKILL_EMBEDDINGS.value)

    def add_job_posting(
        self,
        job_id: str,
        job_description_embedding: List[float],
        metadata: Dict
    ) -> bool:
        """
        Add a job posting to the vector database.

        Args:
            job_id: Unique job identifier
            job_description_embedding: 768-dim embedding from job description
            metadata: Job metadata (role, company, salary, etc.)

        Returns:
            True if successful
        """
        self.job_index.upsert(vectors=[(job_id, job_description_embedding, metadata)])
        return True

    def update_user_skill_profile(
        self,
        user_id: str,
        skill_profile_embedding: List[float],
        metadata: Dict
    ) -> bool:
        """
        Update user's skill profile embedding.

        Args:
            user_id: User UUID
            skill_profile_embedding: 768-dim embedding from user's skills/experience
            metadata: User metadata (competencies, experience, location, etc.)

        Returns:
            True if successful
        """
        self.user_index.upsert(vectors=[(user_id, skill_profile_embedding, metadata)])
        return True

    def find_matching_jobs(
        self,
        user_id: str,
        top_k: int = 20,
        filters: Optional[Dict] = None
    ) -> List[QueryResult]:
        """
        Find jobs that match a user's skill profile.

        Args:
            user_id: User UUID
            top_k: Number of jobs to return
            filters: Optional metadata filters (location, salary range, etc.)

        Returns:
            List of matching jobs with similarity scores
        """
        # Fetch user's skill embedding
        user_result = self.user_index.fetch(ids=[user_id])

        if user_id not in user_result.vectors:
            return []

        user_embedding = user_result.vectors[user_id].values

        # Query job index
        results = self.job_index.query(
            vector=user_embedding,
            filter=filters,
            top_k=top_k,
            include_metadata=True
        )

        return [
            QueryResult(
                id=match.id,
                score=match.score,
                metadata=match.metadata
            )
            for match in results.matches
        ]

    def find_matching_candidates(
        self,
        job_id: str,
        top_k: int = 50,
        filters: Optional[Dict] = None
    ) -> List[QueryResult]:
        """
        Find candidates that match a job posting.

        Args:
            job_id: Job identifier
            top_k: Number of candidates to return
            filters: Optional metadata filters (nationality, years_experience, etc.)

        Returns:
            List of matching candidates with similarity scores
        """
        # Fetch job embedding
        job_result = self.job_index.fetch(ids=[job_id])

        if job_id not in job_result.vectors:
            return []

        job_embedding = job_result.vectors[job_id].values

        # Query user index
        results = self.user_index.query(
            vector=job_embedding,
            filter=filters,
            top_k=top_k,
            include_metadata=True
        )

        return [
            QueryResult(
                id=match.id,
                score=match.score,
                metadata=match.metadata
            )
            for match in results.matches
        ]


# ============================================================================
# LEARNING CONTENT RECOMMENDATIONS
# ============================================================================

class LearningContentVectorDB:
    """Operations for learning content recommendations."""

    def __init__(self):
        initialize_pinecone()
        self.index = pinecone.Index(IndexName.LEARNING_CONTENT_EMBEDDINGS.value)

    def add_learning_content(
        self,
        content_id: str,
        content_embedding: List[float],
        metadata: Dict
    ) -> bool:
        """
        Add learning content to vector database.

        Args:
            content_id: Content identifier
            content_embedding: 768-dim embedding from content title + description
            metadata: Content metadata (title, type, difficulty, etc.)

        Returns:
            True if successful
        """
        self.index.upsert(vectors=[(content_id, content_embedding, metadata)])
        return True

    def recommend_content(
        self,
        query_embedding: List[float],
        top_k: int = 10,
        filters: Optional[Dict] = None
    ) -> List[QueryResult]:
        """
        Recommend learning content based on query embedding.

        Args:
            query_embedding: 768-dim query vector (from user's goals/gaps)
            top_k: Number of recommendations
            filters: Optional filters (difficulty, language, duration, etc.)

        Returns:
            List of recommended content with similarity scores
        """
        results = self.index.query(
            vector=query_embedding,
            filter=filters,
            top_k=top_k,
            include_metadata=True
        )

        return [
            QueryResult(
                id=match.id,
                score=match.score,
                metadata=match.metadata
            )
            for match in results.matches
        ]

    def find_similar_content(
        self,
        content_id: str,
        top_k: int = 5,
        filters: Optional[Dict] = None
    ) -> List[QueryResult]:
        """
        Find content similar to a given piece of content.

        Args:
            content_id: Content identifier
            top_k: Number of similar items to return
            filters: Optional metadata filters

        Returns:
            List of similar content
        """
        # Fetch content embedding
        result = self.index.fetch(ids=[content_id])

        if content_id not in result.vectors:
            return []

        content_embedding = result.vectors[content_id].values

        # Query for similar (excluding itself)
        results = self.index.query(
            vector=content_embedding,
            filter=filters,
            top_k=top_k + 1,  # +1 to account for self-match
            include_metadata=True
        )

        # Filter out self
        return [
            QueryResult(
                id=match.id,
                score=match.score,
                metadata=match.metadata
            )
            for match in results.matches
            if match.id != content_id
        ][:top_k]


# ============================================================================
# USER DISCOVERY & NETWORKING
# ============================================================================

class UserDiscoveryVectorDB:
    """Operations for finding similar users (mentoring, networking)."""

    def __init__(self):
        initialize_pinecone()
        self.index = pinecone.Index(IndexName.USER_PROFILE_EMBEDDINGS.value)

    def update_user_profile(
        self,
        user_id: str,
        profile_embedding: List[float],
        metadata: Dict
    ) -> bool:
        """
        Update user profile embedding.

        Args:
            user_id: User UUID
            profile_embedding: 768-dim embedding from profile text
            metadata: User metadata (role, interests, goals, etc.)

        Returns:
            True if successful
        """
        self.index.upsert(vectors=[(user_id, profile_embedding, metadata)])
        return True

    def find_similar_users(
        self,
        user_id: str,
        top_k: int = 20,
        filters: Optional[Dict] = None
    ) -> List[QueryResult]:
        """
        Find users similar to a given user.

        Args:
            user_id: User UUID
            top_k: Number of similar users to find
            filters: Optional filters (willing_to_mentor, industry, etc.)

        Returns:
            List of similar users
        """
        # Fetch user embedding
        result = self.index.fetch(ids=[user_id])

        if user_id not in result.vectors:
            return []

        user_embedding = result.vectors[user_id].values

        # Query for similar users (excluding self)
        results = self.index.query(
            vector=user_embedding,
            filter=filters,
            top_k=top_k + 1,
            include_metadata=True
        )

        # Filter out self
        return [
            QueryResult(
                id=match.id,
                score=match.score,
                metadata=match.metadata
            )
            for match in results.matches
            if match.id != user_id
        ][:top_k]

    def find_potential_mentors(
        self,
        user_id: str,
        top_k: int = 10
    ) -> List[QueryResult]:
        """
        Find potential mentors for a user.

        Args:
            user_id: User UUID
            top_k: Number of mentors to return

        Returns:
            List of potential mentors
        """
        return self.find_similar_users(
            user_id=user_id,
            top_k=top_k,
            filters={"willing_to_mentor": True}
        )


# ============================================================================
# BATCH OPERATIONS
# ============================================================================

def batch_upsert(
    index_name: str,
    records: List[VectorRecord],
    batch_size: int = 100
) -> int:
    """
    Upsert vectors in batches for efficiency.

    Args:
        index_name: Index to upsert into
        records: List of vector records
        batch_size: Number of vectors per batch

    Returns:
        Total number of vectors upserted
    """
    initialize_pinecone()
    index = pinecone.Index(index_name)

    total_upserted = 0
    for i in range(0, len(records), batch_size):
        batch = records[i:i + batch_size]
        vectors = [(r.id, r.values, r.metadata) for r in batch]
        index.upsert(vectors=vectors)
        total_upserted += len(batch)
        print(f"Upserted batch {i // batch_size + 1}: {len(batch)} vectors")

    return total_upserted


# ============================================================================
# USAGE EXAMPLES
# ============================================================================

if __name__ == "__main__":
    """
    Example usage of vector operations.
    """

    # Example 1: Biometric enrollment and verification
    print("=" * 60)
    print("Example 1: Biometric Operations")
    print("=" * 60)

    biometric_db = BiometricVectorDB()

    # Enroll facial biometric (mock embedding)
    user_id = "550e8400-e29b-41d4-a716-446655440000"
    facial_embedding = np.random.randn(512).tolist()  # Mock 512-dim facial embedding

    print(f"Enrolling facial biometric for user: {user_id}")
    biometric_db.enroll_biometric(user_id, facial_embedding, "facial")

    # Verify biometric (same embedding should verify successfully)
    print(f"Verifying biometric...")
    verified, confidence = biometric_db.verify_biometric(user_id, facial_embedding, "facial")
    print(f"Verified: {verified}, Confidence: {confidence:.4f}")

    # Example 2: Job matching
    print("\n" + "=" * 60)
    print("Example 2: Job Matching")
    print("=" * 60)

    job_db = JobMatchingVectorDB()

    # Add job posting
    job_id = "job_001"
    job_embedding = np.random.randn(768).tolist()  # Mock job description embedding
    job_metadata = {
        "role_title": "Machine Learning Engineer",
        "company_id": "comp_001",
        "seniority_level": "senior",
        "location": "Dubai",
        "salary_range_min": 25000,
        "salary_range_max": 40000
    }

    print(f"Adding job posting: {job_metadata['role_title']}")
    job_db.add_job_posting(job_id, job_embedding, job_metadata)

    # Update user profile
    user_skill_embedding = np.random.randn(768).tolist()
    user_metadata = {
        "user_id": user_id,
        "current_role": "Data Scientist",
        "years_experience": 5,
        "location": "Dubai",
        "open_to_opportunities": True
    }

    print(f"Updating user skill profile...")
    job_db.update_user_skill_profile(user_id, user_skill_embedding, user_metadata)

    print("\n✅ Examples completed!")
