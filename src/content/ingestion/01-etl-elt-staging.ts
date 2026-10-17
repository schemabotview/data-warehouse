import type { Section } from '../types'

export const etlEltStaging: Section = {
  id: 'etl-elt-staging',
  title: 'ETL versus ELT and staging boundaries',
  scene: 'etl-vs-elt',
  focus: 'staging',
  slide: `## ETL versus ELT and staging boundaries

The difference is **where the transformation runs**. The staging boundary matters in both.

### Two routes
- **ETL:** transform in a separate engine, then load the result
- **ELT:** load raw data first, transform inside the warehouse
- ELT keeps the raw copy close; ETL can filter before loading
- Sensitive fields may need dropping before they ever land

### A staging boundary
- Source columns arrive **untouched**: 'SHIPPED' stays 'SHIPPED'
- Each row gains load metadata: source, batch, load time
- Staging is not for reporting; models read from it
- Re-running models from staging needs no new extract
- Its retention is a decision, not an accident`,
  narration:
    "Ingestion begins with a choice of where the transformation work happens. In ETL, data is extracted, transformed in a separate engine, and only the shaped result is loaded into the warehouse. In ELT, the raw data is loaded first, into a staging area inside the warehouse, and transformed there with SQL. ELT keeps a raw copy close to the models, which makes reprocessing cheap. ETL can filter or mask before anything lands, which matters when some fields should never reach the warehouse at all. Whichever route is used, there should be a clear staging boundary. On one side, the source's columns arrive untouched. The status column still says shipped in two different cases, because cleaning is a modelling decision made later, in the open. On the other side, each row gains load metadata: which source it came from, which batch, and when it was loaded. Staging is not for reports. Models read from it, and they can be rebuilt from it without extracting the source again. How long staging is kept is a deliberate decision too.",
}
