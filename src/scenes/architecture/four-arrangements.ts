import type { Scene } from '@graphlearning/flow'

// §3 — four arrangements as peers in a 2×2, each answering the same four questions: what it holds,
// who owns it, where history lives, where quality is checked. Below, the arrangement most platforms
// actually run — the four combined — so the frame says "overlapping", not "ladder".
export const fourArrangements: Scene = {
  id: 'four-arrangements',
  title: 'Overlapping arrangements, not a ladder',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      label: 'Four arrangements, four questions each',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'warehouse',
          label: 'Warehouse',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'wh-holds', label: 'Modelled tables', sub: 'integrated across processes', pattern: 'storage', icon: 'warehouse' },
            { id: 'wh-owner', label: 'Central team', sub: 'owns shared definitions', pattern: 'user', icon: 'users' },
            { id: 'wh-history', label: 'History', sub: 'modelled, versioned', pattern: 'service', icon: 'history' },
            { id: 'wh-quality', label: 'Quality', sub: 'checked on load', pattern: 'network', icon: 'shieldcheck' },
          ],
        },
        {
          id: 'mart',
          label: 'Mart',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'mart-holds', label: 'Subject slice', sub: 'one area, e.g. sales', pattern: 'storage', icon: 'chartpie' },
            { id: 'mart-owner', label: 'Department', sub: 'owns its own questions', pattern: 'user', icon: 'users' },
            { id: 'mart-history', label: 'History', sub: 'inherited, or rebuilt', pattern: 'service', icon: 'history' },
            { id: 'mart-quality', label: 'Quality', sub: 'only as good as its feed', pattern: 'network', icon: 'shieldcheck' },
          ],
        },
        {
          id: 'lake',
          label: 'Lake',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'lake-holds', label: 'Open files', sub: 'stored first, modelled later', pattern: 'storage', icon: 'folder' },
            { id: 'lake-owner', label: 'Platform team', sub: 'owns storage, not meaning', pattern: 'user', icon: 'users' },
            { id: 'lake-history', label: 'History', sub: 'raw files, if retained', pattern: 'service', icon: 'history' },
            { id: 'lake-quality', label: 'Quality', sub: 'checked on read, if at all', pattern: 'warn', icon: 'shieldcheck' },
          ],
        },
        {
          id: 'lakehouse',
          label: 'Lakehouse',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'lh-holds', label: 'Tables on files', sub: 'transactions + schemas', pattern: 'storage', icon: 'layers' },
            { id: 'lh-owner', label: 'Still needs owners', sub: 'for every definition', pattern: 'warn', icon: 'users' },
            { id: 'lh-history', label: 'History', sub: 'table versions + models', pattern: 'service', icon: 'history' },
            { id: 'lh-quality', label: 'Quality', sub: 'constraints, then checks', pattern: 'network', icon: 'shieldcheck' },
          ],
        },
      ],
    },
    {
      id: 'mixed',
      label: 'How they usually combine',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'mix-lake', label: 'Lake', sub: 'lands raw files', pattern: 'storage', icon: 'folder' },
        { id: 'mix-wh', label: 'Warehouse', sub: 'integrates, keeps history', pattern: 'storage', icon: 'warehouse' },
        { id: 'mix-mart', label: 'Marts', sub: 'serve each department', pattern: 'storage', icon: 'chartpie' },
      ],
      edges: [
        { source: 'mix-lake', target: 'mix-wh' },
        { source: 'mix-wh', target: 'mix-mart' },
      ],
    },
  ],
  edges: [{ source: 'kinds', target: 'mixed', label: 'not a ladder — a mix' }],
}
