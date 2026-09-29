import type { Currency } from '../types';

interface CurrencySelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  currencies: Currency[];
  disabled?: boolean;
}

function CurrencySelect({ id, label, value, onChange, currencies, disabled }: CurrencySelectProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        {currencies.map(({ code, name }) => (
          <option key={code} value={code}>
            {code} – {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelect;
