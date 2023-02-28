import assert from 'assert'
import chai from 'chai'
import { addEntriesInInterval, aggregateSummingValues, generateProductionMap} from '../src/production-map.js'

describe('When generating intervals for the production map', function() {
    
    let map;

    beforeEach(() => {
        map = new Map()
    })

    //TODO use random values
    it('should put in the production map 4 entries when the end time is 60 minutes after start time and the step is 15 minutes', function() {
        const startTime = 1500000
        const endTime = startTime + 60*60
        const powerValue = 1000
        addEntriesInInterval(map, startTime, endTime, powerValue, 15*60)
        chai.expect(map.size).to.equal(4, 'There should be 4 entries')
    })

})

describe('When generating a production map', function() {
    let map;
    
    beforeEach(() => {
        map = new Map()
    })

    describe('When generating intervals', function() {
        
        //TODO use random values
        it('should put in the production map 4 entries when the end time is 60 minutes after start time and the step is 15 minutes', function() {
            const startTime = 1500000
            const endTime = startTime + 60*60
            const powerValue = 1000
            addEntriesInInterval(map, startTime, endTime, powerValue, 15*60)
            chai.expect(map.size).to.equal(4, 'There should be 4 entries')
        })
    
    })

    describe('When there is a gap in the array of elements received', function() {
        
        //TODO use random values
        it('should generate a single entry using the mean value of the previous rank and the next one when the step of time is the same as the intervals in the array', function() {
            let data = [{
                "start":1578006000,
                "end":1578006900,
                "power":710
             },
             {
                "start":1578007800,
                "end":1578008700,
                "power":518
             }]
            map = generateProductionMap(data, "start", "end", "power", 15*60)
            chai.expect(map.size).to.equal(3, 'There should be 3 entries in the map')
            chai.expect(map.get(1578006900)).to.equal(614, 'The mean computation for the power value is incorrect')
        })

        it('should generate a single entry using the mean value of the previous rank and the next one when the step of time is half the one as the intervals in the array', function() {
            let data = [
                {
                   "start_time":1578006000,
                   "end_time":1578007800,
                   "value":774
                // 
                //     The gap :
                //    "start_time":1578007800,
                //    "end_time":1578009600,
                },
                {
                   "start_time":1578009600,
                   "end_time":1578011400,
                   "value":622
                }
            ]
            map = generateProductionMap(data, "start_time", "end_time", "value", 15*60)
            chai.expect(map.size).to.equal(6, 'There should be 6 entries in the map, 2 for each interval')
            chai.expect(map.get(1578007800)).to.equal(698, 'The mean computation for the power value is incorrect')
            chai.expect(map.get(1578008700)).to.equal(698, 'The mean computation for the power value is incorrect')

        })
    })
})

describe('When aggregating maps', function() {
    it('Should sum all the entries that have the same key', function() {
        let map1 = new Map(), map2 = new Map(), map3 = new Map()
        let value1 = 10, value2 = 15, value3 = 7
        
        map1.set(10, value1)
        map2.set(10, value2)
        map3.set(10, value3)

        map1.set(20, value1*2)
        map2.set(20, value2*2)
        map3.set(20, value3*2)

        const res = aggregateSummingValues([map1, map2, map3])
        chai.expect(res.size).to.equal(2, 'The number of entries in the aggregated map should not have changed')
        chai.expect(res.get(10)).to.equal(value1+value2+value3, 'The sum one the first key is not done correctly')
        chai.expect(res.get(20)).to.equal((value1+value2+value3)*2, 'the sum on the second key is not done correctly')


    })
})

