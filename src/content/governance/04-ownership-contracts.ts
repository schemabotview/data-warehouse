import type { Section } from '../types'

export const ownershipContracts: Section = {
  id: 'ownership-contracts',
  title: 'Ownership, catalogues and change contracts',
  scene: 'owners',
  focus: 'steward',
  slide: `## Ownership, catalogues and change contracts

Every asset — source, table or metric — has a named **owner** who answers for it.

### The catalogue records
- Owner team and steward role for each asset
- Whether a contract exists, and its notice period
- Consumers, discovered from lineage
- An owner nobody can reach is not an owner
- Stewards keep descriptions and examples current

### A breaking change, by contract
- Dropping a column is proposed, not just done
- The steward reviews its impact using lineage
- Consumers are told in advance: 30 days here
- The new version runs **in parallel** with the old
- The old one is retired only when consumers have moved
- Additive changes still get a release note`,
  narration:
    "Every asset in the warehouse, a source table, a model, a metric, needs a named owner: someone who answers for it. The catalogue is where that is written down. For each asset it records the owning team, the steward who looks after it day to day, whether a contract exists, and how much notice a change requires. Lineage adds the list of consumers, the people and reports that depend on it. And a simple test applies: an owner nobody can reach is not really an owner. Contracts matter most when something has to change. Suppose someone wants to drop the region column from the sales fact. Under a contract, that is proposed rather than just done. The steward uses lineage to see what would break. Consumers are told in advance, here thirty days. The new version is released alongside the old one, so both run in parallel for a while. And the old version is retired only once its consumers have moved across. That process is slower than editing a table, and the slowness is the point: nobody's report breaks overnight without warning.",
}
