import type { Section } from '../types'

export const businessDecisions: Section = {
  id: 'business-decisions',
  title: 'Business decisions and analytical workloads',
  scene: 'question-to-answer',
  focus: 'question',
  slide: `## Business decisions and analytical workloads

A warehouse exists to answer business questions **repeatably**. Start from the question, not from the tables.

### One question, traced end to end
- **Question:** what was net merchandise revenue last month?
- **Sources:** orders, order lines, returns
- **Ingestion** copies changes out without slowing the shop
- **Integration** applies one definition of "net" and keeps history
- **Serving** publishes a model a report can query directly
- The **report** shows the answer with its definition attached

### Why this is a different workload
- The answer spans **months of history**, not one live order
- The same number must come out **every time**, under a named owner`,
  narration:
    "Every warehouse starts with a decision someone needs to make. Here the question is simple to say: what was net merchandise revenue last month? Answering it is not simple. The evidence lives in operational systems, in orders, order lines and returns, which were built to take orders, not to explain them. So the data is copied out by ingestion, without slowing the shop down. Integration then applies one agreed definition of net, in one currency, before tax and after returns, and it keeps every past month answerable. Finally, a serving model, here a sales star, is published in a shape the report can query directly. Notice what makes this an analytical workload. It reads months of history rather than one live order, and it has to give the same answer every time someone asks. That only happens when every step along this path has an owner who can say what correct means.",
}
