import { getAvailableOutputFormats, isValidFormat as isValidOutputFormat } from './output-manager.js'

/**
 * Function that parses the raw input parameters into a validated object that contains
 * correct values regarding the expectations of the application. It stripes the first 
 * two parameters of the CLI which are the node bin and main js file.
 * @param {*} args 
 * @throws if parameters are missing, or if the values are invalid
 */
export function parseRawInputFromCLI()
{
    const from = process.argv[2] || ( () => { throw 'Missing from parameter' })()
    const to = process.argv[3]  || ( () => { throw 'Missing to parameter' })()
    const output = process.argv[4]  || ( () => { throw 'Missing output format parameter' })()
    
    if(! isValid(from, to, output)){
        console.log(getInputDoc())
        throw 'Invalid input parameters' 
    }
    return {from, to, output}
}

/**
 * Function that returns wether the parameters are valid regarding the expectations
 * of the application. It checks the format of the from and to parameters, and the value of output
 * @param {from} 
 * @param {to}
 * @param {output}
 */
export function isValid(from, to, output)
{
    //TODO validate the date format
    return isValidOutputFormat(output);
    
}

/**
 * Returns message to display to user about the use of the application
 */
export function getInputDoc()
{
    return `Invalid input for the application, please provide the required parameters :
    from : date in the format of DD-MM-YYYY, the date from which the energy production must be aggregated
    to : date in the format of DD-MM-YYYY, the ending date at which the energy production must be aggregated
    format : String, the format of the ouput. Possible values are ${getAvailableOutputFormats()}`
}

