---
id: US-008
title: "End-to-end validation with test data"
status: todo
depends_on: [US-006, US-007]
type: feature
---

## End-to-End Validation with Test Data

**As a** developer,
**I want** to validate the full pipeline against the spec's test case table,
**so that** I can confirm the tool returns semantically correct results and doesn't hallucinate relevance.

### Acceptance Criteria

- [ ] Create test data files: `java-programming.txt` and `travel-rome.txt`
- [ ] Index both files
- [ ] Query "How to visit the Colosseo" → top result from `travel-rome.txt`
- [ ] Query "What is object oriented programming" → top result from `java-programming.txt`
- [ ] Query "Best pasta in Italy" → result from `travel-rome.txt` or low score
- [ ] Query "quantum physics" → no relevant result, all scores below threshold
- [ ] The last two cases validate the tool doesn't hallucinate relevance where there is none

### TDD Notes

- Red: parametrized test table with all four queries and expected outcomes
- Green: all cases pass with the real model
- These are true integration tests using the actual embedding model
