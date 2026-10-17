import type { Scene } from '@graphlearning/flow'

// §7 — refreshes per day as a function of the refresh interval: arithmetic, not a benchmark. Cost
// follows the refreshes under whatever billing model the platform uses.
export const costFreshness: Scene = {
  id: 'cost-freshness',
  title: 'Freshness has a price',
  flow: 'TB',
  nodes: [
    {
      id: 'curve',
      kind: 'plot',
      label: 'Refreshes per day = 1440 ÷ minutes between refreshes',
      plot: {
        x: { min: 0, max: 240, step: 30, label: 'minutes between refreshes' },
        y: { min: 0, max: 300, step: 50, label: 'refreshes / day' },
        axes: 'corner',
        series: [
          { kind: 'line', points: [5, 10, 15, 20, 30, 45, 60, 90, 120, 180, 240].map((m) => [m, 1440 / m] as [number, number]).filter(([, y]) => y <= 300), label: 'refreshes' },
          { kind: 'marker', at: [60, 24], color: 'service', label: 'target: hourly' },
          { kind: 'marker', at: [15, 96], color: 'warn', label: '15 min: 4× the runs' },
        ],
      },
    },
    {
      id: 'target',
      label: 'options for the sales dashboard',
      sub: 'decide with the owner, against the stated need',
      kind: 'table',
      headers: ['refresh', 'runs / day', 'worst staleness', 'fits need?'],
      values: [
        ['every 15 min', '96', '15 min', 'yes, at 4× runs'],
        ['hourly', '24', '60 min', 'yes — chosen'],
        ['nightly', '1', '24 h', 'no: need is 2 h'],
      ],
    },
  ],
  edges: [{ source: 'curve', target: 'target' }],
}
