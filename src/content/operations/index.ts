import type { Course } from '../types'
import { orchestrationSlos } from './01-orchestration-slos'
import { incidentDiagnosis } from './02-incident-diagnosis'
import { backupRestore } from './03-backup-restore'
import { schemaMetricEvolution } from './04-schema-metric-evolution'
import { migrationParallelRun } from './05-migration-parallel-run'
import { endToEndReview } from './06-end-to-end-review'

export const operations: Course = {
  id: 'operations',
  title: 'Operating and Evolving the Warehouse',
  sections: [orchestrationSlos, incidentDiagnosis, backupRestore, schemaMetricEvolution, migrationParallelRun, endToEndReview],
}
