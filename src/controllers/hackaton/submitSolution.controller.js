const Busboy = require('busboy');

const storageService = require('../../services/storage/');
const hackatonService = require('../../services/hackaton/');
const { respondWithSuccess, respondWithError, logger } = require('../../utils/');

/**
 * Checks if the request is of type multipart/form-data and pipes the request
 * to a writeable stream to store the incoming file directly in Google Storage.
 * @param req {object} request object
 * @param res {object} response object
 * @returns {Busboy}
 */
const submitSolution = async (req, res) => {
    try {
        // Check is the content type is of type multipart/form-data
        const isMultipart = req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data');
        
        // Respond with error if request is not of type multipart/form-data
        if (!isMultipart) {
            respondWithError(res, 400, 'No file was provided.');
            return;
        }
        
        // Check if hackaton is active
        const hackaton = await hackatonService.findOne({ _id: req.params.id, status: 'active' });
        
        if (!hackaton) {
            respondWithError(res, 400, 'Hackaton is not active.');
            return;
        }
        
        const solutionID = await storageService.generateFileName(req.params.id);
        
        // Create a Busyboy instance
        const busboy = new Busboy({
            headers: req.headers,
            highWaterMark: 2 * 1024 * 1024
        });
        
        // Pipe the file upload to a writable stream to
        // store the file directly in Google Storage
        // without loading it into memory or writing
        // it to the disk first.
        busboy.on('file', async (field, file, name, encoding, contentType) => {
            file.pipe(storageService.getWriteStream(contentType, solutionID));
        });
        
        // Respond with success when the upload is finished
        busboy.on('finish', () => respondWithSuccess(res, 200, 'Successfully submitted.'));
        
        // Respond with error if the upload fails
        busboy.on('error', (msg) => respondWithError(res, 500, msg));
        
        return req.pipe(busboy);
        
    } catch (error) {
        respondWithError(res, 500, 'Something went wrong while handling the file upload.');
        logger.log('controllers/hackaton/submitSolution.controller.js', error);
    }
};

module.exports = submitSolution;
