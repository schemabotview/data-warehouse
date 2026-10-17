// Density check — the unguarded failure `npm run check` cannot see: a frame that builds green and
// leaves half its pane empty. Reads the RENDERED route, not a model, against the targets in
// CLAUDE.md (slide 80–95 % of the pane; scene binding axis ≥ 0.85, area ≥ 0.55; nothing under the
// eyebrow). Targets, not thresholds — a deliberately sparse board may sit under them, so this
// reports and exits 0 unless --strict.
//
//   npm run dev                                   # in another shell
//   node scripts/density.mjs [course|slug ...] [--strict] [--url http://localhost:5173/]
import puppeteer from 'puppeteer'
import { existsSync } from 'node:fs'

const args = process.argv.slice(2)
const strict = args.includes('--strict')
const urlIdx = args.indexOf('--url')
const base = urlIdx !== -1 ? args[urlIdx + 1] : 'http://localhost:5173/'
const filters = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--url')

const SLIDE_MIN = 0.8, SLIDE_MAX = 0.95, AXIS_MIN = 0.85, AREA_MIN = 0.55
const chromium = ['/opt/pw-browsers/chromium', process.env.PUPPETEER_EXECUTABLE_PATH].find((p) => p && existsSync(p))

const browser = await puppeteer.launch({ executablePath: chromium, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })

// The plan lists one course at a time (the route's course), so walk the catalog's courses first.
await page.goto(`${base}?capture=1#/`, { waitUntil: 'networkidle0' })
const courseIds = await page.evaluate(async () => {
  const mod = await import('/src/content/index.ts')
  return Object.keys(mod.COURSES)
})
const sections = []
for (const c of courseIds) {
  await page.goto(`${base}?capture=1#/${c}`, { waitUntil: 'networkidle0' })
  await page.waitForFunction(() => window.__scene)
  sections.push(...(await page.evaluate(() => window.__scene.plan())))
}

const rows = []
for (const s of sections) {
  if (filters.length && !filters.some((f) => s.slug === f || s.course === f)) continue
  await page.goto(`${base}?capture=1#/${s.slug}`, { waitUntil: 'networkidle0' })
  await page.waitForSelector('.react-flow__node')
  await new Promise((r) => setTimeout(r, 400)) // fitView settles after first paint
  const m = await page.evaluate(() => {
    const panel = document.querySelector('.slide-panel')
    const scaler = document.querySelector('.slide-panel__scaler')
    const zoom = parseFloat(scaler.style.zoom) || 1
    const pr = panel.getBoundingClientRect()
    const slide = scaler.getBoundingClientRect().height / pr.height
    const area = document.querySelector('.scene-area').getBoundingClientRect()
    const nodes = [...document.querySelectorAll('.react-flow__node')].map((n) => n.getBoundingClientRect())
    const box = nodes.reduce(
      (b, r) => ({ l: Math.min(b.l, r.left), t: Math.min(b.t, r.top), r: Math.max(b.r, r.right), b: Math.max(b.b, r.bottom) }),
      { l: Infinity, t: Infinity, r: -Infinity, b: -Infinity },
    )
    const fw = (box.r - box.l) / area.width, fh = (box.b - box.t) / area.height
    const eb = document.querySelector('.reel-head')?.getBoundingClientRect()
    const underEyebrow = eb ? nodes.some((r) => r.left < eb.right && r.top < eb.bottom && r.bottom > eb.top) : false
    return { slide, slidePx: Math.round(scaler.getBoundingClientRect().height / zoom), axis: Math.max(fw, fh), area: fw * fh, underEyebrow }
  })
  const flags = []
  if (m.slide < SLIDE_MIN) flags.push('slide sparse')
  if (m.slide > SLIDE_MAX) flags.push('slide near clip')
  if (m.axis < AXIS_MIN) flags.push('board short of edge')
  if (m.area < AREA_MIN) flags.push('board area low')
  if (m.underEyebrow) flags.push('node under eyebrow')
  rows.push({ slug: s.slug, ...m, flags })
}
await browser.close()

const pct = (x) => `${Math.round(x * 100)}%`.padStart(5)
for (const r of rows) {
  console.log(
    `${r.flags.length ? '✗' : '✓'} ${r.slug.padEnd(48)} slide ${pct(r.slide)} (${r.slidePx}px)  axis ${pct(r.axis)}  area ${pct(r.area)}  ${r.flags.join(', ')}`,
  )
}
const bad = rows.filter((r) => r.flags.length).length
console.log(`\n${rows.length - bad}/${rows.length} frames inside the density targets`)
if (strict && bad) process.exit(1)
