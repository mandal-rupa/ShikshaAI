import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  VolumeX,
  PlayCircle,
} from "lucide-react";
import "./TeachingRoom.css";

function TeachingRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  // =========================
  // BASIC STATES
  // =========================

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [showQuestion, setShowQuestion] =
    useState(false);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

  const [doubt, setDoubt] =
    useState("");

  const [doubtResponse, setDoubtResponse] =
    useState("");

  const [isEvaluating, setIsEvaluating] =
    useState(false);

  const [isAsking, setIsAsking] =
    useState(false);

  const [aiExplanation, setAiExplanation] =
    useState("");

  const [isExplaining, setIsExplaining] =
    useState(false);

  // =========================
  // ADAPTIVE QUESTION STATES
  // =========================

  const [currentQuestion, setCurrentQuestion] =
    useState(null);

  const [isGeneratingQuestion, setIsGeneratingQuestion] =
    useState(false);

  const [questionDifficulty, setQuestionDifficulty] =
    useState("medium");

  const [adaptiveMessage, setAdaptiveMessage] =
    useState("");

  const [questionAnswered, setQuestionAnswered] =
    useState(false);

  // =========================
  // SPEECH REFS
  // =========================

  const speechIndexRef = useRef(0);
  const speechChunksRef = useRef([]);
  const speechActiveRef = useRef(false);

  // =========================
  // GET CURRENT LESSON
  // =========================

  const savedLesson = sessionStorage.getItem(
    "shikshaAI_currentLesson"
  );

  let storedLesson = null;

  try {
    storedLesson = savedLesson
      ? JSON.parse(savedLesson)
      : null;
  } catch (error) {
    console.error(
      "Invalid saved lesson:",
      error
    );

    storedLesson = null;
  }

  const lesson =
    location.state ||
    storedLesson || {
      topic: "Artificial Intelligence",
      level: "Beginner",
      time: "20 minutes",
      language: "English",

      lessonPlan: {
        title:
          "Introduction to Artificial Intelligence",

        overview:
          "Learn the basics of Artificial Intelligence.",

        steps: [
          {
            number: 1,
            title: "Introduction",
            duration: "3 min",
            description:
              "Understand what Artificial Intelligence means and where it is used.",
          },

          {
            number: 2,
            title: "Core Concepts",
            duration: "5 min",
            description:
              "Learn the basic concepts and important ideas of Artificial Intelligence.",
          },

          {
            number: 3,
            title: "Example",
            duration: "4 min",
            description:
              "Explore a simple real-world example of Artificial Intelligence.",
          },
        ],
      },
    };

  // =========================
  // LESSON PLAN
  // =========================

  const fallbackLessonPlan = [
    {
      number: 1,
      title: "Introduction",
      duration: "3 min",
      description:
        `Let's understand the basics of ${lesson.topic}.`,
    },

    {
      number: 2,
      title: "Core Concepts",
      duration: "5 min",
      description:
        `Learn the important concepts of ${lesson.topic}.`,
    },

    {
      number: 3,
      title: "Example & Demonstration",
      duration: "4 min",
      description:
        `Let's understand ${lesson.topic} with a practical example.`,
    },
  ];

  const lessonPlan =
    lesson.lessonPlan?.steps?.length > 0
      ? lesson.lessonPlan.steps
      : fallbackLessonPlan;

  // =========================
  // CURRENT STEP
  // =========================

  const currentLessonStep =
    lessonPlan[currentStep];

  // =========================
  // LOAD SPEECH VOICES
  // =========================

  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged =
      loadVoices;

    return () => {
      window.speechSynthesis.cancel();

      window.speechSynthesis.onvoiceschanged =
        null;
    };
  }, []);

  // =========================
  // CLEAN SPEECH TEXT
  // =========================

  const cleanSpeechText = (text) => {
    if (!text) {
      return "";
    }

    let cleaned = String(text);

    cleaned = cleaned.replace(
      /```[\s\S]*?```/g,
      " "
    );

    cleaned = cleaned
      .replace(
        /!\[([^\]]*)\]\([^)]+\)/g,
        "$1"
      )
      .replace(
        /\[([^\]]+)\]\([^)]+\)/g,
        "$1"
      )
      .replace(
        /^\s*#{1,6}\s*/gm,
        ""
      )
      .replace(
        /^\s*H[1-6]\s*[:.)-]?\s*/gim,
        ""
      )
      .replace(
        /\*\*(.*?)\*\*/g,
        "$1"
      )
      .replace(
        /__(.*?)__/g,
        "$1"
      )
      .replace(
        /`([^`]*)`/g,
        "$1"
      )
      .replace(
        /^[\s]*[-•*]\s+/gm,
        ""
      )
      .replace(
        /^\s*\d+[\.\)]\s+/gm,
        ""
      )
      .replace(
        /\.{2,}/g,
        " "
      )
      .replace(
        /\s*[:|]+\s*/g,
        " "
      )
      .replace(
        /\s+/g,
        " "
      );

    return cleaned.trim();
  };

  // =========================
  // GET BEST VOICE
  // =========================

  const getBestVoice = () => {
    const voices =
      window.speechSynthesis.getVoices();

    if (lesson.language === "Hindi") {
      const googleHindi =
        voices.find(
          (voice) =>
            voice.name === "Google हिन्दी" &&
            voice.lang === "hi-IN"
        );

      if (googleHindi) {
        return googleHindi;
      }

      const hindiVoice =
        voices.find(
          (voice) =>
            voice.lang &&
            voice.lang
              .toLowerCase()
              .startsWith("hi")
        );

      if (hindiVoice) {
        return hindiVoice;
      }
    }

    const indianEnglish =
      voices.find(
        (voice) =>
          voice.lang === "en-IN"
      );

    if (indianEnglish) {
      return indianEnglish;
    }

    const englishVoice =
      voices.find(
        (voice) =>
          voice.lang &&
          voice.lang
            .toLowerCase()
            .startsWith("en")
      );

    return englishVoice || null;
  };

  // =========================
  // CREATE SPEECH CHUNKS
  // =========================

  const createSpeechChunks = (text) => {
    const cleaned =
      cleanSpeechText(text);

    if (!cleaned) {
      return [];
    }

    let sentences =
      cleaned.match(
        /[^.!?।]+[.!?।]+|[^.!?।]+$/g
      ) || [];

    sentences = sentences
      .map((sentence) =>
        sentence.trim()
      )
      .filter(Boolean);

    const finalChunks = [];

    sentences.forEach(
      (sentence) => {
        if (sentence.length <= 220) {
          finalChunks.push(sentence);
          return;
        }

        const words =
          sentence.split(" ");

        let current = "";

        words.forEach((word) => {
          const test =
            current.length > 0
              ? `${current} ${word}`
              : word;

          if (test.length > 180) {
            if (current.trim()) {
              finalChunks.push(
                current.trim()
              );
            }

            current = word;
          } else {
            current = test;
          }
        });

        if (current.trim()) {
          finalChunks.push(
            current.trim()
          );
        }
      }
    );

    return finalChunks;
  };

  // =========================
  // SPEAK NEXT CHUNK
  // =========================

  const speakNextChunk = () => {
    if (!speechActiveRef.current) {
      return;
    }

    const chunks =
      speechChunksRef.current;

    const index =
      speechIndexRef.current;

    if (index >= chunks.length) {
      speechActiveRef.current =
        false;

      setIsSpeaking(false);

      return;
    }

    const text =
      chunks[index];

    if (!text) {
      speechIndexRef.current =
        index + 1;

      speakNextChunk();

      return;
    }

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    const voice =
      getBestVoice();

    if (voice) {
      utterance.voice = voice;
      utterance.lang =
        voice.lang;
    } else {
      utterance.lang =
        lesson.language === "Hindi"
          ? "hi-IN"
          : "en-IN";
    }

    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      if (!speechActiveRef.current) {
        return;
      }

      speechIndexRef.current =
        index + 1;

      setTimeout(() => {
        speakNextChunk();
      }, 100);
    };

    utterance.onerror = (event) => {
      console.error(
        "Speech error:",
        event.error
      );

      speechActiveRef.current =
        false;

      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(
      utterance
    );
  };

  // =========================
  // SPEAK TEXT
  // =========================

  const speakText = (text) => {
    if (
      !(
        "speechSynthesis" in
        window
      )
    ) {
      alert(
        "Your browser does not support AI voice."
      );

      return;
    }

    if (
      !text ||
      typeof text !== "string"
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const chunks =
      createSpeechChunks(text);

    if (chunks.length === 0) {
      return;
    }

    speechChunksRef.current =
      chunks;

    speechIndexRef.current = 0;

    speechActiveRef.current =
      true;

    setIsSpeaking(true);

    setTimeout(() => {
      if (
        speechActiveRef.current
      ) {
        speakNextChunk();
      }
    }, 100);
  };

  // =========================
  // PLAY AI LESSON
  // =========================

  const playLesson = async () => {
  if (isSpeaking) {
    stopLesson();
    return;
  }

  let explanation = aiExplanation;

  // Explanation nahi hai to automatically generate karo
  if (!explanation) {
    explanation = await generateExplanation();

    if (!explanation) {
      return;
    }
  }

  speakText(explanation);
};

  // =========================
  // STOP LESSON
  // =========================

  const stopLesson = () => {
    speechActiveRef.current =
      false;

    speechIndexRef.current = 0;

    speechChunksRef.current = [];

    if (
      "speechSynthesis" in
      window
    ) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  };

  // =========================
  // NEXT LESSON STEP
  // =========================

  const nextLessonStep = () => {
    stopLesson();

    setAiExplanation("");

    setShowQuestion(false);

    setCurrentQuestion(null);

    setSelectedAnswer("");

    setFeedback("");

    setQuestionAnswered(false);

    setAdaptiveMessage("");

    if (
      currentStep <
      lessonPlan.length - 1
    ) {
      setCurrentStep(
        (prev) => prev + 1
      );
    }
  };

  // =========================
  // GENERATE ADAPTIVE QUESTION
  // =========================

  const generateAdaptiveQuestion =
    async (
      difficulty = "medium"
    ) => {
      setIsGeneratingQuestion(true);

      setFeedback("");

      setSelectedAnswer("");

      setQuestionAnswered(false);

      setAdaptiveMessage("");

      setQuestionDifficulty(
        difficulty
      );

      try {
        const response =
          await axios.post(
            "https://shikshaai-kjad.onrender.com/api/ai/ask",
            {
              question: `
