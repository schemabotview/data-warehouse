import type { Scene } from '@graphlearning/flow'
import { twoClocks } from './two-clocks'
import { scdVersions } from './scd-versions'
import { asWasJoin } from './as-was-join'
import { inferredMember } from './inferred-member'
import { restate } from './restate'
import { threeAnswers } from './three-answers'

export const historyScenes: Scene[] = [twoClocks, scdVersions, asWasJoin, inferredMember, restate, threeAnswers]
