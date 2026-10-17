import type { Scene } from '@graphlearning/flow'

// §4 — a product hierarchy that is strict except for one product with two parents. Rolling the tree
// up sums that product twice; the list on the right is the set of honest choices.
export const categoryTree: Scene = {
  id: 'category-tree',
  title: 'A hierarchy that is not quite a tree',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'tree',
      label: 'Department → category → product',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'home', label: 'Home', sub: 'department', pattern: 'storage', icon: 'tree' },
        { id: 'kitchen', label: 'Kitchen', sub: 'category', pattern: 'service', icon: 'package' },
        { id: 'tableware', label: 'Tableware', sub: 'category', pattern: 'service', icon: 'package' },
        { id: 'kettle', label: 'Kettle', sub: '68.00 GBP', pattern: 'network', icon: 'tag' },
        { id: 'toaster', label: 'Toaster', sub: '98.00 GBP', pattern: 'network', icon: 'tag' },
        { id: 'gift-set', label: 'Breakfast set', sub: 'kettle + mugs, 60.00', pattern: 'warn', icon: 'tag' },
        { id: 'mugs', label: 'Mug ×4', sub: '27.00 GBP', pattern: 'network', icon: 'tag' },
      ],
      edges: [
        { source: 'home', target: 'kitchen' },
        { source: 'home', target: 'tableware' },
        { source: 'kitchen', target: 'kettle' },
        { source: 'kitchen', target: 'toaster' },
        { source: 'kitchen', target: 'gift-set' },
        { source: 'tableware', target: 'gift-set' },
        { source: 'tableware', target: 'mugs' },
      ],
    },
    {
      id: 'consequence',
      label: 'Rolling it up',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'rollup',
          label: 'naive roll-up',
          kind: 'table',
          headers: ['level', 'net_gbp'],
          values: [
            ['Kitchen', '226.00'],
            ['Tableware', '87.00'],
            ['Home (sum)', '313.00'],
            ['Home (actual)', '253.00'],
          ],
        },
        { id: 'non-strict', label: 'Two parents', sub: 'set counted twice', pattern: 'warn', icon: 'copy' },
        {
          id: 'choices',
          kind: 'list',
          label: 'Honest choices',
          icon: 'scale',
          pattern: 'service',
          framed: true,
          items: ['One primary parent', 'Bridge table with weights', 'Report the overlap'],
        },
      ],
    },
  ],
  edges: [{ source: 'tree', target: 'consequence', label: 'sum up the tree' }],
}
