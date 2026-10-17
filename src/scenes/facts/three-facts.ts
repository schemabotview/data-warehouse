import type { Scene } from '@graphlearning/flow'

// §1–§3 — the three fact-table patterns side by side, each with what one row means and how it is
// maintained. One scene, three readings: each section lights its own pattern.
export const threeFacts: Scene = {
  id: 'three-facts',
  title: 'Three ways to record a process',
  flow: 'TB',
  nodes: [
    {
      id: 'txn',
      label: 'Transaction',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'txn-rows',
          label: 'fact_sales',
          kind: 'table',
          headers: ['order_id', 'line', 'date', 'product', 'qty', 'net_gbp'],
          values: [
            ['1041', '1', '09-03', 'Kettle', '1', '34.00'],
            ['1041', '2', '09-03', 'Mug ×4', '2', '18.00'],
            ['1042', '1', '09-14', 'Toaster', '1', '49.00'],
            ['1043', '1', '09-21', 'Mug ×4', '1', '9.00'],
          ],
        },
        { id: 'txn-rule', label: 'One row per event', sub: 'inserted once, never updated', pattern: 'service', icon: 'receipt' },
      ],
    },
    {
      id: 'snapshot',
      label: 'Periodic snapshot',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'snap-rows',
          label: 'fact_inventory_daily',
          kind: 'table',
          headers: ['date', 'location', 'product', 'on_hand'],
          values: [
            ['09-29', 'LDN', 'Kettle', '12'],
            ['09-29', 'MAN', 'Kettle', '5'],
            ['09-30', 'LDN', 'Kettle', '11'],
            ['09-30', 'MAN', 'Kettle', '5'],
          ],
        },
        { id: 'snap-rule', label: 'One row per period', sub: 'even when nothing moved', pattern: 'service', icon: 'calendar' },
      ],
    },
    {
      id: 'accum',
      label: 'Accumulating snapshot',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'accum-rows',
          label: 'fact_fulfilment',
          sub: 'shipped = last parcel',
          kind: 'table',
          headers: ['order_id', 'placed', 'shipped', 'delivered', 'days_to_ship'],
          values: [
            ['1041', '09-03', '09-05', '09-06', '2'],
            ['1042', '09-14', '09-15', '10-02', '1'],
            ['1043', '09-21', '10-03', '—', '12'],
            ['1044', '09-30', '10-01', '—', '1'],
          ],
        },
        { id: 'accum-rule', label: 'One row per order', sub: 'updated at each milestone', pattern: 'service', icon: 'history' },
      ],
    },
  ],
  edges: [],
}
