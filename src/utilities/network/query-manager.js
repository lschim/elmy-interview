import https from 'https'
import logger from '../logger.js'

class ServerError extends Error
{
    constructor()
    {
        super()
    }
}

/**
    Function that sends request to a production center, and handles error 500 by retrying a number of time provided in parameter
    @param url the url object to send to the production server API
    @param maxNumberOfRetries the max number of retries when the server returns error 500 before stopping to send requests
    and rejecting the Promise 
*/
export async function queryProductionAPI(url, maxNumberOfRetries) {


    //TODO handles error 500 and retry
    return new Promise((resolve) => {
        let data = ''
        let numberOfRetries = 0
        https.get(url, res => {
        if(res.statusCode == 500) {
            logger.info('Error 500 when querying url '+url+ '.'+ (maxNumberOfRetries-numberOfRetries) +' tries left')
            return Promise.reject('Error 500 when querying'+url)
        }
        res.on('data', chunk => { data += chunk }) 

        res.on('end', () => {
            resolve(data)
            })
        })
    })
}