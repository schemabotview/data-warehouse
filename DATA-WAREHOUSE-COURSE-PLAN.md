# Data Warehouse — From Business Questions to Trusted Analytical Data

## Audience and prerequisites

For learners new to data warehousing who understand relational tables, keys, SELECT, JOIN, and GROUP BY. Explain analytical workloads, pipelines, storage, and operational vocabulary locally. Python, cloud administration, Spark, and BI-product experience are not prerequisites. The SQL companion course supplies deeper query-language study.

Scope: analytical requirements, architecture, dimensional models, historical correctness, enterprise integration, ingestion, repeatable loading, semantic consumption, physical design, quality, governance, and operation. Dimensional serving models receive detailed construction and reasoning; normalised integration and Data Vault receive bounded comparison. This is a platform-neutral course independent of certifications.

Reference scope checked on **2026-10-17**. Use portable relational ideas and labelled SQL or pseudocode. **PostgreSQL 18** is a deliberately pinned reference for selected transaction, access-control, query-plan, and backup illustrations, not a claim that it represents every analytical engine. Use labelled Fabric and Debezium documentation as additional implementation examples. Verify exact engine, connector, and deployment versions before producing executable lessons. Physical distribution, column storage, DDL, merge, security, and recovery semantics require engine-specific evidence; do not imply feature parity.

Target capability: construct and explain representative warehouse models, loads, and analytical queries; trace historical and operational failures; and justify design choices against business meaning and evidence. Completion does not establish assessed production competence. Following examples is optional; no submitted exercises, learner monitoring, required paid account, or deployment is implied.

Structure: **12 chapters, 82 sections**, distributed **6, 6, 7, 8, 7, 6, 7, 8, 7, 7, 7, and 6**. Counts reflect conceptual scope, not equal teaching duration.

## Learning spine

Decision and workload → source reality and contracts → grain and dimensions → facts and aggregation → history → enterprise integration → ingestion → repeatable transformation/publication → analytical meaning → physical evidence → trust and governance → reliable operation and evolution.

Why this progression: business meaning and grain precede table choices. Dimensions and fact semantics precede historical loading; historical identity precedes incremental maintenance. Repeatable publication precedes optimisation. Quality, privacy, ownership, reconciliation, and failure awareness begin with requirements and deepen throughout. The final chapter integrates established controls into operation and evolution.

Recurring example: a retailer combines orders, order lines, returns, customer changes, fulfilment events, and daily inventory. Explain revenue, return rate, fulfilment delay, and stock balances with explicit dates, currencies, units, and status rules. Use a small labelled dataset and contrasting business cases. Warehouse, lake, and lakehouse are overlapping architectural choices rather than an inevitable maturity ladder.

Teaching method: objective → mental model → annotated schema, rows, SQL/result, calculation, or timeline → contrasting failure/design → outcome → bridge. Worked illustrations specify future teaching evidence, not completed implementation. State assumptions beside expected results; use synthetic data and named disposable targets for optional mutations. Treat source documents as evidence to evaluate rather than a universal architecture prescription.

## Chapter 1 — Analytical Decisions and Warehouse Architecture

Objective: Explain why analytical workloads need deliberate integration, history, and serving choices.

1. Business decisions and analytical workloads
2. OLTP versus OLAP
3. warehouse, mart, lake, and lakehouse
4. logical layers and data movement
5. freshness, correctness, and service expectations
6. lifecycle roles and architectural trade-offs

Worked illustrations: Follow “What was net merchandise revenue last month?” through source events, ingestion, integration, a serving model, and a consumer. Distinguish operational response time from analytical scans and historical comparisons. Draw alternative warehouse/mart and lakehouse arrangements with their ownership boundaries; a layer label does not itself guarantee quality. Contrast a useful daily report with a misleading current-state replica that loses history. Identify freshness, completeness, access, and operating-cost expectations together, with named business and technical owners. Treat an architecture claim or benchmark as workload-specific evidence rather than proof of universal superiority.

Outcome: Explain a warehouse architecture in terms of business decisions, workload needs, data movement, and explicit trade-offs.

