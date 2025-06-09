import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoute from './routes/chatRoute.js';

dotenv.config();
const app = express();
 
app.use(cors({
  origin: 'https://coder-army.netlify.app', // No slash at end
  credentials: true                         // Allows cookies/auth headers
}));

 
app.use(express.json());
app.use('/api', chatRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



 