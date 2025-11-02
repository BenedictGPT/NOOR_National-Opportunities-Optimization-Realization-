"""
Unit tests for Work Experience Pydantic models
"""

import pytest
from datetime import date, datetime
from pydantic import ValidationError

from app.models.work_experience import (
    WorkExperienceCreate,
    WorkExperienceUpdate,
    WorkExperienceResponse,
    EmploymentType,
    IndustryType
)


class TestWorkExperienceCreate:
    """Tests for WorkExperienceCreate model"""
    
    def test_valid_current_employment(self):
        """Test creating valid current employment"""
        experience = WorkExperienceCreate(
            company_name="Emirates Digital Solutions",
            job_title="Senior Software Engineer",
            employment_type=EmploymentType.FULL_TIME,
            industry=IndustryType.TECHNOLOGY,
            location="Dubai, UAE",
            start_date=date(2020, 3, 1),
            end_date=None,
            is_current=True,
            description="Lead development of cloud solutions"
        )
        assert experience.company_name == "Emirates Digital Solutions"
        assert experience.is_current is True
        assert experience.end_date is None
    
    def test_valid_past_employment(self):
        """Test creating valid past employment"""
        experience = WorkExperienceCreate(
            company_name="Tech Startup",
            job_title="Junior Developer",
            employment_type=EmploymentType.FULL_TIME,
            start_date=date(2018, 1, 1),
            end_date=date(2020, 2, 28),
            is_current=False
        )
        assert experience.is_current is False
        assert experience.end_date == date(2020, 2, 28)
    
    def test_end_date_before_start_date(self):
        """Test end date must be after start date"""
        with pytest.raises(ValidationError) as exc_info:
            WorkExperienceCreate(
                company_name="Test Company",
                job_title="Developer",
                employment_type=EmploymentType.FULL_TIME,
                start_date=date(2020, 1, 1),
                end_date=date(2019, 12, 31),
                is_current=False
            )
        assert "End date must be after start date" in str(exc_info.value)
    
    def test_future_end_date(self):
        """Test end date cannot be in future"""
        from datetime import timedelta
        future_date = date.today() + timedelta(days=30)
        
        with pytest.raises(ValidationError) as exc_info:
            WorkExperienceCreate(
                company_name="Test Company",
                job_title="Developer",
                employment_type=EmploymentType.FULL_TIME,
                start_date=date(2020, 1, 1),
                end_date=future_date,
                is_current=False
            )
        assert "cannot be in the future" in str(exc_info.value)
    
    def test_current_with_end_date(self):
        """Test current employment cannot have end date"""
        with pytest.raises(ValidationError) as exc_info:
            WorkExperienceCreate(
                company_name="Test Company",
                job_title="Developer",
                employment_type=EmploymentType.FULL_TIME,
                start_date=date(2020, 1, 1),
                end_date=date(2024, 1, 1),
                is_current=True
            )
        assert "Current employment cannot have an end date" in str(exc_info.value)
    
    def test_past_without_end_date(self):
        """Test past employment must have end date"""
        with pytest.raises(ValidationError) as exc_info:
            WorkExperienceCreate(
                company_name="Test Company",
                job_title="Developer",
                employment_type=EmploymentType.FULL_TIME,
                start_date=date(2020, 1, 1),
                end_date=None,
                is_current=False
            )
        assert "Past employment must have an end date" in str(exc_info.value)
    
    def test_with_achievements(self):
        """Test work experience with achievements"""
        experience = WorkExperienceCreate(
            company_name="Test Company",
            job_title="Developer",
            employment_type=EmploymentType.FULL_TIME,
            start_date=date(2020, 1, 1),
            is_current=True,
            achievements=[
                "Reduced latency by 40%",
                "Led migration to microservices",
                "Mentored 3 junior developers"
            ]
        )
        assert len(experience.achievements) == 3
        assert "Reduced latency by 40%" in experience.achievements
    
    def test_with_skills(self):
        """Test work experience with skills"""
        experience = WorkExperienceCreate(
            company_name="Test Company",
            job_title="Developer",
            employment_type=EmploymentType.FULL_TIME,
            start_date=date(2020, 1, 1),
            is_current=True,
            skills_used=[
                "123e4567-e89b-12d3-a456-426614174000",
                "123e4567-e89b-12d3-a456-426614174001"
            ]
        )
        assert len(experience.skills_used) == 2
    
    def test_company_name_too_short(self):
        """Test company name minimum length"""
        with pytest.raises(ValidationError) as exc_info:
            WorkExperienceCreate(
                company_name="A",
                job_title="Developer",
                employment_type=EmploymentType.FULL_TIME,
                start_date=date(2020, 1, 1),
                is_current=True
            )
        assert "at least 2 characters" in str(exc_info.value)
    
    def test_description_too_long(self):
        """Test description maximum length"""
        with pytest.raises(ValidationError) as exc_info:
            WorkExperienceCreate(
                company_name="Test Company",
                job_title="Developer",
                employment_type=EmploymentType.FULL_TIME,
                start_date=date(2020, 1, 1),
                is_current=True,
                description="A" * 2001
            )
        assert "at most 2000 characters" in str(exc_info.value)