You are an adaptive AI Teacher.

Generate ONE multiple-choice question for the student.

TOPIC:
${lesson.topic}

CURRENT LESSON STEP:
${currentLessonStep?.title || "Current lesson"}

CURRENT STEP CONTENT:
${currentLessonStep?.description || ""}

LEARNER LEVEL:
${lesson.level}

DIFFICULTY:
${difficulty}

LANGUAGE:
${lesson.language}

UPLOADED MATERIAL / RAG CONTEXT:
${(lesson.ragContext || []).join(
                "\n\n---\n\n"
              )}

Rules:

- The question must test understanding of the current topic.
- Use the uploaded material when relevant.
- Do not ask unrelated questions.
- Beginner questions should test basic understanding.
- Medium questions should test understanding and application.
- Hard questions should require deeper reasoning.
- Provide exactly 4 options.
- Only ONE option must be correct.
- The correctAnswer must be the option index: 0, 1, 2, or 3.
- Return ONLY valid JSON.
- Do not use Markdown.

Return exactly:

{
  "question": "Question text",
  "options": [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  "correctAnswer": 0,
  "concept": "Concept being tested"
}
`,
              topic: lesson.topic,
              level: lesson.level,
              language: lesson.language,

              lessonContext:
                lessonPlan
                  .map(
                    (step) =>
                      `${step.number}. ${step.title}: ${step.description}`
                  )
                  .join("\n"),

              ragContext:
                lesson.ragContext || [],
            }
          );

        if (!response.data.success) {
          throw new Error(
            "Question generation failed."
          );
        }

        let text =
          response.data.answer;

        text = text
          .replace(
            /^```json\s*/i,
            ""
          )
          .replace(
            /^```\s*/i,
            ""
          )
          .replace(
            /\s*```$/i,
            ""
          )
          .trim();

        const generatedQuestion =
          JSON.parse(text);

        if (
          !generatedQuestion.question ||
          !Array.isArray(
            generatedQuestion.options
          ) ||
          generatedQuestion.options
            .length !== 4
        ) {
          throw new Error(
            "Invalid question format."
          );
        }

        setCurrentQuestion(
          generatedQuestion
        );

      } catch (error) {
        console.error(
          "Question generation error:",
          error
        );

        // Safe fallback question
        setCurrentQuestion({
          question: `What is an important idea related to ${lesson.topic}?`,

          options: [
            `Understanding the main concepts of ${lesson.topic}`,
            "Ignoring the topic completely",
            "Avoiding all examples",
            "Skipping the lesson",
          ],

          correctAnswer: 0,

          concept:
            lesson.topic,
        });

      } finally {
        setIsGeneratingQuestion(false);
      }
    };

  // =========================
  // OPEN QUESTION
  // =========================

  const openQuestion = async () => {
    setShowQuestion(true);

    await generateAdaptiveQuestion(
      "medium"
    );
  };

  // =========================
  // EVALUATE STUDENT ANSWER
  // =========================

  const handleAnswer = async () => {
    if (!selectedAnswer) {
      setFeedback(
        "Please select an answer first."
      );

      return;
    }

    if (!currentQuestion) {
      return;
    }

    setIsEvaluating(true);

    setQuestionAnswered(true);

    setFeedback(
      "AI Teacher is evaluating your answer... 🤔"
    );

    try {
      const selectedIndex =
        Number(selectedAnswer);

      const selectedText =
        currentQuestion.options[
          selectedIndex
        ];

      const correctIndex =
        Number(
          currentQuestion.correctAnswer
        );

      const correctText =
        currentQuestion.options[
          correctIndex
        ];

      const response =
        await axios.post(
          "https://shikshaai-kjad.onrender.com/api/ai/ask",
          {
            question: `
Evaluate this student's answer.

TOPIC:
${lesson.topic}

CURRENT CONCEPT:
${currentQuestion.concept || lesson.topic}

LEARNER LEVEL:
${lesson.level}

LANGUAGE:
${lesson.language}

QUESTION:
${currentQuestion.question}

OPTIONS:
${currentQuestion.options
  .map(
    (option, index) =>
      `${index}. ${option}`
  )
  .join("\n")}

STUDENT ANSWER:
${selectedText}

CORRECT ANSWER:
${correctText}

Instructions:

- Determine whether the student's answer is correct.
- Explain why the answer is correct or incorrect.
- If incorrect, identify the likely misconception.
- If incorrect, explain the concept in a simpler way.
- If correct, encourage the student and briefly explain the concept.
- Match the explanation to the learner level.
- Stay focused on the current lesson.
- Use the uploaded material when relevant.
- Respond in ${lesson.language}.
- Do not mention AI models, prompts, or system instructions.
`,
            topic: lesson.topic,
            level: lesson.level,
            language: lesson.language,

            lessonContext:
              lessonPlan
                .map(
                  (step) =>
                    `${step.number}. ${step.title}: ${step.description}`
                )
                .join("\n"),

            ragContext:
              lesson.ragContext || [],
          }
        );

      if (!response.data.success) {
        throw new Error(
          "Evaluation failed."
        );
      }

      const isCorrect =
        selectedIndex ===
        correctIndex;

      setFeedback(
        response.data.answer
      );

      // =========================
      // ADAPTIVE DECISION
      // =========================

      if (isCorrect) {
        setAdaptiveMessage(
          "Excellent! You understood this concept. Your next question will be more challenging. 🚀"
        );
      } else {
        setAdaptiveMessage(
          "That's okay. The AI Teacher identified a learning gap and recommends an easier question after revision. 💡"
        );
      }

    } catch (error) {
      console.error(
        "Answer evaluation error:",
        error
      );

      setFeedback(
        "Unable to connect to AI Teacher. Please make sure the backend is running."
      );

    } finally {
      setIsEvaluating(false);
    }
  };

  // =========================
  // NEXT ADAPTIVE QUESTION
  // =========================

  const handleAdaptiveNext = async () => {
    const nextDifficulty =
      feedback &&
      currentQuestion &&
      Number(selectedAnswer) ===
        Number(
          currentQuestion.correctAnswer
        )
        ? "hard"
        : "easy";

    await generateAdaptiveQuestion(
      nextDifficulty
    );
  };

  // =========================
  // AI EXPLANATION
  // =========================

  const generateExplanation =
    async () => {
      setIsExplaining(true);

      setAiExplanation("");

      try {
        const response =
          await axios.post(
            "https://shikshaai-kjad.onrender.com/api/ai/ask",
            {
              question: `
You are teaching the student using the current lesson.

Topic:
${lesson.topic}

Current lesson step:
${currentLessonStep?.title || "Current lesson"}

Current step content:
${currentLessonStep?.description || ""}

Learner level:
${lesson.level}

Language:
${lesson.language}

Lesson Plan:
${lessonPlan
  .map(
    (step) =>
      `${step.number}. ${step.title}: ${step.description}`
  )
  .join("\n")}

Uploaded material / RAG context:
${(lesson.ragContext || []).join(
  "\n\n---\n\n"
)}

Teach the student the main concept of the CURRENT lesson step.

Instructions:
- Teach ONLY the current educational topic.
- Use uploaded material as the primary source.
- Do not add unrelated information.
- Do not talk about yourself.
- Do not say "Hello", "Welcome", "I am ShikshaAI".
- Do not mention AI, Gemini, model, system, or prompt.
- Do not repeat the lesson plan.
- Do not use Markdown.
- Do not use headings.
- Do not use bullet points.
- Do not number the explanation.
- Start directly with the concept.
- Give an important explanation and a relevant example.
- Match the explanation to a ${lesson.level} learner.
- Stay strictly within ${lesson.topic}.
- Respond in ${lesson.language}.
- Keep the explanation concise enough to speak aloud.
- For Hindi, use simple conversational Hindi in Devanagari.
- Make it sound like a real teacher speaking to a student.
`,
              topic: lesson.topic,
              level: lesson.level,
              language: lesson.language,

              lessonContext:
                lessonPlan
                  .map(
                    (step) =>
                      `${step.number}. ${step.title}: ${step.description}`
                  )
                  .join("\n"),

              ragContext:
                lesson.ragContext || [],
            }
          );

        if (response.data.success) {
          const answer =
            response.data.answer;

          setAiExplanation(answer);

          return answer;
        }

        throw new Error(
          "Explanation generation failed."
        );

      } catch (error) {
        console.error(
          "Explanation AI Error:",
          error
        );

        setAiExplanation(
          "Unable to connect to AI Teacher. Please make sure the backend is running."
        );

        return "";

      } finally {
        setIsExplaining(false);
      }
    };

  // =========================
  // ASK AI TEACHER
  // =========================

  const handleDoubt = async () => {
    if (!doubt.trim()) {
      setDoubtResponse(
        "Please enter your question first."
      );

      return;
    }

    setIsAsking(true);

    setDoubtResponse(
      "AI Teacher is thinking... 🤔"
    );

    try {
      const response =
        await axios.post(
          "https://shikshaai-kjad.onrender.com/api/ai/ask",
          {
            question: `
The student is currently learning this lesson.

Topic:
${lesson.topic}

Current lesson step:
${currentLessonStep?.title || "Current lesson"}

Level:
${lesson.level}

Language:
${lesson.language}

Lesson content:
${currentLessonStep?.description || ""}

Student's doubt:
${doubt}

Uploaded material / RAG context:
${(lesson.ragContext || []).join(
  "\n\n---\n\n"
)}

Answer the student's doubt in the context of the current lesson.

Instructions:
- Stay focused on the current topic.
- Use uploaded material when relevant.
- Explain according to the student's level.
- Identify confusion if present.
- Explain differently when needed.
- Use a simple example when helpful.
- Respond in ${lesson.language}.
`,
            topic: lesson.topic,
            level: lesson.level,
            language: lesson.language,

            lessonContext:
              lessonPlan
                .map(
                  (step) =>
                    `${step.number}. ${step.title}: ${step.description}`
                )
                .join("\n"),

            ragContext:
              lesson.ragContext || [],
          }
        );

      if (response.data.success) {
        setDoubtResponse(
          response.data.answer
        );
      } else {
        setDoubtResponse(
          "Sorry, I could not generate an answer."
        );
      }

    } catch (error) {
      console.error(
        "AI Teacher Error:",
        error
      );

      setDoubtResponse(
        "Unable to connect to AI Teacher. Please make sure the backend is running."
      );

    } finally {
      setIsAsking(false);
    }
  };

  // =========================
  // FINAL ASSESSMENT
  // =========================

  const goToAssessment = () => {
    stopLesson();

    navigate("/assessment", {
      state: lesson,
    });
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="teaching-room">

      {/* HEADER */}

      <header className="teaching-header">

        <div>

          <span className="teacher-label">
            SHIKSHAAI TEACHER
          </span>

          <h1>
            {lesson.topic}
          </h1>

        </div>

        <div className="lesson-status">
          <span>●</span>{" "}
          Lesson in progress
        </div>

      </header>


      {/* AI GENERATED LESSON */}

      <section className="lesson-context-card">

        <div className="lesson-context-header">

          <span>
            AI TEACHER LESSON
          </span>

          <h2>
            {lesson.lessonPlan?.title ||
              lesson.topic}
          </h2>

        </div>

        <p>
          {lesson.lessonPlan?.overview ||
            `Let's learn ${lesson.topic} step by step.`}
        </p>

        {lessonPlan.length > 0 && (

          <div className="lesson-context-steps">

            <h3>
              Today's Learning Plan
            </h3>

            {lessonPlan.map(
              (step, index) => (

                <div
                  className="lesson-context-step"
                  key={
                    step.number ||
                    index
                  }
                >

                  <div className="context-step-number">
                    {step.number ||
                      index + 1}
                  </div>

                  <div>

                    <strong>
                      {step.title}
                    </strong>

                    <p>
                      {step.description}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* MAIN TEACHING CONTENT */}

      <main className="teaching-content">

        {/* AI TEACHER VIDEO / AVATAR */}

        <section className="ai-teacher-video">

          <div
            className={`teacher-avatar ${
              isSpeaking
                ? "teacher-speaking"
                : ""
            }`}
          >

            <div className="avatar-head">
              👨‍🏫
            </div>

            <div className="avatar-status">

              {isSpeaking
                ? "AI Teacher is speaking..."
                : "AI Teacher"}

            </div>

          </div>

          <div className="teacher-video-content">

            <span className="video-label">
              AI TEACHING SESSION
            </span>

            <h2>
              {currentLessonStep?.title ||
                lesson.topic}
            </h2>

            <p>
              {currentLessonStep?.description ||
                `Let's learn ${lesson.topic} together.`}
            </p>

            <div className="teacher-controls">

              <button
                className="teacher-control-button"
                onClick={playLesson}
                type="button"
              >

                <PlayCircle size={20} />

                {isSpeaking
                  ? "Speaking..."
                  : "Play Lesson"}

              </button>

              <button
                onClick={stopLesson}
                className="teacher-control-button secondary"
                type="button"
              >

                <VolumeX size={18} />

                Stop

              </button>

              <button
                onClick={
                  nextLessonStep
                }
                className="teacher-control-button secondary"
                type="button"
              >
                Next →
              </button>

            </div>

          </div>

        </section>


        {/* AI TEACHER EXPLANATION */}

       

        {/* VISUAL EXPLANATION */}

        <section className="visual-panel">

          <div className="visual-header">
            VISUAL EXPLANATION
          </div>

          <div className="concept-card">

            <div className="concept-icon">
              🧠
            </div>

            <h2>
              Understanding{" "}
              {lesson.topic}
            </h2>

            <p>
              ShikshaAI breaks complex
              concepts into smaller,
              easy-to-understand ideas.
            </p>

            <div className="concept-flow">

              <div>
                Concept
              </div>

              <span>→</span>

              <div>
                Example
              </div>

              <span>→</span>

              <div>
                Understanding
              </div>

            </div>

          </div>

        </section>

      </main>


      {/* =========================
          ADAPTIVE QUESTION
      ========================== */}

      <section className="interaction-panel">

        {!showQuestion ? (

          <button
            className="question-button"
            onClick={
              openQuestion
            }
            disabled={
              isGeneratingQuestion
            }
            type="button"
          >

            {isGeneratingQuestion
              ? "AI is preparing a question..."
              : "Ask Me a Question →"}

          </button>

        ) : (

          <div className="question-card">

            <span className="question-label">
              ADAPTIVE AI QUESTION
            </span>

            {isGeneratingQuestion ? (

              <div className="feedback">
                AI Teacher is generating a
                question based on your lesson
                and learning level... 🤔
              </div>

            ) : currentQuestion ? (

              <>

                <h2>
                  {currentQuestion.question}
                </h2>

                <div className="answer-options">

                  {currentQuestion.options.map(
                    (
                      option,
                      index
                    ) => (

                      <button
                        key={index}
                        type="button"
                        className={
                          selectedAnswer ===
                          String(index)
                            ? "answer selected"
                            : "answer"
                        }
                        onClick={() =>
                          setSelectedAnswer(
                            String(index)
                          )
                        }
                        disabled={
                          questionAnswered
                        }
                      >

                        {String.fromCharCode(
                          65 + index
                        )}
                        .{" "}
                        {option}

                      </button>

                    )
                  )}

                </div>

                {!questionAnswered && (

                  <button
                    className="evaluate-button"
                    onClick={
                      handleAnswer
                    }
                    disabled={
                      isEvaluating
                    }
                    type="button"
                  >

                    {isEvaluating
                      ? "AI is evaluating..."
                      : "Evaluate My Answer"}

                  </button>

                )}

                {feedback && (

                  <>

                    <div className="feedback">

                      <ReactMarkdown>
                        {feedback}
                      </ReactMarkdown>

                    </div>

                    {adaptiveMessage && (

                      <div className="feedback">
                        {adaptiveMessage}
                      </div>

                    )}

                    {!isEvaluating && (

                      <button
                        className="evaluate-button"
                        onClick={
                          handleAdaptiveNext
                        }
                        type="button"
                      >

                        {Number(
                          selectedAnswer
                        ) ===
                        Number(
                          currentQuestion.correctAnswer
                        )
                          ? "Try a Harder Question →"
                          : "Try an Easier Question →"}

                      </button>

                    )}

                    {!isEvaluating && (

                      <button
                        className="evaluate-button"
                        onClick={
                          goToAssessment
                        }
                        type="button"
                      >
                        Continue to Final Assessment →
                      </button>

                    )}

                  </>

                )}

              </>

            ) : null}

          </div>

        )}

      </section>


      {/* ASK AI TEACHER */}

      <section className="doubt-section">

        <h3>
          Have a doubt? Ask your AI Teacher 💬
        </h3>

        <textarea
          value={doubt}
          onChange={(e) =>
            setDoubt(e.target.value)
          }
          placeholder={`Ask anything about ${lesson.topic}...`}
        />

        <button
          className="doubt-button"
          onClick={
            handleDoubt
          }
          disabled={isAsking}
          type="button"
        >

          {isAsking
            ? "AI Teacher is thinking..."
            : "Ask AI Teacher →"}

        </button>

        {doubtResponse && (

          <div className="doubt-response">

            <strong>
              AI Teacher:
            </strong>

            <div className="ai-answer">

              <ReactMarkdown>
                {doubtResponse}
              </ReactMarkdown>

            </div>

          </div>

        )}

      </section>


      {/* FINAL ASSESSMENT */}

      <div className="final-assessment-section">

        <h2>
          Ready for the Final Assessment? 🎯
        </h2>

        <p>
          Test what you have learned
          in this lesson and get
          personalized feedback.
        </p>

        <button
          className="final-assessment-button"
          onClick={
            goToAssessment
          }
        >
          Continue to Final Assessment →
        </button>

      </div>

    </div>
  );
}

export default TeachingRoom;