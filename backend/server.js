const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// ✅ Load .env before anything else
dotenv.config();

const { connectDB } = require("./src/config/db.js");
const notes = require("./src/routes/notesRoutes.js");
const rateLimiter = require("./src/middleware/rateLimiter.js");

const app = express();

// 🔹 Middlewares
app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true, // if using cookies/sessions
}));

app.use(rateLimiter);
app.use(express.json());
// 🔹 Routes
app.use("/api/notes", notes);

const PORT = process.env.PORT || 8000;

// 🔹 Connect DB & Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server started on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err.message);
    process.exit(1); // stop the server if DB connection fails
  });
