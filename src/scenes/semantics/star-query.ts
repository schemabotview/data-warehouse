import type { Scene } from '@graphlearning/flow'

// §1 — a star query traced to its expected totals, then the same query with one extra join that fans
// the fact out. The expected total is what makes the fan-out visible.
export const starQuery: Scene = {
  id: 'star-query',
  title: 'Filter, join, group — then check the total',
  flow: 'TB',
  nodes: [
    {
      id: 'group',
      kind: 'code',
      filename: 'sales_by_category.sql',
      label: `SELECT p.category, SUM(f.net_gbp) AS net_gbp
FROM   fact_sales f
JOIN   dim_date    d ON d.date_key    = f.order_date_key
JOIN   dim_product p ON p.product_key = f.product_key
WHERE  d.month = '2026-09'           -- filter on a dimension
GROUP  BY p.category;                -- group at the asked grain`,
    },
    {
      id: 'outputs',
      label: 'Expected, then fanned out',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'expected',
          label: 'result',
          sub: 'adds to 144.00 — the booked total',
          kind: 'table',
          headers: ['category', 'net_gbp'],
          values: [
            ['Kitchen', '117.00'],
            ['Tableware', '27.00'],
            ['total', '144.00'],
          ],
        },
        {
          id: 'fanned',
          label: '+ JOIN fact_promo_coverage',
          sub: 'kettles, toasters doubled; mugs dropped',
          kind: 'table',
          headers: ['category', 'net_gbp'],
          values: [
            ['Kitchen', '234.00'],
            ['Tableware', '—'],
            ['total', '234.00'],
          ],
        },
      ],
    },
    {
      id: 'habits',
      label: 'Habits that catch it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'h-total', label: 'Know the total', sub: 'before you group', pattern: 'service', icon: 'sigma' },
        { id: 'h-card', label: 'Check cardinality', sub: 'of every join added', pattern: 'service', icon: 'link' },
        { id: 'h-fan', label: 'Fan-out + loss', sub: 'one join, two errors', pattern: 'warn', icon: 'copy' },
      ],
    },
  ],
  edges: [
    { source: 'group', target: 'outputs' },
    { source: 'outputs', target: 'habits' },
  ],
}
