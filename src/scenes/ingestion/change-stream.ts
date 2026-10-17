import type { Scene } from '@graphlearning/flow'

// §3 and §5 — a log-based change stream as it actually arrives: out of order, with a redelivery, a
// delete and its tombstone. The timestamp query above it is what CDC replaces.
export const changeStream: Scene = {
  id: 'change-stream',
  title: 'Changes as the log recorded them',
  flow: 'TB',
  nodes: [
    {
      id: 'polling',
      label: 'Timestamp polling',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'ts-query',
          kind: 'code',
          filename: 'poll_orders.sql',
          label: `SELECT * FROM orders
WHERE  updated_at > :last_run;`,
        },
        { id: 'ts-misses', label: 'Misses', sub: 'deletes, same-tick commits', pattern: 'warn', icon: 'search' },
      ],
      edges: [{ source: 'ts-query', target: 'ts-misses' }],
    },
    {
      id: 'stream',
      label: 'change events, in arrival order',
      sub: 'log position (LSN) gives the true order',
      kind: 'table',
      headers: ['arrived', 'lsn', 'op', 'order_id', 'after.status'],
      values: [
        ['1', '0/1A2', 'c', '1044', 'placed'],
        ['2', '0/1A5', 'u', '1043', 'shipped'],
        ['3', '0/1A4', 'u', '1044', 'shipped'],
        ['4', '0/1A5', 'u', '1043', 'shipped'],
        ['5', '0/1A6', 'd', '1046', 'null'],
        ['6', '0/1A6', 'tombstone', '1046', '—'],
      ],
    },
    {
      id: 'handling',
      label: 'How the loader reads it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'lsn', label: 'Order by LSN', sub: 'not by arrival', pattern: 'service', icon: 'sortarrows' },
        { id: 'dup', label: 'Drop repeats', sub: 'same LSN + key', pattern: 'service', icon: 'copy' },
        { id: 'tombstone', label: 'Delete ≠ tombstone', sub: 'check connector rules', pattern: 'warn', icon: 'trash' },
      ],
    },
  ],
  edges: [
    { source: 'polling', target: 'stream', label: 'replaced by log capture' },
    { source: 'stream', target: 'handling' },
  ],
}
