

/**
 * Function that generates a production map that contains all the entries taken from the array data in parameter
 * subdivided into intervals of timeStep. If there is a gap of time in the array data in parameter, this function
 * will use the mean values of power of the previous rank and the next to create new entries in the map (all the entries
 * of the interval between the previous rank and the next using timeStep).
 * 
 * @param {*} data an array of objects containing the properties startKey, endKey and powerKey
 * @param {*} startKey the name of the key for the start parameter in the objects of the array data
 * @param {*} endKey the name of the key for the end parameter in the objects of the array data
 * @param {*} powerKey the name of the key for the power parameter in the objects of the array data
 * @param {*} timeStep step in seconds that will be used to subdivide each entry of data
 */
export function generateProductionMap(data, startKey, endKey, powerKey, timeStep) {
    const res = new Map()
    let previousEnd = 0
    let previousPower = 0
    for(const entry of data) {
        if(previousEnd && entry[startKey] != previousEnd)
        {
            //There is a gap here, use the mean value of the previous entry and the current to fill the interval
            addEntriesInInterval(res, previousEnd, entry[startKey], (previousPower+entry[powerKey])/2, timeStep)
        }
        addEntriesInInterval(res, entry[startKey], entry[endKey], entry[powerKey], timeStep)
        previousEnd = entry[endKey]
        previousPower = entry[powerKey]
    }
    return res
}

/**
 * Function that adds in the map in parameter all the intermediate values in the interval between startValue and endValue 
 * with a step provided in parameter. Each entry will have as value powerValue.
 * For example, if endValue is 60 minutes after startValue, and the step in seconds is 900 
 * (corresponding to 15 minutes), this function will add in the map 4 entries :
 * one at startValue+0, one at startValue+900, one at startValue+1800, and one at startValue + 2700
 * @param {*} map 
 * @param {*} startValue 
 * @param {*} endValue 
 * @param {*} powerValue 
 * @param {*} step step of time in seconds
 */
export function addEntriesInInterval(map, startValue, endValue, powerValue, step) {
    let currentStartValue = startValue
    while(currentStartValue < endValue) {
        map.set(currentStartValue, powerValue)
        currentStartValue += step
    }
}


/**
 * Function that aggregates all the productionMaps in parameter into the first one of the array of productionMaps in parameter
 * This function will take the first productionMap of the array in parameter and 
 * for each entry, will sum all the values of the array of productionMaps that have the same key.
 * The result is stored in the first production map of the array, which is returned by the function
 * @param {*} productionMaps array of productionMaps
 * @returns the first productionMap of the array, containing the sums of all maps entries by key
 */
export function aggregateSummingValues(productionMaps) {
    if(productionMaps.length != 1) {

        let cumulator
        for(let [key, value] of productionMaps[0]) {
            cumulator = value
            for (let productionMap of productionMaps.slice(1, productionMaps.length) ) {
                cumulator += productionMap.get(key)
            }
            productionMaps[0].set(key, cumulator)
        }
    }
    return productionMaps[0]
}