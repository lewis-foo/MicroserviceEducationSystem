"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const lesson_1 = require("../model/schemas/lesson");
const express_validator_1 = require("express-validator");
const LessonFactory_1 = __importDefault(require("../lessons/LessonFactory"));
const TextLesson_1 = __importDefault(require("../lessons/TextLesson"));
const lessonModel = mongoose_1.default.model('lessons', lesson_1.lessonSchema);
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
let lessonFactory = new LessonFactory_1.default();
lessonFactory.registerLessonType("text", new TextLesson_1.default());
userRouter.post('/lesson', [
    express_validator_1.check("name").isLength({ min: 5 }).withMessage("Lesson name needs at least 5 characters"),
    express_validator_1.check("description").isLength({ min: 100 }).withMessage("Description needs at least 100 characters"),
    express_validator_1.check("type").exists().withMessage("Lesson must contain a type"),
    express_validator_1.check("lessonData").exists().withMessage("Must contain lesson data")
], function (req, res) {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        console.log("error");
        res.json({ errors: errors.array() });
        return;
    }
    var lessonType = lessonFactory.getLessonType(req.body.type);
    try {
        lessonType.validate(req.body.lessonData);
    }
    catch (error) {
        console.log(error);
        res.json({
            errors: [
                {
                    msg: "invalid lesson data"
                }
            ]
        });
        return;
    }
    lessonModel.create({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        lessonData: req.body.lessonData
    }).then(document => {
        res.json(document.toJSON());
    });
}).get('/lesson/:id', function (req, res) {
    lessonModel.findById(req.params.id, function (error, doc) {
        if (error || !doc) {
            res.json({ response: 0 });
            return;
        }
        res.json(doc.toJSON());
    });
});
//# sourceMappingURL=lesson.js.map