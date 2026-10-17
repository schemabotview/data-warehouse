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

## 4. Section inventory

`Focus` is the node lit in that frame; scenes shared between consecutive sections are marked `↺`.

### 1 · architecture
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | business-decisions | `question-to-answer` | D | `question` | "net revenue last month?" traced source→consumer, TB so it binds on height |
| 2 | oltp-vs-olap | `two-workloads` | T+C | `scan` | point lookup vs analytical scan, two code cards over row/column sketch |
| 3 | warehouse-mart-lake | `four-arrangements` | D | `lakehouse` | 2×2 containers, ownership boundary per container |
| 4 | logical-layers | `layers` ↺ | D+W | `serve` | layer stack + warn: "a label is not a quality guarantee" |
| 5 | service-expectations | `expectations` | L+W | `freshness` | useful daily report vs current-state replica that loses history |
| 6 | roles-and-tradeoffs | `layers` ↺ | D | `owners` | same board, owners lit; closes with Outcome + Bridge |

### 2 · requirements
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | metric-definitions | `metric-contract` | L+L | `recognised` | booked / shipped / recognised as three framed lists |
| 2 | source-profiling | `profile` | T+L | `dupes` | 6-row sample + profile list (nulls, dupes, coverage) |
| 3 | source-identity | `header-vs-line` | T+T+W | `reused-id` | header and line tables, warn on a reused identifier |
| 4 | event-boundaries | `order-lifecycle` | D | `shipped` | event chain TB, status changes as edges |
| 5 | time-currency-status | `semantics-grid` | T | `fx` | one wide table; pair with a currency-conversion card |
| 6 | source-contracts | `source-contract` | C+L | `owner` | contract YAML card + reconciled total |

### 3 · dimensions
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | declaring-grain | `sales-star` ↺ | D | `fact` | star with fact centre, `cols` container ring |
| 2 | star-joins | `fan-out` | T+T+W | `dup-key` | duplicated dimension key multiplies rows |
| 3 | surrogate-keys | `key-map` | T+T | `sk` | natural vs surrogate, source-qualified |
| 4 | hierarchies | `category-tree` | D+W | `non-strict` | hierarchy TB, non-strict branch in warn |
| 5 | role-playing-dates | `sales-star` ↺ | D | `ship-date` | same star, order/ship date roles lit |
| 6 | junk-and-unknown | `special-members` | T+T | `unknown` | junk flags table + unknown / not-applicable rows |
| 7 | snowflake-tradeoffs | `flat-vs-snowflake` | D | `snowflake` | two containers side by side |

### 4 · facts
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | transaction-facts | `three-facts` ↺ | T+T+T | `txn` | the three row sets, TB stack |
| 2 | periodic-snapshots | `three-facts` ↺ | T+T+T | `snapshot` | same scene, focus moves |
| 3 | accumulating-snapshots | `three-facts` ↺ | T+T+T | `accum` | same scene, focus moves |
| 4 | additivity | `stock-sums` | T+W | `through-time` | across locations ✓ vs through time ✗ |
| 5 | ratios-and-distinct | `return-rate` | P+C | `ratio-of-sums` | plot of avg-of-ratios vs ratio-of-sums |
| 6 | factless-facts | `coverage` | T+D | `promo` | coverage fact + "what didn't sell" query |
| 7 | multiple-grains | `freight-allocation` | T+T+W | `allocated` | header freight → lines, double-count warn |
| 8 | sparse-events | `absent-vs-zero` | T+T | `zero` | closes with Outcome + Bridge |

### 5 · history
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | business-vs-processing-time | `two-clocks` | D | `event-time` | timeline as LR chain inside TB container |
| 2 | scd-type1-type2 | `scd-versions` ↺ | T+T | `type2` | overwrite vs versioned table |
| 3 | effective-intervals | `scd-versions` ↺ | T+T | `interval` | half-open intervals lit |
| 4 | historical-lookup | `as-was-join` | C+T | `boundary` | lookup SQL + boundary event row |
| 5 | late-arrivals | `inferred-member` | T+T+W | `inferred` | placeholder vs inferred row, later completion |
| 6 | corrections-restatement | `restate` | D+W | `restated` | restate vs reclassify branches |
| 7 | point-in-time | `three-answers` | T+L | `known-then` | as-was / current / known-then |

### 6 · integration
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | bus-matrix | `bus-matrix` | T | `customer` | 4 processes × 5 dimensions; wide table, padding 0.04 |
| 2 | drill-across | `drill-across` | D+W | `combine` | aggregate-then-combine vs direct join fan-out |
| 3 | normalised-integration | `3nf-to-mart` | D | `mart` | normalised layer → dimensional mart |
| 4 | data-vault | `vault` | D | `satellite` | hub / link / satellite containers |
| 5 | identity-reconciliation | `identity` | T+W | `match` | two source customers → one master, hash caveat |
| 6 | choosing-patterns | `pattern-compare` | T | `usability` | criteria × patterns table; Outcome + Bridge |

### 7 · ingestion
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | etl-elt-staging | `etl-vs-elt` | D | `staging` | two pipelines TB |
| 2 | full-vs-incremental | `extract-handoff` | D+T | `handoff` | snapshot + increments, consistent-cut boundary |
| 3 | log-cdc | `change-stream` ↺ | T+C | `lsn` | change stream rows + timestamp-filter query |
| 4 | watermarks-checkpoints | `checkpoints` | D | `ingest-ckpt` | source / transport / ingestion checkpoints |
| 5 | duplicates-deletes | `change-stream` ↺ | T+W | `tombstone` | same stream, duplicate & delete lit |
| 6 | schema-drift | `quarantine` | D+W | `quarantine` | incompatible change routed aside |
| 7 | ingestion-reconciliation | `control-totals` | T+L | `totals` | counts & totals; what they don't prove |

