import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoute from './routes/chatRoute.js';

dotenv.config();
const app = express();

// Explicitly handle preflight requests
app.options('*', cors());

// Configure CORS
app.use(cors({
  origin: ['https://coder-army.netlify.app', 'https://www.coder-army.netlify.app'], // Include www for safety
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use('/api', chatRoute);

// Health check endpoint for debugging
app.get('/', (req, res) => res.json({ status: 'Server is running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));