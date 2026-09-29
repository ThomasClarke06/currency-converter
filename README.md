# Currency Converter

A simple currency converter built with React, TypeScript and Vite, using the [CurrencyBeacon API](https://currencybeacon.com/api-documentation).

## Getting started

Requires Node.js 22.12 or later.

```bash
npm install
cp .env.example .env.local   # then add your CurrencyBeacon API key
npm run dev
```

Run the tests with `npm test`.

## Project structure

```
src/
  api/          CurrencyBeacon API calls
  hooks/        Data fetching and debouncing
  components/   UI components
  utils/        Number formatting
  types.ts      Shared types
```

## Notes

- Currencies use `short_code` (e.g. `GBP`), as that's what `/convert` expects. Results use `response.value`.
- CurrencyBeacon doesn't support CORS, so requests go through the Vite dev server proxy (`vite.config.ts`).
- The amount is debounced so the API isn't called on every keystroke.
- Defaults to converting 1 GBP to USD.

## With more time

- Move API calls behind a small serverless proxy, so the key stays off the client and the app works outside the dev server.
- Cache the currency list, since it rarely changes.
- Add an end-to-end test with Playwright.
