import { CHART_COLORS } from 'CONSTS/chartColors';

export const total = {
  income: { amount: 2000 },
  expend: { amount: 100 },
  profit: { amount: 1900 },
  current: { amount: 1500 },
  exchangedOut: { amount: 500 },
  exchangedIn: { amount: 100 },
};

export const types = [
  { name: 'sport1', icon: '🥣' },
  { name: 'sport2', icon: '🥣' },
  { name: 'sport3', icon: '🥣' },
  { name: 'sport4', icon: '🥣' },
];

export const oneMonthCategoryStats = {
  '2022-06': [
    { category: { name: 'sport', icon: '🥣' }, amount: 200, percent: 20, color: CHART_COLORS.blue },
    { category: { name: 'sportq', icon: '🥣' }, amount: 600, percent: 40, color: CHART_COLORS.green },
    { category: { name: 'sportw', icon: '🥣' }, amount: 500, percent: 20, color: CHART_COLORS.grey },
    { category: { name: 'sporte', icon: '🥣' }, amount: 400, percent: 20, color: CHART_COLORS.orange },
  ],
};

export const monthCategoryStats = {
  '2022-06': {
    total: {
      income: 200,
      expend: 100,
    },
    categories: {
      sport1: 600,
      sport2: 500,
      sport3: 400,
      sport4: 200,
    },
  },
  '2022-05': {
    total: {
      income: 300,
      expend: 500,
    },
    categories: {
      sport1: 100,
      sport2: 500,
      sport3: 400,
      sport4: 200,
    },
  },
  '2022-04': {
    total: {
      income: 0,
      expend: 210,
    },
    categories: {
      sport1: 400,
      sport2: 500,
      sport3: 400,
      sport4: 200,
    },
  },
  '2022-03': {
    total: {
      income: 200,
      expend: 100,
    },
    categories: {
      sport1: 500,
      sport2: 500,
      sport3: 400,
      sport4: 200,
    },
  },
};

export const transactions = [
  {
    date: 1654635600000,
    transactions: [
      {
        id: 's213013213',
        category: { name: 'sport', icon: '🥣' },
        amount: 10,
        isIncome: true,
        percent: 15,
      },
      {
        id: 's213013212',
        category: { name: 'sport', icon: '🥣' },
        amount: 10,
        isIncome: true,
        percent: 15,
      },
      {
        id: 's213013211',
        category: { name: 'sport', icon: '🥣' },
        amount: 10,
        isIncome: false,
        percent: 15,
      },
    ],
  },
  {
    date: 1654549200000,
    transactions: [
      {
        id: 's213013213',
        category: { name: 'sport', icon: '🥣' },
        amount: 10,
        isIncome: true,
        percent: 15,
      },
      {
        id: 's213013212',
        category: { name: 'sport', icon: '🥣' },
        amount: 10,
        isIncome: true,
        percent: 15,
      },
      {
        id: 's213013211',
        category: { name: 'sport', icon: '🥣' },
        amount: 10,
        isIncome: false,
        percent: 15,
      },
    ],
  },
  {
    date: 1654117200000,
    transactions: [
      {
        id: 's213013213',
        category: { name: 'sport', icon: '🥣' },
        amount: 10,
        isIncome: true,
        percent: 15,
      },
      {
        id: 's213013212',
        category: { name: 'sport', icon: '🥣' },
        amount: 10,
        isIncome: true,
        percent: 15,
      },
      {
        id: 's213013211',
        category: { name: 'sport', icon: '🥣' },
        amount: 10,
        isIncome: false,
        percent: 15,
      },
    ],
  },
];

export const exchanges = [
  {
    date: 1654635600000,
    exchanges: [
      {
        id: 's2130132136',
        from: { amount: 125, currency: { code: 'USD', symbol: '$' } },
        to: { amount: 250, currency: { code: 'UAH', symbol: '€' } },
        rate: 2,
      },
      {
        id: 's2130132135',
        from: { amount: 125, currency: { code: 'UAH', symbol: '€' } },
        to: { amount: 250, currency: { code: 'UAH', symbol: '₴' } },
        rate: 2,
      },
    ],
  },
  {
    date: 1654549200000,
    exchanges: [
      {
        id: 's2130132131',
        from: { amount: 125, currency: { code: 'USD', symbol: '$' } },
        to: { amount: 250, currency: { code: 'UAH', symbol: '€' } },
        rate: 2,
      },
      {
        id: 's2130132132',
        from: { amount: 125, currency: { code: 'UAH', symbol: '€' } },
        to: { amount: 250, currency: { code: 'UAH', symbol: '₴' } },
        rate: 2,
      },
    ],
  },
  {
    date: 1654117200000,
    exchanges: [
      {
        id: 's2130132133',
        from: { amount: 125, currency: { code: 'USD', symbol: '$' } },
        to: { amount: 250, currency: { code: 'UAH', symbol: '€' } },
        rate: 2,
      },
      {
        id: 's2130132134',
        from: { amount: 125, currency: { code: 'UAH', symbol: '€' } },
        to: { amount: 250, currency: { code: 'USD', symbol: '$' } },
        rate: 2,
      },
    ],
  },
];
