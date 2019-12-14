const { Storage } = require('@google-cloud/storage');

const configs = require('../../configs/');
const utils = require('../../utils/');

const storage = new Storage();

/**
 * Generates a new filename and checks if the name already exists.
 * @param hackatonID {string} prefix of the file name
 * @returns {Promise<string|Promise<*|string>>}
 */
const generateFileName = async (hackatonID) => {
    const fileID = hackatonID + '-' + utils.generateRandomHash();
    
    const fileExists = await storage
        .bucket(configs.storage.bucketName)
        .file(fileID)
        .exists();
    
    if (fileExists[0]) {
        return generateFileName(hackatonID);
    }
    
    return fileID;
};

module.exports = generateFileName;
