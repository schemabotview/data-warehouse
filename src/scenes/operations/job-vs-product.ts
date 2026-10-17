import type { Scene } from '@graphlearning/flow'

// §1 — every job green, and the data product still not fit for use. Service objectives are stated on
// the product, in terms its users notice, with an owner each.
export const jobVsProduct: Scene = {
  id: 'job-vs-product',
  title: 'Green jobs, late data',
  flow: 'TB',
  nodes: [
    {
      id: 'views',
      label: 'Monday 07:00, two views of the same night',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'jobs',
          label: 'Orchestrator',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'j-ingest', label: 'Ingest', sub: 'succeeded', pattern: 'service', icon: 'circlecheck' },
            { id: 'j-models', label: 'Models', sub: 'succeeded', pattern: 'service', icon: 'circlecheck' },
            { id: 'j-publish', label: 'Publish', sub: 'succeeded', pattern: 'service', icon: 'circlecheck' },
          ],
        },
        {
          id: 'product',
          label: 'Data product',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'p-fresh', label: 'Fresh?', sub: 'data to 19:00 Sunday', pattern: 'warn', icon: 'clock' },
            { id: 'p-complete', label: 'Complete?', sub: 'marketplace missing', pattern: 'warn', icon: 'search' },
            { id: 'p-correct', label: 'Correct?', sub: 'checks passed', pattern: 'service', icon: 'scale' },
          ],
        },
      ],
    },
    {
      id: 'slo',
      label: 'service objectives — sales mart',
      sub: 'stated on the product, owned by people',
      kind: 'table',
      headers: ['objective', 'target', 'this morning', 'owner'],
      values: [
        ['fresh to', 'within 2 h, by 07:00', '12 h behind', 'data engineering'],
        ['complete', 'all sources loaded', 'web only', 'data engineering'],
        ['checks pass', 'no blocking failures', 'met', 'analytics eng.'],
        ['users told', 'banner within 30 min', 'pending', 'on-call'],
      ],
    },
  ],
  edges: [{ source: 'views', target: 'slo', label: 'judged against' }],
}
