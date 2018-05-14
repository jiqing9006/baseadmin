<?php
if ($_ENV && $_ENV['PHP_ENV'] == 'test') {
    define('APP_DEBUG', true);
}
define('APP_NAME', 'Cron');
define('APP_PATH', '../Cron/');
define('MODE_NAME','cli');
//define('APP_DEBUG',true);
// 加载框架入口文件
require("../ThinkPHP/ThinkPHP.php");
