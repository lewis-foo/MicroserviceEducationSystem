"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LessonFactory {
    constructor() {
        this.lessonsDictionary = new Map();
    }
    registerLessonType(typeString, lesson) {
        this.lessonsDictionary.set(typeString, lesson);
    }
    getLessonType(typeString) {
        return this.lessonsDictionary.get(typeString);
    }
}
exports.default = LessonFactory;
//# sourceMappingURL=LessonFactory.js.map