const find = require('./find.service');
const update = require('./update.service');
const create = require('./create.service');
const remove = require('./remove.service');
const findOne = require('./findOne.service');
const addParticipant = require('./addParticipant.service');

module.exports = {
    find,
    update,
    create,
    remove,
    findOne,
    addParticipant
};
