import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoute from './routes/chatRoute.js';

dotenv.config();
const app = express();

// Enable CORS with credentials for your Netlify frontend
const corsOptions = {
  origin: 'https://coder-army.netlify.app', // No trailing slash, single origin
  credentials: true                         // Important for cookies/auth headers
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(express.json());
app.use('/api', chatRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
