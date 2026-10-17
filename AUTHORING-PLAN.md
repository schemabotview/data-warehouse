# Authoring plan — Data Warehouse

How `DATA-WAREHOUSE-COURSE-PLAN.md` (12 chapters, 82 sections) becomes this GraphL concept app,
and how every frame is held to the density targets in `CLAUDE.md`.

## 1. Mapping

| Course plan | Repo |
| --- | --- |
| Chapter | **Course** — `src/content/<course>/`, `src/scenes/<course>/`, `public/audio/<course>/` |
| Numbered section | **Section** — one file `NN-<id>.ts`, one slide, one scene, one narration clip |
| Objective / Outcome / Bridge | Folded into the first and last section of each course — never a section of its own |
| Worked illustrations | Distributed across that chapter's section scenes (one illustration per frame) |
| Recurring retailer example | One synthetic dataset, shared node factories in `src/scenes/shared/` |

Routes are `#/<course>-<section>`. Course ids are single words so slugs stay short.

| # | Course id | Sections | Title (titles.json, search-first) |
| --- | --- | --- | --- |
| 1 | `architecture` | 6 | Data Warehouse Architecture Explained: OLTP vs OLAP, Lake, Lakehouse |
| 2 | `requirements` | 6 | Data Warehouse Requirements: Metric Definitions and Data Contracts |
| 3 | `dimensions` | 7 | Dimensional Modeling: Grain, Star Schema and Surrogate Keys |
| 4 | `facts` | 8 | Fact Tables Explained: Snapshots, Additive Measures and Aggregation |
| 5 | `history` | 7 | Slowly Changing Dimensions: Type 1, Type 2 and Late-Arriving Data |
| 6 | `integration` | 6 | Conformed Dimensions, Bus Matrix and Data Vault Compared |
| 7 | `ingestion` | 7 | ETL vs ELT and Change Data Capture (CDC) Explained |
| 8 | `loading` | 8 | Idempotent Data Loads, Backfills and Atomic Publication |
| 9 | `semantics` | 7 | Analytical SQL and Semantic Layers: Fan-Out, Windows and Metrics |
| 10 | `physical` | 7 | Data Warehouse Performance: Columnar Storage, Partitioning and Query Plans |
| 11 | `governance` | 7 | Data Quality, Lineage and Access Control in a Data Warehouse |
| 12 | `operations` | 6 | Operating a Data Warehouse: Incidents, Recovery and Migration |
| | | **82** | |

## 2. Scene shapes

The engine gives more than boxes and arrows. Each section below is assigned the shape that carries
its point, and the shape decides how density is reached:

| Key | Shape | Used for | Density behaviour |
| --- | --- | --- | --- |
| **D** | diagram — leaf cards, containers, edges | architecture, pipelines, dependency graphs | LR boards go wide-and-short → restack to TB or `cols: 2–3` containers |
| **T** | `kind: 'table'` — `headers` + `values`, or schema `columns` | sample rows, SCD versions, bus matrix, change streams | tall-and-narrow alone → pair two tables side by side (before / after) |
| **C** | `kind: 'code'` — SQL / pseudocode card | queries, merges, dedup, DDL | one card fills height, not width → code above or beside its result table |
| **P** | `kind: 'plot'` | skew, staleness vs cost, ratio-of-sums vs avg-of-ratios | binds on width; `equal` off |
| **L** | `kind: 'list'` (framed) | contracts, checklists, metric definitions | pair two lists as a contrast (good / bad) |
| **W** | `pattern: 'warn'` node inside any of the above | the contrasting failure each section carries | adds content, not padding |

Most frames are composites (**T+C**, **D+W**): the plan's teaching method is "illustration →
contrasting failure", and drawing both halves is the main lever for filling a pane honestly.

## 3. The retailer dataset (shared)

Defined once in `src/scenes/shared/retail.ts` (a node-factory module with no Scene id, so
`npm run check` treats its ids as in scope everywhere):

`customers` · `products` · `orders` · `order_lines` · `returns` · `fulfilment` · `inventory` (daily),
plus `dim_date`, `dim_customer`, `dim_product`, `fact_sales`, `fact_returns`, `fact_inventory`.

Rules it is built to: ~6 rows per sample table (enough to show a duplicate, a late row, a null);
explicit currency (`GBP`/`EUR`), units and status on every money/quantity column; ISO dates; all
values synthetic. Card labels that name a table stay ≤ 14 chars with no break (`order_lines` 11 ✓,
`inventory_daily` 15 ✗ → card says `inventory`, the table node carries the full name — table kinds
are exempt from the leaf budget).

## 4. Section inventory (as built)

