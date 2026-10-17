import type { Section } from '../types'

export const dependencyOrder: Section = {
  id: 'dependency-order',
  title: 'Dependency ordering and dimension loads',
  scene: 'load-dag',
  focus: 'dims',
  slide: `## Dependency ordering and dimension loads

A load is a **dependency graph**. Each step runs only when everything it reads is ready.

### Order of work
- Staged inputs first, each at a recorded batch
- **Dimensions before facts**: keys must exist before facts need them
- New members and new versions are issued in the dimension load
- Then facts resolve their keys, load, and are checked
- Publication is the last step, and only if checks pass

### Why the order matters
- A fact loaded first finds no key and falls to Unknown
- Two dimensions with no dependency can load in parallel
- A failed step stops only what depends on it
- The graph is code: reviewed, versioned, and the same each run`,
  narration:
    "A warehouse load is not one big script. It is a graph of steps, and each step runs only once everything it reads is ready. This course follows one load from end to end. At the top are the staged inputs, each identified by the batch it came from. Next come the dimensions, and they must come before the facts. When a new customer or a new product version appears, the dimension load is where its surrogate key is issued. If the facts were loaded first, they would look for keys that did not exist yet, and fall through to Unknown. Once the dimensions are done, facts resolve their keys, load, and are checked. Publication comes last, and only if the checks pass. The graph also tells you what can run at the same time. Customers and products do not depend on each other, so they can load in parallel. And when a step fails, it stops what depends on it, and nothing else. Keep the graph as code, so it is reviewed, versioned, and runs the same way every time.",
}
