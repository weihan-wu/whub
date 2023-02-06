const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user
    let token = ''
    try {
      token = jwt.sign({ id, name }, PRIVATE_KEY, {
        expiresIn: 24 * 60 * 60,
        algorithm: "RS256"
      })
    } catch (error) {
      console.log(error);
    }

    ctx.body = {
      id, name, token
    }
    await next()
  }
}

module.exports = new AuthController()