import type { Scene } from '@graphlearning/flow'

// §5 — one versioned metric definition against three dashboards that each re-derived "revenue" in
// their own formula. Illustrative YAML; semantic-layer products each have their own syntax.
export const semanticContract: Scene = {
  id: 'semantic-contract',
  title: 'Define once, use everywhere',
  flow: 'LR',
  padding: 0.04,
  nodes: [
    {
      id: 'central',
      label: 'One definition',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'metric-yml',
          kind: 'code',
          filename: 'metrics/net_merchandise_revenue.yml',
          label: `# illustrative — not one product's syntax
metric: net_merchandise_revenue
version: 2          # v1 counted VAT
owner: finance-analytics
population: fact_sales, status booked
grain: order line
time_basis: order date, Europe/London
measure: SUM(net_gbp)
currency: GBP at order-date rate
returns: separate metric, by receipt
nulls: excluded; count reported`,
        },
        { id: 'version', label: 'Versioned', sub: 'v2 since 2026-07-01', pattern: 'service', icon: 'gitbranch' },
        {
          id: 'after',
          label: 'after: boards read named metrics',
          kind: 'table',
          headers: ['board', 'metric', 'Sept'],
          values: [
            ['Finance', 'net_merchandise_revenue v2', '144.00'],
            ['Exec', 'net_merchandise_revenue v2', '144.00'],
            ['Ops', 'shipped_revenue v1', '101.00'],
          ],
        },
      ],
    },
    {
      id: 'copies',
      label: 'Three dashboards, three formulas',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'dash-a',
          label: 'Finance board',
          kind: 'table',
          headers: ['formula', 'Sept'],
          values: [['SUM(net_gbp)', '144.00']],
        },
        {
          id: 'dash-b',
          label: 'Ops board',
          kind: 'table',
          headers: ['formula', 'Sept'],
          values: [['SUM(net_gbp) shipped', '101.00']],
        },
        {
          id: 'dash-c',
          label: 'Exec board',
          kind: 'table',
          headers: ['formula', 'Sept'],
          values: [['SUM(gross_gbp)', '172.80']],
        },
        { id: 'drift', label: 'Same name', sub: 'three numbers', pattern: 'warn', icon: 'copy' },
      ],
    },
  ],
  edges: [{ source: 'central', target: 'copies', label: 'instead of', dashed: true }],
}
