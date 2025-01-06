import React from 'react';
import { URLS } from '../../constants';
import { TokenPrice } from '../../interfaces';
import { formatCurrency } from '../../utils';
import CurrencySelecter from '../currencySelecter';
import Input from '../inputs';
import Image from '../image';

interface Props {
  label: string;
  amount?: number | string;
  showOnly?: boolean;
  tokenPrices: TokenPrice[];
  selectedCurrency?: TokenPrice;
  setAmount?: (v: string) => void;
  onSelectCurrencyChange: (v: TokenPrice) => void;
}

const NUMBER_VALID_REGEX = /^\d{0,20}$/;

const CurrencyWrapper: React.FC<Props> = ({
  label,
  amount,
  setAmount,
  showOnly,
  tokenPrices,
  onSelectCurrencyChange,
  selectedCurrency,
}) => {
  const getPriceByCurrency = (currency: string) =>
    tokenPrices.find((price) => price.currency === currency);

  const getImageUrl = () =>
    `${URLS.imageBase}${selectedCurrency?.currency.toUpperCase()}.svg`;

  const handleSelectchange = (value: string) => {
    if (!value) return;

    const selectedTokenPrice = getPriceByCurrency(value);
    if (!selectedTokenPrice) return;

    if (onSelectCurrencyChange) onSelectCurrencyChange(selectedTokenPrice);
  };

  const onInputChange = (v: string) => {
    if (!setAmount) return;
    if (v && !NUMBER_VALID_REGEX.test(v)) return;

    setAmount(v);
  };

  return (
    <div className='bg-white border border-[#e3e7ee] p-3 rounded-xl w-full'>
      <div className='p-3'>
        <div className=''>
          <div>
            <h4 className='font-medium'>{label}</h4>
          </div>
          <div className='flex gap-5 items-center mt-3'>
            <label className='w-1/3 flex items-center p-2 border rounded-md '>
              <div className='w-1/4 flex justify-center'>
                {selectedCurrency && (
                  <Image src={getImageUrl()} className='w-8 h-8' />
                )}
              </div>
              <div className='w-3/4'>
                <CurrencySelecter
                  value={selectedCurrency?.currency}
                  listTokenPrices={tokenPrices}
                  onChange={handleSelectchange}
                />
              </div>
            </label>
            <div className='w-2/3'>
              {showOnly ? (
                <div className='text-right font-bold'>
                  {formatCurrency(amount || 0)}{' '}
                  {selectedCurrency?.currency.toUpperCase()}
                </div>
              ) : (
                <div className='flex justify-end items-baseline'>
                  <Input
                    type='text'
                    className='w-1/2 p-3 text-right'
                    value={amount}
                    onChange={onInputChange}
                  />
                  <span className='min-w-5 font-bold'>
                    {selectedCurrency?.currency.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyWrapper;
