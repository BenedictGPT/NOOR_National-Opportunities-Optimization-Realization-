"""
NOOR Platform - AI-Powered Assessment Question Generator

Generates assessment questions for 96 competencies across 8 faculties
using Claude AI and predefined templates.
"""

import os
from typing import List, Dict, Any
from anthropic import Anthropic

# Initialize Anthropic client
client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# ============================================================================
# Question Templates
# ============================================================================

QUESTION_TEMPLATES = {
    "multiple_choice": {
        "prompt": """Generate a multiple-choice question for the competency: {competency_name}
        
        Faculty: {faculty_name}
        Competency Description: {competency_description}
        
        Requirements:
        - 1 question with 4 options (A, B, C, D)
        - Clear correct answer
        - Brief explanation (2-3 sentences)
        - Culturally appropriate for UAE context
        - Aligned with {scholar_name}'s teachings where relevant
        
        Format:
        Question: [question text]
        A) [option 1]
        B) [option 2]
        C) [option 3]
        D) [option 4]
        Correct Answer: [letter]
        Explanation: [explanation]
        """,
        "scoring": "0 = wrong, 4 = correct"
    },
    
    "likert_scale": {
        "prompt": """Generate a Likert scale question for the competency: {competency_name}
        
        Faculty: {faculty_name}
        Competency Description: {competency_description}
        
        Requirements:
        - Self-assessment question
        - 5-point scale (Never, Rarely, Sometimes, Often, Always)
        - Measures frequency or intensity
        - Positive framing
        
        Format:
        Question: [question text]
        Scale: Never (0) | Rarely (1) | Sometimes (2) | Often (3) | Always (4)
        Optimal Answer: [Often or Always]
        Explanation: [why this matters]
        """,
        "scoring": "0-4 based on frequency"
    },
    
    "scenario_based": {
        "prompt": """Generate a scenario-based question for the competency: {competency_name}
        
        Faculty: {faculty_name}
        Competency Description: {competency_description}
        
        Requirements:
        - Real-world scenario relevant to UAE workplace/life
        - 4 response options showing different competency levels
        - Clear best practice answer
        - Culturally sensitive
        
        Format:
        Scenario: [realistic situation]
        How would you respond?
        A) [poor response - 0 points]
        B) [fair response - 1 point]
        C) [good response - 3 points]
        D) [excellent response - 4 points]
        Best Answer: D
        Explanation: [why D demonstrates competency]
        """,
        "scoring": "0-4 based on response quality"
    },
    
    "self_reflection": {
        "prompt": """Generate a self-reflection question for the competency: {competency_name}
        
        Faculty: {faculty_name}
        Competency Description: {competency_description}
        
        Requirements:
        - Introspective question
        - 5-level self-assessment
        - Encourages honest self-evaluation
        - Growth-oriented framing
        
        Format:
        Question: [reflective question about current level]
        Rate yourself:
        0 = Not at all
        1 = Slightly
        2 = Moderately
        3 = Very
        4 = Extremely
        Guidance: [what each level means]
        """,
        "scoring": "0-4 self-assessment"
    }
}

# ============================================================================
# Competency Database
# ============================================================================

