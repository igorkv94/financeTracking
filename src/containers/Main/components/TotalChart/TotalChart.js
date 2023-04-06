import React from 'react';

import { MonthSection } from 'COMPONENTS/MonthSection';

import { useTotalChart } from './helpers/useTotalChart';

export function TotalChart() {
  const { data } = useTotalChart();

  return <MonthSection data={data} isLoading={!data} />;
}
