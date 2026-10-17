import type { Section } from '../types'

export const busMatrix: Section = {
  id: 'bus-matrix',
  title: 'Conformed dimensions and bus matrices',
  scene: 'bus-matrix',
  focus: 'matrix',
  slide: `## Conformed dimensions and bus matrices

A **bus matrix** lists business processes against the dimensions they share. It is the integration plan on one page.

### Reading the matrix
- Rows are processes: sales, returns, inventory, fulfilment
- Columns are dimensions; a tick means the process uses it
- A column ticked by many rows must be **conformed**
- Conformed: same keys, same attributes, same meaning

### A tick is a claim to check
- Returns record warehouse SKUs, not shop product ids
- Sales and logistics use two different region lists
- Each needs a mapping before the tick is true
- Every conformed dimension has **one named owner**
- Build each process's star in turn, on the shared dimensions`,
  narration:
    "Once there is more than one business process, the warehouse has to decide what they share. The bus matrix is the tool for that. Each row is a process: sales, returns, inventory, fulfilment. Each column is a dimension. A tick says that the process is described by that dimension. Columns with many ticks, like date, product and location, are the ones that have to be conformed. Conformed means more than having a table with the right name. It means the same keys, the same attributes and the same meaning, wherever the dimension is used, so that sales by product and returns by product can be lined up against each other. And a tick is a claim, so check it. Here, the returns system records warehouse stock codes rather than the shop's product ids. Sales and logistics turn out to use two different lists of regions. Each needs a mapping before its tick is true. Give every conformed dimension a single named owner. Then the processes can be built one star at a time, all plugged into the same shared dimensions.",
}
