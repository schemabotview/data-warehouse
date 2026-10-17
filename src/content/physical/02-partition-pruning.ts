import type { Section } from '../types'

export const partitionPruning: Section = {
  id: 'partition-pruning',
  title: 'Partitioning and pruning',
  scene: 'pruning',
  focus: 'pruned',
  slide: `## Partitioning and pruning

**Partitioning** splits a table by a column's value. **Pruning** skips partitions a query cannot need.

### Two predicates, one month
- **A:** a range on \`order_date\` itself — August and October are pruned
- **B:** the same month, but inside a function on the column
- Many engines cannot prune on B, so they scan every partition
- Both return the same rows; only the work differs
- Write range predicates on the raw column

### Choosing and checking
- Partition on a column that queries filter by, often a date
- Avoid thousands of tiny partitions; each has overhead
- Pruning rules differ by engine and version
- Confirm pruning in the plan, never by assumption
- Partitions also make dropping old periods cheap`,
  narration:
    "Partitioning splits one large table into pieces by the value of a column. Here the sales fact is partitioned by month on the order date. The benefit comes from pruning: when a query's filter rules out a partition, the engine can skip it entirely. Compare two ways of asking for September. Query A states a range directly on the order date column: on or after the first of September, and before the first of October. The engine can compare that range with each partition's bounds, so it reads September and prunes August and October. Query B asks for the same month, but wraps the column in a function that formats it as text first. Many engines cannot see through that function to the partition bounds, so they scan every partition. Both queries return exactly the same rows. Only the work is different. Choose a partition column that queries actually filter by, which is very often a date. Avoid thousands of tiny partitions, because each one carries overhead. And since pruning rules vary by engine and version, confirm it in the query plan rather than assuming it.",
}
