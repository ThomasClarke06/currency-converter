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
- The API key is visible in the browser. Fine for a demo, but production would need a backend proxy.
- The amount is debounced so the API isn't called on every keystroke.
- Defaults to converting 1 GBP to USD.
