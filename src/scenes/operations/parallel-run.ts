import type { Scene } from '@graphlearning/flow'

// §5 — a platform migration run in parallel: same inputs into old and new, results diffed per metric
// and period, cutover only on agreed criteria.
export const parallelRun: Scene = {
  id: 'parallel-run',
  title: 'Run both, compare, then cut over',
  flow: 'TB',
  nodes: [
    {
      id: 'platforms',
      label: 'Same inputs, two platforms',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'inputs', label: 'Staged batches', sub: '61–80, identical', pattern: 'storage', icon: 'layers' },
        { id: 'old', label: 'Current platform', sub: 'serves users', pattern: 'service', icon: 'warehouse' },
        { id: 'new', label: 'New platform', sub: 'shadow only', pattern: 'network', icon: 'cloud' },
      ],
      edges: [
        { source: 'inputs', target: 'old' },
        { source: 'inputs', target: 'new' },
      ],
    },
    {
      id: 'diff',
      label: 'reconciliation, September',
      sub: 'every difference explained or fixed',
      kind: 'table',
      headers: ['check', 'old', 'new', 'diff', 'status'],
      values: [
        ['fact rows', '5', '5', '0', 'ok'],
        ['net revenue', '140.00', '140.00', '0.00', 'ok'],
        ['Kitchen', '113.00', '113.00', '0.00', 'ok'],
        ['avg refund', '9.00', '4.50', '−4.50', 'NULL handling'],
      ],
    },
    {
      id: 'cutover',
      label: 'Cutover criteria',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-cycles', label: 'Clean cycles', sub: 'e.g. 2 month-ends', pattern: 'service', icon: 'calendar' },
        { id: 'c-fix', label: 'AVG fixed', sub: 'NULLs, not zeros', pattern: 'warn', icon: 'ban' },
        { id: 'c-back', label: 'Way back', sub: 'old kept read-only', pattern: 'service', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'platforms', target: 'diff', label: 'diff per metric, per period' },
    { source: 'diff', target: 'cutover' },
  ],
}
