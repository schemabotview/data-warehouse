import type { Scene } from '@graphlearning/flow'
import { checksByLayer } from './checks-by-layer'
import { revenueDrop } from './revenue-drop'
import { lineage } from './lineage'
import { owners } from './owners'
import { accessBoundaries } from './access-boundaries'
import { piiTrail } from './pii-trail'
import { share } from './share'

export const governanceScenes: Scene[] = [checksByLayer, revenueDrop, lineage, owners, accessBoundaries, piiTrail, share]
