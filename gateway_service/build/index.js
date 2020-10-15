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
const express_1 = __importDefault(require("express"));
const loaders_1 = __importDefault(require("./loaders"));
const default_logger_1 = require("./util/default-logger");
const authorisation_1 = require("./controllers/authorisation");
const user_1 = require("./controllers/user");
const lesson_1 = require("./controllers/lesson");
const body_parser_1 = __importDefault(require("body-parser"));
const course_1 = require("./controllers/course");
const app = express_1.default();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    next();
});
app.use(function (req, res, next) {
    console.log(req.headers["authorization"]);
    next();
});
// configure the app to use bodyParser()
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
app.use('/api', user_1.userRouter);
app.use('/api', authorisation_1.authenticationRouter);
app.use('/api', course_1.courseRouter);
app.use('/api', lesson_1.lessonRouter);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const loader = loaders_1.default()
            .then(() => {
            var listener = app.listen(4005, (error) => {
                if (error) {
                    throw error;
                }
                let port = listener.address();
                default_logger_1.projectLogger.log('info', 'Express App Started on port ' + port.port);
            });
        })
            .catch((error) => {
            console.log(error);
            throw error;
        });
        yield loader;
    });
}
startServer().then(() => {
    default_logger_1.projectLogger.log('info', 'Initialisation Complete');
}).catch((error) => {
    default_logger_1.projectLogger.log('error', 'Initialisation Failed');
    default_logger_1.projectLogger.log('error', error);
});
//# sourceMappingURL=index.js.map