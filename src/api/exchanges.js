import { getMidnightTime } from 'UTILS/dateFormat';
import { createUUID } from 'UTILS/uuid';

import { apiCurrencyChangesByExchange } from 'API/currencyStatistics';

import { getDocsWhere, updateRecord, removeDoc } from '../firebaseConfig';

const collectionName = 'exchanges';

export async function apiGetExchanges({ userId, limit, startAfter }) {
  const { result, hasMore } = await getDocsWhere(collectionName, {
    userId,
    limit,
    startAfter,
    orderBy: 'createdAt',
    orderType: 'desc',
  });

  return { result, hasMore };
}

export async function apiSaveExchange({ userId, info }) {
  const id = `${userId}-${createUUID()}`;
  const { fromCurrency, fromValue, toValue, toCurrency } = info;

  await updateRecord(collectionName, id, {
    amountFrom: fromValue,
    amountTo: toValue,
    date: getMidnightTime(),
    createdAt: Date.now(),
    from: fromCurrency,
    to: toCurrency,
    userId,
    id,
  });
}

export async function apiChangesInExchange({ id, userId, info, isRemove }) {
  await apiCurrencyChangesByExchange({ userId, info, isRemove });

  if (isRemove) {
    await removeDoc(collectionName, id);
  } else {
    await apiSaveExchange({ userId, info });
  }
}
