<?php

class WapiApi
{
    private static $_appid = 'wx9810e05082f5baa2';                    //大姨妈小助手的APPID
    private static $_secret = '1fd71290829e88d7a14b3c037cf59626';    //大姨妈小助手的SECRET

    /**
     * 获取所有access_token的接口
     * @param
     * @return groupInfo
     * */
    private static function getAccessToken()
    {

        vendor('Func.MemCaches');
        $mem = new MemCaches();
        $access_token = $mem->get('marketing_access_token');

        if (!$access_token) {
            //if(1==1){
            vendor("Func.Http");
            $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxdea76003be25bcf0&secret=01eb30cc44c240a30a3cc4a76adc16fb';
            $json = json_decode(Http::doGet($url), true);
            $access_token = $json['access_token'];
            $mem->set('marketing_access_token', $access_token, 7000);
        }
        return $access_token;
    }


    private static function getJsapi_Ticket()
    {
        $jsapi_ticket = self::_dolphinaccessticket();
        return $jsapi_ticket;
    }

    public static function getSignature($s, $url, $newtime)
    {
        $array = array();
        $string = "";

        if (!$newtime) {
            $newtime = time();
        }

        $array['noncestr'] = $s;
        $array['jsapi_ticket'] = self::getwechatticket();
        $array['timestamp'] = $newtime;
        $array['url'] = $url;

        ksort($array);

        while (list($key, $val) = each($array)) {
            $string = $string . ($key . '=' . $val . '&');
        }
        $string = substr($string, 0, -1);
        //file_put_contents('/tmp/weixins.log', $array['jsapi_ticket'].'|||');
        //file_put_contents('/tmp/weixin.log', $string);
        return sha1($string);
    }

    public static function _dolphinaccesstoken($data = array())
    {
        vendor('Func.MemCaches');
        $mem = new MemCaches();

        $access_token = $mem->get('marketing_access_token');
        if (!$access_token) {
            vendor("Func.Http");

            $url = 'http://dolphin.yoloho.com/index.php/Accesstoken/index?secret=marketingking';
            $response = Http::doPost($url, $data, 15);
            $response = json_decode($response, true);
            $mem->set('marketing_access_token', $response['access_token'], 7000);
            $access_token = $response['access_token'];
        }


        return $access_token;
    }

    public static function _dolphinaccessticket($data = array())
    {
        $access_token = self::getwechataccesstoken();

        vendor('Func.MemCaches');
        $mem = new MemCaches();

        $jsapi_ticket = $mem->get('marketing_jsapi_ticket');
        if (!$jsapi_ticket) {

            vendor("Func.Http");

            $url = 'http://dolphin.yoloho.com/index.php/Accesstoken/getticket?secret=marketingking&accesstoken=' . $access_token;
            $response = Http::doPost($url, $data, 15);
            $response = json_decode($response, true);
            $mem->set('marketing_jsapi_ticket', $response['ticket'], 7000);
            $jsapi_ticket = $response['ticket'];
        }
        return $jsapi_ticket;
    }

    public function getopenid($code)
    {
        vendor("Func.Http");
        $appid = self::$_appid;
        $secret = self::$_secret;
        $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . $appid . '&secret=' . $secret . '&code=' . $code . '&grant_type=authorization_code';
        $json = json_decode(Http::doGet($url), true);

        return $json['openid'];
    }

    /**
     * 用于缓存accesstoken的接口
     */
    private function getwechataccesstoken()
    {
        vendor("Func.Http");
        $url = 'http://marketing.yoloho.com/index.php/Wechat/getaccess_token';
        $json = json_decode(Http::doGet($url), true);

        return $json['access_token'];
    }

    private function getwechatticket()
    {
        vendor("Func.Http");
        $url = 'http://marketing.yoloho.com/index.php/Wechat/getticket';
        $json = json_decode(Http::doGet($url), true);

        return $json['ticket'];
    }
}
