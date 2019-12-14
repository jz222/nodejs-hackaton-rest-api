const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Routes
const routes = require('./routes');

// Config
const configs = require('./configs');

// Initialization
const app = express();

// Middlewares
app.use(bodyParser.urlencoded(configs.server.bodyParser.options));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

// Connect to MongoDB and start server
mongoose
    .connect(configs.mongoDB.uri, configs.mongoDB.options)
    .then(() => app.listen(configs.server.app.port))
    .then(() => console.log(`✅ Server is listening on port ${configs.server.app.port}...`))
    .catch(error => {
        console.log('❌ Failed to connect to MongoDB with error:\n');
        console.error(error);
    });
