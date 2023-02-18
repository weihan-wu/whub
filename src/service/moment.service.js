const connection = require('../app/database')
const { APP_HOST, APP_PORT } = require('../app/config')

const SQL_FRAGMENT = `
SELECT 
  m.id,m.content,m.createAt,m.updateAt,
  JSON_OBJECT('id',u.id,'name',u.name) author,
	(SELECT COUNT(*) FROM comment AS c WHERE c.moment_id = m.id) commentCount,
  (SELECT COUNT(*) FROM moment_label AS ml WHERE ml.moment_id = m.id) labelCount,
	(SELECT COUNT(*) FROM file WHERE file.moment_id = m.id) pictureCount
FROM moment AS m
LEFT JOIN user AS u
ON m.user_id = u.id`;

class MomentService {
  async create(userId, content) {
    const statement = "INSERT INTO moment (content,user_id) VALUES (?,?);"
    return await connection.execute(statement, [content, userId])
  }

  async detail(momentId) {
    const statement = `SELECT 
    m.id,m.content,m.createAt,m.updateAt,JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) user,
    IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) labels,
      (SELECT IF(COUNT(c.id),
        JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createAt',c.createAt,'updateAt',c.updateAt,'user',
        JSON_OBJECT('id',cu.id,'name',cu.name,'avatarUrl',cu.avatar_url))),NULL) 
      FROM comment c LEFT JOIN user AS cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
      (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/',file.filename))
      FROM file WHERE m.id = file.moment_id) images
    FROM moment AS m
    LEFT JOIN user AS u ON m.user_id = u.id
    LEFT JOIN moment_label AS ml ON m.id = ml.moment_id
    LEFT JOIN label AS l ON ml.label_id = l.id  
    WHERE m.id = 1
    GROUP BY m.id;`;
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

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const result = await connection.execute(statement, [momentId, labelId])
    return result[0].length !== 0
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?,?);`;
    return await connection.execute(statement, [momentId, labelId])
  }
}

module.exports = new MomentService()