import type { Scene } from '@graphlearning/flow'

// §7 — ingestion metadata for one batch, the control totals that compare it with the source, and
// what agreeing totals still do not prove.
export const controlTotals: Scene = {
  id: 'control-totals',
  title: 'Totals agree — what does that prove?',
  flow: 'TB',
  nodes: [
    {
      id: 'batch-meta',
      label: 'ingestion_batches',
      sub: 'one row per load, kept forever',
      kind: 'table',
      headers: ['batch', 'source', 'lsn_from', 'lsn_to', 'rows', 'status'],
      values: [
        ['77', 'web', '0/1A1', '0/1A6', '6', 'committed'],
        ['78', 'web', '0/1A6', '0/1A9', '4', 'replayed'],
        ['79', 'web', '0/1A9', '0/1B2', '3', 'partial: 1 held'],
      ],
    },
    {
      id: 'totals',
      label: 'control totals, batch 77',
      sub: 'computed on both sides',
      kind: 'table',
      headers: ['check', 'source', 'staging', 'result'],
      values: [
        ['row count', '6', '6', 'agree'],
        ['distinct keys', '5', '5', 'agree'],
        ['sum of net', '192.00', '192.00', 'agree'],
        ['max LSN', '0/1A6', '0/1A6', 'agree'],
      ],
    },
    {
      id: 'limits',
      kind: 'list',
      label: 'Agreeing totals do not prove',
      icon: 'scale',
      pattern: 'warn',
      framed: true,
      items: [
        'That each row is correct — errors can cancel',
        'That the source itself was right',
        'That the extract scope was right',
      ],
    },
  ],
  edges: [
    { source: 'batch-meta', target: 'totals' },
    { source: 'totals', target: 'limits' },
  ],
}
