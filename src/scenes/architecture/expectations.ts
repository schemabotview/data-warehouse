import type { Scene } from '@graphlearning/flow'

// §5 — the useful report against the misleading replica, over the expectations both should state.
export const expectations: Scene = {
  id: 'expectations',
  title: 'State the service, not just the data',
  flow: 'TB',
  framed: true,
  nodes: [
    {
      id: 'contrast',
      label: 'Two reports, same orders',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'daily-report',
          kind: 'list',
          label: 'Daily sales report',
          sub: 'loaded nightly',
          icon: 'barchart',
          pattern: 'service',
          items: ['Complete up to 23:59 yesterday', 'Every past month kept', 'Totals reconciled to source', 'Answers last March as it was'],
        },
        {
          id: 'replica',
          kind: 'list',
          label: 'Live replica',
          sub: 'always current',
          icon: 'copy',
          pattern: 'warn',
          items: ['Seconds behind the shop', 'Updates overwrite the past', 'No reconciliation step', "Last March's regions are lost"],
        },
      ],
    },
    {
      id: 'expect',
      kind: 'list',
      label: 'Service expectations',
      sub: 'one business, one technical owner',
      icon: 'gauge',
      pattern: 'network',
      items: [
        'Freshness — complete up to when, ready by when',
        'Completeness — which sources and periods',
        'Correctness — which checks ran',
        'Access — who sees which rows and columns',
        'Cost — what that freshness spends',
      ],
    },
  ],
  edges: [{ source: 'contrast', target: 'expect', label: 'both should state' }],
}
