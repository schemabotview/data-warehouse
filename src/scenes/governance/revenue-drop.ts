import type { Scene } from '@graphlearning/flow'

// §2 — September revenue changed overnight. The investigation walks lineage, source versions, load
// evidence and the metric definition before calling anything "bad data".
export const revenueDrop: Scene = {
  id: 'revenue-drop',
  title: 'Investigate before you blame the data',
  flow: 'LR',
  nodes: [
    {
      id: 'path',
      label: 'Investigation path',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'symptom', label: 'Sept: 144 → 140', sub: 'changed overnight', pattern: 'warn', icon: 'bell' },
        { id: 'lineage-step', label: 'Lineage', sub: 'which inputs feed it', pattern: 'service', icon: 'share' },
        { id: 'load-step', label: 'Load evidence', sub: 'runs, batches, checks', pattern: 'service', icon: 'layers' },
        { id: 'metric-version', label: 'Metric version', sub: 'did the definition move?', pattern: 'service', icon: 'gitbranch' },
      ],
      edges: [
        { source: 'symptom', target: 'lineage-step' },
        { source: 'lineage-step', target: 'load-step' },
        { source: 'load-step', target: 'metric-version' },
      ],
    },
    {
      id: 'findings',
      label: 'What the evidence said',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'hypotheses',
          label: 'hypotheses tested',
          kind: 'table',
          headers: ['hypothesis', 'evidence', 'verdict'],
          values: [
            ['load failed', 'run bf-01 green', 'no'],
            ['rows missing', 'counts agree', 'no'],
            ['metric changed', 'still v2', 'no'],
            ['source corrected', '1042: 49 → 45', 'yes'],
          ],
        },
        { id: 'explained', label: 'Explained', sub: 'restatement, v2 of Sept', pattern: 'network', icon: 'circlecheck' },
        { id: 'not-bad', label: 'Not "bad data"', sub: 'a real correction', pattern: 'user', icon: 'search' },
      ],
    },
  ],
  edges: [{ source: 'path', target: 'findings' }],
}
