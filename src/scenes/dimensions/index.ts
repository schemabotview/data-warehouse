import type { Scene } from '@graphlearning/flow'
import { salesStar } from './sales-star'
import { fanOut } from './fan-out'
import { keyMap } from './key-map'
import { categoryTree } from './category-tree'
import { specialMembers } from './special-members'
import { flatVsSnowflake } from './flat-vs-snowflake'

export const dimensionsScenes: Scene[] = [salesStar, fanOut, keyMap, categoryTree, specialMembers, flatVsSnowflake]