### 8 · loading
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | dependency-order | `load-dag` ↺ | D | `dims` | DAG TB, staged → publish |
| 2 | deterministic-dedup | `dedup` | C+T | `tiebreak` | ROW_NUMBER with explicit order rule |
| 3 | fact-key-resolution | `key-resolution` | C+T | `as-of` | fact → historical SK lookup |
| 4 | incremental-history | `scd2-merge` | C+T | `close-row` | close + insert, before/after |
| 5 | idempotent-retry | `crash-rerun` | D+W | `crash` | write → crash → checkpoint not advanced |
| 6 | atomic-publication | `publish` | D | `pointer` | versioned output + pointer switch vs N commits |
| 7 | backfill-replay | `backfill` | T+D | `partition` | rebuild one partition, input/code versions |
| 8 | load-evidence | `load-dag` ↺ | D | `evidence` | same DAG, evidence nodes lit; Outcome + Bridge |

### 9 · semantics
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | star-query-filters | `star-query` | C+T | `group` | query + expected totals |
| 2 | grain-aggregation | `bridge` | T+T+W | `weight` | many-to-many bridge, weight assumption |
| 3 | drill-paths | `drill` | D | `rollup` | drill-down / roll-up / across |
| 4 | windows-periods | `periods` | C+P | `partial` | running total, incomplete current month |
| 5 | metric-contracts | `semantic-contract` | C+L | `version` | metric YAML vs duplicated dashboard formulas |
| 6 | nulls-and-bridges | `null-zero` | T+W | `null` | null vs zero vs missing relationship |
| 7 | report-validation | `cell-to-source` | D | `source-rows` | one report cell traced to rows |

### 10 · physical
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | row-vs-column | `row-col` | D | `col-scan` | conceptual, labelled apart from PostgreSQL |
| 2 | partition-pruning | `pruning` | C+D | `pruned` | prunable vs unprunable predicate |
| 3 | clustering-indexing | `three-mechanisms` | L+L+L | `index` | sort / cluster / index as different engines' tools |
| 4 | distribution-skew | `skew` | D+P | `hot-key` | broadcast vs repartition + skew plot |
| 5 | aggregates-materialisation | `mat-agg` | D+W | `stale` | refresh and staleness cost |
| 6 | plans-statistics | `explain` | C | `actual-rows` | `EXPLAIN (ANALYZE)` card, PG 18 labelled, read-only |
| 7 | cost-tradeoffs | `cost-freshness` | P | `target` | freshness vs cost curve; Outcome + Bridge |

### 11 · governance
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | quality-layers | `checks-by-layer` | D | `intervals` | checks placed per layer |
| 2 | anomaly-investigation | `revenue-drop` | D | `metric-version` | investigation path, not "bad data" by default |
| 3 | metadata-lineage | `lineage` | D | `business-def` | technical lineage vs business meaning |
| 4 | ownership-contracts | `owners` | L+D | `steward` | named accountability per asset |
| 5 | least-privilege | `access-boundaries` | D+C | `rls` | roles + PG row-security, bypass caveat |
| 6 | sensitive-data | `pii-trail` | D+W | `backup` | attribute through staging → exports → backups |
| 7 | audit-sharing | `share` | D+L | `audit` | controlled share + evidence |

### 12 · operations
| # | Section id | Scene | Shape | Focus | Density note |
| --- | --- | --- | --- | --- | --- |
| 1 | orchestration-slos | `job-vs-product` | D+W | `slo` | job green ≠ data product correct |
| 2 | incident-diagnosis | `stale-dashboard` | D | `capture-lag` | trace across five failure points |
| 3 | backup-restore | `recovery` | D+L | `rpo` | interrupted load vs lost storage, RPO/RTO |
| 4 | schema-metric-evolution | `evolution` | T+T | `metric-v2` | schema change vs metric-definition change |
| 5 | migration-parallel-run | `parallel-run` | D+T | `diff` | old/new side by side, reconciliation diff |
| 6 | end-to-end-review | `retail-pipeline` | D | `review` | the whole retailer pipeline; course close + continued practice |

≈ 72 scenes for 82 sections (10 reuses).

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

**Per-course gate** (before a course is handed over):
`npm run build && npx tsc --noEmit && npm run check && npm run density <course>` with every frame
inside target or its deviation named in the hand-over (a deliberately sparse board is allowed, but
said out loud), plus a contact sheet of all its screenshots.

## 6. Phases

| Phase | Work | Hand-over |
| --- | --- | --- |
| 0 ✓ | Scaffold from `content-repo-template`, identity swaps (slug `data-warehouse`, teal `#0d9488` / amber), titles, concept.json, density script | this commit |
| 1 | `shared/retail.ts` dataset + course 1 `architecture` as the **pilot**; calibrate the slide floor and the shape levers on real frames; delete the demo course in the same change | route + density table + contact sheet |
| 2 | Courses 2–4 (requirements → facts): the modelling core, heaviest in tables | one course per hand-over |
| 3 | Courses 5–8 (history → loading): code+table composites | 〃 |
| 4 | Courses 9–12 (semantics → operations) | 〃 |
| 5 | Narration audio: Colab + Chatterbox per course (owner-run); `check` then requires every wav | wavs committed |
| 6 | Owner: enable Pages (Settings → Pages → GitHub Actions), list in `ui-graphl` `catalog.json` | live at graphl.in/data-warehouse |

Not in scope for authoring: executable SQL against a live engine (the course plan states no SQL was
executed; code cards are labelled illustrations), audio generation, Pages and catalog listing.
