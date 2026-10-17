import type { Scene } from '@graphlearning/flow'

// §4 — two distributed join strategies, and the skew a single hot key causes. Rows per node are
// illustrative, to show the shape of the problem; no single-node plan demonstrates data movement.
export const skew: Scene = {
  id: 'skew',
  title: 'Moving data to meet the join',
  flow: 'TB',
  nodes: [
    {
      id: 'strategies',
      label: 'Two ways to join across nodes',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'broadcast',
          label: 'Broadcast',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'b-dim', label: 'Small dimension', sub: 'copied to every node', pattern: 'service', icon: 'share' },
            { id: 'b-fact', label: 'Fact stays put', sub: 'no shuffle of the big side', pattern: 'storage', icon: 'database' },
          ],
        },
        {
          id: 'repartition',
          label: 'Repartition',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'r-both', label: 'Both sides moved', sub: 'hashed by join key', pattern: 'network', icon: 'waves' },
            { id: 'hot-key', label: 'Hot key', sub: 'customer -1 on one node', pattern: 'warn', icon: 'zap' },
          ],
        },
      ],
    },
    {
      id: 'skew-plot',
      kind: 'plot',
      label: 'Rows per node after repartitioning (illustrative)',
      plot: {
        x: { min: 0, max: 5, step: 1, label: 'node' },
        y: { min: 0, max: 140, step: 20, label: 'rows (k)' },
        axes: 'corner',
        series: [
          { kind: 'area', points: [[0.7, 25], [1.3, 25]], color: 'network' },
          { kind: 'area', points: [[1.7, 24], [2.3, 24]], color: 'network' },
          { kind: 'area', points: [[2.7, 26], [3.3, 26]], color: 'network' },
          { kind: 'area', points: [[3.7, 120], [4.3, 120]], color: 'warn' },
          { kind: 'marker', at: [4, 120], color: 'warn', label: 'all of key -1' },
          { kind: 'line', points: [[0.5, 49], [4.5, 49]], dashed: true, label: 'even share' },
        ],
      },
    },
  ],
  edges: [{ source: 'strategies', target: 'skew-plot', label: 'the slowest node sets the pace' }],
}
