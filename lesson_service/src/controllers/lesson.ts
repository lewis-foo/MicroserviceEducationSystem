import express from 'express'
import mongoose from 'mongoose'
import { lessonSchema } from '../model/schemas/lesson'
import { check, validationResult } from 'express-validator';
import mongoosePaginate from 'mongoose-paginate';
import jwt from 'jsonwebtoken'
import LessonFactory from '../lessons/LessonFactory'
import TextLesson from '../lessons/TextLesson';
const lessonModel = mongoose.model('lessons', lessonSchema)

const userRouter = express.Router()
let lessonFactory = new LessonFactory()
lessonFactory.registerLessonType("text", new TextLesson())

userRouter.post('/lesson', [
  check("name").isLength({ min: 5 }).withMessage("Lesson name needs at least 5 characters"),
  check("description").isLength({ min: 100 }).withMessage("Description needs at least 100 characters"),
  check("type").exists().withMessage("Lesson must contain a type"),
  check("lessonData").exists().withMessage("Must contain lesson data")
], function (req: express.Request, res: express.Response) {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log("error")
    res.json({ errors: errors.array() })
    return
  }
  var lessonType = lessonFactory.getLessonType(req.body.type)

  try {
    lessonType.validate(req.body.lessonData)
  } catch (error) {
    console.log(error)
    res.json({
      errors: [
        {
          msg: "invalid lesson data"
        }
      ]
    })
    return;
  }

  lessonModel.create({
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    lessonData: req.body.lessonData
  }).then(document => {
    res.json(document.toJSON())
  })

}).get('/lesson/:id', function (req: express.Request, res: express.Response) {
  lessonModel.findById(req.params.id, function (error: any, doc: mongoose.Document) {
    if (error || !doc) {
      res.json({ response: 0 })
      return;
    }
    res.json(doc.toJSON())
  })

})


export { userRouter }
