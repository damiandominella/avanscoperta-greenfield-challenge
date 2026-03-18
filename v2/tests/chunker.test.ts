import { describe, expect, it } from "vitest";
import { chunk } from "../src/chunker.js";

describe("chunker", () => {
  it("splits text by double newline into paragraphs", () => {
    const text = "paragraph one\n\nparagraph two\n\nparagraph three";
    expect(chunk(text)).toEqual(["paragraph one", "paragraph two", "paragraph three"]);
  });

  it("returns a single chunk for short text without double newlines", () => {
    expect(chunk("just one paragraph")).toEqual(["just one paragraph"]);
  });

  it("returns empty array for empty string", () => {
    expect(chunk("")).toEqual([]);
  });

  it("returns empty array for whitespace-only string", () => {
    expect(chunk("   \n\n   ")).toEqual([]);
  });

  it("trims whitespace from each chunk", () => {
    const text = "  para one  \n\n  para two  ";
    expect(chunk(text)).toEqual(["para one", "para two"]);
  });

  it("splits a long paragraph by sentence boundaries when exceeding max size", () => {
    const sentence = "This is a test sentence that is moderately long. ";
    const longParagraph = sentence.repeat(50); // ~2500 chars, over 2000 limit

    const chunks = chunk(longParagraph, { maxChunkSize: 2000 });

    expect(chunks.length).toBeGreaterThan(1);
    for (const c of chunks) {
      expect(c.length).toBeLessThanOrEqual(2000);
    }
  });

  it("applies 1-sentence overlap between consecutive chunks", () => {
    const sentences = Array.from({ length: 50 }, (_, i) => `Sentence number ${i + 1}.`);
    const longParagraph = sentences.join(" ");

    const chunks = chunk(longParagraph, { maxChunkSize: 200 });

    expect(chunks.length).toBeGreaterThan(1);
    for (let i = 1; i < chunks.length; i++) {
      const prevChunkSentences = chunks[i - 1].match(/[^.!?]+[.!?]+/g) || [];
      const lastSentenceOfPrev = prevChunkSentences[prevChunkSentences.length - 1]?.trim();
      expect(chunks[i].startsWith(lastSentenceOfPrev!)).toBe(true);
    }
  });

  it("keeps paragraphs under max size as single chunks", () => {
    const text = "Short paragraph one.\n\nShort paragraph two.";
    const chunks = chunk(text, { maxChunkSize: 2000 });
    expect(chunks).toEqual(["Short paragraph one.", "Short paragraph two."]);
  });
});
