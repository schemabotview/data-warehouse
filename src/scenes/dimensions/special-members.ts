import type { Scene } from '@graphlearning/flow'

// §6 — the dimension patterns that are not one entity per row: the order number left on the fact,
// a junk dimension of small flags, and the reserved unknown / not-applicable members.
export const specialMembers: Scene = {
  id: 'special-members',
  title: 'Rows that are not ordinary members',
  flow: 'TB',
  nodes: [
    {
      id: 'fact-special',
      label: 'fact_sales',
      sub: 'order_id is a degenerate dimension — no table of its own',
      kind: 'table',
      headers: ['order_id', 'line_no', 'customer_key', 'flags_key', 'net_gbp'],
      values: [
        ['1041', '1', '201', '3', '34.00'],
        ['1043', '1', '-1', '1', '9.00'],
        ['ADJ-7', '1', '-2', '1', '0.00'],
      ],
    },
    {
      id: 'dims',
      label: 'What the keys point at',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'junk',
          label: 'dim_order_flags',
          sub: 'junk dimension: every flag combination',
          kind: 'table',
          headers: ['flags_key', 'gift_wrap', 'promo', 'channel'],
          values: [
            ['1', 'N', 'N', 'web'],
            ['2', 'Y', 'N', 'web'],
            ['3', 'N', 'Y', 'web'],
            ['4', 'N', 'N', 'app'],
          ],
        },
        {
          id: 'unknown',
          label: 'dim_customer',
          sub: 'two reserved members',
          kind: 'table',
          headers: ['customer_key', 'customer_id', 'region'],
          values: [
            ['-1', 'Unknown', 'Unknown'],
            ['-2', 'Not applicable', 'n/a'],
            ['201', 'C-201', 'North'],
          ],
        },
      ],
    },
    {
      id: 'policies',
      label: 'Two policies, not one',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'pol-unknown', label: 'Unknown (-1)', sub: 'should exist, missing', pattern: 'warn', icon: 'search' },
        { id: 'pol-na', label: 'Not applicable', sub: 'stock adjustment: none', pattern: 'service', icon: 'circleslash' },
      ],
    },
  ],
  edges: [
    { source: 'fact-special', target: 'dims', label: 'flags_key, customer_key' },
    { source: 'dims', target: 'policies' },
  ],
}
