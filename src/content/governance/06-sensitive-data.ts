import type { Section } from '../types'

export const sensitiveData: Section = {
  id: 'sensitive-data',
  title: 'Sensitive data, retention and deletion propagation',
  scene: 'pii-trail',
  focus: 'backup',
  slide: `## Sensitive data, retention and deletion propagation

A sensitive value is copied far more often than anyone plans. Deletion has to reach **every copy**.

### One synthetic email address
- Staging holds it raw; the customer dimension keeps it for matching
- Marts mask it; an export sent it to an agency
- Query logs captured it as a literal in a filter
- Backups hold it until they expire

### Deleting it
- Each copy needs its own route **and** its own check
- Backups expire on their schedule; a restore must not revive it
- Exports need the recipient to confirm deletion
- Platform-specific enforcement varies; verify it
- This is a policy shape, not legal guidance`,
  narration:
    "Sensitive values travel further than anyone plans. Follow one synthetic email address through the platform. Staging holds it raw, exactly as the source sent it. The customer dimension keeps it, because identity matching needs it. The marts mask it for analysts. An export once sent it to a marketing agency. The query logs captured it too, because someone filtered on it directly. And every backup taken since then holds a copy until that backup expires. Now a deletion request arrives for this customer. Deleting the row from the customer dimension handles one copy out of six. Each copy needs its own deletion route, and its own check that the deletion really happened: a count of zero in staging, a search of the logs, a signed confirmation from the agency. Backups usually cannot be edited, so they expire on their schedule, and restore procedures must make sure the deleted value is not brought back. How each step is enforced depends on the platform, so verify it there. And this is the shape of a policy, not legal guidance.",
}
