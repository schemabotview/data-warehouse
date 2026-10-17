import type { Scene } from '@graphlearning/flow'

// §5 — the same three lines with their time, currency, unit and status made explicit, under the four
// rules that turn them into one comparable number.
export const semanticsGrid: Scene = {
  id: 'semantics-grid',
  title: 'Make every assumption a column',
  flow: 'TB',
  nodes: [
    {
      id: 'lines-explicit',
      label: 'order lines, assumptions explicit',
      sub: 'shop time zone Europe/London',
      kind: 'table',
      headers: ['order', 'created_utc', 'local_date', 'qty', 'unit', 'amount', 'ccy', 'gbp', 'status'],
      values: [
        ['1041', '09-19 15:05', '2026-09-19', '-2', 'pack of 4', '-18.00', 'GBP', '-18.00', 'refunded'],
        ['1044', '09-30 18:40', '2026-09-30', '1', 'each', '39.90', 'EUR', '34.00', 'placed'],
        ['1045', '09-30 23:20', '2026-10-01', '1', 'each', '49.00', 'GBP', '49.00', 'placed'],
      ],
    },
    {
      id: 'reading',
      label: 'Read through four rules',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'rules',
          label: 'Rules the metric states',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'tz', label: 'Time', sub: 'shop-local date, not UTC', pattern: 'service', icon: 'clock' },
            { id: 'fx', label: 'Currency', sub: 'rate of the order date', pattern: 'service', icon: 'scale' },
            { id: 'units', label: 'Units', sub: 'packs are not items', pattern: 'service', icon: 'ruler' },
            { id: 'status', label: 'Status', sub: 'which ones count', pattern: 'service', icon: 'funnel' },
          ],
        },
        {
          id: 'traps',
          label: 'Without them',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'trap-month', label: 'Wrong month', sub: 'UTC puts 1045 in Sept', pattern: 'warn', icon: 'calendar' },
            { id: 'trap-sum', label: 'Summed EUR', sub: '39.90 added as GBP', pattern: 'warn', icon: 'sigma' },
            { id: 'trap-sign', label: 'Lost refund', sub: 'a filter on qty > 0', pattern: 'warn', icon: 'trash' },
          ],
        },
      ],
      edges: [{ source: 'rules', target: 'traps', label: 'otherwise', dashed: true }],
    },
  ],
  edges: [{ source: 'lines-explicit', target: 'reading' }],
}
