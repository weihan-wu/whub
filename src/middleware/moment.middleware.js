const errorTypes = require('../constants/error-types')
const { detail } = require('../service/moment.service')

const checkExist = async (ctx, next) => {
  const { momentId } = ctx.request.params
  try {
    const result = await detail(momentId)
    if (result[0].length === 0) throw new Error()
    await next()
  } catch (err) {
    const error = new Error(errorTypes.DATA_DOES_NOT_EXISTS)
    ctx.app.emit('error', error, ctx)
  }

}

module.exports = { checkExist }