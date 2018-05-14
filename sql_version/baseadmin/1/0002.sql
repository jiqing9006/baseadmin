CREATE TABLE `tf_action` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `pid` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `urls` varchar(255) NOT NULL,
  `is_show` tinyint(1) NOT NULL,
PRIMARY KEY (`id`)) ENGINE = InnoDB COMMENT = '菜单表';


INSERT INTO `tf_action` (`id`, `pid`, `level`, `name`, `urls`, `is_show`) VALUES
(1, 0, 1, '门户', '/', 1),
(2, 1, 2, '操作盘', '/', 1);

insert into `dbver` (`ver`, `changelog`, `dateline`) values ('2', '增加菜单表', unix_timestamp());