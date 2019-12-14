const mongoose = require('mongoose');

const hackaton = require('./hackaton.model');
const user = require('./user.model');

module.exports = {
    hackaton: mongoose.model('hackaton', hackaton),
    user: mongoose.model('user', user)
};
