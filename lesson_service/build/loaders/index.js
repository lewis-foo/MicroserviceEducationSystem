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
const mongoose_loader_1 = __importDefault(require("./mongoose-loader"));
function loadModule(module) {
    return __awaiter(this, void 0, void 0, function* () {
        let moduleError = null;
        return module.init()
            .then(() => {
            module.success();
        })
            .catch((error) => {
            moduleError = error;
            module.error(error);
            module.terminate().then(() => {
                throw moduleError;
            }).catch((error) => {
                throw error;
            });
        });
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const mongooseLoader = new mongoose_loader_1.default();
        const loader = loadModule(mongooseLoader);
        return Promise.all([loader]);
    });
}
exports.default = init;
//# sourceMappingURL=index.js.map