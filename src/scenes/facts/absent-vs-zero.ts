import type { Scene } from '@graphlearning/flow'

// §8 — a transaction fact has no row for a day nothing sold; a snapshot has a row that measured zero.
// Averages over the wrong denominator come from confusing the two.
export const absentVsZero: Scene = {
  id: 'absent-vs-zero',
  title: 'No row is not a zero',
  flow: 'TB',
  nodes: [
    {
      id: 'pair',
      label: 'Toasters, 13–15 Sept',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'sparse',
          label: 'fact_sales',
          sub: 'rows only when something sold',
          kind: 'table',
          headers: ['date', 'qty', 'net_gbp'],
          values: [['09-14', '1', '49.00']],
        },
        {
          id: 'dense',
          label: 'joined to dim_date',
          sub: 'missing days made explicit',
          kind: 'table',
          headers: ['date', 'qty', 'net_gbp'],
          values: [
            ['09-13', '0', '0.00'],
            ['09-14', '1', '49.00'],
            ['09-15', '0', '0.00'],
          ],
        },
        {
          id: 'zero',
          label: 'fact_inventory_daily',
          sub: 'a count that found zero',
          kind: 'table',
          headers: ['date', 'location', 'on_hand'],
          values: [
            ['09-15', 'MAN', '0'],
            ['09-15', 'LDN', '3'],
          ],
        },
      ],
      edges: [{ source: 'sparse', target: 'dense' }],
    },
    {
      id: 'meanings',
      label: 'Three different statements',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm-absent', label: 'No row', sub: 'nothing recorded', pattern: 'warn', icon: 'search' },
        { id: 'm-filled', label: 'Filled zero', sub: 'assumed: no sale', pattern: 'service', icon: 'calendar' },
        { id: 'm-measured', label: 'Measured zero', sub: 'observed: none left', pattern: 'network', icon: 'circlecheck' },
      ],
    },
    {
      id: 'avg',
      label: 'average daily sales, September',
      kind: 'table',
      headers: ['denominator', 'result'],
      values: [
        ['rows present (1)', '49.00 GBP / day ✗'],
        ['days in month (30)', '1.63 GBP / day'],
      ],
    },
  ],
  edges: [
    { source: 'pair', target: 'meanings' },
    { source: 'meanings', target: 'avg', label: 'so the denominator is a choice' },
  ],
}
