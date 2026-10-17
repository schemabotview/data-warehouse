import type { Section } from '../types'

export const windowsPeriods: Section = {
  id: 'windows-periods',
  title: 'Windows and period comparisons',
  scene: 'periods',
  focus: 'partial',
  slide: `## Windows and period comparisons

Running totals and period comparisons need a stated **calendar**, and an honest view of incomplete periods.

### Running totals
- A window function sums day by day within each month
- Days come from the date dimension, in the shop's time zone
- Fiscal periods, if used, come from the same calendar table

### Comparing months
- October has 2 days of data; September has 30
- 76.00 against 144.00 looks like **−47%**; it is not comparable
- Compare like for like: same number of days, or wait
- Mark partial periods in the result, not in a footnote
- Days with no sales are zero only after joining the calendar`,
  narration:
    "Analysts compare periods constantly, and two details decide whether the comparison is honest. The first is the calendar. A running total sums sales day by day within each month, which a window function does neatly. But which days, and whose midnight? The days should come from the date dimension, in the shop's own time zone, and fiscal periods, if the business uses them, should come from that same calendar table rather than being recomputed in each query. The second detail is completeness. Here September is complete, all thirty days. October is two days in. The naive month over month comparison puts seventy six pounds against one hundred and forty four and reports a forty seven percent fall. That is not a fall. It is two days compared with thirty. The plot makes it obvious: October is not below September's line at the same day of the month. So compare like with like, the same number of days, or wait for the month to close. And mark partial periods in the result itself, where nobody can miss it.",
}
