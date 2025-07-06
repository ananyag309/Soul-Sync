const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors=require('cors');

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// console.log(process.env.MONGO_URI);
//Check server is running
app.get('/', (req, res) => {
    res.send('Server is up and running');
    }
);

//user Routes
app.use('/', require('./routes/userRoutes'));

//chat Routes
app.use('/', require('./routes/chatRoutes'));

//Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }   );
    
    //connect to mongoDB
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));