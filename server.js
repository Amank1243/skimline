const express = require('express'); //    docs: https://expressjs.com/
const mongoose = require('mongoose'); // docs: https://mongoosejs.com/docs/
const path = require('path'); // docs: https://nodejs.org/api/path.html
const axios = require('axios'); // For API requests     docs: https://axios.rest/pages/getting-started/first-steps
const Beach = require('./models/Beach');

require('dotenv').config(); // Load variables from .env.

// Create an express application
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Example request from the weatherAPI documentation
// JSON: http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({error: "City is required"});
    };

    if (!process.env.WEATHER_API_KEY) {
        return res.status(500).json({
            error: ' WEATHER_API key is not set. Please create a .env file and set the WEATHER_API_KEY variable.'
        });
    }

    try {

        
        const response = await axios.get("http://api.weatherapi.com/v1/current.json",{
            params: 
            {
                key : process.env.WEATHER_API_KEY,
                q : city
            }
        });

        res.json(response.data);

    } catch (error) {
         console.error(`Error fetching weather from ${city}:`, error.message);
        res.status(500).json({ error: `Failed to fetch weather from ${city}` });
    };

});

// Retrieve all beaches from MongoDB
app.get('/api/beaches', async (req, res) => {
    try {
        const beaches = await Beach.find();

        res.json(beaches);

    } catch (error) {
        console.error('Error retrieving beaches:', error.message);

        res.status(500).json({
            error: 'Failed to retrieve beaches'
        });
    }
});

// connecting to mongoose
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to Skimline database!');

        console.log('Database:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
        console.log('Collection:', Beach.collection.name);

         const count = await Beach.countDocuments();
        console.log('Number of beaches:', count);
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}  :p`);
});
