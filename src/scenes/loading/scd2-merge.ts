import type { Scene } from '@graphlearning/flow'

// §4 — maintaining Type 2 history incrementally: close the current version, insert the new one,
// in one transaction. The before and after tables bracket the SQL.
export const scd2Merge: Scene = {
  id: 'scd2-merge',
  title: 'Close one version, open the next',
  flow: 'TB',
  nodes: [
    {
      id: 'inputs',
      label: 'Before the load',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'before',
          label: 'dim_customer (current)',
          kind: 'table',
          headers: ['key', 'customer_id', 'region', 'valid_to', 'current'],
          values: [['201', 'C-201', 'North', '9999-12-31', 'Y']],
        },
        {
          id: 'change',
          label: 'stg_customers',
          sub: 'effective 2026-09-20',
          kind: 'table',
          headers: ['customer_id', 'region', 'effective'],
          values: [['C-201', 'South', '2026-09-20']],
        },
      ],
    },
    {
      id: 'close-row',
      kind: 'code',
      filename: 'scd2_customer.sql',
      label: `BEGIN;
UPDATE dim_customer
SET    valid_to = DATE '2026-09-20', is_current = 'N'
WHERE  customer_id = 'C-201' AND is_current = 'Y'
  AND  region <> 'South';            -- only a real change closes
INSERT INTO dim_customer (customer_key, customer_id, region,
                          valid_from, valid_to, is_current)
SELECT nextval('customer_key_seq'), 'C-201', 'South',
       DATE '2026-09-20', DATE '9999-12-31', 'Y'
WHERE  NOT EXISTS (SELECT 1 FROM dim_customer
                   WHERE customer_id = 'C-201' AND is_current = 'Y');
COMMIT;`,
    },
    {
      id: 'after',
      label: 'dim_customer (after)',
      kind: 'table',
      headers: ['key', 'customer_id', 'region', 'valid_from', 'valid_to', 'current'],
      values: [
        ['201', 'C-201', 'North', '2025-01-10', '2026-09-20', 'N'],
        ['208', 'C-201', 'South', '2026-09-20', '9999-12-31', 'Y'],
      ],
    },
  ],
  edges: [
    { source: 'inputs', target: 'close-row' },
    { source: 'close-row', target: 'after' },
  ],
}
