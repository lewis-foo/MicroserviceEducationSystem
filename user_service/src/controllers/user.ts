import express from 'express'
import mongoose from 'mongoose'
import { userSchema } from '../model/schemas/user'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator';
const userModel = mongoose.model('users', userSchema)

const userRouter = express.Router()

userRouter.post('/user',
  [
    check("username").isLength({ min: 5 }).withMessage("Username needs a minimum of 5 characters"),
    check("password").exists().withMessage("Password must exist"),
  ], function (req: express.Request, res: express.Response) {
    if (!req.body) {
      res.json({
        response: -1
      })
    }
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
      console.log("error")
      res.json({ errors: errors.array() })
      return
    }
    const username: string = req.body.username
    const password: string = req.body.password
    const userQuery = userModel.findOne({ username: username })
    userQuery.exec(function (err, user) {
      if (err) return
      if (user) {
        res.json({
          response: 2
        });
      } else {
        userModel.create({ username: username, password: password }, function (error: mongoose.Error, user: mongoose.Document) {
          if (error) {
            res.json({
              response: 3
            })
            return
          }

          res.json({
            response: 1,
            user: user.toJSON()
          })
        })


      }
    })
  }).get('/user/:username', function (req: express.Request, res: express.Response) {
    var username: string = req.params.username as string
    const userQuery = userModel.findOne({ username: username })
    userQuery.exec(function (err: mongoose.Error, user: mongoose.Document) {
      if (err) return
      if (user) {
        res.json({
          username: user.get("username")
        })
      }
    })
  })


export { userRouter }
