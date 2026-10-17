import type { Scene } from '@graphlearning/flow'

// §4 — running totals and a month-over-month comparison where the current month is incomplete. The
// plot shows why the naive comparison misleads.
export const periods: Scene = {
  id: 'periods',
  title: 'Compare like with like',
  flow: 'TB',
  nodes: [
    {
      id: 'window-sql',
      kind: 'code',
      filename: 'running_total.sql',
      label: `SELECT d.date,
       SUM(SUM(f.net_gbp)) OVER (
         PARTITION BY d.month ORDER BY d.date
       ) AS month_to_date
FROM   fact_sales f JOIN dim_date d ON d.date_key = f.order_date_key
GROUP  BY d.month, d.date;   -- calendar: Europe/London, days from dim_date`,
    },
    {
      id: 'views',
      label: 'September complete, October two days in',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'mtd-plot',
          kind: 'plot',
          label: 'Month to date, GBP',
          plot: {
            x: { min: 0, max: 31, step: 5, label: 'day of month' },
            y: { min: 0, max: 160, step: 40, label: 'GBP' },
            series: [
              { kind: 'line', points: [[1, 0], [3, 52], [14, 101], [21, 110], [30, 144]], label: 'Sept' },
              { kind: 'line', points: [[1, 49], [2, 76]], label: 'Oct', color: 'warn' },
              { kind: 'marker', at: [2, 76], color: 'warn' },
            ],
          },
        },
        {
          id: 'partial',
          label: 'month over month',
          sub: 'a partial month must say so',
          kind: 'table',
          headers: ['month', 'net_gbp', 'days', 'status'],
          values: [
            ['2026-09', '144.00', '30 / 30', 'complete'],
            ['2026-10', '76.00', '2 / 31', 'partial'],
            ['change', '−47%', '—', 'not comparable'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'window-sql', target: 'views' }],
}
