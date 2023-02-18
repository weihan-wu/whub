const multer = require('koa-multer')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')

// 头像处理
const avatarUpload = multer({
  dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar')

// 图片处理
const pictureUpload = multer({
  dest: PICTURE_PATH
})
const pictureHandler = pictureUpload.array('picture', 9)

module.exports = { avatarHandler, pictureHandler }