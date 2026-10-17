import type { Scene } from '@graphlearning/flow'

// §4 — three independent checkpoints along one pipeline. After a crash, each says something
// different about what has been delivered; only the ingestion checkpoint says what was committed.
export const checkpoints: Scene = {
  id: 'checkpoints',
  title: 'Three positions, three meanings',
  flow: 'LR',
  nodes: [
    {
      id: 'pipeline',
      label: 'One pipeline',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'src-log', label: 'Source log', sub: 'WAL at 0/1A9', pattern: 'storage', icon: 'database' },
        { id: 'connector', label: 'Connector', sub: 'read up to 0/1A6', pattern: 'network', icon: 'plug' },
        { id: 'topic', label: 'Transport', sub: 'topic offset 1287', pattern: 'network', icon: 'waves' },
        { id: 'ingest-ckpt', label: 'Ingestion job', sub: 'batch 77 committed', pattern: 'service', icon: 'lock' },
      ],
      edges: [
        { source: 'src-log', target: 'connector' },
        { source: 'connector', target: 'topic' },
        { source: 'topic', target: 'ingest-ckpt' },
      ],
    },
    {
      id: 'reading',
      label: 'After a crash',
      pattern: 'group',
      flow: 'TB',
      children: [
    {
      id: 'positions',
      label: 'positions after a crash mid-batch 78',
      kind: 'table',
      headers: ['checkpoint', 'value', 'what it promises'],
      values: [
        ['source', '0/1A6', 'connector has read this far'],
        ['transport', 'offset 1287', 'messages delivered to the topic'],
        ['ingestion', 'batch 77', 'rows committed to staging'],
        ['restart from', 'after batch 77', 'replay 78; dedupe by LSN'],
      ],
    },
    {
      id: 'watermark',
      label: 'A watermark needs stated semantics',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'wm-order', label: 'Total order', sub: 'LSN, not wall clock', pattern: 'service', icon: 'sortarrows' },
        { id: 'wm-late', label: 'Late commits', sub: 'can a lower value arrive?', pattern: 'warn', icon: 'clock' },
        { id: 'wm-atomic', label: 'Advance last', sub: 'after rows commit', pattern: 'service', icon: 'lock' },
      ],
    },
      ],
      edges: [{ source: 'positions', target: 'watermark' }],
    },
  ],
  edges: [{ source: 'pipeline', target: 'reading' }],
}
