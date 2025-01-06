export const formatCurrency = (number: number | string) => {
  if (typeof number === 'string') number = Number(number);

  return new Intl.NumberFormat('en-US').format(number);
};
