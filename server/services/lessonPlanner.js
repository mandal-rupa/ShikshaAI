const { GoogleGenAI } = require("@google/genai");
const {
  createChunks,
  retrieveRelevantChunks,
} = require("./ragService");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateLessonPlan = async (
  materialText,
  topic,
  level,
  time,
  language
) => {
    const chunks = createChunks(materialText);

  const relevantChunks = retrieveRelevantChunks(
    chunks,
    `${topic} ${level}`,
    4
  );

  const knowledgeContext =
    relevantChunks.length > 0
      ? relevantChunks.join("\n\n---\n\n")
      : materialText;
  const prompt = `
You are ShikshaAI, an expert and friendly AI Teacher.

Create a personalized lesson plan using the educational material provided below.

TOPIC:
${topic}

LEARNER LEVEL:
${level}

AVAILABLE TIME:
${time}

TEACHING LANGUAGE:
${language}

RETRIEVED KNOWLEDGE FROM UPLOADED MATERIAL:
${knowledgeContext}

Instructions:
- Use the uploaded educational material as the primary source.
- Do not invent unrelated topics.
- Organize the lesson according to the learner's level.
- Keep the lesson suitable for the available time.
- Include introduction, core concepts, examples/demonstration, interactive questioning, and assessment.
- Use simple explanations for beginner learners.
- Focus on the important concepts found in the uploaded material.
- Make the lesson practical and engaging.
- Return ONLY valid JSON.

Return this exact structure:

{
  "title": "Lesson title",
  "overview": "Short lesson overview",
  "steps": [
    {
      "number": 1,
      "title": "Introduction",
      "duration": "3 min",
      "description": "What the student will learn"
    },
    {
      "number": 2,
      "title": "Core Concepts",
      "duration": "7 min",
      "description": "Important concepts from the material"
    },
    {
      "number": 3,
      "title": "Example & Demonstration",
      "duration": "5 min",
      "description": "Example or practical demonstration"
    },
    {
      "number": 4,
      "title": "Interactive Question",
      "duration": "2 min",
      "description": "Question to check understanding"
    },
    {
      "number": 5,
      "title": "Quick Assessment",
      "duration": "3 min",
      "description": "Short assessment"
    }
  ]
}
`;

  const models = [
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash",
  ];

  for (const model of models) {
    try {
      console.log(`Trying lesson planner model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      let text = response.text.trim();

      // Remove markdown code fences if Gemini adds them
      text = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const lessonPlan = JSON.parse(text);

      console.log(`Lesson plan generated using: ${model}`);

      return lessonPlan;
    } catch (error) {
      console.error(
        `Lesson planner ${model} failed:`,
        error.message
      );
    }
  }

  throw new Error(
    "AI lesson planner is temporarily unavailable. Please try again."
  );
};

module.exports = {
  generateLessonPlan,
};