
import winston from 'winston'
const env = process.env.NODE_ENV || 'development'

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta'
  }
}
winston.addColors(config.colors)

const projectLogger: winston.Logger = winston.createLogger({
  levels: config.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new (winston.transports.Console)()
  ],
  level: env === 'development' ? 'silly' : 'error'
})

export { projectLogger }
