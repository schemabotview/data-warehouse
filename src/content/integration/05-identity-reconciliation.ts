import type { Section } from '../types'

export const identityReconciliation: Section = {
  id: 'identity-reconciliation',
  title: 'Master/reference data and identity reconciliation',
  scene: 'identity',
  focus: 'match',
  slide: `## Master/reference data and identity reconciliation

Deciding that two source records are **one customer** is a business rule, not a join.

### Matching C-201 and M-95
- Canonicalise first: trim spaces, lower-case the email
- Then apply a **stated rule**, versioned and owned
- Both ids map to master MC-17 in a **crosswalk**
- The crosswalk records rule version and match date
- Facts keep source ids; reports roll up to the master

### Costs of getting it wrong
- A **false merge** joins two people's purchases and data
- A missed match splits one customer's history
- Matches must be reversible: unmerge keeps the trail
- Reference data — regions, currencies — needs owners too
- Personal data in matching follows its privacy rules`,
  narration:
    "Integration eventually meets a hard question: are these two records the same customer? The web shop has customer C two oh one, Ana Price. The marketplace has M ninety five, A. Price. Their email addresses look alike, but one has capitals and the other a leading space. Deciding they are one person is a business rule, not something a join can settle. So canonicalise first: trim the spaces and lower-case the email. Then apply a matching rule that is written down, versioned and owned by a named team. Here, both emails must match and both must be verified. When the rule matches, both source ids are mapped to one master id, M C seventeen, in a crosswalk table that also records which rule version made the match and when. Mistakes cut both ways. A false merge combines two different people's purchases and personal data. A missed match splits one customer's history in two. So matches must be reversible, with an unmerge that keeps the trail. And the same discipline applies to reference data, like regions and currency codes.",
}
