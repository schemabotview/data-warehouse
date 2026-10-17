import type { Scene } from '@graphlearning/flow'

// §2 — an initial full extract taken at a known log position, then increments from exactly that
// position. The hand-off point is what makes the combined state consistent.
export const extractHandoff: Scene = {
  id: 'extract-handoff',
  title: 'Snapshot, then changes from the same point',
  flow: 'TB',
  nodes: [
    {
      id: 'phases',
      label: 'One consistent history',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'snapshot',
          label: 'full extract',
          sub: 'consistent as of LSN 0/1A1',
          kind: 'table',
          headers: ['order_id', 'status'],
          values: [
            ['1041', 'delivered'],
            ['1042', 'shipped'],
            ['1043', 'packed'],
          ],
        },
        { id: 'handoff', label: 'Hand-off', sub: 'LSN 0/1A1 recorded', pattern: 'warn', icon: 'link' },
        {
          id: 'increments',
          label: 'changes after 0/1A1',
          sub: 'applied in log order',
          kind: 'table',
          headers: ['lsn', 'op', 'order_id', 'status'],
          values: [
            ['0/1A2', 'insert', '1044', 'placed'],
            ['0/1A4', 'update', '1044', 'shipped'],
            ['0/1A5', 'update', '1043', 'shipped'],
          ],
        },
      ],
      edges: [
        { source: 'snapshot', target: 'handoff' },
        { source: 'handoff', target: 'increments' },
      ],
    },
    {
      id: 'risks',
      label: 'If the hand-off is not exact',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'gap', label: 'Gap', sub: 'changes between lost', pattern: 'warn', icon: 'search' },
        { id: 'overlap', label: 'Overlap', sub: 'changes applied twice', pattern: 'warn', icon: 'copy' },
        { id: 'evidence', label: 'Evidence', sub: 'position + counts kept', pattern: 'network', icon: 'scroll' },
      ],
    },
    {
      id: 'when',
      label: 'When each fits',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'full-fits', label: 'Full extract', sub: 'small tables, no log access', pattern: 'service', icon: 'database' },
        { id: 'incr-fits', label: 'Incremental', sub: 'large tables, frequent loads', pattern: 'service', icon: 'waves' },
      ],
    },
  ],
  edges: [
    { source: 'phases', target: 'risks' },
    { source: 'risks', target: 'when' },
  ],
}
