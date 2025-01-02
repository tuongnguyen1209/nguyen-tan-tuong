## The computational inefficiencies and anti-patterns found in the code block

- In the `WalletBalance` interface, missing the `blockchain` field.

- The `FormattedWalletBalance` interface has fields similar to `WalletBalance` interface, but it is redefined. When the interface is change, it needs to be update in both interface => maintenance difficult.

- In the code, the `formattedBalances` constant is defined but not use. In filter of the `sortedBalances` function, the `balancePriority` variable is defined, but using `lhsPriority` variable

- The `getPriority` function can be shorten by using object. The `99` number make the code harder to maintain and understand, it can be use constant for this

- The `getPriority` function is called multiple times in both filter and sort in the `sortedBalances` function

- The name of the `sortedBalances` function is unclear, the function `sortedBalances` handles both filtering and sorting, but the name isn't show this

- Inside the rows map, when mapping the data `sortedBalances`, using key is index of array, in a few case, the UI is not updated when data is updated. To fix it, can use `balance.currency` for `key` prop
