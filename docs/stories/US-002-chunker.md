---
id: US-002
title: "Text chunker"
status: done
depends_on: [US-001]
type: feature
---

## Text Chunker

**As a** user indexing a document,
**I want** the system to split text into meaningful, size-limited chunks with overlap,
**so that** each chunk captures a coherent passage and context isn't lost at boundaries.

### Acceptance Criteria

- [ ] Splits text by double newline (paragraph boundaries)
- [ ] Enforces max chunk size (~2000 chars) by splitting at sentence boundaries when a paragraph exceeds it
- [ ] Applies 1-sentence overlap between consecutive chunks for context continuity
- [ ] Handles edge cases: empty input, whitespace-only input, single paragraph
- [ ] Trims whitespace from chunks
- [ ] Each chunk retains its index position
