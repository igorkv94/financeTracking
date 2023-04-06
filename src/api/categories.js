import { createUUID } from 'UTILS/uuid';

import { getDocsData, updateRecord } from '../firebaseConfig';

const collectionName = 'categories';

export async function apiGetCategories({ userId }) {
  const { id, data } = await getDocsData({
    collectionName: collectionName,
    collectionFilter: { userId },
    prop: 'categories',
  });

  return { id, data };
}

export async function apiSetCategories({ userId, newCategories }) {
  const { id } = await apiGetCategories({ userId });
  const curId = id || createUUID();

  await updateRecord(collectionName, curId, {
    categories: JSON.stringify(newCategories),
    userId,
    id: curId,
  });
}
