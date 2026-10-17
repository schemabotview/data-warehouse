import type { Scene } from '@graphlearning/flow'

// §1 and §5 — the sales star at its declared grain, drawn vertically: the dimensions that describe
// the line above the fact, the two roles of the one date dimension below it.
export const salesStar: Scene = {
  id: 'sales-star',
  title: 'One row per order line',
  flow: 'TB',
  nodes: [
    {
      id: 'describe',
      label: 'Who and what',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'grain', label: 'Grain', sub: 'one row per order line', pattern: 'warn', icon: 'ruler' },
        {
          id: 'dim-customer',
          label: 'dim_customer',
          kind: 'table',
          columns: [
            { name: 'customer_key', type: 'int', key: 'PK' },
            { name: 'customer_id', type: 'text' },
            { name: 'region', type: 'text' },
            { name: 'segment', type: 'text' },
          ],
        },
        {
          id: 'dim-product',
          label: 'dim_product',
          kind: 'table',
          columns: [
            { name: 'product_key', type: 'int', key: 'PK' },
            { name: 'product_id', type: 'text' },
            { name: 'name', type: 'text' },
            { name: 'category', type: 'text' },
          ],
        },
      ],
    },
    {
      id: 'fact',
      label: 'fact_sales',
      sub: 'one row per order line',
      kind: 'table',
      columns: [
        { name: 'order_date_key', type: 'int', key: 'FK' },
        { name: 'ship_date_key', type: 'int', key: 'FK' },
        { name: 'customer_key', type: 'int', key: 'FK' },
        { name: 'product_key', type: 'int', key: 'FK' },
        { name: 'order_id', type: 'text' },
        { name: 'line_no', type: 'int' },
        { name: 'qty', type: 'int' },
        { name: 'net_gbp', type: 'numeric' },
      ],
    },
    {
      id: 'when',
      label: 'When — one dim_date, two roles',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'order-date',
          label: 'order_date',
          sub: 'role of dim_date',
          kind: 'table',
          columns: [
            { name: 'date_key', type: 'int', key: 'PK' },
            { name: 'date', type: 'date' },
            { name: 'month', type: 'text' },
            { name: 'fiscal_period', type: 'text' },
          ],
        },
        {
          id: 'ship-date',
          label: 'ship_date',
          sub: 'same table, other role',
          kind: 'table',
          columns: [
            { name: 'date_key', type: 'int', key: 'PK' },
            { name: 'date', type: 'date' },
            { name: 'month', type: 'text' },
            { name: 'fiscal_period', type: 'text' },
          ],
        },
      ],
    },
  ],
  edges: [
    { source: 'describe', target: 'fact', label: 'many : 1 each' },
    { source: 'fact', target: 'when', label: 'two date keys' },
  ],
}