`Focus` is the node lit in that frame; `↺` marks a scene shared with another section. Slide and
area are the rendered density measures from `npm run density` at hand-over.

### 1 · architecture — Analytical Decisions and Warehouse Architecture
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | business-decisions | `question-to-answer` | `question` | 83% | 69% |
| 2 | oltp-vs-olap | `two-workloads` | `scan` | 81% | 60% |
| 3 | warehouse-mart-lake | `four-arrangements` | `lakehouse` | 86% | 56% |
| 4 | logical-layers | `layers` ↺ | `serve` | 82% | 58% |
| 5 | service-expectations | `expectations` | `replica` | 84% | 78% |
| 6 | roles-and-tradeoffs | `layers` ↺ | `roles` | 81% | 58% |

### 2 · requirements — Requirements, Source Reality and Data Contracts
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | metric-definitions | `metric-contract` | `answers` | 84% | 73% |
| 2 | source-profiling | `profile` | `dupes` | 83% | 68% |
| 3 | source-identity | `header-vs-line` | `reused-id` | 80% | 58% |
| 4 | event-boundaries | `order-lifecycle` | `shipped` | 84% | 79% |
| 5 | time-currency-status | `semantics-grid` | `fx` | 80% | 57% |
| 6 | source-contracts | `source-contract` | `acceptance` | 80% | 60% |

### 3 · dimensions — Grain, Dimensions and Readable Models
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | declaring-grain | `sales-star` ↺ | `grain` | 86% | 75% |
| 2 | star-joins | `fan-out` | `dup-key` | 87% | 65% |
| 3 | surrogate-keys | `key-map` | `sk` | 84% | 68% |
| 4 | hierarchies | `category-tree` | `non-strict` | 83% | 62% |
| 5 | role-playing-dates | `sales-star` ↺ | `when` | 82% | 75% |
| 6 | junk-and-unknown | `special-members` | `unknown` | 81% | 78% |
| 7 | snowflake-tradeoffs | `flat-vs-snowflake` | `snowflake` | 82% | 73% |

### 4 · facts — Facts, Measures and Aggregation Correctness
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | transaction-facts | `three-facts` ↺ | `txn` | 80% | 74% |
| 2 | periodic-snapshots | `three-facts` ↺ | `snapshot` | 85% | 74% |
| 3 | accumulating-snapshots | `three-facts` ↺ | `accum` | 84% | 74% |
| 4 | additivity | `stock-sums` | `through-time` | 80% | 68% |
| 5 | ratios-and-distinct | `return-rate` | `ratio-of-sums` | 87% | 73% |
| 6 | factless-facts | `coverage` | `answer` | 82% | 69% |
| 7 | multiple-grains | `freight-allocation` | `allocated` | 84% | 61% |
| 8 | sparse-events | `absent-vs-zero` | `zero` | 84% | 73% |

### 5 · history — History and Temporal Correctness
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | business-vs-processing-time | `two-clocks` | `late-processing` | 85% | 58% |
| 2 | scd-type1-type2 | `scd-versions` ↺ | `type2` | 83% | 69% |
| 3 | effective-intervals | `scd-versions` ↺ | `interval` | 88% | 69% |
| 4 | historical-lookup | `as-was-join` | `boundary` | 82% | 59% |
| 5 | late-arrivals | `inferred-member` | `inferred` | 84% | 58% |
| 6 | corrections-restatement | `restate` | `restated` | 83% | 73% |
| 7 | point-in-time | `three-answers` | `known-then` | 82% | 74% |

### 6 · integration — Enterprise Integration and Modelling Alternatives
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | bus-matrix | `bus-matrix` | `matrix` | 84% | 61% |
| 2 | drill-across | `drill-across` | `combine` | 80% | 74% |
| 3 | normalised-integration | `normalised-to-mart` | `a-core` | 85% | 79% |
| 4 | data-vault | `vault` | `satellite` | 84% | 73% |
| 5 | identity-reconciliation | `identity` | `match` | 82% | 73% |
| 6 | choosing-patterns | `pattern-compare` | `compare` | 82% | 62% |

### 7 · ingestion — Ingestion and Change Capture
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | etl-elt-staging | `etl-vs-elt` | `staging` | 84% | 66% |
| 2 | full-vs-incremental | `extract-handoff` | `handoff` | 82% | 57% |
| 3 | log-cdc | `change-stream` ↺ | `lsn` | 80% | 59% |
| 4 | watermarks-checkpoints | `checkpoints` | `ingest-ckpt` | 83% | 64% |
| 5 | duplicates-deletes | `change-stream` ↺ | `tombstone` | 86% | 59% |
| 6 | schema-drift | `quarantine` | `quarantine` | 83% | 63% |
| 7 | ingestion-reconciliation | `control-totals` | `totals` | 90% | 57% |

