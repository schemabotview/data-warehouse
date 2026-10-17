import type { Scene } from '@graphlearning/flow'

// §7 — one question, "September sales by region", answered three ways from the same history.
export const threeAnswers: Scene = {
  id: 'three-answers',
  title: 'Which past do you mean?',
  flow: 'TB',
  framed: true,
  nodes: [
    {
      id: 'history-rows',
      label: 'what the warehouse holds',
      sub: 'September sales, with keys and recorded-at times',
      kind: 'table',
      headers: ['order', 'customer_key', 'region then', 'net_gbp', 'recorded_at'],
      values: [
        ['1041', '201', 'North', '52.00', '09-04'],
        ['1042', '202', 'West', '49.00', '09-15'],
        ['1042', '202', 'West', '45.00', '10-06'],
        ['1043', '-1', 'Unknown', '9.00', '09-22'],
        ['1044', '208', 'South', '34.00', '10-01'],
      ],
    },
    {
      id: 'answers',
      label: 'September booked sales by region, GBP',
      sub: 'one question, three honest answers',
      kind: 'table',
      headers: ['region', 'as-was', 'current view', 'as known 1 Oct'],
      values: [
        ['North', '52.00', '—', '52.00'],
        ['South', '34.00', '86.00', '34.00'],
        ['West', '45.00', '45.00', '49.00'],
        ['Unknown', '9.00', '9.00', '9.00'],
        ['Total', '140.00', '140.00', '144.00'],
      ],
    },
    {
      id: 'meanings',
      label: 'What each answer needs',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'as-was',
          kind: 'list',
          label: 'As-was',
          icon: 'history',
          pattern: 'service',
          items: ['Region at the time of sale', 'Type 2 keys on the fact', 'C-201 split by its move'],
        },
        {
          id: 'current',
          kind: 'list',
          label: 'Current view',
          icon: 'swap',
          pattern: 'network',
          items: ["Today's region for all sales", 'Join through current flag', 'C-201 all in South'],
        },
        {
          id: 'known-then',
          kind: 'list',
          label: 'Known then',
          icon: 'clock',
          pattern: 'warn',
          items: ['What the report said on 1 Oct', 'Needs recorded-at times', 'Before the 1042 fix'],
        },
      ],
    },
  ],
  edges: [
    { source: 'history-rows', target: 'answers', label: 'read three ways' },
    { source: 'answers', target: 'meanings' },
  ],
}
