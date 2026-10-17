import type { Scene } from '@graphlearning/flow'

// §2 — sales and returns combined correctly (aggregate each to a conformed attribute, then join the
// results) and incorrectly (join the detailed facts, which fans out).
export const drillAcross: Scene = {
  id: 'drill-across',
  title: 'Aggregate first, then combine',
  flow: 'TB',
  nodes: [
    {
      id: 'aggregates',
      label: 'Each fact summed to product, separately',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'sales-agg',
          label: 'sales by product',
          kind: 'table',
          headers: ['product', 'sold_gbp'],
          values: [
            ['Kettle', '68.00'],
            ['Toaster', '49.00'],
            ['Mug ×4', '27.00'],
          ],
        },
        {
          id: 'returns-agg',
          label: 'returns by product',
          kind: 'table',
          headers: ['product', 'returned_gbp'],
          values: [['Mug ×4', '18.00']],
        },
      ],
    },
    {
      id: 'combine',
      label: 'drill-across result',
      sub: 'joined on the conformed product',
      kind: 'table',
      headers: ['product', 'sold_gbp', 'returned_gbp', 'return_rate'],
      values: [
        ['Kettle', '68.00', '0.00', '0.0%'],
        ['Toaster', '49.00', '0.00', '0.0%'],
        ['Mug ×4', '27.00', '18.00', '66.7%'],
      ],
    },
    {
      id: 'wrong',
      label: 'Joining the detail instead',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'direct-join',
          label: 'sales lines ⋈ return lines',
          sub: 'on product_key',
          kind: 'table',
          headers: ['sale', 'sold_gbp', 'return', 'returned_gbp'],
          values: [
            ['1041/2', '18.00', 'R-17', '18.00'],
            ['1043/1', '9.00', 'R-17', '18.00'],
          ],
        },
        { id: 'fanned', label: 'Returns doubled', sub: '18.00 reported as 36.00', pattern: 'warn', icon: 'copy' },
      ],
      edges: [{ source: 'direct-join', target: 'fanned' }],
    },
  ],
  edges: [
    { source: 'aggregates', target: 'combine', label: 'then join' },
    { source: 'combine', target: 'wrong', label: 'not', dashed: true },
  ],
}
