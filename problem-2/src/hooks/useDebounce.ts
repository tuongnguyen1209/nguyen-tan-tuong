/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export const useDebounce = (value: any, timeDebouce = 300) => {
  const [debounceValue, setDebounceValue] = useState();

  useEffect(() => {
    let timeoutDebounce = null;

    if (timeoutDebounce) {
      clearTimeout(timeoutDebounce);
    }

    timeoutDebounce = setTimeout(() => setDebounceValue(value), timeDebouce);

    return () => {
      clearTimeout(timeDebouce);
    };
  }, [value, timeDebouce]);

  return debounceValue;
};
