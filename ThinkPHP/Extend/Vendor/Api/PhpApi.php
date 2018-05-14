<?php

class PhpApi {
    private static function _accessApi($cmd, $data = array()) {
        vendor("Func.Http");
        $url = 'http://' . $_SERVER['HTTP_HOST'] . '/api.php';
        $url .= $cmd;
        $res = Http::newDoPost($url, $data);
        $json = json_decode($res, true);
        if (!$json) {
            dump($res);
            echo $url;
            dump($data);
        }
        return $json;
    }

    static public function getUser($data) {
        $cmd = '/User/get_user';
        $json = self::_accessApi($cmd, $data);
        if ($json['errno'] == 0) {
            if ($json['user_info']) {
                return $json['user_info'];
            } else {
                return array();
            }
        } else {
            return array();
        }
    }

    static public function getIndexConfig($data) {
        $cmd = '/Home/get_index_config';
        $json = self::_accessApi($cmd, $data);
        if ($json['errno'] == 0) {
            if ($json['data']) {
                return $json['data'];
            } else {
                return array();
            }
        } else {
            return array();
        }
    }


}