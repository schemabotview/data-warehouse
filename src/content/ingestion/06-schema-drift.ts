import type { Section } from '../types'

export const schemaDrift: Section = {
  id: 'schema-drift',
  title: 'Schema drift and quarantine',
  scene: 'quarantine',
  focus: 'quarantine',
  slide: `## Schema drift and quarantine

Sources change shape without warning. The load must decide what to accept, and **say what it held back**.

### Batch 79
- A new column, \`gift_note\`: additive, so accept and record it
- Order 1049's amount arrives as '49,00': not numeric
- Load the compatible rows; **quarantine** 1049 with a reason
- Never coerce silently: '49,00' is not 49 or 4900 by guesswork
- A dropped or renamed column is incompatible too

### Make the gap visible
- Completeness is now **2 of 3 rows** for this batch
- Reports built on it carry that flag until the replay
- The source owner is told, per the contract
- After the fix, replay quarantined rows in their original order`,
  narration:
    "Sources change shape, and they rarely ask first. In batch seventy nine two things changed. A new column appeared, a gift note. That is an additive change, so the load can accept it and record that the schema moved. The second change is worse. Order ten forty nine's amount arrived as text with a comma, forty nine comma zero zero, which no numeric column can accept. The tempting fixes are to fail the whole batch, or to coerce the value and move on. Failing everything holds back good rows for one bad one. Coercing silently is worse, because the guess could be forty nine or four thousand nine hundred. So the compatible rows load, and order ten forty nine goes to quarantine, with the reason it was held. Then make the gap visible. This batch is now two rows out of three complete, and anything built on it carries that flag until the gap is closed. The source owner is told, as the contract requires. And once the parser is fixed, the quarantined rows are replayed in their original order.",
}
