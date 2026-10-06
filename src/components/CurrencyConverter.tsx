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
type Side = 'from' | 'to';

function CurrencyConverter() {
  const [input, setInput] = useState<{ amount: string; side: Side }>({ amount: '1', side: 'from' });
  const [from, setFrom] = useState(DEFAULT_FROM);
  const [to, setTo] = useState(DEFAULT_TO);

  const { currencies, isLoading: currenciesLoading, error: currenciesError } = useCurrencies();

  const debouncedInput = useDebouncedValue(input, DEBOUNCE_MS);
  const isTyping = input !== debouncedInput;

  const request =
    debouncedInput.side === 'from'
      ? { from, to, amount: Number(debouncedInput.amount) }
      : { from: to, to: from, amount: Number(debouncedInput.amount) };
  const conversion = useConversion(request);

  const converted = isTyping || conversion.value === null ? '' : conversion.value.toFixed(2);
  const fromAmount = input.side === 'from' ? input.amount : converted;
  const toAmount = input.side === 'to' ? input.amount : converted;

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
        id="from-amount"
        label="Amount"
        value={fromAmount}
        onChange={(amount) => setInput({ amount, side: 'from' })}
      />
      <AmountInput
        id="to-amount"
        label="Converted amount"
        value={toAmount}
        onChange={(amount) => setInput({ amount, side: 'to' })}
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
        amount={Number(input.amount)}
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