class TestWorkExperienceUpdate:
    """Tests for WorkExperienceUpdate model"""
    
    def test_update_single_field(self):
        """Test updating single field"""
        update = WorkExperienceUpdate(
            job_title="Lead Software Engineer"
        )
        assert update.job_title == "Lead Software Engineer"
        assert update.company_name is None
        assert update.description is None
    
    def test_update_multiple_fields(self):
        """Test updating multiple fields"""
        update = WorkExperienceUpdate(
            job_title="Lead Engineer",
            description="Updated responsibilities",
            achievements=["New achievement"]
        )
        assert update.job_title == "Lead Engineer"
        assert update.description == "Updated responsibilities"
        assert len(update.achievements) == 1
    
    def test_update_validation(self):
        """Test update validation rules"""
        with pytest.raises(ValidationError):
            WorkExperienceUpdate(
                end_date=date(2025, 12, 31)  # Future date
            )


class TestEmploymentType:
    """Tests for EmploymentType enum"""
    
    def test_employment_types(self):
        """Test all employment types"""
        assert EmploymentType.FULL_TIME == "full-time"
        assert EmploymentType.PART_TIME == "part-time"
        assert EmploymentType.CONTRACT == "contract"
        assert EmploymentType.INTERNSHIP == "internship"
        assert EmploymentType.FREELANCE == "freelance"
    
    def test_invalid_employment_type(self):
        """Test invalid employment type"""
        with pytest.raises(ValidationError):
            WorkExperienceCreate(
                company_name="Test Company",
                job_title="Developer",
                employment_type="permanent",  # Invalid
                start_date=date(2020, 1, 1),
                is_current=True
            )


class TestIndustryType:
    """Tests for IndustryType enum"""
    
    def test_industry_types(self):
        """Test industry types"""
        assert IndustryType.TECHNOLOGY == "technology"
        assert IndustryType.FINANCE == "finance"
        assert IndustryType.HEALTHCARE == "healthcare"
        assert IndustryType.EDUCATION == "education"
        assert IndustryType.GOVERNMENT == "government"
        assert IndustryType.RETAIL == "retail"
        assert IndustryType.MANUFACTURING == "manufacturing"
        assert IndustryType.CONSTRUCTION == "construction"
        assert IndustryType.HOSPITALITY == "hospitality"
        assert IndustryType.TRANSPORTATION == "transportation"
        assert IndustryType.ENERGY == "energy"
        assert IndustryType.TELECOMMUNICATIONS == "telecommunications"
        assert IndustryType.MEDIA == "media"
        assert IndustryType.REAL_ESTATE == "real_estate"
        assert IndustryType.CONSULTING == "consulting"
        assert IndustryType.OTHER == "other"
    
    def test_optional_industry(self):
        """Test industry is optional"""
        experience = WorkExperienceCreate(
            company_name="Test Company",
            job_title="Developer",
            employment_type=EmploymentType.FULL_TIME,
            start_date=date(2020, 1, 1),
            is_current=True
        )
        assert experience.industry is None


class TestWorkExperienceResponse:
    """Tests for WorkExperienceResponse model"""
    
    def test_response_serialization(self):
        """Test work experience response"""
        response = WorkExperienceResponse(
            id="123e4567-e89b-12d3-a456-426614174000",
            user_id="123e4567-e89b-12d3-a456-426614174001",
            company_name="Test Company",
            job_title="Developer",
            employment_type=EmploymentType.FULL_TIME,
            industry=IndustryType.TECHNOLOGY,
            location="Dubai, UAE",
            start_date=date(2020, 1, 1),
            end_date=None,
            is_current=True,
            description="Test description",
            achievements=["Achievement 1"],
            skills_used=["Python", "AWS"],
            duration_months=44,
            created_at=datetime(2024, 1, 1, 0, 0, 0),
            updated_at=datetime(2024, 1, 1, 0, 0, 0)
        )
        assert response.company_name == "Test Company"
        assert response.duration_months == 44
        assert len(response.skills_used) == 2

