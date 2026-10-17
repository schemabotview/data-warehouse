import type { Section } from '../types'

export const snowflakeTradeoffs: Section = {
  id: 'snowflake-tradeoffs',
  title: 'Denormalisation and snowflake trade-offs',
  scene: 'flat-vs-snowflake',
  focus: 'snowflake',
  slide: `## Denormalisation and snowflake trade-offs

A dimension can be **flattened** into one wide table, or **snowflaked** into a chain of lookups.

### Flattened
- Category and department repeated on every product row
- One join from the fact; easy for people to read
- A category rename rewrites many rows

### Snowflaked
- Each category name stored once, in its own table
- Every query pays extra joins; users meet more tables

### Choosing
- Readability usually favours flat dimensions for serving
- The workload and engine decide the cost; measure, do not assume
- **Outcome:** a star with explicit grain, keys, roles and joins`,
  narration:
    "The last modelling choice in this course is how far to normalise a dimension. Flattened, the product dimension is one wide table. Every product row repeats its category and its department. That repetition costs some storage, and renaming a category means rewriting every product in it. But a query needs only one join from the fact, and a person reading the model sees everything about a product in one place. Snowflaked, the same attributes are split into a chain of tables: products point at categories, and categories point at departments. Each name is stored once. In exchange, every query pays for extra joins, and the people using the model have more tables to find and understand. For serving models, readability usually wins, which is why flat dimensions are the common default. But the real cost depends on your workload and your engine, so measure it rather than assume it. You can now construct a star and explain its grain, its keys, its dimension roles, and what every join is expected to do. Next come the facts themselves.",
}
