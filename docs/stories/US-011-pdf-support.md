---
id: US-011
title: "PDF document support"
status: todo
depends_on: [US-006, US-010]
type: evolution
---

## PDF Document Support

**As a** user with PDF documents,
**I want** to index PDF files alongside text files,
**so that** I can semantically search across all my document formats.

### Acceptance Criteria

- [ ] `semtool index <file.pdf>` extracts text from PDF using `pdf-parse`
- [ ] Text is extracted per-page, and `pageNumber` metadata is stored in each chunk
- [ ] PDF pages are chunked using the same chunker logic as plain text
- [ ] Query results from PDF files display page number in output: `file.pdf — page 3, chunk 2`
- [ ] Handles PDFs with no extractable text gracefully (warning, skip)
- [ ] Folder scan (US-010) also picks up `.pdf` files
