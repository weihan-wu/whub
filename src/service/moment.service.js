const connection = require('../app/database')

const SQL_FRAGMENT = `
SELECT 
  m.id,m.content,m.createAt,m.updateAt,
  JSON_OBJECT('id',u.id,'name',u.name) author,
	(SELECT COUNT(*) FROM comment AS c WHERE c.moment_id = m.id) commentCount
FROM moment AS m
LEFT JOIN user AS u
ON m.user_id = u.id`;

class MomentService {
  async create(userId, content) {
    const statement = "INSERT INTO moment (content,user_id) VALUES (?,?);"
    return await connection.execute(statement, [content, userId])
  }

  async detail(momentId) {
    // const statement = `
    // ${SQL_FRAGMENT}
    // WHERE m.id = ?;`;
    const statement = `SELECT 
    m.id,m.content,m.createAt,m.updateAt,JSON_OBJECT('id',u.id,'name',u.name) user,
    JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createAt',c.createAt,'updateAt',c.updateAt,
                              'user',JSON_OBJECT('id',cu.id,'name',cu.name))) comments
    FROM moment AS m
    LEFT JOIN user AS u ON m.user_id = u.id
    LEFT JOIN comment AS c ON c.moment_id = m.id
    LEFT JOIN user cu ON c.user_id = cu.id
    WHERE m.id = 1;`;
    return await connection.execute(statement, [momentId])
  }

  async list(offset, size) {
    const statement = `
    ${SQL_FRAGMENT}
    LIMIT ?,?;`;
    return await connection.execute(statement, [offset, size])
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    return await connection.execute(statement, [content, momentId])
  }

  async destory(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    return await connection.execute(statement, [momentId])
  }
}

module.exports = new MomentService()