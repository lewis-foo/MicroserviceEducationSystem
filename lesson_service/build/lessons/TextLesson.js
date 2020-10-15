"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextLesson {
    validate(lessonData) {
        if (!lessonData.hasOwnProperty("sections"))
            throw new Error("Lesson Data must contain sections");
    }
}
exports.default = TextLesson;
//# sourceMappingURL=TextLesson.js.map