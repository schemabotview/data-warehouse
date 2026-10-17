import type { Scene } from '@graphlearning/flow'

// §2 — a raw extract next to the profile that reads it. The warn cards are what profiling found;
// none of them is visible from the column names.
export const profile: Scene = {
  id: 'profile',
  title: 'Profile before you model',
  flow: 'TB',
  nodes: [
    {
      id: 'raw-orders',
      label: 'orders extract (raw)',
      sub: 'web shop, 2026-09',
      kind: 'table',
      headers: ['order_id', 'customer_id', 'status', 'currency', 'created_at'],
      values: [
        ['1041', 'C-201', 'delivered', 'GBP', '2026-09-03 10:12'],
        ['1042', 'C-202', 'shipped', 'GBP', '2026-09-14 18:40'],
        ['1042', 'C-202', 'SHIPPED', 'GBP', '2026-09-14 18:40'],
        ['1043', '', 'packed', 'GBP', '2026-09-21 09:05'],
        ['1044', 'C-201', 'placed', 'EUR', '2026-09-30 18:40'],
        ['1046', 'C-207', 'cancelled', 'GBP', '2026-09-30 23:59'],
      ],
    },
    {
      id: 'findings',
      label: 'What the profile found',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'dupes', label: 'Duplicate key', sub: '1042 twice, case differs', pattern: 'warn', icon: 'copy' },
        { id: 'nulls', label: 'Missing customer', sub: '1043 has none', pattern: 'warn', icon: 'search' },
        { id: 'gap', label: 'Gap in keys', sub: '1045 absent here', pattern: 'warn', icon: 'hash' },
        { id: 'currency', label: 'Mixed currency', sub: '1044 is EUR', pattern: 'network', icon: 'receipt' },
        { id: 'statuses', label: 'Status values', sub: '6 spellings of 5', pattern: 'network', icon: 'regex' },
        { id: 'coverage', label: 'Coverage', sub: 'web shop only', pattern: 'network', icon: 'calendar' },
      ],
    },
    { id: 'provenance', label: 'Provenance kept', sub: 'source, extract time, query', pattern: 'storage', icon: 'fingerprint' },
  ],
  edges: [
    { source: 'raw-orders', target: 'findings', label: 'profiled' },
    { source: 'findings', target: 'provenance', label: 'recorded with' },
  ],
}