Bridge: Architecture becomes concrete when the business question and source evidence are made precise.

## Chapter 2 — Requirements, Source Reality, and Data Contracts

Objective: Translate business questions and source evidence into explicit analytical definitions and contracts.

1. Stakeholder questions and metric definitions
2. source profiling and provenance
3. keys, entities, and source identity
4. business processes and event boundaries
5. time, currency, units, and status semantics
6. acceptance examples and source contracts

Worked illustrations: Write a metric contract specifying whether booked, shipped, or recognised sales are counted, how returns are dated, and how tax and currency are treated; this is an analytical definition, not accounting advice. Profile sample keys, nulls, duplicates, status changes, and source coverage. Distinguish an order header from an order-line event and reused identifiers from globally stable identity. Reconcile a small source total under the chosen definition before designing tables. Add illustrative lateness, schema-change, retention, and permitted-use expectations to a source contract; a contract needs observation and ownership to be enforceable.

Outcome: Define a bounded analytical requirement and identify source assumptions that can invalidate its answer.

Bridge: Explicit source and business contracts provide the basis for declaring the model’s grain and dimensions.

## Chapter 3 — Grain, Dimensions, and Readable Models

Objective: Design a readable dimensional model with a declared grain and predictable relationships.

1. Declaring grain
2. star schemas and join cardinality
3. natural and surrogate keys
4. descriptive dimensions and hierarchies
5. date/time and role-playing dimensions
6. degenerate, junk, and unknown members
7. denormalisation and snowflake trade-offs

Worked illustrations: Declare one row per order line before drawing a star with product, customer, and role-playing order/ship dates. Annotate each join with expected cardinality and show how a duplicated dimension key multiplies rows. Compare source natural keys with warehouse surrogate keys and explain source-system qualification. Trace product category hierarchies, including a non-strict hierarchy that cannot be summed naively. Identify an order number as a degenerate dimension, a small flag grouping as a junk dimension, and distinct unknown/not-applicable policies. Contrast a flattened dimension with snowflaked lookups; readability and maintenance trade-offs depend on the workload.

Outcome: Construct and explain a star schema with explicit grain, key policy, dimension roles, and join expectations.

Bridge: The declared grain and descriptive context now determine which facts can be recorded and combined.

## Chapter 4 — Facts, Measures, and Aggregation Correctness

Objective: Choose fact structures and aggregation rules that preserve the meaning of each measurement.

1. Transaction fact tables
2. periodic snapshots
3. accumulating snapshots
4. additive and semi-additive measures
5. ratios, distinct counts, and weighted measures
6. factless facts and coverage
7. multiple grains and allocation
8. sparse events and missing observations

Worked illustrations: Build three small row sets: sales transactions, daily inventory snapshots, and an accumulating fulfilment snapshot. Explain their row meanings and update policies before querying them. Sum sales only under compatible units/currencies; contrast summing stock across locations with summing daily balances through time. Calculate return rate as an explicit numerator/denominator under a matched population, and compare ratio-of-sums with an incorrect average of ratios. Show non-additive distinct customer counts, weighted averages, and factless coverage. Contrast absent events with measured zeros. Separate header-level freight from line facts or allocate it under a documented rule; reconcile the allocation and avoid double counting across grains.

Outcome: Select a fact-table pattern and justify valid aggregations, denominators, and allocation rules.

Bridge: Correct measurement at one point in time raises the question of how descriptions and events change.

## Chapter 5 — History and Temporal Correctness

Objective: Explain how changing descriptions and corrected events affect historical analytical answers.

1. Business time and processing time
2. overwrite versus versioned dimensions
3. effective intervals and surrogate-key assignment
4. historical fact-to-dimension lookup
5. late-arriving facts and dimensions
6. corrections, deletions, and restatement
7. point-in-time answers and bitemporal awareness

