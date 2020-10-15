import Lesson from "./Lesson";
class LessonFactory {
    lessonsDictionary: Map<String, Lesson>
    constructor() {
        this.lessonsDictionary = new Map<String, Lesson>();
    }
    registerLessonType(typeString: string, lesson: Lesson) {
        this.lessonsDictionary.set(typeString, lesson)
    }

    getLessonType(typeString: string): Lesson {
        return this.lessonsDictionary.get(typeString)
    }
}

export default LessonFactory