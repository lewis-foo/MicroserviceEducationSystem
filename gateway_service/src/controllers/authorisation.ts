import express from 'express'
import mongoose from 'mongoose'
import { userSchema } from '../model/schemas/user'
import jwt from 'jsonwebtoken'
import axios from 'axios'
const authenticationRouter = express.Router()

authenticationRouter.post('/login', function (req: express.Request, res: express.Response) {
    axios.post("http://localhost:8000/login", req.body).then(response => {
        res.json(response.data)
    })

})
authenticationRouter.post('/auth', function (req: express.Request, res: express.Response) {
    axios.post("http://localhost:8000/auth", req.body).then(response => {
        res.json(response.data)
    })

})

export { authenticationRouter }