Worked illustrations: Trace Type 1 overwrite and Type 2 versioning for a customer's region. Use non-overlapping half-open effective intervals and a fact's relevant business timestamp to select a version; distinguish that timestamp from ingestion time. Show a boundary event, missing historical member, late arrival, and corrected effective date. Compare an unknown-member placeholder with an inferred dimension row and later completion. Explain when a fact must be restated versus reclassified at query time. Contrast as-was, current-view, and “what was known then?” answers; Type 2 alone is not a complete bitemporal model. Treat deletion and retention as explicit policy decisions carried into derived copies.

Outcome: Trace historical lookups and corrections and explain which temporal question a model can answer.

Bridge: Explicit history policies make it possible to integrate several processes without silently changing meaning.

## Chapter 6 — Enterprise Integration and Modelling Alternatives

Objective: Integrate business processes and compare alternative integration models without assuming one universal winner.

1. Conformed dimensions and bus matrices
2. drill-across and shared definitions
3. normalised integration and dimensional serving
4. Data Vault hubs, links, and satellites
5. master/reference data and identity reconciliation
6. selecting and combining patterns

Worked illustrations: Create a bus matrix for sales, returns, inventory, and fulfilment, then identify which customer/product/date definitions can actually be shared. Aggregate sales and returns independently to compatible conformed attributes before combining them; show the fan-out from directly joining their detailed facts. Draw a normalised integration layer feeding a dimensional mart and compare it with direct dimensional integration. Sketch a bounded Data Vault example separating business keys (hubs), relationships (links), and descriptive history (satellites). Hashing does not decide real-world identity or eliminate collision/canonicalisation questions. Compare change isolation, traceability, query usability, delivery cost, and governance. Vendor conventions are labelled examples, not the complete Data Vault specification.

Outcome: Explain cross-process consistency and choose an integration pattern against stated requirements and costs.

Bridge: Integration choices define what must be captured from sources and which identities must survive ingestion.

## Chapter 7 — Ingestion and Change Capture

Objective: Trace source changes into a recoverable ingestion boundary with explicit completeness assumptions.

1. ETL versus ELT and staging boundaries
2. full extracts and incremental selection
3. log-based CDC and source ordering
4. watermarks, checkpoints, and consistent cuts
5. duplicates, out-of-order changes, and deletes
6. schema drift and quarantine
7. ingestion metadata and reconciliation

Worked illustrations: Trace a full extract followed by incremental changes, showing the hand-off boundary and evidence needed for a consistent initial state. Contrast a timestamp filter with log positions and stable tie-breakers; a watermark is meaningful only under stated source semantics. Read a small labelled change stream with insert, update, delete, duplicate, and out-of-order events. Preserve source identity, operation, ordering metadata, batch/run IDs, and provenance; tombstones and business deletes are not interchangeable without checking connector semantics. Compare source, transport, and ingestion checkpoints. Quarantine an incompatible change with a visible completeness impact. Reconcile counts and control totals without claiming those checks prove every row correct.

Outcome: Explain extract/change boundaries, ordering and replay assumptions, and evidence of ingestion completeness.

Bridge: A recoverable ingestion boundary supplies stable inputs for repeatable transformation and publication.

## Chapter 8 — Repeatable Loads and Safe Publication

Objective: Construct repeatable transformation and publication patterns that preserve model and checkpoint correctness.

1. Dependency ordering and dimension loads
2. deterministic transforms and deduplication
3. fact loading and key resolution
4. incremental history maintenance
5. idempotency and retry boundaries
6. transactions and atomic publication
7. backfills, replay, and rebuilds
8. reconciliation and load evidence

Worked illustrations: Draw a dependency graph from staged inputs through dimensions, historical key resolution, facts, and publication. Use annotated SQL/pseudocode to deduplicate deterministically under an explicit event-order rule; do not treat arbitrary “latest row” selection as correctness. Trace an idempotent rerun after a crash between data writing and checkpoint advancement. Compare one transaction in a supporting engine with versioned-output publication and an atomic pointer switch; multiple independent table commits do not imply a consistent reporting snapshot. Explain concurrent writers, uniqueness constraints, retryable conflicts, and engine-specific merge behaviour. Rebuild a bounded historical partition after a late correction, tracking input versions, code version, interval, reconciliation, and publication state. Separate backfill and live-work ownership to avoid overwriting newer results.

