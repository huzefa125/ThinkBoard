const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// ✅ Load .env before anything else
dotenv.config();

const { connectDB } = require("./src/config/db.js");
const notes = require("./src/routes/notesRoutes.js");
const rateLimiter = require("./src/middleware/rateLimiter.js");

const app = express();

console.log(`🌍 Running in ${process.env.NODE_ENV || "development"} mode`);

// 🔹 Middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Vite dev server
      credentials: true,
    })
  );
}

app.use(rateLimiter);
app.use(express.json());

// 🔹 API Routes
app.use("/api/notes", notes);

// 🔹 Serve Frontend (Production Only)
const frontendPath = path.join(__dirname, "..", "frontend", "thinkbook", "dist");

if (process.env.NODE_ENV === "production") {
  if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
  } else {
    console.error(
      "❌ Frontend build not found. Did you run `npm run build` inside frontend/thinkbook?"
    );
  }
}

// 🔹 Connect DB & Start Server
const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server started on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err.message);
    process.exit(1);
  });
