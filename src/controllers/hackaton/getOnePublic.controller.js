const hackatonService = require('../../services/hackaton/');
const { respondWithSuccess, respondWithError, logger } = require('../../utils/');

/**
 * Returns the hackaton with the ID from the URL path,
 * if it's status is "active".
 * @param params {object} contains parameters from the URL path
 * @param res {object} response object
 * @returns {Promise<void>}
 */
const getOnePublic = async ({ params }, res) => {
    try {
        // Find the hackaton with the given ID and make
        // sure that the status is set to active.
        const hackaton = await hackatonService.findOne({ _id: params.id, status: 'active' });
        
        // Respond with error if no hackaton was found
        if (!hackaton) {
            respondWithError(res, 400, 'Could not find hackaton.');
            return;
        }
        
        // Respond with the hackaton
        respondWithSuccess(res, 200, hackaton);
        
    } catch (error) {
        logger.error('controllers/hackaton/getOnePublic.js', error);
        respondWithError(res, 500, 'Something went wrong while fetching the hackaton.');
    }
};

module.exports = getOnePublic;
