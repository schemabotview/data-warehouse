import type { Section } from '../types'

export const metadataLineage: Section = {
  id: 'metadata-lineage',
  title: 'Technical and business metadata and lineage',
  scene: 'lineage',
  focus: 'business-def',
  slide: `## Technical and business metadata and lineage

**Technical lineage** shows where a number came from. **Business metadata** says what it means and who answers for it.

### Technical lineage of the revenue tile
- Web orders → staging batches → \`fact_sales\` → the tile
- Each hop names a version: batches, model commit
- Built from code and logs, so it stays current
- Column-level lineage shows which field feeds which

### Business metadata
- A glossary entry: what "net merchandise revenue" counts
- Its metric version, and what changed between versions
- A named **owner** and **steward**, and where to ask
- Lineage alone cannot say what a number **means**
- Link the two through the metric's name`,
  narration:
    "There are two kinds of metadata, and a warehouse needs both. Technical lineage shows where a number came from. The revenue tile on the finance dashboard reads from the sales fact. The sales fact was built by a specific commit of the model code, from specific staging batches. Those batches came from the web shop's orders table. Because this lineage is built from code and load logs, rather than drawn by hand, it can stay current as the platform changes. But lineage cannot say what the number means. That is the job of business metadata. A glossary entry says what net merchandise revenue counts: booked lines, net of VAT, in pounds, with returns as a separate metric. It records the metric's version, and what changed between versions. And it names who is accountable: an owner who decides the definition, a steward who looks after it day to day, and a place where people can ask questions. The two kinds are linked through the metric's name, so anyone looking at the tile can reach both its origin and its meaning.",
}
