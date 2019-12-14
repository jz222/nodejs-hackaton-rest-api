const jwt = require('jsonwebtoken');

const config = require('../../configs/');

/**
 * Generates a JWT with a given user ID.
 * @param userID {string} the ID of the user the JWT is for
 * @returns {string} signed JWT
 */
const generateJWT = (userID) => {
    const payload = {
        id: userID
    };
    
    return jwt.sign(payload, config.jwt.secret, config.jwt.options);
};

module.exports = generateJWT;
