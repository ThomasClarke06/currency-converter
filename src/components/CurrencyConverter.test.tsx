import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { convertCurrency, getCurrencies } from '../api/currencyBeacon';
import CurrencyConverter from './CurrencyConverter';

vi.mock('../api/currencyBeacon');

it('converts the entered amount', async () => {
  vi.mocked(getCurrencies).mockResolvedValue([
    { code: 'GBP', name: 'Pound Sterling' },
    { code: 'USD', name: 'US Dollar' },
  ]);
  vi.mocked(convertCurrency).mockResolvedValue(26.44);

  render(<CurrencyConverter />);
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '20' } });

  expect(await screen.findByText('26.44 USD')).toBeTruthy();
  expect(convertCurrency).toHaveBeenLastCalledWith({ from: 'GBP', to: 'USD', amount: 20 });
});
