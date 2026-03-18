---
id: US-012
title: "HyDE query enhancement"
status: todo
depends_on: [US-007]
type: evolution
---

## HyDE Query Enhancement

**As a** user making vague or short queries,
**I want** the system to generate a hypothetical answer via LLM and embed that instead of my raw question,
**so that** search results are more accurate by comparing document-like embeddings to document-like embeddings.

### Acceptance Criteria

- [ ] At query time, an LLM generates a hypothetical answer to the user's question
- [ ] The hypothetical answer is embedded instead of the raw query text
- [ ] Similarity search uses the hypothetical-answer embedding
- [ ] The `Embedder` interface remains unchanged; HyDE wraps the query pipeline, not the embedding
- [ ] Fallback: if LLM call fails, fall back to raw query embedding
- [ ] Optional flag: `semtool query "<question>" --hyde` to enable/disable
- [ ] Measurably improves recall on vague queries compared to raw embedding
