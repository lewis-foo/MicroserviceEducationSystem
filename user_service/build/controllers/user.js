"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../model/schemas/user");
const express_validator_1 = require("express-validator");
const userModel = mongoose_1.default.model('users', user_1.userSchema);
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post('/user', [
    express_validator_1.check("username").isLength({ min: 5 }).withMessage("Username needs a minimum of 5 characters"),
    express_validator_1.check("password").exists().withMessage("Password must exist"),
], function (req, res) {
    if (!req.body) {
        res.json({
            response: -1
        });
    }
    const errors = express_validator_1.validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        console.log("error");
        res.json({ errors: errors.array() });
        return;
    }
    const username = req.body.username;
    const password = req.body.password;
    const userQuery = userModel.findOne({ username: username });
    userQuery.exec(function (err, user) {
        if (err)
            return;
        if (user) {
            res.json({
                response: 2
            });
        }
        else {
            userModel.create({ username: username, password: password }, function (error, user) {
                if (error) {
                    res.json({
                        response: 3
                    });
                    return;
                }
                res.json({
                    response: 1,
                    user: user.toJSON()
                });
            });
        }
    });
}).get('/user/:username', function (req, res) {
    var username = req.params.username;
    const userQuery = userModel.findOne({ username: username });
    userQuery.exec(function (err, user) {
        if (err)
            return;
        if (user) {
            res.json({
                username: user.get("username")
            });
        }
    });
});
//# sourceMappingURL=user.js.map