import type { Scene } from '@graphlearning/flow'

// §4 — resolving each fact to the dimension version valid at its business date, with the boundary
// case that only a half-open interval gets right.
export const asWasJoin: Scene = {
  id: 'as-was-join',
  title: 'Look up the version that was true',
  flow: 'TB',
  nodes: [
    {
      id: 'lookup',
      kind: 'code',
      filename: 'resolve_customer_key.sql',
      label: `SELECT s.order_id, d.customer_key, d.region
FROM   stg_sales s
JOIN   dim_customer d
  ON   d.customer_id = s.customer_id
 AND   s.order_date >= d.valid_from   -- inclusive
 AND   s.order_date <  d.valid_to;    -- exclusive`,
    },
    {
      id: 'resolved',
      label: 'resolved keys',
      sub: 'each fact gets the version of its own date',
      kind: 'table',
      headers: ['order', 'order_date', 'customer_key', 'region'],
      values: [
        ['1041', '2026-09-03', '201', 'North'],
        ['test', '2026-09-20', '208', 'South'],
        ['1044', '2026-09-30', '208', 'South'],
      ],
    },
    {
      id: 'traps',
      label: 'Two ways to get it wrong',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'boundary', label: 'Closed interval', sub: '20 Sept matches twice', pattern: 'warn', icon: 'copy' },
        { id: 'load-date', label: 'Load date', sub: 'late rows get today', pattern: 'warn', icon: 'clock' },
        { id: 'one-match', label: 'Test it', sub: 'exactly one match', pattern: 'network', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [
    { source: 'lookup', target: 'resolved' },
    { source: 'resolved', target: 'traps' },
  ],
}
