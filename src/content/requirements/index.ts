import type { Course } from '../types'
import { metricDefinitions } from './01-metric-definitions'
import { sourceProfiling } from './02-source-profiling'
import { sourceIdentity } from './03-source-identity'
import { eventBoundaries } from './04-event-boundaries'
import { timeCurrencyStatus } from './05-time-currency-status'
import { sourceContracts } from './06-source-contracts'

export const requirements: Course = {
  id: 'requirements',
  title: 'Requirements, Source Reality and Data Contracts',
  sections: [metricDefinitions, sourceProfiling, sourceIdentity, eventBoundaries, timeCurrencyStatus, sourceContracts],
}
