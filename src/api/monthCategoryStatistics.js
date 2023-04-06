import { getTodayYearAndMonth } from 'UTILS/dateFormat';

import { getDocById, updateRecord } from '../firebaseConfig';

const collectionName = 'monthCategoryStatistics';

function getId({ userId, month, currency }) {
  return `${userId}-${month}-${currency}`;
}

export async function apiGetMonthCategoryStatistics({ userId, month, currency }) {
  if (!month || !currency) {
    return {};
  }

  const data = await getDocById(collectionName, getId({ userId, month, currency }));

  return JSON.parse(data?.monthCategoryStatistics || '{}');
}

export async function apiSetMonthCategoryStatistics({ userId, month, currency, newMonthCategoryStatistics }) {
  if (!month || !currency) {
    return;
  }

  const id = getId({ userId, month, currency });

  await updateRecord(collectionName, id, {
    monthCategoryStatistics: JSON.stringify(newMonthCategoryStatistics),
    userId,
    id,
  });
}

export async function apiUpdateMonthCategoryStatistics({ userId, info, isRemove }) {
  const coef = isRemove ? -1 : 1;

  const { currency, category, amount } = info;
  const month = getTodayYearAndMonth();

  const data = await apiGetMonthCategoryStatistics({ userId, currency, month });

  const newMonthCategoryStatistics = { ...data };
  newMonthCategoryStatistics[category] = (newMonthCategoryStatistics[category] || 0) + amount * coef;

  await apiSetMonthCategoryStatistics({ userId, month, currency, newMonthCategoryStatistics });
}
