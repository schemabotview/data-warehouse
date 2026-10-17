import type { Scene } from '@graphlearning/flow'
import { threeFacts } from './three-facts'
import { stockSums } from './stock-sums'
import { returnRate } from './return-rate'
import { coverage } from './coverage'
import { freightAllocation } from './freight-allocation'
import { absentVsZero } from './absent-vs-zero'

export const factsScenes: Scene[] = [threeFacts, stockSums, returnRate, coverage, freightAllocation, absentVsZero]
