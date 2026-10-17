import type { Section } from '../types'

export const incidentDiagnosis: Section = {
  id: 'incident-diagnosis',
  title: 'Observability and incident diagnosis',
  scene: 'stale-dashboard',
  focus: 'capture-lag',
  slide: `## Observability and incident diagnosis

When a dashboard is stale, **measure each stage** from source to screen instead of guessing.

### Tracing the delay
- **Source:** orders arriving normally until 06:55
- **Capture:** connector stuck at 19:02 Sunday — found it
- **Transform** and **publish** ran on what they were given
- **Dashboard cache** adds an hour on top
- Each stage needs its own freshness measurement
- Start where the data is known good, then move forward

### After the incident
- Restart, replay from the last committed position, republish
- Tell users what was affected, and when it was fixed
- Add the missing alert: capture lag over 30 minutes
- Write the timeline down while it is fresh`,
  narration:
    "Finance reports that sales look flat this morning. The dashboard is stale, but stale only tells you that something, somewhere, is late. The fastest diagnosis measures each stage from the source to the screen. The source is fine: orders were arriving normally until a few minutes ago. Capture is not. The connector stopped reading at two minutes past seven on Sunday evening, and has been stuck ever since. That is the root cause. Downstream, transformation and publication did exactly what they were told, on the data they were given, which is why every job was green. And the dashboard's own cache adds up to an hour on top of whatever it receives. This only works if every stage reports its own freshness, so build that measurement in. Recovery follows the patterns from earlier courses: restart the connector, replay from the last committed position, and republish. Tell users what was affected and when it was fixed. Then close the gap that let it happen: an alert on capture lag. And write the timeline down while it is still fresh.",
}
