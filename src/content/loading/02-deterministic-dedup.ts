import type { Section } from '../types'

export const deterministicDedup: Section = {
  id: 'deterministic-dedup',
  title: 'Deterministic transforms and deduplication',
  scene: 'dedup',
  focus: 'tiebreak',
  slide: `## Deterministic transforms and deduplication

A transform is **deterministic** when the same input always gives the same output. Deduplication is where that breaks most often.

### Keeping the latest state per order
- Order by an explicit event rule: log position, then sequence
- The rule gives a **total order**, so exactly one row wins
- The exact duplicate of 1043 collapses to one row
- Count exact duplicates as load evidence

### "Latest row" by load time
- All four rows share one \`_loaded_at\`: a tie
- With ties, the database may return **any** row
- Two runs can disagree, and nobody notices
- Test it: run twice and compare row for row
- Avoid \`now()\`, random values and unordered limits in models`,
  narration:
    "A transformation is deterministic when the same input always produces the same output. That property is what makes a load repeatable, and deduplication is where it most often quietly breaks. Here are four staged rows for two orders. Order ten forty three appears three times: once as packed, and twice as shipped, with the shipped event delivered twice. The goal is to keep the latest state of each order. The right query ranks rows within each order by an explicit event rule: the log position first, then a sequence number within it. That gives a total order, so exactly one row wins, and every run picks the same one. The tempting query ranks by load time instead. But all four rows arrived in the same batch, with the same load time. When the ordering ties, the database is free to return any of the tied rows, and it may choose differently on different runs. Two runs can disagree, and nobody notices. The same caution applies to current time functions, random values and limits without an ordering.",
}
