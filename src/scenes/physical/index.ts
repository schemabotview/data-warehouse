import type { Scene } from '@graphlearning/flow'
import { rowCol } from './row-col'
import { pruning } from './pruning'
import { threeMechanisms } from './three-mechanisms'
import { skew } from './skew'
import { matAgg } from './mat-agg'
import { explain } from './explain'
import { costFreshness } from './cost-freshness'

export const physicalScenes: Scene[] = [rowCol, pruning, threeMechanisms, skew, matAgg, explain, costFreshness]
