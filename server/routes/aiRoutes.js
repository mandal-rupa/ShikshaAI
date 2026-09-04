const express = require("express");
const { askAI } = require("../services/aiService");

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const {
      question,
      topic,
      level,
      language,
      lessonContext,
      ragContext,
    } = req.body;

    if (!question || !topic) {
      return res.status(400).json({
        success: false,
        message: "Question and topic are required.",
      });
    }

    const answer = await askAI(
      question,
      topic,
      level || "Beginner",
      language || "English",
      lessonContext || "",
      ragContext || []
    );

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Gemini API Error:", error.message);

    res.status(500).json({
      success: false,
      message: "AI Teacher could not generate a response.",
    });
  }
});

module.exports = router;

