const models = require('../../models/');

/**
 * Finds and returns all hackatons for a given filter
 * @param filter {object} mongoose filter
 * @returns {Promise<*>}
 */
const find = async (filter = {}) => {
    return await models.hackaton.find(filter);
};

module.exports = find;
