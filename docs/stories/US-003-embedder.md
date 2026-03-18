---
id: US-003
title: "Embedder interface and local model"
status: todo
depends_on: [US-001]
type: feature
---

## Embedder Interface and Local Model

**As a** developer,
**I want** an Embedder interface backed by the `all-MiniLM-L6-v2` model via `@xenova/transformers`,
**so that** I can convert text into 384-dimensional embedding vectors for semantic comparison.

### Acceptance Criteria

- [ ] `Embedder` interface with an `embed(text: string): Promise<number[]>` method
- [ ] Concrete implementation loading `all-MiniLM-L6-v2` via `@xenova/transformers` (ONNX)
- [ ] `embed()` returns a `number[]` of exactly 384 dimensions
- [ ] All values in the returned array are finite floats
- [ ] The model loads once and is reused across calls (no re-initialization)

### TDD Notes

- Red: test that `embed("hello world")` returns a 384-dim float array
- Green: implement the model loading and embedding pipeline
- Refactor: extract the interface for future extensibility (e.g., HyDE)
