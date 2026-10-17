import type { Scene } from '@graphlearning/flow'
import { busMatrix } from './bus-matrix'
import { drillAcross } from './drill-across'
import { normalisedToMart } from './normalised-to-mart'
import { vault } from './vault'
import { identity } from './identity'
import { patternCompare } from './pattern-compare'

export const integrationScenes: Scene[] = [busMatrix, drillAcross, normalisedToMart, vault, identity, patternCompare]
