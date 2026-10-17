import type { Section } from '../types'

export const schemaMetricEvolution: Section = {
  id: 'schema-metric-evolution',
  title: 'Schema and metric evolution',
  scene: 'evolution',
  focus: 'metric-v2',
  slide: `## Schema and metric evolution

A **schema change** moves the shape of the data. A **metric change** moves its meaning — and users feel it.

### Two kinds of change
- Schema: add a column, or rename region to sales_region
- Metric: revenue v1 was gross; v2 is net of VAT
- Both are versioned and released with notice
- Renames keep the old name as an alias for a while

### Releasing a metric change
- Run v1 and v2 **in parallel** on the same data
- September: 172.80 against 144.00, a ratio of 0.833
- Every gap is explained — here, VAT at 20% — or no switch
- Tell users what changes and when
- Keep v1 for a release, so rollback is possible
- Old reports state which version they used
- Change one meaning at a time, never several at once`,
  narration:
    "A warehouse that serves people for years will change, and there are two kinds of change to manage. A schema change moves the shape of the data: a new channel column, or a column renamed from region to sales region. Done carefully, with versions and notice, the numbers people see stay the same. A metric change moves the meaning. Revenue version one counted gross amounts, including VAT. Version two counts net amounts. Every revenue number people have ever seen will change, so this is the one they feel. Release it like this. Run both versions in parallel over the same data. September comes out at one hundred and seventy two pounds eighty under version one, and one hundred and forty four under version two, a ratio of zero point eight three three. Every difference must be explained before the switch, and here it is: VAT at twenty percent. If a gap cannot be explained, there is no switch. Tell users what is changing and when. And keep version one available for a release, so that a rollback is possible if something was missed.",
}
