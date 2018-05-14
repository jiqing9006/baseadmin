<?php

/**
 * Created by PhpStorm.
 * User: tankang
 * Date: 2017/2/9
 * Time: 下午10:45
 * 调取核心api的接口
 */

class Core {
    private static $arr = [
        'upload'              => 'index.php/Util/uploadImg',                  //用户注册接口
        'push'                => 'index.php/BaiduPush/pushSingleUid'          
    ];

    /**
     * @param $cmd
     * @param $data
     * @return mixed
     */
    private static function _accessApi($cmd,$data) {
        vendor("Func.Http");
        vendor("Func.Func");

        list($host) = explode(":", $_SERVER ['HTTP_HOST']);
        $url = 'http://127.0.0.1:8080';
        if(strpos($host,'local')){      //判断是否存在local 如果是local的话
            $url = 'http://mouse.lidong.live/';
        }elseif(strpos($host,'test')){
            $url = 'http://127.0.0.1:8080/';
//            $url = 'http://mouse.lidong.live/';
        }else{
            $url = 'http://127.0.0.1:8080/';
        }
        $url .= $cmd;
        $response = Http::doPost($url,$data,15);
        return json_decode($response, true);
    }

    /**
     * 调取接口方法
     * @param $param 参数名
     * @param $data  传值
     * @return mixed
     */
    static public function get_data($param,$data){
        $cmd = self::$arr[$param];
        $json = self::_accessApi($cmd,$data);
        return $json;
    }
}
