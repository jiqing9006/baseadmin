<?php
/**
 * Created by PhpStorm.
 * User: tankang
 * Date: 16/8/4
 * Time: 下午3:27
 */
class Kuxiu{
    private $user  = 'weidian';                           //线上
    private  $pass = '0f80d3e353f6b49883223e310b593871';        //线上
    private  $url = 'http://www.coolshow.cn/api/mobile/';       //线上
    //private $user  = 'sytjsl';                                //线下
    //private  $pass = '7a84000061d461c726c484f1726543cd';      //线下
    //private  $url = 'http://new.coolshow.cn/api/mobile/';     //线下

    public function __construct(){
        vendor('Func.Func');
//        if(Func::getHostName()!='www.clearbay.cn'){
//            $this->user = 'sytjsl';
//            $this->pass = '7a84000061d461c726c484f1726543cd';
//            $this->url  = 'http://new.coolshow.cn/api/mobile/';
//        }
    }


    public function get_reinfo($datas){
        $datas['uname'] = $this->user;
        $datas['pass'] = $this->pass;
        $datas['sign'] = $this->getSig($datas, $this->pass);
        vendor('Func.Http');
        file_put_contents('/tmp/yuanhaoccc.txt', print_r($datas, true));
        $result = json_decode(Http::doPost($this->url,$datas),true);
        return $result;
    }

    private function ksortRecursion( array &$data ){
        foreach( $data as &$v ) {
            is_array( $v ) && ksortRecursion( $v );
        }
        ksort( $data );
        return $data;
    }

    protected function getParams(&$param) {
        $arr_req = array();
        foreach($param as $key=>$value){
            if(is_array($value)) {
                $arr_req[] = "${key}=".implode("&",$value);
            } else {
                $arr_req[] = "${key}=${value}";
            }
        }
        $str = implode("&",$arr_req);
        return $str;
    }

    private function getSig($params,$pass){
        $params = $this->ksortRecursion($params);
        $signn = md5(strtolower(md5($this->getParams($params))).$this->pass);
        return  $signn;
    }




}