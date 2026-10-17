import type { Scene } from '@graphlearning/flow'

// §4 — the business process as a chain of events, beside the rows that record them. Some events
// belong to the whole order, some to one line; the `level` column is the point.
export const orderLifecycle: Scene = {
  id: 'order-lifecycle',
  title: 'A process is a chain of events',
  flow: 'LR',
  nodes: [
    {
      id: 'chain',
      label: 'Order 1041',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'placed', label: 'Placed', sub: 'order header', pattern: 'user', icon: 'receipt' },
        { id: 'paid', label: 'Paid', sub: 'payment system', pattern: 'service', icon: 'key' },
        { id: 'shipped', label: 'Shipped', sub: 'per line, per parcel', pattern: 'network', icon: 'package' },
        { id: 'delivered', label: 'Delivered', sub: 'carrier scan', pattern: 'network', icon: 'circlecheck' },
        { id: 'returned', label: 'Returned', sub: 'one line, later', pattern: 'warn', icon: 'repeat' },
      ],
      edges: [
        { source: 'placed', target: 'paid' },
        { source: 'paid', target: 'shipped' },
        { source: 'shipped', target: 'delivered' },
        { source: 'delivered', target: 'returned' },
      ],
    },
    {
      id: 'events',
      label: 'fulfilment events',
      sub: 'one row per event — the level column decides the grain',
      kind: 'table',
      headers: ['order_id', 'line', 'event', 'level', 'at (UTC)'],
      values: [
        ['1041', '–', 'placed', 'order', '09-03 10:12'],
        ['1041', '–', 'paid', 'order', '09-03 10:13'],
        ['1041', '1', 'shipped', 'line', '09-04 15:20'],
        ['1041', '2', 'shipped', 'line', '09-05 11:02'],
        ['1041', '1', 'delivered', 'line', '09-05 09:47'],
        ['1041', '2', 'delivered', 'line', '09-06 12:30'],
        ['1041', '2', 'returned', 'line', '09-19 16:05'],
      ],
    },
  ],
  edges: [{ source: 'chain', target: 'events', label: 'recorded as' }],
}
