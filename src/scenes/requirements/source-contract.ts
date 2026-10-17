import type { Scene } from '@graphlearning/flow'

// §6 — an illustrative source contract beside the acceptance example that proves the definition, and
// the two things a contract needs before it means anything: someone watching it, and an owner.
export const sourceContract: Scene = {
  id: 'source-contract',
  title: 'A contract is observed and owned',
  flow: 'TB',
  nodes: [
    {
      id: 'spec',
      label: 'Contract and evidence',
      pattern: 'group',
      flow: 'LR',
      children: [
    {
      id: 'contract',
      kind: 'code',
      filename: 'contracts/web_orders.yml',
      label: `# illustrative — not a standard format
source: web_shop.orders
owner: ecommerce-platform team
grain: one row per order_id
keys: [order_id]          # unique per source
fields:
  status: [placed, paid, shipped,
           delivered, cancelled]
  currency: ISO 4217
  created_at: UTC timestamp
expectations:
  lateness: rows land within 2 h
  schema_change: 14 days notice
  retention: 7 years
  permitted_use: aggregate reporting`,
    },
    {
      id: 'evidence',
      label: 'What makes it real',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'acceptance',
          label: 'acceptance example',
          sub: 'agreed before any table exists',
          kind: 'table',
          headers: ['given', 'expect'],
          values: [
            ['Sept lines, booked', '144.00 GBP'],
            ['1042 sent twice', 'counted once'],
            ['1044 in EUR', 'converted on 2026-09-30'],
          ],
        },
        { id: 'monitor', label: 'Observed', sub: 'each load checks it', pattern: 'network', icon: 'gauge' },
        { id: 'owner', label: 'Owned', sub: 'a named team answers', pattern: 'user', icon: 'usercheck' },
      ],
    },
      ],
      edges: [{ source: 'contract', target: 'evidence', label: 'only enforceable if' }],
    },
    {
      id: 'load-checks',
      label: 'contract checks, load of 2026-10-01',
      sub: 'what observation looks like',
      kind: 'table',
      headers: ['check', 'expected', 'observed', 'result'],
      values: [
        ['lateness', '≤ 2 h', '40 min', 'pass'],
        ['order_id unique', '0 duplicates', '1 (1042)', 'FAIL'],
        ['status values', '5 allowed', "'SHIPPED' seen", 'FAIL'],
        ['schema', 'no change', "new 'gift_note'", 'notify owner'],
      ],
    },
  ],
  edges: [{ source: 'spec', target: 'load-checks', label: 'observed on every load' }],
}
