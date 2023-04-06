import { Chart } from 'chart.js';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import styles from './MonthChart.scss';

export function MonthChart({ data }) {
  const chartRef = useRef();

  const chartData = {
    labels: data.map((item) => item.category.name),
    datasets: [
      {
        data: data.map((item) => item.amount),
        backgroundColor: data.map((item) => item.color),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    let myChart;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      myChart = new Chart(ctx, config);
    }
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [!!chartRef.current]);

  return (
    <div className={styles.chartWrapper}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

MonthChart.propTypes = {
  data: PropTypes.array.isRequired,
};
