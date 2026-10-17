import type { Course } from '../types'
import { businessVsProcessingTime } from './01-business-vs-processing-time'
import { scdType1Type2 } from './02-scd-type1-type2'
import { effectiveIntervals } from './03-effective-intervals'
import { historicalLookup } from './04-historical-lookup'
import { lateArrivals } from './05-late-arrivals'
import { correctionsRestatement } from './06-corrections-restatement'
import { pointInTime } from './07-point-in-time'

export const history: Course = {
  id: 'history',
  title: 'History and Temporal Correctness',
  sections: [businessVsProcessingTime, scdType1Type2, effectiveIntervals, historicalLookup, lateArrivals, correctionsRestatement, pointInTime],
}
