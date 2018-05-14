<?php

/**
 * Http 处理类
 * @author sucry
 *
 * Change by sucry 2015-03-13   完全照抄大姨妈的Http请求类库
 *
 */
class Http {
    // 通过get方式获取数据
    static public function doGet($url, $timeout = 5) {
        $code = self::getSupport();
        switch ($code) {
            case 1 :
                return self::curl($url, '', $timeout);
                break;
            case 2 :
                return self::socketGet($url, $timeout);
                break;
            case 3 :
                return @file_get_contents($url);
                break;
            default :
                return false;
        }
    }

    static public function newDoGet($url, $data, $timeout = 5) {

        ksort($data);
        $pairs = array();
        foreach ($data as $key => $val) {
            array_push($pairs, $key . '=' . urlencode($val));
        }
        $urlPrfix = join('&', $pairs);
        $url = $url . '?' . $urlPrfix;
        $code = self::getSupport();
        //$code = 3;
        //echo $url;
        switch ($code) {
            case 1 :
                return self::curl($url, '', $timeout);
                break;
            case 2 :
                return self::socketGet($url, $timeout);
                break;
            case 3 :
                return @file_get_contents($url);
                break;
            default :
                return false;
        }
    }

    // 通过POST方式发送数据
    static public function doPost($url, $data, $timeout = 5) {
        $code = self::getSupport();
        switch ($code) {
            case 1 :
                return self::curl($url, $data, $timeout);
                break;
            case 2 :
                return self::socketPost($url, $data, $timeout);
                break;
            default :
                return false;
        }
    }

    // 通过POST方式发送数据
    static public function newDoPost($url, $data, $timeout = 5) {
        $code = self::getSupport();
        switch ($code) {
            case 1 :
                return self::newCurl($url, $data, $timeout);
                break;
            case 2 :
                return self::socketPost($url, $data, $timeout);
                break;
            default :
                return false;
        }
    }

    static public function newCurl($url, $data = array(), $timeout = 5) {
        $ch = curl_init();
        if (is_array($data) && $data) {
            $formdata = http_build_query($data);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $formdata);
        }
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    // 获取支持读取远程文件的方式
    static public function getSupport() {
        if (function_exists('curl_init')) {
            return 1;
        } else if (function_exists('fsockopen')) {
            return 2;
        } else if (function_exists('file_get_contents')) {
            return 3;
        } else if (ini_get('allow_url_fopen') && function_exists('fopen')) {
            return 4;
        } else {
            return 0;
        }
    }

    static public function GetHttpContent($fsock = null) {
        $out = null;
        $buff = @fgets($fsock, 2048);
        while ($buff) {
            $out .= $buff;
            $buff = @fgets($fsock, 2048);
        }
        fclose($fsock);
        $pos = strpos($out, "\r\n\r\n");
        $head = substr($out, 0, $pos); // http head
        $status = substr($head, 0, strpos($head, "\r\n")); // http status
        // line
        $body = substr($out, $pos + 4, strlen($out) - ($pos + 4)); // page
        // body
        if (preg_match("/^HTTP\/\d\.\d\s([\d]+)\s.*$/", $status, $matches)) {
            if (intval($matches [1]) / 100 == 2) {
                return $body;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static public function socketGet($url, $timeout = 5) {
        $url2 = parse_url($url);
        $url2 ["path"] = isset ($url2 ["path"]) ? $url2 ["path"] : "/";
        $url2 ["port"] = isset ($url2 ["port"]) ? $url2 ["port"] : 80;
        $url2 ["query"] = isset ($url2 ["query"]) ? "?" . $url2 ["query"] : "";
        $host_ip = @gethostbyname($url2 ["host"]);
        $fsock_timeout = $timeout; // 超时时间
        if (($fsock = fsockopen($host_ip, $url2 ['port'], $errno, $errstr, $fsock_timeout)) < 0) {
            return false;
        }
        $request = $url2 ["path"] . $url2 ["query"];
        $in = "GET " . $request . " HTTP/1.1\r\n";
        $in .= "Accept: */*\r\n";
        // $in .= "User-Agent: Payb-Agent\r\n";
        $in .= "Host: " . $url2 ["host"] . "\r\n";
        $in .= "Connection: Close\r\n\r\n";
        if (!@fwrite($fsock, $in, strlen($in))) {
            @fclose($fsock);
            return false;
        }
        return self::GetHttpContent($fsock);
    }

    static public function socketPost($url, $post_data = array(), $timeout = 5) {
        $url2 = parse_url($url);
        $url2 ["path"] = ($url2 ["path"] == "" ? "/" : $url2 ["path"]);
        $url2 ["port"] = ($url2 ["port"] == "" ? 80 : $url2 ["port"]);
        $host_ip = @gethostbyname($url2 ["host"]);
        $fsock_timeout = $timeout; // 超时时间
        if (($fsock = fsockopen($host_ip, $url2 ['port'], $errno, $errstr, $fsock_timeout)) < 0) {
            return false;
        }
        $request = $url2 ["path"] . ($url2 ["query"] ? "?" . $url2 ["query"] : "");
        $post_data2 = http_build_query($post_data);
        $in = "POST " . $request . " HTTP/1.1\r\n";
        $in .= "Accept: */*\r\n";
        $in .= "Host: " . $url2 ["host"] . "\r\n";
        // $in .= "User-Agent: Lowell-Agent\r\n";
        $in .= "Content-type: application/x-www-form-urlencoded\r\n";
        $in .= "Content-Length: " . strlen($post_data2) . "\r\n";
        $in .= "Connection: Close\r\n\r\n";
        $in .= $post_data2 . "\r\n\r\n";
        unset ($post_data2);
        if (!@fwrite($fsock, $in, strlen($in))) {
            @fclose($fsock);
            return false;
        }
        return self::GetHttpContent($fsock);
    }

    static public function curl($url, $data = array(), $timeout = 5) {
        $ch = curl_init();
        if (is_array($data) && $data) {
            $formdata = http_build_query($data);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $formdata);
        }
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    public static function postXmlCurl($url,$xml, $useCert = false, $second = 30)
    {
        $ch = curl_init();
        //设置超时
        curl_setopt($ch, CURLOPT_TIMEOUT, $second);
        //如果有配置代理这里就设置代理
        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,TRUE);
        curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,2);//严格校验
        //设置header
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        //要求结果为字符串且输出到屏幕上
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

        //post提交方式
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
        //运行curl
        $data = curl_exec($ch);

        //返回结果
        if($data){
            curl_close($ch);
            return $data;
        } else {
            $error = curl_errno($ch);
            curl_close($ch);
            throw new WxPayException("curl出错，错误码:$error");
        }
    }

}
