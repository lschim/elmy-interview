import logger from './src/utilities/logger.js'
import {getAvailableOutputFormats, isValidFormat} from './src/output-manager.js'
import ProductionRequester from './src/production-requester.js'
import {parseRawInputFromCLI, getInputDoc} from './src/input-manager.js'
logger.info('Starting application with parameters '+process.argv)


//read parameters
const validatedParams = parseRawInputFromCLI()

// parse parameters
//TODO check if valid values
const fromDate = process.argv[2]
const toDate = process.argv[3]
const outputFormat = process.argv[4] 

if(!isValidFormat(outputFormat))
{
    console.log('Invalid output format provided in the parameters. Possible values are ' + getAvailableOutputFormats())

} else {

    // send requests to power supplies
    const productionRequester = new ProductionRequester()
    productionRequester.queryProductionAPIs(fromDate, toDate).then( (res) => {
    console.log(res)
    })

    //TODO aggregate data

    //TODO output data
}



