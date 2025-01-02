interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const DEFAULT_PRIORITY = -99;

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances: WalletBalance[] = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    const priorities: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };

    return priorities[blockchain] ?? DEFAULT_PRIORITY;
  };

  const formattedBalance = (balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
      priority: getPriority(balance.blockchain),
    };
  };

  const filterAndSortedBalances = useMemo(() => {
    return balances
      .map((balance: WalletBalance) => formattedBalance(balance))
      .filter(
        (balance) => balance.priority > DEFAULT_PRIORITY && balance.amount <= 0
      )
      .sort((lhs, rhs) => lhs.priority - rhs.priority);
  }, [balances, prices]);

  const rows = filterAndSortedBalances.map(
    (balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;

      return (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
