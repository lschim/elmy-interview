import conf from './utilities/conf.cjs'
import {queryProductionAPI} from './utilities/network/query-manager.js'
import { URL } from 'url'
import logger from './utilities/logger.js'

const productionApis = [
    {url: 'https://interview.beta.bcmenergy.fr/hawes', fromParameterName: 'from', outputType: 'json',
        toParameterName: 'to', startKey: 'start', endKey: 'end', powerKey: 'power', timeStep: 15},
    {url: 'https://interview.beta.bcmenergy.fr/barnsley', fromParameterName: 'from', outputType: 'json',
        toParameterName: 'to', startKey: 'start_time', endKey: 'end_time', powerKey: 'value', timeStep: 30},
 
        //TODO : Implement CSV parsing 
 //   {url: 'https://interview.beta.bcmenergy.fr/hounslow', fromParameterName: 'from', outputType: 'csv',
 //       toParameterName: 'to', startKey: 'debut', endKey: 'fin', powerKey: 'valeur', timeStep: 60},
]

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
export default class ProductionRequester
{
    constructor()
    {
        this.maxNumberOfTries = conf.maxNumberOfRetries
    }

    /**
     * Function that calls a given api, parses the result depending on the type of output of the API
     * and then generates the map of production of that API
     * @param {*} apiConf 
     * @param {*} from 
     * @param {*} to 
     */
    async buildProductionMapForAPI(apiConf, from, to) {
        logger.info(`Querying ${apiConf.url} with parameters ${from}, ${to}`)

        const urlObj = new URL(apiConf.url)
        urlObj.searchParams.append(apiConf.fromParameterName, from)
        urlObj.searchParams.append(apiConf.toParameterName, to)
        const apiRes =  await queryProductionAPI(urlObj, this.maxNumberOfTries)
        
        this.generateProductionMap(this.parseData(apiRes, apiConf.outputType))
        return apiRes
        
    }

    /**
     * TODO
     */
    generateProductionMap(data, apiConf) {
        const res = '';
        return res;
    }


    parseData(data, apiType) {
         
        switch(apiType) {
            case 'json' :
                return JSON.parse(data)
            case 'csv' : 
                //TODO
                break
        }
    }

    /**
     * Function that sends queries to all power production APIs and aggregate the data
     * @param {String} fromDate 
     * @param {String} toDate 
     */
    queryProductionAPIs(fromDate, toDate)
    {
        let queries = []
        for(const apiConf of productionApis){
            queries.push(this.buildProductionMapForAPI(apiConf, fromDate, toDate))
        }
        return Promise.all(queries)
    }

}

