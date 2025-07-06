const express = require('express');
const router = express.Router();
const { generateResponse } = require('../controllers/chatController');

router.post('/chat', generateResponse);

module.exports = router;