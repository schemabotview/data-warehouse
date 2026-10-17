import type { Scene } from '@graphlearning/flow'

// §4 — a bounded Data Vault sketch: hubs hold business keys, a link holds the relationship,
// satellites hold descriptive history. Column names follow common convention, not one vendor's spec.
export const vault: Scene = {
  id: 'vault',
  title: 'Keys, relationships, history — separated',
  flow: 'TB',
  nodes: [
    {
      id: 'keys',
      label: 'Hubs and a link',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'hub-customer',
          label: 'hub_customer',
          sub: 'business keys only',
          kind: 'table',
          columns: [
            { name: 'hk_customer', type: 'hash', key: 'PK' },
            { name: 'customer_bk', type: 'text' },
            { name: 'load_ts', type: 'timestamp' },
            { name: 'record_source', type: 'text' },
          ],
        },
        {
          id: 'link',
          label: 'link_customer_order',
          sub: 'the relationship',
          kind: 'table',
          columns: [
            { name: 'hk_link', type: 'hash', key: 'PK' },
            { name: 'hk_customer', type: 'hash', key: 'FK' },
            { name: 'hk_order', type: 'hash', key: 'FK' },
            { name: 'load_ts', type: 'timestamp' },
          ],
        },
        {
          id: 'hub-order',
          label: 'hub_order',
          sub: 'business keys only',
          kind: 'table',
          columns: [
            { name: 'hk_order', type: 'hash', key: 'PK' },
            { name: 'order_bk', type: 'text' },
            { name: 'load_ts', type: 'timestamp' },
            { name: 'record_source', type: 'text' },
          ],
        },
      ],
      edges: [
        { source: 'hub-customer', target: 'link' },
        { source: 'hub-order', target: 'link' },
      ],
    },
    {
      id: 'sats',
      label: 'Satellites — descriptive history',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'satellite',
          label: 'sat_customer',
          sub: 'a new row when attributes change',
          kind: 'table',
          headers: ['customer_bk', 'load_ts', 'region', 'source'],
          values: [
            ['C-201', '2025-01-10', 'North', 'web'],
            ['C-201', '2026-09-20', 'South', 'web'],
          ],
        },
        {
          id: 'sat-order',
          label: 'sat_order_status',
          sub: 'one per source',
          kind: 'table',
          headers: ['order_bk', 'load_ts', 'status'],
          values: [
            ['1042', '09-15', 'shipped'],
            ['1042', '10-02', 'delivered'],
          ],
        },
      ],
    },
    {
      id: 'limits',
      label: 'What it does not decide',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'hash-identity', label: 'Hash ≠ identity', sub: 'C-201 and M-95: one person?', pattern: 'warn', icon: 'hash' },
        { id: 'canonical', label: 'Canonical keys', sub: "' C-201' ≠ 'C-201'", pattern: 'warn', icon: 'regex' },
        { id: 'serve', label: 'Still needs marts', sub: 'for people to query', pattern: 'service', icon: 'star' },
      ],
    },
  ],
  edges: [
    { source: 'keys', target: 'sats', label: 'described by' },
    { source: 'sats', target: 'limits' },
  ],
}
