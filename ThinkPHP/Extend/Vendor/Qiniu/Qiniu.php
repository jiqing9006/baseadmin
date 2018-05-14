<?php

use Qiniu\Storage\UploadManager;
use Qiniu\Auth;

class Qiniu
{
    public function up($file, $name, $bucketName = '51aitaoqi')
    {
        $accessKey = C('QINIU.ACCESS_KEY'); 
        $secretKey = C('QINIU.SECRET_KEY');

        $upManager = new UploadManager();
        $auth = new Auth($accessKey, $secretKey);
        $token = $auth->uploadToken($bucketName);
        list($ret, $error) = $upManager->put($token, $name, file_get_contents($file));
        if (!$error) {
            return $ret;
        } else {
            return false;
        }
    }
}
