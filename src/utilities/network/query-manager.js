const https = require('https')
const logger = require('../logger')

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
async function queryProductionAPI(url, maxNumberOfRetries) {


    //TODO handles error 500 and retry
    return new Promise((resolve) => {
        let data = ''
    
        https.get(url, res => {
        if(res.statusCode == 500) {
            logger.info('Error 500 when querying url '+url+ '.'+ (maxNumberOfRetries-numberOfRetries) +' tries left')
            return new Promise.reject('Error 500 when querying'+url)
        }
        res.on('data', chunk => { data += chunk }) 

        res.on('end', () => {
            resolve(data)
            })
        })
    })
}


module.exports = {queryProductionAPI};
