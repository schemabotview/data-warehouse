import type { Scene } from '@graphlearning/flow'

// §1 — each quality check placed at the layer where it means something, with what happens when it
// fails. A check in the wrong layer either cannot see the problem or fires too late.
export const checksByLayer: Scene = {
  id: 'checks-by-layer',
  title: 'Each check where it means something',
  flow: 'TB',
  nodes: [
    {
      id: 'layers',
      label: 'Checks by layer',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'l-staging',
          label: 'Staging',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'c-counts', label: 'Counts agree', sub: 'source = landed', pattern: 'network', icon: 'hash' },
            { id: 'c-types', label: 'Types parse', sub: 'else quarantine', pattern: 'network', icon: 'funnel' },
          ],
        },
        {
          id: 'l-integration',
          label: 'Integration',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'c-unique', label: 'Keys unique', sub: 'one row per grain', pattern: 'network', icon: 'fingerprint' },
            { id: 'intervals', label: 'Valid intervals', sub: 'no overlaps, no gaps', pattern: 'network', icon: 'history' },
          ],
        },
        {
          id: 'l-serving',
          label: 'Serving',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'c-ri', label: 'No orphan keys', sub: 'every FK resolves', pattern: 'network', icon: 'link' },
            { id: 'c-fresh', label: 'Fresh enough', sub: 'within 2 hours', pattern: 'network', icon: 'clock' },
          ],
        },
        {
          id: 'l-business',
          label: 'Business',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'c-ledger', label: 'Matches ledger', sub: 'within agreed tolerance', pattern: 'network', icon: 'scale' },
            { id: 'c-trend', label: 'Plausible trend', sub: 'flags, not blocks', pattern: 'network', icon: 'barchart' },
          ],
        },
      ],
    },
    {
      id: 'on-fail',
      label: 'on failure',
      kind: 'table',
      headers: ['severity', 'example', 'action'],
      values: [
        ['block', 'duplicate keys', 'hold publication'],
        ['warn', 'freshness 3 h late', 'publish, flag "stale"'],
        ['investigate', 'trend outside range', 'owner reviews'],
      ],
    },
  ],
  edges: [{ source: 'layers', target: 'on-fail', label: 'each check declares' }],
}
