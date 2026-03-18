export interface ChunkOptions {
  maxChunkSize?: number;
}

const DEFAULT_MAX_CHUNK_SIZE = 2000;

function splitSentences(text: string): string[] {
  const raw = text.match(/[^.!?]+[.!?]+/g);
  if (!raw) return text.trim() ? [text.trim()] : [];
  return raw.map((s) => s.trim());
}

function splitParagraphWithOverlap(
  sentences: string[],
  maxSize: number,
): string[] {
  const chunks: string[] = [];
  let current: string[] = [];
  let currentLen = 0;

  for (const sentence of sentences) {
    const added = currentLen === 0 ? sentence.length : currentLen + 1 + sentence.length;

    if (added > maxSize && current.length > 0) {
      chunks.push(current.join(" "));
      const overlap = current[current.length - 1];
      current = [overlap];
      currentLen = overlap.length;
    }

    current.push(sentence);
    currentLen = current.join(" ").length;
  }

  if (current.length > 0) {
    chunks.push(current.join(" "));
  }

  return chunks;
}

export function chunk(text: string, options?: ChunkOptions): string[] {
  const maxSize = options?.maxChunkSize ?? DEFAULT_MAX_CHUNK_SIZE;

  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const result: string[] = [];

  for (const para of paragraphs) {
    if (para.length <= maxSize) {
      result.push(para);
    } else {
      const sentences = splitSentences(para);
      result.push(...splitParagraphWithOverlap(sentences, maxSize));
    }
  }

  return result;
}
