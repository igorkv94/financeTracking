import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showToast } from 'UTILS/showToast';
import { useLoadMore } from 'UTILS/useLoadMore';

import {
  fetchTransactionsAction,
  fetchMoreTransactionsAction,
  resetTransactions,
  removeTransactionAction,
  resetSuccessRemoved,
} from 'REDUX/transactions';

export function useTransactions({ isShort }) {
  const limit = isShort ? 5 : 20;

  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state) => state.selectedCurrency.currency);
  const data = useSelector((state) => state.transactions.data);
  const transactionsCount = useSelector((state) => state.transactions.transactionsCount);
  const hasMore = useSelector((state) => state.transactions.hasMore);
  const isLoadingMore = useSelector((state) => state.transactions.isLoadingMore);
  const successRemoved = useSelector((state) => state.transactions.successRemoved);

  const { needToFetch, setNeedToFetch } = useLoadMore({ hasMore: hasMore && !isShort });

  const onLoadMore = () => {
    dispatch(fetchMoreTransactionsAction({ offset: transactionsCount, limit }));
  };

  useEffect(() => {
    dispatch(fetchTransactionsAction({ limit }));
    return () => {
      dispatch(resetTransactions());
    };
  }, [selectedCurrency]);

  useEffect(() => {
    if (successRemoved) {
      dispatch(resetSuccessRemoved());
      showToast('Removed!', 'success');
    }
  }, [successRemoved]);

  useEffect(() => {
    if (needToFetch && Object.keys(data || {}).length && !isLoadingMore) {
      console.log('--------onLoadMore------------');
      onLoadMore();
    }
    setNeedToFetch(false);
  }, [needToFetch]);

  const onRemove = (id) => {
    dispatch(removeTransactionAction(id));
  };

  return { data, hasMore, onRemove, selectedCurrency };
}
