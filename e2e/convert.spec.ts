import { expect, test } from '@playwright/test';

test('converts an amount', async ({ page }) => {
  await page.route('**/api/v1/currencies*', (route) =>
    route.fulfill({
      json: {
        meta: { code: 200 },
        response: [
          { short_code: 'GBP', name: 'Pound Sterling' },
          { short_code: 'USD', name: 'US Dollar' },
        ],
      },
    }),
  );
  await page.route('**/api/v1/convert*', (route) =>
    route.fulfill({ json: { meta: { code: 200 }, response: { value: 26.44 } } }),
  );

  await page.goto('/');
  await page.getByLabel('Amount').fill('20');

  await expect(page.getByText('26.44 USD')).toBeVisible();
});