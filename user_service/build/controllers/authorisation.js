"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../model/schemas/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = mongoose_1.default.model('users', user_1.userSchema);
const authenticationRouter = express_1.default.Router();
exports.authenticationRouter = authenticationRouter;
authenticationRouter.post('/login', function (req, res) {
    if (!req.body) {
        res.json({
            response: -1
        });
    }
    const username = req.body.username;
    const password = req.body.password;
    const userQuery = userModel.findOne({ username: username });
    userQuery.exec(function (err, user) {
        if (err)
            return;
        if (user) {
            if (password === user.get('password')) {
                const token = jsonwebtoken_1.default.sign({ username: user.get("username") }, 'shhhhh');
                res.json({
                    response: 1,
                    token: token
                });
            }
            else {
                res.json({
                    response: 2
                });
            }
        }
        else {
            res.json({
                response: 3
            });
        }
    });
}).post('/auth', function (req, res) {
    jsonwebtoken_1.default.verify(req.body.token, "shhhhh", (err, verifiedJWT) => {
        if (err) {
            res.json({
                "state": 0
            });
        }
        else {
            res.json({
                "state": 1,
                "username": verifiedJWT.username
            });
        }
    });
});
//# sourceMappingURL=authorisation.js.map