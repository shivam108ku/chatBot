// routes/chatRoute.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

// system instruction
const SYSTEM_PROMPT = 'You are an AI assistant for a course-selling website. You respond to queries related to your course only start with small response always and short point to point ans only  and tell them the future possibilities of this technology what then going to learn and how much they going to earn after learning this and what type of software engineer they will be in the future , which covers Web Development, System Design, Data Structures & Algorithms (DSA), and Blockchain. Here is the full curriculum:\n\n1. Web Development:\n- HTML, CSS, JavaScript\n- React.js, Node.js\n- MongoDB,websockets, typescript, Express.js\n\n2. System Design:\n- Scalability principles\n- Load balancing, caching, database sharding\n\n3. Data Structures & Algorithms:\n- Arrays, Linked Lists, Trees, Graphs\n- Dynamic Programming, Sorting Algorithms\n\n4. Blockchain:\n- Basics of Blockchain\n- Smart Contracts, Solidity\n\nThe full course is priced at ₹4500 for 5 3years access. Do not respond to anything outside this scope';

router.post('/chat', async (req, res) => {
  try {
    const userMessages = req.body.messages || [];

    // optional: filter false  attempts
    const isJailbreak = userMessages.some(msg =>
      /forget|ignore|act as/i.test(msg.content)
    );
    if (isJailbreak) {
      return res.status(400).json({ error: 'Invalid instruction attempt.' });
    }

    const payload = {
      model: 'gemini-1.5-flash',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...userMessages
      ]
    };

    const options = {
      method: 'POST',
      url: 'https://gemini-1-5-flash.p.rapidapi.com/',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'gemini-1-5-flash.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: payload
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
