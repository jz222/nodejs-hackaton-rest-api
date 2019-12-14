const models = require('../../models');

/**
 * Creates a new hackaton in the database.
 * @param hackaton {object} hackaton that should be stored
 * @returns {Promise<void>}
 */
const createService = async (hackaton) => {
    return await models.hackaton.create(hackaton);
};

module.exports = createService;
