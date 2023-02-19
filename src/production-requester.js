const conf = require('./utilities/conf')
const queryManager = require('./utilities/network/query-manager')
const { URL } = require('url');
const logger = require('./utilities/logger')

/**
 * Function that expects an array of elements in the form of { 'start' : xxx, 'end' : yyy, 'power' : zzz}.
 * This function makes sure that there is no gap between the end of an element and the start of the next element
 * If there is a gap at rank N, this function will make the mean of the value between the rank N-1 and N+1 and add this element in the returning array 
 * @param {array} arrayOfElements 
 * @returns array without gap. 
 */
function fillGapsOfTime(arrayOfElements) {
    const res = []
    let previousEnd = 0
    let previousValue = 0
    arrayOfElements.forEach((elem =>{
        if(previousEnd && elem['start'] != previousEnd)
        {
            //There is a gap here, create element
            logger.info('Gap found at time '+elem['start'])
            res.append({'start': previousEnd, 'end': elem['start'], 'power': (previousValue+elem['power'])/2})
        }
        res.push(elem)
        previousEnd = elem['end']
        previousValue = elem['power']
    }))
    return res
}

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

    /**
     * Function that queries and parses the Hawes production API
     * @param {String} fromDate 
     * @param {String} toDate 
     */
    queryHawes(fromDate, toDate)
    {
        logger.info('Querying hawes with parameters '+fromDate+' '+toDate)
        const hawesURL = new URL('https://interview.beta.bcmenergy.fr/hawes')
        hawesURL.searchParams.append('from', fromDate)
        hawesURL.searchParams.append('to', toDate)
        return queryManager.queryProductionAPI(hawesURL, this.maxNumberOfTries).then((res) =>
        {
            const obj = JSON.parse(res)
            const ret = fillGapsOfTime(obj)
            return ret
        })
    }

    /**
     * Function that queries and parses the Barnsley production API
     * @param {String} fromDate 
     * @param {String} toDate 
     */
    queryBarnsley(fromDate, toDate)
    {
        logger.info('Querying Barnsley with parameters '+fromDate+' '+toDate)
        const url = new URL('https://interview.beta.bcmenergy.fr/barnsley')
        url.searchParams.append('from', fromDate)
        url.searchParams.append('to', toDate)
        return queryManager.queryProductionAPI(url, this.maxNumberOfTries)
    }

    /**
     * Function that queries and parses the Hounslow production API
     * @param {String} fromDate 
     * @param {String} toDate 
     */
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