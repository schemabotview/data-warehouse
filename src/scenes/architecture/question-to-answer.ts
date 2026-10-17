import type { Scene } from '@graphlearning/flow'
import { retailSources } from '../shared/retail'

// §1 — one business question traced from source events to the report that answers it. TB so the
// board binds on height; the source and integration rows are containers so the board has width too.
export const questionToAnswer: Scene = {
  id: 'question-to-answer',
  title: 'One question, end to end',
  flow: 'TB',
  nodes: [
    { id: 'question', label: 'Net revenue, last month?', sub: 'the decision comes first', pattern: 'user', icon: 'users' },
    { id: 'sources', label: 'Operational sources', pattern: 'group', cols: 3, children: retailSources() },
    { id: 'ingest', label: 'Ingestion', sub: 'copies changes out', pattern: 'network', icon: 'waves' },
    {
      id: 'integrate',
      label: 'Integration',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'define', label: 'One definition', sub: 'net of returns, GBP, ex VAT', pattern: 'service', icon: 'scroll' },
        { id: 'history', label: 'History kept', sub: 'every month stays answerable', pattern: 'service', icon: 'history' },
        { id: 'checks', label: 'Reconciled', sub: 'totals match the sources', pattern: 'service', icon: 'scale' },
      ],
    },
    { id: 'serve', label: 'Sales star', sub: 'shaped for the question', pattern: 'storage', icon: 'star' },
    { id: 'report', label: 'Finance report', sub: 'same answer every time', pattern: 'external', icon: 'barchart' },
  ],
  edges: [
    { source: 'question', target: 'sources', label: 'needs evidence from' },
    { source: 'sources', target: 'ingest' },
    { source: 'ingest', target: 'integrate' },
    { source: 'integrate', target: 'serve', label: 'publish' },
    { source: 'serve', target: 'report', label: 'query' },
  ],
}
