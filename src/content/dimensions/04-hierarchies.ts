import type { Section } from '../types'

export const hierarchies: Section = {
  id: 'hierarchies',
  title: 'Descriptive dimensions and hierarchies',
  scene: 'category-tree',
  focus: 'non-strict',
  slide: `## Descriptive dimensions and hierarchies

Dimensions carry the words people filter and group by. Some of those words form a **hierarchy**.

### Product → category → department
- Each product rolls up to a category, each category to a department
- A **strict** hierarchy has exactly one parent per member
- Strict hierarchies can be summed level by level safely
- Ragged ones, with missing levels, need the same check

### When a member has two parents
- The breakfast set sits in both Kitchen and Tableware
- Summing the tree counts it twice: 313.00 instead of 253.00
- Choose: a **primary parent**, a weighted **bridge**, or show the overlap
- Check strictness in the data; do not assume it from the design`,
  narration:
    "Dimensions hold the descriptive words people use to slice numbers: product names, categories, regions. Often those words nest. A product belongs to a category, and a category belongs to a department. When every member has exactly one parent, the hierarchy is strict, and you can roll totals up level by level with confidence: the categories add up to the department. Here is where that breaks. The breakfast set is a kettle and mugs sold together, and merchandising lists it under both Kitchen and Tableware. Sum each category, then add the categories together, and the set is counted twice. The department shows three hundred and thirteen pounds, when only two hundred and fifty three was actually sold. There are honest ways out. Give each product one primary parent for reporting. Use a bridge table with weights that split it, so the shares add to one. Or keep both parents and show the overlap explicitly. What you cannot do is assume a hierarchy is strict because the diagram looks like a tree. Check it in the data.",
}
