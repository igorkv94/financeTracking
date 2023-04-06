export function convertTransactions(data) {
  const categoriesObj = JSON.parse(localStorage.getItem('categories'));
  const newTransactions = {};

  const transactionsByDays = data.reduce((resultItems, item) => {
    const { id, amount, date, category } = item;
    const categoryInfo = categoriesObj[category];
    const prop = categoryInfo.isIncome ? 'income' : 'expend';

    newTransactions[id] = { ...item, category: categoryInfo };
    const newAmount = (resultItems[date]?.total?.[prop] || 0) + amount;

    resultItems[date] = {
      ...(resultItems[date] || {}),
      [prop]: [...(resultItems[date]?.[prop] || []), id],
      total: { ...(resultItems[date]?.total || {}), [prop]: newAmount },
      date,
    };

    return resultItems;
  }, {});

  return { newTransactions, transactionsByDays };
}
