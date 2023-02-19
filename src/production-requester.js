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
    /**
     * Function that sends query to all power production APIs and aggregate the data
     * @param {String} fromDate 
     * @param {String} toDate 
     */
    queryProductionAPIs(fromDate, toDate)
    {
        return Promise.all([this.queryHawes(fromDate, toDate), this.queryBarnsley(fromDate, toDate), this.queryHounslow(fromDate, toDate)])
    }


    queryHawes(fromDate, toDate)
    {
        logger.info('Querying hawes with parameters '+fromDate+' '+toDate)
        const hawesURL = new URL('https://interview.beta.bcmenergy.fr/hawes')
        hawesURL.searchParams.append('from', fromDate)
        hawesURL.searchParams.append('to', toDate)
        return queryManager.queryProductionAPI(hawesURL, this.maxNumberOfTries)
    }

    queryBarnsley(fromDate, toDate)
    {
        logger.info('Querying Barnsley with parameters '+fromDate+' '+toDate)
        const url = new URL('https://interview.beta.bcmenergy.fr/barnsley')
        url.searchParams.append('from', fromDate)
        url.searchParams.append('to', toDate)
        return queryManager.queryProductionAPI(url, this.maxNumberOfTries)
    }

    queryHounslow(fromDate, toDate)
    {
        logger.info('Querying Hounslow with parameters '+fromDate+' '+toDate)
        const url = new URL('https://interview.beta.bcmenergy.fr/hounslow')
        url.searchParams.append('from', fromDate)
        url.searchParams.append('to', toDate)
        return queryManager.queryProductionAPI(url, this.maxNumberOfTries)
    }
}

module.exports = ProductionRequester