### 8 · loading — Repeatable Loads and Safe Publication
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | dependency-order | `load-dag` ↺ | `dims` | 84% | 78% |
| 2 | deterministic-dedup | `dedup` | `tiebreak` | 84% | 64% |
| 3 | fact-key-resolution | `key-resolution` | `no-drop` | 87% | 70% |
| 4 | incremental-history | `scd2-merge` | `close-row` | 83% | 78% |
| 5 | idempotent-retry | `crash-rerun` | `crash` | 84% | 72% |
| 6 | atomic-publication | `publish` | `pointer` | 85% | 67% |
| 7 | backfill-replay | `backfill` | `partition` | 83% | 63% |
| 8 | load-evidence | `load-dag` ↺ | `evidence` | 80% | 78% |

### 9 · semantics — Analytical Queries and Semantic Meaning
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | star-query-filters | `star-query` | `group` | 80% | 65% |
| 2 | grain-aggregation | `bridge` | `weight` | 80% | 69% |
| 3 | drill-paths | `drill` | `rollup` | 84% | 79% |
| 4 | windows-periods | `periods` | `partial` | 83% | 57% |
| 5 | metric-contracts | `semantic-contract` | `version` | 83% | 62% |
| 6 | nulls-and-bridges | `null-zero` | `null` | 83% | 67% |
| 7 | report-validation | `cell-to-source` | `source-rows` | 82% | 59% |

### 10 · physical — Physical Design, Performance and Cost
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | row-vs-column | `row-col` | `col-scan` | 86% | 61% |
| 2 | partition-pruning | `pruning` | `pruned` | 80% | 72% |
| 3 | clustering-indexing | `three-mechanisms` | `index` | 84% | 71% |
| 4 | distribution-skew | `skew` | `hot-key` | 80% | 65% |
| 5 | aggregates-materialisation | `mat-agg` | `stale` | 83% | 79% |
| 6 | plans-statistics | `explain` | `actual-rows` | 83% | 80% |
| 7 | cost-tradeoffs | `cost-freshness` | `target` | 80% | 78% |

### 11 · governance — Quality, Metadata and Governance
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | quality-layers | `checks-by-layer` | `intervals` | 82% | 59% |
| 2 | anomaly-investigation | `revenue-drop` | `metric-version` | 83% | 65% |
| 3 | metadata-lineage | `lineage` | `business-def` | 80% | 73% |
| 4 | ownership-contracts | `owners` | `steward` | 83% | 74% |
| 5 | least-privilege | `access-boundaries` | `rls` | 83% | 60% |
| 6 | sensitive-data | `pii-trail` | `backup` | 80% | 71% |
| 7 | audit-sharing | `share` | `audit` | 82% | 65% |

### 12 · operations — Operating and Evolving the Warehouse
| # | Section id | Scene | Focus | Slide | Area |
| --- | --- | --- | --- | --- | --- |
| 1 | orchestration-slos | `job-vs-product` | `slo` | 82% | 71% |
| 2 | incident-diagnosis | `stale-dashboard` | `capture-lag` | 82% | 72% |
| 3 | backup-restore | `recovery` | `rpo` | 85% | 72% |
| 4 | schema-metric-evolution | `evolution` | `metric-v2` | 85% | 57% |
| 5 | migration-parallel-run | `parallel-run` | `diff` | 82% | 69% |
| 6 | end-to-end-review | `retail-pipeline` | `review` | 80% | 71% |

75 scenes for 82 sections; 82/82 frames inside the density targets.

## 5. Density check — how every frame is held to target

Targets (from `CLAUDE.md`, against the ~1080 design-px pane):

| Measure | Target | Guard |
| --- | --- | --- |
| Slide height | 80–95 % (≈ 865–1025 px; hard cap 1000 modelled) | `npm run check` (cap) + `npm run density` (floor, rendered) |
| Scene, binding axis | ≥ 0.85 | `npm run density` |
| Scene, area | ≥ 0.55 | `npm run density` |
| Eyebrow | no node under it | `npm run density` |
| Leaf cards / focus / tokens | per `check` | `npm run check` |
| Edge label over a card, empty-looking frame | — | screenshot, by eye |

**`npm run density`** (`scripts/density.mjs`, added with this scaffold) drives the dev server at
1920×1080 in `?capture=1`, walks `window.__scene.plan()` for every course, and measures the
*rendered* slide height and node bounding box against their panes. It reports and exits 0 (targets,
not thresholds); `--strict` makes it fail. Calibrated on the demo course, whose numbers agree with
the screenshot:

