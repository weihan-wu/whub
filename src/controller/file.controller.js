const { APP_HOST, APP_PORT } = require('../app/config')
const { updateAvatarById } = require('../service/user.service')
const { createAvater, createFile } = require('../service/file.service')

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file
    const userId = ctx.user.id
    const result = await createAvater(filename, mimetype, size, userId)

    const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${userId}/avatar`
    await updateAvatarById(avatarUrl, userId)

    ctx.body = result
  }

  async savePictureInfo(ctx, next) {
    const files = ctx.req.files
    const userId = ctx.user.id
    const { momentId } = ctx.request.query

    for (const file of files) {
      const { filename, mimetype, size } = file
      await createFile(filename, mimetype, size, userId, momentId)
    }
    
    ctx.body = '配图上传完成'
  }
}

module.exports = new FileController()