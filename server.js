const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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

app.get('api/weather', async, (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({error: "City is required"});
    };

    if (!process.env.WEATHER_API_KEY) {
        return res.status(500).json({
            error: ' WEATHER_API key is not set. Please create a .env file and set the WEATHER_API_KEY variable.'
        });

    try {
        const url =  new URL("http://api.weatherapi.com/v1/current.json");
        
        url.searchParams.set('key', process.env.WEATHER_API_KEY);
        url.searchParams.set('q', city);


    } catch {

    }

})






app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}  :p`);
});
