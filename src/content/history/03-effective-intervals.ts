import type { Section } from '../types'

export const effectiveIntervals: Section = {
  id: 'effective-intervals',
  title: 'Effective intervals and surrogate-key assignment',
  scene: 'scd-versions',
  focus: 'interval',
  slide: `## Effective intervals and surrogate-key assignment

Each Type 2 version is valid for an **interval**. The interval rules decide which version a date gets.

### Half-open intervals
- Valid when \`valid_from ≤ t < valid_to\`
- The old version ends exactly where the new one starts
- 20 September belongs to the new version, never both
- Open-ended current rows use a far-future \`valid_to\`
- One row's \`valid_to\` is the next row's \`valid_from\`
- A back-dated change splits an existing interval

### Rules to test on every load
- **No overlaps:** one version per customer per instant
- **No gaps:** every instant since creation is covered
- **One current row** per natural key
- A **new surrogate key** for every new version
- The interval uses business time, not load time
- Record when each version was **loaded**, separately`,
  narration:
    "A Type two version is only useful if you can tell, for any moment, which version was in force. That is the job of the effective interval. Each version has a valid from and a valid to, and the convention that makes them behave is the half-open interval: a version applies from its start, inclusive, up to its end, exclusive. So the old North version ends at exactly the instant the new South version begins, and the twentieth of September belongs to the new version only, never both. The current version gets a far future end date, so it stays open until it is replaced. These rules are worth testing on every load. No overlaps: at any instant a customer has exactly one version. No gaps: every instant since the customer first appeared is covered. One current row per natural key. And each new version gets a new surrogate key, so facts can point at precisely one version. Finally, the interval is in business time, the date the change took effect, not the date the warehouse happened to load it.",
}
