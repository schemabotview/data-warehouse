import type { Scene } from '@graphlearning/flow'

// §2 — a join that should be many-to-one, and the one duplicated dimension key that makes it
// many-to-many. The totals card is the symptom; the key test is the guard.
export const fanOut: Scene = {
  id: 'fan-out',
  title: 'A duplicated key multiplies rows',
  flow: 'TB',
  nodes: [
    {
      id: 'inputs',
      label: 'Join on product_key — expected many to one',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'fact-rows',
          label: 'fact_sales',
          sub: 'two toaster lines',
          kind: 'table',
          headers: ['order_id', 'product_key', 'net_gbp'],
          values: [
            ['1042', '12', '49.00'],
            ['1045', '12', '49.00'],
          ],
        },
        {
          id: 'dim-rows',
          label: 'dim_product',
          sub: 'key 12 loaded twice',
          kind: 'table',
          headers: ['product_key', 'name', 'category'],
          values: [
            ['12', 'Toaster', 'Kitchen'],
            ['12', 'Toaster', 'Small appliances'],
          ],
        },
      ],
      edges: [{ source: 'fact-rows', target: 'dim-rows' }],
    },
    {
      id: 'joined',
      label: 'joined result',
      sub: 'two lines became four',
      kind: 'table',
      headers: ['order_id', 'category', 'net_gbp'],
      values: [
        ['1042', 'Kitchen', '49.00'],
        ['1042', 'Small appliances', '49.00'],
        ['1045', 'Kitchen', '49.00'],
        ['1045', 'Small appliances', '49.00'],
      ],
    },
    {
      id: 'outcome',
      label: 'Symptom and guard',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'dup-key', label: 'Key not unique', sub: 'many-to-many by accident', pattern: 'warn', icon: 'copy' },
        { id: 'doubled', label: 'Revenue doubled', sub: '98.00 reported as 196.00', pattern: 'warn', icon: 'sigma' },
        { id: 'guard', label: 'Test the key', sub: 'unique, every load', pattern: 'network', icon: 'fingerprint' },
      ],
    },
  ],
  edges: [
    { source: 'inputs', target: 'joined', label: 'actual: 2 × 2' },
    { source: 'joined', target: 'outcome' },
  ],
}
