import type { Scene } from '@graphlearning/flow'

// §2 and §3 — one customer move, kept two ways. Type 1 overwrites; Type 2 closes the old version and
// opens a new one with its own surrogate key and a half-open validity interval.
export const scdVersions: Scene = {
  id: 'scd-versions',
  title: 'Overwrite or version',
  flow: 'TB',
  nodes: [
    { id: 'move', label: 'C-201 moves', sub: 'North → South on 20 Sept', pattern: 'user', icon: 'users' },
    {
      id: 'policies',
      label: 'Two policies for the same change',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'type1',
          label: 'Type 1 — overwrite',
          sub: 'history gone',
          kind: 'table',
          headers: ['customer_key', 'customer_id', 'region'],
          values: [['201', 'C-201', 'South']],
        },
        {
          id: 'type2',
          label: 'Type 2 — new version',
          sub: 'history kept',
          kind: 'table',
          headers: ['customer_key', 'customer_id', 'region', 'valid_from', 'valid_to', 'current'],
          values: [
            ['201', 'C-201', 'North', '2025-01-10', '2026-09-20', 'N'],
            ['208', 'C-201', 'South', '2026-09-20', '9999-12-31', 'Y'],
          ],
        },
      ],
    },
    {
      id: 'rules',
      label: 'What makes Type 2 work',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'interval', label: 'Half-open', sub: 'from ≤ t < to', pattern: 'service', icon: 'ruler' },
        { id: 'no-overlap', label: 'No overlaps', sub: 'one version per instant', pattern: 'service', icon: 'fingerprint' },
        { id: 'new-key', label: 'Key per version', sub: '201, then 208', pattern: 'service', icon: 'history' },
      ],
    },
    {
      id: 'fact-keys',
      label: 'fact_sales keeps the key of its own day',
      kind: 'table',
      headers: ['order', 'order_date', 'customer_key', 'reports as'],
      values: [
        ['1041', '2026-09-03', '201', 'North'],
        ['1044', '2026-09-30', '208', 'South'],
      ],
    },
  ],
  edges: [
    { source: 'move', target: 'policies' },
    { source: 'policies', target: 'rules' },
    { source: 'rules', target: 'fact-keys' },
  ],
}
