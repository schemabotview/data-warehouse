import type { Scene } from '@graphlearning/flow'

// §6 — an incompatible change in one batch: compatible rows load, incompatible ones are held with a
// reason, and the completeness impact is made visible instead of silent.
export const quarantine: Scene = {
  id: 'quarantine',
  title: 'Hold the rows, show the gap',
  flow: 'TB',
  nodes: [
    {
      id: 'batch',
      label: 'web orders, batch 79',
      sub: 'source began sending amounts as text with commas',
      kind: 'table',
      headers: ['order_id', 'net', 'currency', 'gift_note'],
      values: [
        ['1048', '34.00', 'GBP', ''],
        ['1049', '49,00', 'EUR', 'Happy birthday'],
        ['1050', '9.00', 'GBP', ''],
      ],
    },
    {
      id: 'split',
      label: 'Routed by contract',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'accepted',
          label: 'staging',
          sub: 'compatible rows',
          kind: 'table',
          headers: ['order_id', 'net'],
          values: [
            ['1048', '34.00'],
            ['1050', '9.00'],
          ],
        },
        {
          id: 'quarantine',
          label: 'quarantine',
          sub: 'held with a reason',
          kind: 'table',
          headers: ['order_id', 'reason'],
          values: [['1049', "net '49,00' not numeric"]],
        },
      ],
    },
    {
      id: 'actions',
      label: 'Visible, owned, replayable',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'flag', label: 'Completeness', sub: '2 of 3 rows loaded', pattern: 'warn', icon: 'gauge' },
        { id: 'notify', label: 'Owner told', sub: 'per the contract', pattern: 'user', icon: 'bell' },
        { id: 'replay', label: 'Replay', sub: 'after the parser fix', pattern: 'service', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'batch', target: 'split' },
    { source: 'split', target: 'actions' },
  ],
}
