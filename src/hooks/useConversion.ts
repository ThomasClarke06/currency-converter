import { useEffect, useState } from "react";
import { convertCurrency } from "../api/currencyBeacon";
import type { ConversionRequest } from "../types";

interface ConversionResult {
  key: string | null;
  value: number | null;
  error: string | null;
  date: string | null;
}

export function useConversion({ from, to, amount }: ConversionRequest) {
  const [result, setResult] = useState<ConversionResult>({
    key: null,
    value: null,
    date: null,
    error: null,
  });
  const canConvert = Boolean(from && to && amount > 0);
  const key = `${from}-${to}-${amount}`;

  useEffect(() => {
    if (!canConvert) return;
    let ignore = false;

    convertCurrency({ from, to, amount })
      .then(({ value, date }) => {
        if (!ignore) setResult({ key, value, date, error: null });
      })
      .catch((err: Error) => {
        if (!ignore)
          setResult({ key, value: null, date: null, error: err.message });
      });

    return () => {
      ignore = true;
    };
  }, [canConvert, from, to, amount, key]);

  // The stored result only counts if it belongs to the current inputs.
  const isCurrent = canConvert && result.key === key;

  return {
    value: isCurrent ? result.value : null,
    error: isCurrent ? result.error : null,
    isLoading: canConvert && !isCurrent,
    date: isCurrent ? result.date : null,
  };
}
