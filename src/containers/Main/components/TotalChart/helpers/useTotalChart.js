import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTotalStatsAction, resetTotalStats } from 'REDUX/totalCategoryStats';

export function useTotalChart() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.totalCategoryStats);
  const selectedCurrency = useSelector((state) => state.selectedCurrency.currency);

  useEffect(() => {
    dispatch(fetchTotalStatsAction());
    return () => {
      dispatch(resetTotalStats());
    };
  }, [selectedCurrency]);

  return { data };
}
