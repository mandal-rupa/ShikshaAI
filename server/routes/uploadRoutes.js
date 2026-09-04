const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createChunks,
  retrieveRelevantChunks,
} = require("../services/ragService");

const {
  extractMaterialText,
} = require("../services/materialExtractor");

const {
  generateLessonPlan,
} = require("../services/lessonPlanner");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".pdf", ".docx"];
    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed."));
    }
  },
});

router.post("/upload", upload.single("material"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF or DOCX file.",
      });
    }

    const topic = req.body.topic || "General Topic";
    const level = req.body.level || "Beginner";
    const time = req.body.time || "20 minutes";
    const language = req.body.language || "English";

    // Step 1: Extract text from uploaded material
    const materialText = await extractMaterialText(
      req.file.path,
      req.file.mimetype
    );

    console.log("Material uploaded:", req.file.originalname);
    console.log("Extracted characters:", materialText.length);

    // Step 1.5: Create RAG chunks and retrieve relevant content
const chunks = createChunks(materialText);

const relevantChunks = retrieveRelevantChunks(
  chunks,
  topic,
  5
);

console.log("RAG chunks created:", chunks.length);
console.log("Relevant RAG chunks:", relevantChunks.length);

    if (!materialText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Could not extract readable text from this material.",
      });
    }

    // Step 2: Generate AI lesson plan
    console.log("Generating AI lesson plan...");

    const lessonPlan = await generateLessonPlan(
      materialText,
      topic,
      level,
      time,
      language
    );

    console.log("AI lesson plan generated successfully.");

    // Step 3: Send everything to frontend
    res.json({
      success: true,
      message: "Material analyzed and lesson plan generated successfully.",

      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },

      topic,
      level,
      time,
      language,
      lessonPlan,
      ragContext: relevantChunks,
    });
  } catch (error) {
    console.error("Material Processing Error:", error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to process study material.",
    });
  }
});

module.exports = router;