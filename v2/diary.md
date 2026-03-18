# Semtool TDD Diary

## Step 1: Project Scaffolding — DONE

**Implemented:** Project scaffolding with `package.json`, `tsconfig.json`, vitest config, and a dummy passing test.

**Test results:**
```
 ✓ tests/setup.test.ts (1 test) 1ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
```

**Next step:** Chunker — paragraph splitting logic. Tests: splits by double newline, respects max size, applies overlap.

## Step 2: Chunker — DONE

**Implemented:** `src/chunker.ts` — `chunk(text, options?)` function that splits text into chunks by double newline, enforces max chunk size (default 2000 chars) by splitting at sentence boundaries, and applies 1-sentence overlap between consecutive chunks.

**Test results:**
```
 ✓ tests/setup.test.ts (1 test) 1ms
 ✓ tests/chunker.test.ts (8 tests) 3ms

 Test Files  2 passed (2)
      Tests  9 passed (9)
```

**Tests cover:** paragraph splitting, single chunk, empty/whitespace input, trimming, long paragraph sentence splitting, 1-sentence overlap, short paragraphs unchanged.

**Next step:** Embedder interface + local model — load `all-MiniLM-L6-v2` via `@xenova/transformers`, embed a string, assert output is a 384-dim float array.
