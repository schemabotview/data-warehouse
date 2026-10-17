import type { Course } from '../types'
import { rowVsColumn } from './01-row-vs-column'
import { partitionPruning } from './02-partition-pruning'
import { clusteringIndexing } from './03-clustering-indexing'
import { distributionSkew } from './04-distribution-skew'
import { aggregatesMaterialisation } from './05-aggregates-materialisation'
import { plansStatistics } from './06-plans-statistics'
import { costTradeoffs } from './07-cost-tradeoffs'

export const physical: Course = {
  id: 'physical',
  title: 'Physical Design, Performance and Cost',
  sections: [rowVsColumn, partitionPruning, clusteringIndexing, distributionSkew, aggregatesMaterialisation, plansStatistics, costTradeoffs],
}
