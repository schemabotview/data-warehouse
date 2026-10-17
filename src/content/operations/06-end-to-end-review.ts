import type { Section } from '../types'

export const endToEndReview: Section = {
  id: 'end-to-end-review',
  title: 'End-to-end design review and continued practice',
  scene: 'retail-pipeline',
  focus: 'review',
  slide: `## End-to-end design review and continued practice

The retailer pipeline is complete. Review it as a whole, **with evidence**, not intentions.

### The review asks
- Late corrections: restate or adjust, and who is told?
- Deletion: does it reach every copy, backups included?
- Access: least privilege, tested as the real roles?
- Cost: is freshness bought on purpose?
- Recovery: has a restore been tested recently?

### Continued practice
- Redesign one model; run a small failure case end to end
- Change a metric with a parallel run; restore a disposable copy
- Completing the course is not operational readiness
- Next: SQL, dbt, platform engineering, or specialist modelling`,
  narration:
    "Across twelve courses, one retailer's pipeline has been built from end to end. Sources with contracts. Change capture into staging. Dimensions, facts and history. Repeatable loads and safe publication. Shared metric definitions. Reports and shares with governed access. The last step is to review it as a whole, with evidence rather than intentions. Ask how late corrections are handled, and who is told. Ask whether a deletion really reaches every copy, backups included. Ask whether access is least privilege, and whether it was tested as the real roles. Ask whether freshness is being bought on purpose, or by accident. Ask when a restore was last tested, and whether users hear about changes before they find them. Then keep practising, because completing a course is not the same as being ready to operate a warehouse. Redesign one model. Run a small failure case end to end. Change a metric through a parallel run. Restore a disposable copy and reconcile the replayed history. From here, companion study in SQL, dbt, platform engineering or specialist modelling builds on this foundation.",
}
