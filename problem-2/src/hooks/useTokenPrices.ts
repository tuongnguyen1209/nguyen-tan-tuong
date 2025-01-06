import { useEffect, useState } from 'react';
import getTokenPrice from '../apps/getTokenPrice';
import { TokenPrice } from '../interfaces';

export const useTokenPrices = () => {
  const [prices, setPirces] = useState<TokenPrice[]>([]);

  useEffect(() => {
    (async () => {
      const rs = (await getPrice()) as TokenPrice[];

      setPirces(uniqueTokenPrice(rs));
    })();

    return () => {
      setPirces([]);
    };
  }, []);

  const getPrice = async () => {
    const rs = await getTokenPrice();

    return await rs.json();
  };

  const uniqueTokenPrice = (tokenprices: TokenPrice[]) => {
    return [
      ...new Map(tokenprices.map((item) => [item.currency, item])).values(),
    ];
  };

  return prices;
};
