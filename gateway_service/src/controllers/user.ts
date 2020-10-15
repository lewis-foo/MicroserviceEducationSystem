import express from 'express'
import mongoose from 'mongoose'
import { userSchema } from '../model/schemas/user'
import axios from 'axios'
import jwt from 'jsonwebtoken'

const userRouter = express.Router()
interface TokenInterface {
    username: String
}
function security(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.headers["authorization"]) {
        console.log(req.headers["authorization"])
        jwt.verify(req.headers["authorization"].replace("Bearer ", ""), "shhhhh", function (err: jwt.VerifyErrors, verifiedJWT: TokenInterface) {
            if (err) {
                res.json({ error: err })
                return
            }
            req.body["user"] = verifiedJWT.username

            next();
        })

    } else {
        return
    }

}
userRouter.post('/signup', function (req: express.Request, res: express.Response) {
    if (!req.body) {
        res.json({
            response: -1
        })
    }
    const username: string = req.body.username
    const password: string = req.body.password
    axios.post("http://localhost:4001/user", req.body).then(response => {
        console.log(response.data)
        if (response.data.response == 1) {

            axios.post("http://localhost:8000/login", { username: username, password: password }).then(response => {
                console.log(response.data)
                res.json(response.data)
            })
        } else {
            res.json(response.data)
        }

    })

}).get('/profile', security, function (req: express.Request, res: express.Response) {
    console.log(req.body.user)
    axios.get("http://localhost:4001/user/" + req.body.user).then(response => {
        res.json(response.data)
    });
})


export { userRouter }