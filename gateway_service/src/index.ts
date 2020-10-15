import express from 'express'
import loaders from './loaders'
import { projectLogger } from './util/default-logger'
import { authenticationRouter } from './controllers/authorisation'
import { userRouter } from './controllers/user'
import { lessonRouter } from './controllers/lesson'
import bodyParser from 'body-parser'
import { AddressInfo } from "net";
import { courseRouter } from './controllers/course'
const app = express()
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();
});
app.use(function (req, res, next) {
  console.log(req.headers["authorization"])
  next();
});
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use('/api', userRouter)
app.use('/api', authenticationRouter)
app.use('/api', courseRouter)
app.use('/api', lessonRouter)
async function startServer(): Promise<void> {
  const loader = loaders()
    .then(() => {
      var listener = app.listen(4005, (error: Error) => {
        if (error) { throw error }
        let port: AddressInfo = listener.address() as AddressInfo
        projectLogger.log('info', 'Express App Started on port ' + port.port)
      })
    })
    .catch((error: Error) => {
      console.log(error)
      throw error
    })
  await loader
}

startServer().then(() => {
  projectLogger.log('info', 'Initialisation Complete')
}).catch((error) => {
  projectLogger.log('error', 'Initialisation Failed')
  projectLogger.log('error', error)
}

)
