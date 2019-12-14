const keys = require('../keys');

module.exports = {
    uri: keys.mongoURI,
    options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
};
