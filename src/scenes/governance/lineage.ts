import type { Scene } from '@graphlearning/flow'

// §3 — technical lineage of one dashboard tile beside the business metadata that gives it meaning
// and accountability. Lineage says where; the glossary says what and who.
export const lineage: Scene = {
  id: 'lineage',
  title: 'Where it came from, and what it means',
  flow: 'LR',
  nodes: [
    {
      id: 'tech',
      label: 'Technical lineage',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 't-src', label: 'web orders', sub: 'source table', pattern: 'storage', icon: 'database' },
        { id: 't-stg', label: 'stg orders', sub: 'batches 70–77', pattern: 'service', icon: 'harddrive' },
        { id: 't-fact', label: 'fact_sales', sub: 'models at 4e1c9a2', pattern: 'service', icon: 'star' },
        { id: 't-tile', label: 'Revenue tile', sub: 'finance dashboard', pattern: 'external', icon: 'barchart' },
      ],
      edges: [
        { source: 't-src', target: 't-stg' },
        { source: 't-stg', target: 't-fact' },
        { source: 't-fact', target: 't-tile' },
      ],
    },
    {
      id: 'business',
      label: 'Business metadata',
      pattern: 'group',
      flow: 'TB',
      framed: true,
      children: [
        {
          id: 'business-def',
          kind: 'list',
          label: 'Net merchandise revenue',
          sub: 'glossary entry',
          icon: 'scroll',
          pattern: 'storage',
          items: ['Booked lines, net of VAT, GBP', 'Returns are a separate metric', 'Metric version 2'],
        },
        {
          id: 'accountability',
          kind: 'list',
          label: 'Accountability',
          icon: 'usercheck',
          pattern: 'user',
          items: ['Owner: finance analytics', 'Steward: named analyst', 'Questions: #finance-data'],
        },
        { id: 'gap', label: 'Lineage alone', sub: 'cannot say what it means', pattern: 'warn', icon: 'search' },
      ],
    },
  ],
  edges: [{ source: 'tech', target: 'business', label: 'linked by the metric name' }],
}
