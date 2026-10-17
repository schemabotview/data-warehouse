import type { Section } from '../types'

export const starJoins: Section = {
  id: 'star-joins',
  title: 'Star schemas and join cardinality',
  scene: 'fan-out',
  focus: 'dup-key',
  slide: `## Star schemas and join cardinality

A star joins each fact row to **exactly one** row in each dimension. That promise is what keeps totals true.

### Expected: many to one
- Many sales lines point at product key 12
- Product key 12 must appear **once** in \`dim_product\`
- Then a join adds attributes but never adds rows

### Actual: one duplicated key
- A bad load wrote key 12 twice, with two categories
- Two toaster lines became **four** joined rows
- 98.00 GBP of revenue is reported as **196.00**
- Nothing errors — the query runs, and the number is wrong

### The guard
- Test dimension keys for uniqueness on every load
- Annotate each join in the design: 1 : 1, N : 1 or N : M
- A total that moves when a dimension is joined is a red flag`,
  narration:
    "A star schema rests on one promise. Every fact row joins to exactly one row in each dimension. Many fact rows can point at the same product, but that product appears in the dimension once. When the promise holds, joining a dimension only adds descriptive columns. It never adds rows, so totals stay the same however many dimensions you join. Now break the promise. A faulty load writes product key twelve twice, once under Kitchen and once under Small appliances. There are only two toaster lines in the fact table, but each now matches two dimension rows, so the join returns four. Ninety eight pounds of revenue is reported as one hundred and ninety six. And nothing complains. The query runs, the dashboard renders, and the number is simply wrong. That is why cardinality is annotated on every join in the design, and why a uniqueness test on each dimension key runs on every load, before anyone queries it.",
}
