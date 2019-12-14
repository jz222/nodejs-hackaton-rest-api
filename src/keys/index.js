require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    secret: process.env.SECRET
};
