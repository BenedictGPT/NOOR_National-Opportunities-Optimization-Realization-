# Pinecone Vector Database Client
# NOOR Platform v7.1 - Biometric Identity Service

import pinecone
import numpy as np
from typing import List, Dict, Any, Tuple, Optional
import logging
from cryptography.fernet import Fernet
import base64
import os

logger = logging.getLogger(__name__)

# =============================================================================
# PINECONE CLIENT
# =============================================================================

class BiometricVectorStore:
    """
    Pinecone vector store for biometric embeddings.
    Handles encryption, storage, and similarity search.
    """

    def __init__(
        self,
        api_key: str,
        environment: str,
        index_name: str = "noor-biometric-embeddings"
    ):
        """
        Initialize Pinecone client.

        Args:
            api_key: Pinecone API key
            environment: Pinecone environment (e.g., "us-west1-gcp")
            index_name: Name of the Pinecone index
        """
        self.index_name = index_name

        logger.info(f"Initializing Pinecone client for index: {index_name}")

        # Initialize Pinecone
        pinecone.init(api_key=api_key, environment=environment)

        # Get or create index
        if index_name not in pinecone.list_indexes():
            logger.warning(f"Index {index_name} not found. Creating...")
            pinecone.create_index(
                name=index_name,
                dimension=768,  # 512 (facial) + 256 (voice) for multimodal
                metric="euclidean",  # Euclidean distance for biometrics
                pod_type="p1.x2",  # High-performance pod for security-critical
                replicas=2  # High availability
            )
            logger.info(f"Created index: {index_name}")

        self.index = pinecone.Index(index_name)

        logger.info("Pinecone client initialized successfully")

    def encrypt_embedding(self, embedding: np.ndarray, user_key: bytes) -> bytes:
        """
        Encrypt embedding using user-specific key (L1 Personal Zone).

        Args:
            embedding: Numpy array embedding
            user_key: User-specific encryption key

        Returns:
            Encrypted embedding bytes
        """
        # Convert embedding to bytes
        embedding_bytes = embedding.tobytes()

        # Create Fernet cipher with user key
        cipher = Fernet(user_key)

        # Encrypt
        encrypted = cipher.encrypt(embedding_bytes)

        return encrypted

    def decrypt_embedding(self, encrypted: bytes, user_key: bytes, dimension: int) -> np.ndarray:
        """
        Decrypt embedding using user-specific key.

        Args:
            encrypted: Encrypted embedding bytes
            user_key: User-specific encryption key
            dimension: Embedding dimension

        Returns:
            Decrypted numpy array embedding
        """
        # Create Fernet cipher with user key
        cipher = Fernet(user_key)

        # Decrypt
        decrypted_bytes = cipher.decrypt(encrypted)

        # Convert back to numpy array
        embedding = np.frombuffer(decrypted_bytes, dtype=np.float32)

        # Reshape to original dimension
        embedding = embedding.reshape(dimension)

        return embedding

    def store_embedding(
        self,
        user_id: str,
        embedding: np.ndarray,
        modality: str,
        metadata: Dict[str, Any],
        encrypt: bool = True,
        user_key: Optional[bytes] = None
    ) -> str:
        """
        Store biometric embedding in Pinecone.

        Args:
            user_id: User UUID
            embedding: Embedding vector
            modality: 'facial', 'voice', or 'multimodal'
            metadata: Additional metadata
            encrypt: Whether to encrypt embedding
            user_key: User-specific encryption key (required if encrypt=True)

        Returns:
            Vector ID
        """
        try:
            # Generate vector ID
            vector_id = f"{user_id}:{modality}:{metadata.get('enrollment_id', 'default')}"

            # Prepare embedding
            if encrypt:
                if user_key is None:
                    raise ValueError("user_key required for encryption")

                # Encrypt embedding
                encrypted = self.encrypt_embedding(embedding, user_key)

                # Store encrypted flag and encrypted data in metadata
                metadata['encrypted'] = True
                metadata['encrypted_data'] = base64.b64encode(encrypted).decode('utf-8')

                # Use zero vector in Pinecone (actual embedding is in encrypted_data)
                # This prevents Pinecone from learning anything from the embeddings
                embedding_to_store = np.zeros(len(embedding))
            else:
                embedding_to_store = embedding
                metadata['encrypted'] = False

            # Add metadata
            metadata.update({
                'user_id': user_id,
                'modality': modality,
                'enrollment_date': metadata.get('enrollment_date', ''),
                'dimension': len(embedding)
            })

            # Upsert to Pinecone
            self.index.upsert(
                vectors=[
                    (vector_id, embedding_to_store.tolist(), metadata)
                ]
            )

            logger.info(f"Stored embedding for user {user_id}, modality {modality}, encrypted={encrypt}")

            return vector_id

        except Exception as e:
            logger.error(f"Failed to store embedding: {e}")
            raise

    def verify_identity(
        self,
        user_id: str,
        query_embedding: np.ndarray,
        modality: str,
        user_key: Optional[bytes] = None,
        threshold: float = 0.95
    ) -> Tuple[bool, float, Dict[str, Any]]:
        """
        Verify user identity using biometric embedding.

        Args:
            user_id: User UUID to verify against
            query_embedding: Query embedding from verification attempt
            modality: Biometric modality
            user_key: User-specific decryption key
            threshold: Similarity threshold for verification (0.0 to 1.0)

        Returns:
            (verified, confidence_score, match_metadata)
        """
        try:
            # Query Pinecone for user's enrolled embeddings
            # Note: Since we store zero vectors when encrypted, we need to
            # fetch the metadata and decrypt locally

            # Fetch all embeddings for this user and modality
            query_filter = {
                "user_id": user_id,
                "modality": modality
            }

            # In production, would use metadata filtering
            # For now, fetch by ID pattern
            vector_ids = [f"{user_id}:{modality}:default"]  # Simplified

            fetch_response = self.index.fetch(ids=vector_ids)

            if not fetch_response.vectors:
                logger.warning(f"No enrolled embeddings found for user {user_id}, modality {modality}")
                return False, 0.0, {}

            # Get the enrolled embedding
            enrolled_vector = fetch_response.vectors[vector_ids[0]]
            enrolled_metadata = enrolled_vector.metadata

            # Check if encrypted
            if enrolled_metadata.get('encrypted', False):
                if user_key is None:
                    raise ValueError("user_key required to decrypt embedding")

                # Decrypt the stored embedding
                encrypted_data = base64.b64decode(enrolled_metadata['encrypted_data'])
                dimension = enrolled_metadata['dimension']
                enrolled_embedding = self.decrypt_embedding(encrypted_data, user_key, dimension)
            else:
                enrolled_embedding = np.array(enrolled_vector.values)

            # Calculate similarity using Euclidean distance
            distance = np.linalg.norm(query_embedding - enrolled_embedding)

            # Convert Euclidean distance to similarity score (0 to 1)
            # Lower distance = higher similarity
            # Using inverse distance with normalization
            similarity = 1.0 / (1.0 + distance)

            # Verify against threshold
            verified = similarity >= threshold

            match_metadata = {
                'vector_id': vector_ids[0],
                'enrollment_date': enrolled_metadata.get('enrollment_date'),
                'distance': float(distance),
                'similarity': float(similarity),
                'threshold': threshold
            }

            logger.info(f"Verification result for user {user_id}: verified={verified}, similarity={similarity:.4f}")

            return verified, float(similarity), match_metadata

        except Exception as e:
            logger.error(f"Failed to verify identity: {e}")
            return False, 0.0, {"error": str(e)}

    def delete_user_embeddings(self, user_id: str, modality: Optional[str] = None):
        """
        Delete all biometric embeddings for a user (GDPR compliance).

        Args:
            user_id: User UUID
            modality: Optional specific modality to delete (None = delete all)
        """
        try:
            # Build filter
            if modality:
                filter_dict = {"user_id": user_id, "modality": modality}
                logger.info(f"Deleting {modality} embeddings for user {user_id}")
            else:
                filter_dict = {"user_id": user_id}
                logger.info(f"Deleting all biometric embeddings for user {user_id}")

            # Delete from Pinecone using metadata filter
            # Note: Pinecone's delete with filter is in preview
            # In production, may need to fetch IDs first then delete

            # Simplified: delete by ID pattern
            vector_ids_to_delete = []
            modalities = [modality] if modality else ['facial', 'voice', 'multimodal']

            for mod in modalities:
                vector_ids_to_delete.append(f"{user_id}:{mod}:default")

            if vector_ids_to_delete:
                self.index.delete(ids=vector_ids_to_delete)

            logger.info(f"Deleted {len(vector_ids_to_delete)} embeddings for user {user_id}")

        except Exception as e:
            logger.error(f"Failed to delete embeddings: {e}")
            raise

    def get_index_stats(self) -> Dict[str, Any]:
        """Get index statistics"""
        try:
            stats = self.index.describe_index_stats()
            return {
                'total_vector_count': stats.total_vector_count,
                'dimension': stats.dimension,
                'index_fullness': stats.index_fullness
            }
        except Exception as e:
            logger.error(f"Failed to get index stats: {e}")
            return {}


# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def generate_user_encryption_key(user_id: str, master_key: bytes) -> bytes:
    """
    Generate user-specific encryption key from master key.

    Args:
        user_id: User UUID
        master_key: Master encryption key (from env/secrets)

    Returns:
        User-specific Fernet key
    """
    # Derive user-specific key from master key and user ID
    # In production, use proper KDF like HKDF

    import hashlib
    import hmac

    # Create HMAC using master key and user ID
    user_key_material = hmac.new(
        master_key,
        user_id.encode('utf-8'),
        hashlib.sha256
    ).digest()

    # Convert to Fernet key format (URL-safe base64 encoded)
    user_key = base64.urlsafe_b64encode(user_key_material)

    return user_key


# =============================================================================
# GLOBAL CLIENT
# =============================================================================

_vector_store: Optional[BiometricVectorStore] = None


def get_vector_store() -> BiometricVectorStore:
    """Get global vector store instance"""
    global _vector_store
    if _vector_store is None:
        # TODO: Get config from environment
        _vector_store = BiometricVectorStore(
            api_key=os.getenv("PINECONE_API_KEY", ""),
            environment=os.getenv("PINECONE_ENVIRONMENT", "us-west1-gcp"),
            index_name="noor-biometric-embeddings"
        )
    return _vector_store
