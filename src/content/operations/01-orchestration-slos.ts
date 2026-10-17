import type { Section } from '../types'

export const orchestrationSlos: Section = {
  id: 'orchestration-slos',
  title: 'Orchestration and service objectives',
  scene: 'job-vs-product',
  focus: 'slo',
  slide: `## Orchestration and service objectives

A successful job is not the same as a correct, complete, **timely** data product.

### Monday morning
- Every job in the orchestrator finished green
- The sales mart holds data only to 19:00 Sunday
- The marketplace source never arrived
- Users will see flat sales, with nothing marked wrong
- The checks passed: nothing that arrived was wrong

### Objectives on the product
- State them in terms users notice: fresh by 07:00, all sources in
- Measure them on the data, not on job status
- Each objective has an **owner** and an alert
- A missed objective tells users, before they find out
- Orchestration runs the graph; objectives judge the result`,
  narration:
    "The last course is about running the warehouse, and it opens with a common trap. It is Monday morning, and every job in the orchestrator finished green: ingestion, models, publication. By the orchestrator's measure, the night went perfectly. Now look at the data product. The sales mart only contains data up to seven o'clock on Sunday evening. The marketplace source never arrived at all. The checks that did run passed, because nothing in the data that arrived was wrong. Users opening the dashboard will see flat sales, and nothing tells them anything is amiss. So service objectives belong on the product, in terms its users would notice. Fresh to within two hours by seven in the morning. All sources loaded. No blocking check failures. And when an objective is missed, users are told within thirty minutes. Each objective is measured on the data itself, not on job status, and each has an owner and an alert. The orchestrator runs the graph. The objectives judge whether the result is fit for use.",
}
