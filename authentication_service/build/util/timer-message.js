"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Encapsulates data required for outputting to winston in the function timer */
class TimerMessage {
    /**
     *
     * @param message Message that will be outputted to the logs
     * @param level Log level
     */
    constructor(level, message) {
        this._message = message;
        this._level = level;
    }
    get message() {
        return this._message;
    }
    set message(theMessage) {
        this._message = theMessage;
    }
    get level() {
        return this._level;
    }
    set level(theLevel) {
        this._level = theLevel;
    }
}
exports.default = TimerMessage;
//# sourceMappingURL=timer-message.js.map