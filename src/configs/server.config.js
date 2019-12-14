const keys = require('../keys');

module.exports = {
    app: {
        port: keys.port
    },
    bodyParser: {
        options: {
            extended: false
        }
    },
    defaults: {
        successCode: 200,
        successMessage: 'Request processed successfully.',
        errorCode: 500,
        errorMessage: 'An error occurred.'
    }
};
