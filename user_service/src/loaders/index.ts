import MongooseLoader from './mongoose-loader'
import Loader from './loader'

async function loadModule (module: Loader): Promise<unknown> {
  let moduleError: Error = null
  return module.init()
    .then(() => {
      module.success()
    })
    .catch((error) => {
      moduleError = error
      module.error(error)

      module.terminate().then(() => {
        throw moduleError
      }).catch((error) => {
        throw error
      })
    })
}

export default async function init (): Promise<unknown> {
  const mongooseLoader = new MongooseLoader()
  const loader = loadModule(mongooseLoader)

  return Promise.all([loader])
}
