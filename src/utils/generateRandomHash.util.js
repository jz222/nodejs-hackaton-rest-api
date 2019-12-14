const crypto = require('crypto');

/**
 * Generates a random hash
 * @returns {string} hash with 20 characters
 */
const generateRandomHash = () => crypto.randomBytes(20).toString('hex');

module.exports = generateRandomHash;
