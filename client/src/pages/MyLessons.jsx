import { useNavigate } from "react-router-dom";
import "./MyLessons.css";

function MyLessons() {
  const navigate = useNavigate();

  const lessons = [
    {
      title: "Ohm's Law and Resistance",
      subject: "Physics",
      level: "Class 11",
      progress: 65,
      status: "In Progress",
    },
    {
      title: "Electric Charges",
      subject: "Physics",
      level: "Class 11",
      progress: 100,
      status: "Completed",
    },
    {
      title: "Electric Field",
      subject: "Physics",
      level: "Class 11",
      progress: 100,
      status: "Completed",
    },
    {
      title: "Kirchhoff's Laws",
      subject: "Physics",
      level: "Class 11",
      progress: 0,
      status: "Not Started",
    },
  ];

  return (
    <div className="my-lessons-page">
      <div className="my-lessons-container">
        <div className="my-lessons-header">
          <span>MY LEARNING</span>
          <h1>My Lessons 📚</h1>
          <p>
            Continue your lessons and track your learning progress.
          </p>
        </div>

        <div className="lessons-grid">
          {lessons.map((lesson) => (
            <div className="lesson-card" key={lesson.title}>
              <div className="lesson-card-top">
                <span className="lesson-status">
                  {lesson.status}
                </span>
              </div>

              <h2>{lesson.title}</h2>

              <p>
                {lesson.subject} · {lesson.level}
              </p>

              <div className="lesson-progress">
                <div className="progress-info">
                  <span>Progress</span>
                  <strong>{lesson.progress}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${lesson.progress}%` }}
                  ></div>
                </div>
              </div>

              <button
                className="open-lesson-button"
                onClick={() => navigate("/teaching-room")}
              >
                {lesson.progress === 0
                  ? "Start Lesson"
                  : "Continue Lesson"}
                →
              </button>
            </div>
          ))}
        </div>

        <button
          className="new-lesson-button"
          onClick={() => navigate("/start-lesson")}
        >
          + Start New Lesson
        </button>
      </div>
    </div>
  );
}

export default MyLessons;