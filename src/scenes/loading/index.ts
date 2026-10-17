import type { Scene } from '@graphlearning/flow'
import { loadDag } from './load-dag'
import { dedup } from './dedup'
import { keyResolution } from './key-resolution'
import { scd2Merge } from './scd2-merge'
import { crashRerun } from './crash-rerun'
import { publish } from './publish'
import { backfill } from './backfill'

export const loadingScenes: Scene[] = [loadDag, dedup, keyResolution, scd2Merge, crashRerun, publish, backfill]
