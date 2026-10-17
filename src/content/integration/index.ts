import type { Course } from '../types'
import { busMatrix } from './01-bus-matrix'
import { drillAcross } from './02-drill-across'
import { normalisedIntegration } from './03-normalised-integration'
import { dataVault } from './04-data-vault'
import { identityReconciliation } from './05-identity-reconciliation'
import { choosingPatterns } from './06-choosing-patterns'

export const integration: Course = {
  id: 'integration',
  title: 'Enterprise Integration and Modelling Alternatives',
  sections: [busMatrix, drillAcross, normalisedIntegration, dataVault, identityReconciliation, choosingPatterns],
}
