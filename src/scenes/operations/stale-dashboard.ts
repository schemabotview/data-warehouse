import type { Scene } from '@graphlearning/flow'

// §2 — a stale dashboard traced stage by stage, from the source to the consumer's cache, with the
// measurement at each stage that rules it in or out.
export const staleDashboard: Scene = {
  id: 'stale-dashboard',
  title: 'Where did the time go?',
  flow: 'LR',
  nodes: [
    {
      id: 'stages',
      label: 'Trace from source to screen',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 's-source', label: 'Source', sub: 'orders until 06:55', pattern: 'storage', icon: 'database' },
        { id: 'capture-lag', label: 'Capture', sub: 'stuck at 19:02', pattern: 'warn', icon: 'plug' },
        { id: 's-transform', label: 'Transform', sub: 'ran on what it had', pattern: 'service', icon: 'gears' },
        { id: 's-publish', label: 'Publish', sub: 'switched at 02:30', pattern: 'service', icon: 'swap' },
        { id: 's-cache', label: 'Dashboard', sub: 'cache 1 h', pattern: 'external', icon: 'barchart' },
      ],
      edges: [
        { source: 's-source', target: 'capture-lag' },
        { source: 'capture-lag', target: 's-transform' },
        { source: 's-transform', target: 's-publish' },
        { source: 's-publish', target: 's-cache' },
      ],
    },
    {
      id: 'diagnosis',
      label: 'Diagnosis',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'timeline',
          label: 'incident timeline, Monday',
          kind: 'table',
          headers: ['time', 'event'],
          values: [
            ['Sun 19:02', 'connector stops reading'],
            ['Mon 02:30', 'nightly run green, old data'],
            ['Mon 07:10', 'finance: "sales look flat"'],
            ['Mon 07:25', 'lag found at capture'],
            ['Mon 07:40', 'connector restarted'],
            ['Mon 08:50', 'replayed, republished'],
          ],
        },
        { id: 'fix-alert', label: 'Missing alert', sub: 'on capture lag', pattern: 'warn', icon: 'bell' },
      ],
    },
  ],
  edges: [{ source: 'stages', target: 'diagnosis' }],
}
