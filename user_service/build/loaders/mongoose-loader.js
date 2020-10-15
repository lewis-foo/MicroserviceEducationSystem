"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatting_1 = require("../util/formatting");
const config_1 = __importDefault(require("config"));
const winston_message_1 = __importDefault(require("../util/winston-message"));
const function_timer_1 = __importDefault(require("../util/function-timer"));
const default_logger_1 = require("../util/default-logger");
const mongoose_1 = __importDefault(require("mongoose"));
class MongooseLoader {
    constructor() {
        this.functionTimer = new function_timer_1.default(default_logger_1.projectLogger);
    }
    init() {
        return mongoose_1.default.connect(formatting_1.connectionString(config_1.default.get('database')));
    }
    terminate() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongoose_1.default.disconnect();
        });
    }
    success() {
        this.functionTimer.end(new winston_message_1.default('info', 'Mongoose has Connected Successfully'));
    }
    error(error) {
        this.functionTimer.end(new winston_message_1.default('error', 'Mongoose Failed to Connect ' + error));
    }
}
exports.default = MongooseLoader;
//# sourceMappingURL=mongoose-loader.js.map