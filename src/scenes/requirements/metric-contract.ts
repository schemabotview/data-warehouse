import type { Scene } from '@graphlearning/flow'
import { orderLinesSample } from '../shared/retail'

// §1 — one month of the same order lines counted under three definitions of "sales". The lists say
// what each definition counts; the table underneath shows they give three different answers.
export const metricContract: Scene = {
  id: 'metric-contract',
  title: 'Three definitions, three answers',
  flow: 'TB',
  framed: true,
  nodes: [
    orderLinesSample('sept-lines', 'order_lines'),
    {
      id: 'definitions',
      label: 'What counts as "sales"?',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'booked',
          kind: 'list',
          label: 'Booked',
          sub: 'when the order is placed',
          icon: 'receipt',
          pattern: 'service',
          items: ['Dated by ordered_on', 'Cancellations later reverse it', 'Fastest to report'],
        },
        {
          id: 'shipped',
          kind: 'list',
          label: 'Shipped',
          sub: 'when goods leave',
          icon: 'package',
          pattern: 'network',
          items: ['Dated by shipped_on', 'Late-month orders move', 'Matches the warehouse floor'],
        },
        {
          id: 'recognised',
          kind: 'list',
          label: 'Recognised',
          sub: 'per the finance policy',
          icon: 'scale',
          pattern: 'storage',
          items: ['Delivered, less returns', 'Policy owned by finance', 'Slowest, most stable'],
        },
      ],
    },
    {
      id: 'answers',
      label: 'September 2026, net GBP ex VAT',
      sub: 'same six lines, three rules',
      kind: 'table',
      headers: ['definition', 'lines counted', 'net_gbp', 'why it differs'],
      values: [
        ['booked', '1041–1044', '144.00', 'all ordered in Sept'],
        ['shipped', '1041–1042', '101.00', '1043, 1044 left in Oct'],
        ['recognised', '1041', '34.00', '1042 delivered Oct; mugs returned'],
      ],
    },
  ],
  edges: [
    { source: 'sept-lines', target: 'definitions', label: 'one set of rows' },
    { source: 'definitions', target: 'answers', label: 'three totals' },
  ],
}
