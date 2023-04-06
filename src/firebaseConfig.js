import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  getDoc,
  doc,
  query,
  where,
  limit,
  getDocs,
  startAfter,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCKey6f4y5rzoyPiB9vdKt1TlUDhtRLUu0',
  authDomain: 'financetracking-15cca.firebaseapp.com',
  projectId: 'financetracking-15cca',
  storageBucket: 'financetracking-15cca.appspot.com',
  messagingSenderId: '1095770300667',
  appId: '1:1095770300667:web:58540caffe79c53917d05e',
  measurementId: 'G-KYGLFN4CEG',
};

const firestoreApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firestoreApp);

export const auth = getAuth();

export async function updateRecord(collectionName, docId, data) {
  return await setDoc(doc(firestore, collectionName, docId), data);
}

export async function removeDoc(collectionName, id) {
  await deleteDoc(doc(firestore, collectionName, id));
}

export async function getDocById(collectionName, id) {
  const docRef = doc(firestore, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return {};
  }
}

function getQueryFilter({
  where: whereArr,
  limit: limitData,
  startAfter: startAfterNum,
  orderBy: orderByData,
  userId,
  orderType = 'asc',
} = {}) {
  return [
    ...(limitData ? [limit(limitData)] : []),
    ...(orderByData ? [orderBy(orderByData, orderType)] : []),
    ...(startAfterNum ? [startAfter(startAfterNum)] : []),
    ...(userId ? [where('userId', '==', userId)] : []),
    ...(whereArr?.length ? [where(...whereArr)] : []),
  ];
}

export async function getDocsWhere(collectionName, collectionFilter = {}) {
  const q = query(collection(firestore, collectionName), ...getQueryFilter({ ...collectionFilter }));
  const querySnapshot = await getDocs(q);
  const result = [];
  const isEmpty = querySnapshot.empty;
  const limit = collectionFilter.limit;
  if (!isEmpty) {
    querySnapshot.forEach((doc) => {
      const newData = doc.data();
      delete newData.userId;
      result.push(newData);
    });
  }

  return { result, hasMore: result.length === limit };
}

export async function getDocsData({ collectionName, collectionFilter, prop, isArray }) {
  const response = await getDocsWhere(collectionName, collectionFilter);
  const item = response?.result?.[0] || {};
  const defaultValue = isArray ? '[]' : '{}';

  return { id: item.id, data: JSON.parse(item[prop] || defaultValue) };
}
