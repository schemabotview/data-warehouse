import type { Scene } from '@graphlearning/flow'

// §6 — the three integration patterns of this course compared on the same criteria, and the
// conditions that tend to favour each. No row wins everywhere.
export const patternCompare: Scene = {
  id: 'pattern-compare',
  title: 'Choose against requirements',
  flow: 'TB',
  framed: true,
  nodes: [
    {
      id: 'compare',
      label: 'integration patterns compared',
      sub: 'typical tendencies, not guarantees',
      kind: 'table',
      headers: ['criterion', 'dimensional bus', 'normalised core', 'data vault'],
      values: [
        ['query usability', 'high', 'low, needs marts', 'low, needs marts'],
        ['change isolation', 'moderate', 'high', 'high'],
        ['traceability', 'good', 'good', 'very high'],
        ['first delivery', 'fast', 'slower', 'slower'],
        ['modelling skill', 'common', 'common', 'specialist'],
      ],
    },
    {
      id: 'when',
      label: 'Tends to fit when',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'fit-bus',
          kind: 'list',
          label: 'Dimensional bus',
          icon: 'star',
          pattern: 'service',
          items: ['Few, well-known sources', 'Analysts query directly', 'Speed to value matters'],
        },
        {
          id: 'fit-core',
          kind: 'list',
          label: 'Normalised core',
          icon: 'database',
          pattern: 'network',
          items: ['Many consuming marts', 'Stable enterprise entities', 'Central integration team'],
        },
        {
          id: 'fit-vault',
          kind: 'list',
          label: 'Data Vault',
          icon: 'history',
          pattern: 'storage',
          items: ['Many changing sources', 'Audit of every load', 'Marts built on top'],
        },
      ],
    },
    {
      id: 'combo',
      label: 'A common combination',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'combo-src', label: 'Sources', sub: 'many, changing', pattern: 'storage', icon: 'database' },
        { id: 'combo-vault', label: 'Vault or core', sub: 'absorbs change, audits', pattern: 'service', icon: 'history' },
        { id: 'combo-marts', label: 'Dimensional marts', sub: 'what people query', pattern: 'storage', icon: 'star' },
      ],
      edges: [
        { source: 'combo-src', target: 'combo-vault' },
        { source: 'combo-vault', target: 'combo-marts' },
      ],
    },
  ],
  edges: [
    { source: 'compare', target: 'when' },
    { source: 'when', target: 'combo', label: 'and often combined' },
  ],
}
