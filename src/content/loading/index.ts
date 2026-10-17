import type { Course } from '../types'
import { dependencyOrder } from './01-dependency-order'
import { deterministicDedup } from './02-deterministic-dedup'
import { factKeyResolution } from './03-fact-key-resolution'
import { incrementalHistory } from './04-incremental-history'
import { idempotentRetry } from './05-idempotent-retry'
import { atomicPublication } from './06-atomic-publication'
import { backfillReplay } from './07-backfill-replay'
import { loadEvidence } from './08-load-evidence'

export const loading: Course = {
  id: 'loading',
  title: 'Repeatable Loads and Safe Publication',
  sections: [dependencyOrder, deterministicDedup, factKeyResolution, incrementalHistory, idempotentRetry, atomicPublication, backfillReplay, loadEvidence],
}
