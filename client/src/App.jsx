import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StartLesson from "./pages/StartLesson";
import LessonPlanner from "./pages/LessonPlanner";
import TeachingRoom from "./pages/TeachingRoom";
import Assessment from "./pages/Assessment";
import LearningReport from "./pages/LearningReport";
import UploadMaterial from "./pages/UploadMaterial";
import MyLessons from "./pages/MyLessons";
import "./App.css";

function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="home-navbar">

        <Link to="/" className="home-logo">
          <span className="logo-icon">🤖</span>
          <span>ShikshaAI</span>
        </Link>

        <div className="home-nav-links">
          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/start-lesson">
            Start Learning
          </Link>
        </div>

        <Link
          to="/start-lesson"
          className="nav-start-button"
        >
          Start Lesson
        </Link>

      </nav>

      {/* Hero */}
      <main className="home-hero">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ AI-Powered Personalized Learning
          </div>

          <h1>
            Learn Smarter with Your
            <span> AI Teacher</span>
          </h1>

          <p>
            ShikshaAI creates personalized lessons,
            explains concepts step by step, asks questions,
            evaluates your understanding, and adapts to
            your learning needs.
          </p>

          <div className="hero-buttons">

            <Link
              to="/start-lesson"
              className="primary-hero-button"
            >
              Start Learning →
            </Link>

            <Link
              to="/dashboard"
              className="secondary-hero-button"
            >
              Explore Dashboard
            </Link>

          </div>

          <div className="hero-features">

            <div>
              <span>🎯</span>
              <strong>Personalized</strong>
              <small>For your level</small>
            </div>

            <div>
              <span>🧠</span>
              <strong>Interactive</strong>
              <small>Learn by doing</small>
            </div>

            <div>
              <span>🌐</span>
              <strong>Multilingual</strong>
              <small>Learn your way</small>
            </div>

          </div>

        </div>

        {/* AI Teacher Preview */}
        <div className="hero-teacher-card">

          <div className="teacher-card-top">
            <span>SHIKSHAAI TEACHER</span>

            <div className="online-status">
              <span></span>
              AI Online
            </div>
          </div>

          <div className="hero-avatar">
            🤖
          </div>

          <h2>
            Hello! I'm your AI Teacher 👋
          </h2>

          <p>
            Tell me what you want to learn and
            I'll create a lesson just for you.
          </p>

          <div className="learning-flow">

            <div>
              <span>01</span>
              Understand
            </div>

            <div>
              <span>02</span>
              Explain
            </div>

            <div>
              <span>03</span>
              Practice
            </div>

            <div>
              <span>04</span>
              Adapt
            </div>

          </div>

        </div>

      </main>

      {/* Features */}
      <section className="home-features">

        <div className="section-heading">
          <span>HOW IT WORKS</span>

          <h2>
            A smarter way to learn
          </h2>

          <p>
            ShikshaAI follows a human-like teaching
            approach to help you understand concepts better.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">📚</div>

            <h3>Personalized Lessons</h3>

            <p>
              Choose your topic, level, time and language.
              ShikshaAI builds a lesson around you.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎓</div>

            <h3>AI Teaching</h3>

            <p>
              Learn through simple explanations,
              examples and visual concepts.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>

            <h3>Interactive Learning</h3>

            <p>
              Answer questions and receive feedback
              based on your understanding.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>

            <h3>Learning Feedback</h3>

            <p>
              Get your score, strengths, weak areas
              and personalized next steps.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="home-cta">

        <h2>
          Ready to start learning?
        </h2>

        <p>
          Let your AI Teacher create your first
          personalized lesson.
        </p>

        <Link
          to="/start-lesson"
          className="cta-button"
        >
          Create My Lesson →
        </Link>

      </section>

      {/* Footer */}
      <footer className="home-footer">

        <div className="footer-logo">
          🤖 ShikshaAI
        </div>

        <p>
          Your Human-Like AI Teacher
        </p>

        <span>
          © 2026 ShikshaAI
        </span>

      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start-lesson" element={<StartLesson />} />
        <Route path="/lesson-planner" element={<LessonPlanner />} />
        <Route path="/teaching-room" element={<TeachingRoom />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/learning-report" element={<LearningReport />} />
        <Route path="/upload-material" element={<UploadMaterial />} />
        <Route path="/my-lessons" element={<MyLessons />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;