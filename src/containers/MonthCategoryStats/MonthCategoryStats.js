import React from 'react';

import { ROUTES } from 'CONSTS/routes';

import { IconLink } from 'COMPONENTS/common/Icon';
import { MonthSection } from 'COMPONENTS/MonthSection';
import { Title } from 'COMPONENTS/Title';

import { useMonthCategoryStats } from './helpers/useMonthCategoryStats';

export default function MonthCategoryStats() {
  const { data } = useMonthCategoryStats();

  return (
    <div className="page">
      <Title
        title="Monthly statistic"
        hasHome
        rightElem={<IconLink to={ROUTES.MONTHS} size={40} iconSize={30} icon="calendar" fill="var(--color-svg)" />}
      />
      <MonthSection data={data} isLoading={!data} />
    </div>
  );
}