Outcome: Construct and reason about an incremental load, retry, backfill, and publication boundary under stated engine guarantees.

Bridge: Published, reconciled models are ready for queries that preserve business meaning through aggregation.

## Chapter 9 — Analytical Queries and Semantic Meaning

Objective: Explain analytical queries and semantic contracts from source rows through published metrics.

1. Star joins and filter behaviour
2. aggregation at the intended grain
3. drill-down, roll-up, and drill-across
4. windows and period comparisons
5. metric contracts and semantic layers
6. missing values and relationship ambiguity
7. validating reports against source evidence

Worked illustrations: Trace a star query through filtering, joining, grouping, and expected totals, then deliberately introduce fan-out. Explain a many-to-many bridge and allocation/weight assumptions before aggregating. Show drill-down along a valid hierarchy, roll-up, and drill-across at compatible grains. Compare a running total, period-over-period change, and an incomplete current period with explicit calendar/time-zone and fiscal-calendar assumptions. Document metric population, grain, time basis, currency conversion, null/zero treatment, and version in a semantic contract. Contrast centrally defined metrics with duplicated dashboard formulas. Reconcile one report cell back to source records; a semantic layer cannot repair an incorrect underlying grain automatically.

Outcome: Construct and explain analytical query patterns and locate discrepancies in grain, relationships, or metric meaning.

Bridge: With analytical meaning established, execution evidence can guide physical performance and cost decisions.

## Chapter 10 — Physical Design, Performance, and Cost

Objective: Use workload and execution evidence to justify physical design and cost choices.

1. Row and column storage models
2. partitioning and pruning
3. clustering, sorting, and indexing
4. distribution, joins, and data skew
5. aggregates and materialisation
6. plans, statistics, and workload evidence
7. concurrency, freshness, and cost trade-offs

Worked illustrations: Draw a conceptual row-store versus column-store scan and label it separately from the PostgreSQL example. Compare partition pruning with an unprunable predicate; discuss sorting/clustering/indexing as different engine mechanisms. Diagram broadcast versus repartitioned joins and skew without implying a single-node plan demonstrates distributed movement. Read estimated and actual plan evidence, statistics, cardinality errors, scanned bytes, and elapsed time under stated cache and concurrency conditions. Explain that `EXPLAIN ANALYZE` executes its statement; use a read-only disposable demonstration. Compare a materialised aggregate with its refresh and staleness cost. Evaluate optimisation against a workload, freshness target, resource usage, and billing model; no fabricated speedup or universal design rule.

Outcome: Interpret execution evidence and justify a physical change without confusing estimates with measured results.

Bridge: An efficient warehouse still needs demonstrable quality, accountable metadata, and enforced access controls.

## Chapter 11 — Quality, Metadata, and Governance

Objective: Design trust and access controls with traceable ownership, evidence, and limitations.

1. Quality rules and layered checks
2. reconciliation and anomaly investigation
3. technical/business metadata and lineage
4. ownership, catalogues, and change contracts
5. least privilege and analytical access
6. sensitive data, retention, and deletion propagation
7. audit evidence and controlled sharing

Worked illustrations: Map uniqueness, referential integrity, valid intervals, freshness, and business reconciliation checks to the layers where they are meaningful. Investigate a changed revenue total using lineage, source versions, load evidence, and metric definitions rather than assuming every anomaly is bad data. Distinguish technical lineage from business meaning and named accountability. Draw loader, modeller, analyst, and privileged-admin access boundaries; demonstrate that view filtering, row policies, masking, and encryption solve different problems. Use PostgreSQL row-security roles as a labelled case, including owner/privileged bypass caveats and effective-role checks. Follow a synthetic sensitive attribute through staging, marts, exports, logs, and backup policy. Retention/deletion and controlled sharing need platform-specific enforcement and verification; this is not legal guidance.

Outcome: Explain layered quality and governance controls, identify bypass/coverage gaps, and trace responsibility and evidence.

Bridge: These controls become operational obligations when the warehouse must recover and evolve under real failures.

## Chapter 12 — Operating and Evolving the Warehouse

