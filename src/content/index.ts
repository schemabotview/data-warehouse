import { architecture } from './architecture'
import { requirements } from './requirements'
import { dimensions } from './dimensions'
import { facts } from './facts'
import { history } from './history'
import { integration } from './integration'
import { ingestion } from './ingestion'
import { loading } from './loading'
import { semantics } from './semantics'
import { physical } from './physical'
import { governance } from './governance'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [architecture.id]: architecture,
  [requirements.id]: requirements,
  [dimensions.id]: dimensions,
  [facts.id]: facts,
  [history.id]: history,
  [integration.id]: integration,
  [ingestion.id]: ingestion,
  [loading.id]: loading,
  [semantics.id]: semantics,
  [physical.id]: physical,
  [governance.id]: governance,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
