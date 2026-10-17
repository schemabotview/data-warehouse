import type { Section } from '../types'

export const warehouseMartLake: Section = {
  id: 'warehouse-mart-lake',
  title: 'Warehouse, mart, lake and lakehouse',
  scene: 'four-arrangements',
  focus: 'lakehouse',
  slide: `## Warehouse, mart, lake and lakehouse

Four overlapping arrangements. They combine freely, and none is the next rung on a maturity ladder.

### What each one is
- **Warehouse:** integrated, modelled, governed tables for the whole business
- **Mart:** a subject-area slice, often owned by one department
- **Lake:** files in open formats, stored first and modelled later
- **Lakehouse:** lake storage with table behaviour — transactions, schemas, SQL

### What to ask of any of them
- Who owns the **definitions**, and who owns the **data**?
- Where is **history** kept, and where is **quality** checked?
- Most platforms **mix** them — a lake feeding a warehouse feeding marts
- A product label answers neither question`,
  narration:
    "These four words get used as if they were stages, as if every company graduates from a warehouse to a lake to a lakehouse. They are better read as arrangements that overlap. A warehouse holds integrated, modelled tables shared across the business, usually with a central team owning the common definitions. A mart is a slice for one subject area, like sales, often owned by the department that asks its questions. A lake stores files in open formats first and leaves modelling for later, which is flexible, but the platform team that runs it owns storage, not meaning. A lakehouse adds table behaviour on top of those files: transactions, schemas and SQL. That is useful, but it still needs someone to own every definition. Real platforms mix these freely. So when you meet one, skip the label and ask two questions. Who owns the definitions and the data? And where are history and quality actually handled?",
}
