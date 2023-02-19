const conf = require('./utilities/conf')
const queryManager = require('./utilities/network/query-manager')
const { URL } = require('url');
const logger = require('./utilities/logger')
/**
 * Class that sends requests to all power production APIs to retrieve their production info and aggregates it
 */
class ProductionRequester
{
    constructor()
    {
        this.maxNumberOfTries = conf.maxNumberOfRetries
    }

    queryProductionAPIs(fromDate, toDate)
    {
        return Promise.all([this.queryHawes(fromDate, toDate)])
    }

    queryHawes(fromDate, toDate)
    {
        logger.info('Querying hawes with parameters '+fromDate+' '+toDate)
        const hawesURL = new URL('https://interview.beta.bcmenergy.fr/hawes')
        hawesURL.searchParams.append('from', fromDate)
        hawesURL.searchParams.append('to', toDate)
        return queryManager.queryProductionAPI(hawesURL, this.maxNumberOfTries)
    }
}

module.exports = ProductionRequester