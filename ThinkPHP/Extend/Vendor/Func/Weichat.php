<?php

class Weichat {
    private static $_appid;
    private static $_secret;

    public function __construct() {
        self::$_appid = C('WxPayConf_pub.APPID');
        self::$_secret = C('WxPayConf_pub.APPSECRET');
    }

    /**
     * 获取所有access_token的接口
     * @param
     * @return groupInfo
     * */
    private static function getAccessToken() {

//        vendor('Func.Red');
//        $red = Red::create();
//        $access_token = $red->get('clearbays_access_token');
//
//        if (!$access_token) {
//            vendor("Func.Http");
//            $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' . self::$_appid . '&secret=' . self::$_secret;
//            $json = json_decode(Http::doGet($url), true);
//            $access_token = $json['access_token'];
//            $red->setex('clearbays_access_token', 7000, $access_token);
//        }
        vendor("Func.Http");
        $url = 'http://weixin.clearbay.cn/index.php?s=/Home/Index/myGetToken&appid=' . self::$_appid . '&secret=' . self::$_secret;
        $access_token = Http::doGet($url);

        //http://weixin.clearbay.cn/index.php?s=/Home/Index/myGetToken
        return $access_token;
    }


    private static function getJsapi_Ticket() {
        $access_token = self::getAccessToken();

        vendor('Func.Red');
        $red = Red::create();

        $ticket = $red->get('clearbay_jsapi_ticket');
        if (!$ticket) {
            vendor("Func.Http");
            $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=" . $access_token;
            $res = json_decode(Http::doGet($url), true);
            $ticket = $res['ticket'];
            $red->setex('clearbay_jsapi_ticket', 7000, $ticket);
        }
        return $ticket;
    }

    public static function getUrl($urls) {
        return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . self::$_appid . '&redirect_uri=' . $urls . '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
    }

    public static function getNewUrl($urls) {
        return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . self::$_appid . '&redirect_uri=' . $urls . '&response_type=code&scope=snsapi_userinfo&state=2kj3grhj23grk232i3233#wechat_redirect';
    }

    public static function getOpenId($code) {
        vendor("Func.Http");
        $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . self::$_appid . '&secret=' . self::$_secret . '&code=' . $code . '&grant_type=authorization_code';
        $json = json_decode(Http::doGet($url), true);
        return $json['openid'];
    }

    public static function getOauthBycode($code) {
        vendor("Func.Http");
        $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . self::$_appid . '&secret=' . self::$_secret . '&code=' . $code . '&grant_type=authorization_code';
        $json = json_decode(Http::doGet($url), true);
        return $json;
    }

    public function getUsInfo($openid) {
        vendor("Func.Http");
        $access_token = self::getAccessToken();
        $url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' . $access_token . '&openid=' . $openid . '&lang=zh_CN';
        $json = json_decode(Http::doGet($url), true);
        return $json;
    }

    public function getOauthUsInfo($info) {
        vendor("Func.Http");
        $access_token = $info['access_token'];
        $openid = $info['openid'];
        $url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $access_token . '&openid=' . $openid . '&lang=zh_CN';
        $json = json_decode(Http::doGet($url), true);
        return $json;
    }

    private static function createNonceStr($length = 16) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        }
        return $str;
    }


    public static function getSignPackage() {
        $jsapiTicket = self::getJsapi_Ticket();

        // 注意 URL 一定要动态获取，不能 hardcode.
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

        $timestamp = time();
        $nonceStr = self::createNonceStr();

        // 这里参数的顺序要按照 key 值 ASCII 码升序排序
        $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

        $signature = sha1($string);

        $signPackage = array(
            "appId" => self::$_appid,
            "nonceStr" => $nonceStr,
            "timestamp" => $timestamp,
            "url" => $url,
            "signature" => $signature,
            "rawString" => $string
        );
        return $signPackage;
    }
}