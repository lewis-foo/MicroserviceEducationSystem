"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Encapsulates data required for outputting to winston in the function timer */
class WinstonMessage {
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
    set message(value) {
        this._message = value;
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
    }
}
exports.default = WinstonMessage;
//# sourceMappingURL=winston-message.js.map