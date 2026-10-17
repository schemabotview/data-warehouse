import type { Section } from '../types'

export const sourceProfiling: Section = {
  id: 'source-profiling',
  title: 'Source profiling and provenance',
  scene: 'profile',
  focus: 'dupes',
  slide: `## Source profiling and provenance

Column names describe what a source **should** hold. Profiling shows what it **does** hold.

### Profile six rows before trusting six million
- **Keys:** is \`order_id\` unique? Here 1042 arrives twice
- **Nulls:** which required fields are empty? 1043 has no customer
- **Values:** status has six spellings for five states
- **Coverage:** which systems, dates and regions are in the extract
- **Gaps:** a missing key may be late, filtered, or deleted
- **Ranges:** a zero price or a future date is a finding too

### Keep the provenance with the findings
- Which source, which extract, at what time, by which query
- A finding with no provenance cannot be re-checked later
- Re-profile whenever the source changes`,
  narration:
    "A source table's column names tell you what it is supposed to hold. Profiling tells you what it actually holds, and the two are rarely the same. Here are six rows from the web shop's order extract. Order ten forty two appears twice, once in lower case and once in capitals, so the key that looks unique is not. Order ten forty three has no customer at all. The status column uses six spellings for five real states. Ten forty four is priced in euros, in a table everyone assumed was pounds. And ten forty five is simply missing, which might mean it is late, filtered out by the extract, or deleted at the source. You cannot tell which from here, and that is a finding too. Each of these will break an answer later if it is not found now. Record the findings with their provenance: which system, which extract, when it ran, and with what query. A profile result without that context cannot be checked again, and so it cannot be trusted.",
}
