import type { Scene } from '@graphlearning/flow'
import { retailSources } from '../shared/retail'

// §4 and §6 — the logical layers, each with the check that earns its name, plus the people who own
// them. §4 lights the serving layer; §6 lights the roles band. One scene, two readings.
export const layers: Scene = {
  id: 'layers',
  title: 'Layers name responsibilities',
  flow: 'TB',
  nodes: [
    { id: 'sources', label: 'Operational sources', pattern: 'group', cols: 3, children: retailSources() },
    {
      id: 'path',
      label: 'Data movement',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'land', label: 'Landing', sub: 'raw, as sent', pattern: 'storage', icon: 'harddrive' },
        { id: 'stage', label: 'Staging', sub: 'typed, deduplicated', pattern: 'service', icon: 'funnel' },
        { id: 'integ', label: 'Integration', sub: 'conformed, historical', pattern: 'service', icon: 'merge' },
        { id: 'serve', label: 'Serving', sub: 'stars and marts', pattern: 'storage', icon: 'star' },
      ],
      edges: [
        { source: 'land', target: 'stage' },
        { source: 'stage', target: 'integ' },
        { source: 'integ', target: 'serve' },
      ],
    },
    {
      id: 'gates',
      label: 'Checks at each boundary',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'gate-count', label: 'Row counts', sub: 'landed = sent', pattern: 'network', icon: 'hash' },
        { id: 'gate-types', label: 'Types parse', sub: 'bad rows set aside', pattern: 'network', icon: 'funnel' },
        { id: 'gate-keys', label: 'Keys unique', sub: 'one row per grain', pattern: 'network', icon: 'fingerprint' },
        { id: 'gate-totals', label: 'Totals agree', sub: 'serving = source', pattern: 'network', icon: 'scale' },
      ],
    },
    {
      id: 'roles',
      label: 'Named owners',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'biz', label: 'Business owner', sub: 'metric definition', pattern: 'user', icon: 'usercheck' },
        { id: 'de', label: 'Data engineer', sub: 'ingest, load, recover', pattern: 'user', icon: 'wrench' },
        { id: 'ae', label: 'Analytics engineer', sub: 'models and tests', pattern: 'user', icon: 'code' },
        { id: 'platform', label: 'Platform owner', sub: 'compute, access, cost', pattern: 'user', icon: 'server' },
      ],
    },
    { id: 'label-warn', label: "'Gold' is a name", sub: 'checks are the evidence', pattern: 'warn', icon: 'ban' },
  ],
  edges: [
    { source: 'sources', target: 'path', label: 'read, never changed' },
    { source: 'path', target: 'gates', label: 'earns trust by' },
    { source: 'gates', target: 'roles', label: 'answered for by' },
    { source: 'gates', target: 'label-warn', label: 'not by', dashed: true },
  ],
}
