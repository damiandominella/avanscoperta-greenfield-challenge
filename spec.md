The goal is to crete a program that is able to index some documents using embedding vectors and query the index with natural language.

# Tech constraints

- use typescript and the libraries better suited for this language
- create a CLI interface
- for the storage use a file (load it in memory) instead of a VectorDB
- for the embedding, start using a local embedding model


# Functions

## Mandatory

- Index: Process a text and build/update a vector storage for embedding
- Query: Accept a natural-language question and return ranked results with PDF filename and page number

## Nice to have

Do not implement it yet, just take care of them in the architecture design

- Parse all files in a folder and refer to the file in the answer
- Be able to also parse PDFs and refers to the page of text in the answer
- Use HDE questions in embeddingSecond part
- Build a MCP server to allow models to search inside it

# Validation

- index two text one about programming in Java and another about travelling to Rome
- for the query "How to visit Colosseo" you have to return a piece of the text about travelling to Rome

