import express from 'express'
import loaders from './loaders'
import { projectLogger } from './util/default-logger'
import { userRouter } from './controllers/user'
import bodyParser from 'body-parser'
const app = express()

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use(userRouter)

app.use('/docs', express.static('./docs'))

async function startServer(): Promise<void> {
  const loader = loaders()
    .then(() => {
      app.listen(4001, (error: Error) => {
        if (error) { throw error }

        projectLogger.log('info', 'Express App Started')
      })
    })
    .catch((error: Error) => {
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
