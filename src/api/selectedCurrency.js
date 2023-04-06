import { createUUID } from 'UTILS/uuid';

import { getDocsWhere, updateRecord } from '../firebaseConfig';

const collectionName = 'selectedCurrency';

export async function apiGetSelectedCurrency({ userId }) {
  const response = await getDocsWhere(collectionName, { userId });
  const { id, selectedCurrency } = response?.result?.[0] || {};

  return { id, data: selectedCurrency };
}

export async function apiSetSelectedCurrency({ userId, newSelectedCurrency }) {
  const { id } = await apiGetSelectedCurrency({ userId });
  const curId = id || createUUID();

  await updateRecord(collectionName, curId, {
    selectedCurrency: newSelectedCurrency,
    userId,
    id: curId,
  });
}
