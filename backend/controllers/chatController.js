const { model, systemPrompt } = require('../config/geminiConfig');
const User = require('../models/user');

const generateResponse = async (req, res) => {
  try {
    const { message, email } = req.body;
    
    // Get user context from MongoDB
    const user = await User.findOne({ email });
    const latestPSS = user.pssScore[user.pssScore.length - 1]?.value;

    const context = {
      pssScore: latestPSS,
      age: user.age,
      gender: user.gender 
    };
    console.error("vhgvhgvghvhgvgh",context)
    const prompt = `${systemPrompt}\nUser Context:\n${JSON.stringify(context)}\n\nUser Message: ${message}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({ reply: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateResponse };