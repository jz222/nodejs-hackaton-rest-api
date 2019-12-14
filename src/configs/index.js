const mongoDB = require('./mongoDB.config');
const storage = require('./storage.config');
const server = require('./server.config');
const jwt = require('./jwt.config');

module.exports = { mongoDB, storage, server, jwt };
