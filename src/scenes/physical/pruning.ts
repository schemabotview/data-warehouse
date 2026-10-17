import type { Scene } from '@graphlearning/flow'

// §2 — monthly partitions and two predicates for the same month. One states the range on the
// partition column; the other hides it inside a function, which many engines cannot prune on.
export const pruning: Scene = {
  id: 'pruning',
  title: 'Skip what the predicate rules out',
  flow: 'TB',
  nodes: [
    {
      id: 'predicates',
      label: 'Same question, two predicates',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'q-range',
          kind: 'code',
          filename: 'a_prunable.sql',
          label: `WHERE order_date >= DATE '2026-09-01'
  AND order_date <  DATE '2026-10-01'`,
        },
        {
          id: 'q-func',
          kind: 'code',
          filename: 'b_may_not_prune.sql',
          label: `WHERE to_char(order_date, 'YYYY-MM')
      = '2026-09'`,
        },
      ],
    },
    {
      id: 'outcome',
      label: 'Which partitions are read',
      pattern: 'group',
      flow: 'TB',
      children: [
    {
      id: 'pruned',
      label: 'fact_sales, partitioned by month on order_date',
      sub: 'which partitions each query reads',
      kind: 'table',
      headers: ['partition', 'query A', 'query B'],
      values: [
        ['2026-08', 'pruned', 'scanned'],
        ['2026-09', 'scanned', 'scanned'],
        ['2026-10', 'pruned', 'scanned'],
      ],
    },
    {
      id: 'notes',
      label: 'Choosing a partition key',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-filter', label: 'Filtered often', sub: 'dates usually are', pattern: 'service', icon: 'funnel' },
        { id: 'n-size', label: 'Sensible sizes', sub: 'not thousands of tiny ones', pattern: 'service', icon: 'ruler' },
        { id: 'n-verify', label: 'Verify', sub: 'read the plan', pattern: 'network', icon: 'search' },
      ],
    },
      ],
      edges: [{ source: 'pruned', target: 'notes' }],
    },
  ],
  edges: [{ source: 'predicates', target: 'outcome' }],
}
