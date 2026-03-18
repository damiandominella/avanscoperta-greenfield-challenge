---
id: US-005
title: "Cosine similarity searcher"
status: todo
depends_on: [US-003, US-004]
type: feature
---

## Cosine Similarity Searcher

**As a** user querying the index,
**I want** chunks ranked by cosine similarity to my query embedding,
**so that** the most semantically relevant passages appear first.

### Acceptance Criteria

- [ ] Compute cosine similarity between a query embedding and all stored document embeddings
- [ ] Return results sorted by descending similarity score
- [ ] Support a `top` parameter to limit the number of results (default: 3)
- [ ] Support a `threshold` parameter to filter out low-scoring results
- [ ] Each result includes: score, sourceFile, chunkIndex, text
- [ ] Given hardcoded embeddings, ranking order is deterministic and correct
- [ ] Scores are in the range [-1, 1]

### TDD Notes

- Red: given known embeddings, assert ranking order
- Red: assert score ranges are valid
- Red: test `top` and `threshold` filtering
- Green: implement cosine similarity and ranking logic
