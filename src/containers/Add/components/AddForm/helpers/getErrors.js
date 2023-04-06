export const getErrors = (formData, hasCurrencies) => {
  const result = [];
  const { category, amount, currency } = formData;

  if (!currency) {
    result.push({
      title: 'Currency',
      field: 'currency',
      message: hasCurrencies ? 'Choose right currency' : 'Add new currency at first',
    });
  }
  if (!category) {
    result.push({ title: 'Category', field: 'category', message: 'Invalid category' });
  }
  if (!amount) {
    result.push({ title: 'Amount', field: 'amount', message: 'Invalid amount' });
  }

  return result;
};
