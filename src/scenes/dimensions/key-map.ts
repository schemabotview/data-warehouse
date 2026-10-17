import type { Scene } from '@graphlearning/flow'

// §3 — two sources that both use K-01 for different products, mapped to warehouse surrogate keys.
// The natural key is kept, qualified by source; it is just not what facts join on.
export const keyMap: Scene = {
  id: 'key-map',
  title: 'Natural keys in, surrogate keys out',
  flow: 'TB',
  nodes: [
    {
      id: 'natural',
      label: 'Natural keys — unique only in their source',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'web-products',
          label: 'web shop products',
          kind: 'table',
          headers: ['product_id', 'name'],
          values: [
            ['K-01', 'Kettle'],
            ['T-02', 'Toaster'],
            ['M-04', 'Mug ×4'],
          ],
        },
        {
          id: 'mkt-products',
          label: 'marketplace products',
          kind: 'table',
          headers: ['product_id', 'name'],
          values: [
            ['K-01', 'Kitchen scale'],
            ['T-02', 'Kettle'],
          ],
        },
      ],
    },
    {
      id: 'sk',
      label: 'dim_product',
      sub: 'product_key is issued by the warehouse',
      kind: 'table',
      headers: ['product_key', 'source', 'product_id', 'name'],
      values: [
        ['11', 'web', 'K-01', 'Kettle'],
        ['12', 'web', 'T-02', 'Toaster'],
        ['13', 'web', 'M-04', 'Mug ×4'],
        ['14', 'mkt', 'K-01', 'Kitchen scale'],
        ['15', 'mkt', 'T-02', 'Kettle'],
      ],
    },
    {
      id: 'why',
      label: 'Why a surrogate',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'why-collide', label: 'No collisions', sub: 'K-01 is two products', pattern: 'service', icon: 'fingerprint' },
        { id: 'why-history', label: 'Room for history', sub: 'one product, many versions', pattern: 'service', icon: 'history' },
        { id: 'why-rekey', label: 'Source can change', sub: 're-keys stay contained', pattern: 'service', icon: 'swap' },
      ],
    },
  ],
  edges: [
    { source: 'natural', target: 'sk', label: 'source + id → key' },
    { source: 'sk', target: 'why' },
  ],
}
