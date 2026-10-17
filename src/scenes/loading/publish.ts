import type { Scene } from '@graphlearning/flow'

// §6 — two ways to publish atomically, and the common mistake: several independent table commits
// that a reader can observe half-way through.
export const publish: Scene = {
  id: 'publish',
  title: 'Readers see all of a load, or none of it',
  flow: 'TB',
  nodes: [
    {
      id: 'ways',
      label: 'Two atomic publications',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'one-txn',
          kind: 'code',
          filename: 'publish_txn.sql',
          label: `BEGIN;   -- engine must support this
DELETE FROM fact_sales WHERE _batch = 78;
INSERT INTO fact_sales SELECT ... ;
UPDATE load_checkpoint SET batch = 78;
COMMIT;`,
        },
        {
          id: 'pointer',
          label: 'Versioned output + pointer',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'v41', label: 'sales_v41', sub: 'current, complete', pattern: 'storage', icon: 'database' },
            { id: 'v42', label: 'sales_v42', sub: 'built, checked', pattern: 'storage', icon: 'database' },
            { id: 'view', label: 'view: sales', sub: 'switch 41 → 42', pattern: 'external', icon: 'swap' },
          ],
          edges: [
            { source: 'v41', target: 'v42', label: 'next' },
            { source: 'v42', target: 'view', label: 'one switch' },
          ],
        },
      ],
    },
    {
      id: 'not-atomic',
      label: 'Not a consistent snapshot',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'na-dims', label: 'Dims committed', sub: 'at 02:10', pattern: 'service', icon: 'circlecheck' },
        { id: 'na-read', label: 'Report reads', sub: 'at 02:11', pattern: 'warn', icon: 'barchart' },
        { id: 'na-facts', label: 'Facts committed', sub: 'at 02:14', pattern: 'service', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [{ source: 'ways', target: 'not-atomic', label: 'versus three separate commits', dashed: true }],
}
