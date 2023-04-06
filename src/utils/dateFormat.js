export function dateFormat({ timestamp, format = '$2 $1 $3', options = {} }) {
  let date = new Date(timestamp || Date.now());

  let formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  });

  return formatter.format(date).replace(/(\w+) (\d+), (\d+) at (\d+):(\d+)/, format);
}

export function getMidnightTime(date) {
  const newDate = new Date(date || Date.now());
  newDate.setHours(0, 0, 0, 0);

  return newDate.getTime();
}

export function getYearAndMonth(year, month) {
  return `${year}-${month < 10 ? `0${month}` : month}`;
}

export function getTodayYearAndMonth(date) {
  const newDate = date || new Date();

  return getYearAndMonth(newDate.getFullYear(), newDate.getMonth());
}
