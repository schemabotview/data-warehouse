import type { Scene } from '@graphlearning/flow'

// §7 — rebuilding one bounded partition after a late correction, with the run record that makes the
// rebuild reproducible, and the ownership rule that keeps it from overwriting live work.
export const backfill: Scene = {
  id: 'backfill',
  title: 'Rebuild a bounded slice, on the record',
  flow: 'TB',
  nodes: [
    {
      id: 'partitions',
      label: 'fact_sales by month',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p-aug', label: '2026-08', sub: 'untouched', pattern: 'storage', icon: 'database' },
        { id: 'partition', label: '2026-09', sub: 'rebuilt: 1042 fix', pattern: 'warn', icon: 'repeat' },
        { id: 'p-oct', label: '2026-10', sub: 'live loads only', pattern: 'network', icon: 'waves' },
      ],
    },
    {
      id: 'run-record',
      label: 'backfill run record',
      sub: 'enough to reproduce the result',
      kind: 'table',
      headers: ['field', 'value'],
      values: [
        ['run', 'bf-2026-10-06-01'],
        ['interval', '2026-09-01 ≤ date < 2026-10-01'],
        ['inputs', 'staging batches 61–77'],
        ['code', 'models at commit 4e1c9a2'],
        ['reconciled', '140.00 = source, after fix'],
        ['published', 'v2 of 2026-09, 2026-10-06 14:05'],
      ],
    },
    {
      id: 'rules',
      label: 'Keep backfill and live work apart',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'lock', label: 'Partition lock', sub: 'one writer at a time', pattern: 'service', icon: 'lock' },
        { id: 'owner', label: 'Named owner', sub: 'for the backfill', pattern: 'user', icon: 'usercheck' },
        { id: 'compare', label: 'Diff first', sub: 'old vs new, then publish', pattern: 'network', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'partitions', target: 'run-record' },
    { source: 'run-record', target: 'rules' },
  ],
}
