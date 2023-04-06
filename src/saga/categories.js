import { takeLeading, put, select, call } from 'redux-saga/effects';

import { apiGetCategories, apiSetCategories } from 'API/categories';
import { updateNewCategoriesAction, setCategories, updateCategories } from 'REDUX/categories';

import { getUpdatedCategories, getSortedIdsByType } from './helpers/categoriesHelper';

export function* fetchCategoriesData() {
  const state = yield select();
  const { data } = yield call(apiGetCategories, { userId: state.currentUser.uid });

  localStorage.setItem('categories', JSON.stringify(data));

  yield put(setCategories(getSortedIdsByType(data)));
}

function* updateNewCategories({ payload }) {
  const state = yield select();
  const { data, isIncome } = payload;

  const { categoriesObj, categoriesIds } = getUpdatedCategories({ data, isIncome });

  yield call(apiSetCategories, { userId: state.currentUser.uid, newCategories: categoriesObj });
  localStorage.setItem('categories', JSON.stringify(categoriesObj));

  const prop = isIncome ? 'income' : 'expend';
  yield put(updateCategories({ [prop]: categoriesIds }));
}

export default function* watchCategoriesSaga() {
  yield takeLeading(updateNewCategoriesAction, updateNewCategories);
}
