"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const course_1 = require("../model/schemas/course");
const express_validator_1 = require("express-validator");
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
course_1.courseSchema.plugin(mongoose_paginate_1.default);
const courseModel = mongoose_1.default.model('courses', course_1.courseSchema);
function security(req, res, next) {
    if (req.headers["authorization"]) {
        console.log(req.headers["authorization"]);
        jsonwebtoken_1.default.verify(req.headers["authorization"].replace("Bearer ", ""), "shhhhh", function (err, verifiedJWT) {
            if (err) {
                res.json({ "errors": [{ "msg": "Must be signed in to perform this action" }] });
                return;
            }
            req.body["user"] = verifiedJWT.username;
            next();
        });
    }
    else {
        res.json({ "errors": [{ "msg": "Must be signed in to perform this action" }] });
        return;
    }
}
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post('/course', [
    express_validator_1.check("name").isLength({ min: 5 }).withMessage("Course name needs at least 5 characters"),
    express_validator_1.check("user").exists().withMessage("Must be signed in to perform this action"),
    express_validator_1.check("description").isLength({ min: 100 }).withMessage("Description needs at least 100 characters"),
    express_validator_1.check("tags").isLength({ min: 1 }).withMessage("Must have at least one tag"),
    express_validator_1.check("learningObjectives").isLength({ min: 3 }).withMessage("Must have at least 3 learning objectives")
], function (req, res) {
    const errors = express_validator_1.validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        console.log("error");
        res.json({ errors: errors.array() });
        return;
    }
    courseModel.findOne({ name: req.body.name }).then(document => {
        console.log(document);
        if (document) {
            res.json({ "errors": [{ "msg": "Course already exists" }] });
        }
        else {
            courseModel.create({
                name: req.body.name,
                description: req.body.description,
                tags: req.body.tags,
                learningObjectives: req.body.learningObjectives,
                lessons: [],
                owner: req.body.user,
                assesments: []
            }, function (error, doc) {
                if (error)
                    res.json({ "response": 0 });
                res.json(doc.toJSON());
            });
        }
    });
}).get('/course/:page', function (req, res) {
    console.log(req.params.page);
    courseModel.paginate({}, { page: Number(req.params.page), limit: 10, select: ["name", "description"] }, function (err, result) {
        if (err) {
            return res.json({ response: 0 });
        }
        else {
            res.json(result.docs);
        }
    });
}).get('/course/view/:id', function (req, res) {
    const errors = express_validator_1.validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        console.log("error");
        res.json({ errors: errors.array() });
        return;
    }
    courseModel.findById(req.params.id).then(document => {
        res.json(document.toJSON());
    }).catch(error => {
        res.json({
            response: 0
        });
    });
}).get('/course/user/:username', function (req, res) {
    const errors = express_validator_1.validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        console.log("error");
        res.json({ errors: errors.array() });
        return;
    }
    console.log(req.params.username);
    courseModel.find({ owner: req.params.username }).then(document => {
        res.json(document);
    }).catch(error => {
        res.json({
            response: 0
        });
    });
}).put('/course/addLesson', [
    express_validator_1.check("lessonID").exists(),
    express_validator_1.check("id").exists(),
], function (req, res) {
    courseModel.findByIdAndUpdate(req.body.id, {
        $push: { "lessons": req.body.lessonID }
    }, { new: true }, function (err, model) {
        if (err || model === null)
            return res.json({
                response: 0
            });
        res.json(model.toJSON());
    });
}).put('/course/removeLesson', [
    express_validator_1.check("lessonID").exists(),
    express_validator_1.check("id").exists(),
], function (req, res) {
    courseModel.findByIdAndUpdate(req.body.id, {
        $pull: { "lessons": req.body.lessonID }
    }, { new: true }, function (err, model) {
        if (err || model === null)
            return res.json({
                response: 0
            });
        res.json(model.toJSON());
    });
});
//# sourceMappingURL=course.js.map