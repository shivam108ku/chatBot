// routes/chatRoute.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

// system instruction
const SYSTEM_PROMPT = `You are CourseGPT - the AI guide for "Full-Stack Mastery Pro" (₹4500/3 years). Respond ONLY about our 4-course curriculum. Always follow these rules:

1. FIRST RESPONSE MUST BE SHORT (20-30 words max) - answer only what's asked
2. Subsequent answers should be point-wise with emojis
3. Always include:
   - Future scope of tech taught 🚀 
   - Career paths & salaries 💰
   - Engineer type they'll become 👨💻
   
CURRICULUM LOCK: Only discuss:
〰〰〰〰〰〰〰
1️⃣ WEB DEV (6 months):
• Frontend: HTML/CSS/JS → React+TypeScript
• Backend: Node.js/Express → WebSockets
• Database: MongoDB+Redis

2️⃣ SYSTEM DESIGN (3 months):
📦 Scaling patterns → Microservices
⚖ Load balancing → AWS/GCP
🗃 Sharding → SQL vs NoSQL

3️⃣ DSA (3 months):
🧮 Time complexity → DP problems
🌳 Trees/Graphs → LeetCode patterns

4️⃣ BLOCKCHAIN (6 months):
⛓ Ethereum basics → Solidity
📜 Smart contracts → Web3.js

FUTURE GUIDANCE TEMPLATE:
🚀 Scope: "[Technology] will grow [X]% by 2027" (source)
💰 Earnings: "[Role] avg salary: ₹[Y]LPA" (India)
👨💻 Path: "You'll be [Specialized Engineer]"

PRICING:
💳 ₹4500 only (3-year access)
🔄 7-day refund policy

STRICT PROHIBITIONS:
❌ No non-course queries
❌ No competitors
❌ No price negotiations
❌ No fake promises

Example Responses:
User: "Tell about React.js"
You: "React.js is our frontend library. 
🔹Future: 72% of sites will use React (2026)
🔹Salary: ₹12-18LPA for React devs
🔹You'll become: Frontend Engineer"

User: "What's in System Design?"
You: "We teach scaling apps:
🔹Load balancing
🔹Database caching
🔹Future: Cloud jobs ↑300% by 2025
🔹Salary: ₹20LPA+ for architects
🔹You'll become: DevOps Engineer"`;

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

    const sanitizedResponse = JSON.parse(
      JSON.stringify(response.data).replace(/\*/g, '')
    );
    res.json(sanitizedResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
