
/* The output available formats for the application */
const formats = ['json', 'csv']

/**
 * Function that returns the list of available output formats of the application
 */
export function getAvailableOutputFormats() 
{
    return formats;
}

/**
 * Function that checks if the format provided in parameter is a valid output format
 * @param {String} providedFormat 
 */
export function isValidFormat(providedFormat) 
{
    return formats.includes(providedFormat)
}