import type { Scene } from '@graphlearning/flow'

// §5 — four roles with least privilege, a PostgreSQL 18 row-security policy as a labelled example,
// and the four controls that are often confused with each other.
export const accessBoundaries: Scene = {
  id: 'access-boundaries',
  title: 'Least privilege, by role',
  flow: 'TB',
  nodes: [
    {
      id: 'roles',
      label: 'Roles and what they may do',
      kind: 'table',
      headers: ['role', 'staging', 'marts', 'rows'],
      values: [
        ['loader', 'write', '—', 'all'],
        ['modeller', 'read', 'write', 'all'],
        ['analyst_north', '—', 'read', 'North only'],
        ['admin', 'all', 'all', 'bypasses policies'],
      ],
    },
    {
      id: 'rls',
      kind: 'code',
      filename: 'row_security.sql  (PostgreSQL 18 example)',
      label: `ALTER TABLE mart.sales_by_region ENABLE ROW LEVEL SECURITY;
CREATE POLICY north_only ON mart.sales_by_region
  FOR SELECT TO analyst_north
  USING (region = 'North');
-- table owner bypasses unless FORCE ROW LEVEL SECURITY;
-- superusers and BYPASSRLS roles always bypass.
-- test as the real role: SET ROLE analyst_north;`,
    },
    {
      id: 'controls',
      label: 'Four different controls',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'x-view', label: 'View', sub: 'filters what is asked', pattern: 'service', icon: 'funnel' },
        { id: 'x-rls', label: 'Row policy', sub: 'filters per role', pattern: 'service', icon: 'shieldcheck' },
        { id: 'x-mask', label: 'Masking', sub: 'hides values shown', pattern: 'service', icon: 'ban' },
        { id: 'x-encrypt', label: 'Encryption', sub: 'protects stored bytes', pattern: 'service', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'roles', target: 'rls', label: 'enforced, e.g. by' },
    { source: 'rls', target: 'controls', label: 'one of' },
  ],
}
