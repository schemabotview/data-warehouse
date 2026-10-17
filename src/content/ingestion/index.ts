import type { Course } from '../types'
import { etlEltStaging } from './01-etl-elt-staging'
import { fullVsIncremental } from './02-full-vs-incremental'
import { logCdc } from './03-log-cdc'
import { watermarksCheckpoints } from './04-watermarks-checkpoints'
import { duplicatesDeletes } from './05-duplicates-deletes'
import { schemaDrift } from './06-schema-drift'
import { ingestionReconciliation } from './07-ingestion-reconciliation'

export const ingestion: Course = {
  id: 'ingestion',
  title: 'Ingestion and Change Capture',
  sections: [etlEltStaging, fullVsIncremental, logCdc, watermarksCheckpoints, duplicatesDeletes, schemaDrift, ingestionReconciliation],
}
