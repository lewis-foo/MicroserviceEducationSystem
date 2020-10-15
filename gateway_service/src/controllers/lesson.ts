import express from 'express'
import mongoose from 'mongoose'
import { userSchema } from '../model/schemas/user'
import jwt from 'jsonwebtoken'
import axios from 'axios'
const lessonRouter = express.Router()

lessonRouter.post('/createLesson', function (req: express.Request, res: express.Response) {
    axios.post("http://localhost:4003/lesson", req.body).then(response => {
        console.log(response.data)
        res.json(response.data)
    })

})
lessonRouter.get('/getLesson/:id', function (req: express.Request, res: express.Response) {
    console.log(req.params.page)
    axios.get("http://localhost:4003/lesson/" + req.params.id).then(response => {
        console.log(response.data)
        res.json(response.data)
    })

})

export { lessonRouter }
