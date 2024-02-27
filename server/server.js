// Create the express variable
const express = require('express');
const db = require('./config/connection');
const path = require('path')


// Import your mongoose connection

// Create your app variable
const app = express();

// Create your PORT variable and get it ready for Heroku
const PORT = process.env.PORT || 3333;


// Require in your api_routes router
const api_routes = require('./routes/api_routes')

app.use(express.json())


// Load in your api_routes and prefix them with '/api
// Load Routes
app.use('/api', [
    api_routes
])


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/dist'))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
}


// Use the connection 'on' method to wait until the database connection has established before running your app.listen
db.on('open', () => {
    // Start the server
    app.listen(PORT, () => console.log('Server started on port', PORT));
})
