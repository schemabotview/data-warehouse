import type { Section } from '../types'

export const incrementalHistory: Section = {
  id: 'incremental-history',
  title: 'Incremental history maintenance',
  scene: 'scd2-merge',
  focus: 'close-row',
  slide: `## Incremental history maintenance

Each load compares incoming records with **current** versions, then closes and opens rows.

### For C-201's move to South
- Close the current row: \`valid_to = 2026-09-20\`, not current
- Insert a new row from 2026-09-20 with a **new key**
- Do both in **one transaction**, or neither
- Only a real change closes a row; a re-sent record is ignored
- Running the same batch twice leaves the same table
- Record the batch that opened and closed each version

### Engine differences matter
- Some engines do this in one \`MERGE\`; behaviour varies
- Concurrent writers need a uniqueness rule on current rows
- Back-dated changes split intervals: test for overlaps after`,
  narration:
    "Maintaining Type two history incrementally comes down to a small, careful pattern. Each load compares the incoming records with the current version of each member, and acts only on real changes. Customer C two oh one has a new region, South, effective from the twentieth of September. The load closes the current North row by setting its end date to the twentieth and marking it not current. Then it inserts a new South row, starting on the twentieth, with a brand new surrogate key. Both statements run in one transaction, so no reader ever sees a customer with no current row, or with two. Notice the conditions. The update only fires if the region has really changed, and the insert only happens if no current row remains. That means a re-sent record changes nothing, and running the same batch twice leaves the same table. Engines differ here. Some offer a single merge statement, and its exact behaviour varies. Concurrent writers need a uniqueness rule on current rows. And back-dated changes split intervals, so test for overlaps afterwards.",
}
