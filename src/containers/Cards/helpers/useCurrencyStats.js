import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showToast } from 'UTILS/showToast';

import { fetchCurrencyStatsAction, resetSuccess, updateCurrencyStatsAction } from 'REDUX/currencies';

export function useCurrencyStats() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.currencies.stats);
  const isLoadingStats = useSelector((state) => state.currencies.isLoadingStats);
  const successSaved = useSelector((state) => state.currencies.successSaved);

  useEffect(() => {
    if (!data) {
      dispatch(fetchCurrencyStatsAction());
    }
  }, []);

  useEffect(() => {
    if (successSaved) {
      dispatch(resetSuccess());
      showToast('Saved', 'success');
    }
  }, [successSaved]);

  const onSubmitData = (newData) => {
    dispatch(updateCurrencyStatsAction(newData));
  };

  return { data, isLoadingStats, onSubmitData, hasData: !!Object.keys(data || {}).length };
}
