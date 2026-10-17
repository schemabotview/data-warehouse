import type { SceneNode } from '@graphlearning/flow'

// The recurring retailer every course reuses: orders, order lines, returns, customer changes,
// fulfilment events and daily inventory. All values are synthetic. Money carries its currency and
// every date is ISO, so no frame ever has to assume either.
//
// The canonical timeline every frame agrees with (shop time zone Europe/London):
//   1041  C-201  ordered 09-03  Kettle 34.00 + Mug ×4 18.00  shipped 09-04/05  delivered 09-05/06
//                               line 2 (the mugs) returned 09-19, refunded 18.00
//   1042  C-202  ordered 09-14  Toaster 49.00               shipped 09-15     delivered 10-02
//   1043  —      ordered 09-21  Mug ×4 9.00                 packed 09-22      shipped 10-03
//   1044  C-201  ordered 09-30  Kettle, paid 39.90 EUR = 34.00 GBP           shipped 10-01
//   1045  C-207  ordered 10-01 local (09-30 23:20 UTC)  Toaster 49.00
// So September is 144.00 booked, 101.00 shipped, 34.00 recognised (delivered, less returns).
//
// A node-factory module, not a scene — it declares no Scene, so `npm run check` treats its node ids
// as in scope for every scene that spreads them.

/** The operational sources, as leaf cards. Labels stay ≤ 14 chars with no `_` — a card cannot wrap one. */
export const retailSources = (): SceneNode[] => [
  { id: 'src-orders', label: 'Orders', sub: 'one row per checkout', pattern: 'storage', icon: 'receipt' },
  { id: 'src-lines', label: 'Order lines', sub: 'product × quantity × price', pattern: 'storage', icon: 'table' },
  { id: 'src-returns', label: 'Returns', sub: 'refunds, dated on receipt', pattern: 'storage', icon: 'repeat' },
]

/** A six-line sample of order_lines — net amount in GBP, before tax. */
export const orderLinesSample = (id: string, label = 'order_lines'): SceneNode => ({
  id,
  label,
  sub: 'net_gbp excludes VAT',
  kind: 'table',
  headers: ['order_id', 'line', 'product', 'qty', 'net_gbp', 'ordered_on'],
  values: [
    ['1041', '1', 'Kettle', '1', '34.00', '2026-09-03'],
    ['1041', '2', 'Mug ×4', '2', '18.00', '2026-09-03'],
    ['1042', '1', 'Toaster', '1', '49.00', '2026-09-14'],
    ['1043', '1', 'Mug ×4', '1', '9.00', '2026-09-21'],
    ['1044', '1', 'Kettle', '1', '34.00', '2026-09-30'],
    ['1045', '1', 'Toaster', '1', '49.00', '2026-10-01'],
  ],
})
