import type { Section } from '../types'

export const sourceContracts: Section = {
  id: 'source-contracts',
  title: 'Acceptance examples and source contracts',
  scene: 'source-contract',
  focus: 'acceptance',
  slide: `## Acceptance examples and source contracts

Turn the definition into **examples with expected answers**, and the source assumptions into a contract.

### Acceptance examples
- September's booked lines must total **144.00 GBP**
- Order 1042, sent twice, must be counted **once**
- Written before any table exists, checked after every load

### A source contract states
- Grain, keys, allowed values and time zone
- Lateness, schema-change notice, retention, permitted use
- A contract is enforceable only when **observed** and **owned**

### Next
- With the requirement bounded, the model's grain can be declared`,
  narration:
    "The last step before design is to make the requirement testable. Start with acceptance examples: small cases with the answer agreed in advance. September's booked lines must total one hundred and forty four pounds. Order ten forty two, which the source sent twice, must be counted once. Ten forty four, paid in euros, must be converted at the rate for its order date. These examples are written before any table exists, and they are checked again after every load. Then capture what you are assuming about the source as a contract. This one is illustrative, not a standard format. It states the grain and the key, the allowed status values, the time zone, how late rows may arrive, how much notice a schema change needs, how long data is kept, and what it may be used for. But a contract in a file enforces nothing on its own. It needs every load to check it, and a named team that answers when it breaks. With the requirement bounded like this, the next course can declare the model's grain.",
}
