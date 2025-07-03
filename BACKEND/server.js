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

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// CORS configuration - now allowing the same domain since we're serving everything from backend
app.use(
  cors({
    origin: true, // Allow same origin
    credentials: true,
  })
);

app.use(express.json());

// Serve static files from React build (after you copy the build folder here)
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.use("/api/waste", wasteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/users", userRoutes);

// Serve React app for all other routes (this should be LAST)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
