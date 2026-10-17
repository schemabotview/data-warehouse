import type { Scene } from '@graphlearning/flow'

// §6 — NULL, zero and a missing relationship in one small table, and what common aggregates do with
// each of them.
export const nullZero: Scene = {
  id: 'null-zero',
  title: 'Null, zero and nothing',
  flow: 'TB',
  nodes: [
    {
      id: 'null',
      label: 'order outcomes, September',
      sub: 'refund NULL means no return record',
      kind: 'table',
      headers: ['order_id', 'customer_key', 'refund_gbp', 'meaning'],
      values: [
        ['1041', '201', '18.00', 'mugs refunded'],
        ['1042', '202', '0.00', 'return refused'],
        ['1043', '-1', 'NULL', 'no return'],
        ['1044', '208', 'NULL', 'no return'],
      ],
    },
    {
      id: 'aggs',
      label: 'What the aggregates say',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'agg-sql',
          kind: 'code',
          filename: 'refunds.sql',
          label: `SELECT COUNT(*)           -- 4
     , COUNT(refund_gbp)  -- 2
     , AVG(refund_gbp)    -- 9.00
     , AVG(COALESCE(refund_gbp, 0)) -- 4.50
FROM   order_outcomes;`,
        },
        {
          id: 'by-customer',
          label: 'inner join to customers',
          sub: 'drops the -1 row unless Unknown exists',
          kind: 'table',
          headers: ['region', 'orders'],
          values: [
            ['North', '1'],
            ['West', '1'],
            ['South', '1'],
            ['Unknown', '1'],
          ],
        },
      ],
    },
    {
      id: 'rules',
      label: 'The contract says',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-null', label: 'NULL ≠ 0', sub: 'absent vs measured', pattern: 'warn', icon: 'ban' },
        { id: 'r-avg', label: 'Which average', sub: 'per return, or per order', pattern: 'service', icon: 'scale' },
        { id: 'r-unknown', label: 'Show Unknown', sub: 'never drop it', pattern: 'service', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'null', target: 'aggs' },
    { source: 'aggs', target: 'rules' },
  ],
}
