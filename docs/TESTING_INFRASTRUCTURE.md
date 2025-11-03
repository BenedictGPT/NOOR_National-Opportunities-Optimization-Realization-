# NOOR Platform - Testing Infrastructure

**Purpose**: Ensure quality, reliability, and performance across all NOOR Platform components  
**Coverage**: Frontend, Backend, API, Database, AI Agents  
**Automation**: CI/CD pipeline with automated testing

---

## Testing Strategy

The NOOR Platform employs a comprehensive testing strategy that ensures code quality, prevents regressions, and validates functionality across all system layers. This multi-layered approach provides confidence in deployments and enables rapid iteration.

### Testing Pyramid

Our testing strategy follows the testing pyramid principle, with a strong foundation of unit tests, a substantial layer of integration tests, and targeted end-to-end tests for critical user journeys. This distribution balances test coverage with execution speed and maintenance overhead.

**Unit Tests** form the foundation, testing individual functions and components in isolation. These tests run quickly, provide immediate feedback during development, and catch bugs early in the development cycle. We aim for 80%+ code coverage at the unit level.

**Integration Tests** verify that different system components work together correctly. These tests validate API endpoints, database operations, and service interactions. Integration tests catch issues that unit tests miss, such as incorrect API contracts or data serialization problems.

**End-to-End Tests** validate complete user workflows from the browser through the backend to the database and back. These tests ensure critical paths work correctly from the user's perspective, catching issues that only manifest in the full system context.

**Performance Tests** measure system behavior under load, identifying bottlenecks and ensuring the platform can handle expected traffic. These tests validate response times, throughput, and resource utilization.

---

## Frontend Testing

### Unit Tests (Jest + React Testing Library)

Frontend unit tests validate individual React components, hooks, and utility functions. We use Jest as the test runner and React Testing Library for component testing, following best practices that encourage testing user behavior rather than implementation details.

**Test Files**: Located alongside source files with `.test.tsx` or `.test.ts` extension  
**Coverage Target**: 80%+ for components, 90%+ for utilities  
**Run Command**: `npm test` or `npm run test:coverage`

**Example Test**:
```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct color class', () => {
    render(<Button color="primary">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('bg-federal-gold');
  });
});
```

### Integration Tests (Playwright)

Integration tests validate multi-component interactions and page-level functionality. These tests ensure components work together correctly and handle state management, routing, and data fetching as expected.

**Test Files**: `frontend/tests/integration/*.spec.ts`  
**Coverage**: Critical user flows, form submissions, navigation  
**Run Command**: `npm run test:integration`

**Example Test**:
```typescript
// assessment-flow.spec.ts
import { test, expect } from '@playwright/test';

test('complete assessment flow', async ({ page }) => {
  await page.goto('/individual/assessments');
  
  // Select assessment
  await page.click('text=Physical Fitness Assessment');
  await page.click('text=Start Assessment');
  
  // Answer questions
  for (let i = 0; i < 12; i++) {
    await page.click('[data-testid="answer-option-3"]');
    await page.click('text=Next');
  }
  
  // Submit and verify results
  await page.click('text=Submit Assessment');
  await expect(page.locator('text=Assessment Complete')).toBeVisible();
  await expect(page.locator('[data-testid="tokens-earned"]')).toContainText('75');
});
```

---

## Backend Testing

### Unit Tests (Pytest)

Backend unit tests validate individual functions, classes, and API endpoint logic. We use pytest with fixtures for test data and mocking for external dependencies.

**Test Files**: `backend/tests/unit/*.py`  
**Coverage Target**: 85%+ for business logic  
**Run Command**: `pytest tests/unit`

**Example Test**:
```python
# test_assessment_scorer.py
import pytest
from app.services.assessment_generator import AssessmentScorer

def test_score_multiple_choice_correct():
    score = AssessmentScorer.score_question(
        question_type="multiple_choice",
        user_answer="C",
        correct_answer="C"
    )
    assert score == 4

def test_score_multiple_choice_incorrect():
    score = AssessmentScorer.score_question(
        question_type="multiple_choice",
        user_answer="A",
        correct_answer="C"
    )
    assert score == 0

def test_score_likert_scale():
    score = AssessmentScorer.score_question(
        question_type="likert_scale",
        user_answer=3,
        correct_answer=None
    )
    assert score == 3

def test_score_competency():
    questions = [
        {"type": "multiple_choice", "correct_answer": "C"},
        {"type": "likert_scale"},
        {"type": "scenario_based"},
        {"type": "self_reflection"}
    ]
    answers = ["C", 3, "D", 4]
    
    result = AssessmentScorer.score_competency(questions, answers)
    
    assert result["total_score"] == 15  # 4+3+4+4
    assert result["max_score"] == 16
    assert result["percentage"] == 93.75
    assert result["rating"] == "Excellent"
```

