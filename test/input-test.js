const assert = require('assert')
const outputManager = require('../src/output-manager')

describe('Input parameters of the application', function() {
    it('should return false if the input parameter for the ouput is not json or csv', function() {
        assert.equal(outputManager.isValidFormat('blabla'), false)        
    })

    it('should return true if the input parameter for the ouput is json', function() {
        assert.ok(outputManager.isValidFormat('json'))        
    })

    it('should return true if the input parameter for the ouput is csv', function() {
        assert.ok(outputManager.isValidFormat('csv'))        
    })
})