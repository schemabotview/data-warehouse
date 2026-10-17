import type { Section } from '../types'

export const rolePlayingDates: Section = {
  id: 'role-playing-dates',
  title: 'Date/time and role-playing dimensions',
  scene: 'sales-star',
  focus: 'when',
  slide: `## Date/time and role-playing dimensions

A **date dimension** turns a raw date into the calendar attributes people actually ask about.

### One calendar, built once
- One row per day: month, quarter, weekday, holiday flag
- Fiscal periods live here too, so no query recomputes them
- Time of day, if needed, is a separate, smaller dimension
- Build years ahead, so every future date still joins

### One table, two roles
- A sales line has an **order date** and a **ship date**
- Both point at the same \`dim_date\`, through different keys
- Name each role clearly: order month ≠ ship month
- Order 1044: ordered in September, shipped in October
- Fiscal weeks and calendar months do not line up
- A bare "date" column leaves readers guessing the role`,
  narration:
    "Dates deserve their own dimension. A raw date column tells you the day, but people ask about months, quarters, weekdays, holidays and fiscal periods, and those rules should be worked out once, in one table, not recomputed differently in every query. So the date dimension has one row per calendar day, with every attribute anyone groups by already filled in. If time of day matters, it goes in a separate, much smaller dimension, rather than multiplying the calendar by every minute. Now, a sales line has more than one date. It has the date it was ordered and the date it was shipped. Both are dates, so both point at the same date dimension, but through two different keys. That is a role-playing dimension: one physical table, playing two roles. The roles must be named clearly, because they answer different questions. Order ten forty four was ordered on the thirtieth of September and shipped on the first of October, so it belongs to September by one role and to October by the other.",
}
