import { SavedConversion } from '../types';
import { formatNumber } from '../utils/formatNumber';

interface ConversionHistoryProps {
  items: SavedConversion[];
}

function ConversionHistory({ items }: ConversionHistoryProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2>Recent</h2>
      <ul>
        {items.map(({ id, from, to, amount, value }) => (
          <li key={id}>
            {formatNumber(amount)} {from} = {formatNumber(value)} {to}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ConversionHistory;