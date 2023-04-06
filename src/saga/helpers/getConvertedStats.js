import { getPercentForObj } from 'UTILS/getPercent';
import { getRandomColorsArr } from 'UTILS/getRandomColors';

export function getConvertedStats(data) {
  const categoriesObj = JSON.parse(localStorage.getItem('categories'));

  const curTotalStats = Object.entries(data).reduce((result, [key, value]) => {
    if (categoriesObj[key].isVisible) {
      result.push({ id: key, amount: value });
    }
    return result;
  }, []);

  const percents = getPercentForObj(curTotalStats);
  const chartColors = getRandomColorsArr(Object.keys(curTotalStats).length);

  return curTotalStats.map((item, i) => ({
    category: categoriesObj[item.id],
    amount: item.amount,
    percent: percents[item.id],
    color: chartColors[i],
  }));
}
