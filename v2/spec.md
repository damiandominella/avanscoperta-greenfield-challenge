# Semantic Search Tool

A CLI program that indexes text documents using embedding vectors and queries the index with natural language, returning ranked relevant passages.

---

## Tech Stack

- **Language**: TypeScript (Node.js)
- **CLI framework**: `commander`
- **Embedding model**: Local model via `@xenova/transformers` (ONNX runtime) — model: `all-MiniLM-L6-v2` (384-dim, good speed/quality tradeoff)
- **Similarity metric**: Cosine similarity
- **Storage**: JSON file loaded into memory at query time
- **Testing**: `vitest`

---

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌────────────────┐
│  CLI Layer   │────▶│  Core Engine  │────▶│  Storage (JSON) │
│  (commander) │     │              │     └────────────────┘
└─────────────┘     │  - Chunker   │     ┌────────────────┐
                    │  - Embedder  │────▶│  Embedding Model│
                    │  - Searcher  │     │  (transformers) │
                    └──────────────┘     └────────────────┘
```

### Key design decisions for future extensibility

- **Document source abstraction**: `DocumentLoader` interface so plain text, PDF (`pdf-parse`), and folder-scan loaders can be swapped in without touching core logic.
- **Chunk metadata**: Each chunk stores `{ sourceFile, sourceType, pageNumber?, chunkIndex, text, embedding }` — the `pageNumber` field is nullable, ready for PDF support.
- **Embedding abstraction**: `Embedder` interface wrapping the model call, so HyDE (Hypothetical Document Embeddings) can be layered on top — HyDE generates a hypothetical answer via LLM, embeds *that*, then searches. The interface stays the same; only the query-time pipeline changes.
- **MCP server**: The core engine should be a pure library with no CLI dependency, so it can be mounted as an MCP tool server later without refactoring.

---

## Chunking Strategy

- Split by paragraphs (double newline), then enforce:
  - **Max chunk size**: ~500 tokens (~2000 chars)
  - **Overlap**: 1 sentence with previous chunk (for context continuity)
- If a paragraph exceeds max size, split by sentence boundaries.
- Each chunk retains metadata linking it back to source file (and page, when available).

---

## Storage Format

Single JSON file (e.g., `index.json`):

```json
{
  "version": 1,
  "model": "all-MiniLM-L6-v2",
  "documents": [
    {
      "id": "uuid",
      "sourceFile": "travel-rome.txt",
      "sourceType": "text",
      "pageNumber": null,
      "chunkIndex": 0,
      "text": "The Colosseum is one of Rome's most...",
      "embedding": [0.012, -0.034, ...]
    }
  ]
}
```

- On `index`: load existing file (if any), append/update, write back.
- On `query`: load into memory, compute similarities, return results.
- Store `model` in index to detect mismatches if the embedding model changes.

---

## CLI Interface

```bash
# Index a text file
semtool index <file>            # Index a single .txt file
semtool index <file> --reset    # Clear existing index before indexing

# Query the index
semtool query "<question>"              # Top 3 results (default)
semtool query "<question>" --top 5      # Top N results
semtool query "<question>" --threshold 0.5  # Min similarity score

# Utility
semtool info                    # Show index stats (doc count, model, file size)
```

### Query Output Format

```
[1] (score: 0.82) travel-rome.txt — chunk 3
    "The Colosseum, originally known as the Flavian Amphitheatre, is a must-visit
     when travelling to Rome..."

[2] (score: 0.65) travel-rome.txt — chunk 5
    "Near the Colosseum you can also explore the Roman Forum..."
```

---

## Scope

### Phase 1 — MVP (implement now)

- [x] Index plain `.txt` files (one at a time)
- [x] Query with natural language, return top-N ranked results with source filename and chunk reference
- [x] JSON file-based storage
- [x] Local embedding via `@xenova/transformers`

### Phase 2 — Planned (design for now, implement later)

- [ ] **Folder scan**: `semtool index <folder>` — recursively index all supported files
- [ ] **PDF support**: Parse PDFs with `pdf-parse`, extract per-page text, store `pageNumber` in metadata
- [ ] **HyDE query enhancement**: At query time, generate a hypothetical answer using an LLM, embed that answer, and use it for similarity search instead of the raw question
- [ ] **MCP server**: Expose `search` and `index` as MCP tools so LLMs can query the index directly

---

## Testing

Use `vitest` for all tests. Structure tests to mirror `src/` layout under a `tests/` directory.

### Unit Tests

- **Chunker**: Verify paragraph splitting, max-size enforcement, overlap behavior, and metadata attachment.
- **Embedder**: Mock the model, assert output shape (384-dim vector), and that the interface contract holds.
- **Searcher**: Given a pre-built in-memory index, assert correct ranking order and that cosine similarity scores are within expected ranges.
- **Storage**: Round-trip test — write index to JSON, read it back, confirm data integrity and model mismatch detection.

### Integration Tests

- **Index → Query pipeline**: Index the two test `.txt` files, then run queries and assert expected results match the validation table below.
- **Idempotency**: Indexing the same file twice should not duplicate chunks.
- **Empty index**: Querying an empty index should return an empty result set, not crash.

### Running

```bash
npx vitest          # watch mode during dev
npx vitest run      # single run (CI)
```

---

## Validation

### Test Data

1. `java-programming.txt` — A text about Java programming fundamentals (classes, OOP, JVM, etc.)
2. `travel-rome.txt` — A text about travelling to Rome (Colosseum, Vatican, local food, etc.)

### Test Cases

| Query | Expected top result | Expected source |
|---|---|---|
| "How to visit the Colosseo" | Passage about the Colosseum / visiting Rome | `travel-rome.txt` |
| "What is object oriented programming" | Passage about OOP / Java classes | `java-programming.txt` |
| "Best pasta in Italy" | Passage about Roman food (if present) OR no strong match | `travel-rome.txt` or low score |
| "quantum physics" | No relevant result — all scores below threshold | — |

The last two cases validate that the tool doesn't hallucinate relevance where there is none.