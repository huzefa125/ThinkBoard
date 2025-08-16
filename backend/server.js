const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db.js");
const notes = require("./src/routes/notesRoutes.js");

// ✅ Load env variables
dotenv.config();


const app = express();

//middlewares
app.use(express.json())
// ✅ Routes
app.use("/api/notes", notes);

const PORT = process.env.PORT || 8000;

// ✅ Start server
app.listen(PORT, () => {
    console.log(`Server started on PORT : ${PORT}`);
});

// ✅ Connect DB
connectDB();
