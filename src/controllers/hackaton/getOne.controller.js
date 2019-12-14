const hackatonService = require('../../services/hackaton/');
const { respondWithSuccess, respondWithError, logger } = require('../../utils/');

/**
 * Returns the hackaton with the ID from the URL path.
 * @param params {object} contains all parameters from the URL path
 * @param res {object} response object
 * @returns {Promise<void>}
 */
const getOne = async ({ params }, res) => {
    try {
        // Find the hackaton with the given ID in the database
        const hackaton = await hackatonService.findOne({ _id: params.id });
        
        // Respond with error, if no hackaton was found
        if (!hackaton) {
            respondWithError(res, 400, 'Hackaton does not exist.');
            return;
        }
        
        // Respond with the hackaton
        respondWithSuccess(res, 200, hackaton);
        
    } catch (error) {
        logger.error('controllers/hackaton/getOne.js', error);
        respondWithError(res, 500, 'Something went wrong while fetching the hackaton.');
    }
};

module.exports = getOne;
