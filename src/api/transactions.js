import { getMidnightTime } from 'UTILS/dateFormat';
import { createUUID } from 'UTILS/uuid';

import { apiCurrencyChangesByTransaction } from 'API/currencyStatistics';
import { apiUpdateMonthCategoryStatistics } from 'API/monthCategoryStatistics';
import { apiUpdateTotalCategoryStatistics } from 'API/totalCategoryStatistics';

import { getDocsWhere, updateRecord, removeDoc } from '../firebaseConfig';

const collectionName = 'transactions';

function getCollectionName(currency) {
  return `${collectionName}${currency.toUpperCase()}`;
}

export async function apiGetTransactions({ userId, currency, limit, startAfter }) {
  if (!currency) {
    return { result: [], hasMore: false };
  }

  const { result, hasMore } = await getDocsWhere(
    getCollectionName(currency),
    {
      userId,
      limit,
      startAfter,
      orderBy: 'createdAt',
      orderType: 'desc',
    },
    true,
  );

  return { result, hasMore };
}

export async function apiSaveTransaction({ userId, info }) {
  const id = `${userId}-${createUUID()}`;
  const { currency, amount, category } = info;

  await updateRecord(getCollectionName(currency), id, {
    amount,
    category,
    date: getMidnightTime(),
    createdAt: Date.now(),
    userId,
    id,
  });
}

export async function apiChangesInTransaction({ id, userId, info, isRemove }) {
  await apiUpdateMonthCategoryStatistics({ userId, info, isRemove });

  await apiUpdateTotalCategoryStatistics({ userId, info, isRemove });

  await apiCurrencyChangesByTransaction({ userId, info, isRemove });

  if (isRemove) {
    await removeDoc(getCollectionName(info.currency), id);
  } else {
    await apiSaveTransaction({ userId, info });
  }
}
