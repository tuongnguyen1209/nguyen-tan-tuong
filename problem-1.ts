const sum_to_n_a = (n: number) => {
  if (n <= 0) return 0;

  let sum = 0;
  let sumOutOfRange = BigInt(0);

  for (let i = 1; i <= n; i++) {
    if (sum + i < Number.MAX_SAFE_INTEGER) {
      sum += i;
    } else {
      sumOutOfRange += BigInt(i);
    }
  }

  return BigInt(sum) + sumOutOfRange;
};

const sum_to_n_b = (n: number) => {
  if (n <= 0) return 0;

  return (n * (n + 1)) / 2;
};

const sum_to_n_c = (n: number) => {
  const recursiveSum = (start: number, end: number) => {
    if (start > end) return BigInt(0);

    const mid = Math.floor((start + end) / 2);
    const leftSum = recursiveSum(start, mid);
    const rightSum = recursiveSum(mid + 1, end);

    return leftSum + rightSum + mid + 1;
  };

  return recursiveSum(1, n);
};
