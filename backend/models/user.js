const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataPointSchema = new mongoose.Schema({
    value: Number,
    date: { type: Date, default: Date.now }
});

// Define the User Schema
const userSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
    },
    gender:{
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String
    },
    period: [{
        start: Date,
        end: Date
    }],
    sleepDuration: [dataPointSchema],
    waterIntake: [dataPointSchema],
    meditationDuration: [dataPointSchema],
    physicalActivity: [dataPointSchema],
    pssScore: [dataPointSchema]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;