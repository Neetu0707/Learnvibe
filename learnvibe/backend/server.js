import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";  // Import the routes
import uploadRoutes from "./routes/uploadRoutes.js";
import uploadCode from "./routes/uploadCode.js";

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ['https://learning-website-blond.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
  credentials: true
}));

app.options('*', cors());

// Use the auth routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/code", uploadCode);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
