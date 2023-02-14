CREATE TABLE IF NOT EXISTS `comment` (
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(1000) NOT NULL,
	moment_id INT NOT NULL,
	user_id INT NOT NULL,
	comment_id INT DEFAULT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(comment_id) REFERENCES comment(id) ON DELETE CASCADE ON UPDATE CASCADE
); 

INSERT INTO comment (moment_id,content,user_id) VALUES (2,'好湿，好湿～',5);

SELECT m.id,m.content,m.createAt,m.updateAt,
JSON_OBJECT('id',u.id,'name',u.name) AS user
FROM comment AS m
LEFT JOIN user AS u ON u.id = m.user_id
WHERE moment_id = 1;