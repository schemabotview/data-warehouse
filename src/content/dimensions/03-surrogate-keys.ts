import type { Section } from '../types'

export const surrogateKeys: Section = {
  id: 'surrogate-keys',
  title: 'Natural and surrogate keys',
  scene: 'key-map',
  focus: 'sk',
  slide: `## Natural and surrogate keys

A **natural key** comes from a source. A **surrogate key** is issued by the warehouse and means nothing else.

### Natural keys collide
- Both stores say K-01, meaning different things
- Web shop K-01 is a kettle; marketplace K-01 is a scale
- A natural key is unique only **within its source**
- Qualify it: source plus id identifies the product
- A bare-id join swaps products without an error

### Facts join on the surrogate
- \`dim_product\` gives each source product its own integer key
- The natural key stays as an attribute, for lookups and audits
- Versions of one product can each get their own key later
- A source re-keying its products stays contained in one table
- Facts store the surrogate, never the natural key`,
  narration:
    "Every source system identifies its records somehow, and those identifiers are natural keys. The trouble is that they are only unique inside the system that issued them. In the web shop, K-zero-one is a kettle. In the marketplace, K-zero-one is a kitchen scale, and the marketplace's kettle is T-zero-two, which is the web shop's toaster. Join on the bare id and products quietly swap identities. The first fix is to qualify the natural key with its source. The second is to issue a surrogate key: a plain integer, owned by the warehouse, that means nothing outside it. Each source product gets its own key, and facts join on that key. The natural key is not thrown away. It stays in the dimension as an attribute, so you can still look a product up and trace it back. Surrogates also leave room for history, because one product can later have several versions, each with its own key. And if a source re-keys its catalogue, the change stays contained in one mapping table.",
}
