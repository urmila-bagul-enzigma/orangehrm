# OrangeHRM Playwright Automation Framework

This project demonstrates a senior-level QA automation framework covering UI, API, and performance testing for OrangeHRM.

## Highlights

- Page Object Model (POM)
- Environment-based configuration via environment variables
- Reusable page objects and configuration utilities
- Retry logic and CI-safe execution
- HTML reports, screenshots, and videos on failures
- API verification layer and performance scripts with K6 thresholds
- Parallel execution in CI

## Folder structure

- `pages/` – reusable page objects
- `tests/ui/` – UI lifecycle tests
- `tests/api/` – API validation tests
- `performance/` – K6 performance tests
- `src/config/` – environment configuration
- `.github/workflows/` – GitHub Actions pipeline

## Local setup

1. Install dependencies:
   npm install
2. Install Playwright browsers:
   npx playwright install --with-deps
3. Copy the environment template:
   copy .env.example .env
4. Run the suite:
   npx playwright test

## Useful commands

- UI tests: `npx playwright test --grep @ui`
- API tests: `npx playwright test --grep @api`
- Open HTML report: `npx playwright show-report`
- Headed mode: `npx playwright test --headed`

## CI/CD

The GitHub Actions workflow in `.github/workflows/playwright.yml` does the following:

- installs dependencies
- installs browser binaries
- runs UI tests, then API tests, then K6 performance tests in order
- publishes HTML and result artifacts

To run it manually, open **Actions**, select **Ordered UI API Performance Tests**, and choose **Run workflow**. Each stage starts only after the preceding stage passes.

## Flaky test strategy

To detect flaky tests, run the same suite multiple times in CI or locally and review failure patterns, pass rates, and timing jitter. The project already includes retry logic for CI and failure capture via screenshots, videos, and traces.

Mitigation strategies include:

- explicit waits for targeted UI states
- stable locators using accessible roles and labels
- retrying only on CI environments
- isolating test data with unique employee IDs
- reducing shared dependency on global state

## Performance testing

The K6 scripts in `performance/` cover a login API and employee creation API.

Run them with:

- `k6 run performance/login-api.js`
- `k6 run performance/employee-creation-api.js`

Thresholds are configured for latency and failure rates.

## Tagging strategy

- `@ui` for browser-based scenarios
- `@api` for REST validation checks
- `@smoke` for quick smoke coverage
- `@regression` for end-to-end regression validation

## Reporting and observability

This framework includes:

- HTML report from Playwright
- JUnit XML output for CI integration
- screenshots on failure
- videos on failure
- traces retained on retry/failure
