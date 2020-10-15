import express from 'express'
import mongoose from 'mongoose'
import { courseSchema } from '../model/schemas/course'
import { check, validationResult } from 'express-validator';
import mongoosePaginate from 'mongoose-paginate';
import jwt from 'jsonwebtoken'
courseSchema.plugin(mongoosePaginate)
const courseModel = mongoose.model('courses', courseSchema)
interface TokenInterface {
  username: String
}
function security(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.headers["authorization"]) {
    console.log(req.headers["authorization"])
    jwt.verify(req.headers["authorization"].replace("Bearer ", ""), "shhhhh", function (err: jwt.VerifyErrors, verifiedJWT: TokenInterface) {
      if (err) {
        res.json({ "errors": [{ "msg": "Must be signed in to perform this action" }] })
        return
      }
      req.body["user"] = verifiedJWT.username

      next();
    })

  } else {

    res.json({ "errors": [{ "msg": "Must be signed in to perform this action" }] })
    return
  }

}
const userRouter = express.Router()
interface CourseI {
  name: string,
  description: string,
  tags: [],
  learningObjectives: [],

}
userRouter.post('/course', [
  check("name").isLength({ min: 5 }).withMessage("Course name needs at least 5 characters"),
  check("user").exists().withMessage("Must be signed in to perform this action"),
  check("description").isLength({ min: 100 }).withMessage("Description needs at least 100 characters"),
  check("tags").isLength({ min: 1 }).withMessage("Must have at least one tag"),
  check("learningObjectives").isLength({ min: 3 }).withMessage("Must have at least 3 learning objectives")
], function (req: express.Request, res: express.Response) {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    console.log("error")
    res.json({ errors: errors.array() })
    return
  }
  courseModel.findOne({ name: req.body.name }).then(document => {
    console.log(document)
    if (document) {
      res.json({ "errors": [{ "msg": "Course already exists" }] })
    } else {
      courseModel.create({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        learningObjectives: req.body.learningObjectives,
        lessons: [],
        owner: req.body.user,
        assesments: []
      }, function (error: mongoose.Error, doc: mongoose.Document) {
        if (error)
          res.json({ "response": 0 })
        res.json(doc.toJSON())
      })
    }
  })


}).get('/course/:page', function (req: express.Request, res: express.Response) {
  console.log(req.params.page)
  courseModel.paginate({}, { page: Number(req.params.page), limit: 10, select: ["name", "description"] }, function (err: any, result: any) {
    if (err) {
      return res.json({ response: 0 })
    } else {
      res.json(result.docs)
    }


  });
}).get('/course/view/:id', function (req: express.Request, res: express.Response) {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    console.log("error")
    res.json({ errors: errors.array() })
    return
  }
  courseModel.findById(req.params.id).then(document => {
    res.json(document.toJSON())
  }).catch(error => {
    res.json({
      response: 0
    })
  })
}).get('/course/user/:username', function (req: express.Request, res: express.Response) {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    console.log("error")
    res.json({ errors: errors.array() })
    return
  }
  console.log(req.params.username)
  courseModel.find({ owner: req.params.username }).then(document => {
    res.json(document)
  }).catch(error => {
    res.json({
      response: 0
    })
  })
}).put('/course/addLesson', [
  check("lessonID").exists(),
  check("id").exists(),
], function (req: express.Request, res: express.Response) {
  courseModel.findByIdAndUpdate(req.body.id, {
    $push: { "lessons": req.body.lessonID }
  },
    { new: true }, function (err, model) {
      if (err || model === null)
        return res.json({
          response: 0
        })

      res.json(model.toJSON())
    })
}).put('/course/removeLesson', [
  check("lessonID").exists(),
  check("id").exists(),
], function (req: express.Request, res: express.Response) {
  courseModel.findByIdAndUpdate(req.body.id, {
    $pull: { "lessons": req.body.lessonID }
  },
    { new: true }, function (err, model) {
      if (err || model === null)
        return res.json({
          response: 0
        })

      res.json(model.toJSON())
    })
})

export { userRouter }
