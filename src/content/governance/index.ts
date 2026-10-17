import type { Course } from '../types'
import { qualityLayers } from './01-quality-layers'
import { anomalyInvestigation } from './02-anomaly-investigation'
import { metadataLineage } from './03-metadata-lineage'
import { ownershipContracts } from './04-ownership-contracts'
import { leastPrivilege } from './05-least-privilege'
import { sensitiveData } from './06-sensitive-data'
import { auditSharing } from './07-audit-sharing'

export const governance: Course = {
  id: 'governance',
  title: 'Quality, Metadata and Governance',
  sections: [qualityLayers, anomalyInvestigation, metadataLineage, ownershipContracts, leastPrivilege, sensitiveData, auditSharing],
}
