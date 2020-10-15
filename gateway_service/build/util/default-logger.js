"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const env = process.env.NODE_ENV || 'development';
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
};
winston_1.default.addColors(config.colors);
const projectLogger = winston_1.default.createLogger({
    levels: config.levels,
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    transports: [
        new (winston_1.default.transports.Console)()
    ],
    level: env === 'development' ? 'silly' : 'error'
});
exports.projectLogger = projectLogger;
//# sourceMappingURL=default-logger.js.map