---
id: US-004
title: "JSON index storage"
status: todo
depends_on: [US-001]
type: feature
---

## JSON Index Storage

**As a** user,
**I want** indexed chunks and their embeddings persisted to a JSON file,
**so that** I can query them later without re-indexing.

### Acceptance Criteria

- [ ] Write an index (with version, model name, and documents array) to a JSON file
- [ ] Read an existing index file back into memory with full data integrity
- [ ] Round-trip test: write → read → data is identical
- [ ] Detect model mismatch: if the stored index uses a different model than the current one, raise an error
- [ ] Append new documents without duplicating existing ones (idempotent by sourceFile + chunkIndex)
- [ ] Handle missing file gracefully (return empty index on first run)
- [ ] Index file follows the schema: `{ version, model, documents: [...] }`

### TDD Notes

- Red: round-trip integrity test
- Red: model mismatch detection test
- Red: append-without-duplicating test
- Green: implement read/write functions
