import type { Scene } from '@graphlearning/flow'

// §3 — two integration routes to the same sales mart: through a normalised core, or straight into
// conformed dimensional tables. The table underneath compares them on the criteria that decide.
export const normalisedToMart: Scene = {
  id: 'normalised-to-mart',
  title: 'Two routes to a serving model',
  flow: 'TB',
  nodes: [
    {
      id: 'routes',
      label: 'Same sources, same mart',
      pattern: 'group',
      flow: 'LR',
      children: [
    {
      id: 'route-a',
      label: 'Normalised core, then marts',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'a-src', label: 'Sources', sub: 'web, marketplace, returns', pattern: 'storage', icon: 'database' },
        {
          id: 'a-core',
          label: 'Integrated entities',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'e-customer', label: 'Customer', sub: 'one row per person', pattern: 'service', icon: 'users' },
            { id: 'e-order', label: 'Order', sub: 'header facts', pattern: 'service', icon: 'receipt' },
            { id: 'e-line', label: 'Order line', sub: 'one per product', pattern: 'service', icon: 'table' },
            { id: 'e-product', label: 'Product', sub: 'one catalogue', pattern: 'service', icon: 'tag' },
          ],
        },
        { id: 'a-mart', label: 'Sales mart', sub: 'star, rebuilt from core', pattern: 'storage', icon: 'star' },
      ],
      edges: [
        { source: 'a-src', target: 'a-core' },
        { source: 'a-core', target: 'a-mart' },
      ],
    },
    {
      id: 'route-b',
      label: 'Direct dimensional',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'b-src', label: 'Sources', sub: 'web, marketplace, returns', pattern: 'storage', icon: 'database' },
        { id: 'b-dims', label: 'Conformed dims', sub: 'integration happens here', pattern: 'service', icon: 'merge' },
        { id: 'b-mart', label: 'Sales star', sub: 'served directly', pattern: 'storage', icon: 'star' },
      ],
      edges: [
        { source: 'b-src', target: 'b-dims' },
        { source: 'b-dims', target: 'b-mart' },
      ],
    },
      ],
    },
    {
      id: 'compare',
      label: 'trade-offs',
      kind: 'table',
      headers: ['criterion', 'normalised core', 'direct dimensional'],
      values: [
        ['change isolation', 'strong', 'moderate'],
        ['query usability', 'via marts', 'immediate'],
        ['first delivery', 'slower', 'faster'],
        ['many consumers', 'one shared core', 'shared conformed dims'],
      ],
    },
  ],
  edges: [{ source: 'routes', target: 'compare', label: 'compared' }],
}
