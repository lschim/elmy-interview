import pino from 'pino'
import conf from './conf.cjs'

export default pino({level: conf.logLevel}, pino.destination(conf.logDestination))