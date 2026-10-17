import type { Scene } from '@graphlearning/flow'

// §1 — where the transformation runs, and the staging boundary both routes share: data kept as the
// source sent it, plus the load metadata that makes it traceable.
export const etlVsElt: Scene = {
  id: 'etl-vs-elt',
  title: 'Where does the transform run?',
  flow: 'TB',
  nodes: [
    {
      id: 'routes',
      label: 'Two routes',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'etl',
          label: 'ETL',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'etl-src', label: 'Sources', sub: 'shop, marketplace', pattern: 'storage', icon: 'database' },
            { id: 'etl-engine', label: 'Transform engine', sub: 'outside the warehouse', pattern: 'service', icon: 'gears' },
            { id: 'etl-dw', label: 'Warehouse', sub: 'receives shaped data', pattern: 'storage', icon: 'warehouse' },
          ],
          edges: [
            { source: 'etl-src', target: 'etl-engine', label: 'extract' },
            { source: 'etl-engine', target: 'etl-dw', label: 'load' },
          ],
        },
        {
          id: 'elt',
          label: 'ELT',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'elt-src', label: 'Sources', sub: 'shop, marketplace', pattern: 'storage', icon: 'database' },
            { id: 'staging', label: 'Staging', sub: 'raw, inside the warehouse', pattern: 'service', icon: 'harddrive' },
            { id: 'elt-sql', label: 'SQL models', sub: 'transform in place', pattern: 'service', icon: 'code' },
          ],
          edges: [
            { source: 'elt-src', target: 'staging', label: 'extract, load' },
            { source: 'staging', target: 'elt-sql', label: 'transform' },
          ],
        },
      ],
    },
    {
      id: 'stg-rows',
      label: 'stg_web_orders',
      sub: 'source columns untouched, load metadata added',
      kind: 'table',
      headers: ['order_id', 'status', 'currency', '_source', '_batch_id', '_loaded_at'],
      values: [
        ['1042', 'shipped', 'GBP', 'web', '77', '10-02 02:00'],
        ['1042', 'SHIPPED', 'GBP', 'web', '77', '10-02 02:00'],
        ['1044', 'placed', 'EUR', 'web', '77', '10-02 02:00'],
      ],
    },
  ],
  edges: [{ source: 'routes', target: 'stg-rows', label: 'both keep a staging boundary' }],
}
