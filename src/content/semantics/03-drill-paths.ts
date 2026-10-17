import type { Section } from '../types'

export const drillPaths: Section = {
  id: 'drill-paths',
  title: 'Drill-down, roll-up and drill-across',
  scene: 'drill',
  focus: 'rollup',
  slide: `## Drill-down, roll-up and drill-across

People explore numbers by moving **along** a hierarchy, or **across** to another process.

### Along the product hierarchy
- **Drill down:** Home 144.00 → Kitchen 117.00, Tableware 27.00
- Then products: Kettle 68.00, Toaster 49.00, Mug ×4 27.00
- **Roll up:** each level sums exactly to the one above
- That only holds because this hierarchy is **strict**
- Each step keeps the same filters and metric

### Across to returns
- At product level, sales and returns share a conformed key
- Mug ×4: 27.00 sold, 18.00 returned
- Summarise each fact first, then combine
- Drill only to levels both facts actually share`,
  narration:
    "People rarely ask one question and stop. They see a total and want to know what is inside it, or how it compares with something else. Moving along a hierarchy covers the first. Start at the department: Home sold one hundred and forty four pounds in September. Drill down, and that splits into Kitchen at one hundred and seventeen and Tableware at twenty seven. Drill down again, to the kettle, the toaster and the mugs. Rolling up goes the other way, and each level adds up exactly to the one above it. That is only guaranteed because this product hierarchy is strict, with one parent per member. The breakfast set from the dimensions course would break it. Moving across covers the second kind of question. At the product level, sales and returns share a conformed product key, so you can step sideways from mug sales to mug returns: twenty seven pounds sold, eighteen returned. As before, each fact is summarised first and then combined. And you can only drill across at levels that both facts genuinely share.",
}
