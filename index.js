const logger = require('./src/utilities/logger')
const outputManager = require('./src/output-manager')

logger.info('Starting application with parameters ')



//read parameters
if(process.argv && process.argv.length != 5) {
    console.log('Invalid input for the application, please provide the required parameters :')
    console.log('from : date in the format of DD-MM-YYY, the date from which the energy production must be aggregated')
    console.log('to : date in the format of DD-MM-YYY, the ending date at which the energy production must be aggregated')
    console.log('format : String, the format of the ouput. Possible values are ' + outputManager.listAvailableFormatsAsText())
}
//TODO  parse parameters
//TODO send requests to power supplies
//TODO aggregate data

//TODO output data