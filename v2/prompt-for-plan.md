# Prompt

You are building the project described in the attached spec.md using strict TDD (Red-Green-Refactor).

## Rules

1. **Work in small incremental steps.** Each step = one unit of functionality.
2. **For each step, follow this exact sequence:**
   - Write the failing test(s) first (`vitest`).
   - Run the tests — confirm they fail (red).
   - Write the minimum implementation to make them pass.
   - Run the tests — confirm they pass (green).
   - Refactor if needed, run tests again.
3. **After each green step, STOP and ask me for permission before moving to the next step.** Show me:
   - What you just implemented (one-liner summary).
   - Test results (pass/fail output).
   - What the next step will be.
4. **Do not skip ahead, batch multiple steps, or implement anything without a test covering it first.**
5. **Do not write placeholder or skeleton code.** Every line of production code must exist because a test demanded it.

## Step Order

Follow this progression. Each bullet is one stop-and-ask cycle:

1. Project scaffolding — `package.json`, `tsconfig.json`, vitest config. Test: vitest runs with a dummy passing test.
2. Chunker — paragraph splitting logic. Tests: splits by double newline, respects max size, applies overlap.
3. Embedder interface + local model — load `all-MiniLM-L6-v2` via `@xenova/transformers`, embed a string, assert output is a 384-dim float array.
4. Storage — write and read index JSON file. Tests: round-trip integrity, model mismatch detection, append without duplicating.
5. Searcher — cosine similarity + ranking. Tests: given hardcoded embeddings, assert correct ranking order and score ranges.
6. Index command — CLI wiring via `commander`. Integration test: index a `.txt` file, assert index.json is created with correct chunks.
7. Query command — CLI wiring. Integration test: index two files, query, assert correct top result.
8. Validation — run the full test case table from the spec (Colosseo, OOP, pasta, quantum physics).
9. Final refactor pass — clean up, add `semtool info` command, confirm all tests still green.

## Start

Begin with step 1. Show me your plan for the first test before writing any code.