export interface Currency {
  code: string;
  name: string;
}

export interface ConversionRequest {
  from: string;
  to: string;
  amount: number;
}
