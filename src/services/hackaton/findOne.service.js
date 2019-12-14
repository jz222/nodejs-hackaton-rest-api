const models = require('../../models/');

/**
 * Finds and returns one hackaton for a given filter.
 * @param filter {object} mongoose filter
 * @returns {Promise<*>}
 */
const findOne = async (filter) => {
    return await models.hackaton.findOne(filter);
};

module.exports = findOne;
