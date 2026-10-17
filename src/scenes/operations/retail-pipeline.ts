import type { Scene } from '@graphlearning/flow'

// §6 — the whole retailer pipeline built across the twelve courses, with the questions an end-to-end
// review asks of it. Each card names the course that taught that stage.
export const retailPipeline: Scene = {
  id: 'retail-pipeline',
  title: 'The whole pipeline, reviewed',
  flow: 'TB',
  nodes: [
    {
      id: 'pipeline',
      label: 'Retailer pipeline',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'rp-sources', label: 'Sources + contracts', sub: 'requirements', pattern: 'storage', icon: 'database' },
        { id: 'rp-ingest', label: 'CDC + staging', sub: 'ingestion', pattern: 'network', icon: 'waves' },
        { id: 'rp-model', label: 'Dims + facts', sub: 'dimensions, facts, history', pattern: 'service', icon: 'star' },
        { id: 'rp-load', label: 'Loads + publish', sub: 'loading', pattern: 'service', icon: 'lock' },
        { id: 'rp-meaning', label: 'Metrics', sub: 'semantics', pattern: 'service', icon: 'scroll' },
        { id: 'rp-users', label: 'Reports + shares', sub: 'governance', pattern: 'external', icon: 'barchart' },
      ],
    },
    {
      id: 'review',
      label: 'end-to-end review — the questions',
      sub: 'answered with evidence, not intentions',
      kind: 'table',
      headers: ['concern', 'question', 'evidence'],
      values: [
        ['late corrections', 'restate or adjust? who is told?', 'policy + change log'],
        ['deletion', 'does it reach every copy?', 'per-copy checks'],
        ['access', 'least privilege, tested as roles?', 'grants + tests'],
        ['cost', 'freshness bought on purpose?', 'runs vs target'],
        ['recovery', 'restore tested this quarter?', 'restore report'],
        ['consumers', 'do users know what changed?', 'release notes'],
      ],
    },
  ],
  edges: [{ source: 'pipeline', target: 'review', label: 'reviewed against' }],
}
