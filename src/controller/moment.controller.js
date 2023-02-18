const fs = require('fs')
const { create, detail, list, update, destory, hasLabel, addLabel } = require('../service/moment.service')
const { getFileByFilename } = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/file-path')
class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id;
    const { content } = ctx.request.body;
    const result = await create(userId, content)
    ctx.body = result
  }

  async detail(ctx, next) {
    const { momentId } = ctx.request.params
    const result = await detail(momentId)
    ctx.body = result[0][0]
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query
    const result = await list(offset, size)
    ctx.body = result[0]
  }

  async update(ctx, next) {
    const { momentId } = ctx.request.params
    const { content } = ctx.request.body
    const result = await update(content, momentId)
    ctx.body = result
  }

  async destory(ctx, next) {
    const { momentId } = ctx.request.params
    const result = await destory(momentId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params
    for (const label of labels) {
      const isExist = await hasLabel(momentId, label.id)
      if (!isExist) {
        await addLabel(momentId, label.id)
      }
    }
    ctx.body = "添加标签成功～"
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params
    const { type } = ctx.query

    try {
      const result = await getFileByFilename(filename)
      const fileInfo = result[0][0]

      const types = ['small', 'middle', 'large']
      if (types.some(item => item === type)) {
        filename = filename + '-' + type
      }

      ctx.response.set('content-type', fileInfo.mimetype)
      ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = new MomentController()