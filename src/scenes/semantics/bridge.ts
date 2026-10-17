import type { Scene } from '@graphlearning/flow'

// §2 — a many-to-many between orders and promotions, resolved by a bridge. Without weights each
// promotion is credited the whole order; with weights the shares add back to the order.
export const bridge: Scene = {
  id: 'bridge',
  title: 'Many-to-many needs a stated rule',
  flow: 'TB',
  nodes: [
    {
      id: 'inputs',
      label: 'Order 1041 used two promotion codes',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'fact-1041',
          label: 'fact_sales (order level)',
          kind: 'table',
          headers: ['order_id', 'net_gbp'],
          values: [['1041', '52.00']],
        },
        {
          id: 'weight',
          label: 'bridge_order_promo',
          sub: 'weights sum to 1 per order',
          kind: 'table',
          headers: ['order_id', 'promo', 'weight'],
          values: [
            ['1041', 'AUTUMN', '0.5'],
            ['1041', 'WELCOME', '0.5'],
          ],
        },
      ],
      edges: [{ source: 'fact-1041', target: 'weight' }],
    },
    {
      id: 'readings',
      label: 'Two readings of "sales by promotion"',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'unweighted',
          label: 'orders involving each promo',
          sub: 'no total allowed',
          kind: 'table',
          headers: ['promo', 'net_gbp'],
          values: [
            ['AUTUMN', '52.00'],
            ['WELCOME', '52.00'],
            ['(sum)', '104.00 ✗'],
          ],
        },
        {
          id: 'weighted',
          label: 'weighted share',
          sub: 'adds back to the order',
          kind: 'table',
          headers: ['promo', 'net_gbp'],
          values: [
            ['AUTUMN', '26.00'],
            ['WELCOME', '26.00'],
            ['total', '52.00'],
          ],
        },
      ],
    },
    {
      id: 'notes',
      label: 'State the assumption',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-rule', label: 'Weight rule', sub: 'equal split, by policy', pattern: 'service', icon: 'scale' },
        { id: 'n-label', label: 'Label it', sub: '"involving" vs "credited"', pattern: 'service', icon: 'tag' },
        { id: 'n-check', label: 'Weights = 1', sub: 'tested per order', pattern: 'network', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [
    { source: 'inputs', target: 'readings' },
    { source: 'readings', target: 'notes' },
  ],
}
