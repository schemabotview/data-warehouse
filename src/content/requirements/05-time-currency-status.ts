import type { Section } from '../types'

export const timeCurrencyStatus: Section = {
  id: 'time-currency-status',
  title: 'Time, currency, units and status semantics',
  scene: 'semantics-grid',
  focus: 'fx',
  slide: `## Time, currency, units and status semantics

Most wrong totals come from an assumption nobody wrote down. Make each one **visible**.

### Four rules a metric states
- **Time:** whose clock? 1045 is September in UTC, October in London
- **Currency:** convert 39.90 EUR at the rate of a stated date
- **Units:** a pack of four mugs is one unit sold, or four items
- **Status:** which states count, and whether refunds are negative
- Convert **per line** or per total — say which; totals differ

### What happens without them
- Orders drift between months at midnight
- Euros are added to pounds as if they were the same
- A filter on \`qty > 0\` quietly drops every refund
- Packs and single items get averaged together`,
  narration:
    "Most wrong totals are not caused by bad data. They come from an assumption nobody wrote down. Here are three order lines with every assumption turned into a column. Time first. Order ten forty five was placed at twenty past eleven at night, UTC, on the thirtieth of September. In London that was already October the first. The metric has to say whose clock decides the month. Currency next. Order ten forty four was paid in euros, and the metric must say which rate converts it, and from which date. Units: a pack of four mugs could count as one sale or as four items, and the two give very different averages. And status: which states count at all, and is a refund a negative row or a separate event? Skip these rules and the failures are predictable. Orders drift across month boundaries at midnight. Euros get added to pounds. And a harmless looking filter on positive quantities quietly removes every refund.",
}
