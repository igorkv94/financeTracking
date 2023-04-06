export function getSortedIdsByType(data) {
  return Object.entries(data).reduce(
    (result, [key, value]) => {
      const prop = value.isIncome ? 'income' : 'expend';
      result[prop].push(key);

      return result;
    },
    { income: [], expend: [] },
  );
}

function getOtherCats(isIncome) {
  return Object.values(JSON.parse(localStorage.getItem('categories'))).reduce((result, item) => {
    if (item.isIncome !== isIncome || !item.isVisible) {
      result[item.id] = item;
    }
    return result;
  }, {});
}

export function getUpdatedCategories({ data, isIncome }) {
  return data.reduce(
    (result, item) => {
      result.categoriesIds.push(item.id);
      result.categoriesObj[item.id] = item;

      return result;
    },
    { categoriesObj: getOtherCats(isIncome), categoriesIds: [] },
  );
}
