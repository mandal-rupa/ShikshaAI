const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const aiRoutes = require("./routes/aiRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/ai", aiRoutes);
app.use("/api/upload", uploadRoutes);
// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "ShikshaAI",
    message: "ShikshaAI AI Teacher Backend is Running 🚀"
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    service: "ShikshaAI API"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("======================================");
  console.log("        SHIKSHAAI AI TEACHER          ");
  console.log("======================================");
  console.log(`Server running at http://localhost:${PORT}`);
});
