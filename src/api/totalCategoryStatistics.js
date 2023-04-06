import { createUUID } from 'UTILS/uuid';

import { getDocsData, updateRecord } from '../firebaseConfig';

const collectionName = 'totalCategoryStatistics';

export async function apiGetTotalCategoryStatistics({ userId }) {
  const { id, data } = await getDocsData({
    collectionName: collectionName,
    collectionFilter: { userId },
    prop: 'totalCategoryStatistics',
  });

  return { id, data };
}

export async function apiSetTotalCategoryStatistics({ id, userId, newTotalCategoryStatistics }) {
  const curId = id || createUUID();

  await updateRecord(collectionName, curId, {
    totalCategoryStatistics: JSON.stringify(newTotalCategoryStatistics),
    userId,
    id: curId,
  });
}

export async function apiUpdateTotalCategoryStatistics({ userId, info, isRemove }) {
  const coef = isRemove ? -1 : 1;

  const { id, data } = await apiGetTotalCategoryStatistics({ userId });

  const { currency, category, amount } = info;

  const newStats = data?.[currency] ? { ...data[currency] } : {};
  newStats[category] = (newStats[category] || 0) + amount * coef;

  await apiSetTotalCategoryStatistics({ id, userId, newTotalCategoryStatistics: { ...data, [currency]: newStats } });
}
