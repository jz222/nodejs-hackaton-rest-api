const models = require('../../models/');

/**
 * Adds a participant and the ID of the solution, which is stored
 * in Google Storage to the participants array of the hackaton.
 * @param hackatonID {string} ID of the hackaton the participant should be added to
 * @param participantName {string} name of the participant
 * @param solutionID {string} ID of the solution the participant submitted
 * @returns {Promise<*>}
 */
const addParticipant = async (hackatonID, participantName, solutionID) => {
    if (!hackatonID) {
        throw new Error('Hackaton ID is required but was not provided.');
    }
    
    if (!participantName) {
        throw new Error('Participant name is required but was not provided.');
    }
    
    if (!solutionID) {
        throw new Error('Solution ID is required but was not provided.');
    }
    
    const participant = { name: participantName, solution: solutionID };
    
    return await models.hackaton.updateOne(
        { _id: hackatonID },
        {
            $push: {
                participants: participant
            }
        }
    );
};

module.exports = addParticipant;
