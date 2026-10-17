import type { Scene } from '@graphlearning/flow'

// §7 — a controlled share with a partner: aggregated, scoped, expiring, and audited. The list is the
// evidence an auditor will ask for.
export const share: Scene = {
  id: 'share',
  title: 'Share less, for a while, on the record',
  flow: 'TB',
  nodes: [
    {
      id: 'shared',
      label: 'What the partner receives',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'share-view',
          label: 'share: weekly_category_sales',
          sub: 'aggregated, no customer columns',
          kind: 'table',
          headers: ['week', 'category', 'net_gbp'],
          values: [
            ['2026-W36', 'Kitchen', '34.00'],
            ['2026-W38', 'Kitchen', '49.00'],
            ['2026-W40', 'Kitchen', '83.00'],
          ],
        },
        {
          id: 'terms',
          kind: 'list',
          label: 'Terms',
          icon: 'scroll',
          pattern: 'service',
          framed: true,
          items: ['Purpose: joint promotion', 'Expires 2026-12-31', 'No re-sharing'],
        },
      ],
    },
    {
      id: 'audit',
      label: 'access audit',
      sub: 'who read what, when',
      kind: 'table',
      headers: ['when', 'principal', 'object', 'rows'],
      values: [
        ['10-07 09:12', 'partner_svc', 'weekly_category_sales', '6'],
        ['10-07 09:13', 'partner_svc', 'weekly_category_sales', '6'],
        ['10-08 11:40', 'analyst_north', 'sales_by_region', '2'],
      ],
    },
    {
      id: 'evidence',
      label: 'Evidence an auditor asks for',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'ev-grants', label: 'Grants', sub: 'who has what, today', pattern: 'network', icon: 'key' },
        { id: 'ev-reviews', label: 'Reviews', sub: 'access re-certified', pattern: 'network', icon: 'usercheck' },
        { id: 'ev-logs', label: 'Logs kept', sub: 'and protected', pattern: 'network', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'shared', target: 'audit', label: 'every read logged' },
    { source: 'audit', target: 'evidence' },
  ],
}
