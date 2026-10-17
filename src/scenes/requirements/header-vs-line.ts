import type { Scene } from '@graphlearning/flow'

// §3 — an order header and its lines are different entities, and an id is only unique inside the
// system that issued it. The marketplace reuses 1042; qualifying by source keeps both.
export const headerVsLine: Scene = {
  id: 'header-vs-line',
  title: 'Which thing does a row describe?',
  flow: 'TB',
  nodes: [
    {
      id: 'entities',
      label: 'Two entities, one order',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'header',
          label: 'order header',
          sub: 'one row per order',
          kind: 'table',
          headers: ['order_id', 'customer', 'freight_gbp'],
          values: [
            ['1041', 'C-201', '4.95'],
            ['1042', 'C-202', '0.00'],
          ],
        },
        {
          id: 'lines',
          label: 'order lines',
          sub: 'one row per product',
          kind: 'table',
          headers: ['order_id', 'line', 'product', 'net_gbp'],
          values: [
            ['1041', '1', 'Kettle', '34.00'],
            ['1041', '2', 'Mug ×4', '18.00'],
            ['1042', '1', 'Toaster', '49.00'],
          ],
        },
      ],
      edges: [{ source: 'header', target: 'lines', label: '1 to many' }],
    },
    {
      id: 'sources',
      label: 'Same id, different systems',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'mkt',
          label: 'marketplace orders',
          sub: 'a second source',
          kind: 'table',
          headers: ['order_id', 'customer', 'placed'],
          values: [
            ['1042', 'M-88', '2026-09-02'],
            ['1043', 'M-91', '2026-09-04'],
          ],
        },
        { id: 'reused-id', label: 'Reused id', sub: '1042 is two orders', pattern: 'warn', icon: 'copy' },
        {
          id: 'qualified',
          label: 'qualified key',
          sub: 'source + id',
          kind: 'table',
          headers: ['source', 'order_id', 'customer'],
          values: [
            ['web', '1042', 'C-202'],
            ['mkt', '1042', 'M-88'],
          ],
        },
      ],
      edges: [
        { source: 'mkt', target: 'reused-id' },
        { source: 'reused-id', target: 'qualified', label: 'fix' },
      ],
    },
  ],
  edges: [{ source: 'entities', target: 'sources', label: 'and across systems' }],
}
