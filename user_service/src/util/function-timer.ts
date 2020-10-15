import winston from 'winston'
import WinstonMessage from './winston-message'

/** Class utilised in measuring the time taken for a function to complete */
export default class FunctionTimer {
    private startTime: [number, number]
    private logger: winston.Logger
    /**
     * Constructs a Function Timer Object
     * @param logger Logger used for output message
     */
    public constructor (logger: winston.Logger) {
      this.startTime = process.hrtime()
      this.logger = logger
    }

    /** Starts the function timer */
    public start (): void {
      this.startTime = process.hrtime()
    }

    /**
     * Calculates the time passed utilising high resolution time and outputs a message
     * @param message Message object used to output to winston see {@linkcode TimerMessage}
     */
    public end (message: WinstonMessage): void {
      const runningTime = process.hrtime(this.startTime)
      const milliseconds = Math.round(runningTime[1] / 1000000)
      if (message) {
        this.logger.log(message.level, message.message + ` ${milliseconds} ms`)
      }
    }
}
