<?php
/**
 * Created by Xiaoerbi.
 * User: tankang
 * Date: 16/5/15
 * Time: 下午2:54
 */
//定义项目名称和路径
if ($_ENV && $_ENV['PHP_ENV'] == 'test') {
    define('APP_DEBUG', true);
}
define('APP_NAME', 'Api');
define('APP_PATH', '../Api/');
require("../ThinkPHP/Extend/Vendor/Qiniu/autoload.php");
require '../vendor/autoload.php';
//define('APP_DEBUG',true);
// 加载框架入口文件
require("../ThinkPHP/ThinkPHP.php");
