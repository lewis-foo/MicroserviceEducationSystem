import express, { json } from 'express'
import mongoose from 'mongoose'
import { userSchema } from '../model/schemas/user'
import jwt from 'jsonwebtoken'
import axios from 'axios'
const courseRouter = express.Router()
interface TokenInterface {
    username: String
}
function security(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log("here")
    if (req.headers["authorization"]) {

        jwt.verify(req.headers["authorization"].replace("Bearer ", ""), "shhhhh", function (err: jwt.VerifyErrors, verifiedJWT: TokenInterface) {
            if (err) {
                res.json({ "errors": [{ "msg": "Must be signed in to perform this action" }] })
                return
            }
            req.body["user"] = verifiedJWT.username
            console.log(verifiedJWT.username)
            next();
        })

    } else {

        res.json({ "errors": [{ "msg": "Must be signed in to perform this action" }] })
        return
    }

}
courseRouter.post('/createCourse', security, function (req: express.Request, res: express.Response) {
    axios.post("http://localhost:4002/course", req.body).then(response => {
        res.json(response.data)
    })

})
courseRouter.get('/getCourse/:page', function (req: express.Request, res: express.Response) {

    axios.get("http://localhost:4002/course/" + req.params.page).then(response => {
        res.json(response.data)
    })

})
courseRouter.get('/course/:id', function (req: express.Request, res: express.Response) {

    axios.get("http://localhost:4002/course/view/" + req.params.id).then(response => {
        res.json(response.data)
    })

})
courseRouter.get('/getUserCourses', security, function (req: express.Request, res: express.Response) {
    console.log(req.body.user)
    axios.get("http://localhost:4002/course/user/" + req.body.user).then(response => {
        res.json(response.data)
    })

})
courseRouter.put('/addLesson/', function (req: express.Request, res: express.Response) {

    axios.post("http://localhost:4003/lesson/", req.body).then(response => {
        console.log(response)
        if (response.data["errors"]) {
            return res.json(response.data)
        }
        axios.put("http://localhost:4002/course/addLesson/", {
            id: req.body.id,
            lessonID: response.data._id
        }).then(response => {
            res.json(response.data)
        })
    })
})
courseRouter.put('/removeLesson/', function (req: express.Request, res: express.Response) {

    axios.put("http://localhost:4002/removeLesson/", {
        id: req.body.id,
        lessonID: req.body.lessonId
    }).then(response => {
        res.json(response.data)
    })

})
export { courseRouter }
