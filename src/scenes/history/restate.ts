import type { Scene } from '@graphlearning/flow'

// §6 — a source correction to an already-reported month, handled two ways, with the deletion policy
// that has to travel into every derived copy.
export const restate: Scene = {
  id: 'restate',
  title: 'Correct the past, or adjust the present',
  flow: 'TB',
  nodes: [
    { id: 'correction', label: '1042 corrected', sub: '49.00 → 45.00, on 6 Oct', pattern: 'user', icon: 'pencil' },
    {
      id: 'audit',
      label: 'change log',
      sub: 'kept whichever policy is chosen',
      kind: 'table',
      headers: ['changed_at', 'order', 'field', 'old', 'new', 'reason'],
      values: [['2026-10-06', '1042', 'net_gbp', '49.00', '45.00', 'price error, ticket 311']],
    },
    {
      id: 'branches',
      label: 'Two policies',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'restated',
          label: 'restate September',
          sub: 'the past changes, with a revision note',
          kind: 'table',
          headers: ['month', 'version', 'booked_gbp'],
          values: [
            ['2026-09', 'v1 · 1 Oct', '144.00'],
            ['2026-09', 'v2 · 6 Oct', '140.00'],
          ],
        },
        {
          id: 'adjusted',
          label: 'adjust in October',
          sub: 'September stays as reported',
          kind: 'table',
          headers: ['month', 'row', 'booked_gbp'],
          values: [
            ['2026-09', 'original', '144.00'],
            ['2026-10', 'adjustment 1042', '-4.00'],
          ],
        },
      ],
    },
    {
      id: 'policies',
      label: 'Decided in advance, per metric',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'reclassify', label: 'Reclassify', sub: 'at query time, no rewrite', pattern: 'service', icon: 'swap' },
        { id: 'delete-policy', label: 'Deletions', sub: 'remove, flag or retain', pattern: 'warn', icon: 'trash' },
        { id: 'propagate', label: 'Propagate', sub: 'marts, extracts, caches', pattern: 'network', icon: 'share' },
      ],
    },
  ],
  edges: [
    { source: 'correction', target: 'audit' },
    { source: 'audit', target: 'branches' },
    { source: 'branches', target: 'policies' },
  ],
}
