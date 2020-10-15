"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
function security(req, res, next) {
    if (req.headers["authorization"]) {
        console.log(req.headers["authorization"]);
        jsonwebtoken_1.default.verify(req.headers["authorization"].replace("Bearer ", ""), "shhhhh", function (err, verifiedJWT) {
            if (err) {
                res.json({ error: err });
                return;
            }
            req.body["user"] = verifiedJWT.username;
            next();
        });
    }
    else {
        return;
    }
}
userRouter.post('/signup', function (req, res) {
    if (!req.body) {
        res.json({
            response: -1
        });
    }
    const username = req.body.username;
    const password = req.body.password;
    axios_1.default.post("http://localhost:4001/user", req.body).then(response => {
        console.log(response.data);
        if (response.data.response == 1) {
            axios_1.default.post("http://localhost:8000/login", { username: username, password: password }).then(response => {
                console.log(response.data);
                res.json(response.data);
            });
        }
        else {
            res.json(response.data);
        }
    });
}).get('/profile', security, function (req, res) {
    console.log(req.body.user);
    axios_1.default.get("http://localhost:4001/user/" + req.body.user).then(response => {
        res.json(response.data);
    });
});
//# sourceMappingURL=user.js.map