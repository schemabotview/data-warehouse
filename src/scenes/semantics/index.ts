import type { Scene } from '@graphlearning/flow'
import { starQuery } from './star-query'
import { bridge } from './bridge'
import { drill } from './drill'
import { periods } from './periods'
import { semanticContract } from './semantic-contract'
import { nullZero } from './null-zero'
import { cellToSource } from './cell-to-source'

export const semanticsScenes: Scene[] = [starQuery, bridge, drill, periods, semanticContract, nullZero, cellToSource]
