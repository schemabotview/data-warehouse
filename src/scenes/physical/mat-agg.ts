import type { Scene } from '@graphlearning/flow'

// §5 — a materialised aggregate between the fact and a dashboard, and the staleness window a late
// correction opens until the next refresh.
export const matAgg: Scene = {
  id: 'mat-agg',
  title: 'Faster reads, older answers',
  flow: 'TB',
  nodes: [
    {
      id: 'chain',
      label: 'Precomputed path',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'base', label: 'fact_sales', sub: 'corrected at 10:00', pattern: 'storage', icon: 'database' },
        { id: 'agg', label: 'Daily aggregate', sub: 'refreshed 02:00', pattern: 'service', icon: 'sigma' },
        { id: 'dash', label: 'Dashboard', sub: 'reads the aggregate', pattern: 'external', icon: 'barchart' },
      ],
      edges: [
        { source: 'base', target: 'agg', label: 'refresh' },
        { source: 'agg', target: 'dash' },
      ],
    },
    {
      id: 'compare',
      label: 'September, Kitchen, at 11:00 on 6 Oct',
      kind: 'table',
      headers: ['source', 'net_gbp', 'as of'],
      values: [
        ['fact_sales', '113.00', '10:00 (1042 fixed)'],
        ['sales_by_day_category', '117.00', '02:00'],
      ],
    },
    {
      id: 'costs',
      label: 'The trade',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'stale', label: 'Staleness', sub: 'until the next refresh', pattern: 'warn', icon: 'clock' },
        { id: 'refresh-cost', label: 'Refresh cost', sub: 'full or incremental', pattern: 'service', icon: 'gears' },
        { id: 'label-asof', label: 'Show "as of"', sub: 'on the dashboard', pattern: 'network', icon: 'calendar' },
      ],
    },
  ],
  edges: [
    { source: 'chain', target: 'compare' },
    { source: 'compare', target: 'costs' },
  ],
}
