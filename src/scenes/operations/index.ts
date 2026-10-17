import type { Scene } from '@graphlearning/flow'
import { jobVsProduct } from './job-vs-product'
import { staleDashboard } from './stale-dashboard'
import { recovery } from './recovery'
import { evolution } from './evolution'
import { parallelRun } from './parallel-run'
import { retailPipeline } from './retail-pipeline'

export const operationsScenes: Scene[] = [jobVsProduct, staleDashboard, recovery, evolution, parallelRun, retailPipeline]
