const models = require('../../models/');

/**
 * Removes a hackaton with a given ID from the database.
 * @param hackatonID {string} document ID of the hackaton that should be deleted
 * @returns {Promise<*>}
 */
const removeService = async (hackatonID) => {
    return await models.hackaton.deleteOne({ _id: hackatonID });
};

module.exports = removeService;
