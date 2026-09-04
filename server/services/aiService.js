const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const askAI = async (
  question,
  topic,
  level,
  language,
  lessonContext = "",
  ragContext = []
) => {
  const retrievedMaterial =
    ragContext.length > 0
      ? ragContext.join("\n\n---\n\n")
      : "No retrieved material context is available.";

  const prompt = `
You are ShikshaAI, a friendly and patient AI Teacher.

Your job is to teach the student like a real personal teacher.

STUDENT INFORMATION
Topic: ${topic}
Learning Level: ${level}
Preferred Language: ${language}

LESSON CONTEXT
${lessonContext || "No lesson context available."}

UPLOADED MATERIAL — RETRIEVED RAG CONTEXT
${retrievedMaterial}

STUDENT QUESTION
${question}

TEACHING RULES

1. Understand the student's question before answering.

2. Match the explanation to the student's level.

3. Beginner:
   Use very simple language and basic examples.

4. Intermediate:
   Give more technical explanation and examples.

5. Advanced:
   Give deeper reasoning and technical details.

6. Use the uploaded material as the primary source whenever relevant.

7. If the uploaded material does not contain enough information,
   clearly say that the material does not provide enough information.
   Do not invent information.

8. If the student appears confused:
   - identify the likely misunderstanding
   - explain the concept differently
   - provide a simple example

9. Prefer this structure:

Simple Definition
Step-by-Step Explanation
Example
Quick Understanding Check

10. Maintain the context of the current lesson.

11. Stay focused on the topic.

12. Answer in ${language}.

13. Be encouraging and supportive like a human teacher.

14. If the student gives an incorrect answer, explain the mistake
and provide an easier explanation.

Now answer the student's question.
`;

  const models = [
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash",
  ];

  for (const model of models) {
    try {
      console.log(`Trying Gemini model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      console.log(`Response received from: ${model}`);

      return response.text;
    } catch (error) {
      console.error(`${model} failed:`, error.message);
    }
  }

  throw new Error(
    "AI Teacher is temporarily unavailable. Please try again."
  );
};

module.exports = {
  askAI,
};