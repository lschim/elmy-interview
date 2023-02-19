
/* The output available formats for the application */
const format = {
    JSON: 'json',
    CSV: 'csv'
}

/**
 * Function that return the list of available output formats of the application
 */
function listAvailableFormatsAsText() 
{
    return Object.values(format);
}

module.exports = {listAvailableFormatsAsText};