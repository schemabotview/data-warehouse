import type { Section } from '../types'

export const distributionSkew: Section = {
  id: 'distribution-skew',
  title: 'Distribution, joins and data skew',
  scene: 'skew',
  focus: 'hot-key',
  slide: `## Distribution, joins and data skew

On a distributed engine, rows that join must meet on the **same node**. Moving them is the cost.

### Two join strategies
- **Broadcast:** copy the small dimension to every node
- **Repartition:** hash both sides by the join key, then move them
- Broadcasting suits small dimensions; repartition suits two large sides
- How small is small depends on engine and memory

### Skew
- One key with far more rows lands on one node
- Unknown customer **-1** is a classic hot key
- The slowest node sets the pace for the whole query
- Watch rows per node, not only the total
- Fixes: handle the hot key apart, or spread it with a salt
- A single-node plan cannot show any of this movement`,
  narration:
    "On a distributed engine, data is spread across several nodes, and two rows can only be joined when they are on the same node. Getting them there is where much of the cost goes. There are two common strategies. A broadcast join copies the small side, usually a dimension, to every node, so the large fact never moves. A repartition join hashes both sides by the join key and moves each row to the node responsible for its key. Broadcasting suits small dimensions. When both sides are large, repartitioning is the usual choice. Repartitioning has a weakness, and it is skew. If one key has far more rows than the others, all of them land on one node. The Unknown customer, minus one, is a classic example, because every order without a customer shares it. The chart is illustrative, but the shape is typical: three nodes finish quickly, and the query waits for the fourth. Fixes include handling the hot key separately, or salting it to spread it out. And note that a single-node plan, like PostgreSQL's, cannot show any of this movement.",
}
