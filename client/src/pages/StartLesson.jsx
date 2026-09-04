import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Upload,
  BookOpen,
  GitBranch,
  RotateCcw,
  HelpCircle,
  ClipboardCheck,
  User,
  Settings,
  LogOut,
  Menu,
  Sparkles,
  Clock,
  Languages,
  Target
} from "lucide-react";

import "./StartLesson.css";

function StartLesson() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [time, setTime] = useState("20 minutes");
  const [language, setLanguage] = useState("English");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    navigate("/lesson-planner", {
      state: {
        topic: topic.trim(),
        level,
        time,
        language
      }
    });
  };

  return (
    <div className="start-layout">

      {/* ================= SIDEBAR ================= */}

      <aside className="start-sidebar">

        <div className="start-logo">
          <div className="start-logo-icon">
            🤖
          </div>

          <div>
            <h2>ShikshaAI</h2>
            <span>AI Teacher</span>
          </div>
        </div>

        <nav className="start-nav">

          <Link to="/dashboard" className="start-nav-link">
            <LayoutDashboard size={16} />
            Dashboard
          </Link>

          <div className="start-section-title">
            LEARN
          </div>

          <Link
            to="/start-lesson"
            className="start-nav-link active"
          >
            <PlusCircle size={16} />
            Start New Lesson
          </Link>

          <Link to="#" className="start-nav-link">
            <Upload size={16} />
            Upload Material
          </Link>

          <Link to="#" className="start-nav-link">
            <BookOpen size={16} />
            My Lessons
          </Link>

          <Link to="#" className="start-nav-link">
            <GitBranch size={16} />
            Learning Path
          </Link>

          <Link to="#" className="start-nav-link">
            <RotateCcw size={16} />
            Revision Mode
          </Link>

          <div className="start-section-title">
            PRACTICE & ASSESS
          </div>

          <Link to="#" className="start-nav-link">
            <HelpCircle size={16} />
            Quizzes
          </Link>

          <Link to="/assessment" className="start-nav-link">
            <ClipboardCheck size={16} />
            Assessments
          </Link>

          <Link to="#" className="start-nav-link">
            <Target size={16} />
            Exam Preparation
          </Link>

          <div className="start-section-title">
            ACCOUNT
          </div>

          <Link to="#" className="start-nav-link">
            <User size={16} />
            Profile
          </Link>

          <Link to="#" className="start-nav-link">
            <Settings size={16} />
            Settings
          </Link>

          <Link to="#" className="start-nav-link">
            <LogOut size={16} />
            Logout
          </Link>

        </nav>

        <div className="start-upgrade-card">
          <Sparkles size={17} />

          <h3>ShikshaAI Pro</h3>

          <p>
            Unlock unlimited lessons, advanced
            AI models, voice & more.
          </p>

          <button>
            Upgrade Now
          </button>
        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="start-main">

        {/* TOPBAR */}

        <header className="start-topbar">

          <div className="start-topbar-left">

            <button className="start-menu-button">
              <Menu size={20} />
            </button>

            <div>
              <h1>Create Your Lesson</h1>
              <p>
                Personalize your learning experience.
              </p>
            </div>

          </div>

          <div className="start-topbar-badge">
            <Sparkles size={15} />
            AI Powered
          </div>

        </header>

        {/* CONTENT */}

        <div className="start-content">

          {/* FORM CARD */}

          <section className="lesson-create-card">

            <div className="lesson-card-header">

              <div className="lesson-header-icon">
                ✨
              </div>

              <div>
                <span>NEW LESSON</span>

                <h2>
                  What would you like to learn?
                </h2>

                <p>
                  Tell your AI Teacher what you want to
                  learn and we'll create a personalized
                  lesson for you.
                </p>
              </div>

            </div>

            <form onSubmit={handleSubmit}>

              {/* TOPIC */}

              <div className="lesson-field">

                <label>
                  What do you want to learn?
                </label>

                <input
                  type="text"
                  value={topic}
                  onChange={(e) =>
                    setTopic(e.target.value)
                  }
                  placeholder="e.g. Artificial Intelligence"
                  autoComplete="off"
                />

                <small>
                  Enter a topic, concept, subject or skill.
                </small>

              </div>

              {/* OPTIONS */}

              <div className="lesson-options">

                <div className="lesson-field">

                  <label>
                    Learning Level
                  </label>

                  <div className="select-wrapper">
                    <Target size={16} />

                    <select
                      value={level}
                      onChange={(e) =>
                        setLevel(e.target.value)
                      }
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                </div>

                <div className="lesson-field">

                  <label>
                    Available Time
                  </label>

                  <div className="select-wrapper">
                    <Clock size={16} />

                    <select
                      value={time}
                      onChange={(e) =>
                        setTime(e.target.value)
                      }
                    >
                      <option>10 minutes</option>
                      <option>20 minutes</option>
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                    </select>
                  </div>

                </div>

                <div className="lesson-field">

                  <label>
                    Teaching Language
                  </label>

                  <div className="select-wrapper">
                    <Languages size={16} />

                    <select
                      value={language}
                      onChange={(e) =>
                        setLanguage(e.target.value)
                      }
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Hinglish</option>
                    </select>
                  </div>

                </div>

              </div>

              <button
                type="submit"
                className="create-lesson-button"
              >
                <Sparkles size={17} />
                Create My Personalized Lesson
                <span>→</span>
              </button>

            </form>

          </section>

          {/* RIGHT INFO */}

          <aside className="lesson-info-card">

            <div className="info-top-icon">
              🤖
            </div>

            <h2>
              Your AI Teacher
            </h2>

            <p>
              ShikshaAI will adapt the lesson according
              to your learning level, time and language.
            </p>

            <div className="info-step">

              <div>01</div>

              <section>
                <strong>Understand</strong>
                <span>
                  Understand your learning needs
                </span>
              </section>

            </div>

            <div className="info-step">

              <div>02</div>

              <section>
                <strong>Explain</strong>
                <span>
                  Explain concepts step by step
                </span>
              </section>

            </div>

            <div className="info-step">

              <div>03</div>

              <section>
                <strong>Practice</strong>
                <span>
                  Ask questions and practice
                </span>
              </section>

            </div>

            <div className="info-step">

              <div>04</div>

              <section>
                <strong>Adapt</strong>
                <span>
                  Adjust teaching based on you
                </span>
              </section>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default StartLesson;