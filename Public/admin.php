<?php
//定义项目名称和路径
if ($_ENV && $_ENV['PHP_ENV'] == 'test') {
    define('APP_DEBUG', true);
}
define('APP_NAME', 'Admin');
define('APP_PATH', '../Admin/');
require("../ThinkPHP/Extend/Vendor/Qiniu/autoload.php");
//define('APP_DEBUG',true);
// 加载框架入口文件
require("../ThinkPHP/ThinkPHP.php");
