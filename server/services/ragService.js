const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

const extractTextFromFile = async (filePath) => {
  const extension = path.extname(filePath).toLowerCase();

  // PDF
  if (extension === ".pdf") {
    const buffer = fs.readFileSync(filePath);

    const parser = new PDFParse({
      data: buffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
  }

  // DOCX
  if (extension === ".docx") {
    const result = await mammoth.extractRawText({
      path: filePath,
    });

    return result.value;
  }

  // TXT
  if (extension === ".txt") {
    return fs.readFileSync(filePath, "utf8");
  }

  throw new Error("Unsupported file type.");
};


// Split document into smaller chunks
const createChunks = (text, chunkSize = 1500) => {
  const cleanText = text
    .replace(/\s+/g, " ")
    .trim();

  const chunks = [];

  for (let i = 0; i < cleanText.length; i += chunkSize) {
    chunks.push(cleanText.slice(i, i + chunkSize));
  }

  return chunks;
};


// Simple keyword-based retrieval
const retrieveRelevantChunks = (
  chunks,
  query,
  topK = 4
) => {
  const queryWords = query
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 2);

  const scoredChunks = chunks.map((chunk) => {
    const lowerChunk = chunk.toLowerCase();

    let score = 0;

    queryWords.forEach((word) => {
      if (lowerChunk.includes(word)) {
        score++;
      }
    });

    return {
      chunk,
      score,
    };
  });

  return scoredChunks
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((item) => item.chunk);
};


// Complete RAG pipeline
const buildKnowledgeContext = async (
  filePath,
  query
) => {
  const text = await extractTextFromFile(filePath);

  if (!text || !text.trim()) {
    throw new Error("No readable text found in document.");
  }

  const chunks = createChunks(text);

  const relevantChunks = retrieveRelevantChunks(
    chunks,
    query
  );

  return {
    fullText: text,
    chunks,
    relevantChunks,
  };
};


module.exports = {
  extractTextFromFile,
  createChunks,
  retrieveRelevantChunks,
  buildKnowledgeContext,
};