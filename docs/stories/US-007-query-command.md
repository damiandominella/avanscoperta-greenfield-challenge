---
id: US-007
title: "CLI query command"
status: todo
depends_on: [US-005, US-006]
type: feature
---

## CLI Query Command

**As a** user,
**I want** to run `semtool query "<question>"` to search my indexed documents,
**so that** I get the most relevant passages ranked by semantic similarity.

### Acceptance Criteria

- [ ] `semtool query "<question>"` returns top 3 results by default
- [ ] `semtool query "<question>" --top N` returns top N results
- [ ] `semtool query "<question>" --threshold 0.5` filters results below the score threshold
- [ ] Output format: `[rank] (score: X.XX) file — chunk N` followed by a text preview
- [ ] Integration test: index two files, query, assert correct top result
- [ ] Querying an empty index returns an empty result set (no crash)
- [ ] CLI wiring via `commander`

### TDD Notes

- Red: integration test — index two test files, query "Colosseo", assert travel-rome.txt is top result
- Red: empty index returns empty results
- Green: wire searcher + storage through commander, format output
