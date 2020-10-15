import express from 'express'
import mongoose from 'mongoose'
import { userSchema } from '../model/schemas/user'
import jwt from 'jsonwebtoken'
const userModel = mongoose.model('users', userSchema)

const authenticationRouter = express.Router()
interface TokenInterface {
  username: String
}
authenticationRouter.post('/login', function (req: express.Request, res: express.Response) {
  if (!req.body) {
    res.json({
      response: -1
    })
  }
  const username: string = req.body.username
  const password: string = req.body.password
  const userQuery = userModel.findOne({ username: username })
  userQuery.exec(function (err, user) {
    if (err) return
    if (user) {
      if (password === user.get('password')) {
        const token = jwt.sign({ username: user.get("username") }, 'shhhhh')
        res.json({
          response: 1,
          token: token
        })
      } else {
        res.json({
          response: 2
        })
      }
    } else {
      res.json({
        response: 3
      })
    }
  })
}).post('/auth', function (req: express.Request, res: express.Response) {
  jwt.verify(req.body.token, "shhhhh", (err: jwt.VerifyErrors, verifiedJWT: TokenInterface) => {
    if (err) {
      res.json({
        "response": 0
      })
    } else {
      console.log(verifiedJWT)
      res.json({
        "response": 1,
        "username": verifiedJWT.username
      })
    }
  })
})


export { authenticationRouter }
