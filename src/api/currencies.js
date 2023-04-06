import { createUUID } from 'UTILS/uuid';

import { apiCurrencyChangesByNewCurrency } from 'API/currencyStatistics';

import { getDocsData, updateRecord } from '../firebaseConfig';

const collectionName = 'currencies';

export async function apiGetCurrencies({ userId }) {
  const { id, data } = await getDocsData({
    collectionName: collectionName,
    collectionFilter: { userId },
    prop: 'currencies',
    isArray: true,
  });

  return { id, data };
}

export async function apiSetCurrencies({ id, userId, newCurrencies }) {
  const curId = id || createUUID();

  await updateRecord(collectionName, curId, {
    currencies: JSON.stringify(newCurrencies),
    userId,
    id: curId,
  });
}

export async function apiAddNewCurrency({ userId, currentCurrency }) {
  const { amount, currency } = currentCurrency;
  const { id, data } = await apiGetCurrencies({ userId });

  const newCurrencies = id ? [...data] : [];

  if (!newCurrencies.includes(currency)) {
    newCurrencies.push(currency);

    await apiCurrencyChangesByNewCurrency({ userId, currency, amount });
  }

  await apiSetCurrencies({ id, userId, newCurrencies });
}
