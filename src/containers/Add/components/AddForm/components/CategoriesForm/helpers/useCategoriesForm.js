import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showToast } from 'UTILS/showToast';

import { useCategories } from 'COMPONENTS/common/CategorySelect/helpers/useCategories';
import { resetSuccess, updateNewCategoriesAction } from 'REDUX/categories';

export function useCategoriesForm({ isIncome, onEdit }) {
  const dispatch = useDispatch();
  const successSaved = useSelector((state) => state.categories.successSaved);
  const { activeItems, setActiveItems } = useCategories({ isIncome, isEdit: true });

  useEffect(() => {
    if (successSaved) {
      dispatch(resetSuccess());
      showToast('Saved', 'success');
      onEdit();
    }
  }, [successSaved]);

  const onSave = () => {
    activeItems.forEach((item) => {
      delete item.isNew;
    });

    dispatch(updateNewCategoriesAction({ data: activeItems, isIncome }));
  };

  return { activeItems, setActiveItems, onSave };
}
