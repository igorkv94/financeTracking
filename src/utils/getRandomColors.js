import { CHART_COLORS } from 'CONSTS/chartColors';

export function getRandomColorsArr(length) {
  const chartColors = [...CHART_COLORS];

  return Array.from({ length }).map(() => {
    const colorIndex = Math.floor(Math.random() * chartColors.length);
    const result = chartColors[colorIndex];

    chartColors.splice(colorIndex, 1);

    return result;
  });
}
