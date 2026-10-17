import type { Course } from '../types'
import { transactionFacts } from './01-transaction-facts'
import { periodicSnapshots } from './02-periodic-snapshots'
import { accumulatingSnapshots } from './03-accumulating-snapshots'
import { additivity } from './04-additivity'
import { ratiosAndDistinct } from './05-ratios-and-distinct'
import { factlessFacts } from './06-factless-facts'
import { multipleGrains } from './07-multiple-grains'
import { sparseEvents } from './08-sparse-events'

export const facts: Course = {
  id: 'facts',
  title: 'Facts, Measures and Aggregation Correctness',
  sections: [transactionFacts, periodicSnapshots, accumulatingSnapshots, additivity, ratiosAndDistinct, factlessFacts, multipleGrains, sparseEvents],
}
