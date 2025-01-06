import React, { ChangeEvent } from 'react';
import { TokenPrice } from '../../interfaces';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  listTokenPrices: TokenPrice[];
}

const CurrencySelecter: React.FC<Props> = ({
  value,
  onChange,
  listTokenPrices,
}) => {
  const onSlectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!onChange) return;

    const { value } = e.currentTarget;
    onChange(value);
  };

  return (
    <>
      <select
        className='p-2 border border-gray-300 rounded-md border-none w-full focus-visible:outline-none'
        value={value}
        onChange={onSlectChange}
      >
        {listTokenPrices.map((token) => (
          <option value={token.currency} key={token.currency + token.price}>
            {token.currency.toUpperCase()}
          </option>
        ))}
      </select>
    </>
  );
};

export default CurrencySelecter;
