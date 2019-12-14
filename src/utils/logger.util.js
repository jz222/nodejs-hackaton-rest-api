const RED = '\u001b[31m';
const WHITE = '\u001b[37m';
const BACKGROUND_RED = '\u001b[41m';
const BOLD = '\u001b[1m';
const RESET = '\u001b[0m';

/**
 * Logs a formatted error with timestamp and the location
 * where the error occurred.
 * @param location {string} the name of the file where error occurred.
 * @param error {string} error message
 */
const error = (location = 'n/a', error = 'n/a') => {
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ') + ': ';
    
    console.log(
        '\n' +
        RED +
        BOLD +
        timestamp +
        BACKGROUND_RED +
        WHITE +
        'ERROR' +
        RESET +
        RED +
        ' in ' +
        location +
        ': \n\n' +
        WHITE +
        error +
        RESET +
        '\n'
    );
};

module.exports = { error };
