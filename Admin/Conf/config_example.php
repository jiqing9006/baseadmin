
<?php
return array(
    'URL_MODEL'                 =>  1,
    'DB_TYPE'                   =>  'mysql',
    'DB_HOST'                   =>  'rm-wz94y9juv07017s60.mysql.rds.aliyuncs.com',
    'DB_NAME'                   =>  'store',
    'DB_USER'                   =>  'clearbay',
    'DB_PWD'                    =>  'Ttklb0010',
    'DB_PORT'                   =>  '3306',
    'DB_PREFIX'                 =>  'tf_',
    'SESSION_AUTO_START'        =>  true,
    'TMPL_ACTION_ERROR'         =>  'Public:success',
    'TMPL_ACTION_SUCCESS'       =>  'Public:success',

    'NEW_LIMT_COUNT'			=>	20,
    'PAGE_NORMAL_COUNT'			=>	20,
    'REDIS_HOST'                =>  '127.0.0.1',
    'REDIS_PROT'                =>  6379,
    'ADMIN_NAME'                => '草帽',
    'ADMIN_LOGO'                => 'caomall_03',

//    'SHOW_PAGE_TRACE'           =>  false,

//    'TRACE_PAGE_TABS'=>array(
//        'base'=>'基本',
//        'file'=>'文件',
//        'think'=>'流程',
//        'error|debug|sql'=>'调试',
//        'user'=>'用户'
//    ),

    'QINIU' => [
        'ACCESS_KEY' => 'cEC-5qrVjUjZ_1jlMhAUnxs1u5KQ239uEM5DwyhD',   // 七牛的
        'SECRET_KEY' => 'bznioH8ezy4GC-s2eYeMesPATNQNhCV4PZ0aObL8',
        'BUCKET'     => 'xiaotanshengxian',
    ],

    'SF_HOST'   => 'http://jiqing.yanglu.com/',
    'CDN'   => [
        'URI'   => 'https://cdn.caomall.net/'
    ],


    'PAGE_NORMAL'				=>	16,
    'LOG_RECORD' 				=>  true, // 开启日志记录
    'LOG_LEVEL' 				=>  'EMERG,ALERT,CRIT,ERR,Notice',
    'TMPL_STRIP_SPACE'			=>	false,


    'TOKEN_STR'                 => '20160525mengmeng',
    'CDN_HOST'                  => 'http://cdn.caomall.net/',
    'FE_HOST'                   => 'http://sheep.caomall.net/',

    'IMG_HOST'                  => 'http://jiqing.yanglu.com/',

    'PROTOCOL'                  => 'caomall',
    'APP_DATA_KEY'              => 'app:index:data',
);
