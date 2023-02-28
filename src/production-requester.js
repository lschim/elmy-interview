import conf from './utilities/conf.cjs'
import {queryProductionAPI} from './utilities/network/query-manager.js'
import { URL } from 'url'
import logger from './utilities/logger.js'
import {generateProductionMap, aggregateSummingValues} from './production-map.js'

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
 * Class that sends requests to all power production APIs to retrieve their production info and aggregates it
 */
export default class ProductionRequester
{
    constructor()
    {
        this.maxNumberOfTries = conf.maxNumberOfRetries
        this.stepOfTime = conf.stepOfTime
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
        return generateProductionMap(this.parseData(apiRes, apiConf.outputType), apiConf.startKey, apiConf.endKey, apiConf.powerKey, this.stepOfTime)
    }



    /**
     * Function that parses the raw content returned by the API and turns it into an array of objects depending on the output 
     * type of the API
     * @param {*} data 
     * @param {*} apiType 
     */
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
    async queryProductionAPIs(fromDate, toDate)
    {
        let queries = []
        for(const apiConf of productionApis){
            queries.push(this.buildProductionMapForAPI(apiConf, fromDate, toDate))
        }
        const productionMaps = await Promise.all(queries)
        console.log(productionMaps)
        return aggregateSummingValues(productionMaps)
    }

}

