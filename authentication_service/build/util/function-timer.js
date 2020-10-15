"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class utilised in measuring the time taken for a function to complete */
class FunctionTimer {
    /**
     * Constructs a Function Timer Object
     * @param logger Logger used for output message
     */
    constructor(logger) {
        this.startTime = process.hrtime();
        this.logger = logger;
    }
    /** Starts the function timer */
    start() {
        this.startTime = process.hrtime();
    }
    /**
     * Calculates the time passed utilising high resolution time and outputs a message
     * @param message Message object used to output to winston see {@linkcode TimerMessage}
     */
    end(message) {
        const runningTime = process.hrtime(this.startTime);
        const milliseconds = Math.round(runningTime[1] / 1000000);
        if (message) {
            this.logger.log(message.level, message.message + ` ${milliseconds} ms`);
        }
    }
}
exports.default = FunctionTimer;
//# sourceMappingURL=function-timer.js.map