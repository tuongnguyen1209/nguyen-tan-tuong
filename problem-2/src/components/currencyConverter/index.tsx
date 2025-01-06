import React, { useCallback, useEffect, useState } from 'react';
import { useTokenPrices } from '../../hooks/useTokenPrices';
import { useDebounce } from '../../hooks/useDebounce';
import CurrencyWrapper from '../currencyWrapper';
import { TokenPrice } from '../../interfaces';
import swapIcon from '../../assets/swap-icon.svg';

const CurrencyConverter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<TokenPrice>();
  const [toCurrency, setToCurrency] = useState<TokenPrice>();
  const [amount, setAmount] = useState('1');
  const [amountResult, setAmountResult] = useState('');
  const prices = useTokenPrices();
  const amountDebounce = useDebounce(amount);

  const handleConvert = useCallback(() => {
    if (!fromCurrency || !toCurrency || !amountDebounce) return;

    const swappedAmount =
      (amountDebounce * fromCurrency.price) / toCurrency.price;
    setAmountResult(swappedAmount.toFixed(4));
  }, [fromCurrency, toCurrency, amountDebounce]);

  useEffect(() => {
    handleConvert();
  }, [handleConvert, amountDebounce, fromCurrency, toCurrency]);

  useEffect(() => {
    if (fromCurrency || toCurrency || !prices.length) return;

    setFromCurrency(prices[0]);
    setToCurrency(prices[0]);
  }, [fromCurrency, prices, toCurrency]);

  const handleSwap = () => {
    const temp = fromCurrency;

    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-6 text-center'>
        Currency converter
      </h2>

      <div className='flex gap-2 flex-col'>
        <CurrencyWrapper
          label='From'
          tokenPrices={prices}
          amount={amount}
          setAmount={setAmount}
          onSelectCurrencyChange={setFromCurrency}
          selectedCurrency={fromCurrency}
        />
        <div className='relative h-0'>
          <button
            className='absolute w-8 h-8 rounded-full bg-white border border-[#e3e7ee] z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'
            onClick={handleSwap}
          >
            <img src={swapIcon} className='h-5 w-5' alt='swap-icon' />
          </button>
        </div>

        <CurrencyWrapper
          label='To'
          tokenPrices={prices}
          showOnly={true}
          amount={amountResult}
          onSelectCurrencyChange={setToCurrency}
          selectedCurrency={toCurrency}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
