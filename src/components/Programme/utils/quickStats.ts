export const quickStats = (stats: ProgrammeStats, theme: any) => [
  {
    label: 'This Week',
    value: stats?.thisWeek?.toString() || '0',
    color: theme.primary,
  },
  {
    label: 'This Month',
    value: stats?.thisMonth?.toString() || '0',
    color: theme.secondary,
  },
  {
    label: 'Total',
    value: stats?.total ? `${stats.total}+` : '0',
    color: theme.tertiary,
  },
];
