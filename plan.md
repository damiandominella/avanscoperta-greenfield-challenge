# Plan: Text Document Indexer with Embeddings CLI

## Context

Implementing a greenfield TypeScript CLI that indexes text documents using local embedding vectors and supports natural language querying. The goal is a simple, modular tool that stores vectors in a JSON file (no VectorDB) and uses Transformers.js for local embeddings. The architecture should accommodate future nice-to-haves (PDF parsing, folder indexing, HDE, MCP server) without implementing them now.

## Project Structure

```
src/
  cli.ts              # Entry point, commander setup
  index-command.ts    # "index" subcommand handler
  query-command.ts    # "query" subcommand handler
  chunker.ts          # Sentence-based text splitting
  embedder.ts         # Transformers.js wrapper (all-MiniLM-L6-v2, 384-dim)
  store.ts            # JSON vector store: load/save/cosine search
  types.ts            # Shared interfaces
test-data/
  java-programming.txt
  rome-travel.txt
package.json
tsconfig.json
.gitignore
```

## Dependencies

- **Runtime:** `@huggingface/transformers`, `commander`
- **Dev:** `typescript`, `@types/node`, `tsx`

## Implementation Order

1. **Scaffolding** — `package.json`, `tsconfig.json`, `.gitignore`, install deps
2. **`src/types.ts`** — Interfaces: `Chunk`, `SourceRef`, `VectorIndex`, `SearchResult`
   - `SourceRef` has `file` + `chunkIndex` (extensible for future `pageNumber`)
   - `VectorIndex` stores `model` name to detect stale indexes
3. **`src/chunker.ts`** — `chunkText(text: string): string[]` — split on sentence boundaries (`/(?<=[.!?])\s+/`), filter short strings (<10 chars)
4. **`src/embedder.ts`** — `embed(texts: string[]): Promise<number[][]>` + `getModelName(): string` — lazy-loads pipeline, caches model, uses `Xenova/all-MiniLM-L6-v2`
5. **`src/store.ts`** — `loadIndex`, `saveIndex`, `addChunks`, `removeChunksByFile`, `search` — cosine similarity, top-K results. Re-indexing is idempotent (removes old chunks for same file before adding)
6. **`src/index-command.ts`** — Reads file → chunks → embeds → stores. Prints summary.
7. **`src/query-command.ts`** — Embeds question → searches → prints ranked results with filename and chunk index
8. **`src/cli.ts`** — Commander setup with two subcommands:
   - `cli index <file> [--store <path>]`
   - `cli query <question> [--store <path>] [--top-k <number>]`
   - Store defaults to `./vector-index.json`, top-k defaults to 3
9. **`test-data/`** — Two validation texts (Java programming + Rome travel)

## CLI Usage

```
npm run cli -- index test-data/java-programming.txt
npm run cli -- index test-data/rome-travel.txt
npm run cli -- query "How to visit Colosseo"
```

## Storage Format (vector-index.json)

```json
{
  "model": "Xenova/all-MiniLM-L6-v2",
  "createdAt": "...",
  "updatedAt": "...",
  "chunks": [{ "id": "hash", "text": "...", "embedding": [384 floats], "source": { "file": "...", "chunkIndex": 0 } }]
}
```

## Verification

1. Index both test files
2. Query "How to visit Colosseo" → top result should be from `rome-travel.txt`
3. Query "What is the JVM" → top result should be from `java-programming.txt`

## Future Extensibility (not implemented)

- **Folder parsing:** New command calling `indexFile` in a loop
- **PDF:** New `pdf-parser.ts`, add optional `pageNumber` to `SourceRef`
- **HDE:** Pre-processing step in `query-command.ts` using an LLM
- **MCP server:** New `mcp-server.ts` importing existing functions as tools
