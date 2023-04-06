import { currencyDefaultStats } from 'CONSTS/currencyInfo';

import { createUUID } from 'UTILS/uuid';

import { getDocsData, updateRecord } from '../firebaseConfig';

const collectionName = 'currencyStatistics';

export async function apiGetCurrencyStatistics({ userId }) {
  const { id, data } = await getDocsData({
    collectionName: collectionName,
    collectionFilter: { userId },
    prop: 'currencyStatistics',
  });

  return { id, data };
}

export async function apiSetCurrencyStatistics({ id, userId, newCurrencyStatistics }) {
  const curId = id || createUUID();

  await updateRecord(collectionName, curId, {
    currencyStatistics: JSON.stringify(newCurrencyStatistics),
    userId,
    id: curId,
  });
}

export async function apiSetCurrentCurrencyStatistics({ userId, currentStatistics }) {
  const { id, data } = await apiGetCurrencyStatistics({ userId });
  const newCurrencyStatistics = { ...data };

  Object.keys(currentStatistics).forEach((key) => {
    newCurrencyStatistics[key].current = currentStatistics[key];
  });

  await apiSetCurrencyStatistics({ id, userId, newCurrencyStatistics });
}

export async function apiCurrencyChangesByNewCurrency({ userId, currency, amount }) {
  const { id: statsId, data } = await apiGetCurrencyStatistics({ userId });

  const newData = { [currency]: { ...currencyDefaultStats, current: amount } };
  const newCurrencyStatistics = statsId ? { ...data, ...newData } : newData;

  await apiSetCurrencyStatistics({ id: statsId, userId, newCurrencyStatistics });
}

export async function apiCurrencyChangesByExchange({ userId, info, isRemove }) {
  const { fromCurrency, fromValue, toValue, toCurrency } = info;
  const coef = isRemove ? -1 : 1;

  const { id: statsId, data } = await apiGetCurrencyStatistics({ userId });
  const newCurrencyStatistics = { ...data };
  newCurrencyStatistics[fromCurrency].exchangedOut += fromValue * coef;
  newCurrencyStatistics[fromCurrency].current -= fromValue * coef;

  newCurrencyStatistics[toCurrency].exchangedIn += toValue * coef;
  newCurrencyStatistics[toCurrency].current += toValue * coef;

  await apiSetCurrencyStatistics({ id: statsId, userId, newCurrencyStatistics });
}

export async function apiCurrencyChangesByTransaction({ userId, info, isRemove }) {
  const coef = isRemove ? -1 : 1;

  const { amount, currency, isIncome } = info;
  const coefByCategory = isIncome ? 1 : -1;

  const { id: statsId, data } = await apiGetCurrencyStatistics({ userId });
  const newStatistics = { ...data[currency] };

  newStatistics.current += amount * coefByCategory * coef;

  const prop = isIncome ? 'income' : 'expend';
  newStatistics[prop] += amount * coef;

  await apiSetCurrencyStatistics({
    id: statsId,
    userId,
    newCurrencyStatistics: { ...data, [currency]: newStatistics },
  });
}
