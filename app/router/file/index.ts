import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  const subRouter = router.namespace('/file')

  subRouter.put('/upload', controller.file.upload.upload)
}
