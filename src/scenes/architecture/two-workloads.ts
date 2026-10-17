import type { Scene } from '@graphlearning/flow'
import { orderLinesSample } from '../shared/retail'

// §2 — the same order data under two workloads. Each side is a query card over the rows it touches,
// so the contrast is the shape of the work, not a claim about speed.
export const twoWorkloads: Scene = {
  id: 'two-workloads',
  title: 'One dataset, two workloads',
  flow: 'LR',
  nodes: [
    {
      id: 'oltp',
      label: 'Operational — OLTP',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'lookup',
          kind: 'code',
          filename: 'checkout.sql',
          label: `-- one order, by key
UPDATE orders
SET    status = 'shipped'
WHERE  order_id = 1042;`,
        },
        {
          id: 'one-row',
          label: 'orders',
          sub: 'current state only',
          kind: 'table',
          headers: ['order_id', 'status', 'updated_at'],
          values: [
            ['1041', 'delivered', '2026-09-05'],
            ['1042', 'shipped', '2026-10-16'],
            ['1043', 'packed', '2026-09-22'],
          ],
        },
        { id: 'overwrite', label: 'Old value gone', sub: "1042 was 'packed' — no more", pattern: 'warn', icon: 'swap' },
      ],
      edges: [
        { source: 'lookup', target: 'one-row', label: 'touches 1 row' },
        { source: 'one-row', target: 'overwrite' },
      ],
    },
    {
      id: 'olap',
      label: 'Analytical — OLAP',
      pattern: 'group',
      flow: 'TB',
      children: [
        orderLinesSample('lines'),
        {
          id: 'scan',
          kind: 'code',
          filename: 'monthly_revenue.sql',
          label: `-- every line, three columns
SELECT date_trunc('month', ordered_on) AS month,
       SUM(net_gbp)                       AS net_gbp
FROM   order_lines
GROUP  BY 1
ORDER  BY 1;`,
        },
        {
          id: 'months',
          label: 'result',
          sub: 'each month stays comparable',
          kind: 'table',
          headers: ['month', 'net_gbp', 'note'],
          values: [
            ['2026-09', '144.00', 'complete'],
            ['2026-10', '49.00', 'month still open'],
          ],
        },
        { id: 'history-kept', label: 'History kept', sub: 'compare any two periods', pattern: 'service', icon: 'history' },
      ],
      edges: [
        { source: 'lines', target: 'scan', label: 'reads every row' },
        { source: 'scan', target: 'months' },
        { source: 'months', target: 'history-kept' },
      ],
    },
  ],
  edges: [],
}
