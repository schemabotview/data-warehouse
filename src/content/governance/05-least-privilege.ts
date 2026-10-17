import type { Section } from '../types'

export const leastPrivilege: Section = {
  id: 'least-privilege',
  title: 'Least privilege and analytical access',
  scene: 'access-boundaries',
  focus: 'rls',
  slide: `## Least privilege and analytical access

Each role gets **only** the access its work needs. The boundaries follow the layers.

### Four roles
- **Loader** writes staging, and nothing else
- **Modeller** reads staging and writes marts
- **Analyst** reads marts — North rows only, by policy
- **Admin** can do everything, so admin use is logged

### Row security in PostgreSQL 18, as an example
- A policy filters rows per role: \`region = 'North'\`
- The table owner bypasses it, unless it is **forced**
- Superusers and \`BYPASSRLS\` roles always bypass it
- Test as the real role, never as an admin

### Different tools, different problems
- Views, row policies, masking and encryption are not interchangeable`,
  narration:
    "Least privilege means each role gets only the access its work needs, and in a warehouse the boundaries follow the layers. The loader writes to staging, and nothing else. The modeller reads staging and writes marts. The analyst reads marts, and here a row policy restricts the North analyst to North rows. The admin can do everything, which is exactly why admin access is kept rare and logged. Row security in PostgreSQL eighteen is a good labelled example of how such a policy works, and of its edges. The policy filters rows for a role, here where the region is North. But the table's owner bypasses it, unless row security is forced on the table. Superusers, and roles with the bypass attribute, always bypass it. So a policy tested as an admin will appear to show everything, and prove nothing. Test as the real role. Finally, four controls are often confused. A view filters what is asked for. A row policy filters per role. Masking hides values that are shown. Encryption protects stored bytes. They solve different problems.",
}
