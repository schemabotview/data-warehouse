import type { Scene } from '@graphlearning/flow'

// §4 — ownership recorded per asset, the consumers lineage adds to it, and the change path a contract
// imposes before a breaking change reaches them.
export const owners: Scene = {
  id: 'owners',
  title: 'Every asset has someone who answers',
  flow: 'TB',
  nodes: [
    {
      id: 'catalogue',
      label: 'catalogue — ownership',
      kind: 'table',
      headers: ['asset', 'owner', 'steward', 'contract', 'notice'],
      values: [
        ['web_shop.orders', 'ecommerce team', 'platform lead', 'yes', '14 days'],
        ['dim_customer', 'customer data', 'data analyst', 'yes', '30 days'],
        ['fact_sales', 'data engineering', 'load engineer', 'yes', '30 days'],
        ['net_merchandise_revenue', 'finance analytics', 'finance analyst', 'yes', 'one release'],
      ],
    },
    {
      id: 'impact',
      label: 'Who is affected, and how they hear',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'consumers',
          label: 'consumers of fact_sales, from lineage',
          kind: 'table',
          headers: ['consumer', 'uses', 'contact'],
          values: [
            ['finance dashboard', 'revenue tile', 'finance analytics'],
            ['ops board', 'shipped revenue', 'operations'],
            ['partner share', 'weekly category sales', 'partnerships'],
          ],
        },
        {
          id: 'change',
          label: 'A breaking change, by contract',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'propose', label: 'Proposed', sub: 'drop region column', pattern: 'user', icon: 'pencil' },
            { id: 'steward', label: 'Steward reviews', sub: 'impact from lineage', pattern: 'service', icon: 'usercheck' },
            { id: 'notify', label: 'Consumers told', sub: '30 days ahead', pattern: 'network', icon: 'bell' },
            { id: 'release', label: 'New version', sub: 'old kept in parallel', pattern: 'storage', icon: 'gitbranch' },
          ],
          edges: [
            { source: 'propose', target: 'steward' },
            { source: 'steward', target: 'notify' },
            { source: 'notify', target: 'release' },
          ],
        },
      ],
      edges: [{ source: 'consumers', target: 'change', label: 'must hear' }],
    },
  ],
  edges: [{ source: 'catalogue', target: 'impact', label: 'lineage adds consumers' }],
}
