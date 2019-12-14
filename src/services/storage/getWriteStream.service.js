const { Storage } = require('@google-cloud/storage');

const configs = require('../../configs/');

const storage = new Storage();

/**
 * Creates a writeable stream for a file in Google Storage with a given file name.
 * @param contentType {string} content type of the file that should be created
 * @param fileName {string} name of the file that should be created
 * @returns {Writable} writeable stream for the file in Google Storage
 */
const getWriteStream = (contentType, fileName) => {
    if (!contentType) {
        throw new Error('Content type is required but was not provided.');
    }
    
    if (!fileName) {
        throw new Error('File name is required but was not provided.');
    }
    
    const bucket = storage.bucket(configs.storage.bucketName);
    
    const opts = {
        metadata: {
            contentType
        },
        resumable: false
    };
    
    const file = bucket.file(fileName);
    
    return file.createWriteStream(opts);
};

module.exports = getWriteStream;
