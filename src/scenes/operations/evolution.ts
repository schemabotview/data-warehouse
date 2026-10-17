import type { Scene } from '@graphlearning/flow'

// §4 — a schema change and a metric-definition change side by side. Both are versioned, run in
// parallel, reconciled and given rollback criteria; the metric change is the one users feel.
export const evolution: Scene = {
  id: 'evolution',
  title: 'Changing shape versus changing meaning',
  flow: 'TB',
  nodes: [
    {
      id: 'changes',
      label: 'Two kinds of change',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'schema-change',
          label: 'schema change',
          sub: 'shape moves, meaning stays',
          kind: 'table',
          headers: ['version', 'change'],
          values: [
            ['fact_sales v5', 'add channel column'],
            ['fact_sales v6', 'region → sales_region'],
          ],
        },
        {
          id: 'metric-v2',
          label: 'metric change',
          sub: 'meaning moves',
          kind: 'table',
          headers: ['version', 'definition'],
          values: [
            ['revenue v1', 'gross, incl. VAT'],
            ['revenue v2', 'net of VAT'],
          ],
        },
      ],
    },
    {
      id: 'parallel',
      label: 'parallel results before switching',
      kind: 'table',
      headers: ['month', 'v1', 'v2', 'v2 ÷ v1', 'explained?'],
      values: [
        ['2026-09', '172.80', '144.00', '0.833', 'yes: VAT 20%'],
      ],
    },
    {
      id: 'rollback',
      label: 'Agreed before the switch',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'rb-explain', label: 'Every gap explained', sub: 'or no switch', pattern: 'service', icon: 'scale' },
        { id: 'rb-notice', label: 'Users told', sub: 'what and when', pattern: 'network', icon: 'bell' },
        { id: 'rb-back', label: 'Rollback', sub: 'v1 kept for a release', pattern: 'warn', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'changes', target: 'parallel' },
    { source: 'parallel', target: 'rollback' },
  ],
}
