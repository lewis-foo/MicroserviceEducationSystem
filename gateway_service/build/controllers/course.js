"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const courseRouter = express_1.default.Router();
exports.courseRouter = courseRouter;
function security(req, res, next) {
    console.log("here");
    if (req.headers["authorization"]) {
        jsonwebtoken_1.default.verify(req.headers["authorization"].replace("Bearer ", ""), "shhhhh", function (err, verifiedJWT) {
            if (err) {
                res.json({ "errors": [{ "msg": "Must be signed in to perform this action" }] });
                return;
            }
            req.body["user"] = verifiedJWT.username;
            console.log(verifiedJWT.username);
            next();
        });
    }
    else {
        res.json({ "errors": [{ "msg": "Must be signed in to perform this action" }] });
        return;
    }
}
courseRouter.post('/createCourse', security, function (req, res) {
    axios_1.default.post("http://localhost:4002/course", req.body).then(response => {
        res.json(response.data);
    });
});
courseRouter.get('/getCourse/:page', function (req, res) {
    axios_1.default.get("http://localhost:4002/course/" + req.params.page).then(response => {
        res.json(response.data);
    });
});
courseRouter.get('/course/:id', function (req, res) {
    axios_1.default.get("http://localhost:4002/course/view/" + req.params.id).then(response => {
        res.json(response.data);
    });
});
courseRouter.get('/getUserCourses', security, function (req, res) {
    console.log(req.body.user);
    axios_1.default.get("http://localhost:4002/course/user/" + req.body.user).then(response => {
        res.json(response.data);
    });
});
courseRouter.put('/addLesson/', function (req, res) {
    axios_1.default.post("http://localhost:4003/lesson/", req.body).then(response => {
        console.log(response);
        if (response.data["errors"]) {
            return res.json(response.data);
        }
        axios_1.default.put("http://localhost:4002/course/addLesson/", {
            id: req.body.id,
            lessonID: response.data._id
        }).then(response => {
            res.json(response.data);
        });
    });
});
courseRouter.put('/removeLesson/', function (req, res) {
    axios_1.default.get("http://localhost:4002/course/view/" + req.params.id).then(response => {
        res.json(response.data);
    });
});
//# sourceMappingURL=course.js.map