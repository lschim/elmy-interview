import https from 'https'
import logger from '../logger.js'



/**
 * Low level function that sends the request to the url in parameter using https library
 * Returns a promise that resolves when all data is read from server
 * @param {url} url 
 */
async function request(url) {
    let data = ''
    //TODO use streams to clarify the code
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            if(res.statusCode == 500) {
                logger.info(`Error 500 when querying url ${url}`)
                return reject(`Error 500 when querying url ${url}`)
            }
            res.on('data', chunk => { 
                data += chunk })
                .on('end', () => {
                    resolve(data)
                }) 
        })
    })
}

/**
    Function that sends request to a production center, and handles error 500 by retrying a number of time provided in parameter
    @param url the url object to send to the production server API
    @param maxNumberOfRetries the max number of retries when the server returns error 500 before stopping to send requests
    and rejecting the Promise 
*/
export async function queryProductionAPI(url, maxNumberOfRetries) {
    for (let i = 0; i <= maxNumberOfRetries; i++) {
      try {
        return await request(url);
      } catch (err) {
        console.log(`Retrying for ${url}. Attempt ${i}`);
      }
    }
  }
