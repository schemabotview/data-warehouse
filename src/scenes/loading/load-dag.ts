import type { Scene } from '@graphlearning/flow'

// §1 and §8 — the load as a dependency graph, from staged inputs to publication, with the evidence
// each run leaves behind. §1 lights the dimensions; §8 lights the evidence.
export const loadDag: Scene = {
  id: 'load-dag',
  title: 'Dimensions before facts, evidence before publish',
  flow: 'TB',
  nodes: [
    {
      id: 'staged',
      label: 'Staged inputs',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-orders', label: 'stg orders', sub: 'batch 78', pattern: 'storage', icon: 'receipt' },
        { id: 's-lines', label: 'stg lines', sub: 'batch 78', pattern: 'storage', icon: 'table' },
        { id: 's-cust', label: 'stg customers', sub: 'batch 41', pattern: 'storage', icon: 'users' },
        { id: 's-prod', label: 'stg products', sub: 'batch 12', pattern: 'storage', icon: 'tag' },
      ],
    },
    {
      id: 'dims',
      label: 'Dimensions first',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'd-cust', label: 'dim_customer', sub: 'Type 2 versions', pattern: 'service', icon: 'history' },
        { id: 'd-prod', label: 'dim_product', sub: 'new keys issued', pattern: 'service', icon: 'fingerprint' },
      ],
    },
    {
      id: 'fact-step',
      label: 'Fact load',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'resolve', label: 'Resolve keys', sub: 'as of each order date', pattern: 'service', icon: 'link' },
        { id: 'fact', label: 'fact_sales', sub: 'one row per line', pattern: 'storage', icon: 'star' },
        { id: 'publish', label: 'Publish', sub: 'all or nothing', pattern: 'external', icon: 'lock' },
      ],
      edges: [
        { source: 'resolve', target: 'fact' },
        { source: 'fact', target: 'publish', label: 'if checks pass' },
      ],
    },
    {
      id: 'evidence',
      label: 'Evidence each run leaves',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'ev-inputs', label: 'Input versions', sub: 'batches 78, 41, 12', pattern: 'network', icon: 'layers' },
        { id: 'ev-code', label: 'Code version', sub: 'commit of the models', pattern: 'network', icon: 'gitbranch' },
        { id: 'ev-totals', label: 'Reconciliation', sub: 'staged = loaded', pattern: 'network', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'staged', target: 'dims' },
    { source: 'dims', target: 'fact-step', label: 'keys exist before facts need them' },
    { source: 'fact-step', target: 'evidence', label: 'recorded' },
  ],
}
