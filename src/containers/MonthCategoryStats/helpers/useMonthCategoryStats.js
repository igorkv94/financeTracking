import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchMonthCategoryStatsAction, resetMonthCategoryStats } from 'REDUX/monthCategoryStats';

export function useMonthCategoryStats() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.monthCategoryStats);
  const selectedCurrency = useSelector((state) => state.selectedCurrency.currency);
  const { month } = useParams();

  useEffect(() => {
    dispatch(fetchMonthCategoryStatsAction({ month }));
    return () => {
      dispatch(resetMonthCategoryStats());
    };
  }, [selectedCurrency, month]);

  return { data };
}
