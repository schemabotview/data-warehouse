import type { Scene } from '@graphlearning/flow'

// §3 — drill-down and roll-up along a strict product hierarchy, with drill-across to returns at the
// level where both facts share a conformed attribute.
export const drill: Scene = {
  id: 'drill',
  title: 'Move along a hierarchy, or across processes',
  flow: 'LR',
  nodes: [
    {
      id: 'levels',
      label: 'September sales, one hierarchy',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'rollup',
          label: 'department',
          kind: 'table',
          headers: ['department', 'net_gbp'],
          values: [['Home', '144.00']],
        },
        {
          id: 'by-category',
          label: 'category',
          kind: 'table',
          headers: ['category', 'net_gbp'],
          values: [
            ['Kitchen', '117.00'],
            ['Tableware', '27.00'],
          ],
        },
        {
          id: 'by-product',
          label: 'product',
          kind: 'table',
          headers: ['product', 'net_gbp'],
          values: [
            ['Kettle', '68.00'],
            ['Toaster', '49.00'],
            ['Mug ×4', '27.00'],
          ],
        },
      ],
      edges: [
        { source: 'rollup', target: 'by-category', label: 'drill down', bidirectional: true },
        { source: 'by-category', target: 'by-product', label: 'roll up ↑', bidirectional: true },
      ],
    },
    {
      id: 'across',
      label: 'Drill across at product',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'returns-product',
          label: 'returns by product',
          kind: 'table',
          headers: ['product', 'returned_gbp'],
          values: [['Mug ×4', '18.00']],
        },
        { id: 'conformed', label: 'Conformed product', sub: 'same keys both sides', pattern: 'service', icon: 'link' },
        { id: 'strict', label: 'Strict hierarchy', sub: 'sums safely upward', pattern: 'network', icon: 'tree' },
      ],
    },
  ],
  edges: [{ source: 'levels', target: 'across', label: 'compatible grain' }],
}
