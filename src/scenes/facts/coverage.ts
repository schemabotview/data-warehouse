import type { Scene } from '@graphlearning/flow'

// §6 — a factless coverage table records what was eligible to happen. Subtracting what did happen
// answers the question a sales fact alone cannot: what was on promotion and did not sell.
export const coverage: Scene = {
  id: 'coverage',
  title: 'Recording what could have happened',
  flow: 'TB',
  nodes: [
    {
      id: 'inputs',
      label: 'Two facts, 28–30 Sept',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'promo',
          label: 'fact_promo_coverage',
          sub: 'factless: no measures at all',
          kind: 'table',
          headers: ['date', 'product', 'promo'],
          values: [
            ['09-28', 'Kettle', 'AUTUMN'],
            ['09-28', 'Toaster', 'AUTUMN'],
            ['09-30', 'Kettle', 'AUTUMN'],
            ['09-30', 'Toaster', 'AUTUMN'],
          ],
        },
        {
          id: 'sold',
          label: 'fact_sales',
          sub: 'what did happen',
          kind: 'table',
          headers: ['date', 'product', 'qty'],
          values: [['09-30', 'Kettle', '1']],
        },
      ],
    },
    {
      id: 'query',
      kind: 'code',
      filename: 'promoted_not_sold.sql',
      label: `SELECT date_key, product_key FROM fact_promo_coverage
EXCEPT
SELECT date_key, product_key FROM fact_sales;`,
    },
    {
      id: 'answer',
      label: 'on promotion, no sale',
      kind: 'table',
      headers: ['date', 'product'],
      values: [
        ['09-28', 'Kettle'],
        ['09-28', 'Toaster'],
        ['09-30', 'Toaster'],
      ],
    },
  ],
  edges: [
    { source: 'inputs', target: 'query' },
    { source: 'query', target: 'answer' },
  ],
}
