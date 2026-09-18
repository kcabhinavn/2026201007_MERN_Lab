const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Permits cross-origin requests (e.g. from the Vite dev server)
app.use(express.json());

// Log every API request with verb, path, status code and duration
app.use((req, res, next) => {
  const startedAt = Date.now();
  res.on("finish", () => {
    console.log(
      `[api] ${new Date().toISOString()} ${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - startedAt}ms)`
    );
  });
  next();
});

// Routes
app.use("/api/notes", noteRoutes);

// Simple health check
app.get("/", (req, res) => {
  res.send("Notes API is running.");
});

app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`);
});
