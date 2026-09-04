const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");
const { PDFParse } = require("pdf-parse");

const extractMaterialText = async (filePath, mimetype) => {
  const extension = path.extname(filePath).toLowerCase();

  // PDF
  if (extension === ".pdf" || mimetype === "application/pdf") {
    const data = fs.readFileSync(filePath);

    const parser = new PDFParse({
      data,
    });

    try {
      const result = await parser.getText();
      return result.text;
    } finally {
      await parser.destroy();
    }
  }

  // DOCX
  if (
    extension === ".docx" ||
    mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      path: filePath,
    });

    return result.value;
  }

  throw new Error("Unsupported file type. Only PDF and DOCX are supported.");
};

module.exports = {
  extractMaterialText,
};