import type { Scene } from '@graphlearning/flow'

// §6 — one synthetic sensitive attribute followed into every copy the platform makes, with the
// retention and deletion route each copy needs. Policy shapes only; not legal guidance.
export const piiTrail: Scene = {
  id: 'pii-trail',
  title: 'Every copy of one email address',
  flow: 'TB',
  nodes: [
    {
      id: 'trail',
      label: "ana.price@example.com (synthetic) — where it lives",
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-stg', label: 'Staging', sub: 'raw, as sent', pattern: 'storage', icon: 'harddrive' },
        { id: 'p-dim', label: 'dim_customer', sub: 'kept for matching', pattern: 'storage', icon: 'users' },
        { id: 'p-mart', label: 'Marts', sub: 'masked for analysts', pattern: 'service', icon: 'ban' },
        { id: 'p-export', label: 'Exports', sub: 'CSV to an agency', pattern: 'external', icon: 'share' },
        { id: 'p-logs', label: 'Query logs', sub: 'literals in WHERE', pattern: 'warn', icon: 'file' },
        { id: 'backup', label: 'Backups', sub: 'until they expire', pattern: 'warn', icon: 'lock' },
      ],
    },
    {
      id: 'deletion',
      label: 'deletion request for C-201 / MC-17',
      sub: 'each copy needs its own route, and a check',
      kind: 'table',
      headers: ['copy', 'retention', 'deletion route', 'verified by'],
      values: [
        ['staging', '30 days', 'purge by key', 'count = 0'],
        ['dim_customer', 'while active', 'erase attributes', 'query as admin'],
        ['exports', 'per agreement', 'recipient confirms', 'signed notice'],
        ['query logs', '90 days', 'redact or expire', 'log search'],
        ['backups', '35 days', 'expire; no restore of it', 'restore test'],
      ],
    },
  ],
  edges: [{ source: 'trail', target: 'deletion', label: 'deletion must reach all of them' }],
}
