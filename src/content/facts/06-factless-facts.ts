import type { Section } from '../types'

export const factlessFacts: Section = {
  id: 'factless-facts',
  title: 'Factless facts and coverage',
  scene: 'coverage',
  focus: 'answer',
  slide: `## Factless facts and coverage

Some fact tables have **no measures at all**. The row itself is the fact.

### Coverage: what could have happened
- \`fact_promo_coverage\`: product × day × promotion
- It records **eligibility**, whether or not anything sold
- Sales alone cannot show what was promoted and ignored
- Built from the promotion calendar, not from sales

### Asking the negative question
- Coverage minus sales = promoted, but not sold
- Toaster on 28 and 30 Sept: on offer, no sale
- Count rows to measure: products promoted per day
- Both facts must share conformed date and product keys

### Factless event facts
- Attendance, page views, sign-ups: the event is the measure`,
  narration:
    "Some fact tables contain no numbers at all, and they are still facts. The row itself records that something was true. This one records promotion coverage: which products were on which promotion, on which days. It does not say anything sold. It says what was eligible. That matters because of the kind of question it unlocks. A sales table can only describe what happened. It has no row for a toaster that sat on promotion and did not sell, because nothing happened. So ask the question as a difference. Take everything that was covered, and subtract everything that sold. What remains is the list of products that were promoted and ignored: both products on the twenty eighth, and the toaster on the thirtieth. Counting coverage rows also gives useful measures, like how many products were on offer each day. The same idea applies to events that carry no amount, such as attendance or sign ups. There, the event itself is the measure, and counting rows is how you add it up.",
}
