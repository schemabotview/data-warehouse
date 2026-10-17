import type { Section } from '../types'

export const plansStatistics: Section = {
  id: 'plans-statistics',
  title: 'Plans, statistics and workload evidence',
  scene: 'explain',
  focus: 'actual-rows',
  slide: `## Plans, statistics and workload evidence

A query plan shows the optimiser's **estimates**. Executing it shows what actually happened.

### Estimate versus actual
- The scan was estimated at 1,200 rows; it returned 5
- Large gaps point to **stale or missing statistics**
- Bad estimates lead to bad join and memory choices
- Refresh statistics, then compare the plan again
- Many engines gather statistics automatically; verify it

### Gathering evidence safely
- \`EXPLAIN ANALYZE\` **executes** the statement it explains
- Use read-only queries, on a disposable copy
- Record cache state, concurrency and data volume
- Keep the plan with the query, data and time it ran
- Compare plans, not single timings
- PostgreSQL 18 is the example here; other engines differ`,
  narration:
    "Every engine turns a query into a plan, and the plan is built on estimates: how many rows each step will produce, based on the statistics the engine keeps about the data. Asking for the plan alone shows those estimates. Executing it, with explain analyze in PostgreSQL, shows what actually happened beside them. This output is illustrative and shortened, from PostgreSQL eighteen, and it is not a measured run. The scan of September's partition was estimated at twelve hundred rows. It actually returned five. A gap that large usually means the statistics are stale or missing, perhaps because the partition was loaded after they were last gathered. It matters because the optimiser chooses join methods and memory based on those estimates, so a wrong estimate can produce a poor plan. Refresh the statistics and compare the plan again. Gather this evidence safely. Explain analyze really executes the statement, so use read-only queries on a disposable copy. And record the conditions, cache state, concurrency and data volume, because timings without them cannot be compared.",
}