```
✗ demo-what-a-section-is   slide 61% (663px)  axis 89%  area 27%  slide sparse, board area low
✗ demo-scene-kinds         slide 72% (776px)  axis 89%  area 70%  slide sparse
```

**Per-section loop**

1. Slide first: `##` title, one framing sentence, two `###` blocks. Author to **865–1000 modelled
   px** — roughly 5–6 bullets plus one prose line. Under 865 add the missing *content* (the
   contrast case, the assumption, the number), never padding.
2. Scene: pick the shape from §4, run `npm run check` (cards, tokens, focus).
3. `npm run density <course>-<section>` — fix flags with these levers, in order:
   - **area low on a wide LR board** → restack TB or put the leaves in a `cols: 2–3` container;
   - **axis short** on a single table/code card → add its pair (result table, failure case);
   - **floats** → scene `padding: 0.04`; **touches eyebrow** → `padding: 0.12–0.17`;
   - **slide near clip** → cut a bullet before shortening words.
4. Screenshot the route; look for edge labels on cards and any frame that reads empty.
5. Narration: 130–180 words of flowing prose (≈ 55–75 s), same idea as the slide, never the bullets
   read aloud.

**Calibrated on the pilot (course 1)**

- The `check` model **over-estimates** a bullet-heavy slide by ~60–140 px: it counts a bullet of
  50–55 chars as two lines where it renders as one. With the 1000 px modelled cap that leaves a
  narrow rendered window, **≈ 865–930 px**. Author to **920–990 modelled**, then read the
  rendered number off `npm run density`.
- When the cap and the floor collide, shorten bullets that sit at 50–55 chars to under ~48 — the
  model drops a line, the render does not move — and spend the freed budget on one more real point.
- The binding axis reads **89 %** on every frame: that is the shell's fit padding, so the axis
  target is always met and **area is the measure that moves**.
- A 2×2 of containers with two cards each landed at 23 % area. What fixed it was content the
  slide already asked for (history and quality per arrangement, and how they combine), not padding.
- Helpers that build nodes (`children: rows.map(...)`) hide ids and labels from `check`: focus
  and card budgets are only guarded on literal node objects. Write nodes out.
- `kind: 'list'` is not exempt in `check`'s leaf model, so a list's `label`/`sub` must fit the
  leaf budget too.

**Confirmed across all twelve courses**

- First drafts ran short on nearly every slide. A slide that lands in target is a two-line intro,
  two or three `###` blocks, and **11–13 bullets**, most under ~48 characters.
- The board failures were all the same shape: a row of 4+ cards or two side-by-side code cards
  making the board wide and short. Fixes, in order of use: stack the wide row (`flow: 'TB'` or
  `cols: 1–2`), put a TB chain beside a table (`flow: 'LR'` at the top), or add the result table or
  failure case the slide already describes.
- `cols` is ignored on a container with `flow: 'LR'`; use `flow: 'TB'` or drop `flow` to get a grid.
- Bars in a plot: use one `area` series per bar (`[[x-0.3, h], [x+0.3, h]]`); `segment` draws a
  hairline.

**Per-course gate** (before a course is handed over):
`npm run build && npx tsc --noEmit && npm run check && npm run density <course>` with every frame
inside target or its deviation named in the hand-over (a deliberately sparse board is allowed, but
said out loud), plus a contact sheet of all its screenshots.

## 6. Phases

| Phase | Work | Hand-over |
| --- | --- | --- |
| 0 ✓ | Scaffold from `content-repo-template`, identity swaps (slug `data-warehouse`, teal `#0d9488` / amber), titles, concept.json, density script | this commit |
| 1 ✓ | `shared/retail.ts` dataset + course 1 `architecture` as the **pilot**; slide floor and shape levers calibrated on real frames (§5); demo course deleted | 6/6 frames inside targets |
| 2 ✓ | Courses 2–4 (requirements → facts): the modelling core, heaviest in tables | one commit per course |
| 3 ✓ | Courses 5–8 (history → loading): code+table composites | 〃 |
| 4 ✓ | Courses 9–12 (semantics → operations) | 82/82 frames inside targets |
| 5 | Narration audio: Colab + Chatterbox per course (owner-run); `check` then requires every wav | wavs committed |
| 6 | Owner: enable Pages (Settings → Pages → GitHub Actions), list in `ui-graphl` `catalog.json` | live at graphl.in/data-warehouse |

Not in scope for authoring: executable SQL against a live engine (the course plan states no SQL was
executed; code cards are labelled illustrations), audio generation, Pages and catalog listing.