### Integration Tests (Pytest + TestClient)

Backend integration tests validate API endpoints, database operations, and service interactions using FastAPI's TestClient.

**Test Files**: `backend/tests/integration/*.py`  
**Coverage**: All API endpoints, database CRUD, authentication  
**Run Command**: `pytest tests/integration`

**Example Test**:
```python
# test_assessment_api.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_list_assessments():
    response = client.get("/api/assessments")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_start_assessment():
    response = client.post("/api/assessments/phys_01/start")
    assert response.status_code == 200
    data = response.json()
    assert "attempt_id" in data
    assert data["status"] == "in_progress"

def test_submit_assessment():
    # Start assessment
    start_response = client.post("/api/assessments/phys_01/start")
    attempt_id = start_response.json()["attempt_id"]
    
    # Submit answers
    answers = [
        {"question_id": "q1", "answer": "C"},
        {"question_id": "q2", "answer": 3},
        # ... more answers
    ]
    
    submit_response = client.post(
        f"/api/assessments/phys_01/submit",
        json={"attempt_id": attempt_id, "answers": answers}
    )
    
    assert submit_response.status_code == 200
    data = submit_response.json()
    assert "score" in data
    assert "tokens_earned" in data
    assert data["score"] >= 0 and data["score"] <= 100
```

---

## End-to-End Testing

### E2E Tests (Playwright)

End-to-end tests validate complete user journeys across the entire stack, from browser interactions through API calls to database persistence and back.

**Test Files**: `tests/e2e/*.spec.ts`  
**Coverage**: Critical user paths, authentication, assessment flow, course unlocking  
**Run Command**: `npm run test:e2e`

**Example Test**:
```typescript
// complete-user-journey.spec.ts
import { test, expect } from '@playwright/test';

test('complete user journey: assessment to course unlock', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'fatima@example.ae');
  await page.fill('[name="password"]', 'password123');
  await page.click('text=Login');
  
  // Check initial token balance
  await page.goto('/individual/wallet');
  const initialBalance = await page.textContent('[data-testid="token-balance"]');
  
  // Complete assessment
  await page.goto('/individual/assessments');
  await page.click('text=Mental Faculty Assessment');
  await page.click('text=Start Assessment');
  
  // Answer all questions
  for (let i = 0; i < 12; i++) {
    await page.click('[data-testid="answer-option-3"]');
    await page.click('text=Next');
  }
  
  await page.click('text=Submit');
  
  // Verify tokens earned
  await expect(page.locator('text=Tokens Earned')).toBeVisible();
  const tokensEarned = await page.textContent('[data-testid="tokens-earned"]');
  expect(parseInt(tokensEarned)).toBeGreaterThan(0);
  
  // Navigate to Learning Center
  await page.goto('/individual/learning-center');
  
  // Unlock course
  await page.click('text=Critical Thinking Foundations');
  await page.click('text=Unlock Course');
  await page.click('text=Confirm');
  
  // Verify course unlocked
  await expect(page.locator('text=Course Unlocked')).toBeVisible();
  
  // Check updated balance
  await page.goto('/individual/wallet');
  const finalBalance = await page.textContent('[data-testid="token-balance"]');
  expect(parseInt(finalBalance)).toBeLessThan(parseInt(initialBalance) + parseInt(tokensEarned));
});
```

---

## Performance Testing

### Load Tests (k6)

Load tests measure system performance under various traffic levels, identifying bottlenecks and ensuring the platform can handle expected user loads.

**Test Files**: `tests/performance/*.js`  
**Metrics**: Response time, throughput, error rate, resource utilization  
**Run Command**: `k6 run tests/performance/load-test.js`

