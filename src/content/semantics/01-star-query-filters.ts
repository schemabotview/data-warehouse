import type { Section } from '../types'

export const starQueryFilters: Section = {
  id: 'star-query-filters',
  title: 'Star joins and filter behaviour',
  scene: 'star-query',
  focus: 'group',
  slide: `## Star joins and filter behaviour

A star query filters on dimensions, joins to the fact, and groups at the grain the question asks for.

### Kitchen and Tableware, September
- Filter on the date dimension: \`month = '2026-09'\`
- Join each dimension on its surrogate key: many to one
- Group by category: 117.00 and 27.00
- **Expected total** 144.00 — the booked September figure
- Filter on attributes, never on surrogate key values

### One join too many
- Add the promotion coverage fact: two rows per kettle and toaster
- Kitchen doubles to **234.00**; mugs, never promoted, vanish
- One join both **fans out** and **filters out**
- Know the total first; check every join you add
- Inner joins drop unmatched rows; left joins keep them`,
  narration:
    "A typical star query does three things. It filters on dimension attributes, it joins those dimensions to the fact through their surrogate keys, and it groups the result at the grain the question asks for. Here the question is September's sales by category. The filter is on the date dimension's month. The product join is many to one, so it only adds the category to each fact row. Grouping gives one hundred and seventeen pounds for Kitchen and twenty seven for Tableware. Before trusting that, check it against a total you already know. Together they make one hundred and forty four, which is the booked September figure from the requirements course, so nothing was lost or doubled. Now add one more join, to the promotion coverage fact from the facts course. Kettles and toasters each have two promotion days, so every one of their sales rows is matched twice, and Kitchen doubles to two hundred and thirty four. Mugs were never promoted, so they have no match and vanish. One join both fanned out and filtered out. Knowing the expected total is what exposes it.",
}