FACULTIES = {
    "physical": {
        "name": "Physical Faculty",
        "scholar": "Ibn Sina (Avicenna)",
        "competencies": [
            {"id": "phys_01", "name": "Physical Fitness & Endurance", "description": "Cardiovascular health and stamina"},
            {"id": "phys_02", "name": "Strength & Muscular Development", "description": "Force generation and muscle mass"},
            {"id": "phys_03", "name": "Flexibility & Mobility", "description": "Range of motion and joint health"},
            {"id": "phys_04", "name": "Balance & Coordination", "description": "Equilibrium and movement control"},
            {"id": "phys_05", "name": "Nutrition & Dietary Habits", "description": "Healthy eating knowledge and practice"},
            {"id": "phys_06", "name": "Sleep Quality & Rest", "description": "Restorative sleep patterns"},
            {"id": "phys_07", "name": "Stress Management", "description": "Physical stress response and recovery"},
            {"id": "phys_08", "name": "Disease Prevention", "description": "Proactive health maintenance"},
            {"id": "phys_09", "name": "Body Awareness", "description": "Understanding physical signals"},
            {"id": "phys_10", "name": "Recovery & Healing", "description": "Injury recovery and resilience"},
            {"id": "phys_11", "name": "Posture & Ergonomics", "description": "Body alignment and workspace setup"},
            {"id": "phys_12", "name": "Healthy Habits", "description": "Consistent wellness practices"}
        ]
    },
    "mental": {
        "name": "Mental Faculty",
        "scholar": "Al-Farabi",
        "competencies": [
            {"id": "ment_01", "name": "Critical Thinking", "description": "Analytical reasoning and evaluation"},
            {"id": "ment_02", "name": "Problem Solving", "description": "Creative solution generation"},
            {"id": "ment_03", "name": "Memory & Recall", "description": "Information retention and retrieval"},
            {"id": "ment_04", "name": "Attention & Focus", "description": "Sustained concentration"},
            {"id": "ment_05", "name": "Processing Speed", "description": "Quick mental computation"},
            {"id": "ment_06", "name": "Pattern Recognition", "description": "Identifying relationships and trends"},
            {"id": "ment_07", "name": "Logical Reasoning", "description": "Deductive and inductive thinking"},
            {"id": "ment_08", "name": "Decision Making", "description": "Evaluating options and choosing wisely"},
            {"id": "ment_09", "name": "Mental Flexibility", "description": "Adapting thinking to new situations"},
            {"id": "ment_10", "name": "Abstract Thinking", "description": "Conceptual and theoretical reasoning"},
            {"id": "ment_11", "name": "Quantitative Reasoning", "description": "Mathematical and numerical skills"},
            {"id": "ment_12", "name": "Verbal Reasoning", "description": "Language-based logical thinking"}
        ]
    },
    # ... (other faculties follow same structure)
}

# ============================================================================
# Question Generator
# ============================================================================

class AssessmentQuestionGenerator:
    """Generate assessment questions using AI"""
    
    def __init__(self):
        self.client = client
    
    def generate_question(
        self,
        competency_id: str,
        question_type: str,
        faculty_key: str
    ) -> Dict[str, Any]:
        """
        Generate a single question for a competency
        
        Args:
            competency_id: Competency identifier (e.g., "phys_01")
            question_type: Type of question (multiple_choice, likert_scale, etc.)
            faculty_key: Faculty key (e.g., "physical")
        
        Returns:
            Generated question dict
        """
        # Get faculty and competency data
        faculty = FACULTIES[faculty_key]
        competency = next(c for c in faculty["competencies"] if c["id"] == competency_id)
        
        # Get template
        template = QUESTION_TEMPLATES[question_type]
        
        # Format prompt
        prompt = template["prompt"].format(
            competency_name=competency["name"],
            competency_description=competency["description"],
            faculty_name=faculty["name"],
            scholar_name=faculty["scholar"]
        )
        
        # Generate question using Claude
        message = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )
        
        # Parse response
        question_text = message.content[0].text
        
        return {
            "id": f"{competency_id}_{question_type}",
            "competency_id": competency_id,
            "competency_name": competency["name"],
            "faculty": faculty_key,
            "type": question_type,
            "content": question_text,
            "scoring": template["scoring"]
        }
    
    def generate_competency_assessment(
        self,
        competency_id: str,
        faculty_key: str
    ) -> List[Dict[str, Any]]:
        """
        Generate complete assessment (4 questions) for a competency
        
        Args:
            competency_id: Competency identifier
            faculty_key: Faculty key
        
        Returns:
            List of 4 questions
        """
        questions = []
        
        for question_type in ["multiple_choice", "likert_scale", "scenario_based", "self_reflection"]:
            question = self.generate_question(competency_id, question_type, faculty_key)
            questions.append(question)
        
        return questions
    
    def generate_faculty_assessment(self, faculty_key: str) -> List[Dict[str, Any]]:
        """
        Generate complete assessment for a faculty (48 questions)
        
        Args:
            faculty_key: Faculty key
        
        Returns:
            List of 48 questions (12 competencies × 4 questions)
        """
        questions = []
        faculty = FACULTIES[faculty_key]
        
        for competency in faculty["competencies"]:
            competency_questions = self.generate_competency_assessment(
                competency["id"],
                faculty_key
            )
            questions.extend(competency_questions)
        
        return questions
    
    def generate_all_assessments(self) -> Dict[str, List[Dict[str, Any]]]:
        """
        Generate complete assessment for all 8 faculties (384 questions)
        
        Returns:
            Dict mapping faculty keys to question lists
        """
        all_questions = {}
        
        for faculty_key in FACULTIES.keys():
            all_questions[faculty_key] = self.generate_faculty_assessment(faculty_key)
        
        return all_questions

