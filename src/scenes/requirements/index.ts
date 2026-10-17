import type { Scene } from '@graphlearning/flow'
import { metricContract } from './metric-contract'
import { profile } from './profile'
import { headerVsLine } from './header-vs-line'
import { orderLifecycle } from './order-lifecycle'
import { semanticsGrid } from './semantics-grid'
import { sourceContract } from './source-contract'

export const requirementsScenes: Scene[] = [metricContract, profile, headerVsLine, orderLifecycle, semanticsGrid, sourceContract]