**Example Test**:
```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp up to 200 users
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],   // Error rate under 1%
  },
};

export default function () {
  // Test assessment listing
  let response = http.get('https://api.noor.ae/api/assessments');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
  
  // Test assessment start
  response = http.post('https://api.noor.ae/api/assessments/phys_01/start');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'has attempt_id': (r) => JSON.parse(r.body).attempt_id !== undefined,
  });
  
  sleep(2);
}
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

Automated testing runs on every commit and pull request, ensuring code quality before merging.

**Workflow File**: `.github/workflows/test.yml`

```yaml
name: Test Suite

on:
  push:
    branches: [ master, develop ]
  pull_request:
    branches: [ master, develop ]

jobs:
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd frontend && npm install
      - name: Run unit tests
        run: cd frontend && npm test -- --coverage
      - name: Run integration tests
        run: cd frontend && npm run test:integration
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/lcov.info

  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: cd backend && pip install -r requirements.txt
      - name: Run unit tests
        run: cd backend && pytest tests/unit --cov=app
      - name: Run integration tests
        run: cd backend && pytest tests/integration
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage.xml

  e2e-tests:
    runs-on: ubuntu-latest
    needs: [frontend-tests, backend-tests]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Run E2E tests
        run: npm run test:e2e
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

  performance-tests:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/master'
    steps:
      - uses: actions/checkout@v3
      - name: Run k6 load test
        uses: grafana/k6-action@v0.3.0
        with:
          filename: tests/performance/load-test.js
```

---

## Test Coverage Goals

| Component | Unit | Integration | E2E | Target |
|-----------|------|-------------|-----|--------|
| Frontend Components | 80% | 60% | - | 80% |
| Frontend Utilities | 90% | - | - | 90% |
| Backend API | 85% | 90% | - | 85% |
| Backend Services | 90% | 80% | - | 90% |
| Critical Paths | - | - | 100% | 100% |
| **Overall** | **85%** | **75%** | **100%** | **85%** |

---

## Testing Best Practices

### Write Tests First

Following test-driven development (TDD) principles, write tests before implementing features. This ensures testable code design and comprehensive coverage from the start.

### Test User Behavior

Focus tests on user-facing behavior rather than implementation details. This makes tests more resilient to refactoring and better validates actual functionality.

### Keep Tests Fast

Unit tests should run in milliseconds, integration tests in seconds. Fast tests enable rapid feedback and encourage frequent test execution.

### Use Descriptive Names

Test names should clearly describe what is being tested and the expected outcome. Good test names serve as documentation.

### Isolate Tests

Each test should be independent and not rely on other tests. Use setup and teardown to ensure clean state.

### Mock External Dependencies

Use mocks and stubs for external services, databases, and APIs in unit tests. This keeps tests fast and reliable.

---

## Running Tests Locally

### Frontend Tests
```bash
cd frontend
npm test                    # Run unit tests
npm run test:coverage       # Run with coverage
npm run test:integration    # Run integration tests
npm run test:watch          # Run in watch mode
```

### Backend Tests
```bash
cd backend
pytest tests/unit           # Run unit tests
pytest tests/integration    # Run integration tests
pytest --cov=app            # Run with coverage
pytest -v                   # Verbose output
```

### E2E Tests
```bash
npm run test:e2e            # Run all E2E tests
npm run test:e2e:ui         # Run with UI mode
npm run test:e2e:debug      # Run in debug mode
```

### Performance Tests
```bash
k6 run tests/performance/load-test.js
k6 run tests/performance/stress-test.js
```

---

## Continuous Monitoring

### Test Metrics Dashboard

Track test health metrics over time:
- Test pass rate
- Coverage trends
- Test execution time
- Flaky test detection
- Performance benchmarks

### Alerts

Automated alerts for:
- Test failures on master branch
- Coverage drops below threshold
- Performance degradation
- Flaky tests (inconsistent results)

---

## Next Steps

1. ✅ Testing infrastructure documented
2. ⏳ Implement unit tests for critical components
3. ⏳ Set up CI/CD pipeline
4. ⏳ Configure code coverage tracking
5. ⏳ Implement E2E tests for critical paths
6. ⏳ Set up performance testing

**Status**: Testing infrastructure ready for implementation

