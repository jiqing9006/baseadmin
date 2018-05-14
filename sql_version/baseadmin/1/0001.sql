CREATE TABLE `tf_admin_user` (
  `id` int(11) NOT NULL  AUTO_INCREMENT COMMENT 'id',
  `nick_name` varchar(32) NOT NULL COMMENT '用户昵称',
  `password` varchar(128) NOT NULL COMMENT '密码',
  `create_time` int(11) NOT NULL COMMENT '添加时间',
  `email` varchar(64) NOT NULL,
  `super` tinyint(4) NOT NULL COMMENT '是否是超级管理员(0不是，1是)',
  `power` varchar(128) NOT NULL COMMENT '权限字符串',
  `status` tinyint(4) NOT NULL COMMENT '状态(0正常 1删除)',
  PRIMARY KEY (`id`)) ENGINE = InnoDB COMMENT = '管理员表';

--
-- 转存表中的数据 `tf_admin_user`
--

INSERT INTO `tf_admin_user` (`id`, `nick_name`, `password`, `create_time`, `email`, `super`, `power`, `status`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 1480645830, '', 1, '', 0);

insert into `dbver` (`ver`, `changelog`, `dateline`) values ('1', '创建管理员表', unix_timestamp());