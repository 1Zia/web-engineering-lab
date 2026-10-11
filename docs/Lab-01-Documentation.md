# Lab 01: Setting Up the Web Engineering Development Environment

**Student:** Ziaullah Khan  
**Roll number:** 2330-0145  
**Degree:** BS Artificial Intelligence (BS AI)  
**Course:** Web Engineering

## Objective

Set up a consistent web-development toolchain, create the standard project structure, build a minimal greeting page, and verify the JavaScript with an automated test.

## Tools and technologies

- Node.js 24.21.0 and npm 11.19.0
- Visual Studio Code 1.139.1
- Git 2.55.0
- ESLint 10.12.0, Prettier 3.9.10, and serve 14.2.6
- HTML, CSS, JavaScript, and Node's built-in test runner

The required VS Code extensions were installed: ESLint, Prettier - Code Formatter, Live Server, and HTML CSS Support. Project settings enable format on save with Prettier.

## Tasks performed

1. Verified Node.js, npm, VS Code, and Git from the terminal.
2. Configured the Git author as Ziaullah Khan with the GitHub-provided private commit address.
3. Created `public/`, `tests/`, the README, npm configuration, ESLint configuration, Prettier configuration, and VS Code settings.
4. Installed ESLint, Prettier, and serve as development dependencies.
5. Added `lint`, `format`, and `start` scripts to `package.json`.
6. Created the starter page and a reusable `greet(name)` function that displays `Hello, World!`.
7. Added `tests/greet.test.js` using Node's built-in test runner.
8. Ran the test, lint, formatting, and dependency security checks.

## Important code concepts

`package.json` records commands and development dependencies. The greeting function returns a string, is used by the browser, and is exported for the Node test. ESLint finds JavaScript mistakes, while Prettier checks consistent formatting.

## Results

- `npm test`: 1 test passed, 0 failed.
- `npm run lint`: passed with no errors.
- `npm run format`: all files matched Prettier formatting.
- `npm audit`: 0 vulnerabilities.
- The project is ready for a local commit. It was not pushed because remote operations were intentionally excluded from this work session.

## Conclusion

The project now has a reproducible beginner-friendly toolchain, standard folder structure, working greeting page, and automated test.

## Viva preparation

**Why is `package.json` important?**  
It records project metadata, dependencies, and reusable npm commands.

**What is the difference between ESLint and Prettier?**  
ESLint checks JavaScript for errors and rule violations; Prettier standardizes code formatting.

**Why use a local server?**  
It previews files through HTTP, which is closer to how a deployed website works than opening a `file://` URL.

**What does `node --test` do?**  
It runs tests using Node's built-in test runner.
