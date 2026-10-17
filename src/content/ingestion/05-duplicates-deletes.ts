import type { Section } from '../types'

export const duplicatesDeletes: Section = {
  id: 'duplicates-deletes',
  title: 'Duplicates, out-of-order changes and deletes',
  scene: 'change-stream',
  focus: 'tombstone',
  slide: `## Duplicates, out-of-order changes and deletes

Change streams are usually delivered **at least once**. Expect repeats, reordering and deletes.

### Duplicates and order
- Event 4 repeats event 2: same position, same key
- Keep one per (position, key); repeats are not new changes
- Apply in log order, so a late event cannot undo a newer one

### Deletes are not all the same
- A **delete event** carries the key and the before-image
- A **tombstone** is a transport marker for compaction
- A **business delete** — a cancelled order — is a status, not a delete
- Check what your connector emits before mapping any of them
- Preserve source id, operation, position, batch and provenance`,
  narration:
    "Most change streams promise at least once delivery. That means every change arrives, but some may arrive more than once, and not always in order. Event four here is a repeat of event two: the same log position and the same key. It is not a second change. So the loader keeps one event per position and key. It also applies events in log order, so that a late arriving older event can never overwrite a newer state. Deletes need even more care, because three different things can look like one. A delete event says a row was removed from the source, and usually carries what the row looked like before. A tombstone is something else: a marker some transports use so that old messages for that key can be compacted away. And a business delete, like a cancelled order, is not a delete at all. The row still exists, with a new status. Check exactly what your connector emits before mapping any of them. And keep the source id, operation, position, batch and provenance on every staged row.",
}
