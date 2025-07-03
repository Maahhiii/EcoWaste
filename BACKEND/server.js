import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import wasteRoutes from "./routes/waste.js";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import statsRoutes from "./routes/stats.js";
import userRoutes from "./routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// CORS - allow requests from your deployed frontend
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL || true  // Allow your deployed domain
      : "http://localhost:5173", 
    credentials: true,
  })
);

app.use(express.json());

// API Routes - Temporarily commented to find the problematic route
app.use("/api/waste", wasteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

// Serve static files from the React app build directory
const distPath = path.join(__dirname, 'dist');

// Always serve static files if dist folder exists
app.use(express.static(distPath));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

// Simple catch-all route for React app
app.get('/', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error loading application');
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});