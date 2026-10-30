# Web Engineering Labs

This repository contains the implementation and documentation for Web Engineering Labs 01-03 and 05.

## Student

- **Name:** Ziaullah Khan
- **Roll number:** 2330-0145
- **Degree:** BS Artificial Intelligence (BS AI)
- **Course:** Web Engineering

## Repository structure

- `public/` - Accessible page and compiled Lab 05 native JavaScript modules
- `src/` - Strict TypeScript sources for booking, feedback and shared utilities
- `tests/` - Unit tests and Playwright browser checks
- `css-lab/` - Lab 03 CSS fundamentals activities
- `docs/` - Separate documentation for each lab
- `LEGACY-NOTES.md` - jQuery translation table, legacy smells and compiler observations

## Commands

```bash
npm ci
npm run typecheck
npm run build
npm test
npm run lint
npm run format
npm run test:e2e
npm start
```

After `npm start`, open `http://localhost:3000`. Edit `src/*.ts` and run `npm run build` to update the browser modules in `public/`. Browser tests use an installed Google Chrome browser. To view Lab 03, open `css-lab/index.html` with Live Server.

With the server running, `npm run audit:lab05` regenerates the saved Lighthouse accessibility evidence. Set `CHROME_PATH` if Chrome is not at the standard Windows path. PowerShell users can use `npm.cmd` if script execution policy blocks `npm`.

## Documentation

- [Lab 01](docs/Lab-01-Documentation.md)
- [Lab 02](docs/Lab-02-Documentation.md)
- [Lab 03](docs/Lab-03-Documentation.md)
- [Lab 05 report](docs/Lab-05-Documentation.md)
- [Lab 05 supplied statement](docs/Lab-05-Statement.docx)
- [Lab 05 legacy migration notes](LEGACY-NOTES.md)
