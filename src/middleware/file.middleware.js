const path = require('path')
const multer = require('koa-multer')
const jimp = require('jimp')
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

const pictureResize = async (ctx, next) => {
  const { files } = ctx.req

  for (let file of files) {
    const destPath = path.join(file.destination, file.filename)
    jimp.read(file.path).then(image => {
      image.resize(1280, jimp.AUTO).write(`${destPath}-large`)
      image.resize(640, jimp.AUTO).write(`${destPath}-middle`)
      image.resize(320, jimp.AUTO).write(`${destPath}-small`)
    })
  }

  await next()
}

module.exports = { avatarHandler, pictureHandler, pictureResize }