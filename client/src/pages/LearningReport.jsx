import { useLocation, useNavigate } from "react-router-dom";
import "./LearningReport.css";

function LearningReport() {
  const location = useLocation();
  const navigate = useNavigate();

  const savedLesson = sessionStorage.getItem(
    "shikshaAI_currentLesson"
  );

  const storedLesson = savedLesson
    ? JSON.parse(savedLesson)
    : {};

  const report = location.state || {
    ...storedLesson,
    topic: storedLesson.topic || "Artificial Intelligence",
    level: storedLesson.level || "Beginner",
    language: storedLesson.language || "English",
    score: 0,
    total: 3,
    percentage: 0,
    questions: [],
    answers: {},
    aiFeedback: "",
  };

  // --------------------------------
  // Correct / Wrong Questions
  // --------------------------------

  const wrongQuestions = (
    report.questions || []
  ).filter(
    (question) =>
      report.answers?.[question.id] !==
      question.correct
  );

  const correctQuestions = (
    report.questions || []
  ).filter(
    (question) =>
      report.answers?.[question.id] ===
      question.correct
  );

  // --------------------------------
  // Clean AI Markdown
  // --------------------------------

  const cleanAIText = (text) => {
    if (!text) return "";

    return String(text)
      .replace(/#{1,6}\s*/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\n\s*[-*]\s*/g, "\n")
      .replace(/\n\s*\d+\.\s*/g, "\n")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const aiFeedback = cleanAIText(
    report.aiFeedback
  );

  // --------------------------------
  // Performance
  // --------------------------------

  const getPerformanceMessage = () => {
    if (report.percentage >= 80) {
      return "Excellent understanding! You are ready to move to the next concept.";
    }

    if (report.percentage >= 60) {
      return "Good progress! A little revision will strengthen your understanding.";
    }

    return "Let's revise the core concepts before moving to the next topic.";
  };

  // --------------------------------
  // Recommendation
  // --------------------------------

  const getRecommendation = () => {
    if (report.percentage >= 80) {
      return `You have a strong understanding of ${report.topic}. You can move to a more advanced concept.`;
    }

    if (report.percentage >= 60) {
      return `You have a good foundation in ${report.topic}. Revise the concepts you missed before moving ahead.`;
    }

    return `Revise the core concepts of ${report.topic} and take another practice assessment before moving forward.`;
  };

  // --------------------------------
  // AI Feedback fallback
  // --------------------------------

  const fallbackFeedback =
    report.percentage >= 80
      ? `You performed very well in the ${report.topic} assessment. Your answers show that you understand the important concepts covered in this lesson. You are ready to explore more advanced concepts.`
      : report.percentage >= 60
      ? `You have developed a good foundation in ${report.topic}. Some concepts need additional revision. Reviewing the questions you missed and practicing similar examples will strengthen your understanding.`
      : `You should spend some more time revising the core concepts of ${report.topic}. Focus especially on the questions you answered incorrectly and then try another assessment.`;

  const finalFeedback =
    aiFeedback || fallbackFeedback;

  return (
    <div className="learning-report-page">

      <div className="learning-report-container">

        {/* =========================
            HEADER
        ========================== */}

        <div className="report-header">

          <span className="report-label">
            PERSONALIZED LEARNING REPORT
          </span>

          <h1>
            Your Learning Report 📊
          </h1>

          <p>
            Here's how you performed while
            learning{" "}
            <strong>{report.topic}</strong>.
          </p>

        </div>


        {/* =========================
            SCORE
        ========================== */}

        <div className="report-score-card">

          <div className="report-score-circle">
            {report.percentage}%
          </div>

          <div className="score-details">

            <h2>
              Overall Performance
            </h2>

            <p>
              You answered{" "}
              <strong>
                {report.score}
              </strong>{" "}
              out of{" "}
              <strong>
                {report.total}
              </strong>{" "}
              questions correctly.
            </p>

            <div className="report-progress">

              <div
                className="report-progress-fill"
                style={{
                  width: `${report.percentage}%`,
                }}
              ></div>

            </div>

          </div>

        </div>


        {/* =========================
            LEARNING PROFILE
        ========================== */}

        <div className="report-section">

          <h2>
            Learning Profile
          </h2>

          <div className="profile-grid">

            <div className="profile-item">
              <span>Topic</span>
              <strong>
                {report.topic}
              </strong>
            </div>

            <div className="profile-item">
              <span>Learning Level</span>
              <strong>
                {report.level}
              </strong>
            </div>

            <div className="profile-item">
              <span>Language</span>
              <strong>
                {report.language}
              </strong>
            </div>

          </div>

        </div>


        {/* =========================
            CONCEPT UNDERSTANDING
        ========================== */}

        <div className="report-section">

          <h2>
            Concept Understanding
          </h2>

          <div className="concept-results">


            {/* UNDERSTOOD */}

            <div className="concept-result understood">

              <div className="concept-result-icon">
                ✓
              </div>

              <div>

                <h3>
                  Concepts Understood
                </h3>

                {correctQuestions.length >
                0 ? (

                  <ul>
                    {correctQuestions.map(
                      (question) => (
                        <li
                          key={question.id}
                        >
                          {question.question}
                        </li>
                      )
                    )}
                  </ul>

                ) : (

                  <p>
                    No concepts were fully
                    demonstrated yet.
                  </p>

                )}

              </div>

            </div>


            {/* WEAK AREAS */}

            <div className="concept-result weak">

              <div className="concept-result-icon">
                !
              </div>

              <div>

                <h3>
                  Areas to Watch
                </h3>

                {wrongQuestions.length >
                0 ? (

                  <ul>
                    {wrongQuestions.map(
                      (question) => (
                        <li
                          key={question.id}
                        >
                          {question.question}
                        </li>
                      )
                    )}
                  </ul>

                ) : (

                  <p>
                    Excellent! No major weak
                    areas were identified.
                  </p>

                )}

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            AI TEACHER FEEDBACK
        ========================== */}

        <div className="ai-feedback">

          <div className="feedback-icon">
            🤖
          </div>

          <div>

            <span>
              AI TEACHER FEEDBACK
            </span>

            <h2>
              {getPerformanceMessage()}
            </h2>

            <p>
              {finalFeedback}
            </p>

          </div>

        </div>


        {/* =========================
            PERSONALIZED NEXT STEPS
        ========================== */}

        <div className="report-section">

          <h2>
            Personalized Next Steps
          </h2>

          <div className="recommendation-grid">


            {/* REVISE */}

            <div className="recommendation-card">

              <span>🔄</span>

              <h3>
                Revise
              </h3>

              <p>

                {wrongQuestions.length >
                0
                  ? `Review the ${
                      wrongQuestions.length
                    } concept${
                      wrongQuestions.length >
                      1
                        ? "s"
                        : ""
                    } you missed in the assessment.`
                  : `Review ${report.topic} once more to strengthen your understanding.`}

              </p>

            </div>


            {/* PRACTICE */}

            <div className="recommendation-card">

              <span>💡</span>

              <h3>
                Practice
              </h3>

              <p>
                Try more questions and
                practical examples related to{" "}
                {report.topic}.
              </p>

            </div>


            {/* NEXT TOPIC */}

            <div className="recommendation-card">

              <span>🚀</span>

              <h3>
                Next Topic
              </h3>

              <p>
                {getRecommendation()}
              </p>

            </div>

          </div>

        </div>


        {/* =========================
            AI LEARNING SUMMARY
        ========================== */}

        <div className="report-section">

          <h2>
            What ShikshaAI Learned About You
          </h2>

          <div className="ai-learning-summary">

            <p>
              Based on your assessment,
              ShikshaAI identified your current
              understanding of{" "}
              <strong>
                {report.topic}
              </strong>.
            </p>

            <p>
              Your current performance is{" "}
              <strong>
                {report.percentage}%
              </strong>
              . The AI Teacher can use this
              result to adjust future
              explanations and practice
              questions according to your
              learning level.
            </p>

            {wrongQuestions.length >
              0 && (
              <p>
                You should focus your next
                revision session on the{" "}
                <strong>
                  {wrongQuestions.length}
                </strong>{" "}
                concept
                {wrongQuestions.length >
                1
                  ? "s"
                  : ""}{" "}
                that you missed.
              </p>
            )}

          </div>

        </div>


        {/* =========================
            ACTION BUTTONS
        ========================== */}

        <div className="report-actions">

          <button
            className="new-lesson-button"
            onClick={() =>
              navigate("/start-lesson")
            }
          >
            Start New Lesson
          </button>

          <button
            className="dashboard-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default LearningReport;