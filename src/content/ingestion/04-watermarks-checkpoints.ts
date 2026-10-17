import type { Section } from '../types'

export const watermarksCheckpoints: Section = {
  id: 'watermarks-checkpoints',
  title: 'Watermarks, checkpoints and consistent cuts',
  scene: 'checkpoints',
  focus: 'ingest-ckpt',
  slide: `## Watermarks, checkpoints and consistent cuts

A pipeline has **several** checkpoints. Each promises something different about what has arrived.

### Three positions after a crash
- **Source:** the connector has read up to 0/1A6
- **Transport:** the topic has delivered offset 1287
- **Ingestion:** batch 77 is committed to staging
- Restart from the **last committed** batch and replay 78
- Batch 78 may be half-written; replay overwrites it

### A watermark is only as good as its semantics
- It needs a **total order**: log position, not wall clock
- Can a lower value still arrive? Then it is not final
- Advance it only **after** the rows are committed
- Replays must be safe: deduplicate by position and key
- One watermark per source, never one global clock
- Commit rows and checkpoint together, if possible`,
  narration:
    "A pipeline does not have one checkpoint. It has several, and each one promises something different. Here the source log has reached position one A nine. The connector has read up to one A six. The transport topic has delivered messages up to offset twelve eighty seven. And the ingestion job has committed batch seventy seven to staging. Now suppose the job crashes halfway through batch seventy eight. Which position do you restart from? Only the ingestion checkpoint says what was actually committed, so the job restarts after batch seventy seven and replays seventy eight. Some of seventy eight may already have been written, which is why replays must be safe to repeat, with duplicates removed by log position and key. The same care applies to any watermark. It is meaningful only if values arrive in a total order, which a log position gives and a wall clock does not. If a lower value can still arrive later, the watermark is not final. And it should advance only after the rows it covers are committed.",
}
