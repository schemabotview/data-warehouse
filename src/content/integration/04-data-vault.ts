import type { Section } from '../types'

export const dataVault: Section = {
  id: 'data-vault',
  title: 'Data Vault hubs, links and satellites',
  scene: 'vault',
  focus: 'satellite',
  slide: `## Data Vault hubs, links and satellites

Data Vault separates **keys**, **relationships** and **descriptive history** into different tables.

### Three kinds of table
- **Hub:** one row per business key, with load time and source
- **Link:** one row per relationship between hubs
- **Satellite:** descriptive attributes, a new row on each change
- Loads are insert-only, so every arrival is traceable

### What it does not decide
- Hashing a key does not decide **real-world identity**
- Keys must be canonicalised before hashing: case, spaces
- Hash collisions are rare, but the policy must exist
- People still query **marts** built on top
- Conventions here are illustrative, not a full specification`,
  narration:
    "Data Vault takes a different approach to the integration layer. It separates three things that a dimensional model keeps together. Hubs hold business keys, and nothing else: one row per customer number or order number, with when it was first loaded and from which source. Links hold relationships, one row for each pairing of hubs, such as this customer placed this order. Satellites hold the descriptive attributes, and they add a new row whenever those attributes change, which is how customer C two oh one's move from North to South is kept. Loads only ever insert, so every arrival can be traced back to its source and load time. That makes the pattern strong for audit and for absorbing changing sources. But be clear about its limits. Hashing a business key does not decide whether two keys are the same real-world customer. Keys need canonical forms before hashing, and a collision policy should exist, however rare collisions are. And people still need marts built on top to query it. The conventions shown are illustrative, not a full specification.",
}
