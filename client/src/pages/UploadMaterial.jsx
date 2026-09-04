import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UploadMaterial.css";

function UploadMaterial() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a study material first.");
      return;
    }

    if (!topic.trim()) {
      alert("Please enter the topic.");
      return;
    }

    const formData = new FormData();

    formData.append("material", file);
    formData.append("topic", topic.trim());
    formData.append("level", "Beginner");
    formData.append("time", "20 minutes");
    formData.append("language", "English");

    try {
      setUploading(true);

      const response = await axios.post(
        "http://localhost:5000/api/upload/upload",
        formData
      );

      if (response.data.success) {
  const lessonData = {
    topic: response.data.topic,
    level: response.data.level,
    time: response.data.time,
    language: response.data.language,
    material: response.data.file.originalName,
    lessonPlan: response.data.lessonPlan,
    ragContext: response.data.ragContext || [],
  };

  // Save current lesson so it is available across pages
  sessionStorage.setItem(
    "shikshaAI_currentLesson",
    JSON.stringify(lessonData)
  );

  navigate("/lesson-planner", {
    state: lessonData,
  });
}
    }catch (error) {
      console.error("Upload Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to analyze material. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-material-page">
      <div className="upload-material-container">

        <div className="upload-material-header">
          <span>AI MATERIAL ANALYSIS</span>

          <h1>Upload Study Material 📚</h1>

          <p>
            Upload your educational material and let ShikshaAI
            create a personalized lesson from it.
          </p>
        </div>

        <form
          className="upload-material-form"
          onSubmit={handleSubmit}
        >
          <div className="upload-form-group">
            <label htmlFor="topic">
              What is the topic?
            </label>

            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: HTML"
              autoComplete="off"
            />
          </div>

          <div className="upload-form-group">
            <label htmlFor="material">
              Upload your material
            </label>

            <input
              id="material"
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />

            {file && (
              <p className="selected-file">
                Selected: {file.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="upload-material-button"
            disabled={uploading}
          >
            {uploading
              ? "AI is analyzing your material..."
              : "Upload & Create Lesson →"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default UploadMaterial;