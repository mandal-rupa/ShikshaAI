import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Assessment.css";

function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();

  const lesson = location.state || {
    topic: "Artificial Intelligence",
    level: "Beginner",
    language: "English",
  };

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);

  const isHTML = lesson.topic
    ?.toLowerCase()
    .includes("html");

  const htmlQuestions = [
    {
      id: 1,
      question:
        "Which attribute is used to make a table cell span across multiple columns?",
      options: [
        "rowspan",
        "colspan",
        "cellspan",
        "tablespan",
      ],
      correct: 1,
    },
    {
      id: 2,
      question:
        "Which HTML element is used to create a form?",
      options: [
        "<table>",
        "<form>",
        "<section>",
        "<iframe>",
      ],
      correct: 1,
    },
    {
      id: 3,
      question:
        "Which HTML element is commonly used to create a hyperlink?",
      options: [
        "<a>",
        "<link>",
        "<href>",
        "<url>",
      ],
      correct: 0,
    },
  ];

  const aiQuestions = [
    {
      id: 1,
      question: `What is the main purpose of ${lesson.topic}?`,
      options: [
        "To make computers completely useless",
        "To enable systems to perform tasks that normally require human intelligence",
        "To only store files",
        "To increase internet speed",
      ],
      correct: 1,
    },
    {
      id: 2,
      question:
        "Which approach helps an AI Teacher personalize learning?",
      options: [
        "Give every student the same lesson",
        "Ignore the student's answers",
        "Adapt explanations based on learner performance",
        "Skip assessment completely",
      ],
      correct: 2,
    },
    {
      id: 3,
      question:
        "What should an AI Teacher do when a learner has a misconception?",
      options: [
        "Ignore it",
        "Repeat the exact same explanation",
        "Identify the gap and explain the concept differently",
        "End the lesson",
      ],
      correct: 2,
    },
  ];

  const questions = isHTML
    ? htmlQuestions
    : aiQuestions;

  const handleSelect = (
    questionId,
    optionIndex
  ) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;

    questions.forEach((question) => {
      if (
        answers[question.id] ===
        question.correct
      ) {
        score++;
      }
    });

    return score;
  };

  const handleSubmit = async () => {
    if (
      Object.keys(answers).length !==
      questions.length
    ) {
      alert(
        "Please answer all questions."
      );
      return;
    }

    const score = calculateScore();

    const percentage = Math.round(
      (score / questions.length) * 100
    );

    const latestResult = {
  topic: lesson.topic,
  level: lesson.level,
  language: lesson.language,
  score: score,
  total: questions.length,
  percentage: percentage,
  date: new Date().toLocaleDateString(),
};

sessionStorage.setItem(
  "shikshaAI_latestResult",
  JSON.stringify(latestResult)
);

    setSubmitted(true);
    setIsEvaluating(true);

    try {
      const answerSummary =
        questions
          .map((question) => {
            const selectedIndex =
              answers[question.id];

            const selectedAnswer =
              question.options[
                selectedIndex
              ];

            const correctAnswer =
              question.options[
                question.correct
              ];

            return `
Question: ${question.question}
Student Answer: ${selectedAnswer}
Correct Answer: ${correctAnswer}
Result: ${
              selectedIndex ===
              question.correct
                ? "Correct"
                : "Incorrect"
            }
`;
          })
          .join("\n");

      const response =
        await axios.post(
          "https://shikshaai-kjad.onrender.com/api/ai/ask",
          {
            question: `
You are ShikshaAI, a personal AI Teacher.

The student has completed the final assessment.

TOPIC:
${lesson.topic}

STUDENT LEVEL:
${lesson.level}

LANGUAGE:
${lesson.language}

SCORE:
${score}/${questions.length}

PERCENTAGE:
${percentage}%

ASSESSMENT DETAILS:
${answerSummary}

Give personalized learning feedback.

Your response MUST include:

1. Overall performance
2. What the student understood well
3. What concepts the student should revise
4. Likely learning gaps or misconceptions
5. A short revision plan
6. What the student should learn next

IMPORTANT:
- Be encouraging.
- Do not shame the student.
- Adapt feedback to the student's level.
- If the score is high, recommend deeper topics.
- If the score is low, recommend revising fundamentals.
- Use the assessment answers to identify weak areas.
- Do not invent weaknesses that are not supported by the answers.
- Respond in ${lesson.language}.
`,
            topic: lesson.topic,
            level: lesson.level,
            language: lesson.language,
            lessonContext:
              lesson.lessonPlan
                ?.steps
                ?.map(
                  (step) =>
                    `${step.title}: ${step.description}`
                )
                .join("\n") || "",
            ragContext:
              lesson.ragContext || [],
          }
        );

      if (
        response.data.success
      ) {
        setAiFeedback(
          response.data.answer
        );
      } else {
        setAiFeedback(
          "Assessment completed, but personalized AI feedback could not be generated."
        );
      }
    } catch (error) {
      console.error(
        "Assessment AI Error:",
        error
      );

      setAiFeedback(
        "Assessment completed. AI feedback could not be generated because the AI Teacher is temporarily unavailable."
      );
    } finally {
      setIsEvaluating(false);
    }
  };

  const score = calculateScore();

  const percentage = Math.round(
    (score / questions.length) * 100
  );

  return (
    <div className="assessment-page">
      <div className="assessment-container">

        <div className="assessment-header">

          <span>
            FINAL ASSESSMENT
          </span>

          <h1>
            Test Your Understanding
          </h1>

          <p>
            Let's check how well you
            understood{" "}
            <strong>
              {lesson.topic}
            </strong>.
          </p>

        </div>

        {!submitted ? (

          <>
            <div className="assessment-info">

              <div>
                <span>Topic</span>
                <strong>
                  {lesson.topic}
                </strong>
              </div>

              <div>
                <span>Level</span>
                <strong>
                  {lesson.level}
                </strong>
              </div>

              <div>
                <span>Questions</span>
                <strong>
                  {questions.length}
                </strong>
              </div>

            </div>

            <div className="questions-container">

              {questions.map(
                (
                  question,
                  questionIndex
                ) => (

                  <div
                    className="assessment-question"
                    key={question.id}
                  >

                    <div className="question-number">
                      Question{" "}
                      {questionIndex + 1}
                    </div>

                    <h2>
                      {question.question}
                    </h2>

                    <div className="assessment-options">

                      {question.options.map(
                        (
                          option,
                          optionIndex
                        ) => (

                          <button
                            key={optionIndex}
                            type="button"
                            className={
                              answers[
                                question.id
                              ] ===
                              optionIndex
                                ? "assessment-option selected"
                                : "assessment-option"
                            }
                            onClick={() =>
                              handleSelect(
                                question.id,
                                optionIndex
                              )
                            }
                          >
                            {String.fromCharCode(
                              65 +
                                optionIndex
                            )}
                            .{" "}
                            {option}
                          </button>

                        )
                      )}

                    </div>

                  </div>

                )
              )}

            </div>

            <button
              className="submit-assessment-button"
              onClick={handleSubmit}
              type="button"
            >
              Submit Assessment →
            </button>

          </>

        ) : (

          <div className="result-card">

            <div className="score-circle">
              {percentage}%
            </div>

            <h2>
              Assessment Complete! 🎉
            </h2>

            <p>
              You answered{" "}
              {score} out of{" "}
              {questions.length}{" "}
              questions correctly.
            </p>

            <div className="result-message">

              {percentage >= 70
                ? `Great work! You have a good understanding of ${lesson.topic}.`
                : `You have some gaps in ${lesson.topic}. ShikshaAI will help you identify what to revise.`}

            </div>


            {/* AI PERSONALIZED FEEDBACK */}

            <div className="ai-feedback-section">

              <h3>
                🤖 Your AI Teacher's Feedback
              </h3>

              {isEvaluating ? (

                <p>
                  AI Teacher is analyzing
                  your answers and preparing
                  personalized feedback...
                </p>

              ) : (

                <div className="ai-feedback">

                  {aiFeedback ? (
                    <p>
                      {aiFeedback}
                    </p>
                  ) : (
                    <p>
                      Personalized feedback
                      is currently unavailable.
                    </p>
                  )}

                </div>

              )}

            </div>


            <button
              className="report-button"
              onClick={() =>
                navigate(
                  "/learning-report",
                  {
                    state: {
                      ...lesson,
                      score,
                      total:
                        questions.length,
                      percentage,
                      questions,
                      answers,
                      aiFeedback,
                    },
                  }
                )
              }
              disabled={isEvaluating}
            >
              {isEvaluating
                ? "Preparing Learning Report..."
                : "View Learning Report →"}
            </button>

          </div>

        )}

      </div>
    </div>
  );
}

export default Assessment;