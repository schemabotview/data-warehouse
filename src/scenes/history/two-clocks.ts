import type { Scene } from '@graphlearning/flow'

// §1 — every row carries two kinds of time: when it happened, and when the warehouse learned of it.
// The late row is where they disagree about which month it belongs to.
export const twoClocks: Scene = {
  id: 'two-clocks',
  title: 'When it happened, when we knew',
  flow: 'TB',
  nodes: [
    {
      id: 'clocks',
      label: 'Two clocks',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'event-time', label: 'Business time', sub: 'when it happened in the world', pattern: 'user', icon: 'calendar' },
        { id: 'processing-time', label: 'Processing time', sub: 'when the warehouse learned it', pattern: 'network', icon: 'clock' },
      ],
    },
    {
      id: 'stamps',
      label: 'fulfilment events, with every timestamp',
      sub: 'shop time zone Europe/London',
      kind: 'table',
      headers: ['order', 'event', 'happened_at', 'captured_at', 'loaded_at'],
      values: [
        ['1042', 'shipped', '09-15 11:20', '09-15 11:21', '09-16 02:00'],
        ['1044', 'shipped', '10-01 09:05', '10-01 09:06', '10-02 02:00'],
        ['1041', 'returned', '09-19 16:05', '10-02 08:40', '10-03 02:00'],
      ],
    },
    {
      id: 'late',
      label: 'The late return',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'late-business', label: 'By business time', sub: 'a September return', pattern: 'service', icon: 'calendar' },
        { id: 'late-processing', label: 'By load time', sub: 'an October return', pattern: 'warn', icon: 'clock' },
        { id: 'late-rule', label: 'State the rule', sub: 'and keep both stamps', pattern: 'storage', icon: 'scroll' },
      ],
    },
  ],
  edges: [
    { source: 'clocks', target: 'stamps', label: 'both recorded' },
    { source: 'stamps', target: 'late', label: '1041 arrived 13 days late' },
  ],
}
