import type { Scene } from '@graphlearning/flow'

// §5 — a fact that arrives before its dimension member. Pointing it at Unknown loses the link; an
// inferred member keeps it and is completed when the real record lands.
export const inferredMember: Scene = {
  id: 'inferred-member',
  title: 'The fact arrived first',
  flow: 'TB',
  nodes: [
    {
      id: 'early-fact',
      label: 'marketplace order, loaded 3 Oct',
      sub: 'customer M-95 not yet in dim_customer',
      kind: 'table',
      headers: ['order', 'customer_id', 'order_date', 'net_gbp'],
      values: [['mkt-2207', 'M-95', '2026-10-02', '27.00']],
    },
    {
      id: 'options',
      label: 'Two placeholders',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'to-unknown',
          label: 'point at Unknown',
          sub: 'link to M-95 lost',
          kind: 'table',
          headers: ['order', 'customer_key'],
          values: [['mkt-2207', '-1']],
        },
        {
          id: 'inferred',
          label: 'inferred member',
          sub: 'key issued now, details later',
          kind: 'table',
          headers: ['customer_key', 'customer_id', 'region', 'inferred'],
          values: [
            ['230', 'M-95', 'Pending', 'Y'],
            ['230', 'M-95', 'North', 'N  (5 Oct)'],
          ],
        },
      ],
    },
    {
      id: 'outcomes',
      label: 'What happens next',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'repoint', label: 'Unknown', sub: 'facts must be re-pointed', pattern: 'warn', icon: 'search' },
        { id: 'complete', label: 'Inferred', sub: 'filled in place on arrival', pattern: 'service', icon: 'circlecheck' },
        { id: 'late-fact', label: 'Late fact', sub: 'look up by its own date', pattern: 'network', icon: 'calendar' },
      ],
    },
  ],
  edges: [
    { source: 'early-fact', target: 'options' },
    { source: 'options', target: 'outcomes' },
  ],
}
