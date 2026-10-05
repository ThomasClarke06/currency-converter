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

  const { currencies, isLoading: currenciesLoading, error: currenciesError } = useCurrencies();

  const debouncedAmount = useDebouncedValue(amount, DEBOUNCE_MS);
  const conversion = useConversion({ from, to, amount: Number(debouncedAmount) });
  const isTyping = amount !== debouncedAmount;

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
      <AmountInput id="amount" label="Amount" value={amount} onChange={setAmount} />

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
        from={from}
        to={to}
        value={conversion.value}
        date={conversion.date}
        isLoading={currenciesLoading || isTyping || conversion.isLoading}
        error={conversion.error}
      />
    </form>
  );
}

export default CurrencyConverter;
