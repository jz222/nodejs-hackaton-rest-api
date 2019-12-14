const hackatonService = require('../../services/hackaton/');
const { respondWithSuccess, respondWithError, logger } = require('../../utils/');

/**
 * Persists a new hackaton that was sent in the body of a POST request
 * in the database and responds with the hackaton ID that was created.
 * @param hackaton {object} hackaton object that was sent by the client
 * @param res {object} response object
 * @returns {Promise<void>}
 */
const create = async ({ body: hackaton }, res) => {
    try {
        // Validate request
        if (!hackaton.name) {
            respondWithError(res, 400, 'Hackaton name is required but was not provided.');
            return;
        }
        
        if (!(hackaton.textBlocks && hackaton.textBlocks.length)) {
            respondWithError(res, 400, 'At least one text block is required but was not provided.');
            return;
        }
        
        // Persist hackaton in the database
        const createdHackaton = await hackatonService.create(hackaton);
        
        // Respond with error in case persisting failed
        if (!createdHackaton) {
            respondWithError(res, 500, 'Failed to create new hackaton. Please check your input.');
            return;
        }
        
        // Respond with the hackaton ID
        respondWithSuccess(res, 200, { hackatonID: createdHackaton.id });
        
    } catch (error) {
        logger.error('controllers/hackaton/create.js', error);
        respondWithError(res, 500, 'Something went wrong while fetching the hackaton.');
    }
};

module.exports = create;
