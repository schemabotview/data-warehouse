import type { Course } from '../types'
import { declaringGrain } from './01-declaring-grain'
import { starJoins } from './02-star-joins'
import { surrogateKeys } from './03-surrogate-keys'
import { hierarchies } from './04-hierarchies'
import { rolePlayingDates } from './05-role-playing-dates'
import { junkAndUnknown } from './06-junk-and-unknown'
import { snowflakeTradeoffs } from './07-snowflake-tradeoffs'

export const dimensions: Course = {
  id: 'dimensions',
  title: 'Grain, Dimensions and Readable Models',
  sections: [declaringGrain, starJoins, surrogateKeys, hierarchies, rolePlayingDates, junkAndUnknown, snowflakeTradeoffs],
}
