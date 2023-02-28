import logger from './src/utilities/logger.js'
import ProductionRequester from './src/production-requester.js'
import {parseRawInputFromCLI} from './src/input-manager.js'
logger.info('Starting application with parameters '+process.argv)


//read parameters
const validatedParams = parseRawInputFromCLI()

// send requests to power supplies
const productionRequester = new ProductionRequester()
const productionMap = productionRequester.queryProductionAPIs(validatedParams.from, validatedParams.to)

//TODO Output in the requested format
console.log(await productionMap)