# ============================================================================
# Scoring System
# ============================================================================

class AssessmentScorer:
    """Score assessment responses"""
    
    @staticmethod
    def score_question(question_type: str, user_answer: Any, correct_answer: Any) -> int:
        """
        Score a single question
        
        Args:
            question_type: Type of question
            user_answer: User's answer
            correct_answer: Correct answer
        
        Returns:
            Score (0-4 points)
        """
        if question_type == "multiple_choice":
            return 4 if user_answer == correct_answer else 0
        
        elif question_type == "likert_scale":
            return int(user_answer)  # 0-4 scale
        
        elif question_type == "scenario_based":
            # Map A=0, B=1, C=3, D=4
            scoring_map = {"A": 0, "B": 1, "C": 3, "D": 4}
            return scoring_map.get(user_answer, 0)
        
        elif question_type == "self_reflection":
            return int(user_answer)  # 0-4 scale
        
        return 0
    
    @staticmethod
    def score_competency(questions: List[Dict], answers: List[Any]) -> Dict[str, Any]:
        """
        Score a competency (4 questions)
        
        Args:
            questions: List of 4 questions
            answers: List of 4 answers
        
        Returns:
            Competency score dict
        """
        total_score = 0
        max_score = 16  # 4 questions × 4 points
        
        for question, answer in zip(questions, answers):
            score = AssessmentScorer.score_question(
                question["type"],
                answer,
                question.get("correct_answer")
            )
            total_score += score
        
        percentage = (total_score / max_score) * 100
        
        return {
            "total_score": total_score,
            "max_score": max_score,
            "percentage": percentage,
            "rating": AssessmentScorer.get_rating(percentage)
        }
    
    @staticmethod
    def score_faculty(competency_scores: List[Dict]) -> Dict[str, Any]:
        """
        Score a faculty (12 competencies)
        
        Args:
            competency_scores: List of 12 competency scores
        
        Returns:
            Faculty score dict
        """
        total_score = sum(c["total_score"] for c in competency_scores)
        max_score = 192  # 12 competencies × 16 points
        percentage = (total_score / max_score) * 100
        
        return {
            "total_score": total_score,
            "max_score": max_score,
            "percentage": percentage,
            "rating": AssessmentScorer.get_rating(percentage),
            "competency_scores": competency_scores
        }
    
    @staticmethod
    def get_rating(percentage: float) -> str:
        """Get rating based on percentage"""
        if percentage >= 90:
            return "Excellent"
        elif percentage >= 80:
            return "Good"
        elif percentage >= 70:
            return "Average"
        elif percentage >= 60:
            return "Fair"
        else:
            return "Needs Improvement"

# ============================================================================
# Usage Example
# ============================================================================

if __name__ == "__main__":
    # Initialize generator
    generator = AssessmentQuestionGenerator()
    
    # Generate single question
    question = generator.generate_question(
        competency_id="phys_01",
        question_type="multiple_choice",
        faculty_key="physical"
    )
    print("Sample Question:", question)
    
    # Generate competency assessment (4 questions)
    competency_assessment = generator.generate_competency_assessment(
        competency_id="phys_01",
        faculty_key="physical"
    )
    print(f"\nGenerated {len(competency_assessment)} questions for competency")
    
    # Generate faculty assessment (48 questions)
    # faculty_assessment = generator.generate_faculty_assessment("physical")
    # print(f"\nGenerated {len(faculty_assessment)} questions for Physical Faculty")
    
    # Generate all assessments (384 questions)
    # all_assessments = generator.generate_all_assessments()
    # total_questions = sum(len(q) for q in all_assessments.values())
    # print(f"\nGenerated {total_questions} total questions across all faculties")

