import type { Course } from '../types'
import { starQueryFilters } from './01-star-query-filters'
import { grainAggregation } from './02-grain-aggregation'
import { drillPaths } from './03-drill-paths'
import { windowsPeriods } from './04-windows-periods'
import { metricContracts } from './05-metric-contracts'
import { nullsAndBridges } from './06-nulls-and-bridges'
import { reportValidation } from './07-report-validation'

export const semantics: Course = {
  id: 'semantics',
  title: 'Analytical Queries and Semantic Meaning',
  sections: [starQueryFilters, grainAggregation, drillPaths, windowsPeriods, metricContracts, nullsAndBridges, reportValidation],
}
