const connection = require('../app/database')

class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (moment_id,content,user_id) VALUES (?,?,?);`
    return await connection.execute(statement, [momentId, content, userId])
  }

  async reply(momentId, content, userId, commentId) {
    const statement = `INSERT INTO comment (moment_id,content,user_id,comment_id) VALUES (?,?,?,?);`
    return await connection.execute(statement, [momentId, content, userId, commentId])
  }

  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    return await connection.execute(statement, [content, commentId])
  }

  async destory(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    return await connection.execute(statement, [commentId])
  }

  async getCommentsByMomentId(momentId) {
    const statement = `SELECT m.id,m.content,m.createAt,m.updateAt,
    JSON_OBJECT('id',u.id,'name',u.name) AS user
    FROM comment AS m
    LEFT JOIN user AS u ON u.id = m.user_id
    WHERE moment_id = ?;`;
    return await connection.execute(statement, [momentId])
  }
}

module.exports = new CommentService()