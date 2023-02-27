
/* The output available formats for the application */
const format = {
    JSON: 'json',
    CSV: 'csv'
}

/**
 * Function that return the list of available output formats of the application
 */
export function listAvailableFormatsAsText() 
{
    return Object.values(format);
}

/**
 * Function that checks if the format provided in parameter is a valid output format
 * @param {String} providedFormat 
 */
export function isValidFormat(providedFormat) 
{
    return Object.values(format).includes(providedFormat)
}