import logger from './src/utilities/logger.js'
import {getAvailableOutputFormats, isValidFormat} from './src/output-manager.js'
import ProductionRequester from './src/production-requester.js'
import {parseRawInputFromCLI, getInputDoc} from './src/input-manager.js'
logger.info('Starting application with parameters '+process.argv)


//read parameters
const validatedParams = parseRawInputFromCLI()

// send requests to power supplies
const productionRequester = new ProductionRequester()
productionRequester.queryProductionAPIs(validatedParams.from, validatedParams.to).then( (res) => {
console.log(res)
})



