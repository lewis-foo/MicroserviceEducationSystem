/** Encapsulates data required for outputting to winston in the function timer */
export default class WinstonMessage {
    private _message: string
    private _level: string
    /**
     *
     * @param message Message that will be outputted to the logs
     * @param level Log level
     */
    constructor (level: string, message: string) {
      this._message = message
      this._level = level
    }

    public get message (): string {
      return this._message
    }

    public set message (value: string) {
      this._message = value
    }

    public get level (): string {
      return this._level
    }

    public set level (value: string) {
      this._level = value
    }
}
