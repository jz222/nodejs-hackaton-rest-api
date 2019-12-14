const userService = require('../user/');

/**
 * Checks if an user with the given username exists and if the password
 * matches the one stored in the database.
 * @param username {string} username of the user
 * @param password {string} password of the user
 * @returns {Promise<boolean|*>} returns the user ID if the login was successful and false if the login failed
 */
const login = async (username, password) => {
    // Validate input
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
        return false;
    }
    
    // Check if the user exists
    const user = await userService.findOne({ username });
    
    if (!user) {
        return false;
    }
    
    // Check if the password matches
    const passwordMatches = await user.comparePassword(password);
    
    if (!passwordMatches) {
        return false;
    }
    
    return user.id;
};

module.exports = login;
