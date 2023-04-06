export function getPercentForObj(data) {
  const totalAmount = data.reduce((result, item) => result + item.amount, 0);

  return data.reduce((result, item) => {
    result[item.id] = getPercent(item.amount, totalAmount);

    return result;
  }, {});
}

export function getPercent(amount, totalAmount) {
  return Math.round((amount * 100) / totalAmount);
}
