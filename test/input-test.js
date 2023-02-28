import assert from 'assert'
import chai from 'chai'
import {parseRawInputFromCLI} from '../src/input-manager.js'

describe('When parsing input parameters', function() {
    afterEach(() => {
        process.argv = process.argv.slice(0,2)
    })

    it('should fail if from parameter is missing', function() {
        chai.expect(parseRawInputFromCLI).to.throw('Missing from parameter')
    })

    it('should fail if to parameter is missing', function() {
        process.argv[2] = '01-01-2023'
        chai.expect(parseRawInputFromCLI).to.throw('Missing to parameter')
    })

    it('should fail if output format parameter is missing', function() {
        process.argv[2] = '01-01-2023'
        process.argv[3] = '02-01-2023'
        chai.expect(parseRawInputFromCLI).to.throw('Missing output format parameter')
    })

    it('should fail and display message in standard output if from and to parameters are valid values and output format is not "json" or "csv" ', function() {
    
        process.argv[2] = '01-01-2023'
        process.argv[3] = '02-01-2023'
        process.argv[4] = 'bobcat'
        chai.expect(parseRawInputFromCLI).to.throw('Invalid input parameters')
        //TODO check standard output for message to tell the user the use of the CLI
    })

    it('should pass if "from" and "to" input parameters are valid dates and "output" parameter is "json" or "csv"', function () {
        process.argv[2] = '01-01-2023'
        process.argv[3] = '02-01-2023'
        process.argv[4] = 'json'
        assert.ok(parseRawInputFromCLI())

        process.argv[4] = 'csv'
        assert.ok(parseRawInputFromCLI())
    })

})