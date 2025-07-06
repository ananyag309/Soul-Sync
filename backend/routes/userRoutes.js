const express = require('express');
const { createUser, getUserByEmail, updateDailyData, updatePSSScore } = require('../controllers/userController');

const router = express.Router();

// Route to create a new user
router.post('/user/create', createUser);
// Route to update daily data
router.post('/user/:email/daily-update',updateDailyData);
// Route to get user by email
router.get('/user/:email', getUserByEmail);
// Route to update PSS score
router.post('/user/:email/pss', updatePSSScore);

module.exports = router;