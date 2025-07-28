🧪 Automated Testing Framework with Playwright, BDD, AI & Observability

This project offers an advanced setup for end-to-end testing of web applications using Playwright and Cucumber.js (BDD), enhanced with AI-driven failure analysis, visual validation, and system/test metrics monitoring.

Overview
--------
- BDD (Behavior-Driven Development) using Gherkin scenarios and Cucumber.js
- Playwright for browser automation
- Applitools Eyes for visual regression testing
- AI Integration (Ollama + Mistral) for test failure analysis and selector suggestions
- Prometheus + Grafana + cAdvisor for test and system observability
- Docker-based infrastructure
- Jenkins CI/CD pipeline

Project Structure
-----------------
TEST1/
  features/            # Gherkin scenarios (BDD)
  grafana/             # Grafana dashboards & provisioning
  images/              # Screenshots (failures, AI analysis)
  node_modules/        # Installed dependencies
  pages/               # Page Object Models (POM)
  prometheus/          # Prometheus config files
  report/              # Test reports (JSON, HTML)
  reports/             # Archived reports (Jenkins)
  ressources/          # Selectors & test data (per country)
  steps/               # Step definitions for BDD scenarios
  tests/               # Additional test files
  utils/               # AI, Applitools, test env helpers
  .dockerignore        # Docker exclusions
  .env                 # Environment variables (e.g. BASE_URL)
  cucumber.js          # Cucumber config
  docker-compose.yml   # Full service orchestration
  Dockerfile           # Custom Playwright container
  Jenkinsfile          # Jenkins CI/CD pipeline
  generateFeatureFromText.js   # Create feature file from text prompt (LLM)
  runFeatureGen.js             # CLI to launch generator
  ollama-last-response.txt     # Logs from local Ollama (Mistral)
  test_metrics_exporter.js     # Prometheus exporter for test results
  metrics-server.js            # Optional metrics entrypoint
  generateHtmlReport.js        # HTML reporting from JSON
  prioritized.json             # Features selected by AI
  package.json                 # Project dependencies & scripts
  package-lock.json            # Dependency lock file

AI Failure Analysis
-------------------
- Locally via Ollama (model: mistral)
- Classify test failures (SelectorError, UXError, NetworkError)
- Explain root causes using logs + screenshots
- Suggest selector fixes based on DOM

Testing Workflow
----------------
1. Write .feature files in features/
2. Define steps in steps/
3. Implement page objects in pages/
4. Centralize selectors and data in ressources/
5. Run with Docker:
   docker-compose up --build

Visual Testing (Applitools)
---------------------------
Integrated via @applitools/eyes-playwright for visual regression.

Metrics & Monitoring
--------------------
- Prometheus scrapes /metrics (port 8000)
- test_metrics_exporter.js extracts:
  tests_passed, tests_failed, tests_skipped, tests_duration_seconds
- Grafana dashboards visualize test stats
- cAdvisor monitors container CPU/RAM

CI/CD Pipeline (Jenkins)
------------------------
Automates:
1. Checkout code
2. Build Docker image
3. Run tests
4. Run visual tests
5. Export metrics
6. Publish reports
7. Validate observability tools
8. Send email summary

Environment
-----------
Ensure .env contains:
BASE_URL=https://your-app.com
APPLITOOLS_API_KEY=YOUR_KEY

Development Commands
--------------------
npm run test            # Run BDD tests
npm run debug           # Open debug shell
node generateFeatureFromText.js "..."
node test_metrics_exporter.js

License
-------
ISC License

Author
------
Rim Aissa
