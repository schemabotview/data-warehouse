import type { Scene } from '@graphlearning/flow'

// §2 — deduplication with an explicit event-order rule, against "latest row" by load time, which
// ties and so picks arbitrarily.
export const dedup: Scene = {
  id: 'dedup',
  title: 'Pick the latest by a rule, not by luck',
  flow: 'TB',
  nodes: [
    {
      id: 'staged-rows',
      label: 'stg_web_orders',
      sub: 'two keys, four rows',
      kind: 'table',
      headers: ['order_id', 'status', 'lsn', 'seq', '_loaded_at'],
      values: [
        ['1043', 'packed', '0/19E', '1', '10-03 02:00'],
        ['1043', 'shipped', '0/1A5', '1', '10-03 02:00'],
        ['1043', 'shipped', '0/1A5', '1', '10-03 02:00'],
        ['1044', 'shipped', '0/1A4', '1', '10-03 02:00'],
      ],
    },
    {
      id: 'queries',
      label: 'Two "latest row" queries',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'tiebreak',
          kind: 'code',
          filename: 'dedup.sql',
          label: `ROW_NUMBER() OVER (
  PARTITION BY order_id
  ORDER BY lsn DESC, seq DESC
) = 1   -- total order: deterministic`,
        },
        {
          id: 'arbitrary',
          kind: 'code',
          filename: 'dedup_wrong.sql',
          label: `ROW_NUMBER() OVER (
  PARTITION BY order_id
  ORDER BY _loaded_at DESC
) = 1   -- ties: any row may win`,
        },
      ],
    },
    {
      id: 'results',
      label: 'What each returns',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'deduped',
          label: 'dedup.sql',
          sub: 'same output every run',
          kind: 'table',
          headers: ['order_id', 'status', 'lsn'],
          values: [
            ['1043', 'shipped', '0/1A5'],
            ['1044', 'shipped', '0/1A4'],
          ],
        },
        {
          id: 'two-runs',
          label: 'dedup_wrong.sql, two runs',
          sub: 'a tie decided differently',
          kind: 'table',
          headers: ['run', 'order_id', 'status'],
          values: [
            ['1', '1043', 'shipped'],
            ['2', '1043', 'packed'],
          ],
        },
      ],
    },
    {
      id: 'lessons',
      label: 'Making it deterministic',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'total-order', label: 'Total order', sub: 'no ties possible', pattern: 'service', icon: 'sortarrows' },
        { id: 'run-twice', label: 'Run it twice', sub: 'compare row for row', pattern: 'network', icon: 'repeat' },
        { id: 'no-now', label: 'No hidden inputs', sub: 'now(), random, limits', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'staged-rows', target: 'queries' },
    { source: 'queries', target: 'results' },
    { source: 'results', target: 'lessons' },
  ],
}
