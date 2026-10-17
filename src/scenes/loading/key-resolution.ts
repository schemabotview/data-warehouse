import type { Scene } from '@graphlearning/flow'

// §3 — loading facts: every dimension key resolved with a left join, misses mapped to a reserved or
// inferred member, and the unresolved count checked rather than discovered later.
export const keyResolution: Scene = {
  id: 'key-resolution',
  title: 'Every fact row keeps its place',
  flow: 'TB',
  nodes: [
    {
      id: 'load-sql',
      kind: 'code',
      filename: 'load_fact_sales.sql',
      label: `INSERT INTO fact_sales
SELECT d.date_key,
       COALESCE(c.customer_key, -1) AS customer_key,
       COALESCE(p.product_key, -1)  AS product_key,
       l.order_id, l.line_no, l.qty, l.net_gbp
FROM   stg_lines l
JOIN   dim_date d     ON d.date = l.order_date
LEFT JOIN dim_customer c
       ON  c.customer_id = l.customer_id
       AND l.order_date >= c.valid_from
       AND l.order_date <  c.valid_to
LEFT JOIN dim_product p
       ON  p.source = l.source AND p.product_id = l.product_id;`,
    },
    {
      id: 'loaded',
      label: 'fact_sales, batch 78',
      kind: 'table',
      headers: ['order_id', 'line', 'customer_key', 'product_key', 'net_gbp'],
      values: [
        ['1043', '1', '-1', '13', '9.00'],
        ['1044', '1', '208', '11', '34.00'],
        ['mkt-2207', '1', '230', '14', '27.00'],
      ],
    },
    {
      id: 'guards',
      label: 'Guards on the load',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'as-of', label: 'As of the order', sub: 'interval on business date', pattern: 'service', icon: 'calendar' },
        { id: 'no-drop', label: 'Left join', sub: 'misses stay, as -1', pattern: 'service', icon: 'link' },
        { id: 'count', label: 'Count misses', sub: 'rows in = rows out', pattern: 'network', icon: 'hash' },
      ],
    },
  ],
  edges: [
    { source: 'load-sql', target: 'loaded' },
    { source: 'loaded', target: 'guards' },
  ],
}
