import type { Scene } from '@graphlearning/flow'

// §7 — the same product attributes flattened into one dimension, and snowflaked into a chain of
// lookups, with what each costs underneath.
export const flatVsSnowflake: Scene = {
  id: 'flat-vs-snowflake',
  title: 'Flatten or snowflake',
  cols: 2,
  nodes: [
    {
      id: 'flat',
      label: 'Flattened',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'flat-product',
          label: 'dim_product',
          sub: 'one join from the fact',
          kind: 'table',
          headers: ['key', 'name', 'category', 'department'],
          values: [
            ['11', 'Kettle', 'Kitchen', 'Home'],
            ['12', 'Toaster', 'Kitchen', 'Home'],
            ['13', 'Mug ×4', 'Tableware', 'Home'],
          ],
        },
        {
          id: 'flat-tradeoffs',
          kind: 'list',
          label: 'Trade-offs',
          icon: 'scale',
          pattern: 'service',
          framed: true,
          items: ['Readable: one table to learn', 'Simple, fast star joins', 'Category name repeated per row', 'Rename touches many rows'],
        },
      ],
    },
    {
      id: 'snowflake',
      label: 'Snowflaked',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'sf-product',
          label: 'dim_product',
          kind: 'table',
          headers: ['key', 'name', 'category_key'],
          values: [
            ['11', 'Kettle', '1'],
            ['13', 'Mug ×4', '2'],
          ],
        },
        {
          id: 'sf-category',
          label: 'dim_category',
          kind: 'table',
          headers: ['category_key', 'category', 'dept_key'],
          values: [
            ['1', 'Kitchen', '1'],
            ['2', 'Tableware', '1'],
          ],
        },
        {
          id: 'sf-tradeoffs',
          kind: 'list',
          label: 'Trade-offs',
          icon: 'snowflake',
          pattern: 'network',
          framed: true,
          items: ['Each name stored once', 'Extra joins in every query', 'More tables for users to find'],
        },
      ],
      edges: [
        { source: 'sf-product', target: 'sf-category' },
        { source: 'sf-category', target: 'sf-tradeoffs' },
      ],
    },
  ],
  edges: [],
}
