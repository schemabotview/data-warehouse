import type { Section } from '../types'

export const logCdc: Section = {
  id: 'log-cdc',
  title: 'Log-based CDC and source ordering',
  scene: 'change-stream',
  focus: 'lsn',
  slide: `## Log-based CDC and source ordering

**Change data capture** reads the database's own log, so every committed change is seen in commit order.

### Why not poll a timestamp?
- \`updated_at > :last_run\` never sees **deleted** rows
- Rows committed with the same timestamp can be skipped
- It trusts every writer to set \`updated_at\` correctly
- Each poll rescans the table; the log is read as it grows

### Reading the log
- Each event carries an operation and a **log position**
- Events can **arrive** out of order: 0/1A5 before 0/1A4
- The log position, not arrival, gives the true order
- Use the position as the tie-breaker within a key
- Exact semantics depend on the connector: check its docs`,
  narration:
    "The simplest way to find changes is to poll: select every row whose updated at timestamp is later than the last run. It has three blind spots. A deleted row is not there to be selected. Rows committed with the same timestamp as the last run can be skipped at the boundary. And it trusts every program that writes to the table to maintain the timestamp correctly. Log-based change data capture avoids all three by reading the database's own transaction log. Every committed insert, update and delete appears there, each with a log position that reflects commit order. Look at the stream as it arrived. The update to ten forty three, at position one A five, arrived before the update to ten forty four at one A four. Arrival order is not the order things happened. The log position is, so the loader orders by position, and uses it to break ties for the same key. The details vary between connectors, including how they number positions and report deletes, so read the connector's documentation for the version you run.",
}
