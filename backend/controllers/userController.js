const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        const { clerkId, email,age,gender } = req.body;
        
        // Check if user exists
        let user = await User.findOne({ email });
        
        if (user) {
            // Update existing user
            user = await User.findOneAndUpdate(
                { email },
                { 
                    ...req.body,
                    age,
                    gender
                },
                { new: true }
            );
        } else {
            // Create new user
            user = new User({
                ...req.body,
                sleepDuration: [],
                waterIntake: [],
                meditationDuration: [],
                pssScore: []
            });
            await user.save();
        }
        console.log(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDailyData = async (req, res) => {
    try {
        const { email } = req.params;
        const { waterIntake, sleepHours, meditationMinutes, physicalActivityMinutes } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add new data to arrays
        user.waterIntake.push({ value: waterIntake, date: new Date() });
        user.sleepDuration.push({ value: sleepHours, date: new Date() });
        user.meditationDuration.push({ value: meditationMinutes, date: new Date() });
        user.physicalActivity.push({ value: physicalActivityMinutes, date: new Date() });

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePSSScore = async (req, res) => {
    try {
        const { email } = req.params;
        const { score } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.pssScore.push({ value: score, date: new Date() });
        await user.save();
        
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getUserByEmail,
    updateDailyData,
    updatePSSScore
};
