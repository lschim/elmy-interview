const pino = require('pino')
const conf = require('./conf')

const logger = pino({level: conf.logLevel}, pino.destination(conf.logDestination))

// Log configuration for the project
module.exports = logger