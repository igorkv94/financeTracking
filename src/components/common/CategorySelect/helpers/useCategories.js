import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function useCategories({ isIncome, isEdit }) {
  const categoriesByType = useSelector((state) => state.categories[isIncome ? 'income' : 'expend']);
  const [activeItems, setActiveItems] = useState();
  const [filterValue, setFilterValue] = useState('');

  const getFiltered = () => {
    const categoriesObj = JSON.parse(localStorage.getItem('categories'));

    if (!Array.isArray(categoriesByType)) {
      return undefined;
    }

    return categoriesByType.reduce((result, item) => {
      const { isVisible, isIncome: curIsIncome, name } = categoriesObj[item];

      if (isIncome === curIsIncome && (isEdit || isVisible) && name.toLowerCase().includes(filterValue.toLowerCase())) {
        result.push(categoriesObj[item]);
      }

      return result;
    }, []);
  };

  useEffect(() => {
    if (categoriesByType) {
      setActiveItems(getFiltered());
    }
  }, [categoriesByType?.length, filterValue, isIncome]);

  return { activeItems, setFilterValue, setActiveItems };
}
