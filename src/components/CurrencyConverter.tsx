import { useState } from 'react';
import { useCurrencies } from '../hooks/useCurrencies';
import { useConversion } from '../hooks/useConversion';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import AmountInput from './AmountInput';
import CurrencySelect from './CurrencySelect';
import ConversionResult from './ConversionResult';

const DEFAULT_FROM = 'GBP';
const DEFAULT_TO = 'USD';
const DEBOUNCE_MS = 400;

function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState(DEFAULT_FROM);
  const [to, setTo] = useState(DEFAULT_TO);
  const [side, setSide] = useState<'from' | 'to'>('from');

  const { currencies, isLoading: currenciesLoading, error: currenciesError } = useCurrencies();

  const debouncedAmount = useDebouncedValue(amount, DEBOUNCE_MS);
  const request = side === 'from' ? { from, to } : { from: to, to: from };
  const conversion = useConversion({ ...request, amount: Number(debouncedAmount) });
  const isTyping = amount !== debouncedAmount;
  const converted = isTyping || conversion.value === null ? '' : conversion.value.toFixed(2);

  function swapCurrencies() {
    setFrom(to);
    setTo(from);
  }

  if (currenciesError) {
    return (
      <p className="result result--error" role="alert">
        Couldn’t load currencies: {currenciesError}
      </p>
    );
  }

  return (
    <form className="converter" onSubmit={(event) => event.preventDefault()}>
      <AmountInput
        id="amount"
        label="Amount"
        value={side === 'from' ? amount : converted}
        onChange={(value) => {
          setAmount(value);
          setSide('from');
        }}
      />
      <AmountInput
        id="converted"
        label="Converted amount"
        value={side === 'to' ? amount : converted}
        onChange={(value) => {
          setAmount(value);
          setSide('to');
        }}
      />

      <div className="converter__currencies">
        <CurrencySelect
          id="from"
          label="From"
          value={from}
          onChange={setFrom}
          currencies={currencies}
          disabled={currenciesLoading}
        />
        <button
          type="button"
          className="converter__swap"
          onClick={swapCurrencies}
          aria-label="Swap currencies"
        >
          ⇄
        </button>
        <CurrencySelect
          id="to"
          label="To"
          value={to}
          onChange={setTo}
          currencies={currencies}
          disabled={currenciesLoading}
        />
      </div>

      <ConversionResult
        amount={Number(amount)}
        from={request.from}
        to={request.to}
        value={conversion.value}
        isLoading={currenciesLoading || isTyping || conversion.isLoading}
        error={conversion.error}
      />
    </form>
  );
}

export default CurrencyConverter;
