const hackatonService = require('../../services/hackaton/');
const { respondWithSuccess, respondWithError, logger, etalons } = require('../../utils/');

/**
 * Updates a hackaton in the database with the data
 * sent in the body of the request.
 * @param hackaton {object} contains the updated data
 * @param params {object} parameters from the URL path
 * @param res {object} response object
 * @returns {Promise<void>}
 */
const update = async ({ body: hackaton, params }, res) => {
    try {
        // Validate the hackaton status, if present
        if (hackaton.status && !etalons.hackatonStatus.includes(hackaton.status)) {
            respondWithError(res, 400, 'The provided status is not available.');
            return;
        }
        
        // Update the hackaton in the database
        const updatedHackaton = await hackatonService.update({ _id: params.id }, { status: hackaton.status });
        
        // Respond with error in case updating the data in the database failed
        if (!updatedHackaton) {
            respondWithError(res, 500, 'Failed to update hackaton. Please check your input.');
            return;
        }
        
        if (!updatedHackaton.nModified) {
            respondWithError(res, 400, 'Could not find hackaton with ID ' + params.id);
            return;
        }
        
        // Respond with success message
        respondWithSuccess(res, 200, 'Successfully updated hackaton with ID ' + params.id);
        
    } catch (error) {
        logger.error('controllers/hackaton/update.js', error);
        respondWithError(res, 500, 'Something went wrong while fetching the hackaton.');
    }
};

module.exports = update;
