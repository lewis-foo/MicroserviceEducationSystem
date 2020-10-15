"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const lessonRouter = express_1.default.Router();
exports.lessonRouter = lessonRouter;
lessonRouter.post('/createLesson', function (req, res) {
    axios_1.default.post("http://localhost:4003/lesson", req.body).then(response => {
        console.log(response.data);
        res.json(response.data);
    });
});
lessonRouter.get('/getLesson/:id', function (req, res) {
    console.log(req.params.page);
    axios_1.default.get("http://localhost:4003/lesson/" + req.params.id).then(response => {
        console.log(response.data);
        res.json(response.data);
    });
});
//# sourceMappingURL=lesson.js.map