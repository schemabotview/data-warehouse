import type { Section } from '../types'

export const qualityLayers: Section = {
  id: 'quality-layers',
  title: 'Quality rules and layered checks',
  scene: 'checks-by-layer',
  focus: 'intervals',
  slide: `## Quality rules and layered checks

A quality check belongs where its problem can first be **seen**, and where failing it can be **acted on**.

### Checks by layer
- **Staging:** counts agree with the source; types parse
- **Integration:** keys unique at the grain; intervals valid
- **Serving:** no orphan keys; data fresh within its target
- **Business:** totals match the finance ledger, within tolerance
- Each check is code, versioned with the models

### Each check declares its severity
- **Block:** duplicate keys hold publication
- **Warn:** late data publishes, flagged as stale
- **Investigate:** an odd trend goes to its owner
- A check that never fails may be testing nothing
- Every failure names who acts on it
- Checks run on every load, not on request`,
  narration:
    "Data quality is not one test at the end. Each check belongs at the layer where its problem can first be seen, and where a failure can actually be acted on. In staging, the checks are about arrival: do the counts agree with the source, and does every value parse to its type? In integration, they are about structure: are keys unique at the declared grain, and do the Type two intervals have no overlaps and no gaps? In serving, they are about use: does every foreign key resolve, and is the data fresh enough for its target? And at the business layer, the checks compare against the outside world, such as whether September's revenue matches the finance ledger within an agreed tolerance. Every check also declares a severity. Duplicate keys block publication, because every total built on them would be wrong. Late data might publish with a stale flag. An unusual trend goes to its owner to investigate, because unusual is not the same as wrong. A check that has never failed may not be testing anything. And every failure names the person who acts on it.",
}
