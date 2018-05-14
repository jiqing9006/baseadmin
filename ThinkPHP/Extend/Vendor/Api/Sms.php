<?php
/**
 * Created by PhpStorm.
 * User: tankang
 * Date: 2017/9/8
 * Time: 上午10:09
 * 聚合数据（JUHE.CN）短信API提供商
 */

class Sms{
    private $url = 'http://v.juhe.cn/sms/send';

    public function send($mobile){
        vendor('Func.Http');
        $tpl_value = $this->randoms();
        $data = [
            'key'       => '3891636317deb56b16ca969122554a4a',
            'mobile'    => $mobile,
            'tpl_id'    => '76773',
            'tpl_value' => '#code#='.$tpl_value
        ];
        $content = Http::curl($this->url,$data);
        $myresult = array();
        if($content){
            $result = json_decode($content,true);
            $error_code = $result['error_code'];
            if($error_code == 0){
                $myresult['code'] = $tpl_value;
                $myresult['errno'] = 0;
                $myresult['errdesc'] = '短信发送成功';
            }else{
                $myresult['errno'] = 10001;
                $myresult['errdesc'] = '短信发送失败';
            }
        }else{
            $myresult['errno'] = 10002;
            $myresult['errdesc'] = '短信发送失败';
        }
        return $myresult;
    }

    public function send_gitf($mobile,$code){
        vendor('Func.Http');
        $data = [
        'key' => '3891636317deb56b16ca969122554a4a',
        'mobile' => $mobile,
        'tpl_id' => '68424',
        'tpl_value' => '#code#='.$code
        ];
        $content = Http::curl($this->url,$data);
        $myresult = array();
        if($content){
            $result = json_decode($content,true);
            $error_code = $result['error_code'];
            if($error_code == 0){
                $myresult['code'] = $tpl_value;
                $myresult['errno'] = 0;
                $myresult['errdesc'] = '短信发送成功';
            }else{
                $myresult['errno'] = 10001;
                $myresult['errdesc'] = '短信发送失败';
            }
        }else{
            $myresult['errno'] = 10002;
            $myresult['errdesc'] = '短信发送失败';
        }
            return $myresult;
        }


    private function randoms($length = 6 , $numeric = 0){
        PHP_VERSION < '4.2.0' && mt_srand((double)microtime() * 1000000);
        if($numeric) {
            $hash = sprintf('%0'.$length.'d', mt_rand(0, pow(10, $length) - 1));
        } else {
            $hash = '';
            $chars = '1234567890';
            $max = strlen($chars) - 1;
            for($i = 0; $i < $length; $i++) {
                $hash .= $chars[mt_rand(0, $max)];
            }
        }
        return $hash;
    }
}