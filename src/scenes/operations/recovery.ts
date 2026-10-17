import type { Scene } from '@graphlearning/flow'

// §3 — two different failures needing two different recoveries, and the recovery objectives that
// only a restore test can show are met.
export const recovery: Scene = {
  id: 'recovery',
  title: 'Rerun is not restore',
  flow: 'TB',
  nodes: [
    {
      id: 'cases',
      label: 'Two failures',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'interrupted',
          label: 'Interrupted load',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'i-what', label: 'Batch 78 died', sub: 'storage intact', pattern: 'warn', icon: 'zap' },
            { id: 'i-how', label: 'Rerun', sub: 'idempotent, from 77', pattern: 'service', icon: 'repeat' },
          ],
        },
        {
          id: 'lost',
          label: 'Lost storage',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'l-what', label: 'Volume lost', sub: 'tables gone', pattern: 'warn', icon: 'harddrive' },
            { id: 'l-how', label: 'Restore + replay', sub: 'backup, then changes', pattern: 'service', icon: 'history' },
          ],
        },
      ],
    },
    {
      id: 'rpo',
      label: 'recovery objectives, and the last restore test',
      sub: 'a target is only met if a test showed it',
      kind: 'table',
      headers: ['objective', 'target', 'restore test, 2026-09-28'],
      values: [
        ['RPO — data lost at most', '1 h', '40 min, then replay'],
        ['RTO — back in service within', '4 h', '3 h 10 min'],
        ['backup copy', 'other region, separate access', 'verified'],
      ],
    },
    {
      id: 'not-backups',
      label: 'Not independent backups',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'nb-replay', label: 'Replayable source', sub: 'only while it keeps logs', pattern: 'warn', icon: 'waves' },
        { id: 'nb-travel', label: 'Time travel', sub: 'same system, same failure', pattern: 'warn', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'cases', target: 'rpo' },
    { source: 'rpo', target: 'not-backups' },
  ],
}
