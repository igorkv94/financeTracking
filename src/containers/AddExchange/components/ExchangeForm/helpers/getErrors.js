export function getErrors(data) {
  const result = [];
  if (!data.fromValue) {
    result.push({ title: 'amount', field: 'fromValue', message: 'Wrong field' });
  }
  if (!data.exchangeRate) {
    result.push({ title: 'rate', field: 'exchangeRate', message: 'Wrong field' });
  }
  if (!data.fromCurrency || !data.toCurrency || data.fromCurrency === data.toCurrency) {
    result.push({ title: 'currency', field: 'toCurrency', message: 'Choose right currencies' });
  }
  return result;
}
