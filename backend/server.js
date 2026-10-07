import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logger (Development)
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Mount API routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    name: "Smart Clean India API",
    version: "1.0.0",
    docs: "/api/hello",
    status: "/api/status"
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    requestedPath: req.originalUrl
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

// Start listening if not running in serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n==============================================`);
    console.log(`🚀 Smart Clean India Backend Server Running!`);
    console.log(`📡 Local Port : http://localhost:${PORT}`);
    console.log(`🔗 API Hello  : http://localhost:${PORT}/api/hello`);
    console.log(`📊 API Stats  : http://localhost:${PORT}/api/stats`);
    console.log(`==============================================\n`);
  });
}

export default app;
