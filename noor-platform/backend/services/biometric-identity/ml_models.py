# Machine Learning Models Module
# NOOR Platform v7.1 - Biometric Identity Service

import torch
import torchvision.transforms as transforms
from facenet_pytorch import MTCNN, InceptionResnetV1
from speechbrain.pretrained import EncoderClassifier
import cv2
import numpy as np
from typing import Tuple, Optional
import logging
from PIL import Image
import io

logger = logging.getLogger(__name__)

# =============================================================================
# FACIAL RECOGNITION MODEL
# =============================================================================

class FacialRecognitionModel:
    """
    FaceNet model for facial recognition.
    Produces 512-dimensional embeddings.
    """

    def __init__(self, device: str = "cuda" if torch.cuda.is_available() else "cpu"):
        self.device = device
        logger.info(f"Initializing FaceNet model on {device}")

        # Face detection model (MTCNN)
        self.mtcnn = MTCNN(
            image_size=160,
            margin=0,
            min_face_size=20,
            thresholds=[0.6, 0.7, 0.7],
            factor=0.709,
            post_process=True,
            device=self.device
        )

        # Face embedding model (InceptionResnetV1)
        self.resnet = InceptionResnetV1(pretrained='vggface2').eval().to(self.device)

        logger.info("FaceNet model initialized successfully")

    def extract_embedding(self, image_bytes: bytes) -> Tuple[np.ndarray, float]:
        """
        Extract 512-dim embedding from facial image.

        Args:
            image_bytes: Raw image bytes

        Returns:
            (embedding, quality_score)
        """
        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_bytes))

            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')

            # Detect face and crop
            face_tensor = self.mtcnn(image)

            if face_tensor is None:
                raise ValueError("No face detected in image")

            # Calculate quality score based on detection confidence
            # TODO: Implement proper quality assessment
            quality_score = 0.85

            # Extract embedding
            with torch.no_grad():
                face_tensor = face_tensor.unsqueeze(0).to(self.device)
                embedding = self.resnet(face_tensor)
                embedding = embedding.cpu().numpy()[0]

            # Normalize embedding
            embedding = embedding / np.linalg.norm(embedding)

            logger.info(f"Extracted facial embedding: shape={embedding.shape}, quality={quality_score:.2f}")

            return embedding, quality_score

        except Exception as e:
            logger.error(f"Failed to extract facial embedding: {e}")
            raise

    def calculate_similarity(self, embedding1: np.ndarray, embedding2: np.ndarray) -> float:
        """
        Calculate cosine similarity between two embeddings.

        Returns:
            Similarity score between 0.0 and 1.0
        """
        # Cosine similarity
        similarity = np.dot(embedding1, embedding2)

        # Convert to [0, 1] range
        similarity = (similarity + 1) / 2

        return float(similarity)


# =============================================================================
# VOICE RECOGNITION MODEL
# =============================================================================

class VoiceRecognitionModel:
    """
    SpeechBrain model for speaker recognition.
    Produces 256-dimensional embeddings.
    """

    def __init__(self, device: str = "cuda" if torch.cuda.is_available() else "cpu"):
        self.device = device
        logger.info(f"Initializing SpeechBrain model on {device}")

        # Speaker recognition model
        self.encoder = EncoderClassifier.from_hparams(
            source="speechbrain/spkrec-ecapa-voxceleb",
            savedir="models/speechbrain",
            run_opts={"device": self.device}
        )

        logger.info("SpeechBrain model initialized successfully")

    def extract_embedding(self, audio_bytes: bytes) -> Tuple[np.ndarray, float]:
        """
        Extract 256-dim embedding from voice audio.

        Args:
            audio_bytes: Raw audio bytes (WAV format)

        Returns:
            (embedding, quality_score)
        """
        try:
            # TODO: Convert audio bytes to proper format for SpeechBrain
            # This is a simplified implementation

            # For now, assume audio is already in correct format
            # In production, would need proper audio preprocessing

            # Extract embedding
            embedding = self.encoder.encode_batch(audio_bytes)
            embedding = embedding.cpu().numpy()[0]

            # Calculate quality score based on audio characteristics
            # TODO: Implement SNR, duration, clarity checks
            quality_score = 0.82

            # Normalize embedding
            embedding = embedding / np.linalg.norm(embedding)

            logger.info(f"Extracted voice embedding: shape={embedding.shape}, quality={quality_score:.2f}")

            return embedding, quality_score

        except Exception as e:
            logger.error(f"Failed to extract voice embedding: {e}")
            raise

    def calculate_similarity(self, embedding1: np.ndarray, embedding2: np.ndarray) -> float:
        """
        Calculate cosine similarity between two voice embeddings.

        Returns:
            Similarity score between 0.0 and 1.0
        """
        similarity = np.dot(embedding1, embedding2)
        similarity = (similarity + 1) / 2
        return float(similarity)


