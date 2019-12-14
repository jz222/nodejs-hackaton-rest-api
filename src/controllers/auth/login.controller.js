const authService = require('../../services/authentication/');
const { respondWithSuccess, respondWithError, logger } = require('../../utils/');

/**
 * Verifies username and password and responds with a JWT if
 * they match with the data stored in the database.
 * @param body {object} request body
 * @param res {object} response object
 * @returns {Promise<void>}
 */
const login = async ({ body }, res) => {
    try {
        // Verify if the provided credentials are valid
        const userID = await authService.login(body.username, body.password);
        
        // Respond with error if the credentials are invalid or don't match
        if (!userID) {
            respondWithError(res, 401, 'Incorrect username or password.');
            return;
        }
        
        // Generate JWT
        const token = await authService.generateJWT(userID);
        
        // Respond with the JWT
        respondWithSuccess(res, 200, { token });
        
    } catch (error) {
        logger.error('controllers/auth/login.controller.js', error);
        respondWithError(res, 500, 'Something went wrong when logging in.');
    }
};

module.exports = login;
