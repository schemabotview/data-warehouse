import type { Scene } from '@graphlearning/flow'

// §6 — the shape of an EXPLAIN (ANALYZE) result in PostgreSQL 18, abridged and illustrative, with
// the estimate-versus-actual gap that matters most. Not a measured run.
export const explain: Scene = {
  id: 'explain',
  title: 'Estimates versus what actually happened',
  flow: 'TB',
  nodes: [
    {
      id: 'plan',
      kind: 'code',
      filename: 'explain_analyze.txt  (PostgreSQL 18, illustrative)',
      label: `EXPLAIN (ANALYZE) SELECT p.category, SUM(f.net_gbp) ...;
HashAggregate  (rows=4) (actual rows=2 loops=1)
  Group Key: p.category
  ->  Hash Join  (rows=1200) (actual rows=5 loops=1)
        Hash Cond: (f.product_key = p.product_key)
        ->  Seq Scan on fact_sales_2026_09 f
              (rows=1200) (actual rows=5 loops=1)
              Buffers: shared hit=1
        ->  Hash  (rows=40) (actual rows=5 loops=1)
              ->  Seq Scan on dim_product p
Planning Time: … ms
Execution Time: … ms`,
    },
    {
      id: 'reading',
      label: 'Reading it',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'actual-rows',
          label: 'estimate vs actual',
          sub: '240× too high: stale statistics?',
          kind: 'table',
          headers: ['node', 'estimated', 'actual'],
          values: [
            ['Seq Scan fact', '1200', '5'],
            ['Hash Join', '1200', '5'],
            ['HashAggregate', '4', '2'],
          ],
        },
        {
          id: 'cautions',
          kind: 'list',
          label: 'Before acting on it',
          icon: 'search',
          pattern: 'warn',
          framed: true,
          items: ['ANALYZE runs the statement', 'Use a read-only, disposable copy', 'State cache and concurrency', 'Refresh statistics, re-check'],
        },
      ],
    },
  ],
  edges: [{ source: 'plan', target: 'reading' }],
}
