# Playwright Final Exam

## Project Overview

This project contains automated tests for SauceDemo using Playwright and TypeScript.

The project includes three types of testing:

- Unit Testing
- Integration Testing
- System Testing

## Test Cases

- UT-01: Login validation
- UT-02: Product button state — Add to cart, Remove, Add to cart
- IT-01: Real login and stub inventory page
- IT-02: Driver login state and real inventory/cart
- ST-01: Complete purchase of two products
- ST-02: Checkout validation and recovery

## Installation

```bash
npm install
npx playwright install chromium
```

## Run Tests

```bash
npx playwright test
```

## HTML Report

```bash
npx playwright show-report
```

## Test Reports

- HTML report: `playwright-report/`
- JSON report: `reports/results.json`

## Testing Notes

- Real login tests use the SauceDemo website.
- IT-01 uses a real login followed by a stub inventory page created with `page.setContent()`.
- IT-02 uses a driver helper to establish a login state before opening the inventory and cart.
- Test results should be checked before submission.
