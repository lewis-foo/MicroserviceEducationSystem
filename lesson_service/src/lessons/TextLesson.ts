import Lesson from './Lesson'

class TextLesson implements Lesson {
    validate(lessonData: Object): void {
        if (!lessonData.hasOwnProperty("sections"))
            throw new Error("Lesson Data must contain sections");

    }

}

export default TextLesson