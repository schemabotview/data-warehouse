import type { Scene } from '@graphlearning/flow'
import { questionToAnswer } from './question-to-answer'
import { twoWorkloads } from './two-workloads'
import { fourArrangements } from './four-arrangements'
import { layers } from './layers'
import { expectations } from './expectations'

// One bundle per course folder, spread into src/scenes/index.ts.
export const architectureScenes: Scene[] = [questionToAnswer, twoWorkloads, fourArrangements, layers, expectations]
