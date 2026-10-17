import type { Section } from '../types'

export const clusteringIndexing: Section = {
  id: 'clustering-indexing',
  title: 'Clustering, sorting and indexing',
  scene: 'three-mechanisms',
  focus: 'index',
  slide: `## Clustering, sorting and indexing

Three mechanisms are often called by one name. They work differently, and engines offer different ones.

### Sort order and block statistics
- Rows stored in date order give each block a narrow **min/max**
- A filter for 14–21 Sept reads 1 block of 3
- The same rows in arrival order: every block must be read
- Sorting happens at load time, so it costs the load

### Clustering and indexes
- **Clustering** keeps related rows together; it can decay
- A **B-tree index** is a separate structure for finding few rows
- Indexes suit point lookups more than large scans
- Every index costs storage and time on each write
- Choose by workload, and by what the engine supports
- Measure blocks read, before and after`,
  narration:
    "Sorting, clustering and indexing are often spoken of as if they were one thing. They are three different mechanisms, and different engines offer different ones. Start with sort order. If rows are stored in date order, each storage block covers a narrow range of dates, and many engines keep each block's minimum and maximum. A filter for the fourteenth to the twenty first of September can then check those ranges and read just one block of the three. Store the same rows in the order they arrived, and every block spans almost the whole month, so every block has to be read. Clustering keeps related rows physically close together. Some engines maintain it automatically, but as new data arrives it can decay and need attention. An index is something else again: a separate structure, like a B-tree, that finds a small number of rows quickly. That suits point lookups far better than scans over a large share of a table, and every index costs storage and slows every write. So choose by the workload, and by what your engine actually supports.",
}
