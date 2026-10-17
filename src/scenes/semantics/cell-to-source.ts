import type { Scene } from '@graphlearning/flow'

// §7 — one report cell traced back through the metric definition, the fact rows and the load batch
// to the source records. Each hop is a place a discrepancy can be found.
export const cellToSource: Scene = {
  id: 'cell-to-source',
  title: 'From one cell back to its rows',
  flow: 'TB',
  nodes: [
    {
      id: 'top',
      label: 'The report and its definition',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'cell',
          label: 'report cell',
          kind: 'table',
          headers: ['category', 'month', 'net revenue'],
          values: [['Kitchen', '2026-09', '117.00']],
        },
        { id: 'metric-v2', label: 'Metric v2', sub: 'booked, net, GBP', pattern: 'service', icon: 'scroll' },
      ],
      edges: [{ source: 'cell', target: 'metric-v2', label: 'defined by' }],
    },
    {
      id: 'source-rows',
      label: 'fact_sales rows behind the cell',
      sub: 'sum = 117.00 ✓',
      kind: 'table',
      headers: ['order', 'line', 'product', 'net_gbp', '_batch'],
      values: [
        ['1041', '1', 'Kettle', '34.00', '70'],
        ['1042', '1', 'Toaster', '49.00', '72'],
        ['1044', '1', 'Kettle', '34.00', '77'],
      ],
    },
    {
      id: 'origin',
      label: 'Back to the source',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'o-batch', label: 'Batches 70–77', sub: 'positions, counts', pattern: 'network', icon: 'layers' },
        { id: 'o-source', label: 'Web orders', sub: '1041, 1042, 1044', pattern: 'storage', icon: 'database' },
        { id: 'o-limit', label: 'Grain wrong?', sub: 'no layer above fixes it', pattern: 'warn', icon: 'ruler' },
      ],
    },
  ],
  edges: [
    { source: 'top', target: 'source-rows', label: 'filter: Kitchen, Sept, booked' },
    { source: 'source-rows', target: 'origin', label: 'loaded from' },
  ],
}
