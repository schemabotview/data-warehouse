import type { Section } from '../types'

export const oltpVsOlap: Section = {
  id: 'oltp-vs-olap',
  title: 'OLTP versus OLAP',
  scene: 'two-workloads',
  focus: 'scan',
  slide: `## OLTP versus OLAP

The same order data serves two different workloads. A design tuned for one makes the other slow, or quietly wrong.

### Operational — OLTP
- Reads and writes **a few rows by key**, many times a second
- Only the current state matters; old values are **overwritten**
- Normalised tables keep each update small and consistent
- Tuned for **many small, concurrent writes**

### Analytical — OLAP
- Reads **many rows but few columns**, then aggregates them
- Compares periods, so **history has to be kept**
- Shaped for reading: wide tables, stable definitions
- Runs **beside** the system taking orders, never inside it`,
  narration:
    "On the left is the work an operational system is built for. A checkout updates one order, found by its key, and moves on. It does this thousands of times a day, so it touches as few rows as it can, and it simply overwrites the old status. That is exactly right for running a shop. On the right is an analytical question over the same data. It reads every order line, but only three of its columns, and adds them up by month. It needs September to stay September next year, which means old values cannot be overwritten. And notice the October row: the month is still open, so its total is partial, and a good answer says so. These two shapes of work pull in opposite directions. Narrow, normalised, current tables suit the first. Wide, historical, read-optimised tables suit the second. That tension is why analysis usually runs beside the operational system rather than inside it.",
}
