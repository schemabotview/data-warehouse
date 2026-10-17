import type { Section } from '../types'

export const backupRestore: Section = {
  id: 'backup-restore',
  title: 'Recovery, backup and restore evidence',
  scene: 'recovery',
  focus: 'rpo',
  slide: `## Recovery, backup and restore evidence

Different failures need different recoveries. **Rerunning** a load does not replace **restoring** lost data.

### Two failures
- **Interrupted load:** storage is intact; rerun idempotently from 77
- **Lost storage:** restore a backup, then replay later changes

### Objectives, and the evidence for them
- **RPO:** how much data may be lost — target 1 hour
- **RTO:** how fast service returns — target 4 hours
- Only a **restore test** shows the targets are met
- Keep the backup separate: another region, separate access

### What is not an independent backup
- A replayable source, which keeps logs only for a while
- Time travel inside the same system that failed`,
  narration:
    "Recovery depends on what failed. If a load is interrupted, storage is intact. The idempotent load from the loading course simply reruns from the last committed batch, and nothing needs restoring. If storage itself is lost, rerunning is not enough, because there is nothing left to rerun into. You restore the latest backup, and then replay the changes made since it was taken. Two objectives describe what is acceptable. The recovery point objective is how much data may be lost: here, at most an hour. The recovery time objective is how quickly service must return: here, within four hours. These targets mean nothing until a restore test shows them. The last test restored to a point forty minutes old, then replayed to the present, and was back in service in just over three hours. Keep backups genuinely separate, in another region, with separate access. And be clear about what is not an independent backup: a replayable source, which keeps its logs only for a limited time, or time travel inside the very system that just failed.",
}
