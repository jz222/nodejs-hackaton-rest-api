const keys = require('../keys');

module.exports = {
    secret: keys.secret,
    options: {
        expiresIn: '2h'
    }
};
