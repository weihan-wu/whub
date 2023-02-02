const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const { md5password } = require('../utils/password.handle')
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body

  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  const result = await userService.getUserByName(name);
  if (result[0].length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }


  await next()
}

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser, handlePassword
}