import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  PlusCircle,
  Upload,
  BookOpen,
  Route,
  HelpCircle,
  ClipboardCheck,
  UserCheck,
  BarChart3,
  Target,
  Trophy,
  User,
  Settings,
  LogOut,
  Search,
  Globe,
  Bell,
  Flame,
  Clock3,
  Brain,
  Play,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mic,
  Sparkles,
  MessageCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./Dashboard.css";


function Dashboard() {
  const [latestResult, setLatestResult] = useState(null);
  const [profileClass, setProfileClass] = useState(
  localStorage.getItem("shikshaAI_profileClass") || "Class 11"
);
  const [profileOpen, setProfileOpen] = useState(false);
const [profileName, setProfileName] = useState(
  localStorage.getItem("shikshaAI_profileName") || "Aarav Singh"
);

  useEffect(() => {
    const savedResult = sessionStorage.getItem(
      "shikshaAI_latestResult"
    );

    if (savedResult) {
      setLatestResult(JSON.parse(savedResult));
    }
  }, []);

  const performanceScore = latestResult?.percentage || 0;
const performanceAccuracy =
  latestResult?.accuracy ?? performanceScore;

const scoreY =
  170 - (performanceScore / 100) * 140;

const accuracyY =
  170 - (performanceAccuracy / 100) * 140;
  return (
    <div className="dashboard-layout">

      {/* ================= SIDEBAR ================= */}

      <aside className="dashboard-sidebar">

        {/* Logo */}

        <div className="sidebar-logo">

          <div className="sidebar-logo-icon">
            <Brain size={25} />
          </div>

          <div>
            <h2>ShikshaAI</h2>
            <span>AI Teacher</span>
          </div>

        </div>


        {/* Navigation */}

        <nav className="sidebar-nav">

          {/* Dashboard */}

          <Link
            to="/dashboard"
            className="sidebar-link active"
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </Link>


          {/* ================= LEARN ================= */}

          <div className="sidebar-section-title">
            LEARN
          </div>

          <Link
            to="/start-lesson"
            className="sidebar-link"
          >
            <PlusCircle size={17} />
            <span>Start New Lesson</span>
          </Link>

          <Link
            to="/upload-material"
            className="sidebar-link"
          >
            <Upload size={17} />
            <span>Upload Material</span>
          </Link>

          <Link
            to="/my-lessons"
            className="sidebar-link"
          >
            <BookOpen size={17} />
            <span>My Lessons</span>
          </Link>

          <Link
            to="/start-lesson"
            className="sidebar-link"
          >
            <Route size={17} />
            <span>Learning Path</span>
          </Link>

          <Link
            to="/learning-report"
            className="sidebar-link"
          >
            <Target size={17} />
            <span>Revision Mode</span>
          </Link>


          {/* ================= PRACTICE ================= */}

          <div className="sidebar-section-title">
            PRACTICE &amp; ASSESS
          </div>

          <Link
            to="/assessment"
            className="sidebar-link"
          >
            <HelpCircle size={17} />
            <span>Quizzes</span>
          </Link>

          <Link
            to="/assessment"
            className="sidebar-link"
          >
            <ClipboardCheck size={17} />
            <span>Assessments</span>
          </Link>

          <Link
            to="/assessment"
            className="sidebar-link"
          >
            <UserCheck size={17} />
            <span>Exam Preparation</span>
          </Link>


          {/* ================= PROGRESS ================= */}

          <div className="sidebar-section-title">
            PROGRESS
          </div>

          <Link
            to="/learning-report"
            className="sidebar-link"
          >
            <BarChart3 size={17} />
            <span>My Progress</span>
          </Link>

          <Link
            to="/learning-report"
            className="sidebar-link"
          >
            <Target size={17} />
            <span>Performance</span>
          </Link>

          <Link
            to="/learning-report"
            className="sidebar-link"
          >
            <Brain size={17} />
            <span>Weak Areas</span>
          </Link>

          <Link
            to="/learning-report"
            className="sidebar-link"
          >
            <Trophy size={17} />
            <span>Achievements</span>
          </Link>


          {/* ================= ACCOUNT ================= */}

          <div className="sidebar-section-title">
            ACCOUNT
          </div>

          <Link
            to="/learning-report"
            className="sidebar-link"
          >
            <User size={17} />
            <span>Profile</span>
          </Link>

          <Link
            to="/start-lesson"
            className="sidebar-link"
          >
            <Settings size={17} />
            <span>Settings</span>
          </Link>

          <Link
            to="/"
            className="sidebar-link"
          >
            <LogOut size={17} />
            <span>Logout</span>
          </Link>

        </nav>


        {/* ================= UPGRADE CARD ================= */}

        <div className="upgrade-card">

          <div className="upgrade-icon">
            <Sparkles size={18} />
          </div>

          <h3>ShikshaAI Pro</h3>

          <p>
            Unlock unlimited lessons,
            advanced AI models, voice &amp; more.
          </p>

          <button>
            Upgrade Now
          </button>

        </div>

      </aside>


      {/* ================= MAIN ================= */}
      
    {profileOpen && (
  <div
    className="profile-modal-overlay"
    onClick={() => setProfileOpen(false)}
  >
    <div
      className="profile-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="profile-modal-avatar">
        {profileName.charAt(0).toUpperCase()}
      </div>

      <h2>{profileName}</h2>

      <p>{profileClass}</p>

      <button
        className="profile-edit-button"
        onClick={() => {
          const newName = window.prompt(
            "Enter your name:",
            profileName
          );

          if (newName && newName.trim()) {
            const updatedName = newName.trim();

            setProfileName(updatedName);

            localStorage.setItem(
              "shikshaAI_profileName",
              updatedName
            );

            setProfileOpen(false);
          }
        }}
      >
        Change Name
      </button>

      <button
        className="profile-edit-button"
        onClick={() => {
          const newClass = window.prompt(
            "Enter your class:",
            profileClass
          );

          if (newClass && newClass.trim()) {
            const updatedClass = newClass.trim();

            setProfileClass(updatedClass);

            localStorage.setItem(
              "shikshaAI_profileClass",
              updatedClass
            );
          }
        }}
      >
        Change Class
      </button>

      <button
        className="profile-close-button"
        onClick={() => setProfileOpen(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
      <main className="dashboard-main">

        {/* ================= TOPBAR ================= */}

        <header className="dashboard-topbar">

  <div className="topbar-left">

    <div>
      <h1>
        Good Morning, Aarav! 👋
      </h1>

      <p>
        Ready to learn something amazing today?
      </p>
    </div>

  </div>


  <div className="topbar-actions">

    <div className="search-box">

      <Search size={16} />

      <input
        type="text"
        placeholder="Search anything..."
      />

    </div>


    <div className="language-selector">

      <select
        className="language-button"
        defaultValue="English"
        onChange={(e) => {
          console.log(
            "Selected language:",
            e.target.value
          );
        }}
      >
        <option value="English">
          English
        </option>

        <option value="Hindi">
          Hindi
        </option>

        <option value="Hinglish">
          Hinglish
        </option>
      </select>

    </div>


    <button
      className="notification-button"
      onClick={() =>
        alert(
          "Notifications:\n\n• New lesson recommendation\n• Assessment completed\n• Keep learning your daily streak!"
        )
      }
    >
      <Bell size={18} />
      <span>2</span>
    </button>


    <div
      className="profile-mini"
      onClick={() => setProfileOpen(true)}
      style={{ cursor: "pointer" }}
    >

      <div className="profile-avatar">
        {profileName.charAt(0).toUpperCase()}
      </div>

      <div>
        <strong>{profileName}</strong>
        <small> class 11 </small>
      </div>

    </div>

  </div>

</header>


        {/* ================= STATS ================= */}

        <section className="dashboard-stats">

          <div className="stat-box purple">

            <div className="stat-icon">
              <BookOpen size={23} />
            </div>

            <div>

              <span>
                Lessons Completed
              </span>

              <strong>
                24
              </strong>

              <small>
                ↑ 4 this week
              </small>

            </div>

          </div>


          <div className="stat-box green">

            <div className="stat-icon">
              <Target size={23} />
            </div>

            <div>

              <span>
                Average Score
              </span>

              <strong>
                {latestResult ? `${latestResult.percentage}%` : "0%"}
              </strong>

              <small>
                {latestResult
    ? `${latestResult.score}/${latestResult.total} correct`
    : "No assessment yet"}
              </small>

            </div>

          </div>


          <div className="stat-box orange">

            <div className="stat-icon">
              <Flame size={23} />
            </div>

            <div>

              <span>
                Learning Streak
              </span>

              <strong>
                12
              </strong>

              <small>
                days in a row 🔥
              </small>

            </div>

          </div>


          <div className="stat-box blue">

            <div className="stat-icon">
              <Clock3 size={23} />
            </div>

            <div>

              <span>
                Study Time
              </span>

              <strong>
                28h 45m
              </strong>

              <small>
                ↑ 5h this week
              </small>

            </div>

          </div>


          <div className="stat-box pink">

            <div className="stat-icon">
              <Brain size={23} />
            </div>

            <div>

              <span>
                Weak Concepts
              </span>

              <strong>
                5
              </strong>

              <small>
                Needs Focus
              </small>

            </div>

          </div>

        </section>


        {/* ================= MAIN GRID ================= */}

        <section className="dashboard-content-grid">


          {/* ================= CONTINUE LEARNING ================= */}

          <div className="continue-card">

            <div className="card-heading">

              <h2>
                Continue Learning
              </h2>

              <span className="lesson-status-badge">
                In Progress
              </span>

            </div>


            <div className="continue-content">

              <div className="lesson-thumbnail">

                <div className="thumbnail-symbol">
                  Ω
                </div>

                <Link
                  to="/teaching-room"
                  className="play-button"
                >
                  <Play
                    size={20}
                    fill="currentColor"
                  />
                </Link>

              </div>


              <div className="continue-details">

                <span className="in-progress">
                  In Progress
                </span>

                <h3>
                  Ohm's Law and Resistance
                </h3>

                <p>
                  Physics · Class 11
                </p>


                <div className="lesson-progress">

                  <div className="progress-track">

                    <div
                      className="progress-value"
                      style={{ width: "65%" }}
                    ></div>

                  </div>

                  <span>
                    65% Completed
                  </span>

                </div>

              </div>


              <div className="resume-area">

                <Link
                  to="/teaching-room"
                  className="resume-button"
                >
                  Resume Lesson
                </Link>

                <small>
                  ◷ 15 min remaining
                </small>

              </div>

            </div>

          </div>


          {/* ================= AI TEACHER ================= */}

          <div className="teacher-dashboard-card">

            <div className="card-heading">

              <h2>
                Meet Your AI Teacher
              </h2>

              <button className="change-teacher">
                Change Teacher
              </button>

            </div>


            <div className="teacher-dashboard-content">

              <div className="teacher-avatar-large">
                👩🏻‍🏫
              </div>


              <div className="teacher-intro">

                <h3>
                  Hi Aarav! 👋
                </h3>

                <p>
                  I'm here to help you learn
                  better, step by step.
                </p>


                <div className="teacher-tags">

                  <span>♟ Friendly</span>
                  <span>♙ Professional</span>
                  <span>♙ Exam Coach</span>

                </div>


                <Link
                  to="/teaching-room"
                  className="conversation-button"
                >
                  <Mic size={16} />
                  Start Conversation
                </Link>

              </div>

            </div>

          </div>


          {/* ================= RECOMMENDED ================= */}

          <div className="recommended-card dashboard-white-card">

            <div className="card-heading">

              <h2>
                Recommended For You
              </h2>

              <Link
                to="/start-lesson"
                className="view-all"
              >
                View All
              </Link>

            </div>


            <div className="recommendation-list">

              <Link
                to="/start-lesson"
                className="recommendation-item"
              >

                <div className="recommendation-icon purple-icon">
                  ⚛
                </div>

                <div>

                  <strong>
                    Kirchhoff's Laws
                  </strong>

                  <small>
                    Physics · Class 11
                  </small>

                </div>

                <span>
                  20 min
                </span>

                <ArrowRight size={16} />

              </Link>


              <Link
                to="/start-lesson"
                className="recommendation-item"
              >

                <div className="recommendation-icon green-icon">
                  ∑
                </div>

                <div>

                  <strong>
                    Systems of Linear Equations
                  </strong>

                  <small>
                    Mathematics · Class 11
                  </small>

                </div>

                <span>
                  25 min
                </span>

                <ArrowRight size={16} />

              </Link>


              <Link
                to="/start-lesson"
                className="recommendation-item"
              >

                <div className="recommendation-icon orange-icon">
                  ⚗
                </div>

                <div>

                  <strong>
                    Chemical Bonding
                  </strong>

                  <small>
                    Chemistry · Class 11
                  </small>

                </div>

                <span>
                  18 min
                </span>

                <ArrowRight size={16} />

              </Link>

            </div>

          </div>


          {/* ================= PERFORMANCE ================= */}

<Link
  to="/learning-report"
  className="performance-card dashboard-white-card"
>
  <div className="card-heading">
    <h2>Recent Performance</h2>

    <span className="view-all">
      View All
    </span>
  </div>

  <div className="chart-legend">
    <span>
      <i className="score-dot"></i>
      Score
    </span>

    <span>
      <i className="accuracy-dot"></i>
      Accuracy
    </span>
  </div>

  <div className="performance-chart">

    <div className="chart-lines">
      <span>100%</span>
      <span>75%</span>
      <span>50%</span>
      <span>25%</span>
      <span>0%</span>
    </div>

    <div className="chart-area">

      <svg
        viewBox="0 0 500 190"
        preserveAspectRatio="none"
      >
        <polyline
          points={`0,170 500,${scoreY}`}
          fill="none"
          stroke="#6846f5"
          strokeWidth="4"
        />

        <polyline
          points={`0,170 500,${accuracyY}`}
          fill="none"
          stroke="#20b878"
          strokeWidth="4"
        />

        <circle
          cx="500"
          cy={scoreY}
          r="6"
          fill="#6846f5"
        />

        <circle
          cx="500"
          cy={accuracyY}
          r="6"
          fill="#20b878"
        />
      </svg>

      <div className="chart-tooltip">
        Latest Assessment

        <strong>
          Score: {performanceScore}%
        </strong>

        <strong>
          Accuracy: {performanceAccuracy}%
        </strong>
      </div>

    </div>
  </div>

  <div className="chart-dates">
    <span>
      {latestResult ? "Latest Assessment" : "No Assessment Yet"}
    </span>
  </div>

</Link>

          


          {/* ================= UPCOMING GOALS ================= */}

          <div className="goals-card dashboard-white-card">

            <div className="card-heading">
              <h2>Upcoming Goals</h2>
            </div>


            <div className="goal-list">


              <Link
                to="/teaching-room"
                className="goal-item"
              >

                <div className="goal-icon purple-icon">
                  <BookOpen size={18} />
                </div>

                <div>

                  <strong>
                    Complete Ohm's Law Lesson
                  </strong>

                  <small>
                    Due: Today
                  </small>

                  <div className="goal-progress">

                    <div
                      style={{ width: "65%" }}
                    ></div>

                  </div>

                </div>

                <b>
                  65%
                </b>

              </Link>


              <Link
                to="/assessment"
                className="goal-item"
              >

                <div className="goal-icon green-icon">
                  <ClipboardCheck size={18} />
                </div>

                <div>

                  <strong>
                    Physics Quiz
                  </strong>

                  <small>
                    Due: Tomorrow
                  </small>

                  <div className="goal-progress">

                    <div
                      style={{ width: "0%" }}
                    ></div>

                  </div>

                </div>

                <b>
                  0%
                </b>

              </Link>


              <Link
                to="/assessment"
                className="goal-item"
              >

                <div className="goal-icon orange-icon">
                  <ClipboardCheck size={18} />
                </div>

                <div>

                  <strong>
                    Weekly Assessment
                  </strong>

                  <small>
                    Due: May 20
                  </small>

                  <div className="goal-progress">

                    <div
                      style={{ width: "0%" }}
                    ></div>

                  </div>

                </div>

                <b>
                  0%
                </b>

              </Link>

            </div>

          </div>


          {/* ================= LEARNING PATH ================= */}

          <div className="learning-path-card dashboard-white-card">

            <div className="card-heading">

              <h2>
                Your Learning Path
              </h2>

              <Link
                to="/start-lesson"
                className="view-all"
              >
                View Full Path
              </Link>

            </div>


            <div className="learning-path">

              <div className="path-line"></div>


              <div className="path-step completed">

                <div>
                  <CheckCircle2 size={23} />
                </div>

                <strong>
                  Electric Charges
                </strong>

                <small>
                  Completed
                </small>

              </div>


              <div className="path-step completed">

                <div>
                  <CheckCircle2 size={23} />
                </div>

                <strong>
                  Electric Field
                </strong>

                <small>
                  Completed
                </small>

              </div>


              <div className="path-step current">

                <div>
                  <BookOpen size={23} />
                </div>

                <strong>
                  Current Electricity
                </strong>

                <small>
                  In Progress
                </small>

              </div>


              <div className="path-step locked">

                <div>
                  <Lock size={20} />
                </div>

                <strong>
                  Moving Charges &amp; Magnetism
                </strong>

                <small>
                  Locked
                </small>

              </div>


              <div className="path-step locked">

                <div>
                  <Lock size={20} />
                </div>

                <strong>
                  Electromagnetic Induction
                </strong>

                <small>
                  Locked
                </small>

              </div>


              <div className="path-step locked">

                <div>
                  <Lock size={20} />
                </div>

                <strong>
                  Alternating Current
                </strong>

                <small>
                  Locked
                </small>

              </div>

            </div>

          </div>


          {/* ================= QUICK ACTIONS ================= */}

          <div className="quick-actions-card dashboard-white-card">

            <div className="card-heading">
              <h2>Quick Actions</h2>
            </div>


            <div className="quick-actions">

              <Link
                to="/start-lesson"
                className="quick-action"
              >
                <PlusCircle size={17} />
                Start New Lesson
              </Link>


              <Link
                to="/upload-material"
                className="quick-action"
              >
                <Upload size={17} />
                Upload Material
              </Link>


              <Link
                to="/assessment"
                className="quick-action"
              >
                <HelpCircle size={17} />
                Take Quiz
              </Link>


              <Link
                to="/teaching-room"
                className="quick-action"
              >
                <MessageCircle size={17} />
                Ask Doubt
              </Link>

            </div>

          </div>

        </section>


        {/* ================= FEATURE BAR ================= */}

        <section className="dashboard-feature-bar">

          <div>

            <Sparkles size={19} />

            <span>

              <strong>
                AI Personalized Teaching
              </strong>

              Adapts to your learning style

            </span>

          </div>


          <div>

            <Globe size={19} />

            <span>

              <strong>
                Multilingual Support
              </strong>

              English, Hindi &amp; Hinglish

            </span>

          </div>


          <div>

            <Mic size={19} />

            <span>

              <strong>
                Voice Interaction
              </strong>

              Speak and learn naturally

            </span>

          </div>


          <div>

            <Brain size={19} />

            <span>

              <strong>
                Adaptive Learning
              </strong>

              We adjust to your progress

            </span>

          </div>


          <div>

            <ClipboardCheck size={19} />

            <span>

              <strong>
                Smart Assessments
              </strong>

              Know what you know

            </span>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;