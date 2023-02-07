const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = errorTypes.NAME_OR_PASSWORD_IS_REQUIRED
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400
      message = errorTypes.USER_DOES_NOT_EXISTS
      break;
    case errorTypes.PASSWORD_ERROR:
      status = 400
      message = errorTypes.PASSWORD_ERROR
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401
      message = errorTypes.UNAUTHORIZATION
      break;
    case errorTypes.UNPERMISSION:
      status = 401
      message = errorTypes.UNPERMISSION
      break;
    case errorTypes.DATA_DOES_NOT_EXISTS:
      status = 404
      message = errorTypes.DATA_DOES_NOT_EXISTS
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