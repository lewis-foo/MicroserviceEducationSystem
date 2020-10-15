"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const authenticationRouter = express_1.default.Router();
exports.authenticationRouter = authenticationRouter;
authenticationRouter.post('/login', function (req, res) {
    console.log("ffff");
    axios_1.default.post("http://localhost:8000/login", req.body).then(response => {
        res.json(response.data);
    });
});
authenticationRouter.post('/auth', function (req, res) {
    console.log("ffff");
    axios_1.default.post("http://localhost:8000/auth", req.body).then(response => {
        res.json(response.data);
    });
});
//# sourceMappingURL=authorisation.js.map