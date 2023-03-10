/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : whub_dev

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 05/03/2023 20:38:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `mimetype` varchar(30) DEFAULT NULL,
  `size` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename` (`filename`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of avatar
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `moment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `moment_id` (`moment_id`),
  KEY `user_id` (`user_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of comment
-- ----------------------------
BEGIN;
INSERT INTO `comment` (`id`, `content`, `moment_id`, `user_id`, `comment_id`, `createAt`, `updateAt`) VALUES (5, 'PHP??????????????????????????????', 1, 1, NULL, '2023-02-12 17:20:24', '2023-02-12 17:20:24');
INSERT INTO `comment` (`id`, `content`, `moment_id`, `user_id`, `comment_id`, `createAt`, `updateAt`) VALUES (6, 'JS??????????????????????????????', 1, 1, NULL, '2023-02-12 17:56:42', '2023-02-12 17:56:42');
COMMIT;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL,
  `mimetype` varchar(30) DEFAULT NULL,
  `size` int DEFAULT NULL,
  `moment_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `moment_id` (`moment_id`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `file_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of file
-- ----------------------------
BEGIN;
INSERT INTO `file` (`id`, `filename`, `mimetype`, `size`, `moment_id`, `user_id`, `createAt`, `updateAt`) VALUES (1, '61928c3e51a00efdbd4f1be61c5a5d8d', 'image/jpeg', 127193, 1, 1, '2023-02-18 22:32:47', '2023-02-18 22:32:47');
INSERT INTO `file` (`id`, `filename`, `mimetype`, `size`, `moment_id`, `user_id`, `createAt`, `updateAt`) VALUES (2, '40460207ec58b0d073986e218e85a2ab', 'image/jpeg', 1373790, 1, 1, '2023-02-18 22:32:47', '2023-02-18 22:32:47');
COMMIT;

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of label
-- ----------------------------
BEGIN;
INSERT INTO `label` (`id`, `name`, `createAt`, `updateAt`) VALUES (1, '??????', '2023-02-12 22:55:32', '2023-02-12 22:55:32');
INSERT INTO `label` (`id`, `name`, `createAt`, `updateAt`) VALUES (2, '??????', '2023-02-12 22:57:25', '2023-02-12 22:57:25');
INSERT INTO `label` (`id`, `name`, `createAt`, `updateAt`) VALUES (3, '????????????', '2023-02-12 23:32:41', '2023-02-12 23:32:41');
INSERT INTO `label` (`id`, `name`, `createAt`, `updateAt`) VALUES (4, '??????', '2023-02-12 23:34:00', '2023-02-12 23:34:00');
INSERT INTO `label` (`id`, `name`, `createAt`, `updateAt`) VALUES (5, '??????', '2023-02-12 23:48:09', '2023-02-12 23:48:09');
COMMIT;

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `user_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of moment
-- ----------------------------
BEGIN;
INSERT INTO `moment` (`id`, `content`, `user_id`, `createAt`, `updateAt`) VALUES (1, '?????????????????????', 1, '2023-02-06 22:56:20', '2023-02-07 22:51:41');
INSERT INTO `moment` (`id`, `content`, `user_id`, `createAt`, `updateAt`) VALUES (2, '???????????????', 4, '2023-02-06 23:02:51', '2023-02-06 23:02:51');
COMMIT;

-- ----------------------------
-- Table structure for moment_label
-- ----------------------------
DROP TABLE IF EXISTS `moment_label`;
CREATE TABLE `moment_label` (
  `moment_id` int NOT NULL,
  `label_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`moment_id`,`label_id`),
  KEY `label_id` (`label_id`),
  CONSTRAINT `moment_label_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of moment_label
-- ----------------------------
BEGIN;
INSERT INTO `moment_label` (`moment_id`, `label_id`, `createAt`, `updateAt`) VALUES (1, 3, '2023-02-12 23:47:18', '2023-02-12 23:47:18');
INSERT INTO `moment_label` (`moment_id`, `label_id`, `createAt`, `updateAt`) VALUES (1, 4, '2023-02-12 23:47:18', '2023-02-12 23:47:18');
INSERT INTO `moment_label` (`moment_id`, `label_id`, `createAt`, `updateAt`) VALUES (1, 5, '2023-02-12 23:48:09', '2023-02-12 23:48:09');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password` varchar(64) NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `name`, `password`, `createAt`, `updateAt`, `avatar_url`) VALUES (1, 'wuwh', 'e10adc3949ba59abbe56e057f20f883e', '2023-01-30 21:26:05', '2023-02-15 23:37:25', 'http://localhost:8888/user/1/avatar');
INSERT INTO `user` (`id`, `name`, `password`, `createAt`, `updateAt`, `avatar_url`) VALUES (3, 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e', '2023-01-31 20:58:19', '2023-02-12 01:02:57', NULL);
INSERT INTO `user` (`id`, `name`, `password`, `createAt`, `updateAt`, `avatar_url`) VALUES (4, 'lisi', 'e10adc3949ba59abbe56e057f20f883e', '2023-02-01 23:53:45', '2023-02-01 23:53:45', NULL);
INSERT INTO `user` (`id`, `name`, `password`, `createAt`, `updateAt`, `avatar_url`) VALUES (5, 'wangwu', 'e10adc3949ba59abbe56e057f20f883e', '2023-02-06 23:05:05', '2023-02-06 23:05:05', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
