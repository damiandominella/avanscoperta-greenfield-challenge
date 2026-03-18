---
id: US-009
title: "Info command and final refactor"
status: todo
depends_on: [US-008]
type: tech-debt
---

## Info Command and Final Refactor

**As a** user,
**I want** to run `semtool info` to see index statistics,
**so that** I can quickly check how many documents are indexed, which model was used, and the index file size.

### Acceptance Criteria

- [ ] `semtool info` displays: document count, model name, index file size
- [ ] Handles missing index file gracefully (shows "no index found")
- [ ] Final refactor pass: clean up code, ensure consistent naming, remove dead code
- [ ] All existing tests still pass after refactor
- [ ] Code is structured as a pure library with no CLI dependency in core modules (ready for MCP server in Phase 2)

### TDD Notes

- Red: test info output with a known index
- Red: test info with missing index file
- Green: implement the info command
- Refactor: clean up the full codebase
