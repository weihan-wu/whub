const fs = require('fs')
const { getAvatarByUserId } = require('../service/file.service')
const { create } = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/file-path')


class UserController {
  async create(ctx, next) {
    // 1、获取用户请求传递的参数
    const user = ctx.request.body
    // 2、查询数据
    const result = await create(user)
    // 3、返回数据
    ctx.body = result
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params
    const result = await getAvatarByUserId(userId)
    ctx.response.set('content-type',result[0][0].mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}${result[0][0].filename}`)
  }
}

module.exports = new UserController()