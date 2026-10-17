import type { Scene } from '@graphlearning/flow'

// §5 — two source customers that may be one person. A stated matching rule produces a master id and
// a crosswalk; the cards are the decisions the rule cannot make for you. All personal data synthetic.
export const identity: Scene = {
  id: 'identity',
  title: 'Is this the same customer?',
  flow: 'TB',
  nodes: [
    {
      id: 'candidates',
      label: 'Two sources, two ids',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'web-cust',
          label: 'web customers',
          kind: 'table',
          headers: ['customer_id', 'name', 'email'],
          values: [['C-201', 'Ana Price', 'Ana.Price@example.com']],
        },
        {
          id: 'mkt-cust',
          label: 'marketplace customers',
          kind: 'table',
          headers: ['customer_id', 'name', 'email'],
          values: [['M-95', 'A. Price', ' ana.price@example.com']],
        },
      ],
    },
    {
      id: 'match',
      kind: 'code',
      filename: 'match_rule.sql',
      label: `-- rule v3, owned by customer data team
lower(trim(web.email)) = lower(trim(mkt.email))
AND web.email_verified AND mkt.email_verified`,
    },
    {
      id: 'crosswalk',
      label: 'customer crosswalk',
      sub: 'how each source id maps to the master',
      kind: 'table',
      headers: ['master_id', 'source', 'source_id', 'rule', 'matched_on'],
      values: [
        ['MC-17', 'web', 'C-201', 'v3', '2026-10-05'],
        ['MC-17', 'mkt', 'M-95', 'v3', '2026-10-05'],
      ],
    },
    {
      id: 'decisions',
      label: 'Decisions the rule records',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'false-merge', label: 'False merge', sub: 'two people as one', pattern: 'warn', icon: 'merge' },
        { id: 'unmerge', label: 'Reversible', sub: 'unmerge keeps history', pattern: 'service', icon: 'history' },
        { id: 'reference', label: 'Reference data', sub: 'regions, currencies too', pattern: 'network', icon: 'globe' },
      ],
    },
  ],
  edges: [
    { source: 'candidates', target: 'match', label: 'canonicalise, then compare' },
    { source: 'match', target: 'crosswalk' },
    { source: 'crosswalk', target: 'decisions' },
  ],
}
