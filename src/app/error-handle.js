const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = errorTypes.NAME_OR_PASSWORD_IS_REQUIRED
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409
      message = errorTypes.USER_ALREADY_EXISTS
      break;
    default:
      status = 404
      message = 'NOT FOUND'
      break;
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandler