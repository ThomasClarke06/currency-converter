import type { Conversion, ConversionRequest, Currency } from '../types';

const BASE_URL = '/api/v1';
const API_KEY = import.meta.env.VITE_CURRENCY_BEACON_API_KEY;

interface ApiResponse<T> {
  meta: { code: number; error_detail?: string };
  response: T;
}

interface ApiCurrency {
  short_code: string;
  name: string;
}

interface ApiConversion {
  value: number;
  date: string;
}

async function request<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const query = new URLSearchParams({ api_key: API_KEY, ...params });
  const res = await fetch(`${BASE_URL}/${endpoint}?${query}`);
  const data: ApiResponse<T> = await res.json();

  if (!res.ok || data.meta?.code !== 200) {
    throw new Error(data.meta?.error_detail ?? `Request failed with status ${res.status}`);
  }

  return data.response;
}

export async function getCurrencies(): Promise<Currency[]> {
  const currencies = await request<ApiCurrency[]>('currencies', { type: 'fiat' });
  return currencies.map(({ short_code, name }) => ({ code: short_code, name }));
}

export async function convertCurrency({ from, to, amount }: ConversionRequest): Promise<Conversion> {
  const result = await request<ApiConversion>('convert', { from, to, amount: String(amount) });
  return { value: result.value, date: result.date };
}
