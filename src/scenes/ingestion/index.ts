import type { Scene } from '@graphlearning/flow'
import { etlVsElt } from './etl-vs-elt'
import { extractHandoff } from './extract-handoff'
import { changeStream } from './change-stream'
import { checkpoints } from './checkpoints'
import { quarantine } from './quarantine'
import { controlTotals } from './control-totals'

export const ingestionScenes: Scene[] = [etlVsElt, extractHandoff, changeStream, checkpoints, quarantine, controlTotals]
