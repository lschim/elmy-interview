
/* The output available formats for the application */
const format = ['json', 'csv']

/**
 * Function that return the list of available output formats of the application
 */
export function getAvailableOutputFormats() 
{
    return format;
}

/**
 * Function that checks if the format provided in parameter is a valid output format
 * @param {String} providedFormat 
 */
export function isValidFormat(providedFormat) 
{
    return format.includes(providedFormat)
}