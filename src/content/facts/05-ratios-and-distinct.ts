import type { Section } from '../types'

export const ratiosAndDistinct: Section = {
  id: 'ratios-and-distinct',
  title: 'Ratios, distinct counts and weighted measures',
  scene: 'return-rate',
  focus: 'ratio-of-sums',
  slide: `## Ratios, distinct counts and weighted measures

A ratio is two measures, not one. Sum the **parts**, then divide.

### Return rate for September
- Numerator and denominator cover **one population**: these lines
- Ratio of sums: 18.00 ÷ 144.00 = **12.5%**
- Average of ratios: 22.2% — mugs weigh as much as kettles
- Store numerator and denominator; compute the ratio last
- Dating returns on receipt changes the rate; say which

### The same trap, elsewhere
- **Distinct customers:** daily counts sum to 3; the month has 2
- Distinct counts must be recomputed at each level
- Keep the detail, or a sketch, so they can be recounted
- **Weighted averages** need their weights carried along`,
  narration:
    "A ratio looks like a single number, but it is really two measures divided. That changes how it can be aggregated. Here is September's return rate. First, the numerator and the denominator must describe the same population: returns of the lines sold in September, divided by those same lines. Then sum each part and divide once. Eighteen pounds returned out of one hundred and forty four pounds sold gives twelve and a half percent. The tempting alternative is to compute a rate for each product and average the rates. That gives twenty two percent, because a small product with one return now counts as much as a big product with none. The fix is structural: store the numerator and denominator as additive measures, and compute the ratio only at the end. Distinct counts have the same problem. Customer two oh one bought on two different days, so adding up daily distinct customers gives three, while the month only had two. Distinct counts must be recomputed at each level. And weighted averages need their weights carried along with them.",
}
