import type { Section } from '../types'

export const fullVsIncremental: Section = {
  id: 'full-vs-incremental',
  title: 'Full extracts and incremental selection',
  scene: 'extract-handoff',
  focus: 'handoff',
  slide: `## Full extracts and incremental selection

A **full extract** copies everything. An **incremental** load copies only what changed. Most pipelines need both.

### The hand-off
- Take the initial full extract **consistent as of one position**
- Record that position: LSN 0/1A1
- Apply changes from **exactly** that position onwards
- Too late a start loses changes; too early repeats them
- The source must keep its log until the hand-off

### Choosing
- Full extracts suit small tables and sources without a log
- They also detect deletes: a missing row was removed
- Incremental loads suit large, busy tables
- Mix them: full for lookups, increments for facts
- Keep counts and positions as evidence of a clean hand-off`,
  narration:
    "There are two basic ways to copy a source. A full extract copies the whole table every time. An incremental load copies only what changed since last time. Most real pipelines use both: a full extract to establish the starting state, and then increments to keep it current. The dangerous moment is the hand-off between them. The full extract has to be consistent as of one exact point in the source's history, here log position zero slash one A one, and that position has to be recorded. Increments then start from exactly that position. Start a little later, and any change made in between is lost for good. Start a little earlier, and some changes are applied twice. Full extracts remain the right tool for small tables, and for sources that offer no change log. They also have a useful property: a row that is missing from a full extract has been deleted. Increments are for large, busy tables. Whichever you use, keep the counts and the positions, so the hand-off can be shown to be clean.",
}
