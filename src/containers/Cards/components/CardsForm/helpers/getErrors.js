import { currencyInfo } from 'CONSTS/currencyInfo';

export function getErrors(currencyList, data) {
  const result = [];
  Object.keys(currencyList || {}).forEach((key) => {
    if (!data[key]) {
      result.push({ title: `Amount ${currencyInfo[key].name}`, field: key, message: "Field can't be empty" });
    }
  });
  return result;
}
