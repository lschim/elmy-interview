const logger = require('./src/utilities/logger')
const outputManager = require('./src/output-manager')

logger.info('Starting application with parameters ')



//read parameters
if(process.argv && process.argv.length != 5) {
    console.log('Invalid input for the application, please provide the required parameters :')
    console.log('from : date in the format of DD-MM-YYYY, the date from which the energy production must be aggregated')
    console.log('to : date in the format of DD-MM-YYYY, the ending date at which the energy production must be aggregated')
    console.log('format : String, the format of the ouput. Possible values are ' + outputManager.listAvailableFormatsAsText())
}

// parse parameters
//TODO check if valid values
const fromDate = process.argv[2]
const toDate = process.argv[3]
const outputFormat = process.argv[4] 

if(!outputManager.isValidFormat(outputFormat))
{
    console.log('Invalid output format provided in the parameters. Possible values are ' + outputManager.listAvailableFormatsAsText())
    return 0
}



//TODO send requests to power supplies
//TODO aggregate data

//TODO output data