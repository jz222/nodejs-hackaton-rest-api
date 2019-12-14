const hackatonService = require('../../services/hackaton/');
const { respondWithSuccess, respondWithError, logger } = require('../../utils/');

/**
 * Removes the hackaton with the ID from the URL path from the database.
 * @param params {object} contains all parameters from the URL path
 * @param res {object} response object
 * @returns {Promise<void>}
 */
const remove = async ({ params }, res) => {
    try {
        // Removes hackaton from the database
        const deletedHackaton = await hackatonService.remove(params.id);
        
        // Respond with error if the hackaton could not be deleted
        if (!deletedHackaton) {
            respondWithError(res, 500, 'Failed to delete hackaton.');
            return;
        }
        
        if (!deletedHackaton.deletedCount) {
            respondWithError(res, 400, 'Could not find hackaton with ID ' + params.id);
            return;
        }
        
        // Respond with success message
        respondWithSuccess(res, 200, 'Successfully deleted hackaton with ID ' + params.id);
        
    } catch (error) {
        logger.error('controllers/hackaton/remove.js', error);
        respondWithError(res, 500, 'Something went wrong while fetching the hackaton.');
    }
};

module.exports = remove;
