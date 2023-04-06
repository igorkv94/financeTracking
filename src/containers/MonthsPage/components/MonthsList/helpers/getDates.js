export const getDates = (creationTime) => {
  const date = new Date(creationTime);
  const today = new Date();

  const years = [];
  for (let i = date.getFullYear(); i <= today.getFullYear(); i++) {
    years.push(i);
  }

  if (years.length === 1) {
    return [{ year: today.getFullYear(), activeMonths: [date.getMonth(), today.getMonth()] }];
  }

  return years.map((year, i) => {
    const result = { year, activeMonths: [0, 11] };
    if (i === 0) {
      result.activeMonths = [date.getMonth(), 11];
    }
    if (i === years.length - 1) {
      result.activeMonths = [0, today.getMonth()];
    }
    return result;
  });
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
