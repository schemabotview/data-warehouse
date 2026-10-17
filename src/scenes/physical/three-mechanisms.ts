import type { Scene } from '@graphlearning/flow'

// §3 — three different mechanisms that are often lumped together, and the block-level min/max that
// shows why sort order helps a range filter.
export const threeMechanisms: Scene = {
  id: 'three-mechanisms',
  title: 'Sorting, clustering and indexing differ',
  flow: 'TB',
  framed: true,
  nodes: [
    {
      id: 'kinds',
      label: 'Three mechanisms',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'sort',
          kind: 'list',
          label: 'Sort order',
          icon: 'sortarrows',
          pattern: 'service',
          items: ['Rows stored in key order', 'Blocks keep min / max', 'Range filters skip blocks'],
        },
        {
          id: 'cluster',
          kind: 'list',
          label: 'Clustering',
          icon: 'layers',
          pattern: 'network',
          items: ['Related rows kept together', 'Often maintained by engine', 'Decays as data arrives'],
        },
        {
          id: 'index',
          kind: 'list',
          label: 'B-tree index',
          icon: 'search',
          pattern: 'storage',
          items: ['Separate structure', 'Fast lookup of few rows', 'Costs every write'],
        },
      ],
    },
    {
      id: 'blocks',
      label: 'Filter: order_date in 09-14 … 09-21',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'sorted-blocks',
          label: 'sorted by date',
          sub: '1 of 3 blocks read',
          kind: 'table',
          headers: ['block', 'min', 'max', 'read?'],
          values: [
            ['1', '09-01', '09-10', 'skip'],
            ['2', '09-11', '09-22', 'read'],
            ['3', '09-23', '09-30', 'skip'],
          ],
        },
        {
          id: 'unsorted-blocks',
          label: 'arrival order',
          sub: '3 of 3 blocks read',
          kind: 'table',
          headers: ['block', 'min', 'max', 'read?'],
          values: [
            ['1', '09-02', '09-29', 'read'],
            ['2', '09-01', '09-30', 'read'],
            ['3', '09-03', '09-28', 'read'],
          ],
        },
      ],
    },
    {
      id: 'which-when',
      label: 'which mechanism tends to help',
      sub: 'confirm on your engine',
      kind: 'table',
      headers: ['query', 'tends to help'],
      values: [
        ['one order by order_id', 'B-tree index'],
        ['a range of order dates', 'sort order, block min/max'],
        ['all rows of one customer', 'clustering on customer'],
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'blocks', label: 'sort order, illustrated' },
    { source: 'blocks', target: 'which-when', label: 'so, per query' },
  ],
}
