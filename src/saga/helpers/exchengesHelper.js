import { currencyInfo } from 'CONSTS/currencyInfo';

import { getMidnightTime } from 'UTILS/dateFormat';

export function convertExchanges(data) {
  return data.reduce(
    (result, item) => {
      const { id, date, amountFrom, amountTo, from, to } = item;

      const dayInfo = result.exchangesByDays.find((info) => info.date === getMidnightTime(date));
      if (dayInfo) {
        dayInfo.exchanges = [...dayInfo.exchanges, id];
      } else {
        result.exchangesByDays.push({ date: getMidnightTime(date), exchanges: [id] });
      }

      result.exchangesObj[id] = {
        id: id,
        from: { amount: amountFrom, currency: currencyInfo[from] },
        to: { amount: amountTo, currency: currencyInfo[to] },
        rate: parseFloat((amountTo / amountFrom).toFixed(2)),
      };

      return result;
    },
    { exchangesByDays: [], exchangesObj: {} },
  );
}

export function saveToStorage(newData, isMore) {
  if (isMore) {
    localStorage.setItem('exchanges', JSON.stringify({ ...JSON.parse(localStorage.getItem('exchanges')), ...newData }));
  } else {
    localStorage.setItem('exchanges', JSON.stringify(newData));
  }
}
