import type { Section } from '../types'

export const auditSharing: Section = {
  id: 'audit-sharing',
  title: 'Audit evidence and controlled sharing',
  scene: 'share',
  focus: 'audit',
  slide: `## Audit evidence and controlled sharing

Sharing data outside the team should be **narrow, temporary and recorded**.

### A share with a partner
- Weekly sales by category: aggregated, no customer columns
- A stated purpose, an expiry date, and no re-sharing
- Granted to a service identity, not a person's login

### Evidence on request
- **Grants:** who can read what, today
- **Reviews:** access re-certified on a schedule
- **Logs:** every read, kept and protected from editing

### Outcome
- Explain layered quality and access controls, and their gaps
- **Next:** operating the warehouse under real failures`,
  narration:
    "Sometimes data has to leave the team, for example to a partner running a joint promotion. Controlled sharing keeps that narrow, temporary and recorded. Narrow means sharing the least that serves the purpose: weekly sales by category, already aggregated, with no customer columns at all. Temporary means the share has a stated purpose and an expiry date, after which it stops working, and the terms forbid passing it on. Recorded means it is granted to a service identity rather than to someone's personal login, and every read is logged. That leads to audit evidence. When an auditor asks, you should be able to show three things quickly. The grants: who can read what, as of today. The reviews: evidence that access is re-certified on a schedule, so old grants do not linger. And the logs: every read, kept, and protected from being edited. You can now explain layered quality and governance controls, identify where they can be bypassed or do not reach, and trace responsibility and evidence. Next, those controls meet real failures in operation.",
}
