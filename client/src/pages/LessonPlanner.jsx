import { useLocation, useNavigate } from "react-router-dom";
import "./LessonPlanner.css";

function LessonPlanner() {
  const location = useLocation();
  const navigate = useNavigate();

  const lesson = location.state || {
    topic: "Artificial Intelligence",
    level: "Beginner",
    time: "20 minutes",
    language: "English",
  };

  const defaultLessonPlan = [
    {
      number: 1,
      title: "Introduction",
      duration: "3 min",
      description: `Understand the basic idea of ${lesson.topic}.`,
    },
    {
      number: 2,
      title: "Core Concepts",
      duration: "7 min",
      description: `Learn the most important concepts of ${lesson.topic} with simple explanations.`,
    },
    {
      number: 3,
      title: "Example & Demonstration",
      duration: "5 min",
      description:
        "Learn through a practical example and visual demonstration.",
    },
    {
      number: 4,
      title: "Interactive Question",
      duration: "2 min",
      description:
        "Answer a question to check your understanding.",
    },
    {
      number: 5,
      title: "Quick Assessment",
      duration: "3 min",
      description:
        "Complete a short assessment and receive personalized feedback.",
    },
  ];

  const lessonPlan =
    lesson.lessonPlan?.steps?.length > 0
      ? lesson.lessonPlan.steps
      : defaultLessonPlan;

  const startTeaching = () => {
    navigate("/teaching-room", {
      state: lesson,
    });
  };

  return (
    <div className="lesson-planner-page">
      <div className="lesson-planner-container">

        <div className="planner-header">
          <span className="planner-label">
            AI LESSON PLANNER
          </span>

          <h1>
            {lesson.lessonPlan?.title ||
              "Your Personalized Lesson"}
          </h1>

          <p>
            {lesson.lessonPlan?.overview ||
              "ShikshaAI has created a learning plan based on your preferences."}
          </p>
        </div>

        <div className="lesson-info">

          <div className="info-item">
            <span>Topic</span>
            <strong>{lesson.topic}</strong>
          </div>

          <div className="info-item">
            <span>Level</span>
            <strong>{lesson.level}</strong>
          </div>

          <div className="info-item">
            <span>Time</span>
            <strong>{lesson.time}</strong>
          </div>

          <div className="info-item">
            <span>Language</span>
            <strong>{lesson.language}</strong>
          </div>

        </div>

        <div className="plan-section">

          <h2>Lesson Structure</h2>

          <div className="lesson-list">

            {lessonPlan.map((item, index) => (
              <div
                className="lesson-step"
                key={item.number || index}
              >

                <div className="step-number">
                  {item.number || index + 1}
                </div>

                <div className="step-content">

                  <div className="step-title-row">
                    <h3>{item.title}</h3>
                    <span>{item.duration}</span>
                  </div>

                  <p>{item.description}</p>

                </div>

              </div>
            ))}

          </div>

        </div>

        <button
          className="start-teaching-button"
          onClick={startTeaching}
        >
          Start AI Teacher →
        </button>

      </div>
    </div>
  );
}

export default LessonPlanner;