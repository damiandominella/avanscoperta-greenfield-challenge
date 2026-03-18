---
id: US-010
title: "Folder scan indexing"
status: todo
depends_on: [US-006]
type: evolution
---

## Folder Scan Indexing

**As a** user with many text files,
**I want** to run `semtool index <folder>` to recursively index all supported files in a directory,
**so that** I don't have to index files one by one.

### Acceptance Criteria

- [ ] `semtool index <folder>` recursively discovers all supported files (`.txt` initially)
- [ ] Each file is chunked, embedded, and stored following the same pipeline as single-file indexing
- [ ] Skips unsupported file types with a warning
- [ ] Idempotent: re-indexing a folder doesn't duplicate existing chunks
- [ ] Progress feedback during indexing (file count, current file)
- [ ] `DocumentLoader` interface abstraction for different source types
