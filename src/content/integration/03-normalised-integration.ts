import type { Section } from '../types'

export const normalisedIntegration: Section = {
  id: 'normalised-integration',
  title: 'Normalised integration and dimensional serving',
  scene: 'normalised-to-mart',
  focus: 'a-core',
  slide: `## Normalised integration and dimensional serving

Integration can happen in a **normalised core** before marts, or directly in conformed dimensions.

### A normalised integration layer
- Sources become integrated entities: customer, order, product
- Close to third normal form: each fact stored once
- Marts are **derived** from the core and can be rebuilt
- Isolates source change from every consuming mart

### Direct dimensional integration
- Sources load straight into conformed dimensions and facts
- Fewer layers, faster first delivery
- The bus and its owners carry the integration discipline

### The comparison is about costs
- Change isolation and reuse against delivery time and skill`,
  narration:
    "There is more than one place to do the integration work. One route builds a normalised integration layer first. Sources are reshaped into integrated business entities, like customer, order, order line and product, close to third normal form, so each fact is stored once. Dimensional marts are then derived from that core, and because they are derived, they can be rebuilt whenever their design changes. The core's main strength is isolation. When a source changes, the fix is made once, in the core, rather than in every mart. The other route integrates directly into conformed dimensions and facts. There are fewer layers, so the first useful model arrives sooner, and the bus matrix and the owners of each conformed dimension carry the integration discipline instead. This course only compares the two conceptually, without a full treatment of any one method. The honest comparison is about costs: change isolation and reuse on one side, against time to first delivery and the skills the team has on the other.",
}
