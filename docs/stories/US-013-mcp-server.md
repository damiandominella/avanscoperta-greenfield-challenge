---
id: US-013
title: "MCP tool server"
status: todo
depends_on: [US-005, US-006, US-009]
type: evolution
---

## MCP Tool Server

**As an** LLM agent,
**I want** to call `search` and `index` as MCP tools,
**so that** I can query the semantic index directly without going through the CLI.

### Acceptance Criteria

- [ ] Expose `index` as an MCP tool: accepts a file path, indexes it, returns confirmation
- [ ] Expose `search` as an MCP tool: accepts a query string, returns ranked results
- [ ] Core engine is a pure library with no CLI dependency (achieved in US-009 refactor)
- [ ] MCP server starts via `semtool serve` or a dedicated entry point
- [ ] Tool descriptors follow MCP spec with proper JSON schemas for inputs/outputs
- [ ] Integration test: start MCP server, call search tool, verify results
