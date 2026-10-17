import type { Scene } from '@graphlearning/flow'

// §1 — a conceptual sketch of the same rows stored row-wise and column-wise, read by one analytical
// query. Conceptual only: no engine's page format, PostgreSQL's included, is drawn here.
export const rowCol: Scene = {
  id: 'row-col',
  title: 'Same rows, two layouts',
  flow: 'TB',
  nodes: [
    {
      id: 'query',
      kind: 'code',
      filename: 'needs_two_columns.sql',
      label: `SELECT order_date, SUM(net_gbp)   -- 2 of 6 columns
FROM   fact_sales
GROUP  BY order_date;`,
    },
    {
      id: 'layouts',
      label: 'Conceptual storage — not any engine’s format',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'row-scan',
          label: 'row layout',
          sub: 'each block holds whole rows',
          kind: 'table',
          headers: ['block', 'contents'],
          values: [
            ['1', '1041|1|09-03|Kettle|1|34.00'],
            ['', '1041|2|09-03|Mug ×4|2|18.00'],
            ['2', '1042|1|09-14|Toaster|1|49.00'],
            ['', '1043|1|09-21|Mug ×4|1|9.00'],
          ],
        },
        {
          id: 'col-scan',
          label: 'column layout',
          sub: 'each block holds one column',
          kind: 'table',
          headers: ['column', 'values'],
          values: [
            ['order_id', '1041 1041 1042 1043'],
            ['order_date ✓', '09-03 09-03 09-14 09-21'],
            ['product', 'Kettle Mug Toaster Mug'],
            ['net_gbp ✓', '34.00 18.00 49.00 9.00'],
          ],
        },
      ],
    },
    {
      id: 'effects',
      label: 'What changes',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'e-read', label: 'Bytes read', sub: 'all columns vs two', pattern: 'service', icon: 'harddrive' },
        { id: 'e-compress', label: 'Compression', sub: 'like values sit together', pattern: 'service', icon: 'package' },
        { id: 'e-write', label: 'Single-row writes', sub: 'favour the row layout', pattern: 'network', icon: 'pencil' },
      ],
    },
  ],
  edges: [
    { source: 'query', target: 'layouts' },
    { source: 'layouts', target: 'effects' },
  ],
}
