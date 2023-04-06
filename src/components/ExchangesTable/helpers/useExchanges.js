import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showToast } from 'UTILS/showToast';
import { useLoadMore } from 'UTILS/useLoadMore';

import { fetchExchangesAction, removeExchangeAction, resetExchanges, resetSuccessRemoved } from 'REDUX/exchanges';

export function useExchanges({ isShort }) {
  const limit = isShort ? 5 : 20;

  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state) => state.selectedCurrency.currency);
  const data = useSelector((state) => state.exchanges.data);
  const hasMore = useSelector((state) => state.exchanges.hasMore);
  const isLoadingMore = useSelector((state) => state.exchanges.isLoadingMore);
  const successRemoved = useSelector((state) => state.exchanges.successRemoved);

  const { needToFetch, setNeedToFetch } = useLoadMore({ hasMore: hasMore && !isShort });

  const onLoadMore = () => {
    dispatch(fetchExchangesAction({ isMore: !!data.length, limit }));
  };

  useEffect(() => {
    dispatch(fetchExchangesAction({ limit }));
    return () => {
      dispatch(resetExchanges());
    };
  }, [selectedCurrency]);

  useEffect(() => {
    if (successRemoved) {
      dispatch(resetSuccessRemoved());
      showToast('Removed!', 'success');
    }
  }, [successRemoved]);

  useEffect(() => {
    if (needToFetch && data?.length && !isLoadingMore) {
      onLoadMore();
    }
    setNeedToFetch(false);
  }, [needToFetch]);

  const onRemove = (id) => {
    dispatch(removeExchangeAction(id));
  };

  return { data, hasMore, onRemove };
}
