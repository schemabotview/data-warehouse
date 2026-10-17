import type { Scene } from '@graphlearning/flow'

// §5 — return rate computed two ways over one matched population (September's booked lines and the
// returns of those same lines), plus the distinct-count version of the same trap.
export const returnRate: Scene = {
  id: 'return-rate',
  title: 'Ratio of sums, not average of ratios',
  flow: 'TB',
  nodes: [
    {
      id: 'by-product',
      label: 'September booked lines and their returns',
      sub: 'one matched population',
      kind: 'table',
      headers: ['product', 'sold_gbp', 'returned_gbp', 'rate'],
      values: [
        ['Kettle', '68.00', '0.00', '0.0%'],
        ['Toaster', '49.00', '0.00', '0.0%'],
        ['Mug ×4', '27.00', '18.00', '66.7%'],
      ],
    },
    {
      id: 'two-ways',
      label: 'Two queries',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'ratio-of-sums',
          kind: 'code',
          filename: 'right.sql',
          label: `SELECT SUM(returned_gbp)
     / SUM(sold_gbp) AS rate
FROM   by_product;   -- 12.5%`,
        },
        {
          id: 'avg-of-ratios',
          kind: 'code',
          filename: 'wrong.sql',
          label: `SELECT AVG(returned_gbp
         / sold_gbp) AS rate
FROM   by_product;   -- 22.2%`,
        },
      ],
    },
    {
      id: 'lessons',
      label: 'The same trap, elsewhere',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'weights', label: 'Weighting', sub: 'a small product counts like a big one', pattern: 'warn', icon: 'scale' },
        { id: 'distinct', label: 'Distinct counts', sub: 'daily sum 3, month 2', pattern: 'warn', icon: 'users' },
        { id: 'store-parts', label: 'Store the parts', sub: 'numerator, denominator', pattern: 'service', icon: 'sigma' },
      ],
    },
  ],
  edges: [
    { source: 'by-product', target: 'two-ways' },
    { source: 'two-ways', target: 'lessons' },
  ],
}
