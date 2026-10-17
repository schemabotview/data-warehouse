import type { Section } from '../types'

export const choosingPatterns: Section = {
  id: 'choosing-patterns',
  title: 'Selecting and combining patterns',
  scene: 'pattern-compare',
  focus: 'compare',
  slide: `## Selecting and combining patterns

No integration pattern wins everywhere. Choose against **stated requirements** and their costs.

### Compare on the same criteria
- Query usability, change isolation and traceability
- Time to first delivery, and the skills the team has
- Governance: who owns each shared definition

### Patterns combine
- A Data Vault or normalised core often **feeds** dimensional marts
- A dimensional bus can start small and gain a core later
- Every route still needs conformed, owned dimensions
- Vendor conventions are examples, not the method itself

### Outcome
- Explain cross-process consistency, then justify a pattern
- **Next:** integration choices decide what ingestion must capture`,
  narration:
    "This course has looked at three ways to integrate: a dimensional bus, a normalised core, and Data Vault. None of them wins everywhere, and claims that one always does deserve suspicion. Compare them on the same criteria. How easily can people query the result? How well is the model isolated from source changes? How traceable is every row back to its source? How quickly does the first useful model arrive, and does the team have the skills to build and run it? And who owns each shared definition? The table shows typical tendencies, not guarantees. The patterns also combine. A Data Vault or a normalised core very often feeds dimensional marts, so people query stars while the integration layer absorbs change. A dimensional bus can start small and gain a core later. Whatever the route, conformed dimensions with named owners are still needed. You can now explain cross-process consistency and justify an integration pattern against stated requirements and costs. Next, those choices decide what ingestion has to capture.",
}
