const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types')
const { getUserByName } = require('../service/user.service')
const { md5password } = require('../utils/password.handle')

const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  const result = await getUserByName(name)
  const user = result[0][0]

  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_ERROR)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user

  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.header.authorization
  
  try {
    const token = authorization?.replace('Bearer ', '')
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result
    await next()
  } catch (err) {
    console.log(err);
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

module.exports = { verifyLogin, verifyAuth }