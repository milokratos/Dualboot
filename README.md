# E-Commerce Test Automation Project

This project contains automated tests for an e-commerce website (DemoBlaze) and a pet store API (Swagger Petstore) using **Playwright** with JavaScript. The tests are divided into two main categories:

- **UI Tests**: Verify functionality on the DemoBlaze website, such as category filtering, login, and shopping cart interactions.
- **API Tests**: Verify API endpoints of the Swagger Petstore, including orders, pets, and users.

The project follows the Page Object Model (POM) design pattern for UI tests, ensuring maintainability and scalability. It also generates detailed test reports with screenshots on failure for UI tests.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (version 16 or higher): Playwright requires Node.js to run. You can download it from [nodejs.org](https://nodejs.org/).
- **Git**: To clone this repository. Download it from [git-scm.com](https://git-scm.com/downloads).
- A code editor like **Visual Studio Code** (recommended) for editing the project files.

## Setup Instructions

Follow these steps to set up the project and run the tests.

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/milokratos/Dualboot
cd Dualboot
```

### 2. Install Dependencies

This project uses Playwright and its dependencies, which are listed in the `package.json` file. To install them, run:

```bash
npm install
```

This will install:
- `@playwright/test`: The Playwright test runner and assertion library for both UI and API tests.
- Other dependencies (if any) specified in `package.json`.

### 3. Install Playwright Browsers

For UI tests, Playwright requires browser binaries (Chromium, Firefox, WebKit). Install them with:

```bash
npx playwright install
```

This command downloads the necessary browser binaries. You only need to run this once, unless you update Playwright to a new version. API tests do not require browsers, so this step is optional if you're only running API tests.

### 4. Verify the Setup

To ensure everything is set up correctly, check the Playwright version:

```bash
npx playwright --version
```

You should see the Playwright version (e.g., `v1.44.0`). If this fails, revisit the installation steps.

## Project Structure

Here’s an overview of the project structure:

- `pages/`: Contains Page Object Model classes for UI tests.
  - `CategoriesPage.js`: Handles category-related interactions (Phones, Laptops, Monitors).
  - `LoginPage.js`: Handles login-related interactions.
  - `ShoppingCartPage.js`: Handles shopping cart interactions.
- `tests/`: Contains all test spec files.
  - **UI Tests**:
    - `categories.spec.js`: Tests for category filtering on DemoBlaze.
    - `login.spec.js`: Tests for login functionality on DemoBlaze.
    - `shoppingCart.spec.js`: Tests for shopping cart functionality on DemoBlaze.
  - **API Tests** (under `tests/apiTesting/`):
    - `petStoreOrders.spec.js`: Tests for pet store order endpoints.
    - `petStorePets.spec.js`: Tests for pet store pet endpoints.
    - `petStoreUsers.spec.js`: Tests for pet store user endpoints.
- `playwright-report/`: Auto-generated folder for HTML test reports.
- `test-results/`: Auto-generated folder for test results (e.g., screenshots, traces).
- `package.json`: Lists the project dependencies and scripts.
- `playwright.config.js`: Configuration file for Playwright (e.g., browser settings, reporting).

## Running the Tests

The project includes both UI and API tests. Below are the commands to run them.

### Run All Tests (UI and API)

To run all tests (both UI and API) in headless mode:

```bash
npx playwright test
```

This will run UI tests in Chromium, Firefox, and WebKit, and API tests in a minimal context.

### Run Only UI Tests

To run only the UI tests:

```bash
npx playwright test tests/categories.spec.js tests/login.spec.js tests/shoppingCart.spec.js
```

### Run Only API Tests

To run only the API tests:

```bash
npx playwright test tests/apiTesting
```

### Run Tests in Headed Mode (UI Tests Only)

To see the browser UI while UI tests run (useful for debugging):

```bash
npx playwright test --headed tests/categories.spec.js tests/login.spec.js tests/shoppingCart.spec.js
```

Note: API tests don’t use a browser, so the `--headed` flag has no effect on them.

### Run a Specific Test File

To run a single test file (e.g., category tests):

```bash
npx playwright test tests/categories.spec.js
```

Or for an API test:

```bash
npx playwright test tests/apiTesting/petStoreOrders.spec.js
```

### Run Tests with Debugging

To debug tests with the Playwright Inspector (pauses the test and lets you step through, useful for UI tests):

```bash
npx playwright test --debug
```

For API tests, you can use `--debug` to inspect the test execution, but there’s no browser UI to interact with.

## Generating and Viewing Test Reports

Playwright generates a detailed HTML report of test results, including screenshots for failed UI tests.

### 1. Run Tests with Reporting

The HTML report is generated automatically when you run tests (configured in `playwright.config.js`). To run tests and ensure the report is generated:

```bash
npx playwright test
```

This command:
- Runs all tests (UI and API).
- Outputs test results to the console.
- Generates an HTML report in the `playwright-report/` folder.
- Saves screenshots of failed UI tests in the `test-results/` folder.

### 2. View the HTML Report

After running the tests, open the HTML report to view detailed results:

```bash
npx playwright show-report
```

This opens the report in your default browser. The report includes:
- A summary of passed, failed, and skipped tests.
- Detailed logs for each test, including assertions and errors.
- Screenshots for failed UI tests (linked in the report).
- Traces for failed UI tests (if applicable), which you can view in the Playwright Trace Viewer.

### 3. Access Screenshots for Failed Tests

If a UI test fails (e.g., a product doesn’t match its category), Playwright automatically takes a screenshot:
- Screenshots are saved in the `test-results/` folder with names like `test-failed-1.png`.
- In the HTML report, you’ll see a link to the screenshot next to the failed test’s details.

Note: API tests do not generate screenshots, as they don’t involve a browser UI.

## Test Details

### UI Tests

#### Category Tests (`tests/categories.spec.js`)
These tests verify that the correct products are displayed when selecting a category on DemoBlaze:
- **Phones**: Checks for products like "Samsung Galaxy S6", "iPhone 6 32GB" using keywords like "galaxy", "iphone", "nokia", "nexus", "xperia", "htc".
- **Laptops**: Checks for products like "Sony VAIO i5", "MacBook Air" using keywords like "vaio", "macbook".
- **Monitors**: Checks for products like "Apple Monitor 24", "ASUS Full HD" using keywords like "monitor", "full hd".

#### Login Tests (`tests/login.spec.js`)
These tests verify login functionality on DemoBlaze:
- Valid login with credentials like `admin`/`admin`.
- Invalid login with credentials like `jtirado`/`invalidPass`.

#### Shopping Cart Tests (`tests/shoppingCart.spec.js`)
These tests verify shopping cart functionality on DemoBlaze, such as adding items to the cart and checking the cart contents.

### API Tests

The API tests interact with the [Swagger Petstore API](https://petstore.swagger.io/) and are located in `tests/apiTesting/`.

#### Pet Store Orders (`tests/apiTesting/petStoreOrders.spec.js`)
Tests the order endpoints, such as placing an order and retrieving order details.

#### Pet Store Pets (`tests/apiTesting/petStorePets.spec.js`)
Tests the pet endpoints, such as adding a new pet and retrieving pet details.

#### Pet Store Users (`tests/apiTesting/petStoreUsers.spec.js`)
Tests the user endpoints, such as creating a user and retrieving user details.

## Troubleshooting

- **Error: "playwright is not recognized"**
  - Ensure you ran `npm install` and `npx playwright install`.
  - Check that Node.js is installed (`node --version`).

- **UI Tests Fail Due to Network Issues**
  - Ensure you have an internet connection, as UI tests interact with `https://www.demoblaze.com`.

- **API Tests Fail Due to Network Issues**
  - Ensure you have an internet connection, as API tests interact with `https://petstore.swagger.io/`.
  - Check if the Petstore API is up and running (you can test endpoints manually in a browser or with a tool like Postman).

- **Tests Fail Due to Missing Products (UI Tests)**
  - The category tests use specific keywords. If the website’s products change, update the keywords in `CategoriesPage.js` (e.g., add new phone keywords like "pixel" if a new phone is added).

- **Tests Fail Due to API Changes (API Tests)**
  - If the Petstore API changes its endpoints or response format, update the API test assertions in the respective spec files.

- **Screenshots Not Generated for Failed UI Tests**
  - Ensure the `screenshot: 'only-on-failure'` setting is configured in `playwright.config.js` for UI projects.
  - Check the `test-results/` folder for screenshots after a test failure.

- **HTML Report Not Generated**
  - Ensure the `reporter` in `playwright.config.js` includes `['html', { open: 'never'}]`.
  - Check the `playwright-report/` folder after running tests.
