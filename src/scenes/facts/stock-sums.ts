import type { Scene } from '@graphlearning/flow'

// §4 — the same stock balances summed two ways. Across locations on one day is meaningful; across
// days is not, because a balance is a level, not a flow.
export const stockSums: Scene = {
  id: 'stock-sums',
  title: 'A balance adds across space, not time',
  flow: 'TB',
  nodes: [
    {
      id: 'balances',
      label: 'fact_inventory_daily — kettles',
      kind: 'table',
      headers: ['date', 'location', 'on_hand'],
      values: [
        ['09-29', 'LDN', '12'],
        ['09-29', 'MAN', '5'],
        ['09-30', 'LDN', '11'],
        ['09-30', 'MAN', '5'],
      ],
    },
    {
      id: 'ways',
      label: 'Two sums of the same rows',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'across', label: 'Across locations', sub: '30 Sept: 11 + 5 = 16', pattern: 'service', icon: 'circlecheck' },
        { id: 'through-time', label: 'Through time', sub: '12+5+11+5 = 33 kettles?', pattern: 'warn', icon: 'ban' },
        { id: 'period-end', label: 'Period end', sub: 'month closes on 16', pattern: 'service', icon: 'calendar' },
        { id: 'average', label: 'Average', sub: '(17 + 16) ÷ 2 = 16.5', pattern: 'service', icon: 'scale' },
      ],
    },
    {
      id: 'kinds',
      label: 'Additivity of each measure',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'additive', label: 'Additive', sub: 'qty, net_gbp: any dimension', pattern: 'storage', icon: 'sigma' },
        { id: 'semi', label: 'Semi-additive', sub: 'on_hand: not over time', pattern: 'network', icon: 'calendar' },
        { id: 'non', label: 'Non-additive', sub: 'prices, ratios: never', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'balances', target: 'ways' },
    { source: 'ways', target: 'kinds', label: 'so each measure declares' },
  ],
}
