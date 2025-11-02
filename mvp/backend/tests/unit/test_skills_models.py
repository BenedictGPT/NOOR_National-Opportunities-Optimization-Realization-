"""
Unit tests for Skills Pydantic models
"""

import pytest
from datetime import date, datetime
from pydantic import ValidationError

from app.models.skills import (
    SkillCreate,
    SkillUpdate,
    UserSkillCreate,
    UserSkillUpdate,
    SkillResponse,
    UserSkillResponse,
    ProficiencyLevel,
    SkillCategory
)


class TestSkillCreate:
    """Tests for SkillCreate model"""
    
    def test_valid_skill_create(self):
        """Test creating valid skill"""
        skill = SkillCreate(
            name="Python Programming",
            category=SkillCategory.TECHNICAL,
            description="Programming in Python"
        )
        assert skill.name == "Python Programming"
        assert skill.category == SkillCategory.TECHNICAL
        assert skill.description == "Programming in Python"
    
    def test_skill_name_too_short(self):
        """Test skill name minimum length"""
        with pytest.raises(ValidationError) as exc_info:
            SkillCreate(
                name="P",
                category=SkillCategory.TECHNICAL
            )
        assert "at least 2 characters" in str(exc_info.value)
    
    def test_skill_name_too_long(self):
        """Test skill name maximum length"""
        with pytest.raises(ValidationError) as exc_info:
            SkillCreate(
                name="A" * 201,
                category=SkillCategory.TECHNICAL
            )
        assert "at most 200 characters" in str(exc_info.value)
    
    def test_skill_without_description(self):
        """Test skill creation without description"""
        skill = SkillCreate(
            name="Python Programming",
            category=SkillCategory.TECHNICAL
        )
        assert skill.description is None


class TestUserSkillCreate:
    """Tests for UserSkillCreate model"""
    
    def test_valid_user_skill_create(self):
        """Test creating valid user skill"""
        user_skill = UserSkillCreate(
            skill_id="123e4567-e89b-12d3-a456-426614174000",
            proficiency_level=ProficiencyLevel.ADVANCED,
            years_of_experience=5.0,
            last_used_date=date(2024, 11, 1)
        )
        assert user_skill.skill_id == "123e4567-e89b-12d3-a456-426614174000"
        assert user_skill.proficiency_level == ProficiencyLevel.ADVANCED
        assert user_skill.years_of_experience == 5.0
        assert user_skill.last_used_date == date(2024, 11, 1)
    
    def test_negative_years_experience(self):
        """Test negative years of experience validation"""
        with pytest.raises(ValidationError) as exc_info:
            UserSkillCreate(
                skill_id="123e4567-e89b-12d3-a456-426614174000",
                proficiency_level=ProficiencyLevel.BEGINNER,
                years_of_experience=-1.0
            )
        assert "greater than or equal to 0" in str(exc_info.value)
    
    def test_excessive_years_experience(self):
        """Test excessive years of experience validation"""
        with pytest.raises(ValidationError) as exc_info:
            UserSkillCreate(
                skill_id="123e4567-e89b-12d3-a456-426614174000",
                proficiency_level=ProficiencyLevel.EXPERT,
                years_of_experience=51.0
            )
        assert "less than or equal to 50" in str(exc_info.value)
    
    def test_future_last_used_date(self):
        """Test last used date cannot be in future"""
        from datetime import timedelta
        future_date = date.today() + timedelta(days=1)
        
        with pytest.raises(ValidationError) as exc_info:
            UserSkillCreate(
                skill_id="123e4567-e89b-12d3-a456-426614174000",
                proficiency_level=ProficiencyLevel.INTERMEDIATE,
                last_used_date=future_date
            )
        assert "cannot be in the future" in str(exc_info.value)
    
    def test_minimal_user_skill(self):
        """Test user skill with only required fields"""
        user_skill = UserSkillCreate(
            skill_id="123e4567-e89b-12d3-a456-426614174000",
            proficiency_level=ProficiencyLevel.BEGINNER
        )
        assert user_skill.years_of_experience is None
        assert user_skill.last_used_date is None


class TestUserSkillUpdate:
    """Tests for UserSkillUpdate model"""
    
    def test_update_proficiency_only(self):
        """Test updating only proficiency level"""
        update = UserSkillUpdate(
            proficiency_level=ProficiencyLevel.EXPERT
        )
        assert update.proficiency_level == ProficiencyLevel.EXPERT
        assert update.years_of_experience is None
        assert update.last_used_date is None
    
    def test_update_all_fields(self):
        """Test updating all fields"""
        update = UserSkillUpdate(
            proficiency_level=ProficiencyLevel.ADVANCED,
            years_of_experience=7.5,
            last_used_date=date(2024, 10, 15)
        )
        assert update.proficiency_level == ProficiencyLevel.ADVANCED
        assert update.years_of_experience == 7.5
        assert update.last_used_date == date(2024, 10, 15)
    
    def test_update_validation(self):
        """Test update validation rules"""
        with pytest.raises(ValidationError):
            UserSkillUpdate(
                years_of_experience=-5.0
            )


class TestSkillResponse:
    """Tests for SkillResponse model"""
    
    def test_skill_response_serialization(self):
        """Test skill response model"""
        response = SkillResponse(
            id="123e4567-e89b-12d3-a456-426614174000",
            name="Python Programming",
            category=SkillCategory.TECHNICAL,
            description="Programming in Python",
            created_at=datetime(2024, 1, 1, 0, 0, 0)
        )
        assert response.id == "123e4567-e89b-12d3-a456-426614174000"
        assert response.name == "Python Programming"
        assert response.category == SkillCategory.TECHNICAL


class TestProficiencyLevel:
    """Tests for ProficiencyLevel enum"""
    
    def test_proficiency_levels(self):
        """Test all proficiency levels"""
        assert ProficiencyLevel.BEGINNER == "beginner"
        assert ProficiencyLevel.INTERMEDIATE == "intermediate"
        assert ProficiencyLevel.ADVANCED == "advanced"
        assert ProficiencyLevel.EXPERT == "expert"
    
    def test_invalid_proficiency(self):
        """Test invalid proficiency level"""
        with pytest.raises(ValidationError):
            UserSkillCreate(
                skill_id="123e4567-e89b-12d3-a456-426614174000",
                proficiency_level="master"  # Invalid
            )


class TestSkillCategory:
    """Tests for SkillCategory enum"""
    
    def test_skill_categories(self):
        """Test all skill categories"""
        assert SkillCategory.TECHNICAL == "technical"
        assert SkillCategory.SOFT_SKILLS == "soft_skills"
        assert SkillCategory.LANGUAGE == "language"
        assert SkillCategory.MANAGEMENT == "management"
        assert SkillCategory.CREATIVE == "creative"
        assert SkillCategory.ANALYTICAL == "analytical"
        assert SkillCategory.COMMUNICATION == "communication"
        assert SkillCategory.OTHER == "other"
    
    def test_invalid_category(self):
        """Test invalid skill category"""
        with pytest.raises(ValidationError):
            SkillCreate(
                name="Test Skill",
                category="invalid_category"  # Invalid
            )