Objective: Explain how to operate, recover, migrate, and evolve a warehouse without losing analytical meaning.

1. Orchestration and service objectives
2. observability and incident diagnosis
3. recovery, backup, and restore evidence
4. schema and metric evolution
5. migration and parallel-run reconciliation
6. end-to-end design review and continued practice

Worked illustrations: Trace a stale-dashboard incident across source freshness, capture lag, transform failure, publication state, and consumer cache. Distinguish a successful job from a correct, complete, timely data product; define alert ownership and user-visible service objectives. Walk recovery from an interrupted load, then separately from lost storage using a backup/restore test with stated recovery point and recovery time objectives. A replayable source or time-travel feature is not automatically an independent backup. Compare a schema change with a metric-definition change using versioned contracts, parallel results, reconciliation, and rollback criteria. Review the retailer pipeline end to end, including late corrections, deletion propagation, access, costs, and consumer communication. Continue practice through focused redesigns and recovery walkthroughs rather than claiming course completion certifies operational readiness.

Outcome: Reason through incidents, recovery, and evolution while preserving defined analytical contracts and consumer expectations.

Bridge: Continue with independently reviewed models, small synthetic failure cases, documented metric changes, and measured workload comparisons. Practise restoring a disposable environment and reconciling replayed history before claiming recovery capability. Choose companion study in SQL, dbt, platform engineering, distributed data systems, or specialist modelling after identifying the new prerequisites and operational responsibilities.

## Sources and scope

The [Kimball technique catalogue](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/), [four-step design](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/four-4-step-design-process/), [fact additivity](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/additive-semi-additive-non-additive-fact/), and [bus architecture](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/kimball-data-warehouse-bus-architecture/) inform dimensional design and integration. [The Data Warehouse Toolkit, third edition](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-dw-toolkit/) (Kimball and Ross, Wiley, 2013) and [The Data Warehouse Lifecycle Toolkit, second edition](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-dw-lifecycle-toolkit/) (Wiley, 2008) were compared through author-site descriptions and resource listings, not full-book study. They inform modelling and delivery scope, not current engine semantics.

Concrete checks include Fabric's [dimension modelling](https://learn.microsoft.com/en-us/fabric/data-warehouse/dimensional-modeling-dimension-tables) and [table loading](https://learn.microsoft.com/en-us/fabric/data-warehouse/dimensional-modeling-load-tables), [Debezium PostgreSQL connector](https://debezium.io/documentation/reference/stable/connectors/postgresql.html), and PostgreSQL 18 [transaction isolation](https://www.postgresql.org/docs/18/transaction-iso.html), [EXPLAIN](https://www.postgresql.org/docs/18/using-explain.html), [row security](https://www.postgresql.org/docs/18/ddl-rowsecurity.html), and [backup overview](https://www.postgresql.org/docs/18/backup.html). These are labelled implementation references, not cross-engine guarantees. Moving stable documentation requires a resolved version before lesson execution.

[Astera Data Stack v11 Data Vault documentation](https://documentation.astera.com/astera-data-stack-v11/data-model/data-vaults/introducing-data-vaults) and [Datavault Builder's hub discussion](https://datavault-builder.com/data-vault/hub/) provide vendor-authored examples outside the Kimball perspective. Their product conventions are not a complete independent methodology audit. Inmon's book and the attempted originator Data Vault page were inaccessible; normalised integration remains conceptual comparative coverage without a claim of full Inmon-method treatment. The [lakehouse research abstract](https://www.databricks.com/research/lakehouse-a-new-generation-of-open-platforms-that-unify-data-warehousing-and-advanced-analytics) provides an architectural perspective, not independently reproduced benchmark evidence.

Outside scope: product administration, cloud provisioning, deep SQL instruction, distributed-storage internals, full Data Vault training, streaming-engine implementation, BI-dashboard authoring, ML feature platforms, and legal compliance advice. Companion courses supply specialist platform and query depth. No SQL was executed for this plan; planned outputs and failure traces remain illustrative until detailed lessons are implemented and verified. Detailed source access limits, coverage mapping, and review status are maintained in the repository README.
