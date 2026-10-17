import type { Section } from '../types'

export const rowVsColumn: Section = {
  id: 'row-vs-column',
  title: 'Row and column storage models',
  scene: 'row-col',
  focus: 'col-scan',
  slide: `## Row and column storage models

How rows are laid out on storage decides how much an analytical query has to **read**.

### The same four rows, two layouts
- **Row layout:** each block holds whole rows, all columns together
- **Column layout:** each block holds the values of one column
- The query needs 2 of 6 columns: date and amount
- A row layout reads every column anyway; a column layout reads two
- Many warehouses store columns; many OLTP systems, rows

### What else changes
- Similar values side by side **compress** well
- Writing or updating one row favours the row layout
- This sketch is conceptual, not any engine's page format
- PostgreSQL's default heap is a row layout; check each engine`,
  narration:
    "Physical design starts with how rows are laid out on storage, because that decides how much data a query has to read. Here are the same four sales rows in two layouts. In a row layout, each block holds whole rows, with every column of a row stored together. In a column layout, each block holds the values of just one column. Now run an analytical query that needs only two of the six columns: the order date and the net amount. The row layout has to read every block, and with it every column, even the four it does not need. The column layout reads only the two column blocks it needs. Over millions of rows, that difference dominates. Column layouts have a second advantage: similar values sit next to each other, so they compress well. But they are not better at everything. Writing or updating a single row touches one place in a row layout, and many places in a column layout. This picture is a concept, not any engine's actual format. PostgreSQL's default table storage is row oriented, so check what each engine really does.",
}
