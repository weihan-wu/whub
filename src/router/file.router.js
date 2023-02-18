const Router = require('koa-router')

const { saveAvatarInfo, savePictureInfo } = require('../controller/file.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const { avatarHandler, pictureHandler } = require('../middleware/file.middleware')

const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)
fileRouter.post('/picture', verifyAuth, pictureHandler, savePictureInfo)

module.exports = fileRouter