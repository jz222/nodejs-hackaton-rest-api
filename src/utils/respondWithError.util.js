const { server } = require('../configs/');
const logger = require('./logger.util');

/**
 * Responds to a request with a formatted error.
 * @param res {object} response object
 * @param code {number} HTTP verb
 * @param message {string} error message
 */
const respondWithError = (res, code = server.defaults.errorCode, message = server.defaults.errorMessage) => {
    if (!res) {
        logger.error('utils/respondWithError.js', 'No response object provided.');
        return;
    }
    
    res.status(code).send({ ok: false, code, message });
};

module.exports = respondWithError;
