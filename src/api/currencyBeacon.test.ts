import { afterEach, describe, expect, it, vi } from 'vitest';
import { convertCurrency, getCurrencies } from './currencyBeacon';

function mockFetchResponse(response: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ meta: { code: 200 }, response }),
    }),
  );
}

describe('currencyBeacon', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('maps currencies to their short code and name', async () => {
    mockFetchResponse([{ id: 1, name: 'Pound Sterling', short_code: 'GBP', code: '826' }]);

    expect(await getCurrencies()).toEqual([{ code: 'GBP', name: 'Pound Sterling' }]);
  });

  it('returns the converted value', async () => {
    mockFetchResponse({ from: 'GBP', to: 'USD', amount: 10, value: 13.22 });

    expect(await convertCurrency({ from: 'GBP', to: 'USD', amount: 10 })).toBe(13.22);
  });
});
