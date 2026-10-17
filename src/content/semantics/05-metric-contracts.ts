import type { Section } from '../types'

export const metricContracts: Section = {
  id: 'metric-contracts',
  title: 'Metric contracts and semantic layers',
  scene: 'semantic-contract',
  focus: 'version',
  slide: `## Metric contracts and semantic layers

A **semantic layer** defines each metric once, so every report computes it the same way.

### A metric contract states
- Population, grain, time basis and time zone
- Measure, currency conversion, and null treatment
- An **owner** and a **version**: v2 dropped VAT
- Reports call the metric by name, never re-derive it

### Three dashboards, three formulas
- Finance sums net: 144.00
- Ops sums only shipped lines: 101.00
- Exec sums gross, with VAT: 172.80
- All three are labelled "revenue"
- Versions let old reports state which definition they used
- Shipped revenue becomes its **own** named metric
- Meetings then argue decisions, not numbers`,
  narration:
    "By now the same word, revenue, has meant several different things. A semantic layer is the place where each metric is defined once, so that every report computes it the same way. The definition here is illustrative, because each semantic layer product has its own syntax, but the content is what matters. It names the population, the grain, the time basis and time zone, the measure, the currency conversion, and how nulls are treated. It also names an owner, and it has a version. Version two removed VAT, which version one had included. Compare that with what happens without it. Three dashboards each wrote their own formula and each called it revenue. Finance sums net amounts and gets one hundred and forty four pounds. Operations sums only shipped lines and gets one hundred and one. The executive board sums gross amounts, including VAT, and gets one hundred and seventy two pounds eighty. In a meeting those are three conflicting numbers for one word. Versioning also lets older reports state exactly which definition they used.",
}
