import Loader from './loader'
import { connectionString } from '../util/formatting'
import config from 'config'
import WinstonMessage from '../util/winston-message'
import FunctionTimer from '../util/function-timer'
import { projectLogger } from '../util/default-logger'
import mongoose from 'mongoose'
export default class MongooseLoader implements Loader {
    private functionTimer: FunctionTimer
    constructor () {
      this.functionTimer = new FunctionTimer(projectLogger)
    }

    init (): Promise<typeof mongoose> {
      return mongoose.connect(connectionString(config.get<unknown>('database')))
    }

    async terminate (): Promise<void> {
      return mongoose.disconnect()
    }

    success (): void {
      this.functionTimer.end(new WinstonMessage('info', 'Mongoose has Connected Successfully'))
    }

    error (error: Error): void{
      this.functionTimer.end(new WinstonMessage('error', 'Mongoose Failed to Connect ' + error))
    }
}
