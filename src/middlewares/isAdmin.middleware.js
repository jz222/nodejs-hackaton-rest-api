const jwt = require('jsonwebtoken');

const { respondWithError, logger } = require('../utils/');
const keys = require('../keys');

/**
 * Checks if an authorization header with a valid JWT is present and adds
 * the decoded JWT as user object to the request.
 * @param req {object} request object
 * @param res {res} response object
 * @param next {function} passes the request to the next middleware
 */
const isAdminMiddleware = (req, res, next) => {
    try {
        const token = req.headers && req.headers.authorization;
        
        // Return error is no JWT was provided
        if (!token) {
            respondWithError(res, 401, 'Authorization header is required but was not provided.');
            return;
        }
        
        const splitToken = token.split(' ');
        
        // Check is the format of the authorization header is malformed
        if ((splitToken.length !== 2) || (splitToken[0] !== 'Bearer') || (!splitToken[1])) {
            respondWithError(res, 401, 'API key is malformed.');
            return;
        }
        
        // Verify the JWT
        req.user = jwt.verify(splitToken[1], keys.secret);
        
        next();
        
    } catch (error) {
        logger.error('middlewares/isAdmin.js', error.message);
        respondWithError(res, 401, error.message);
    }
};

module.exports = isAdminMiddleware;
