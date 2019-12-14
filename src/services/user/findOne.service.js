const models = require('../../models/');

/**
 * Finds and returns an user for a given filter.
 * @param filter {object} mongoose filter
 * @returns {Promise<*>}
 */
const findOne = async (filter) => {
    return await models.user.findOne(filter);
};

module.exports = findOne;
