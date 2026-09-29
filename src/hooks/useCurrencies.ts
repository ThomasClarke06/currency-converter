import { useEffect, useState } from 'react';
import { getCurrencies } from '../api/currencyBeacon';
import type { Currency } from '../types';

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getCurrencies()
      .then((data) => {
        if (!ignore) setCurrencies(data);
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { currencies, isLoading, error };
}
