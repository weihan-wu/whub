CREATE TABLE IF NOT EXISTS `moment` (
 id INT PRIMARY KEY AUTO_INCREMENT,
 content VARCHAR(1000) NOT NULL,
 user_id INT NOT NULL,
 createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 FOREIGN KEY(user_id) REFERENCES user(id)
);

INSERT INTO moment (content,user_id) VALUES ('无边落木萧萧下',1);

SELECT 
	m.id,m.content,m.createAt,m.updateAt,JSON_OBJECT('id',u.id,'name',u.`name`) `user`,
	(SELECT COUNT(*) FROM comment AS c WHERE c.moment_id = m.id) commentCount
FROM moment AS m
LEFT JOIN user AS u
ON m.user_id = u.id
WHERE m.id = 1
LIMIT 0,5;

SELECT 
	m.id,m.content,m.createAt,m.updateAt,JSON_OBJECT('id',u.id,'name',u.name) user,
	IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) labels,
	(SELECT IF(COUNT(c.id),
			JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createAt',c.createAt,'updateAt',c.updateAt,'user',
			JSON_OBJECT('id',cu.id,'name',cu.name))),NULL) 
		FROM comment c LEFT JOIN user AS cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments
FROM moment AS m
LEFT JOIN user AS u ON m.user_id = u.id
LEFT JOIN moment_label AS ml ON m.id = ml.moment_id
LEFT JOIN label AS l ON ml.label_id = l.id  
WHERE m.id = 1
GROUP BY m.id;

SELECT * FROM moment LIMIT 0,2;

SELECT * FROM moment WHERE id = 1 AND user_id = 1;

UPDATE moment SET content = "无边落木萧萧下" WHERE id = 1;

DELETE FROM moment WHERE id = 4;