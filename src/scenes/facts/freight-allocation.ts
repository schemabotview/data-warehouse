import type { Scene } from '@graphlearning/flow'

// §7 — freight lives on the order header; sales live on lines. Copying it down double counts;
// allocating it by a stated rule keeps the total, and the reconciliation proves it.
export const freightAllocation: Scene = {
  id: 'freight-allocation',
  title: 'Two grains, one total',
  flow: 'TB',
  nodes: [
    {
      id: 'header',
      label: 'order header 1041',
      sub: 'freight is charged per order',
      kind: 'table',
      headers: ['order_id', 'freight_gbp', 'lines_net_gbp'],
      values: [['1041', '4.95', '52.00']],
    },
    {
      id: 'options',
      label: 'Moving freight to the line grain',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'copied',
          label: 'copied down ✗',
          sub: 'every line gets the header value',
          kind: 'table',
          headers: ['line', 'net_gbp', 'freight_gbp'],
          values: [
            ['1', '34.00', '4.95'],
            ['2', '18.00', '4.95'],
            ['Σ', '52.00', '9.90'],
          ],
        },
        {
          id: 'allocated',
          label: 'allocated by net value',
          sub: 'rule: line net ÷ order net',
          kind: 'table',
          headers: ['line', 'net_gbp', 'share', 'freight_gbp'],
          values: [
            ['1', '34.00', '65.4%', '3.24'],
            ['2', '18.00', '34.6%', '1.71'],
            ['Σ', '52.00', '100%', '4.95'],
          ],
        },
      ],
    },
    {
      id: 'checks',
      label: 'Evidence',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'doubled', label: 'Double counted', sub: '9.90 vs 4.95 charged', pattern: 'warn', icon: 'copy' },
        { id: 'reconciled', label: 'Reconciled', sub: 'Σ lines = header', pattern: 'network', icon: 'scale' },
        { id: 'rounding', label: 'Rounding', sub: 'remainder on the last line', pattern: 'service', icon: 'ruler' },
      ],
    },
  ],
  edges: [
    { source: 'header', target: 'options' },
    { source: 'options', target: 'checks' },
  ],
}
