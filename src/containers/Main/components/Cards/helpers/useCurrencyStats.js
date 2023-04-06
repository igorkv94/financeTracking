import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrencyStatsAction } from 'REDUX/currencies';

export function useCurrencyStats() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.currencies.stats?.[state.selectedCurrency.currency]);
  const isLoading = useSelector((state) => state.currencies.isLoadingStats);

  useEffect(() => {
    if (!data) {
      dispatch(fetchCurrencyStatsAction());
    }
  }, []);

  return { data, isLoading };
}
