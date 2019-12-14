const hackatonService = require('../../services/hackaton/');
const { respondWithSuccess, respondWithError, logger } = require('../../utils/');

/**
 * Fetches and returns all hackatons from the database.
 * @param req {object} request object
 * @param res {object} response object
 * @returns {Promise<void>}
 */
const getAll = async (req, res) => {
    try {
        // Get all hackatons
        const hackatons = await hackatonService.find();
        
        respondWithSuccess(res, 200, { hackatons });
        
    } catch (error) {
        logger.error('controllers/hackaton/getAll.controller.js', error);
        respondWithError(res, 500, 'Something went wrong while fetching all hackatons.');
    }
};

module.exports = getAll;
