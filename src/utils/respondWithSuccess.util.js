const { server } = require('../configs/');
const logger = require('./logger.util');

/**
 * Responds to a request with a formatted success message.
 * @param res {object} response object
 * @param code {number} HTTP verb
 * @param payload {*} requested payload or success message
 */
const respondWithSuccess = (res, code = server.defaults.successCode, payload = server.defaults.successMessage) => {
    if (!res) {
        logger.error('utils/respondWithSuccess.js', 'No response object was provided.');
        return;
    }
    
    res.status(code).send({ ok: true, code, payload });
};

module.exports = respondWithSuccess;