# =============================================================================
# LIVENESS DETECTION
# =============================================================================

class LivenessDetector:
    """
    Liveness detection to prevent spoofing attacks.
    """

    def __init__(self):
        logger.info("Initializing liveness detector")
        # TODO: Load liveness detection model
        # Could use MediaPipe, FaceX-Zoo, or custom model

    def check_facial_liveness(self, image_bytes: bytes) -> Tuple[bool, float]:
        """
        Check if facial image is from a live person.

        Returns:
            (is_live, confidence_score)
        """
        # TODO: Implement actual liveness detection:
        # - Texture analysis (detect print/screen)
        # - 3D depth analysis
        # - Motion detection (blink, smile)
        # - Reflection detection
        # - Color histogram analysis

        # Mock implementation
        is_live = True
        confidence = 0.95

        logger.info(f"Facial liveness check: live={is_live}, confidence={confidence:.2f}")

        return is_live, confidence

    def check_voice_liveness(self, audio_bytes: bytes) -> Tuple[bool, float]:
        """
        Check if voice audio is from a live person.

        Returns:
            (is_live, confidence_score)
        """
        # TODO: Implement voice liveness detection:
        # - Voice activity detection
        # - Anti-replay detection
        # - Acoustic feature analysis
        # - Background noise analysis

        # Mock implementation
        is_live = True
        confidence = 0.92

        logger.info(f"Voice liveness check: live={is_live}, confidence={confidence:.2f}")

        return is_live, confidence


# =============================================================================
# QUALITY ASSESSMENT
# =============================================================================

class QualityAssessor:
    """
    Assess quality of biometric samples.
    """

    def __init__(self):
        logger.info("Initializing quality assessor")

    def assess_image_quality(self, image_bytes: bytes) -> Tuple[float, list, list]:
        """
        Assess quality of facial image.

        Returns:
            (quality_score, issues, recommendations)
        """
        issues = []
        recommendations = []

        try:
            # Convert to OpenCV format
            image = cv2.imdecode(
                np.frombuffer(image_bytes, np.uint8),
                cv2.IMREAD_COLOR
            )

            # Check resolution
            height, width = image.shape[:2]
            if width < 640 or height < 480:
                issues.append("Low resolution")
                recommendations.append("Use higher resolution camera (min 640x480)")

            # Check brightness
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            brightness = np.mean(gray)
            if brightness < 50:
                issues.append("Too dark")
                recommendations.append("Improve lighting")
            elif brightness > 200:
                issues.append("Too bright")
                recommendations.append("Reduce lighting or avoid direct light")

            # Check sharpness (Laplacian variance)
            laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
            if laplacian_var < 100:
                issues.append("Blurry image")
                recommendations.append("Hold camera steady and ensure focus")

            # Calculate overall quality score
            quality_score = 1.0

            if issues:
                quality_score -= len(issues) * 0.15

            quality_score = max(0.0, min(1.0, quality_score))

            logger.info(f"Image quality assessment: score={quality_score:.2f}, issues={len(issues)}")

            return quality_score, issues, recommendations

        except Exception as e:
            logger.error(f"Failed to assess image quality: {e}")
            return 0.0, ["Failed to process image"], ["Try again with a clear image"]

    def assess_audio_quality(self, audio_bytes: bytes) -> Tuple[float, list, list]:
        """
        Assess quality of voice audio.

        Returns:
            (quality_score, issues, recommendations)
        """
        issues = []
        recommendations = []

        # TODO: Implement audio quality assessment:
        # - SNR (Signal-to-Noise Ratio)
        # - Duration check
        # - Sample rate check
        # - Clipping detection
        # - Silence detection

        # Mock implementation
        quality_score = 0.85

        logger.info(f"Audio quality assessment: score={quality_score:.2f}")

        return quality_score, issues, recommendations


# =============================================================================
# MODEL MANAGER
# =============================================================================

class BiometricModelManager:
    """
    Singleton manager for all biometric models.
    """

    _instance = None
    _initialized = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if not self._initialized:
            logger.info("Initializing Biometric Model Manager")

            self.facial_model = FacialRecognitionModel()
            self.voice_model = VoiceRecognitionModel()
            self.liveness_detector = LivenessDetector()
            self.quality_assessor = QualityAssessor()

            self._initialized = True
            logger.info("Biometric Model Manager initialized successfully")

    def get_facial_model(self) -> FacialRecognitionModel:
        """Get facial recognition model"""
        return self.facial_model

    def get_voice_model(self) -> VoiceRecognitionModel:
        """Get voice recognition model"""
        return self.voice_model

    def get_liveness_detector(self) -> LivenessDetector:
        """Get liveness detector"""
        return self.liveness_detector

    def get_quality_assessor(self) -> QualityAssessor:
        """Get quality assessor"""
        return self.quality_assessor


# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def get_model_manager() -> BiometricModelManager:
    """Get global model manager instance"""
    return BiometricModelManager()
