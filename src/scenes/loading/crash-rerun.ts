import type { Scene } from '@graphlearning/flow'

// §5 — a crash between writing rows and advancing the checkpoint. The retry repeats the batch; only
// an idempotent write makes the repeat harmless.
export const crashRerun: Scene = {
  id: 'crash-rerun',
  title: 'The retry will happen — make it harmless',
  flow: 'LR',
  nodes: [
    {
      id: 'timeline',
      label: 'Run of batch 78',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'write', label: 'Rows written', sub: 'fact rows for 78', pattern: 'service', icon: 'pencil' },
        { id: 'crash', label: 'Crash', sub: 'before the checkpoint', pattern: 'warn', icon: 'zap' },
        { id: 'ckpt', label: 'Checkpoint', sub: 'still says 77', pattern: 'network', icon: 'lock' },
        { id: 'retry', label: 'Retry', sub: 'batch 78 again', pattern: 'service', icon: 'repeat' },
      ],
      edges: [
        { source: 'write', target: 'crash' },
        { source: 'crash', target: 'ckpt' },
        { source: 'ckpt', target: 'retry' },
      ],
    },
    {
      id: 'outcomes',
      label: 'After the retry',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'appended',
          label: 'plain INSERT',
          sub: 'batch 78 is in twice',
          kind: 'table',
          headers: ['order_id', 'line', '_batch', 'net_gbp'],
          values: [
            ['1044', '1', '78', '34.00'],
            ['1044', '1', '78', '34.00'],
          ],
        },
        {
          id: 'idempotent',
          label: 'replace batch 78 by key',
          sub: 'delete-then-insert in one transaction',
          kind: 'table',
          headers: ['order_id', 'line', '_batch', 'net_gbp'],
          values: [['1044', '1', '78', '34.00']],
        },
        { id: 'unique', label: 'Unique key', sub: 'order + line enforced', pattern: 'network', icon: 'fingerprint' },
      ],
    },
  ],
  edges: [{ source: 'timeline', target: 'outcomes' }],
}
