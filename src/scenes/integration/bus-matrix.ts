import type { Scene } from '@graphlearning/flow'

// §1 — the bus matrix: business processes against the dimensions they share. A tick is a claim that
// the definition is genuinely shared; the warn row is where the claim failed on inspection.
export const busMatrix: Scene = {
  id: 'bus-matrix',
  title: 'Processes × shared dimensions',
  flow: 'TB',
  nodes: [
    {
      id: 'matrix',
      label: 'bus matrix — retailer',
      sub: 'rows are processes, columns are conformed dimensions',
      kind: 'table',
      headers: ['process', 'date', 'customer', 'product', 'location', 'promotion'],
      values: [
        ['sales', '✓', '✓', '✓', '✓', '✓'],
        ['returns', '✓', '✓', '✓', '✓', ''],
        ['inventory', '✓', '', '✓', '✓', ''],
        ['fulfilment', '✓', '✓', '', '✓', ''],
      ],
    },
    {
      id: 'conformed',
      label: 'Conformed means one definition',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-date', label: 'dim_date', sub: 'one calendar, one fiscal year', pattern: 'service', icon: 'calendar' },
        { id: 'c-customer', label: 'dim_customer', sub: 'same keys, same regions', pattern: 'service', icon: 'users' },
        { id: 'c-product', label: 'dim_product', sub: 'one catalogue, one hierarchy', pattern: 'service', icon: 'tag' },
      ],
    },
    {
      id: 'checks',
      label: 'Checked, not assumed',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'chk-returns', label: 'Returns codes', sub: 'warehouse SKUs, not shop ids', pattern: 'warn', icon: 'tag' },
        { id: 'chk-regions', label: 'Two region lists', sub: 'sales vs logistics', pattern: 'warn', icon: 'globe' },
        { id: 'chk-owner', label: 'One owner each', sub: 'per conformed dimension', pattern: 'user', icon: 'usercheck' },
      ],
    },
  ],
  edges: [
    { source: 'matrix', target: 'conformed', label: 'each column is' },
    { source: 'conformed', target: 'checks', label: 'and is' },
  ],
}
