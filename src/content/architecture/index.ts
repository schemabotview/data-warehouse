import type { Course } from '../types'
import { businessDecisions } from './01-business-decisions'
import { oltpVsOlap } from './02-oltp-vs-olap'
import { warehouseMartLake } from './03-warehouse-mart-lake'
import { logicalLayers } from './04-logical-layers'
import { serviceExpectations } from './05-service-expectations'
import { rolesAndTradeoffs } from './06-roles-and-tradeoffs'

export const architecture: Course = {
  id: 'architecture',
  title: 'Analytical Decisions and Warehouse Architecture',
  sections: [businessDecisions, oltpVsOlap, warehouseMartLake, logicalLayers, serviceExpectations, rolesAndTradeoffs],
}
