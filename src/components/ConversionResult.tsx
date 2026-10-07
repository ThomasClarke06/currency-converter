import { formatNumber } from '../utils/formatNumber';

interface ConversionResultProps {
  amount: number;
  from: string;
  to: string;
  value: number | null;
  isLoading: boolean;
  error: string | null;
}

function ConversionResult({ amount, from, to, value, isLoading, error }: ConversionResultProps) {
  if (error) {
    return <p className="result result--error" role="alert">{error}</p>;
  }

  if (!(amount > 0)) {
    return <p className="result">Enter an amount greater than 0.</p>;
  }

  if (isLoading || value === null) {
    return <p className="result">Converting…</p>;
  }

  return (
    <p className="result" aria-live="polite">
      <span className="result__from">
        {formatNumber(amount)} {from} equals
      </span>
      <span className="result__to">
        {formatNumber(value)} {to}
      </span>
      <span className="rate">
        1 {from} = {formatNumber(value / amount)} {to}
      </span>
    </p>
  );
}

export default ConversionResult;
