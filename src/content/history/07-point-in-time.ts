import type { Section } from '../types'

export const pointInTime: Section = {
  id: 'point-in-time',
  title: 'Point-in-time answers and bitemporal awareness',
  scene: 'three-answers',
  focus: 'known-then',
  slide: `## Point-in-time answers and bitemporal awareness

"September sales by region" has at least **three** honest answers. Ask which past is meant.

### Three questions, one history
- **As-was:** regions as they were when each sale happened
- **Current view:** every sale under today's region
- **As known then:** what the report said on 1 October
- The totals differ too: 140.00 today, 144.00 on 1 October
- None is wrong; a report must say which it shows

### What each one needs
- As-was: Type 2 keys stored on the fact
- Current view: a join through the current version
- Known-then: **recorded-at** times as well as valid times
- Type 2 alone is not a full bitemporal model
- **Outcome:** say which temporal question a model can answer`,
  narration:
    "Put everything in this course together and a simple question turns out to have several answers. September sales by region. The as-was answer reports each sale under the region the customer had when they bought: fifty two pounds in the North, thirty four in the South. The current view reports every sale under the customer's region today, so C two oh one's sales all move to the South. And the as-known-then answer reproduces what the report said on the first of October, before the price of ten forty two was corrected, so even the total is different: one hundred and forty four rather than one hundred and forty. Each answer needs something different from the model. As-was needs the Type two key stored on the fact. Current view needs a join through the current version. As-known-then needs a second kind of time, when each row was recorded, alongside when it was valid. That is bitemporal modelling, and Type two alone does not provide it. Being clear about which of these questions a model can answer is the outcome of this course.",
}
