---
id: US-006
title: "CLI index command"
status: todo
depends_on: [US-002, US-003, US-004]
type: feature
---

## CLI Index Command

**As a** user,
**I want** to run `semtool index <file>` from the terminal,
**so that** I can index a `.txt` file and have its chunks and embeddings stored in `index.json`.

### Acceptance Criteria

- [ ] `semtool index <file>` reads a `.txt` file, chunks it, embeds each chunk, and writes to `index.json`
- [ ] `semtool index <file> --reset` clears the existing index before indexing
- [ ] CLI wiring via `commander`
- [ ] Integration test: index a `.txt` file, assert `index.json` is created with the correct number of chunks
- [ ] Each stored document contains: id, sourceFile, sourceType, pageNumber (null for txt), chunkIndex, text, embedding
- [ ] Indexing the same file twice does not duplicate chunks (idempotent)
- [ ] Error handling: file not found, unsupported file type

### TDD Notes

- Red: integration test — index a file, check index.json exists and has correct structure
- Red: idempotency test — index same file twice, count stays the same
- Green: wire chunker + embedder + storage through commander
