interface AmountInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function AmountInput({ id, label, value, onChange }: AmountInputProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        step="any"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default AmountInput;
